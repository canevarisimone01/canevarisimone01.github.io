/* ============================================================================
   MODEVARI — APP LOGIC
   ----------------------------------------------------------------------------
   Three small responsibilities, no framework beyond Alpine.js:

     1. i18n store      ($store.i18n)   — current language + translation lookup,
                                          persisted to localStorage.
     2. router store    ($store.router) — hash-based SPA routing
                                          (#home, #about, #projects/<slug>).
     3. glue            — re-render Lucide icons and update <title> on every
                          route or language change.

   Load order (set in index.html, all `defer`, so they run in order):
       config.js  ->  translations.js  ->  app.js  ->  alpine.min.js
   This file only REGISTERS things inside the `alpine:init` event, which Alpine
   fires before it touches the DOM — so the stores exist before any binding is
   evaluated. Nothing here runs until Alpine is ready.
   ========================================================================== */

(function () {
  "use strict";

  /* The set of valid top-level routes. Anything else falls back to 'home'. */
  var TOP_LEVEL = ["home", "about", "projects"];

  /* When set, the next hashchange scrolls to this element id instead of the top
     of the page. Used by "Back to projects" so it lands on the projects grid. */
  var pendingScroll = null;

  /* Transient pointer bookkeeping for the lightbox image zoom/pan. There is only
     ever one overlay on screen, so module-level state is safe — and it keeps the
     (frequently-mutated) pointer maps out of Alpine's reactive object. Only
     `lbZoom` (on the component) is reactive; it drives the CSS transform. */
  var lbPointers = new Map();   // pointerId -> { x, y }
  var lbPanStart = null;        // { px, py, x, y } baseline for single-pointer pan
  var lbPinchStart = null;      // { dist, scale } baseline for two-pointer pinch
  var lbDownInfo = null;        // { x, y, t, moved, pinched } for tap detection
  var lbHiResFor = -1;          // shot index whose hi-res image has been requested

  /* Parse window.location.hash into a normalised route object.
     "#projects/dnd-companion" -> { section: "projects", slug: "dnd-companion" }
     "#about"                  -> { section: "about",    slug: null }
     ""                        -> { section: "home",     slug: null }          */
  function parseHash() {
    var raw = (window.location.hash || "").replace(/^#\/?/, "").trim();
    if (!raw) return { section: "home", slug: null };

    var parts = raw.split("/");
    var section = parts[0];
    var slug = parts[1] || null;

    if (TOP_LEVEL.indexOf(section) === -1) {
      return { section: "home", slug: null };
    }
    return { section: section, slug: slug };
  }

  /* Re-run Lucide so any <i data-lucide="..."> placeholders become <svg>.
     Safe to call repeatedly: once an icon is rendered it has no data-lucide
     attribute left, so it is simply skipped on later passes. We guard for the
     CDN being unavailable (offline first load) so the site never throws. */
  function refreshIcons() {
    if (window.lucide && typeof window.lucide.createIcons === "function") {
      window.lucide.createIcons();
    }
  }

  /* Keep the document title in sync with the current view + language. */
  function updateTitle() {
    var i18n = window.Alpine && window.Alpine.store("i18n");
    var router = window.Alpine && window.Alpine.store("router");
    if (!i18n || !router) return;

    var base = i18n.t("site_title");
    var suffix = "";

    if (router.section === "about") {
      suffix = i18n.t("about_title");
    } else if (router.section === "projects" && router.slug) {
      var project = window.MODEVARI_CONFIG.getProject(router.slug);
      if (project) suffix = i18n.t("proj_" + project.i18nKey + "_name");
    }

    document.title = suffix ? suffix + " · " + base : base;
  }

  /* ---- Register Alpine stores -------------------------------------------- */
  document.addEventListener("alpine:init", function () {
    var Alpine = window.Alpine;

    /* --- root UI component (x-data="app" on #app) ------------------------- */
    /* Holds nav UI state and the small helpers used across the templates.
       Kept here (not inline in the HTML) so index.html stays readable. */
    Alpine.data("app", function () {
      return {
        /* nav state */
        mobileOpen: false,
        projectsOpen: false,

        /* direct handles to the data files for use in bindings */
        config: window.MODEVARI_CONFIG,
        projects: window.MODEVARI_CONFIG.projects,

        /* translation shortcuts (delegate to the i18n store) */
        t: function (key) {
          return this.$store.i18n.t(key);
        },
        tl: function (key) {
          return this.$store.i18n.list(key);
        },

        /* smooth-scroll to an element id, respecting reduced-motion */
        scrollTo: function (id) {
          var el = document.getElementById(id);
          if (!el) return;
          var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
          el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
        },

        /* format an ISO date (YYYY-MM-DD) in the active language */
        formatDate: function (iso) {
          try {
            var d = new Date(iso + "T00:00:00");
            var locale = this.$store.i18n.lang === "it" ? "it-IT" : "en-GB";
            return d.toLocaleDateString(locale, { year: "numeric", month: "long", day: "numeric" });
          } catch (e) {
            return iso;
          }
        },

        /* "2024" or "2024–2026" for the footer copyright */
        copyrightYears: function () {
          var founded = this.config.site.foundedYear;
          var now = new Date().getFullYear();
          return now > founded ? founded + "–" + now : "" + founded;
        },

        /* Return to the home page AND land on the projects grid. We flag the
           target and let the hashchange handler do the scrolling once the home
           view is visible, so it doesn't fight the usual scroll-to-top. */
        backToProjects: function () {
          pendingScroll = "projects";
          this.$store.router.go("home");
        },

        /* --- Screenshot lightbox ----------------------------------------- */
        /* `shots` is the project's screenshots array; `index` is which one was
           clicked. The overlay markup lives at the app root in index.html. */
        lightbox: { open: false, shots: [], index: 0 },

        /* Pan/zoom state for the lightbox image. scale 1 = fit; x/y are screen-px
           pan offsets. The only reactive zoom state (drives the CSS transform). */
        lbZoom: { scale: 1, x: 0, y: 0 },

        /* URL currently shown in the lightbox. Starts as the light image, then is
           swapped to the high-res `full` once it loads on the first zoom. */
        lbSrc: "",

        /* The screenshot currently on display (or null when none). */
        get lightboxCurrent() {
          return this.lightbox.shots[this.lightbox.index] || null;
        },

        openLightbox: function (shots, index) {
          this.lightbox.shots = Array.isArray(shots) ? shots : [];
          this.lightbox.index = index || 0;
          this.lightbox.open = true;
          this.lbResetZoom();
          this.lbSetShot();
          /* stop the page behind the overlay from scrolling */
          document.body.style.overflow = "hidden";
          /* move keyboard focus into the dialog */
          this.$nextTick(function () {
            if (this.$refs.lightboxClose) this.$refs.lightboxClose.focus();
          }.bind(this));
        },

        closeLightbox: function () {
          this.lightbox.open = false;
          this.lbResetZoom();
          document.body.style.overflow = "";
        },

        lightboxNext: function () {
          if (!this.lightbox.open || this.lightbox.shots.length < 2) return;
          this.lightbox.index = (this.lightbox.index + 1) % this.lightbox.shots.length;
          this.lbResetZoom();
          this.lbSetShot();
        },

        lightboxPrev: function () {
          if (!this.lightbox.open || this.lightbox.shots.length < 2) return;
          var n = this.lightbox.shots.length;
          this.lightbox.index = (this.lightbox.index - 1 + n) % n;
          this.lbResetZoom();
          this.lbSetShot();
        },

        /* Show the light/fast image for the current shot, then immediately begin
           upgrading to the high-res version so an opened map is sharp right away
           (and instantly crisp when zoomed). The light image displays first and
           the hi-res swaps in as soon as it has downloaded. */
        lbSetShot: function () {
          var cur = this.lightboxCurrent;
          this.lbSrc = cur ? cur.src : "";
          lbHiResFor = -1;
          this.lbRequestHiRes();
        },

        /* Load the high-res `full` image on demand (first zoom) and swap it in
           once downloaded — but only if we're still on the same shot. The browser
           caches it, so the swap is instant and flicker-free. */
        lbRequestHiRes: function () {
          var cur = this.lightboxCurrent;
          if (!cur || !cur.full) return;
          var idx = this.lightbox.index;
          if (lbHiResFor === idx) return;
          lbHiResFor = idx;
          var self = this;
          var hi = new Image();
          hi.onload = function () {
            if (self.lightbox.open && self.lightbox.index === idx) self.lbSrc = cur.full;
          };
          hi.src = cur.full;
        },

        /* --- Lightbox image zoom & pan ----------------------------------- */
        /* The image carries a CSS `transform: translate(x,y) scale(s)`. Because
           translate is applied in screen pixels, all the maths below works
           directly against the element's getBoundingClientRect(). */

        /* CSS transform string bound to the image's :style. */
        get lbTransform() {
          var z = this.lbZoom;
          return "translate(" + z.x + "px," + z.y + "px) scale(" + z.scale + ")";
        },

        /* Back to fit, centred, and drop any in-flight gesture. */
        lbResetZoom: function () {
          this.lbZoom.scale = 1;
          this.lbZoom.x = 0;
          this.lbZoom.y = 0;
          lbPointers.clear();
          lbPanStart = null;
          lbPinchStart = null;
          lbDownInfo = null;
        },

        /* Stop the scaled image from being panned entirely off-screen. */
        lbClampPan: function () {
          var img = this.$refs.lightboxImg;
          if (!img) return;
          var maxX = Math.max(0, (img.offsetWidth * this.lbZoom.scale - window.innerWidth) / 2 + 40);
          var maxY = Math.max(0, (img.offsetHeight * this.lbZoom.scale - window.innerHeight) / 2 + 40);
          this.lbZoom.x = Math.max(-maxX, Math.min(maxX, this.lbZoom.x));
          this.lbZoom.y = Math.max(-maxY, Math.min(maxY, this.lbZoom.y));
        },

        /* Zoom to `newScale` while keeping the screen point (cx,cy) fixed. */
        lbZoomAt: function (newScale, cx, cy) {
          var img = this.$refs.lightboxImg;
          if (!img) return;
          newScale = Math.max(1, Math.min(6, newScale));
          if (newScale > 1) this.lbRequestHiRes();
          var rect = img.getBoundingClientRect();
          if (rect.width > 0 && rect.height > 0) {
            var ratio = newScale / this.lbZoom.scale;
            var fx = (cx - rect.left) / rect.width;
            var fy = (cy - rect.top) / rect.height;
            this.lbZoom.x += fx * rect.width * (1 - ratio);
            this.lbZoom.y += fy * rect.height * (1 - ratio);
          }
          this.lbZoom.scale = newScale;
          if (newScale === 1) {
            this.lbZoom.x = 0;
            this.lbZoom.y = 0;
          } else {
            this.lbClampPan();
          }
        },

        /* +/- buttons: zoom about the viewport centre. */
        lbZoomBy: function (factor) {
          this.lbZoomAt(this.lbZoom.scale * factor, window.innerWidth / 2, window.innerHeight / 2);
        },

        /* Wheel: zoom toward the cursor. */
        lbWheel: function (e) {
          var factor = e.deltaY < 0 ? 1.15 : 1 / 1.15;
          this.lbZoomAt(this.lbZoom.scale * factor, e.clientX, e.clientY);
        },

        lbPointerDown: function (e) {
          var img = this.$refs.lightboxImg;
          if (img && img.setPointerCapture) {
            try { img.setPointerCapture(e.pointerId); } catch (err) {}
          }
          lbPointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
          if (lbPointers.size === 1) {
            lbPanStart = { px: e.clientX, py: e.clientY, x: this.lbZoom.x, y: this.lbZoom.y };
            lbDownInfo = { x: e.clientX, y: e.clientY, t: Date.now(), moved: false, pinched: false };
            lbPinchStart = null;
          } else if (lbPointers.size === 2) {
            var p = Array.from(lbPointers.values());
            lbPinchStart = {
              dist: Math.hypot(p[0].x - p[1].x, p[0].y - p[1].y) || 1,
              scale: this.lbZoom.scale
            };
            lbPanStart = null;
            if (lbDownInfo) lbDownInfo.pinched = true;
          }
        },

        lbPointerMove: function (e) {
          if (!lbPointers.has(e.pointerId)) return;
          lbPointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
          if (lbPointers.size >= 2 && lbPinchStart) {
            var p = Array.from(lbPointers.values());
            var dist = Math.hypot(p[0].x - p[1].x, p[0].y - p[1].y) || 1;
            this.lbZoomAt(
              lbPinchStart.scale * (dist / lbPinchStart.dist),
              (p[0].x + p[1].x) / 2,
              (p[0].y + p[1].y) / 2
            );
          } else if (lbPanStart) {
            var dx = e.clientX - lbPanStart.px;
            var dy = e.clientY - lbPanStart.py;
            if (lbDownInfo && Math.hypot(dx, dy) > 6) lbDownInfo.moved = true;
            if (this.lbZoom.scale > 1) {
              this.lbZoom.x = lbPanStart.x + dx;
              this.lbZoom.y = lbPanStart.y + dy;
              this.lbClampPan();
            }
          }
        },

        lbPointerUp: function (e) {
          lbPointers.delete(e.pointerId);
          if (lbPointers.size < 2) lbPinchStart = null;
          if (lbPointers.size === 1) {
            var rem = Array.from(lbPointers.values())[0];
            lbPanStart = { px: rem.x, py: rem.y, x: this.lbZoom.x, y: this.lbZoom.y };
          } else if (lbPointers.size === 0) {
            /* A clean tap (no drag, no pinch) toggles zoom at the tap point. */
            if (lbDownInfo && !lbDownInfo.moved && !lbDownInfo.pinched &&
                (Date.now() - lbDownInfo.t) < 400) {
              if (this.lbZoom.scale > 1) this.lbResetZoom();
              else this.lbZoomAt(2.5, lbDownInfo.x, lbDownInfo.y);
            }
            lbPanStart = null;
            lbDownInfo = null;
          }
        }
      };
    });

    /* --- i18n store ------------------------------------------------------- */
    Alpine.store("i18n", {
      /* Restore the saved language; default to English. */
      lang: localStorage.getItem("modevari_lang") || "en",

      /* All known language codes, derived from the translations object so the
         toggle stays correct if you add a language. */
      languages: Object.keys(window.MODEVARI_I18N),

      /* Translate a key. Falls back: active lang -> English -> the raw key. */
      t: function (key) {
        var dict = window.MODEVARI_I18N[this.lang] || {};
        var fallback = window.MODEVARI_I18N.en || {};
        var value = key in dict ? dict[key] : fallback[key];
        return value === undefined ? key : value;
      },

      /* Translate a key whose value is an array (paragraphs / feature lists).
         Always returns an array so x-for never breaks. */
      list: function (key) {
        var value = this.t(key);
        return Array.isArray(value) ? value : [];
      },

      /* Set the language, persist it, update <html lang>, refresh the title. */
      set: function (code) {
        if (!this.languages.includes(code)) return;
        this.lang = code;
        localStorage.setItem("modevari_lang", code);
        document.documentElement.setAttribute("lang", code);
        updateTitle();
      },

      /* Used by the EN | IT toggle: jump to the next language in the list. */
      toggle: function () {
        var i = this.languages.indexOf(this.lang);
        this.set(this.languages[(i + 1) % this.languages.length]);
      }
    });

    /* --- router store ----------------------------------------------------- */
    var initial = parseHash();
    Alpine.store("router", {
      section: initial.section, // "home" | "about" | "projects"
      slug: initial.slug, // project slug when section === "projects", else null

      /* Is the current top-level section `name`? Used by x-show on sections. */
      is: function (name) {
        return this.section === name;
      },

      /* True when a single project detail page is showing. */
      isProject: function () {
        return this.section === "projects" && !!this.project();
      },

      /* The config object for the current project (or undefined). */
      project: function () {
        return this.slug ? window.MODEVARI_CONFIG.getProject(this.slug) : undefined;
      },

      /* Programmatic navigation (also reachable by plain <a href="#..."> links). */
      go: function (route) {
        window.location.hash = route;
      },

      /* Re-read the hash and update reactive state. Called on hashchange. */
      sync: function () {
        var next = parseHash();
        this.section = next.section;
        this.slug = next.slug;
      }
    });

    /* --- glue: react to language changes ---------------------------------- */
    /* When the language store changes, Alpine re-renders text bindings; we just
       make sure freshly-shown icons get drawn. */
    Alpine.effect(function () {
      /* touch the reactive value so this effect re-runs on language change */
      void Alpine.store("i18n").lang;
      Alpine.nextTick(refreshIcons);
    });

    /* Set initial <html lang> + title once stores exist. */
    document.documentElement.setAttribute("lang", Alpine.store("i18n").lang);
    updateTitle();
    Alpine.nextTick(refreshIcons);
  });

  /* ---- Routing side-effects (outside Alpine) ----------------------------- */
  /* hashchange only fires after the page is interactive, by which point Alpine
     and its stores exist. We update the store, scroll to top, redraw icons and
     refresh the title. */
  window.addEventListener("hashchange", function () {
    var router = window.Alpine && window.Alpine.store("router");
    if (!router) return;
    router.sync();
    updateTitle();

    /* nextTick lets Alpine reveal the new section before we scroll / draw. */
    window.Alpine.nextTick(function () {
      refreshIcons();
      if (pendingScroll) {
        var el = document.getElementById(pendingScroll);
        pendingScroll = null;
        if (el) {
          el.scrollIntoView({ block: "start", behavior: "auto" });
          return;
        }
      }
      window.scrollTo({ top: 0, behavior: "auto" });
    });
  });

  /* Draw any icons present in the very first paint (nav, footer, hero) as soon
     as the DOM is parsed, even before Alpine wakes up. */
  document.addEventListener("DOMContentLoaded", refreshIcons);
})();
