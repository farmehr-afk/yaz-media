# Yaz Media — Website

Cinematic dark + gold website for **Yaz Media**, a full-service California production company:
camera & crew hire, video editing/post-production, commercial & brand video production,
wedding/ceremony films, live events, and photography.

## ✅ Works fully offline

All libraries and fonts are vendored locally — no CDN calls, no build step:

- `vendor/bootstrap/` — Bootstrap 5.3.3 (CSS + JS bundle) — the "ready components" the site is built on
  (navbar, cards, carousel, accordion, modal, forms, grid)
- `vendor/icons/` — Bootstrap Icons 1.11.3 (SVG icon font; no emoji used)
- `css/fonts.css` + `fonts/` — Playfair Display & Inter, self-hosted woff2

Open `index.html` directly in a browser, or serve the folder with any static server.

## Pages

| File | Contents |
|---|---|
| `index.html` | Hero, stats, client marquee, 6 services, showreel, featured work, weddings band, process, testimonials, pricing, FAQ, CTA |
| `services.html` | Detailed service sections, add-on pricing table |
| `work.html` | Filterable 12-project portfolio grid |
| `about.html` | Story, values, team, gear list, service-area chips |
| `contact.html` | Contact info, validated inquiry form, mini-FAQ |

## Placeholders to replace before going live

1. **Phone / email** — `(310) 555-0148` and `hello@yazmedia.com` are fictional (search & replace across the 5 HTML files).
2. **Social links** — footer/chips point to `#`.
3. **Showreel** — drop your video at `assets/showreel.mp4`; the homepage modal will play it automatically (until then it shows an honest placeholder).
4. **Portfolio cards** — mix of free-license stock photos (`assets/img/stock/`, credits in `assets/img/stock/CREDITS.md` — keep them there, CC BY-SA requires attribution) and crops of the brand photos; swap each card for that project's real thumbnail when the film is delivered.

## Photos

- `assets/img/hero-main.jpg` + `src-*.jpg` — the two brand images (Telegram). The hero has a
  blurred 160px top extension (`_tmp-scripts/extend_hero.py`) so the man's head clears the fixed header.
- `assets/img/*.jpg` — text-free crops of those brand photos for section backgrounds
  (`_tmp-scripts/crop_photos.py` regenerates them; brightness-tunable).
- `assets/img/stock/` — themed stock photos fetched from **Wikimedia Commons** via the Commons API
  (`_tmp-scripts/commons_fetch.py`), CC0/PD/CC BY/CC BY-SA only, normalized to max 1280px q82.
  Credits: `assets/img/stock/CREDITS.md` — do not delete (CC BY-SA license requires attribution).
5. **Stats, testimonials, client names, team bios, pricing** — sample content written to look real; replace with your actual numbers/reviews.
6. **Contact form** — front-end validation only; connect a backend (Formspree, Netlify Forms, or your server) in `js/main.js` (`#contactForm` handler).
7. **SEO** — add your real domain to the JSON-LD block in `index.html` and create OG images.

## Design system

- Palette: premium black `#0b0a08` / card `#1c1917` / gold accent `#d4a24e` / ivory `#f5f1e8`
  (adapted from the verified "Luxury/Premium — black + gold" palette in the ui-ux-pro-max library, tuned for dark mode)
- Type: Playfair Display (headings) + Inter (body) — "Classic Elegant" pairing
- Motion: scroll-reveal sections, animated counters, marquee, hover lifts — all disabled under `prefers-reduced-motion`
- Accessibility: 4.5:1+ contrast, visible focus rings, aria labels, keyboard-operable nav/carousel/accordion/modal

## Run locally

```bash
# any static server, e.g.:
python -m http.server 8123  # then open http://127.0.0.1:8123
```
