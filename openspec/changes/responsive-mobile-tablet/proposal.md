## Why

Administrators open the wiki on phones and iPads as often as on desktops, but the stylesheet has a single breakpoint (900px): everything below it gets the same "phone" layout, and everything above gets the desktop sidebar. On a phone, wide price tables overflow the page, headings and padding are oversized, and the `#` heading-link hint only appears on hover, which touch screens don't have. On an iPad in portrait (744–834px) the page is treated as a phone, so content runs edge to edge with small gutters and doctor cards don't use the available width.

## What Changes

- Introduce three named layout tiers in `global.css`: **phone** (< 600px), **tablet** (600–899px, iPad portrait) and **desktop** (≥ 900px, including iPad landscape). The existing 900px desktop breakpoint stays.
- Phone: tighter gutters and smaller heading scale; tables scroll horizontally inside the content column instead of widening the page; doctor cards stack with the photo above the text.
- Tablet: wider gutters and a centred, readable content column; the menu stays collapsed behind the "Меню" toggle; doctor cards use the two-column photo + text layout.
- Desktop between 900px and 1199px (iPad landscape, small laptops): a narrower sidebar so the content column keeps a comfortable width.
- Touch devices (`hover: none` / `pointer: coarse`): navigation links get ≥ 44px tap targets, and the heading `#` hint is visible without hover.
- Use dynamic viewport units (`100dvh`) for the full-height layout and sticky sidebar so iOS Safari's toolbar doesn't cut off content, and respect safe-area insets on notched devices.
- No changes to Markdown content, URLs or navigation structure.

## Capabilities

### New Capabilities
- `responsive-layout`: how the wiki layout adapts to phone, tablet and desktop viewports and to touch input — breakpoints, gutters, typography scale, tables, doctor cards, tap targets, viewport-height handling.

### Modified Capabilities
<!-- none: openspec/specs/ is empty; the mobile navigation requirement in the pending wiki-layout-markdown-content change (collapsed "Меню" toggle below 900px) is kept as-is -->

## Impact

- **Code**: `src/styles/global.css` (new media queries and touch rules), `src/layouts/Layout.astro` (`viewport-fit=cover` in the viewport meta).
- **Content / components**: none — tables stay plain Markdown, `DoctorCard.astro` and `Sidebar.astro` markup unchanged.
- **Dependencies**: none.
- **Deploy**: unchanged.
