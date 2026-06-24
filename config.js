/* ============================================================================
   MODEVARI — SITE CONFIGURATION
   ----------------------------------------------------------------------------
   THIS IS THE FILE YOU EDIT WHEN YOU SHIP A NEW RELEASE.

   It holds everything that changes between versions: download URLs, version
   numbers, release dates, changelog links and per-project accent colours.

   What lives WHERE (please read once):
     • config.js       -> release metadata: URLs, versions, dates, accents.
                          (this file — edit for every new build)
     • translations.js -> all human-readable text in English + Italian.
                          (edit to change wording or add a language)

   Why the split? So a non-developer can publish a new build by touching ONLY
   this file, and a translator can work in ONLY translations.js, without either
   one breaking the other. See SETUP.md for the full release walkthrough.

   The whole object is frozen at the bottom so a stray typo elsewhere can't
   silently overwrite your release data at runtime.
   ========================================================================== */

window.MODEVARI_CONFIG = {

  /* --- Studio-wide values ------------------------------------------------- */
  site: {
    /* Shown in the footer copyright. Leave as a number; the year is appended
       automatically in app.js so you never have to update it in January. */
    foundedYear: 2024,

    /* Your public links. */
    githubOrg: "https://github.com/canevarisimone01",   // your GitHub account
    contactEmail: "hello@modevari.dev",          // <-- REPLACE (or remove from footer)
  },

  /* --- Projects ----------------------------------------------------------- */
  /* The ARRAY ORDER is the order cards appear on the home page.

     Each project's human text (name, tagline, descriptions, features) lives in
     translations.js, looked up by `i18nKey` (e.g. i18nKey "dnd" -> the keys
     proj_dnd_name, proj_dnd_tagline, proj_dnd_short, proj_dnd_desc,
     proj_dnd_features). Keeping prose in translations.js is what makes the site
     translatable; keeping URLs here is what makes releasing painless.

     `slug` is the hash-route segment, e.g. slug "dnd-companion" => the URL
     #projects/dnd-companion. Don't change a slug after launch or old links
     (and search engines) will 404.

     `accent` / `accentSoft` are the per-project highlight colours used on the
     detail page (buttons, badges, glows). Any valid CSS colour works.

     `platforms[]` becomes the Download buttons. For each platform set:
        name     -> shown on the button ("Android", "Windows")
        ext      -> shown in parentheses (".apk", ".zip")
        file     -> the EXACT asset filename you uploaded to the GitHub Release

     The download href is assembled for you as:
        {githubOrg}/{repo}/releases/latest/download/{file}
     i.e. it always points at the LATEST release, so you usually only need to
     bump `version` + `releaseDate` and re-upload assets with the same names. */
  projects: [
    {
      slug: "dnd-companion",
      i18nKey: "dnd",
      repo: "dnd-companion",                 // <-- REPLACE with your repo name if different
      icon: "spellbook",                     // matches an inline <svg> id used in index.html
      accent: "#6ea0e6",                     // deep blue / steel
      accentSoft: "#bcd0f2",                 // silver-blue highlight
      status: "beta",                        // drives the "Beta Available" badge
      version: "v0.1-beta",                  // <-- REPLACE each release
      releaseDate: "2026-05-01",             // <-- REPLACE each release (YYYY-MM-DD)
      changelogUrl: "#",                     // <-- REPLACE with .../releases or CHANGELOG.md
      platforms: [
        { name: "Android", ext: ".apk", file: "modevari-companion.apk" }, // <-- REPLACE filename
        { name: "Windows", ext: ".zip", file: "modevari-companion-win.zip" } // <-- REPLACE filename
      ]
    },
    {
      slug: "hexcrawl",
      i18nKey: "hex",
      repo: "hexcrawl",                      // <-- REPLACE with your repo name if different
      icon: "hexmap",
      accent: "#6cba85",                     // forest green
      accentSoft: "#e8b25a",                 // amber
      status: "beta",
      version: "v0.1-beta",                  // <-- REPLACE each release
      releaseDate: "2026-05-01",             // <-- REPLACE each release
      changelogUrl: "#",                     // <-- REPLACE
      platforms: [
        { name: "Windows", ext: ".zip", file: "modevari-hexcrawl-win.zip" }, // <-- REPLACE filename
        { name: "Android", ext: ".apk", file: "modevari-hexcrawl.apk" }      // <-- REPLACE filename
      ]
    },
    {
      slug: "cartographer",
      i18nKey: "carto",
      repo: "cartographer-s_tool",
      icon: "compass",
      accent: "#d68a52",                     // rust
      accentSoft: "#e9c79a",                 // parchment / sepia
      status: "beta",
      version: "v0.1-beta",
      releaseDate: "2026-06-16",
      changelogUrl: "https://github.com/canevarisimone01/cartographer-s_tool/releases",
      // Each `file` must EXACTLY match an asset name on the latest GitHub release.
      platforms: [
        { name: "Windows", ext: ".zip", file: "cartographers-companion-win.zip" },
        { name: "Linux", ext: ".tar.gz", file: "cartographers-companion-linux.tar.gz" },
        { name: "Android", ext: ".apk", file: "cartographers-companion.apk" }
      ],
      /* Preview images for the detail page (clickable -> open in the lightbox).
         `src`  = light, fast image used for the thumbnail + initial fit view.
         `full` = optional high-resolution version, loaded on demand only when the
                  image is zoomed in the lightbox (keeps page load fast while still
                  giving crisp detail when you zoom). Both must be real files in
                  assets/screenshots/cartographer/. */
      screenshots: [
        { src: "assets/screenshots/cartographer/large_map.jpg", full: "assets/screenshots/cartographer/large_map.full.png", alt: "Cartographer Tool — large detailed map" },
        { src: "assets/screenshots/cartographer/medium_map.jpg", full: "assets/screenshots/cartographer/medium_map.full.png", alt: "Cartographer Tool — medium map" },
        { src: "assets/screenshots/cartographer/small_map.jpg", full: "assets/screenshots/cartographer/small_map.full.png", alt: "Cartographer Tool — small map" }
      ]
    }
  ],

  /* --- Helpers (do not normally need editing) ----------------------------- */

  /* Build the "latest release" download URL for a project + platform asset. */
  downloadUrl(project, platform) {
    return `${this.site.githubOrg}/${project.repo}/releases/latest/download/${platform.file}`;
  },

  /* Find a project by its slug (used by the router). Returns undefined if the
     slug is unknown, which the app treats as "not found". */
  getProject(slug) {
    return this.projects.find((p) => p.slug === slug);
  }
};

/* Lock it down so the data can't be mutated by accident at runtime. */
Object.freeze(window.MODEVARI_CONFIG);
Object.freeze(window.MODEVARI_CONFIG.site);
window.MODEVARI_CONFIG.projects.forEach((p) => {
  Object.freeze(p);
  p.platforms.forEach(Object.freeze);
  if (p.screenshots) p.screenshots.forEach(Object.freeze);
});
