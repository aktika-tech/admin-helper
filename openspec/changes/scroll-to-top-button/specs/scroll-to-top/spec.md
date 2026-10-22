## ADDED Requirements

### Requirement: Button on every page except the main page
Every page rendered with the site layout SHALL include a back-to-top button, except the main page (`index`), which SHALL NOT include it.

#### Scenario: Content page has the button
- **WHEN** a content page such as `/lechenie` is opened
- **THEN** the page contains the back-to-top button

#### Scenario: Doctors page has the button
- **WHEN** the doctors page `/prezentaciavrachi` is opened
- **THEN** the page contains the back-to-top button

#### Scenario: Main page has no button
- **WHEN** the main page is opened
- **THEN** the page does not contain the back-to-top button

### Requirement: Shown only after scrolling down
The button SHALL be hidden (not visible and not reachable with Tab) while the page is scrolled less than one viewport height from the top, and SHALL be visible once the page is scrolled further down.

#### Scenario: Hidden at the top
- **WHEN** a page with the button is opened and not scrolled
- **THEN** the button is not visible and Tab does not focus it

#### Scenario: Appears after scrolling
- **WHEN** the reader scrolls down more than one viewport height
- **THEN** the button becomes visible in the bottom-right corner of the viewport

#### Scenario: Hides again near the top
- **WHEN** the reader scrolls back to less than one viewport height from the top
- **THEN** the button is hidden again

### Requirement: Returns to the top of the page
Activating the button SHALL scroll the page to its top, so the page title is visible, and SHALL move keyboard focus to the top of the page. Scrolling SHALL be smooth unless the reader prefers reduced motion, in which case it SHALL be instant.

#### Scenario: Click returns to the top
- **WHEN** the reader clicks or taps the visible button
- **THEN** the page scrolls to the top and the page title is visible

#### Scenario: Reduced motion
- **WHEN** the reader has `prefers-reduced-motion: reduce` and activates the button
- **THEN** the page jumps to the top without animation

#### Scenario: Works without JavaScript
- **WHEN** JavaScript is unavailable and the reader activates the button
- **THEN** the page still moves to the top

### Requirement: Accessible and touch-friendly
The button SHALL have the accessible name "Наверх", SHALL be operable with the keyboard, SHALL show the site focus outline when focused, SHALL be at least 44×44px, SHALL stay clear of safe-area insets on notched devices, and SHALL use only the colours defined in the site palette.

#### Scenario: Keyboard use
- **WHEN** the button is visible and the reader focuses it with Tab and presses Enter
- **THEN** the page returns to the top

#### Scenario: Notched phone
- **WHEN** a page is scrolled down on a device with a bottom or side safe-area inset
- **THEN** the button is fully inside the safe area

#### Scenario: Does not cover the page at phone width
- **WHEN** a page is opened at 320px width and scrolled down
- **THEN** the button does not cause horizontal scrolling and does not cover the sticky menu bar
