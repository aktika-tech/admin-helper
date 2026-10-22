## 1. Content infrastructure

- [x] 1.1 Add `src/content.config.ts` with `pages` (title, description?, nav{label?, order?, hidden?}) and `doctors` (name, photo via `image()`, order, prodoctorov default true) collections using the `glob` loader
- [x] 1.2 Enable explicit heading ids (`{#id}`) via the built-in Sätteri `headingAttributes` feature in `astro.config.mjs` (Astro 7's Markdown processor; no remark plugin needed)
- [x] 1.3 Create `src/pages/[...slug].astro` with `getStaticPaths` over `pages` (`index` → root) rendering title, lead and `<Content />` inside the layout
- [x] 1.4 Verify `npm run build` outputs `<slug>.html` for a test page and that `{#id}` headings produce the expected ids and appear in `headings`

## 2. Layout and sidebar

- [x] 2.1 Create `src/components/Sidebar.astro`: site name → home, ordered page links from collection (respecting `nav.hidden`), `aria-current="page"` on active, depth-2 heading sub-links under active page
- [x] 2.2 Rewrite `src/layouts/Layout.astro` as a grid (sidebar + `<main class="content">`) with `<details>/<summary>` "Меню" collapse for <900px and sticky sidebar on desktop
- [x] 2.3 Add `<link rel="icon" href={withBase('favicon.ico')} sizes="any">` to the layout `<head>` (file already in `public/favicon.ico`)
- [x] 2.4 Remove `src/components/Nav.tsx` and `src/lib/nav.ts`; drop the `client:load` island from the layout

## 3. Typography and palette

- [x] 3.1 Rewrite `src/styles/global.css`: `:root` tokens (`#00524d`, `#ff7300`, `#363E45`, `#97C261`, surface/muted), base reset, single font stack
- [x] 3.2 Style content elements under `.content` (h1–h4, p, lists with support-colour markers, strong, em, links, tables with header/rows/right-align, img, blockquote, hr) with max-width ~72ch and consistent vertical rhythm
- [x] 3.3 Style sidebar (primary background, white text, accent active marker, sub-link indentation) and mobile menu; check no horizontal scroll at 375px
- [x] 3.4 Confirm no page-specific or utility classes remain and no hard-coded colours outside tokens; check text/link contrast ≥ 4.5:1

## 4. Convert pages to Markdown

- [x] 4.1 Move content images used inside pages (e.g. `caries-stages.jpg`) to `src/content/pages/images/`
- [x] 4.2 Convert `index.astro` → `index.md` and `ssnimki.astro` → `ssnimki.md`; delete the `.astro` originals
- [x] 4.3 Convert `lechenie.astro` → `lechenie.md` (`## Для детей {#deti}`, `## Для взрослых {#vzroslye}`, `###` per diagnosis, price lines as lists)
- [x] 4.4 Convert `udalenie.astro` and `chistka.astro` (anchors `#deti`, `#vzroslye`, `#optragate`, `#airflow`, `#otbelivanie`)
- [x] 4.5 Convert `anestezia.astro` and `narkoz.astro` (anchors `#vrach`, `#deti`, `#vzroslye`, `#konsultaciya`)
- [x] 4.6 Convert `breketi.astro`, `implantasia.astro`, `protezirovanie.astro` (use Markdown tables with right-aligned price column where the content is service→price)
- [x] 4.7 Set `nav.order`/`nav.label` frontmatter so the sidebar order matches the current menu (Главная, Врачи, Лечение, Удаление, Гигиена, Анестезия и седация, Лечение во сне, Ортодонтия, Имплантация, Протезирование, Снимки)

## 5. Doctors

- [x] 5.1 Create `src/content/doctors/<id>.md` per doctor (name, photo, order, prodoctorov) with biography in Markdown; move photos to `src/content/doctors/images/`
- [x] 5.2 Rewrite `DoctorCard.astro` as a uniform card (no colour variants) using `<Image>`, id = entry id, optional ПроДокторов paragraph
- [x] 5.3 Add `prezentaciavrachi.md` (title/nav/lead) and render the doctors list for that slug in the route (or a dedicated `prezentaciavrachi.astro` using the same layout); delete the old page

## 6. Guardrails and cleanup

- [x] 6.1 Add `scripts/check-content.mjs` (fails on `class=`, `style=`, `<div`, `<section`, `<span`, `<br` in `src/content/**/*.md`) and `npm run check:content`
- [x] 6.2 Run the content check in `.github/workflows/deploy.yml` and `preview.yml` before build
- [x] 6.3 Delete images in `public/images/` no longer referenced (hero backgrounds, moved files)
- [x] 6.4 Update README: content editing in Markdown, frontmatter fields, `{#id}` anchors, images, palette tokens

## 7. Verification

- [x] 7.1 `npm run check`, `npm run check:content` and `npm run build` pass; build also passes with `BASE_PATH=/admin-helper/pr-preview/pr-1`
- [x] 7.2 Text diff old vs new build (tags stripped) per page shows no lost prices or wording
- [x] 7.3 All old URLs and anchors (`lechenie.html#deti`, `chistka.html#otbelivanie`, `prezentaciavrachi.html#krutikova`, …) resolve
- [x] 7.4 Manual check at 1440px and 375px: favicon shows in the tab, sidebar, active state, section sub-links, mobile menu, no horizontal scroll
