## Why

The sidebar lists each page's sections (its h2 headings) so readers can jump straight to a part of a long page, but it never shows where they are while scrolling. On `lechenie.html` or the doctors page, a reader who has scrolled deep into the content has to look up the nearest heading in the text to re-orient. Highlighting the heading of the section currently in view turns the sidebar into a live table of contents.

## What Changes

- The sidebar section link for the heading whose section is currently at the top of the content is highlighted (brand accent colour and bold) and marked with `aria-current="location"` for assistive technology.
- The highlight follows scrolling: as the reader moves from one section to the next, the highlight moves with it; at the very top of the page, before the first section, no section is highlighted.
- The current heading is measured against the heading's `scroll-margin-top`, so on phone/tablet the highlight matches the position where the heading actually sits below the sticky menu.
- Only the h2 sections already shown in the sidebar participate; navigation and links are unchanged. Without JavaScript the sidebar behaves exactly as today (links still work, just no live highlight).

## Capabilities

### New Capabilities
- `sidebar-heading-highlight`: a scrollspy that keeps the sidebar's section list in sync with the section currently in view, including the visual highlight, the `aria-current` state, and the no-JavaScript fallback.

### Modified Capabilities
<!-- none -->

## Impact

- **Code**: `src/layouts/Layout.astro` (small scrollspy script in the existing inline script) and `src/styles/global.css` (highlight style for the current section link).
- **Content**: none.
- **Dependencies**: none.
- **Deploy**: unchanged.
