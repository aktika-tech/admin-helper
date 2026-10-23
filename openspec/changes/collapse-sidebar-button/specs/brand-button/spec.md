## ADDED Requirements

### Requirement: Shared shadcn Button component
The site SHALL provide one reusable Button component at `src/components/ui/button.tsx`, based on shadcn/ui's Button, with its `variant` (`default`, `outline`, `ghost`, …) and `size` (`default`, `sm`, `lg`, `icon`) options. It SHALL be usable from Astro templates as a server-rendered component that ships no client JavaScript.

#### Scenario: Rendered statically
- **WHEN** the Button is used in an Astro component without a `client:*` directive and the site is built
- **THEN** the HTML contains a `<button>` element and no React runtime is loaded for it

### Requirement: Brand colours only
Every Button variant SHALL use colours from the site palette in `global.css`. shadcn's theme tokens SHALL be defined in terms of the brand variables: primary `--color-primary`, foreground `--color-on-primary`, accent and focus ring `--color-accent`. Accent orange SHALL NOT be used as text colour on white.

#### Scenario: Default variant
- **WHEN** a Button with the default variant is rendered
- **THEN** its background is the brand primary `#00524d` and its text is white

#### Scenario: Focus
- **WHEN** a Button receives keyboard focus
- **THEN** it shows an outline or ring in brand accent `#ff7300`

#### Scenario: Ghost variant on the sidebar
- **WHEN** a ghost Button is placed on the primary-coloured sidebar
- **THEN** its icon uses the on-primary colour and its hover background is the sidebar hover colour

### Requirement: Existing styles unaffected
Adding Tailwind and shadcn SHALL NOT change how existing pages look. Tailwind's preflight reset SHALL NOT be applied.

#### Scenario: Content pages unchanged
- **WHEN** a content page such as `/lechenie` is compared before and after the change with the sidebar expanded
- **THEN** typography, spacing, lists, tables and the mobile menu look the same
