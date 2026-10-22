## Why

Administrators often need to send a colleague or patient a link to a specific part of a page ("Кариес" for children on `lechenie.html`, a particular doctor on the doctors page). Headings already have stable ids, but the only way to get a link to one is the sidebar, which lists h2 sections only and is collapsed behind «Меню» on mobile. Making the headings themselves clickable gives a direct, discoverable way to get a section link.

## What Changes

- Every content heading (h2–h4) that has an id becomes clickable. Clicking it puts `#<id>` in the address bar (a new history entry) and scrolls so that the heading is at the top of the viewport.
- Clickable headings get a subtle hover/focus affordance (pointer cursor, a `#` mark in the brand accent) and are reachable from the keyboard; the heading text keeps the heading colour and is not styled as an ordinary link.
- Doctor cards on `prezentaciavrachi.html` get their id on the card heading instead of the `<article>`, so doctor names are clickable too. Existing doctor anchors (`#kovaleva`, …) keep working.
- The page title (h1) is not clickable.

## Capabilities

### New Capabilities
- `heading-anchors`: clickable content headings — which headings are clickable, what clicking does to the URL and the viewport, how they look and behave for keyboard users.

### Modified Capabilities
<!-- none: openspec/specs/ is empty -->

## Impact

- **Code**: `src/layouts/Layout.astro` (small inline script that turns headings into self-links), `src/styles/global.css` (heading-link styles), `src/components/DoctorCard.astro` (id moves from `<article>` to `<h2>`).
- **Content**: none — Markdown files and their `{#id}` anchors are unchanged.
- **Dependencies**: none.
- **Deploy**: unchanged.
