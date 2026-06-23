/* ============================================================================
   MODEVARI — TRANSLATIONS (i18n)
   ----------------------------------------------------------------------------
   Every piece of visible text lives here, once per language. The active
   language is held in an Alpine store ($store.i18n.lang) and persisted to
   localStorage, so switching EN <-> IT updates the whole page instantly with
   no reload.

   STRUCTURE
     window.MODEVARI_I18N = {
       en: { key: "English text", list_key: ["a", "b"] },
       it: { key: "Testo italiano", list_key: ["a", "b"] }
     }

   RULES OF THUMB
     • Keys must be IDENTICAL across en and it. If a key is missing in the
       active language, the app falls back to English, then to the raw key.
     • A value can be a STRING (most things) or an ARRAY OF STRINGS (used for
       multi-paragraph descriptions and bullet-point feature lists).
     • To add a third language, copy the whole `en` block, translate the
       values, and add it under a new code (e.g. `fr`). Then add the language
       to the toggle — see SETUP.md, "Adding a language".

   Project prose is keyed by the project's `i18nKey` from config.js, e.g.
   i18nKey "dnd" -> proj_dnd_name / proj_dnd_tagline / proj_dnd_short /
   proj_dnd_desc / proj_dnd_features.
   ========================================================================== */

window.MODEVARI_I18N = {

  /* ========================== ENGLISH ===================================== */
  en: {
    /* --- Document / meta --- */
    site_title: "Modevari — Digital tools for tabletop adventurers",

    /* --- Accessibility --- */
    skip_link: "Skip to main content",
    menu_open: "Open menu",
    menu_close: "Close menu",
    lang_toggle_label: "Switch language",
    home_link_label: "Modevari — go to home",

    /* --- Navigation --- */
    nav_home: "Home",
    nav_projects: "Projects",
    nav_about: "About",
    nav_projects_all: "All projects",

    /* --- Hero --- */
    hero_eyebrow: "An indie studio for the tabletop",
    hero_title: "Modevari",
    hero_subtitle: "Digital tools forged for tabletop adventurers",
    hero_paragraph:
      "Modevari is a two-person studio crafting digital companions for tabletop role-playing games. We build focused, beautiful tools that get out of the way — so players and game masters can spend less time on bookkeeping and more on the story.",
    hero_cta: "Explore our tools",
    hero_cta_about: "Meet the studio",

    /* --- Projects section (home) --- */
    projects_title: "Our Projects",
    projects_subtitle:
      "Three tools, forged at the table and refined in beta. Choose one to learn more.",
    card_learn_more: "Learn more",
    badge_beta: "Beta available",

    /* --- About teaser (home) --- */
    about_teaser_eyebrow: "Who we are",
    about_teaser_title: "Two developers, one shared obsession",
    about_teaser_text:
      "We love tabletop RPGs, and we kept hitting the same wall: the tools we wanted didn't exist. So we started building them — for our own table first, and now for yours.",
    about_teaser_link: "Read our story",

    /* --- About page --- */
    about_title: "About Modevari",
    about_lede:
      "A small independent studio with a simple belief: the right tool can elevate any session.",
    about_body: [
      "Modevari is two developers united by a love of tabletop role-playing games and the conviction that good software should feel like a natural extension of the table — never a distraction from it.",
      "We started Modevari after one too many evenings lost to scattered notes, half-broken spreadsheets, and apps that fought us instead of helping. We wanted something better: tools that are fast, beautiful, and built by people who actually play.",
      "Everything we make is shaped at our own game nights first, then handed to the wider community in open beta so it can grow with real feedback from real tables."
    ],
    about_philosophy_title: "How we work",
    about_philosophy: [
      "Player-focused. Every feature earns its place by making the game better, not by padding a feature list.",
      "Honest about beta. We tell you plainly what's finished and what's still cooking. No fake polish.",
      "Always improving. Each release is shaped by the people who use our tools at the table."
    ],
    team_title: "Meet the team",
    team_subtitle: "Two people, a lot of dice.",

    /* Team cards — placeholders, easy to fill in. */
    team_m1_name: "Member One",
    team_m1_role: "Co-founder · Design & Frontend",
    team_m1_bio:
      "Placeholder bio — replace me. The half of the duo who frets over spacing, colour, and whether a button feels good to tap at 1 a.m. mid-dungeon.",
    team_m2_name: "Member Two",
    team_m2_role: "Co-founder · Systems & Tools",
    team_m2_bio:
      "Placeholder bio — replace me. The half of the duo who builds the engines under the hood and keeps the local-network sync from catching fire.",

    /* --- Project detail (shared labels) --- */
    back_to_projects: "Back to projects",
    detail_overview: "Overview",
    features_title: "Features",
    screenshots_title: "Map examples",
    screenshots_coming: "Screenshot coming soon",
    screenshots_view: "View screenshot",
    lightbox_close: "Close",
    lightbox_prev: "Previous",
    lightbox_next: "Next",
    download_title: "Download",
    download_for: "Download for",
    version_label: "Version",
    released_label: "Released",
    changelog_link: "View changelog",
    download_note:
      "Files are hosted on GitHub Releases. By downloading you agree to use the software at your own risk — this is beta software.",

    /* --- Footer --- */
    footer_tagline: "Tools forged for adventurers",
    footer_github: "GitHub",
    footer_email: "Email",
    footer_rights: "All rights reserved.",
    footer_made: "Crafted by a duo of adventurers.",

    /* ====================== PROJECT PROSE (EN) ========================== */

    /* D&D Companion App */
    proj_dnd_name: "D&D Companion App",
    proj_dnd_tagline: "Your character sheet — modular, and in your pocket.",
    proj_dnd_short:
      "A modular, mobile-first character companion for D&D 5e. Build the sheet you actually want.",
    proj_dnd_desc: [
      "The D&D Companion App reimagines the character sheet as a set of building blocks. Instead of one rigid layout, you get a grid of modules — HP tracker, inventory, spells, conditions, equipment — that you can add, remove, and reorder until the screen matches the way you play.",
      "It's built mobile-first for real tables, where space is tight and you need the right information in a single glance. Every control is touch-friendly, fast, and readable in a dimly lit room.",
      "Available for both Android and Windows, your character travels with you from the couch to the convention hall. Sheets are stored locally, so the app keeps working even when the Wi-Fi doesn't.",
      "Currently in beta — stable enough for weekly play, and getting better with every session of feedback."
    ],
    proj_dnd_features: [
      "Drag-and-drop modular grid: add, remove, and reorder sheet components",
      "Built-in trackers for HP, conditions, spell slots, and resources",
      "Inventory and equipment management with weight and attunement",
      "Mobile-first, touch-optimised layout that stays readable at the table",
      "Local storage — your characters work fully offline",
      "Available on Android and Windows"
    ],

    /* Hexcrawl Tool */
    proj_hex_name: "Hexcrawl Tool",
    proj_hex_tagline: "Shared hex maps for the whole party — GM and players in sync.",
    proj_hex_short:
      "Create, manage, and explore hexcrawl maps together, with live sync between GM and player views.",
    proj_hex_desc: [
      "The Hexcrawl Tool gives game masters and parties a shared, living map. The GM builds and edits the hex grid, tags encounters and locations, and reveals the world hex by hex as the party explores.",
      "Players follow along on their own synchronised view over the local network — no internet required, no accounts to manage. What the GM reveals, the table sees instantly; what's still hidden stays behind the fog of war.",
      "Designed around how exploration campaigns actually run, it handles terrain, points of interest, encounter tags, and travel at a glance — keeping the focus on discovery instead of admin.",
      "Currently in beta, with the core sync, editing, and fog-of-war systems ready for your table."
    ],
    proj_hex_features: [
      "Local-network sync between a GM view and player views",
      "Hex editor for terrain, paths, and points of interest",
      "Encounter and location tagging, hex by hex",
      "Fog of war with reveal-as-you-explore",
      "No internet or accounts required — runs on your own network",
      "Built for both GM prep and live play"
    ],

    /* Cartographer Tool */
    proj_carto_name: "Cartographer Tool",
    proj_carto_tagline: "Step into a D&D cartographer's shoes and chart your world by hand.",
    proj_carto_short:
      "A hands-on mapmaking app that brings the D&D 5e Cartographer's Tools to life on desktop and Android tablets.",
    proj_carto_desc: [
      "The Cartographer Tool puts the D&D 5e Cartographer's Tools in your hands. Alongside rolling the check, you take on the craft yourself — charting fantasy worlds by hand on an old parchment canvas, the way your character would.",
      "Place icons from a deep catalog — settlements, mountains, forests, castles, ports, dragon lairs and more — then paint terrain, sketch freehand with the pencil, link locations with labelled routes, and pin notes wherever your story needs them.",
      "It's built around the feel of the craft rather than technical realism: not a professional atlas suite, but a focused space to chart a world by hand. A grid, a draggable scale bar and a measure tool let you think like an in-world cartographer — one square at a time — while the parchment background and hand-drawn icons keep everything feeling like a page from an adventurer's journal.",
      "Pan, zoom and lean on the mini-map to roam a huge canvas, then save your work, export it to PNG, and undo or redo freely as you go. It runs on Windows and Linux as well as Android — at its best on a tablet, where you draw straight onto the map. Currently in beta, with the full toolkit already available."
    ],
    proj_carto_features: [
      "A big catalog of hand-drawn map icons — settlements, terrain, structures, water and special sites — grouped by category",
      "Freehand terrain brush with forest, mountain, desert, swamp, water, snow, plains and lava fills",
      "Pencil free-draw and eraser for sketching anything by hand",
      "Labelled connections between locations, with dashed, dotted or solid line styles",
      "Floating notes on any element, plus labels and renaming",
      "Grid, a configurable scale (1 square = feet, meters, miles, km, leagues or days) and a two-point measure tool",
      "A huge pannable, zoomable parchment canvas with a mini-map overview — on desktop or by touch on a tablet",
      "Show/hide layers, full undo/redo, autosave, JSON save/load and PNG export"
    ]
  },

  /* ========================== ITALIANO ==================================== */
  it: {
    /* --- Document / meta --- */
    site_title: "Modevari — Strumenti digitali per avventurieri da tavolo",

    /* --- Accessibilità --- */
    skip_link: "Vai al contenuto principale",
    menu_open: "Apri il menu",
    menu_close: "Chiudi il menu",
    lang_toggle_label: "Cambia lingua",
    home_link_label: "Modevari — vai alla home",

    /* --- Navigazione --- */
    nav_home: "Home",
    nav_projects: "Progetti",
    nav_about: "Chi siamo",
    nav_projects_all: "Tutti i progetti",

    /* --- Hero --- */
    hero_eyebrow: "Uno studio indie per il gioco da tavolo",
    hero_title: "Modevari",
    hero_subtitle: "Strumenti digitali forgiati per avventurieri da tavolo",
    hero_paragraph:
      "Modevari è uno studio di due persone che crea compagni digitali per i giochi di ruolo da tavolo. Realizziamo strumenti essenziali e curati che non intralciano — così giocatori e master dedicano meno tempo alla contabilità e più alla storia.",
    hero_cta: "Scopri i nostri strumenti",
    hero_cta_about: "Conosci lo studio",

    /* --- Sezione progetti (home) --- */
    projects_title: "I nostri progetti",
    projects_subtitle:
      "Tre strumenti, forgiati al tavolo e affinati in beta. Scegline uno per saperne di più.",
    card_learn_more: "Scopri di più",
    badge_beta: "Beta disponibile",

    /* --- Teaser su di noi (home) --- */
    about_teaser_eyebrow: "Chi siamo",
    about_teaser_title: "Due sviluppatori, un'unica ossessione",
    about_teaser_text:
      "Amiamo i GdR da tavolo e continuavamo a sbattere contro lo stesso muro: gli strumenti che volevamo non esistevano. Così abbiamo iniziato a costruirli — prima per il nostro tavolo, ora anche per il tuo.",
    about_teaser_link: "Leggi la nostra storia",

    /* --- Pagina Chi siamo --- */
    about_title: "Chi è Modevari",
    about_lede:
      "Un piccolo studio indipendente con una convinzione semplice: lo strumento giusto può elevare qualsiasi sessione.",
    about_body: [
      "Modevari è formata da due sviluppatori uniti dall'amore per i giochi di ruolo da tavolo e dalla convinzione che un buon software debba essere un'estensione naturale del tavolo — mai una distrazione.",
      "Abbiamo fondato Modevari dopo una serata di troppo persa tra appunti sparsi, fogli di calcolo a metà e app che ci ostacolavano invece di aiutarci. Volevamo qualcosa di meglio: strumenti veloci, curati e creati da chi gioca davvero.",
      "Tutto ciò che realizziamo prende forma prima alle nostre serate di gioco, poi arriva alla community in beta aperta, così può crescere grazie al riscontro di tavoli veri."
    ],
    about_philosophy_title: "Come lavoriamo",
    about_philosophy: [
      "Al centro c'è chi gioca. Ogni funzione si guadagna il suo posto rendendo il gioco migliore, non allungando un elenco.",
      "Onesti sulla beta. Ti diciamo chiaramente cosa è finito e cosa è ancora in cottura. Niente lucido finto.",
      "Sempre in miglioramento. Ogni rilascio è plasmato da chi usa i nostri strumenti al tavolo."
    ],
    team_title: "Il team",
    team_subtitle: "Due persone, tanti dadi.",

    team_m1_name: "Membro Uno",
    team_m1_role: "Co-fondatore · Design & Frontend",
    team_m1_bio:
      "Bio segnaposto — da sostituire. La metà del duo che si tormenta su spaziature, colori e se un pulsante sia piacevole da toccare all'una di notte, a metà dungeon.",
    team_m2_name: "Membro Due",
    team_m2_role: "Co-fondatore · Sistemi & Strumenti",
    team_m2_bio:
      "Bio segnaposto — da sostituire. La metà del duo che costruisce i motori sotto il cofano e fa in modo che la sincronizzazione sulla rete locale non prenda fuoco.",

    /* --- Dettaglio progetto (etichette comuni) --- */
    back_to_projects: "Torna ai progetti",
    detail_overview: "Panoramica",
    features_title: "Funzionalità",
    screenshots_title: "Anteprima",
    screenshots_coming: "Screenshot in arrivo",
    screenshots_view: "Apri screenshot",
    lightbox_close: "Chiudi",
    lightbox_prev: "Precedente",
    lightbox_next: "Successivo",
    download_title: "Download",
    download_for: "Scarica per",
    version_label: "Versione",
    released_label: "Rilasciato",
    changelog_link: "Vedi il changelog",
    download_note:
      "I file sono ospitati su GitHub Releases. Scaricando, accetti di usare il software a tuo rischio — è software in beta.",

    /* --- Footer --- */
    footer_tagline: "Strumenti forgiati per avventurieri",
    footer_github: "GitHub",
    footer_email: "Email",
    footer_rights: "Tutti i diritti riservati.",
    footer_made: "Creato da un duo di avventurieri.",

    /* ====================== TESTI PROGETTI (IT) ========================= */

    /* D&D Companion App */
    proj_dnd_name: "D&D Companion App",
    proj_dnd_tagline: "La tua scheda del personaggio — modulare, in tasca.",
    proj_dnd_short:
      "Un compagno modulare e mobile-first per D&D 5e. Costruisci la scheda che vuoi davvero.",
    proj_dnd_desc: [
      "La D&D Companion App reinventa la scheda del personaggio come un insieme di mattoncini. Invece di un layout rigido, hai una griglia di moduli — punti ferita, inventario, incantesimi, condizioni, equipaggiamento — che puoi aggiungere, rimuovere e riordinare finché lo schermo non rispecchia il tuo modo di giocare.",
      "È pensata mobile-first per i tavoli veri, dove lo spazio è poco e ti serve l'informazione giusta in un colpo d'occhio. Ogni comando è comodo al tocco, veloce e leggibile anche in una stanza in penombra.",
      "Disponibile sia per Android sia per Windows, il tuo personaggio ti segue dal divano alla sala convention. Le schede sono salvate in locale, così l'app funziona anche quando il Wi-Fi no.",
      "Attualmente in beta — abbastanza stabile per il gioco settimanale e migliore a ogni sessione di riscontri."
    ],
    proj_dnd_features: [
      "Griglia modulare drag-and-drop: aggiungi, rimuovi e riordina i componenti della scheda",
      "Contatori integrati per PF, condizioni, slot incantesimo e risorse",
      "Gestione di inventario ed equipaggiamento con peso e sintonia",
      "Layout mobile-first ottimizzato al tocco, leggibile al tavolo",
      "Archiviazione locale — i personaggi funzionano completamente offline",
      "Disponibile su Android e Windows"
    ],

    /* Hexcrawl Tool */
    proj_hex_name: "Hexcrawl Tool",
    proj_hex_tagline: "Mappe esagonali condivise per tutto il gruppo — master e giocatori sincronizzati.",
    proj_hex_short:
      "Crea, gestisci ed esplora mappe hexcrawl insieme, con sincronizzazione live tra la vista del master e quella dei giocatori.",
    proj_hex_desc: [
      "Hexcrawl Tool offre a master e gruppo una mappa condivisa e viva. Il master costruisce e modifica la griglia esagonale, etichetta incontri e luoghi e rivela il mondo esagono dopo esagono man mano che il gruppo esplora.",
      "I giocatori seguono dalla loro vista sincronizzata sulla rete locale — senza internet, senza account da gestire. Ciò che il master rivela, il tavolo lo vede all'istante; ciò che è ancora nascosto resta dietro la nebbia di guerra.",
      "Progettato sul reale svolgimento delle campagne di esplorazione, gestisce terreno, punti d'interesse, etichette degli incontri e viaggio in un colpo d'occhio — mantenendo il focus sulla scoperta, non sulla burocrazia.",
      "Attualmente in beta, con i sistemi principali di sincronizzazione, modifica e nebbia di guerra pronti per il tuo tavolo."
    ],
    proj_hex_features: [
      "Sincronizzazione su rete locale tra vista master e viste giocatori",
      "Editor di esagoni per terreno, percorsi e punti d'interesse",
      "Etichettatura di incontri e luoghi, esagono per esagono",
      "Nebbia di guerra con rivelazione progressiva durante l'esplorazione",
      "Nessun internet o account richiesto — funziona sulla tua rete",
      "Pensato sia per la preparazione del master sia per il gioco dal vivo"
    ],

    /* Cartographer Tool */
    proj_carto_name: "Cartographer Tool",
    proj_carto_tagline: "Disegna mappe realistiche, in solitaria, strato dopo strato.",
    proj_carto_short:
      "Uno strumento di disegno mappe in solitaria, essenziale, per creare mappe fantasy dettagliate e realistiche da esportare e condividere.",
    proj_carto_desc: [
      "Cartographer Tool è uno studio di cartografia in solitaria per giocatori e master che amano una bella mappa. È pensato come compagno digitale degli strumenti del cartografo fisici che molti giocatori di D&D 5e già possiedono.",
      "Costruisci mondi a strati — stendi il terreno, traccia coste e fiumi, aggiungi insediamenti ed etichette, poi rifinisci finché la mappa non sembra uscita da un vecchio atlante.",
      "Annotazioni, un sistema di terreno a livelli e opzioni di esportazione pulite ti portano dalla tela bianca all'handout pronto per il tavolo, che tu stia abbozzando un singolo dungeon o tracciando un intero continente.",
      "Attualmente in beta, con gli strumenti principali di disegno, livelli ed esportazione già disponibili."
    ],
    proj_carto_features: [
      "Sistema di terreno a livelli per risultati naturali e realistici",
      "Strumenti per coste, fiumi, montagne, foreste e insediamenti",
      "Annotazioni testuali ed etichettatura della mappa",
      "Tela di disegno in solitaria, senza distrazioni",
      "Esporta le mappe come immagini per la stampa o i tavoli virtuali",
      "Un compagno digitale degli strumenti del cartografo fisici"
    ]
  }
};

/* Freeze so translations can't be accidentally mutated at runtime. */
Object.freeze(window.MODEVARI_I18N);
Object.freeze(window.MODEVARI_I18N.en);
Object.freeze(window.MODEVARI_I18N.it);
