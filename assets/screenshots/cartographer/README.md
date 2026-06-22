# Cartographer Tool — screenshots

The preview images for the Cartographer Tool live here. Currently:

- `large_map.png`
- `medium_map.png`
- `small_map.png`

These are wired into the site by the `screenshots` array of the `cartographer`
project in `config.js` — each `src` must match a filename in this folder exactly
(GitHub Pages is case-sensitive). They appear in the **Preview** section of the
project page and open in a click-to-enlarge lightbox.

To change how many there are, or to use different filenames, just edit that
`screenshots` array — each entry is `{ src, alt }`. Keep `alt` descriptive for
accessibility. PNG/JPG/WebP all work; update the `src` extension to match.

You can delete this README once the images are in place — it's only here to
document the folder.
