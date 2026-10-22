## 1. Tokens

- [x] 1.1 In `src/styles/global.css` `:root`, add radius tokens (`--radius-sm/md/lg`), two-layer soft shadow tokens (`--shadow-sm/md`, tinted via `color-mix`), duration tokens (`--duration-fast/--duration/--duration-slow`) and easing tokens (`--ease-out`, `--ease-spring` with a `cubic-bezier` fallback and a `linear()` spring override under `@supports`)
- [x] 1.2 Replace every literal `4px` radius and the existing `0.2s` transition with the tokens

## 2. Shape

- [x] 2.1 Restyle sidebar nav items as `--radius-md` pills: remove the 4px left border, mark the current page with a filled background, bold text and a small accent indicator (`::before`), add background/color transitions
- [x] 2.2 Round the "Меню" button, images, doctor photos, blockquotes and (below 900px) scrollable tables with the radius tokens
- [x] 2.3 Add the `@supports (corner-shape: squircle)` block applying `corner-shape: squircle` to these elements with slightly larger radii
- [x] 2.4 Soften the `h2` underline to a hairline in the support color

## 3. Depth

- [x] 3.1 Turn `.toc a` into cards: `--radius-lg`, muted background, `--shadow-sm`, no left border; under `@media (hover: hover)` lift on hover (`--shadow-md`, `translateY(-2px)`), `scale(0.98)` on `:active`
- [x] 3.2 Below 900px, make the sticky sidebar bar translucent with `backdrop-filter: saturate(180%) blur(20px)` (plus `-webkit-` prefix) inside `@supports`, keeping the opaque fallback; check white text contrast
- [x] 3.3 Switch the back-to-top button shadow to `--shadow-md`

## 4. Motion

- [x] 4.1 Animate the "Меню" panel below 900px: `interpolate-size: allow-keywords`, `::details-content` block-size/opacity transition with `content-visibility … allow-discrete`, scoped to `@supports selector(::details-content)` and not affecting the desktop always-open rule
- [x] 4.2 Back-to-top button: fade + `scale(0.8 → 1)` show/hide with `--ease-spring`, `scale(0.92)` on `:active`; JS show/hide logic unchanged
- [x] 4.3 Add `-webkit-tap-highlight-color: transparent` to custom-styled interactive elements that now have their own `:active` feedback
- [x] 4.4 Add a single `prefers-reduced-motion: reduce` block that zeroes the duration tokens and removes transforms; remove the old per-rule `.to-top { transition: none }`

## 5. Verification

- [x] 5.1 `astro build` succeeds with no new warnings
- [x] 5.2 In the browser (Playwright) at 375px, 820px and 1280px: pills, cards, rounded images/tables render correctly; no horizontal scroll; current-section highlight, heading links, back-to-top and menu-closes-after-selection still work
- [ ] 5.3 Chromium: squircle corners visible and menu open/close animates; Firefox/WebKit: plain rounded corners, menu opens instantly, nothing broken (Chromium and Firefox verified; WebKit not run — missing system libraries in WSL)
- [x] 5.4 Below 900px, content scrolling under the top bar is blurred and the bar's text stays readable over tables and images
- [x] 5.5 With reduced-motion emulation: no translate/scale/height animation anywhere
