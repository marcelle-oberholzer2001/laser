# Laser Prices calculator (for the therapist)

A quick price calculator that lives on her phone's home screen like an app. It is the page `calc/` on the website, e.g. `https://<the website>/calc/`. It's hidden from Google (`noindex`) and not linked from the site.

Prices and discounts come straight from `site-data.js`, so when you change a price there, the calculator changes too. Nothing to update here.

## Put it on her phone

- **iPhone (Safari):** open the link → Share button → **Add to Home Screen** → Add.
- **Android (Chrome):** open the link → ⋮ menu → **Add to Home screen** (or **Install app**).

It opens full screen with a dark "+ − × =" icon called **Laser Prices**.

## Using it

1. Tap **Female** or **Male**. Areas not offered for that client disappear.
2. Tap **Single** or the course length (**3×, 6×, 9×, 12×**).
3. Tap the areas. The total at the bottom updates straight away:
   - Single: the price for this session.
   - Course: the amount to pay upfront, with the price per session underneath.
4. **Clear** (top right) starts over for the next client.

**Full Body** is at the bottom of the list. It's a fixed package (30% off), so it can't be combined with single areas.

The maths is the same as the website's "Build your own package": 2 areas 5%, 3 → 10%, 4 → 15%, 5 → 20%, 6+ → 25%, plus the course discount on top.
