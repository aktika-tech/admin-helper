## 1. Breakpoints and tokens

- [x] 1.1 Add a comment block at the top of `src/styles/global.css` documenting the tiers: phone < 600px, tablet 600–899px, desktop ≥ 900px (narrow sidebar 900–1199px)
- [x] 1.2 Add `@media (min-width: 600px)` overriding `--gap: 2rem`, and centre `.content` with `margin-inline: auto` in the tablet tier only
- [x] 1.3 Add `@media (min-width: 900px) and (max-width: 1199px)` overriding `--sidebar-width` to ~220px

## 2. Phone and tablet content

- [x] 2.1 Reduce `.content h2` / `h3` sizes for phone and restore current sizes at `min-width: 600px`
- [x] 2.2 Below 900px make `.content table` a horizontal scroll container (`display: block; overflow-x: auto`, auto width so cells still wrap); keep current `display: table; width: 100%` at ≥ 900px
- [x] 2.3 On phone centre the doctor photo and cap its width; confirm the existing 600px rule gives the two-column card on tablet

## 3. Touch devices

- [x] 3.1 Add `@media (hover: none), (pointer: coarse)` giving top-level `.sidebar nav` links and `.menu summary` a min tap height of 44px
- [x] 3.2 In the same query show `.content .heading-link::after` at a subtle constant opacity

## 4. Viewport height and safe areas

- [x] 4.1 Add `viewport-fit=cover` to the viewport meta in `src/layouts/Layout.astro`
- [x] 4.2 Use `100vh` then `100dvh` for `.layout` `min-height` and the sticky desktop `.sidebar` `height`
- [x] 4.3 Pad `.sidebar` and `.content` horizontally with `max(<current padding>, env(safe-area-inset-left/right))`

## 5. Verification

- [x] 5.1 `npm run build` and `npm run check` pass
- [x] 5.2 In devtools at 320, 375, 768, 820, 1024 and 1366px: no horizontal page scroll; correct tier (top-bar menu below 900px, sidebar at ≥ 900px); content ≥ 600px wide at 1024px
- [x] 5.3 `breketi.html` at 375px: price table swipes inside its box, page doesn't move sideways
- [x] 5.4 `prezentaciavrachi.html`: photo above text at 375px, beside text at 768px
- [x] 5.5 Touch emulation: menu links ≥ 44px tall, `#` hint visible on `h2`; on desktop the hint still appears only on hover/focus
- [ ] 5.6 Check the PR preview on a real iPhone (Safari, portrait + landscape) and iPad: footer visible on short pages, nothing under the notch

## 6. Mobile menu bar

- [x] 6.1 Below 900px make `.sidebar` sticky at the top (with safe-area top padding) and let the open `.menu nav` scroll within `100dvh`
- [x] 6.2 Stretch the opened menu to full width via `.menu::details-content { flex-basis: 100% }`
- [x] 6.3 Below 900px raise heading `scroll-margin-top` so anchors land below the bar
- [x] 6.4 In `Layout.astro` close the menu after a link is chosen (below 900px only)
- [x] 6.5 Verified at 375/768px: full-width menu, bar stays visible, tapping «Для взрослых» closes the menu and shows the heading below the bar; desktop sidebar unchanged
