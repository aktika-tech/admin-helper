## ADDED Requirements

### Requirement: Single global stylesheet for content
All page content SHALL be styled by one global stylesheet that targets semantic elements inside the content area (`h1`–`h4`, `p`, `ul`, `ol`, `li`, `strong`, `em`, `a`, `table`, `img`, `blockquote`, `hr`). The stylesheet SHALL NOT contain page-specific selectors or utility classes (font-size, margin, max-width helpers).

#### Scenario: Same element, same look
- **WHEN** an `h2` appears on `lechenie.html` and on `ssnimki.html`
- **THEN** both have identical computed font family, size, weight and colour

#### Scenario: No page-specific CSS
- **WHEN** the stylesheet is inspected
- **THEN** it contains no selectors scoped to a page (e.g. `.chistka`, `.narkoz`) and no utility classes such as `.fs14`, `.mw490`, `.m0mb12`

### Requirement: Colour tokens from the company palette
Colours SHALL be defined once as CSS custom properties and used everywhere through those tokens:
- primary `#00524d` — sidebar background, headings, links;
- accent (company colour) `#ff7300` — active navigation marker, link hover/focus, highlights;
- text `#363E45` — body text;
- support `#97C261` — secondary accents (list markers, table header rule, dividers).
No other hard-coded colour values SHALL appear outside the token definitions, except white/neutral backgrounds derived for surfaces.

#### Scenario: Tokens defined
- **WHEN** the stylesheet is inspected
- **THEN** `:root` defines tokens with values `#00524d`, `#ff7300`, `#363E45`, `#97C261`

#### Scenario: Active link uses brand colour
- **WHEN** a sidebar link is active
- **THEN** its marker uses the accent token `#ff7300`

### Requirement: Site favicon
Every page SHALL reference `favicon.ico` from `public/` in its `<head>` via `<link rel="icon">`, with the href prefixed by the configured base path so the icon loads at both the production base (`/admin-helper`) and PR preview bases.

#### Scenario: Favicon in production
- **WHEN** any page is built with the default base
- **THEN** its `<head>` contains `<link rel="icon" href="/admin-helper/favicon.ico">` and that file exists in `dist/`

#### Scenario: Favicon in PR preview
- **WHEN** the site is built with `BASE_PATH=/admin-helper/pr-preview/pr-7`
- **THEN** the favicon href is `/admin-helper/pr-preview/pr-7/favicon.ico`

### Requirement: Readable text contrast
Body text and links on the content background SHALL meet WCAG AA contrast (4.5:1). The accent `#ff7300` SHALL NOT be used as the colour of body-size text on a white background.

#### Scenario: Link colour
- **WHEN** a link is rendered in body text on white
- **THEN** its colour is the primary token `#00524d` (contrast ≥ 4.5:1)

### Requirement: Readable content width and rhythm
The content column SHALL have a maximum readable width (about 70–80 characters) and consistent vertical spacing between blocks defined in the stylesheet, so content files never need spacing tweaks.

#### Scenario: Long paragraph
- **WHEN** a long paragraph is shown on a 1440px-wide screen
- **THEN** its line length does not exceed the content max width

### Requirement: Price-friendly typography
Bold text and tables SHALL be styled so prices stand out consistently: `strong` uses the heading weight, tables have a header row and row separators, and numbers in tables are right-aligned when the column is marked right-aligned in Markdown.

#### Scenario: Price table
- **WHEN** a Markdown table with `| Услуга | Стоимость, ₽ |` and `|---|---:|` is rendered
- **THEN** it shows a styled header and the price column is right-aligned
