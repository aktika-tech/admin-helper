## Why

Most wiki pages (prices, treatment, doctors) are long, and administrators often scroll far down while answering a patient. Getting back to the title or to the in-page section list means a long manual scroll, which is especially slow on phones where the sidebar menu is collapsed. The main page is a short table of contents and does not need this.

## What Changes

- Add a floating "Наверх" (back to top) button to every page except the main page (`index`), including the doctors page.
- The button stays hidden near the top of the page and appears once the reader has scrolled down; activating it returns to the top of the page.
- It works with the keyboard and screen readers, is a ≥ 44px target on touch screens, respects safe-area insets and `prefers-reduced-motion`, and still works if JavaScript is unavailable.
- No changes to Markdown content, URLs or navigation.

## Capabilities

### New Capabilities
- `scroll-to-top`: the back-to-top button — on which pages it appears, when it is shown, what activating it does, and its accessibility and touch requirements.

### Modified Capabilities
<!-- none: openspec/specs/ is empty -->

## Impact

- **Code**: `src/layouts/Layout.astro` (button markup rendered when `id !== 'index'`, small inline script to show/hide it), `src/styles/global.css` (button styles using the existing palette variables).
- **Content / components**: none — `Sidebar.astro`, `DoctorCard.astro` and Markdown pages unchanged.
- **Dependencies**: none.
