## Context

Pages are static Astro output with no client framework. All client behaviour is a single `is:inline` script at the end of `<body>` in `src/layouts/Layout.astro` (currently: wrapping headings in self-links and closing the mobile menu). The sidebar (`src/components/Sidebar.astro`) lists nav pages and, under the active page, the page's h2 sections (`headings.filter(depth === 2)`), each an `<a href="<page>#<slug>">`. On the doctors page these sections are doctor names. Below 900px the menu is a sticky bar at the top; from 900px the sidebar is sticky on the left and the content column scrolls with the document. Content headings already carry `scroll-margin-top` (1rem, 6rem ≤899px) so hash links land below the sticky menu.

## Goals / Non-Goals

**Goals:**
- A scrollspy that highlights the h2 section link for the section currently in view, on Markdown pages and the doctors page.
- Live update on scroll and on initial load (so a direct `#hash` link opens with the right section highlighted).
- Respect the sticky-menu offset via the heading's own `scroll-margin-top`.
- Accessible: `aria-current="location"` plus a colour change on the link.
- Pure enhancement: no-JS behaves as today.

**Non-Goals:**
- Highlighting h3/h4 — they are not listed in the sidebar.
- Per-page opt-in or Markdown front-matter configuration.
- Smooth-scroll or scroll-margin changes (already handled elsewhere).
- A sticky/in-page mini-TOC beyond the existing sidebar.

## Decisions

### Track the last h2 at/above its `scroll-margin-top` on window scroll
The "current" heading is the last `.content h2[id]` whose top edge (`getBoundingClientRect().top`) is ≤ its `scroll-margin-top` (read at runtime via `getComputedStyle`). This is exactly the position the heading lands on when its link is clicked, so the highlight and the jump stay consistent. A `requestAnimationFrame`-throttled `scroll` listener recomputes the set; the same routine runs once on load so direct `#hash` links are correct.
*Alternative:* `IntersectionObserver` with a thin `rootMargin` band near the top — matches the repo's preference for observers, but with many headings and reverse scrolling the "last heading above the line" state is awkward to reconstruct from entry callbacks and needs extra bookkeeping; a rAF-throttled scroll handler is the standard, deterministic scrollspy. (The existing back-to-top feature uses an observer on a single sentinel, which is a different problem.)

### Highlight via `aria-current="location"` + a `.is-current` class on the sidebar link
For the current heading id, find the sidebar section link whose hash matches (`a[href$="#<id>"]`) and set `aria-current="location"` and `.is-current`; clear both from the previous link. `aria-current="location"` is the correct semantic for a current item in a navigation list, so state is announced to assistive tech, not colour alone.
*Alternative:* `aria-current="true"` — weaker (doesn't say the item is a location); a `.is-current` class only — fails accessibility.

### Style the current link with accent text and bold
`.sidebar nav ul ul a.is-current` gets `color: var(--color-accent)` and `font-weight: 700`. Accent is the site's designated "active item" colour and reads clearly on the dark `--color-primary` sidebar; bold adds a non-colour cue. Existing hover styling is left untouched.
*Alternative:* a left accent border like the active nav item — rejected, section links are indented sub-items and a border would need extra indentation to align.

### Put the script in the existing `Layout.astro` inline script
The scrollspy needs both `.content` headings and `.sidebar` links, which meet in `Layout.astro` (it renders both `<Sidebar>` and `<main class="content">`). Adding it to the existing inline script keeps all client JS in one place and reuses the already-loaded page. `Sidebar.astro` only receives `headings`/`current` as props and has no script of its own today.
*Alternative:* a module script imported per page — more machinery for a few lines; inline matches the existing pattern.

## Risks / Trade-offs

- [Highlight is one rAF-behind during fast scrolling] → Throttling only skips redundant recomputes within a frame; a rAF handler still runs on the next paint, so the highlight settles immediately when scrolling stops.
- [Accent text may have lower contrast on the dark sidebar for some vision] → Accent is the established active-item colour; bold and `aria-current` provide non-colour cues.
- [No highlight without JS] → Acceptable: identical to today's behaviour; the feature is a progressive enhancement.
- [Section link `href` uses a page-relative path (`lechenie.html#id`)] → Matching is by the hash suffix only (`[href$="#id"]`), so base-path/PR-preview URLs are irrelevant.

## Migration Plan

Ship as a normal deploy. Rollback = revert the commit; no content, markup or URL changes. No data migration.

## Open Questions

None.
