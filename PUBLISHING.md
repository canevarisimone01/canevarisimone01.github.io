# Publishing a Tool / App — Step-by-Step Guide

This is the repeatable recipe for putting a downloadable build (executable, app,
etc.) online and wiring its **Download** button into the website. Follow it once
per app, then re-use the short "New version" section for every later update.

> **The golden rule:** executables and other build files do **NOT** go in the
> website folder. The website lives on GitHub Pages (small text files only).
> The actual downloads live on **GitHub Releases** — GitHub's free, unlimited
> place for distributing built files. The website just links to them.

---

## 0. Placeholders used in this guide

Replace these with your real values wherever you see them:

| Placeholder | Means | Example |
| --- | --- | --- |
| `<GITHUB_USER>` | Your GitHub account (owner of the repos) | `canevarisimone01` |
| `<APP_REPO>` | The repo name for this one app | `cartographer` |
| `<APP_SLUG>` | The site's URL segment for this app (the `slug` in `config.js`) | `cartographer` |
| `<VERSION>` | The release tag/version | `v0.1-beta` |
| `<RELEASE_DATE>` | Release date, format `YYYY-MM-DD` | `2026-06-15` |
| `<ASSET_FILE>` | The EXACT filename you upload to the release | `modevari-cartographer-win.zip` |
| `<PLATFORM_NAME>` | Button label | `Windows` / `Android` |
| `<PLATFORM_EXT>` | Shown in parentheses on the button | `.zip` / `.apk` |

The final download URL is always assembled by the site as:

```
https://github.com/<GITHUB_USER>/<APP_REPO>/releases/latest/download/<ASSET_FILE>
```

Because it points at `releases/latest`, you usually only re-upload assets with
the **same filename** each version and never touch the URL again.

---

## 1. Package the build

1. Put the executable (plus any files it needs to run — data, DLLs, assets) into
   a single folder.
2. **Zip that folder.** Prefer `.zip` over a bare `.exe`: browsers often warn or
   block raw `.exe` downloads, and a zip bundles everything together.
3. Name the zip exactly `<ASSET_FILE>` (e.g. `modevari-cartographer-win.zip`).

   > **Keep this filename stable across versions.** The site links to
   > `.../releases/latest/download/<ASSET_FILE>`, so a stable name means future
   > releases need zero URL changes.

---

## 2. Create the GitHub repository (first time only)

1. On GitHub, signed in as `<GITHUB_USER>`, create a new repository named
   `<APP_REPO>`.
2. It can be empty — you only need it to host Releases. (It does **not** need to
   contain the source code, though it can.)
3. Releases are enabled on every repo by default; nothing to turn on.

---

## 3. Publish a Release

1. Open the `<APP_REPO>` repo → **Releases** (right-hand sidebar) →
   **"Draft a new release"**.
2. **Choose a tag** → create a new one like `<VERSION>` (e.g. `v0.1-beta`).
3. Give the release a **title** (e.g. "<APP_REPO> <VERSION>").
4. Drag your `<ASSET_FILE>` into the **"Attach binaries"** box.
5. Click **"Publish release"**.

Your file is now publicly downloadable at:

```
https://github.com/<GITHUB_USER>/<APP_REPO>/releases/latest/download/<ASSET_FILE>
```

---

## 4. Wire it into the website (`config.js`)

Open `config.js`. Each app is one object in the `projects: [ ... ]` array.

### If the app is ALREADY listed (e.g. cartographer, dnd, hexcrawl)

Just update its fields:

```js
{
  slug: "<APP_SLUG>",
  repo: "<APP_REPO>",                 // must match the GitHub repo name
  version: "<VERSION>",               // ← bump this
  releaseDate: "<RELEASE_DATE>",      // ← update (YYYY-MM-DD)
  changelogUrl: "https://github.com/<GITHUB_USER>/<APP_REPO>/releases", // optional but nice
  platforms: [
    { name: "<PLATFORM_NAME>", ext: "<PLATFORM_EXT>", file: "<ASSET_FILE>" } // must match uploaded filename
  ]
}
```

### If it's a BRAND-NEW app (not yet on the site)

Add a new object to the `projects` array. Minimum template:

```js
{
  slug: "<APP_SLUG>",                 // becomes the URL #projects/<APP_SLUG> — never change after launch
  i18nKey: "<APP_SLUG>",              // text lookup key; see "Add the text" below
  repo: "<APP_REPO>",
  icon: "compass",                    // an inline <svg> id that exists in index.html
  accent: "#d68a52",                  // any CSS colour (detail-page highlight)
  accentSoft: "#e9c79a",              // a lighter companion colour
  status: "beta",                     // drives the badge
  version: "<VERSION>",
  releaseDate: "<RELEASE_DATE>",
  changelogUrl: "https://github.com/<GITHUB_USER>/<APP_REPO>/releases",
  platforms: [
    { name: "<PLATFORM_NAME>", ext: "<PLATFORM_EXT>", file: "<ASSET_FILE>" }
  ]
}
```

> **Multiple platforms?** Add more objects to `platforms[]`, one per file:
> ```js
> platforms: [
>   { name: "Windows", ext: ".zip", file: "<APP>-win.zip" },
>   { name: "Android", ext: ".apk", file: "<APP>.apk" }
> ]
> ```

#### Add the text for a brand-new app (`translations.js`)

A new app needs these keys in **both** `en` and `it`, keyed by `i18nKey`
(for `i18nKey: "<APP_SLUG>"` → replace `<APP_SLUG>` in each key below):

- `proj_<APP_SLUG>_name`      — string (app name)
- `proj_<APP_SLUG>_tagline`   — string (one-line pitch)
- `proj_<APP_SLUG>_short`     — string (card blurb)
- `proj_<APP_SLUG>_desc`      — array of strings (paragraphs)
- `proj_<APP_SLUG>_features`  — array of strings (bullet list)

Copy an existing project's keys (e.g. the `carto` ones) and edit the values.

---

## 5. Deploy the website

Commit and push the changed `config.js` (and `translations.js` if you edited it)
to the **`canevarisimone01.github.io`** repo. GitHub Pages redeploys
automatically in about a minute. No build step.

```bash
git add config.js translations.js
git commit -m "Release <APP_REPO> <VERSION>"
git push
```

---

## 6. Verify

1. Open the live site, go to the app's page.
2. Click **Download** — it should download `<ASSET_FILE>`.
3. If it 404s, check the troubleshooting table below.

---

## New version of an existing app (the 30-second update)

Once an app is set up, every later release is just:

1. Zip the new build with the **same** `<ASSET_FILE>` name.
2. Draft a new GitHub Release (new tag, e.g. `<VERSION>`), attach the zip, publish.
3. In `config.js`: bump `version` and `releaseDate` for that project.
4. `git commit` + `git push` the `config.js`.

That's it — the download URL never changes because it always tracks `latest`.

---

## Troubleshooting

| Symptom | Likely cause / fix |
| --- | --- |
| Download button 404s | `repo` or `file` in `config.js` doesn't match the actual repo / uploaded asset name. Check spelling exactly. |
| Button points at the wrong account | `site.githubOrg` in `config.js` must be `https://github.com/<GITHUB_USER>`. |
| New version not showing | Did you bump `version`/`releaseDate` in `config.js` AND push it? Pages caches briefly. |
| Browser warns the download is unsafe | You uploaded a bare `.exe`. Zip it instead and update `file`/`ext` in `config.js`. |
| New app shows key names like `proj_x_name` | Missing translation keys — add them to `translations.js` in both `en` and `it`. |

---

_Reusable guide. One repo per app, builds on Releases, the site just links to the
latest. May your releases be ever painless._
