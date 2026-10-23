## 1. Tailwind and shadcn setup

- [x] 1.1 Install `tailwindcss` and `@tailwindcss/vite`, then add the Vite plugin in `astro.config.mjs`
- [x] 1.2 In `global.css`, import Tailwind theme and utilities only (no preflight) and confirm that existing pages look unchanged
- [x] 1.3 Add `@/*` → `src/*` path alias in `tsconfig.json`, and add `components.json` (style new-york, no RSC, tsx, css `src/styles/global.css`, aliases `@/components`, `@/lib/utils`)
- [x] 1.4 Add `src/lib/utils.ts` with `cn()` (`clsx` + `tailwind-merge`)
- [x] 1.5 Add the Button with `npx shadcn@latest add button` (or copy its source), installing `class-variance-authority`, `@radix-ui/react-slot` and `lucide-react`

## 2. Brand theme

- [x] 2.1 Define shadcn tokens in `:root` (`--primary`, `--primary-foreground`, `--accent`, `--accent-foreground`, `--ring`, `--background`, `--foreground`, `--border`, `--input`, `--radius`) in terms of the brand `--color-*` variables
- [x] 2.2 Map the tokens with `@theme inline`, check the built CSS for `--color-primary` name clashes, and switch to `--brand-*` aliases if needed
- [x] 2.3 Verify that the default, outline and ghost variants use brand colours and show the accent focus ring

## 3. Toggle markup

- [x] 3.1 In `Sidebar.astro`, render `<Button variant="ghost" size="icon" class="sidebar-toggle">` (static, no `client:*`) with both `PanelLeftClose` and `PanelLeftOpen` icons, `aria-controls` pointing at the nav id, `aria-expanded="true"` and `aria-label="Свернуть меню"`
- [x] 3.2 Give the `<nav>` an `id` and place the toggle beside the site name in the header row (sidebar widened to 260px at 900–1199px so it fits)

## 4. State and behaviour

- [x] 4.1 Add an `is:inline` script in the `<head>` of `Layout.astro` that sets `data-js` and, from `localStorage['sidebar']` (in try/catch), `data-sidebar="collapsed"` on `<html>`
- [x] 4.2 In the existing body script, sync `aria-expanded` and `aria-label` with the state at startup, toggle the attribute on click, and save the state (in try/catch)

## 5. Styles

- [x] 5.1 Hide `.sidebar-toggle` below 900px and when `html:not([data-js])`
- [x] 5.2 Collapsed rail at ≥ 900px: `--sidebar-width: 4.5rem`, hide `.site-name-text` and `.menu nav` (out of the tab order), stack the logo and toggle centred, and show the matching icon
- [x] 5.3 Animate `grid-template-columns` with `--duration`/`--ease-out`, and make sure reduced motion disables it
- [x] 5.4 Style the toggle on the primary sidebar: on-primary icon, `--color-primary-hover` on hover, accent focus outline

## 6. Verification

- [x] 6.1 Run `npm run check` and `npm run build` with no errors, and confirm that the built HTML has no React runtime script
- [x] 6.2 At 1280px and 1000px, test collapse and expand, then reload and navigate to confirm the state persists with no flash
- [x] 6.3 At 768px and 375px, confirm that the toggle is absent and the "Меню" behaviour is unchanged
- [x] 6.4 Test the keyboard (Tab, Enter or Space, focus kept, hidden links skipped) and screen reader labels
- [x] 6.5 With JS disabled, confirm that the sidebar is expanded and the toggle is hidden; with storage blocked, confirm that the page defaults to expanded and the toggle still works
