## Context

The site is a static Astro 7 site on GitHub Pages (`base: /admin-helper`, `build.format: 'file'`, PR previews via `BASE_PATH`). It has 11 pages in `src/pages/*.astro`, each hand-written HTML with hero banners, coloured bands and many one-off CSS classes in `src/styles/global.css` (~250 lines, mostly page-specific). Navigation is a React island (`Nav.tsx`) used only to highlight the active link, including a special case for `chistka.html#otbelivanie`. Doctors are rendered with `DoctorCard.astro`, which has per-doctor colour variants. Images live in `public/images/` and are linked through `withBase()`.

Admins use the site as a reference wiki, so content edits (mostly prices) should be easy, and every page should look the same.

## Goals / Non-Goals

**Goals:**
- Content in Markdown, with one route and one layout for all pages.
- Sidebar navigation generated from content, with section sub-links for the current page.
- One small typography stylesheet using colour tokens from the company palette.
- Keep every existing URL and anchor working.

**Non-Goals:**
- Search, full-text index, or a CMS/editor UI.
- Rewriting or restructuring the content beyond converting it to Markdown (wording and prices stay the same).
- MDX or custom components inside content.
- Removing `@astrojs/react` from the project (it is simply no longer used by navigation).
- Dark mode.

## Decisions

### 1. Astro content collections + one dynamic route
`src/content.config.ts` defines two collections with the `glob` loader: `pages` (`src/content/pages/**/*.md`) and `doctors` (`src/content/doctors/*.md`), with Zod schemas as in the specs. `src/pages/[...slug].astro` builds every page from `pages` through `getStaticPaths`; `index.md` maps to the root. With `build.format: 'file'`, `lechenie` is output as `lechenie.html`, so URLs stay the same.

*Alternative:* `.md` files directly in `src/pages/` with a `layout:` frontmatter. That's simpler, but it gives no schema validation and no typed query for building the nav. Rejected.

### 2. Plain Markdown, not MDX
Content uses plain Markdown only. The doctors page is the only structured page, and it is handled by its own collection and a fixed template, not by components inside Markdown. This keeps editing simple and makes the "no custom styling" rule enforceable.

*Alternative:* MDX with `<DoctorCard>`. Rejected because it would let custom markup back into content.

### 3. Explicit heading ids via Sätteri `headingAttributes`
Astro's automatic heading slugs would turn Cyrillic headings into Cyrillic ids and break `#deti`, `#otbelivanie`, etc. Astro 7 renders Markdown with Sätteri (`@astrojs/markdown-satteri`), which has a built-in `headingAttributes` feature: `## Для детей {#deti}` sets the id and strips the suffix. It is enabled with `markdown.processor: satteri({ features: { headingAttributes: true } })`. Astro's heading-id step keeps an id that is already set, so `render()` returns `headings` with that id, and the sidebar uses those for its sub-links. The same feature would also accept `{.class}`, so the content check rejects heading attributes other than `#id`.

*Alternatives:* a custom remark plugin, or the `remark-heading-id` package. Neither applies, because Astro 7 no longer runs remark by default.

### 4. Server-rendered sidebar, no React
`Sidebar.astro` gets the sorted `pages` collection, the current slug, and the current page's `headings` (depth 2). It outputs the links with `aria-current="page"` and nests the section links under the active item. Highlighting by hash (the old `#otbelivanie` special case) is no longer needed, because sections now show as sub-links. On mobile, the sidebar is wrapped in `<details>`/`<summary>` ("Меню"), so it needs no JS. On desktop, CSS forces it open (`display:block` on the content and the summary hidden), and the sidebar is `position: sticky`.

The separate "Профессиональное отбеливание зубов" top-level nav entry is removed. It now shows as the "Отбеливание" sub-link of "Гигиена".

### 5. Layout and page anatomy
`Layout.astro` is a two-column CSS grid: sidebar (~260px) and `<main class="content">`. Each page renders `<h1>{title}</h1>`, an optional lead `<p>` from `description`, and then the Markdown body. Hero banners, background images and "Назад" buttons are removed. The `<head>` gets `<link rel="icon" href={withBase('favicon.ico')} sizes="any">`. The base prefix is required because the site lives in a subfolder, where browsers' default `/favicon.ico` lookup would hit the domain root. The site name at the top of the sidebar links home. Page sections map to `##` headings, and sub-sections (e.g. Кариес / Пульпит) map to `###`.

### 6. Typography and tokens
`global.css` is rewritten from scratch:
```css
:root {
  --color-primary: #00524d;   /* sidebar bg, headings, links */
  --color-accent:  #ff7300;   /* company colour: active marker, hover, focus ring */
  --color-text:    #363E45;   /* body text */
  --color-support: #97C261;   /* list markers, table rules, dividers */
  --color-surface: #ffffff;
  --color-muted:   color-mix(in srgb, var(--color-text) 8%, white);
}
```
Rules target only elements inside `.content` (`.content h2`, `.content table`, …) plus the layout and sidebar component classes. Fonts use one system sans stack for both text and headings, without the Georgia/uppercase mix. Content max-width is about 72ch. In the sidebar, white text sits on `--color-primary`, and the active item has an orange (`--color-accent`) left border. Orange is used only for markers, hover underline and focus outlines, never for body-size text on white, because #ff7300 on white is only about 2.9:1.

### 7. Prices formatting
Price lists stay Markdown bullet lists with `**bold**` amounts. Pages with clear "service → price" pairs (Снимки, Ортодонтия, Протезирование) can use Markdown tables with a right-aligned price column. The conversion task decides this per page. Non-breaking spaces in numbers (`9&nbsp;210`) are written as the literal U+00A0 character, so the Markdown stays readable.

### 8. Images
Images referenced from content move to `src/content/pages/images/` and `src/content/doctors/images/` and are referenced relatively (`./images/x.jpg`). Astro resolves and optimises them, and the base path is applied automatically, so this works for PR previews too. Doctor photos go through the schema's `image()` helper and `<Image>` in the card. Hero-only images in `public/images/` are no longer referenced and are deleted.

### 9. Content lint script
`scripts/check-content.mjs` scans `src/content/**/*.md` for `class=`, `style=`, `<div`, `<section`, `<span`, `<br` and exits non-zero with `file:line`. It is wired as `npm run check:content` and added to the build/CI workflow before `astro build`.

## Risks / Trade-offs

- [Visual identity of each page is lost (colours, hero photos)] → This is intended for a wiki. The company palette and the sidebar give a consistent identity. Any hero photo that is still wanted can be kept as an ordinary Markdown image.
- [Content conversion may drop or change wording/prices] → Convert page by page, and diff the rendered text of old and new builds (strip tags, then compare) before deleting the old `.astro` files.
- [Markdown can't express some current layouts (doctor photo beside text, `<br>`-separated price lines)] → Doctors use the fixed card template. `<br>` lines become list items or table rows.
- [`#ff7300` has low contrast] → It is restricted to non-text accents by the spec. Text uses the primary/text tokens.
- [Explicit `{#id}` syntax is non-standard Markdown] → It is documented in the README, and headings without it still work with auto ids.
- [Old links to `index.html` / hash-based nav highlighting] → `index.md` still produces `index.html`. Hash highlighting is replaced by section sub-links.

## Migration Plan

1. Add the collections, route, layout, sidebar and new CSS alongside the old pages.
2. Convert pages one by one to Markdown. Delete each `.astro` page once its Markdown version renders at the same URL (the route and the file can't coexist for the same slug).
3. Convert the doctors page and remove `DoctorCard` colour variants.
4. Remove `Nav.tsx`, `lib/nav.ts`, unused images and the old CSS. Update the README.
5. Verify with the build, the content check, a text diff and a manual check on desktop and phone widths, then deploy through the normal PR preview.

Rollback: revert the PR. There is no data migration.

## Open Questions

- Should the home page (`index.md`) have real content (e.g. an overview with links to sections, or contacts) instead of just the title?
- Should the doctors page keep a colour per doctor (e.g. a thin top border in the support/accent colours), or be fully uniform? The default here is fully uniform.
- Should page groupings be shown in the sidebar (e.g. "Услуги" / "Цены" / "Врачи")? The default is a flat ordered list, and grouping can be added later with a `nav.group` field.
