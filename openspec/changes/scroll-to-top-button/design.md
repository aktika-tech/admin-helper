## Context

All pages use `src/layouts/Layout.astro`, which receives the page `id`; the main page has `id === 'index'`. The layout already has a small inline script (heading links, closing the mobile menu), and all colours come from variables in `src/styles/global.css`. Below 900px the menu is a sticky bar at the top; from 900px the sidebar is sticky on the left. The footer now spans the full width to the right of the sidebar.

## Goals / Non-Goals

**Goals:**
- One back-to-top button rendered by the layout on every page except `index`.
- Hidden near the top, visible after one viewport height of scrolling.
- Works without JavaScript; accessible; fine on touch and notched devices.

**Non-Goals:**
- Scroll progress indicator, "back to section" links, or per-page configuration in Markdown front matter.
- Any change to the sidebar, footer or content markup.

## Decisions

- **Rendered in `Layout.astro`, conditioned on `id !== 'index'`.** Every page already passes its `id`, so no page has to opt in. Alternative: a `showToTop` prop — rejected, it would need to be set on each route and is easy to forget.
- **An `<a href="#top">` link, not a `<button>`.** A link to an anchor on `<body id="top">` (or the `h1`) scrolls to the top with no JavaScript, and moves focus there. The script only adds smooth scrolling and visibility toggling. Alternative: `<button>` + `window.scrollTo` — rejected, it does nothing without JS.
- **Visibility via `IntersectionObserver` on a sentinel element**, not a `scroll` listener. A zero-height element placed one viewport height below the top (`position: absolute; top: 100vh`) is observed; when it scrolls out of view upwards the button is shown. This avoids running code on every scroll event. When hidden the link gets `hidden`-style CSS (`visibility: hidden`, `opacity: 0`) plus `tabindex="-1"`/`aria-hidden="true"` so it is not focusable. Without JS the button is always visible (the hidden state is applied by the script, so the no-JS fallback still works).
- **Smooth scrolling through CSS**: `html { scroll-behavior: smooth }` inside `@media (prefers-reduced-motion: no-preference)`. This also benefits heading links and menu links, and the reduced-motion case is handled by the browser. Alternative: `scrollTo({ behavior })` in JS — more code for the same result.
- **Styling**: `position: fixed`, bottom-right, offset by `max(1rem, env(safe-area-inset-*))`; circular 48px target with an arrow icon (inline SVG, `aria-hidden`) and visually hidden text "Наверх" as the accessible name. Background `--color-primary`, icon `--color-on-primary`, hover/focus uses `--color-accent` (border/outline only, never text on white). `z-index` below the mobile sticky menu bar (`10`) so an open menu covers it.

## Risks / Trade-offs

- [Button covers the end of a line of text or a table cell at the bottom-right corner] → Small size, only shown after scrolling, and the content column is centred so on desktop it usually sits in empty space; on phones the content has bottom padding before the footer.
- [`scroll-behavior: smooth` affects all in-page anchors] → Desired for heading links; disabled for reduced-motion users.
- [Mobile sticky menu bar overlaps the title after jumping to `#top`] → Target the top of `<body>` so the scroll position is 0 and the bar sits above the title as on initial load.
