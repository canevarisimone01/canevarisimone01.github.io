# Modevari Site — Setup & Maintenance Guide

This is a plain static website: HTML, CSS, and a little JavaScript. There is **no
build step**. You can open `index.html` in a browser, or drop the whole folder
onto any static host. The only "moving parts" you'll ever touch are two small
data files:

| File | What it's for | When you edit it |
| --- | --- | --- |
| `config.js` | Download URLs, version numbers, release dates, accent colours | **Every new release** |
| `translations.js` | All on-screen text, in English + Italian | When wording changes or you add a language |

Everything else (`index.html`, `style.css`, `app.js`) you can usually leave alone.

---

## 0. The files at a glance

```
modevari-site/
├── index.html        SPA shell + all page templates (one file, no routing server needed)
├── style.css         All styles + theme variables (colours/fonts in the :root block at top)
├── app.js            Routing, language store, glue (rarely edited)
├── config.js         ← release metadata: URLs, versions, dates  (EDIT FOR RELEASES)
├── translations.js   ← all text, EN + IT                        (EDIT FOR WORDING/LANGUAGE)
└── SETUP.md          this guide
```

---

## 1. Run it locally

Because the page loads `config.js` / `translations.js` as separate files, some
browsers block them if you open `index.html` directly via `file://`. The fix is
to serve the folder over a tiny local web server. Any of these work — pick one:

```bash
# Python 3 (already installed on most machines)
python -m http.server 8000

# Node.js
npx serve .          # or: npx http-server .

# PHP
php -S localhost:8000
```

Then open <http://localhost:8000> in your browser. That's it.

---

## 2. Create the GitHub repositories and enable Releases

You'll host the downloadable builds on **GitHub Releases** (free, reliable, and
gives you a stable "always latest" URL).

1. Create a GitHub organisation or use your personal account. The default config
   assumes an org called **`modevari`** — change it in `config.js` (`site.githubOrg`).
2. Create one repository per app, e.g. `dnd-companion`, `hexcrawl`, `cartographer`.
   (The repo names are set per project in `config.js` → `projects[].repo`.)
3. Releases are enabled on every GitHub repo by default — there's nothing to turn
   on. You'll find them under the repo's **"Releases"** link (right-hand sidebar).

---

## 3. Upload a build to a Release

For each new version of an app:

1. Go to the repo → **Releases** → **"Draft a new release"**.
2. Choose or create a tag (e.g. `v0.1-beta`) and give the release a title.
3. **Upload your build artifacts** by dragging the files into the
   "Attach binaries" area — for example:
   - `modevari-companion.apk`
   - `modevari-companion-win.zip`
4. Click **"Publish release"**.

> **Tip — keep filenames stable.** The site links to
> `…/releases/latest/download/<filename>`, which always serves the file with that
> exact name from your most recent release. If you keep the filenames the same
> every release, you often won't have to touch the URLs at all — just bump the
> version/date in `config.js`.

---

## 4. Update `config.js` for the new release

Open `config.js` and, for the relevant project, update:

```js
{
  slug: "dnd-companion",
  repo: "dnd-companion",                 // your GitHub repo name
  version: "v0.2-beta",                  // ← bump this
  releaseDate: "2026-07-15",             // ← update this (YYYY-MM-DD)
  changelogUrl: "https://github.com/modevari/dnd-companion/releases", // ← optional
  platforms: [
    { name: "Android", ext: ".apk", file: "modevari-companion.apk" },     // ← must match the uploaded filename
    { name: "Windows", ext: ".zip", file: "modevari-companion-win.zip" }  // ← must match the uploaded filename
  ]
}
```

The download button URL is assembled automatically as:

```
{site.githubOrg}/{repo}/releases/latest/download/{platforms[].file}
```

So as long as `site.githubOrg`, `repo`, and each `file` are correct, the buttons
point at the right downloads. **Remember to replace the placeholder `modevari`
GitHub org with your real one** the first time.

Save the file and refresh — done. No rebuild, no redeploy step beyond pushing the
updated `config.js` to your host.

---

## 5. Deploy the site (GitHub Pages recommended)

GitHub Pages can host the site for free.

**Option A — host from a repo root**

1. Create a repo, e.g. `modevari-site`, and push these files to it.
2. Repo → **Settings** → **Pages**.
3. Under "Build and deployment", set **Source: Deploy from a branch**.
4. Choose branch **`main`** and folder **`/ (root)`**. Save.
5. Wait a minute; your site appears at
   `https://<org-or-user>.github.io/modevari-site/`.

**Option B — host from a `/docs` folder**

Put the site files inside a `docs/` folder in any repo, then in
**Settings → Pages** choose branch `main` and folder **`/docs`**. Handy if the
repo also contains other things.

**Custom domain (optional):** add your domain under Settings → Pages → "Custom
domain", and create the matching DNS records your registrar documents.

> Any other static host works too — Netlify, Vercel, Cloudflare Pages, or plain
> shared hosting. Just upload the folder; there's nothing to compile.

---

## 6. Editing text & adding a language (i18n)

All visible text lives in `translations.js` as one object:

```js
window.MODEVARI_I18N = {
  en: { nav_home: "Home", hero_title: "Modevari", /* … */ },
  it: { nav_home: "Home", hero_title: "Modevari", /* … */ }
};
```

**Rules**

- A value is either a **string** (most things) or an **array of strings** (used
  for multi-paragraph descriptions and feature bullet lists).
- Every key must exist in **both** languages. If one is missing, the site falls
  back to English, then to the raw key name — so a missing key shows up obviously.
- Project text is keyed by the project's `i18nKey` from `config.js`. For
  `i18nKey: "dnd"` the keys are `proj_dnd_name`, `proj_dnd_tagline`,
  `proj_dnd_short`, `proj_dnd_desc` (array), `proj_dnd_features` (array).

**To change wording:** find the key and edit its value in both `en` and `it`.

**To fill in the team:** edit `team_m1_name` / `team_m1_role` / `team_m1_bio`
(and the `m2` equivalents) in both languages.

**To add a third language (e.g. French):**

1. In `translations.js`, copy the whole `en: { … }` block, rename it to
   `fr: { … }`, and translate every value.
2. That's all — the language toggle reads the available languages directly from
   this object (`Object.keys`), so a new `EN | IT | FR` button appears
   automatically and the choice is saved to the visitor's browser.

The active language is remembered between visits via `localStorage`
(`modevari_lang`), and the toggle is the **EN | IT** control in the top-right of
the nav bar.

---

## 7. Changing the look (colours, fonts, spacing)

Open `style.css` and look at the `:root { … }` block at the very top. Almost
every colour, font, radius, and shadow is a CSS variable defined there. For
example:

```css
--gold: #d9b25f;        /* primary accent           */
--bg: #0b0f1a;          /* page background          */
--font-display: "Cinzel", serif;   /* headings      */
--font-body: "DM Sans", system-ui, sans-serif; /* body */
```

Per-project accent colours (the blue / green / rust highlights on the detail
pages) live in `config.js` → `projects[].accent` and `accentSoft`, so designers
and release managers don't collide.

The fonts are loaded from Google Fonts via a `<link>` in `index.html`. To self-
host them (e.g. for strict offline use), download the families, add `@font-face`
rules to `style.css`, and remove the Google Fonts `<link>`.

---

## 8. Offline / CDN notes

The site pulls three things from CDNs:

- **Google Fonts** (Cinzel, DM Sans, Spectral)
- **Alpine.js** (the small reactive framework that powers the UI)
- **Lucide** (a couple of chrome icons)

If a CDN is unreachable, the site degrades gracefully: fonts fall back to system
serif/sans, and missing Lucide icons are simply skipped (the code guards for it).
Alpine is required for interactivity. **For guaranteed offline operation**,
download `alpinejs` and `lucide` next to `index.html`, and change the `<script>`
`src` attributes to point at the local copies (the relevant lines are commented
in `index.html`). Versions are pinned in `index.html` so nothing changes
underneath you unexpectedly.

---

## 9. Quick troubleshooting

| Symptom | Likely cause / fix |
| --- | --- |
| Page shows nothing / blank | You opened it via `file://`. Serve it (see §1). |
| Text shows key names like `hero_title` | A translation key is missing — add it to `translations.js`. |
| Download button 404s | `repo` or `file` in `config.js` doesn't match the actual repo / uploaded asset name. |
| New version not showing | Did you bump `version`/`releaseDate` in `config.js` and redeploy that file? |
| Icons missing | Lucide CDN blocked/offline — expected; self-host to fix (see §8). |

---

_Tools forged for adventurers. May your sessions be ever memorable._
