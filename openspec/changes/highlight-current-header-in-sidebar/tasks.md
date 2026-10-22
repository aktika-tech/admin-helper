## 1. Scrollspy script

- [ ] 1.1 In `src/layouts/Layout.astro`, extend the existing `is:inline` script with a scrollspy: on load and on rAF-throttled scroll, find the last `.content h2[id]` whose `getBoundingClientRect().top` ≤ its `scroll-margin-top`, and mark the matching sidebar section link (`a[href$="#<id>"]`) with `aria-current="location"` and `.is-current`, clearing any previous highlight
- [ ] 1.2 Make the script no-op cleanly when there are no section links or no matching heading (no console errors)

## 2. Styles

- [ ] 2.1 In `src/styles/global.css`, style `.sidebar nav ul ul a.is-current` with `color: var(--color-accent)` and `font-weight: 700`, keeping existing hover styles
- [ ] 2.2 Confirm the highlight is legible on the dark sidebar and does not wrap/overflow at phone width

## 3. Verification

- [ ] 3.1 `npm run build` and `npm run check` pass
- [ ] 3.2 On `lechenie.html`: at the top no section is highlighted; scrolling to «Для взрослых» highlights it; scrolling back to «Для детей» moves the highlight; a direct `#vzroslye` link opens with «Для взрослых» highlighted; clicking a section link lands with the right highlight
- [ ] 3.3 On `prezentaciavrachi.html`: scrolling to a doctor highlights that doctor's name in the sidebar
- [ ] 3.4 At ≤899px the highlight switches below the sticky menu, not before; with JS disabled the section links still navigate and no highlight/broken style appears
