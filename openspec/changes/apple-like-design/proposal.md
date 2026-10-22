## Why

The current restyle is functional but visually flat: small 4px radii, hard borders, instant state changes and abrupt menu open/close. Administrators use the wiki all day, often on iPhones and iPads; an Apple-like visual language — continuous ("squircle") corners, soft depth, translucent bars and smooth, springy motion — would make it feel calmer, more polished and more native on those devices, without changing content or navigation.

## What Changes

- Introduce shared design tokens for corner radii, shadows, motion durations and easing curves in `global.css`, so every component uses the same values.
- Replace small `4px` radii with larger, consistent radii and use continuous ("squircle") corners via `corner-shape: squircle` where the browser supports it, falling back to ordinary `border-radius` elsewhere.
- Restyle interactive surfaces Apple-style: sidebar nav items as rounded "pills" instead of left-border bars, table-of-contents entries and blockquotes as rounded cards with soft shadows, rounded images and doctor photos, a rounded "Меню" button.
- Make the sticky top bar on phones/tablets translucent with a background blur ("frosted glass"), with an opaque fallback when `backdrop-filter` is unsupported.
- Add smooth transitions for hover, press and current-item states (color, background, shadow, subtle scale on press), a smooth open/close animation of the collapsible "Меню" on phones/tablets, and a spring-like show/hide for the back-to-top button.
- Respect `prefers-reduced-motion`: all non-essential motion is disabled or reduced to simple fades.
- Keep the company palette, fonts, layout breakpoints, URLs, Markdown content and existing behaviors (current-section highlight, heading links, back-to-top) unchanged.

## Capabilities

### New Capabilities
- `visual-style`: the site-wide Apple-like visual language — shape (continuous corners and radius scale), depth (shadows, translucent bar), motion (which elements animate, timing, easing) and the reduced-motion and unsupported-browser fallbacks.

### Modified Capabilities
<!-- none: openspec/specs/ is empty -->

## Impact

- **Code**: mainly `src/styles/global.css` (tokens and restyled rules); possibly small markup/class tweaks in `src/components/Sidebar.astro` and `src/layouts/Layout.astro` if needed for the menu animation.
- **Content**: none — Markdown pages and `DoctorCard.astro` data unchanged.
- **Dependencies**: none (pure CSS, progressive enhancement; no animation libraries).
- **Compatibility**: newer CSS features (`corner-shape`, `interpolate-size`, `::details-content`, `linear()` easing, `backdrop-filter`) are used only as enhancements; older browsers get the current look with plain rounded corners.
