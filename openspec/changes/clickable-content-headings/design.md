## Context

Pages are static Astro output with no client JavaScript. The Sätteri Markdown processor already gives every Markdown heading an id: explicit ones via `{#deti}`, generated ones otherwise (`#кариес`, duplicates as `#кариес-1`). `.content h2–h4` already have `scroll-margin-top: 1rem`. On the doctors page the id lives on `<article class="doctor" id="kovaleva">`, and its `<h2>` has no id. The sidebar links to h2 sections with plain `href="…#id"`.

## Goals / Non-Goals

**Goals:**
- One mechanism that makes every content heading with an id a self-link, for Markdown pages and doctor cards.
- Native browser behaviour for URL, history and scrolling — no custom scroll code.
- Accessible: a real link inside the heading, focusable, with a visible affordance.

**Non-Goals:**
- Copy-to-clipboard or "link copied" toasts.
- Smooth scrolling, sticky-header offsets (there is no sticky header in the content column).
- Highlighting the current section in the sidebar while scrolling.
- Making h1 or headings without ids clickable.

## Decisions

### Wrap heading contents in `<a href="#id">` instead of handling clicks in JS
The heading's inner content becomes `<a class="heading-link" href="#id">…</a>`. A same-page fragment link already does exactly what is required: the browser updates the hash, pushes a history entry and scrolls the target to the top honouring `scroll-margin-top`; Back/Forward and copied links work for free. Clicking the link whose hash is already current still scrolls back to it.
*Alternative:* click handler on headings calling `history.pushState` + `scrollIntoView` — re-implements native behaviour, headings stay non-focusable, needs extra `role`/`tabindex` work.

### Do the wrapping with a tiny inline script in `Layout.astro`
An `is:inline` script at the end of `<body>` selects `.content :is(h2, h3, h4)[id]` and moves each heading's children into a new `<a class="heading-link" href="#<id>">`. It is one place that covers both Markdown content and `DoctorCard.astro`, and needs no dependency or Markdown-pipeline change. Without JS headings simply stay plain text — no loss compared to today.
*Alternative:* a Sätteri hast plugin in `astro.config.mjs` that adds the link at build time (no JS needed). Rejected for now: it must run after Sätteri's heading-id plugin (ordering is internal to the processor), and doctor card headings would still need a manual link in the component. Can be revisited if the site ever needs to work without JS.

### Move the doctor id from `<article>` to its `<h2>`
`DoctorCard.astro` puts `id={doctor.id}` on the `<h2>`. The h2 is the first thing in the card, so `#kovaleva` lands at the same place, sidebar links keep working, and doctor headings fall under the same `[id]` selector.

### Styling
`.heading-link` inherits colour and has no underline. A `::after` `#` in `--color-accent` appears on hover/focus-visible, with empty alt text (`content: "#" / ""`) so screen readers don't announce it; it sits inline after the text so it never overflows on narrow screens. Focus uses the existing global `:focus-visible` outline. `cursor: pointer` comes from the link.

## Risks / Trade-offs

- [Headings are not clickable without JS] → Acceptable: no regression versus today; build-time plugin is the documented upgrade path.
- [Brief flash before the script runs] → The script is inline at the end of `<body>` and runs before first paint in practice; the only visual change is on hover anyway.
- [Cyrillic ids in the URL get percent-encoded when copied (`#%D0%BA…`)] → Browsers decode them for display and navigation works either way; explicit ASCII ids (`{#kariyes}`) remain available to content editors where a readable link matters.
- [Links inside headings would become nested `<a>`] → Markdown headings in this repo contain no links; the script skips headings that already contain an `<a>`.

## Migration Plan

Ship as a normal deploy. Rollback = revert the commit; anchors and content are unaffected.

## Open Questions

None.
