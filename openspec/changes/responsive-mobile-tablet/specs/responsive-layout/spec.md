## ADDED Requirements

### Requirement: Layout tiers
The layout SHALL adapt to three viewport tiers: **phone** (narrower than 600px), **tablet** (600px to 899px) and **desktop** (900px and wider). No page SHALL scroll horizontally at any viewport width from 320px upwards.

#### Scenario: No horizontal scroll on small phone
- **WHEN** any page is opened at 320px width
- **THEN** the document is no wider than the viewport

#### Scenario: iPad portrait uses tablet tier
- **WHEN** a page is opened at 820px width
- **THEN** the tablet layout is applied (collapsed "Меню" toggle, tablet gutters)

#### Scenario: iPad landscape uses desktop tier
- **WHEN** a page is opened at 1180px width
- **THEN** the sidebar is shown to the left of the content

### Requirement: Phone layout
On phone viewports the content SHALL use compact gutters (at most 1rem each side) and a reduced heading scale so that `h1` and `h2` fit typical page titles on two lines or fewer at 375px.

#### Scenario: Compact gutters
- **WHEN** a page is opened at 375px width
- **THEN** the horizontal padding of the content column is no more than 16px on each side

### Requirement: Tablet layout
On tablet viewports the navigation SHALL stay collapsed behind the "Меню" toggle, and the content column SHALL use wider gutters than on phones (at least 2rem each side) while keeping the readable line length limit.

#### Scenario: Comfortable gutters on iPad portrait
- **WHEN** a page is opened at 768px width
- **THEN** the content has at least 32px horizontal padding on each side
- **AND** text lines do not exceed the content width limit

### Requirement: Desktop sidebar on narrow desktops
Between 900px and 1199px the sidebar SHALL be narrower than on wide screens so the content column stays at least 600px wide.

#### Scenario: iPad landscape
- **WHEN** a page is opened at 1024px width
- **THEN** the sidebar is visible and the content column is at least 600px wide

### Requirement: Wide tables scroll inside the content
On phone and tablet viewports a Markdown table wider than the content column SHALL scroll horizontally within its own box; the page itself SHALL NOT scroll horizontally. Tables SHALL remain plain Markdown with no wrapper markup.

#### Scenario: Price table on phone
- **WHEN** `breketi.html` is opened at 375px width
- **THEN** the price table can be swiped horizontally if it overflows
- **AND** the rest of the page does not move sideways

### Requirement: Doctor cards adapt to width
On phone viewports a doctor card SHALL show the photo above the text; on tablet and desktop viewports it SHALL show the photo beside the text.

#### Scenario: Card on phone
- **WHEN** `prezentaciavrachi.html` is opened at 375px width
- **THEN** each doctor's photo appears above the biography

#### Scenario: Card on iPad portrait
- **WHEN** `prezentaciavrachi.html` is opened at 768px width
- **THEN** each doctor's photo appears to the left of the biography

### Requirement: Touch-friendly interaction
On devices without hover or with a coarse pointer, navigation links and the "Меню" toggle SHALL have a tap target at least 44px high, and the `#` hint on clickable content headings SHALL be visible without hovering.

#### Scenario: Tap targets on touch device
- **WHEN** the menu is opened on a touch device
- **THEN** each top-level navigation link is at least 44px tall

#### Scenario: Heading hint on touch device
- **WHEN** a page with `h2` sections is viewed on a touch device
- **THEN** the `#` hint is visible next to each section heading

### Requirement: Mobile viewport height and safe areas
The full-height layout and the sticky desktop sidebar SHALL size to the dynamic viewport height so mobile browser toolbars do not hide content, and content SHALL NOT be obscured by device notches or rounded corners in landscape.

#### Scenario: Footer visible on iOS Safari
- **WHEN** a short page is opened in iOS Safari with the toolbar visible
- **THEN** the footer is visible without scrolling

#### Scenario: Notched phone in landscape
- **WHEN** a page is opened on a notched phone in landscape
- **THEN** text and the menu toggle are not covered by the notch

### Requirement: Mobile menu bar
Below 900px the bar with the site name and the "Меню" toggle SHALL stay pinned to the top of the screen while the page scrolls. The opened navigation SHALL span the full width of the bar and SHALL scroll within the screen height when longer than it. Choosing a navigation link SHALL close the menu, and the target section heading SHALL appear below the bar, not under it.

#### Scenario: Menu reachable on a long page
- **WHEN** `lechenie.html` is opened at 375px width and scrolled to the bottom
- **THEN** the "Меню" toggle is still visible at the top of the screen

#### Scenario: Jump to section from the menu
- **WHEN** the menu is opened at 375px width and "Для взрослых" is tapped
- **THEN** the menu closes
- **AND** the "Для взрослых" heading is fully visible below the bar
