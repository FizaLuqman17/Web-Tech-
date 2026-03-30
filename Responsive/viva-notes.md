# Havenly Landing Page – Viva Notes

## 1) File structure
- `site.html` = full page content (sections + text + images).
- `site.css` = custom visual design (colors, spacing, fonts, card styles).
- Bootstrap CDN is included mainly for simple responsive utility classes.

## 2) Page flow (top to bottom)
1. Navbar (`#navbar`)
2. Promo banner (`#promo-banner`)
3. Hero section (`#hero`)
4. How it works (3 steps: `#how-it-works`, `#step-02`, `#step-03`)
5. Pricing cards (`#pricing`)
6. Press quote/logos (`#press`)
7. Portfolio tabs (`#portfolio`)
8. Before/After showcase (`#before-after`)
9. Reviews (`#reviews`)
10. Design help tags (`#design-help`)
11. Partners section (`#partners`)
12. Guarantee banner (`#guarantee`)
13. Footer (`#footer`)

## 3) How responsiveness works
- Core design still comes from `site.css`.
- Bootstrap utility classes help with responsive behavior, for example:
  - `flex-column flex-lg-row` = stacked on small screens, row on large screens.
  - `img-fluid` = images scale within parent width.
  - `flex-wrap` = items wrap when space is less.
  - `w-100` = full width when needed.

## 4) Most important HTML concepts used
- Semantic sections: `header`, `section`, `footer`.
- Grouping with `div` containers.
- Reusable class names for styling repeated components (cards, buttons, tabs).
- IDs for major sections so navigation links can jump to them.

## 5) Most important CSS concepts used
- Flexbox for horizontal/vertical alignment.
- Typography styling (font-size, weight, letter-spacing).
- Color and spacing system (padding, margin, background, text colors).
- Card/image polish (border-radius, hover effects, shadows).

## 6) Short viva answer (ready to speak)
"This is a single-page landing page built with HTML and CSS. HTML defines semantic sections from navbar to footer. CSS gives the visual identity and layout. I kept styles component-based using IDs/classes for each section. For responsiveness, I used Bootstrap utility classes like `flex-column flex-lg-row` and `img-fluid`, so layout adapts on smaller screens without changing the desktop design."