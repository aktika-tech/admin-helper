## 1. Markup and behaviour

- [x] 1.1 In `src/layouts/Layout.astro`, add `id="top"` as the scroll target at the top of the page and render the back-to-top link (`<a class="to-top" href="#top">` with an `aria-hidden` arrow SVG and visually hidden text "Наверх") only when `id !== 'index'`
- [x] 1.2 Add a sentinel element one viewport height from the top and extend the inline script: observe it with `IntersectionObserver` and toggle the link's hidden state (class, `aria-hidden`, `tabindex="-1"`), skipping everything when the link is absent

## 2. Styles

- [x] 2.1 In `src/styles/global.css`, add `.to-top` styles: fixed bottom-right with safe-area offsets, 48px circle, palette colours, focus outline, hidden state with `visibility`/`opacity` transition, `z-index` below the mobile menu bar
- [x] 2.2 Add a visually-hidden utility class (if none exists) for the button's text label
- [x] 2.3 Enable `scroll-behavior: smooth` on `html` only under `prefers-reduced-motion: no-preference`

## 3. Verification

- [x] 3.1 `astro build` succeeds; the built main page has no `.to-top`, and a content page and `/prezentaciavrachi` have it
- [x] 3.2 In the browser: button hidden at the top, appears after scrolling one screen, returns to the title on click and with Tab + Enter, and is not focusable while hidden
- [x] 3.3 Check at 320px, 820px and 1280px: no horizontal scroll, button doesn't cover the sticky menu bar, works with reduced motion and with JavaScript disabled
