## Context

The wiki is a static Astro site styled by a single `src/styles/global.css` (≈330 lines, Russian comments, palette in `:root` custom properties). Components: `Sidebar.astro` (logo + `<details class="menu">` collapsible on <900px), `Layout.astro` (content column, footer, back-to-top button, inline script), `DoctorCard.astro`. Current look: 4px radii, left-border indicators, hard 1–2px lines, mostly instant state changes; only the back-to-top button has a 0.2s transition. Primary users are clinic administrators, frequently on iPhone/iPad Safari, plus desktop Chrome.

Constraints: no new dependencies, no build-step changes, no JS animation libraries; must keep palette, breakpoints, content and all behaviors from previous changes (responsive layout, heading links, current-section highlight, back-to-top).

## Goals / Non-Goals

**Goals:**
- One token layer (radius, shadow, duration, easing) that all components use.
- Apple-like shape: generous radii, continuous corners where supported.
- Apple-like depth: soft layered shadows, frosted translucent sticky bar.
- Apple-like motion: short, spring-like transitions for hover/press/show/hide and menu expand.
- Graceful degradation and full `prefers-reduced-motion` support.

**Non-Goals:**
- Changing the color palette, fonts (system stack already maps to SF Pro on Apple devices), layout or breakpoints.
- Dark mode.
- Page-transition animations (View Transitions) — possible follow-up.
- Scroll-driven reveal animations of content.

## Decisions

### 1. Tokens in `:root`
Add next to the palette:
- Radii: `--radius-sm: 8px` (inline items, nav pills' inner), `--radius-md: 12px` (nav pills, buttons, images), `--radius-lg: 18px` (cards, blockquotes, tables).
- Shadows: `--shadow-sm` and `--shadow-md`, each two layers (tight contact shadow + wide ambient shadow) tinted with `--color-text` via `color-mix`, low alpha — Apple-style soft depth instead of one hard shadow.
- Motion: `--duration-fast: 150ms`, `--duration: 250ms`, `--duration-slow: 400ms`; `--ease-out: cubic-bezier(0.25, 1, 0.5, 1)` (standard), `--ease-spring` defined as a `cubic-bezier(0.34, 1.3, 0.64, 1)` fallback, overridden inside `@supports (transition-timing-function: linear(0, 1))` with a `linear()` spring curve with slight overshoot.

Alternative: hardcoding values per rule — rejected, inconsistent and hard to tune.

### 2. Continuous corners via `corner-shape`
Use `border-radius: var(--radius-*)` everywhere, plus a single block:
```css
@supports (corner-shape: squircle) {
  :is(.sidebar nav a, .menu summary, .toc a, .content blockquote, .content img, .to-top …) { corner-shape: squircle; }
}
```
Because squircle corners look visually smaller than circular ones at the same radius, the block also bumps radii slightly (multiply tokens ~1.3) inside the `@supports`. The round back-to-top button stays `50%` (a circle has no squircle variant worth applying).

Alternatives: SVG/`mask-image` squircles — heavy, breaks borders/shadows, not worth it; `clip-path: shape()` — clips shadows. `corner-shape` is pure progressive enhancement (Chromium today; Safari/Firefox fall back to normal radii).

### 3. Navigation as pills
Replace `border-left: 4px` + `border-radius: 0 4px 4px 0` with full `--radius-md` pills; current page = `--color-primary-hover` background + bold, plus a small accent dot/bar inside the pill via `::before` (keeps the brand accent without the hard left border). Hover: background fades in using `--duration-fast`. Section sublinks keep text-only style with color transition.

### 4. Cards (TOC, blockquote, tables)
`.toc a` becomes a card: `--radius-lg`, `--color-muted` background, `--shadow-sm`, no left border. Hover (only under `@media (hover: hover)`): `--shadow-md` + `translateY(-2px)`; `:active`: `scale(0.98)`. Transition `transform`, `box-shadow` with `--ease-spring`/`--duration`. Blockquote: rounded `--radius-lg` muted panel, left support-color border replaced by a thinner inset accent or removed. Wide tables on <900px get rounded container (`overflow` already set, so radius clips correctly).

### 5. Frosted sticky bar (<900px)
```css
@supports (backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px)) {
  @media (max-width: 899px) {
    .sidebar { background: color-mix(in srgb, var(--color-primary) 82%, transparent);
               -webkit-backdrop-filter: saturate(180%) blur(20px); backdrop-filter: saturate(180%) blur(20px); }
  }
}
```
82% opacity keeps white text contrast ≥ 4.5:1 over any content (content is mostly white/dark text, worst case is close to the opaque value). Desktop sidebar stays opaque (it does not overlap content).

### 6. Menu open/close animation
Use the native `<details>` with CSS only:
```css
:root { interpolate-size: allow-keywords; }
.menu::details-content { block-size: 0; opacity: 0; overflow: clip;
  transition: block-size var(--duration) var(--ease-out), opacity …, content-visibility var(--duration) allow-discrete; }
.menu[open]::details-content { block-size: auto; opacity: 1; }
```
Scoped to `@media (max-width: 899px)` and to `@supports selector(::details-content)`, so the desktop rule that forces `::details-content` visible is not affected. Browsers without support just open instantly. No JS needed; existing JS that sets `menu.open = false` after a link click also animates closed.

Alternative: JS-driven height animation (Web Animations API) — works in more browsers, but adds code and conflicts with the no-JS requirement; rejected for now.

### 7. Back-to-top button
Replace `opacity/visibility 0.2s` with `opacity`, `transform: scale(0.8)` → `scale(1)` using `--ease-spring`, `visibility` with `allow-discrete`-style delay; `:active { transform: scale(0.92) }`. Shadow → `--shadow-md`. Hidden-state logic in JS unchanged.

### 8. Press feedback & micro-interactions
Global light touch: `-webkit-tap-highlight-color: transparent` on interactive elements we style ourselves (they now have their own `:active` state), so iOS gray flash doesn't fight the pill/card feedback. Focus ring keeps `outline` (accent) but gets `outline-offset` and inherits element radius (outline follows `border-radius` in modern browsers).

### 9. Reduced motion
One block at the end:
```css
@media (prefers-reduced-motion: reduce) {
  :root { --duration-fast: 0s; --duration: 0s; --duration-slow: 0s; }
  .toc a:hover, .toc a:active, .to-top, .to-top:active { transform: none; }
}
```
Since all transitions use duration tokens, zeroing them covers everything; `scroll-behavior: smooth` is already gated on `no-preference`. Replaces the existing per-rule `.to-top { transition: none }`.

## Risks / Trade-offs

- [Translucent bar reduces text contrast over busy content] → keep 82%+ opacity and `saturate()`; verify with real pages (tables, images) on iPhone.
- [`backdrop-filter` on a sticky element can cost scroll performance on old devices] → limited to the small top bar only; desktop sidebar stays opaque.
- [`corner-shape` is Chromium-only; Safari users (main audience) won't see squircles] → accepted; radii and shadows still give the Apple-like feel, and Safari picks it up automatically when shipped.
- [`interpolate-size`/`::details-content` animation only in Chromium] → menu still works instantly elsewhere; no regression.
- [Hover lift on touch devices can "stick" after tap] → hover effects gated by `@media (hover: hover)`.
- [Overshooting spring curves look gimmicky if overused] → spring easing only on transform (button, cards); color/opacity use plain `--ease-out`.

## Migration Plan

Pure CSS (plus possibly no markup change). Deploy as usual; rollback = revert the commit. Verify with the existing Playwright setup on desktop, iPad and iPhone viewports, and with reduced-motion emulation.

## Open Questions

- Should the doctor photo also get a card-style shadow, or only rounded corners? (Default: rounded only.)
- Keep the `h2` green underline or soften it into a thinner hairline? (Default: keep color, make it 1px hairline for a lighter look.)
