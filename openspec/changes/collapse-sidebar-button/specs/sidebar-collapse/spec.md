## ADDED Requirements

### Requirement: Toggle shown only on desktop
At viewport widths of 900px and above, the sidebar SHALL contain a collapse/expand toggle button. Below 900px the toggle SHALL NOT be shown, and the existing "Меню" bar SHALL behave as before.

#### Scenario: Desktop shows the toggle
- **WHEN** any page is opened at 1280px width
- **THEN** the sidebar shows the collapse toggle button

#### Scenario: Tablet and phone unchanged
- **WHEN** any page is opened at 768px or 375px width
- **THEN** no collapse toggle is visible and the "Меню" button opens and closes the menu as before

### Requirement: Collapse to a rail and expand back
Activating the toggle while the sidebar is expanded SHALL collapse it to a narrow rail that shows only the logo mark and the toggle, and the content area SHALL take the freed width. Activating it while collapsed SHALL restore the full sidebar. The transition SHALL be animated unless the reader prefers reduced motion.

#### Scenario: Collapse
- **WHEN** the sidebar is expanded and the reader clicks the toggle
- **THEN** the navigation list and site name text are hidden, the sidebar narrows to a rail, and the content column widens

#### Scenario: Expand
- **WHEN** the sidebar is collapsed and the reader clicks the toggle
- **THEN** the full sidebar with navigation and site name is shown again

#### Scenario: Reduced motion
- **WHEN** the reader has `prefers-reduced-motion: reduce` and toggles the sidebar
- **THEN** the sidebar changes width without animation

### Requirement: State is remembered
The collapsed or expanded state SHALL persist across page navigations and browser sessions on the same device. A page opened while the saved state is collapsed SHALL render collapsed from the first paint, without showing the expanded sidebar first. If storage is unavailable, the sidebar SHALL default to expanded and the toggle SHALL still work for the current page.

#### Scenario: Persist across navigation
- **WHEN** the reader collapses the sidebar and opens another page
- **THEN** the new page opens with the sidebar collapsed and no visible expand-then-collapse jump

#### Scenario: Storage blocked
- **WHEN** `localStorage` throws (private mode or blocked storage)
- **THEN** the page renders with the sidebar expanded and the toggle still collapses and expands it

### Requirement: Works without JavaScript
Without JavaScript the sidebar SHALL be shown expanded and the toggle SHALL NOT be shown.

#### Scenario: No JS
- **WHEN** a page is opened at desktop width with JavaScript disabled
- **THEN** the full sidebar is visible and no non-working toggle button is shown

### Requirement: Accessible toggle
The toggle SHALL be a `<button>` with `aria-expanded` that reflects the state and `aria-controls` that points to the navigation. Its accessible name SHALL be "Свернуть меню" when expanded and "Развернуть меню" when collapsed. It SHALL be keyboard operable, SHALL show the site focus outline, and SHALL keep focus after it is toggled. When collapsed, the hidden navigation links SHALL NOT be reachable with Tab.

#### Scenario: Keyboard toggle
- **WHEN** the reader focuses the toggle with Tab and presses Enter or Space
- **THEN** the sidebar toggles, `aria-expanded` and the accessible name update, and focus stays on the toggle

#### Scenario: Hidden links not focusable
- **WHEN** the sidebar is collapsed and the reader presses Tab from the toggle
- **THEN** focus moves to the page content, not to hidden navigation links
