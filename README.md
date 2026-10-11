# Miami Beach · Digital QR Menu

A mobile-first digital menu for an Italian restaurant. Guests scan a QR code, browse the menu, customise dishes and build an order, all from their phone. Built with plain HTML, CSS and JavaScript: no framework, no dependencies, no build step.

**Live demo:** https://gudagit.github.io/restaurant-menu-app/  
**Case study (what I did, screens, results):** [CASE-STUDY.md](CASE-STUDY.md)

<p align="center">
  <img src="screenshots/mobile-1-welcome.webp" width="19%" alt="Welcome screen">
  <img src="screenshots/mobile-2-menu.webp" width="19%" alt="Menu with section tabs and category chips">
  <img src="screenshots/mobile-3-search.webp" width="19%" alt="Live search results">
  <img src="screenshots/mobile-4-detail-options.webp" width="19%" alt="Dish detail with variants and extras">
  <img src="screenshots/mobile-5-order.webp" width="19%" alt="Order drawer with totals">
</p>

<p align="center">
  <img src="screenshots/desktop-2-menu.webp" width="62%" alt="Desktop menu grid">
  <img src="screenshots/tablet-menu.webp" width="30%" alt="Tablet layout">
</p>

## Features

- **Browse** by section (Breakfast, Lunch, Drinks) and category, with **live search** across names, descriptions and categories.
- **Dish detail** with a large photo, variants with their own prices (e.g. Eggs Benedict), and extras that depend on the dish type (coffee gets extra shot and oat milk, pizza gets chili oil, and so on).
- **Order cart:** quick add, floating order bar, bottom-sheet drawer with quantity controls, service charge and total. The cart persists across reloads via `localStorage`.
- **Favourites** saved on the device in their own tab, plus a **Share** button using the Web Share API with a clipboard fallback.
- **Responsive** from 280 px to 2560 px: 1 column on phones, 2 on tablets, 3 to 5 on laptops and large monitors, with text scaling up on big screens, safe-area support for notched phones, touch-friendly targets, and `prefers-reduced-motion` and `prefers-contrast` support.
- **Accessible:** semantic landmarks and buttons, ARIA labels, visible focus states, keyboard navigation and Escape to close dialogs.
- **Installable:** a web app manifest lets guests add the menu to their home screen.
- **Fast:** images are resized WebP (about 4 MB for 103 dishes), lazy-loaded with a shimmer placeholder.

## How this was made

I built this project while learning front-end development, working together with an AI coding assistant. The assistant helped write and refactor code, and helped test the layout on different screen sizes. I decided what to build, the look and the features, chose the menu content and the photos, checked every photo's licence, reviewed and tested the result, and published it. I can walk through how each part of the code works.

## Quality checks

Lighthouse run against a local server (mobile run uses Lighthouse's simulated throttling):

| | Performance | Accessibility | Best Practices | SEO |
|---|---|---|---|---|
| Mobile | 92 | 100 | 100 | 100 |
| Desktop | 99 | 100 | 100 | 100 |

Layout was also checked in headless Chrome at 11 screen sizes, from a 280 px folded phone through phones, landscape phones, tablets and laptops up to a 2560 px monitor: no console errors, no horizontal scrolling, and every tap target at least 36 px.

## Run locally

No install needed. Serve the folder with any static server:

```bash
npx http-server -p 5500
# then open http://localhost:5500
```

## Project structure

```
index.html            page markup
styles.css            design tokens, layout and responsive rules
script.js             rendering, search, cart, favourites
menu-data.js          the whole menu as data (edit this to change dishes and prices)
images/               optimised dish photos + CREDITS.md
screenshots/          images used in this README
manifest.webmanifest  web app manifest
```

To add a dish, add an entry to `menu-data.js`. Optional fields: `options` for variants with their own prices, and `popular: true` for the "Popular" badge.

## Licensing and credits

- **Code:** MIT, see [LICENSE](LICENSE). Everything in the HTML, CSS and JavaScript was written for this project, and no third-party code or libraries are used.
- **Fonts:** [Inter](https://fonts.google.com/specimen/Inter) and [Playfair Display](https://fonts.google.com/specimen/Playfair+Display), both under the SIL Open Font License, loaded from Google Fonts.
- **Photos:** openly licensed stock images (CC BY, CC BY-SA, CC0) found through Openverse. Every photo is credited in [images/CREDITS.md](images/CREDITS.md). They are not photos of a real restaurant's dishes.
- **Demo only:** "Place order" shows a confirmation but does not send anything anywhere. The restaurant name and menu are placeholders made up for this demo.
