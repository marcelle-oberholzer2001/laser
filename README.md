# Laser at Bloom

One-page static site for Laser at Bloom (laser hair removal, SilverLakes, Pretoria). Bookings go to Bloom's Fresha page.

## Editing

Everything you'd normally change is in **`site-data.js`**:

- `freshaUrl`: the Fresha booking link (used by every "Book" button)
- `phone`, `whatsapp`, `email`, `instagram`: leave as `""` to hide
- `hours`: opening hours shown under "Find us"
- `PRICE_CATEGORIES`: each item is `[name, ladies price, gents price, optional badge]`. Use `null` for "not offered".
  Ready-made **packages** are different: each is `[name, [the single areas it's made of], optional badge]`, and its price is calculated automatically (see Discounts).

### Photos

Put photos in the `images` folder with these names and they appear automatically:

- `hero.jpg`: the large dark banner at the top (shown behind a dark overlay, so any well-lit photo works). Wide, about 2000px.
- `studio.jpg`: next to "Where smooth skin begins".
- `treatment.jpg`: next to "Book your appointment".

Landscape photos at least 1600px wide work best.

### Before & after photos and reviews

Both live in `site-data.js`; each has an example line to copy. Until something is added, the site shows "coming soon" placeholders.

- **Before & after:** put the two photos in `images/results/` (e.g. `underarms-before.jpg`, `underarms-after.jpg`, landscape 4:3 and the same size), then add a line to `RESULTS`:
  `{ area: "Underarms", sessions: 6, before: "images/results/underarms-before.jpg", after: "images/results/underarms-after.jpg" },`
- **Reviews:** add a line to `REVIEWS`, using real client feedback with their permission:
  `{ name: "Anna M.", treatment: "Full Legs", stars: 5, text: "..." },`
  If the review text contains a double quote ("), put a backslash before it (\").

> **Before launch:** the reviews currently in `REVIEWS` are design samples (`sample: true`, shown with a "Sample" tag). Delete them all before the site goes live. Also fill in the yellow "To fill in" FAQ answers in `index.html` (search for `class="todo"`).

### Discounts

- `PACKAGE_DISCOUNTS`: % off for several areas in one visit (2 areas 5%, 3 → 10%, 4 → 15%, 5 → 20%, 6+ → 25%).
- `COURSE_DISCOUNTS`: extra % off for prepaying a course (3 sessions 3%, 6 → 5%, 9 → 7%, 12 → 10%), paid upfront in one payment.
- `MAX_TOTAL_DISCOUNT`: the two discounts multiply but never go beyond this (45%). With the current tables the best reachable is 32%, so the cap isn't hit.

**Ready-made package prices** = the ladies' (or gents') prices of their single areas added up × (100% − the area discount for that many areas), rounded to the nearest R10. Change `PACKAGE_DISCOUNTS` or a single-area price and every package updates by itself. If any area in a package isn't offered for gents, the package isn't either.

Every "up to …%" on the page shows the best discount reachable with the current tables. Per-session prices are rounded to the nearest R10, and the upfront total is the per-session price × number of sessions.

### Package builder

The "Build your own package" calculator is a **price guide only**. Fresha doesn't accept selected services from an outside website (the basket lives in Fresha's own session), so clients choose their areas again on Fresha when they book. The discount scale is `PACKAGE_DISCOUNTS` in `site-data.js`.

## Preview locally

```bash
node .claude/serve.mjs
```

Then open http://localhost:5173.

## Hosting

It is plain HTML/CSS/JS with no build step, so any static host works (Netlify, Cloudflare Pages, GitHub Pages).
