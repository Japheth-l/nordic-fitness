# Nordic Fitness website

Static showcase site for **Nordic Fitness**, Worthy Avenue, Adenta: gym and sports equipment, game room, wellness and outdoor living, all imported from the USA.

**Live:** https://japheth-l.github.io/nordic-fitness/

## Features
- Searchable, filterable product catalogue with quick-view details
- Inquiry list: shoppers pick items and send them in one message (WhatsApp or Instagram DM)
- Home Gym Finder quiz that recommends a setup based on goal, space and use
- Featured product spotlight, brand marquee, showroom map
- Mobile-first, with no build step and no dependencies

## Editing
- **Products:** `assets/js/products.js`. Add an entry and drop a photo at `assets/img/<id>.jpg`. Add `price: 12345` to show a price instead of "Ask for price".
- **WhatsApp number:** set `CONFIG.whatsapp` at the top of `assets/js/app.js` (digits only, e.g. `233241234567`). While it's empty, inquiries go to the Instagram DM and the message is copied to the clipboard.

## Deploy
GitHub Pages serves the `gh-pages` branch. To update it, push `main` and then run `git push origin main:gh-pages`.
