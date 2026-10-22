## Context

All styling lives in `src/styles/global.css`, written mobile-first with one breakpoint at 900px (sidebar grid + sticky sidebar) and one at 600px for doctor cards only. Below 900px the sidebar is a top bar with a `<details>` "Меню" toggle. The content is plain Markdown, so per-element wrappers (e.g. around tables) are not available — everything must be done with element selectors. The heading `#` hint added by `clickable-content-headings` only appears on `:hover` / `:focus-visible`. Layout height uses `100vh`, which on iOS Safari includes the area behind the toolbar.

Target devices: phones 320–430px, iPad mini/Air/Pro portrait 744–1024px, iPad landscape 1024–1366px, desktops.

## Goals / Non-Goals

**Goals:**
- Distinct phone / tablet / desktop tiers with sensible gutters and type scale.
- No horizontal page scroll down to 320px, including wide price tables.
- Usable on touch: tap targets, visible heading hint.
- Correct height handling on iOS Safari and notched devices.

**Non-Goals:**
- Changing navigation structure or showing the sidebar on tablet portrait.
- Changing Markdown content or adding wrapper markup / components.
- Print styles, dark mode.
- Responsive image `srcset` changes (Astro `<Image>` already handles sizing).

## Decisions

**Breakpoints: 600px and 900px, plus 1200px for sidebar width.** iPad portrait widths (744, 768, 810, 820, 834) all fall in 600–899, iPad landscape (≥ 1024) in desktop. Keeping 900px avoids reworking the existing sidebar CSS. Media queries stay `min-width`-based (mobile-first), matching the existing file. CSS custom properties can't be used inside media queries, so the tier values are documented in one comment at the top of the file.
Alternative: move desktop to 1024px so iPad Pro 12.9" portrait gets the tablet layout — rejected, a 1024px viewport has room for the sidebar.

**Gutters via the existing `--gap` token.** Phone keeps `--gap: 1rem`; tablet overrides `--gap: 2rem` in a `min-width: 600px` query; the content `max-width` already derives from `--gap`. Tablet centres the content column (`margin-inline: auto`) so 834px doesn't leave a large right-hand gap.

**Narrower sidebar 900–1199px.** Override `--sidebar-width` to ~220px under 1200px (default 270px at ≥ 1200px). At 1024px that leaves ~800px for content.

**Tables: `display: block; overflow-x: auto` below 900px.** Without a wrapper element, making the table itself the scroll container is the only CSS-only option. The block keeps its auto (full) width; the anonymous inner table shrinks to fit, so long price cells still wrap and the box only scrolls when the table's minimum width exceeds the column (`width: max-content` was rejected during implementation: it stopped cells from wrapping and made every price table scroll). Narrow tables no longer stretch to full width below 900px. Above 900px tables revert to `display: table; width: 100%`.
Alternative: inject a wrapper `<div>` via a rehype plugin — rejected as more machinery than needed.

**Heading scale on phone.** Base sizes are reduced for phone (`h2` ~1.3rem, `h3` ~1.1rem) and restored at ≥ 600px; `h1` already uses `clamp()`.

**Doctor cards.** The existing `min-width: 600px` rule already gives two columns on tablet; on phone the photo is centred and capped in width. Only small tweaks needed.

**Touch: `@media (hover: none), (pointer: coarse)`.** Increase `.sidebar nav` link and `summary` padding to reach 44px min-height; set `.heading-link::after` opacity to a subtle constant (e.g. 0.5) instead of 0.
Alternative: always show the hint — rejected, it adds noise on desktop.

**Viewport height and safe areas.** Use `min-height: 100vh; min-height: 100dvh;` (fallback first) on `.layout` and the same pair for the sidebar `height`. Add `viewport-fit=cover` to the viewport meta in `Layout.astro` and pad `.sidebar` and `.content` with `max(<current>, env(safe-area-inset-left/right))`.

## Risks / Trade-offs

- [Table as `display: block` loses some table semantics in older screen readers] → Only applied below 900px; modern browsers keep table roles; verify with VoiceOver on iOS once.
- [`100dvh` unsupported in very old browsers] → `100vh` fallback declared first.
- [Breakpoint values duplicated across media queries] → Single comment block listing tiers; keep queries grouped per tier.
- [`viewport-fit=cover` without matching padding would push content under the notch] → Ship meta change and safe-area padding in the same commit.

## Migration Plan

CSS-only change plus one meta attribute; deploy via the usual GitHub Pages workflow and check the PR preview on a phone and an iPad. Rollback = revert the commit.

## Open Questions

- None blocking. Exact phone heading sizes can be tuned during implementation against real page titles.
