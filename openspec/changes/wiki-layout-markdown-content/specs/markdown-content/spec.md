## ADDED Requirements

### Requirement: Pages are authored in Markdown
Each content page SHALL be a Markdown file in `src/content/pages/`, validated by a content collection schema with at least `title` (required), `description` (optional lead text) and `nav` (`label`, `order`, `hidden`, all optional). Pages SHALL be rendered by a single shared route and layout; individual pages SHALL NOT need their own `.astro` file.

#### Scenario: Page rendered from Markdown
- **WHEN** `src/content/pages/ssnimki.md` exists with `title: Снимки`
- **THEN** the build produces `ssnimki.html` with `<title>` and `<h1>` "Снимки" and the Markdown body rendered below

#### Scenario: Invalid frontmatter
- **WHEN** a page file has no `title`
- **THEN** `npm run build` fails with a schema error naming the file

#### Scenario: Lead text
- **WHEN** a page has `description` in frontmatter
- **THEN** it is rendered as the lead paragraph under the page title

### Requirement: Content files contain no custom styling
Markdown content SHALL NOT contain `class` or `style` attributes, `<div>`/`<section>`/`<span>` wrappers, or `<br>`-based layout. Formatting SHALL use Markdown syntax only (headings, paragraphs, lists, `**bold**`, `*italic*`, tables, links, images, blockquotes). A check SHALL fail when forbidden markup is present.

#### Scenario: Check catches inline styling
- **WHEN** a content file contains `<p class="fs14">`
- **THEN** the content check script exits with an error naming the file and line

#### Scenario: Clean content passes
- **WHEN** all content files use only Markdown syntax
- **THEN** the content check passes

### Requirement: Existing URLs are preserved
Generated page URLs SHALL match the current ones: the file name (without `.md`) becomes `<name>.html`, and `index.md` becomes the home page.

#### Scenario: Legacy URL
- **WHEN** a user opens `/admin-helper/lechenie.html`
- **THEN** the "Лечение" page is served

### Requirement: Stable section anchors
Headings SHALL support an explicit id with the syntax `## Heading {#id}`; the `{#id}` suffix SHALL be removed from the visible text. Existing anchors (`#deti`, `#vzroslye`, `#otbelivanie`, `#optragate`, `#airflow`, `#vrach`, `#konsultaciya`) SHALL be preserved this way. Headings without an explicit id SHALL get an automatic id.

#### Scenario: Explicit id
- **WHEN** a page contains `## Для детей {#deti}`
- **THEN** the HTML contains `<h2 id="deti">Для детей</h2>`

#### Scenario: Old deep link
- **WHEN** a user opens `chistka.html#otbelivanie`
- **THEN** the page scrolls to the "Отбеливание" section

### Requirement: Images in Markdown
Content images SHALL be referenced with standard Markdown image syntax using paths relative to the Markdown file, and SHALL resolve correctly under any base path (production `/admin-helper` and PR previews).

#### Scenario: Image under PR preview base
- **WHEN** the site is built with `BASE_PATH=/admin-helper/pr-preview/pr-7` and `lechenie.md` contains `![Стадии кариеса](./images/caries-stages.jpg)`
- **THEN** the rendered `<img>` src points inside `/admin-helper/pr-preview/pr-7/` and loads

### Requirement: Doctor profiles as Markdown entries
Each doctor SHALL be a Markdown file in `src/content/doctors/` with frontmatter `name`, `photo` (relative image), `order`, and optional `prodoctorov` (default true). The doctors page SHALL render all entries in `order` with one uniform card layout, each card anchored by the file name (e.g. `#krutikova`).

#### Scenario: Doctor card
- **WHEN** `src/content/doctors/krutikova.md` exists
- **THEN** `prezentaciavrachi.html` contains a card with id `krutikova`, an `<h2>` with the doctor's name, the photo and the Markdown biography

#### Scenario: ProDoctorov note
- **WHEN** a doctor entry has `prodoctorov: false`
- **THEN** the card omits the "ПроДокторов" paragraph
