## Why

On desktop (≥ 900px) the sidebar always takes 220–270px of the screen. Wide price tables and long pages would be easier to read with the full width, and administrators want to hide the menu while they read a page and bring it back in one click. The site has no shared button component yet. Adopting the shadcn/ui `Button`, restyled with the brand palette, gives this control and later ones the same look and accessible behaviour.

## What Changes

- Add a "collapse sidebar" toggle button to the desktop sidebar (≥ 900px). It collapses the sidebar to a narrow rail that shows only the logo and the button, and expands it again.
- The choice is remembered between pages and visits, and a page opens in the saved state without a visible jump.
- At 900–1199px the sidebar grows from 220px to 260px. That is the narrowest width where the site name and the toggle fit on one row without clipping.
- Below 900px nothing changes: the existing "Меню" bar and dropdown stay as they are, and the toggle is not shown.
- Add Tailwind CSS v4 and shadcn/ui (`components.json`, `cn` helper, `src/components/ui/button.tsx`). Map shadcn theme tokens (`--primary`, `--ring`, `--accent`, …) to the existing brand variables, so the Button uses brand colours: primary `#00524d`, accent `#ff7300` for hover and focus.
- Tailwind's preflight (CSS reset) is not enabled, so the existing `global.css` styling stays unchanged.

## Capabilities

### New Capabilities
- `sidebar-collapse`: the desktop sidebar collapse/expand toggle, covering where it appears, the collapsed and expanded states, persistence, the no-JS fallback, and accessibility.
- `brand-button`: the shared shadcn-based Button component, which uses only brand palette colours and the site focus style.

### Modified Capabilities
<!-- none: openspec/specs/ is empty -->

## Impact

- **Code**: `src/components/Sidebar.astro` (toggle markup), `src/layouts/Layout.astro` (early inline script that applies the saved state before first paint, plus the click handler), `src/styles/global.css` (collapsed-rail styles, mapping shadcn tokens to brand variables, Tailwind import).
- **New files**: `components.json`, `src/lib/utils.ts` (`cn`), `src/components/ui/button.tsx`.
- **Dependencies**: `tailwindcss`, `@tailwindcss/vite`, `class-variance-authority`, `clsx`, `tailwind-merge`, `@radix-ui/react-slot`, `lucide-react` (icons). React is already installed and integrated.
- **Content**: none. Markdown pages, URLs and the mobile menu are unchanged.
