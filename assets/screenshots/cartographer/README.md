# Cartographer Tool — screenshots

Two images per map, a light one and a high-res one:

| File | Role | Size |
|------|------|------|
| `large_map.jpg` / `medium_map.jpg` / `small_map.jpg` | Thumbnail + initial fit view (loads with the page) | ~300–420 KB, 2048px |
| `large_map.full.jpg` / `medium_map.full.jpg` / `small_map.full.jpg` | High-res, loaded **only when you zoom** in the lightbox | ~1.4–1.9 MB, 4096px |

These are wired into the site by the `screenshots` array of the `cartographer`
project in `config.js` — each entry is `{ src, full, alt }`:

- `src`  → the light image (thumbnail + first view). **Required.**
- `full` → the high-res image, fetched on demand the first time the image is
  zoomed, then swapped in for crisp detail. **Optional** (omit to just zoom the
  light image). 
- `alt`  → descriptive alt text for accessibility.

Filenames must match exactly — **GitHub Pages is case-sensitive** (`Large_Map.JPG`
≠ `large_map.jpg`), unlike Windows. They appear in the **Map examples** section of
the project page and open in a click-to-enlarge, zoomable lightbox.

**Why two tiers?** The originals were 4096×4096 PNGs (~11 MB each), which made the
page crawl. The light `.jpg` (2048px, quality 85) keeps the page fast; the
`.full.jpg` (4096px, quality 92, ~1/7 the size of the PNG) is only ever downloaded
when someone actually zooms a single image, so it doesn't affect page load. The
full-resolution PNG masters are kept outside the repo in
`landing_page/_screenshot_originals/`.

Rule of thumb when adding images: light tier well under ~500 KB, high-res tier a
couple of MB at most. Resize/recompress before committing.
