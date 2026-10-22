## 1. Markup

- [x] 1.1 In `src/components/DoctorCard.astro` move `id={doctor.id}` from `<article class="doctor">` to its `<h2>`
- [x] 1.2 In `src/layouts/Layout.astro` add an `is:inline` script at the end of `<body>` that wraps the children of every `.content :is(h2, h3, h4)[id]` (skipping headings that already contain an `<a>`) in `<a class="heading-link" href="#<id>">`

## 2. Styles

- [x] 2.1 In `src/styles/global.css` style `.content .heading-link`: inherit colour, no underline, pointer cursor
- [x] 2.2 Add the hover / `:focus-visible` `#` mark via `::after` in `--color-accent` with empty alt text (`content: "#" / ""`), inline so it never overflows at phone width

## 3. Verification

- [x] 3.1 `npm run build` and `npm run check` pass
- [x] 3.2 On `lechenie.html`: clicking «Для взрослых» sets `#vzroslye` and puts the heading at the top; clicking an h3 (`#кариес-1`) does the same; Back returns to the previous hash; h1 is not clickable
- [x] 3.3 On `prezentaciavrachi.html`: doctor names are clickable, `#kovaleva` and the sidebar doctor links still land on the card
- [x] 3.4 Keyboard: Tab reaches headings, focus outline and `#` are visible, Enter navigates; phone width shows no horizontal scroll
