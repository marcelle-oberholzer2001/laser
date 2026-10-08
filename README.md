# Laser at Bloom

One-page static site for Laser at Bloom (laser hair removal, SilverLakes, Pretoria). Bookings go to Bloom's Fresha page.

## Editing

Everything you'd normally change is in **`site-data.js`**:

- `freshaUrl`: the Fresha booking link (used by every "Book" button)
- `phone`, `whatsapp`, `email`, `instagram`: leave as `""` to hide
- `hours`: opening hours shown under "Find us"
- `PRICE_CATEGORIES`: each item is `[name, ladies price, gents price, optional badge]`. Use `null` for "not offered".

### Photos

Put photos in the `images` folder named `studio.jpg` and `treatment.jpg`. They replace the "coming soon" placeholders automatically. Landscape photos around 1600px wide work best.

## Preview locally

```bash
node .claude/serve.mjs
```

Then open http://localhost:5173.

## Hosting

It is plain HTML/CSS/JS with no build step, so any static host works (Netlify, Cloudflare Pages, GitHub Pages).
