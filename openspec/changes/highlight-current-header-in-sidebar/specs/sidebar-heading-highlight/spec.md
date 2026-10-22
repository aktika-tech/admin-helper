## ADDED Requirements

### Requirement: Sidebar highlights the heading of the section in view
The sidebar section link for the h2 heading whose section is currently at the top of the content SHALL be visually highlighted and marked with `aria-current="location"`. The highlight SHALL move between links as the reader scrolls, and SHALL apply to Markdown pages and the doctors page alike.

#### Scenario: Scroll into a section
- **WHEN** a reader on `lechenie.html` scrolls so that the «Для взрослых» heading sits at the top of the content (below the sticky menu)
- **THEN** the sidebar link «Для взрослых» is highlighted and carries `aria-current="location"`

#### Scenario: Highlight follows scrolling
- **WHEN** the reader scrolls back up so that «Для детей» is at the top of the content again
- **THEN** the highlight moves to «Для детей» and no longer marks «Для взрослых»

#### Scenario: Doctors page
- **WHEN** a reader on `prezentaciavrachi.html` scrolls to a doctor's card
- **THEN** that doctor's name link in the sidebar is highlighted

### Requirement: No section is highlighted at the top of the page
While the page is at the very top, before the first section heading has reached the highlight threshold, SHALL no section link be highlighted.

#### Scenario: Top of the page
- **WHEN** a reader opens `lechenie.html` without scrolling
- **THEN** no section link in the sidebar is highlighted

### Requirement: Highlight respects the sticky menu offset
The heading considered current SHALL be the last h2 whose top edge has reached or passed its own `scroll-margin-top`, so the highlight switches exactly where the heading would land when clicked.

#### Scenario: Phone width with sticky menu
- **WHEN** a reader at ≤899px width scrolls to the first section
- **THEN** the highlight appears only once the section's heading reaches its `scroll-margin-top` position below the sticky menu, not before

### Requirement: No-JavaScript fallback
Without JavaScript, the sidebar SHALL still list the section links and those links SHALL navigate normally; no highlighting SHALL be applied and no visible or functional breakage SHALL occur.

#### Scenario: JavaScript disabled
- **WHEN** JavaScript is unavailable and the reader clicks a sidebar section link
- **THEN** the page scrolls to that heading and the sidebar renders without any highlight
