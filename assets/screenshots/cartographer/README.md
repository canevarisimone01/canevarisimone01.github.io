# Cartographer Tool — screenshots

The preview images for the Cartographer Tool live here. Currently:

- `large_map.jpg`
- `medium_map.jpg`
- `small_map.jpg`

These are wired into the site by the `screenshots` array of the `cartographer`
project in `config.js` — each `src` must match a filename in this folder exactly
(GitHub Pages is case-sensitive). They appear in the **Preview** section of the
project page and open in a click-to-enlarge lightbox.

**Keep them web-sized.** The originals were 4096×4096 PNGs (~11 MB each), which
made the page load painfully slowly. They've been downscaled to 2048px on the
long edge and saved as JPEG (quality 85), which is ~96% smaller with no visible
quality loss. The full-resolution masters are kept outside the repo in
`landing_page/_screenshot_originals/`. Rule of thumb: a screenshot should be
well under ~500 KB. Resize/recompress before committing.

To change how many there are, or to use different filenames, just edit that
`screenshots` array — each entry is `{ src, alt }`. Keep `alt` descriptive for
accessibility. PNG/JPG/WebP all work; update the `src` extension to match.

You can delete this README once the images are in place — it's only here to
document the folder.
