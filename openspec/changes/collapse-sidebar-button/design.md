## Context

The site is static Astro 7 with the React integration installed but not yet used. All styling lives in `src/styles/global.css`, and colours are defined only as `--color-*` variables there. There is no Tailwind or shadcn. The sidebar (`Sidebar.astro`) is a `<details class="menu">`. From 900px it is always open and forms the left grid column (`--sidebar-width`: 270px, or 220px at 900–1199px). Below 900px it is a sticky top bar with a "Меню" summary. `Layout.astro` already has one inline script (heading links, closing the menu, the to-top button).

## Goals / Non-Goals

**Goals:**
- A desktop-only toggle that collapses the sidebar to a rail and expands it again, with the state remembered and no flash on load.
- Introduce shadcn/ui `Button` as the shared button primitive, themed with brand colours.
- No visual change to anything else.

**Non-Goals:**
- Replacing the mobile "Меню" summary or the to-top link with the shadcn Button. They can migrate later.
- Icon-only navigation in the rail (page icons or tooltips per page).
- Hydrated React islands. The UI stays zero-JS-framework at runtime.

## Decisions

- **Tailwind v4 via `@tailwindcss/vite`, without preflight.** shadcn's Button is written with Tailwind classes. In `global.css`, import only `tailwindcss/theme.css` and `tailwindcss/utilities.css` (not `preflight.css`), so the existing reset and Markdown styles stay in charge. Alternative: copy the Button and rewrite it in plain CSS. Rejected, because it drifts from shadcn, which the user asked for, and later `shadcn add` components would need the same rework.
- **Brand theme via shadcn tokens.** Define shadcn's variables in `:root`, pointing at the brand palette: `--primary: var(--color-primary)`, `--primary-foreground: var(--color-on-primary)`, `--ring: var(--color-accent)`, `--accent: var(--color-primary-hover)`, `--accent-foreground: var(--color-on-primary)`, `--background: var(--color-surface)`, `--foreground: var(--color-text)`, `--border`/`--input: var(--color-muted)`, and `--radius: var(--radius-md)`. Expose them to Tailwind with `@theme inline { --color-primary: var(--primary); … }`. Watch for a name clash: shadcn's `--color-primary` theme key is the same name as our brand variable. Checked in the build: Tailwind still emits `--color-primary: var(--primary)` (and its own `--radius-md`, `--ease-out`, …) inside `@layer theme`. Unlayered declarations always beat layered ones, so the brand values in `:root` win and no `--brand-*` renaming is needed. The Button source stays as `shadcn add button` generates it. Brand comes only from tokens.
- **Scoped preflight for shadcn components.** Without preflight, `<button>` keeps the browser's font, black text and grey background, and the outline and link variants come out wrong. A small reset in `@layer base` applies only to `[data-slot]` elements (shadcn components set it): margins, padding and border are zeroed, and font and colour are inherited with a transparent background. Utilities still override it.
- **Focus ring matches the site.** The site-wide rule `:focus-visible { outline: 3px solid var(--color-accent) }` stays. shadcn's `focus-visible:ring-*` resolves to `--ring` = accent, so both are orange. No override is needed.
- **Static render of the React Button, behaviour in vanilla JS.** Use `<Button variant="ghost" size="icon" …>` in `Sidebar.astro` without `client:*`. Astro renders it to plain HTML, so no React reaches the browser. Wire the click in the existing inline script in `Layout.astro`. Alternative: a `client:load` island. Rejected, because it costs about 40 KB of runtime for one toggle and the state could only be applied after hydration, which causes a flash.
- **State on `<html data-sidebar="collapsed">`, set before paint.** A small `is:inline` script in `<head>` reads `localStorage['sidebar']` inside try/catch and sets the attribute. CSS keys off `[data-sidebar="collapsed"]` inside `@media (min-width: 900px)`. The toggle flips the attribute and writes storage in try/catch. Also set `data-js` on `<html>` from the same head script. The toggle is hidden unless `[data-js]` is present, which gives the no-JS fallback.
- **Collapsed layout.** Set `--sidebar-width` to about `4rem` when collapsed. The grid column animates through a transition on `grid-template-columns` (supported in current browsers; elsewhere it snaps). In the rail, hide `.site-name-text` and `.menu nav` with `display: none`/`visibility: hidden`, so the links leave the tab order. Keep the logo and toggle centred and stacked. The icon comes from `lucide-react`: `PanelLeftClose` when expanded and `PanelLeftOpen` when collapsed. Swap them with CSS on the data attribute, rendering both and hiding one, so the static HTML is correct in either state.
- **Toggle placement.** In the expanded state it goes at the top right of the sidebar, beside the site name, aligned with the logo. In the collapsed state it sits under the logo. On desktop the sidebar becomes a two-column grid (`minmax(0, 1fr) auto`) with the nav spanning both columns. At 900–1199px the 220px sidebar left the name only 108px, but "Актика.helper" needs about 137px in Segoe UI. The user chose to widen the sidebar there to 260px rather than move the button or shrink the name.
- **Rail width.** 4.5rem (72px) rather than 4rem, so the 36px button has 0.5rem of side padding.
- **ARIA.** `aria-controls` points at the nav `id`. The script updates `aria-expanded` and `aria-label` ("Свернуть меню" / "Развернуть меню") on toggle and once at startup, so they match the saved state.

## Risks / Trade-offs

- [Tailwind utilities or theme variables clash with existing class or variable names, e.g. `--color-primary`] → No preflight, utilities are only used inside `ui/` components, and the token names are checked in the built CSS. Fall back to the `--brand-*` aliases if there is a clash.
- [Bundle and CSS size grow] → Tailwind v4 emits only the utilities it finds in source. The cost is a few KB of CSS and no runtime JS.
- [Animating `grid-template-columns` jitters text inside the sidebar] → Hide the text immediately on collapse and fade it in after the width transition on expand. Durations come from `--duration`, which is 0 under reduced motion.
- [The sidebar is `overflow-y: auto` and the rail could show a scrollbar] → The nav is hidden in the rail, so the content is short.
- [Old browsers without `::details-content` keep the `summary` visible on desktop] → Already handled by the existing `@supports` block. The toggle is independent of `<details>`.

## Migration Plan

This is a purely additive front-end change, deployed through the usual GitHub Pages workflow. To roll back, revert the commit. Leftover `localStorage['sidebar']` values are harmless.

## Open Questions

- Should the rail later show per-page icons with tooltips? This change leaves it out.
