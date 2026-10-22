## Why

The site is a reference wiki for clinic administrators (prices, doctors, procedures), but it is built like a landing page: every page is hand-written HTML with its own background colours, hero images, "Назад" buttons and dozens of one-off utility classes (`fs14`, `mw490`, `m0mb12`, `.chistka-airflow`…). Editing a price means touching HTML and often CSS, pages look different from each other, and the top navigation does not scale as sections grow. Moving to a wiki shape — sidebar navigation, Markdown content, one typography — makes the content easy to edit and consistent, and lets us apply the company palette in one place.

## What Changes

- Page content moves from `src/pages/*.astro` HTML into Markdown files in an Astro content collection; pages are generated from those files by a single route.
- Navigation moves from the horizontal top bar to a persistent left sidebar built from the content collection (page order and labels come from frontmatter). The current page is highlighted and expands to show its section headings (`#deti`, `#vzroslye`, `#otbelivanie`, …) as sub-links.
- One global typography stylesheet styles plain Markdown elements (headings, paragraphs, lists, bold, tables, images, blockquotes). Content files contain no `class`/`style` attributes or raw layout HTML.
- Every page links the site favicon (`public/favicon.ico`) with the GitHub Pages base path, so it shows in production and PR previews.
- Colours come from design tokens based on the company palette: primary `#00524d`, brand accent `#ff7300`, supporting `#363E45` and `#97C261`.
- Doctor profiles become one Markdown entry per doctor rendered by one uniform card; per-doctor colour variants are dropped.
- **BREAKING (visual)**: per-page hero banners, coloured section bands, "Назад" buttons and all page-specific / utility CSS classes are removed.
- Existing URLs (`lechenie.html`, `chistka.html`, …) and existing section anchors (`#deti`, `#vzroslye`, `#otbelivanie`, doctor ids) keep working.
- The React `Nav` island is replaced by a server-rendered sidebar (no client JS needed for navigation).

## Capabilities

### New Capabilities
- `wiki-navigation`: sidebar navigation generated from content — page list, ordering, current-page highlighting, in-page section links, mobile behaviour.
- `markdown-content`: how pages and doctor profiles are authored in Markdown — collection schema, frontmatter, stable heading anchors, images, URL generation.
- `wiki-typography`: unified styling — a single stylesheet styling semantic elements only, colour tokens from the company palette, no in-place custom styling.

### Modified Capabilities
<!-- none: openspec/specs/ is empty -->

## Impact

- **Code**: `src/pages/*.astro` (replaced by `src/content/` Markdown + a dynamic route), `src/layouts/Layout.astro` (sidebar layout), `src/components/Nav.tsx` (removed), `src/components/DoctorCard.astro` (simplified), `src/lib/nav.ts` (replaced by collection-driven nav), `src/styles/global.css` (rewritten).
- **New files**: `src/content.config.ts`, `src/content/pages/*.md`, `src/content/doctors/*.md`, sidebar component; explicit heading ids use the built-in Sätteri `headingAttributes` feature.
- **Images**: content images referenced from Markdown move under `src/` so Astro resolves the GitHub Pages base path; hero background images become unused.
- **Dependencies**: `@astrojs/markdown-satteri` (already installed with Astro 7) is declared directly so the config can enable heading attributes. `@astrojs/react` stays installed but navigation no longer uses it.
- **Docs**: README sections on structure and editing content need updating.
- **Deploy**: unchanged (GitHub Pages, `build.format: 'file'`, `BASE_PATH` previews).
