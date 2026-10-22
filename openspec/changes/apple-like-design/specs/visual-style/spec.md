## ADDED Requirements

### Requirement: Shared design tokens
The stylesheet SHALL define corner radii, shadows, motion durations and easing curves once, as CSS custom properties on `:root`, and every rounded, shadowed or animated element SHALL use these properties instead of literal values.

#### Scenario: Tokens drive all components
- **WHEN** the radius, shadow or duration token is changed in `:root`
- **THEN** every sidebar item, card, button, image and animated element reflects the new value without further edits

### Requirement: Continuous rounded corners
Rounded elements (sidebar nav items, the "Меню" button, table-of-contents entries, blockquotes, images, doctor photos, wide tables, the back-to-top button's container where applicable) SHALL use the shared radius scale, with no element using the former 4px radius. In browsers supporting `corner-shape`, these elements SHALL render continuous ("squircle") corners; elsewhere they SHALL render ordinary rounded corners of the same radius.

#### Scenario: Squircle in a supporting browser
- **WHEN** a page is opened in a browser that supports `corner-shape: squircle`
- **THEN** table-of-contents entries, nav items, blockquotes and images have continuous (squircle) corners

#### Scenario: Fallback in other browsers
- **WHEN** a page is opened in a browser without `corner-shape` support (e.g. Safari, Firefox)
- **THEN** the same elements have ordinary rounded corners and no layout or visual breakage

### Requirement: Pill-style navigation items
Sidebar navigation items SHALL be shown as rounded pills: the current page SHALL be indicated by a filled rounded background (with the accent color used as an indicator), not by a 4px left border. Hover and focus SHALL change the item's background smoothly.

#### Scenario: Current page highlighted as a pill
- **WHEN** a content page is opened
- **THEN** its sidebar item has a filled rounded background and bold text, and no left border bar

#### Scenario: Hover feedback
- **WHEN** the pointer moves over a sidebar item on a device with hover
- **THEN** the item's background fades in over the standard short duration rather than changing instantly

### Requirement: Soft depth on cards
Table-of-contents entries on the main page SHALL be rendered as rounded cards on a muted background with a soft shadow; on hover they SHALL lift slightly (stronger shadow and small upward translation), and on press they SHALL scale down slightly.

#### Scenario: Card hover
- **WHEN** the pointer hovers a table-of-contents entry
- **THEN** the card smoothly gains a stronger shadow and moves up by a few pixels

#### Scenario: Card press
- **WHEN** the reader presses a table-of-contents entry
- **THEN** the card briefly scales down slightly before navigation

### Requirement: Translucent top bar on phones and tablets
Below 900px width, the sticky top bar with the "Меню" button SHALL use a translucent version of the primary color with a background blur where `backdrop-filter` is supported, and the opaque primary color otherwise. Text on the bar SHALL keep sufficient contrast in both cases.

#### Scenario: Blur supported
- **WHEN** a long page is scrolled on a phone in a browser supporting `backdrop-filter`
- **THEN** content passing under the top bar is visible through it, blurred

#### Scenario: Blur unsupported
- **WHEN** the same page is opened in a browser without `backdrop-filter`
- **THEN** the top bar is fully opaque primary color

### Requirement: Animated menu open and close
Below 900px width, opening and closing the "Меню" panel SHALL animate its height and opacity smoothly in browsers that support animating `details` content; in other browsers it SHALL open and close instantly as before. The menu SHALL still work without JavaScript.

#### Scenario: Smooth open
- **WHEN** the reader taps "Меню" on a phone in a supporting browser
- **THEN** the navigation list expands smoothly instead of appearing at once

#### Scenario: Unsupported browser
- **WHEN** the reader taps "Меню" in a browser without support
- **THEN** the menu opens instantly and remains fully usable

### Requirement: Spring-like back-to-top transition
The back-to-top button SHALL appear and disappear with a combined fade and scale transition using the shared spring-like easing, and SHALL scale down slightly while pressed. Its existing show/hide, focus and no-JavaScript behavior SHALL be unchanged.

#### Scenario: Button appears
- **WHEN** the reader scrolls past one viewport height
- **THEN** the button fades in while scaling up to full size

### Requirement: Reduced motion respected
When the reader prefers reduced motion, translations, scaling, height animations and smooth scrolling SHALL be disabled; at most simple color/opacity changes SHALL remain.

#### Scenario: Reduced motion enabled
- **WHEN** the operating system's "reduce motion" setting is on and the reader opens the menu, hovers a card or triggers the back-to-top button
- **THEN** no element moves, scales or animates its height; state changes are instant or simple fades

### Requirement: Content, palette and behavior unchanged
The change SHALL NOT alter Markdown content, URLs, navigation structure, layout breakpoints, the company color palette, or existing behaviors (heading self-links, current-section highlight in the sidebar, back-to-top visibility logic, menu closing after selection).

#### Scenario: Existing behavior intact
- **WHEN** the reader scrolls a long page, clicks a heading and selects a section from the menu on a phone
- **THEN** the current section is highlighted, the URL gets the heading's `#id`, and the menu closes after selection exactly as before
