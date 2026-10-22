## ADDED Requirements

### Requirement: Sidebar navigation on every page
Every page SHALL render a left sidebar containing the site navigation. The horizontal top navigation bar SHALL NOT be rendered.

#### Scenario: Desktop layout
- **WHEN** a page is opened in a viewport at least 900px wide
- **THEN** the sidebar is visible to the left of the page content
- **AND** the sidebar stays in view while the content scrolls

#### Scenario: No top bar
- **WHEN** any page is rendered
- **THEN** there is no horizontal navigation bar above the content

### Requirement: Navigation generated from content
The list of sidebar links SHALL be generated from the Markdown page collection. Each page's label and position SHALL come from its frontmatter (`nav.label` falling back to `title`, and `nav.order`). Adding a Markdown page with nav frontmatter SHALL add it to the sidebar without editing any other file. A page MAY opt out of the sidebar with `nav.hidden: true`.

#### Scenario: New page appears in sidebar
- **WHEN** an editor adds `src/content/pages/novoe.md` with `title: Новое` and `nav: { order: 50 }`
- **THEN** after build, every page's sidebar contains a link "Новое" to `novoe.html`, placed according to order 50

#### Scenario: Ordering
- **WHEN** two pages have `nav.order` 10 and 20
- **THEN** the page with order 10 is listed above the page with order 20

#### Scenario: Hidden page
- **WHEN** a page has `nav.hidden: true`
- **THEN** it is built at its URL but not listed in the sidebar

### Requirement: Current page and sections are indicated
The sidebar SHALL mark the link to the current page as active (visually and with `aria-current="page"`). Under the active page the sidebar SHALL list that page's level-2 headings as links to their anchors.

#### Scenario: Active page
- **WHEN** the user is on `chistka.html`
- **THEN** the "Гигиена" link has `aria-current="page"` and the active style

#### Scenario: Section sub-links
- **WHEN** the user is on `chistka.html`, whose Markdown contains `## Отбеливание {#otbelivanie}`
- **THEN** the sidebar shows a sub-link "Отбеливание" pointing to `chistka.html#otbelivanie`

#### Scenario: Navigation works without JavaScript
- **WHEN** JavaScript is disabled
- **THEN** all sidebar links, the active state and section sub-links are present in the HTML

### Requirement: Mobile navigation
On viewports narrower than 900px the sidebar SHALL collapse behind a toggle at the top of the page and SHALL NOT cause horizontal scrolling.

#### Scenario: Collapsed on phone
- **WHEN** a page is opened at 375px width
- **THEN** the content is shown first, with a "Меню" toggle at the top
- **AND** activating the toggle reveals the full navigation list

### Requirement: Home link
The sidebar SHALL contain the site name linking to the home page, replacing per-page "Назад" buttons.

#### Scenario: Return to home
- **WHEN** the user clicks the site name in the sidebar on any page
- **THEN** the browser navigates to the home page under the current base path
