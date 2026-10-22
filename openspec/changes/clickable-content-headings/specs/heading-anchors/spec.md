## ADDED Requirements

### Requirement: Content headings are clickable
Every h2, h3 and h4 inside the page content that has an `id` SHALL be clickable over its whole text. The page title (h1) and headings without an `id` SHALL NOT be clickable. This SHALL apply to Markdown pages and to doctor cards alike.

#### Scenario: Markdown section heading
- **WHEN** a visitor opens `lechenie.html`
- **THEN** the headings «Для детей» (`#deti`), «Кариес» (`#кариес`) and «Кариес» under «Для взрослых» (`#кариес-1`) are clickable

#### Scenario: Doctor card heading
- **WHEN** a visitor opens `prezentaciavrachi.html`
- **THEN** each doctor's name heading is clickable and points to that doctor's existing id (e.g. `#kovaleva`)

#### Scenario: Page title
- **WHEN** a visitor clicks the page h1
- **THEN** nothing happens and the URL does not change

### Requirement: Clicking a heading updates the URL and scrolls to it
Clicking a clickable heading SHALL set the URL fragment to `#<heading id>`, adding a browser history entry, and SHALL scroll the page so that the heading is at the top of the viewport (offset only by the heading's `scroll-margin-top`). The page SHALL NOT reload.

#### Scenario: Click a heading
- **WHEN** a visitor on `lechenie.html` clicks «Для взрослых»
- **THEN** the address bar shows `…/lechenie.html#vzroslye` and the «Для взрослых» heading is at the top of the screen

#### Scenario: Click the heading already in the URL
- **WHEN** the URL already ends in `#vzroslye`, the visitor scrolls away and clicks «Для взрослых» again
- **THEN** the page scrolls back so that the heading is at the top of the screen

#### Scenario: Back button
- **WHEN** a visitor clicks «Для детей» and then «Для взрослых» and presses Back
- **THEN** the URL returns to `#deti` and the page shows «Для детей» at the top

#### Scenario: Copied link opens at the heading
- **WHEN** a visitor opens a copied link `…/lechenie.html#кариес-1`
- **THEN** the page opens with that heading at the top of the screen

#### Scenario: Base path previews
- **WHEN** the site is served under a PR preview base path
- **THEN** clicking a heading keeps the current page path and only changes the fragment

### Requirement: Clickable headings are discoverable and accessible
Clickable headings SHALL keep their heading colour and typography (no link underline/colour). On hover and keyboard focus they SHALL show a pointer cursor and a `#` mark in the brand accent colour. They SHALL be reachable with Tab and activatable with Enter, and SHALL keep their heading semantics for screen readers.

#### Scenario: Hover
- **WHEN** a visitor hovers a clickable heading
- **THEN** the cursor becomes a pointer and a `#` mark appears next to the heading in `--color-accent`

#### Scenario: Keyboard
- **WHEN** a keyboard user tabs to a clickable heading and presses Enter
- **THEN** the URL and scroll position change exactly as on click, and the focus outline is visible

#### Scenario: Mobile layout
- **WHEN** the page is viewed at phone width
- **THEN** the `#` mark does not cause horizontal scrolling or overlap the text
