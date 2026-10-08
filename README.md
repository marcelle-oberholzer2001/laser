# Laser at Bloom

One-page static site for Laser at Bloom (laser hair removal, SilverLakes, Pretoria). Bookings go to Bloom's Fresha page.

## Editing

Everything you'd normally change is in **`site-data.js`**:

- `freshaUrl`: the Fresha booking link (used by every "Book" button)
- `phone`, `whatsapp`, `email`, `instagram`: leave as `""` to hide
- `hours`: opening hours shown under "Find us"
- `PRICE_CATEGORIES`: each item is `[name, ladies price, gents price, optional badge]`. Use `null` for "not offered".

### Photos

Put photos in the `images` folder with these names and they appear automatically:

- `hero.jpg`: the large dark banner at the top (shown behind a dark overlay, so any well-lit photo works). Wide, about 2000px.
- `studio.jpg`: next to "Where smooth skin begins".
- `treatment.jpg`: next to "Book your appointment".

Landscape photos at least 1600px wide work best.

### Package builder

The "Build your own package" calculator is a **price guide only**. Fresha doesn't accept selected services from an outside website (the basket lives in Fresha's own session), so clients choose their areas again on Fresha when they book. The discount scale is `PACKAGE_DISCOUNTS` in `site-data.js`.

## Preview locally

```bash
node .claude/serve.mjs
```

Then open http://localhost:5173.

## Hosting

It is plain HTML/CSS/JS with no build step, so any static host works (Netlify, Cloudflare Pages, GitHub Pages).
