# Vzhůru dolů - Technická dokumentace

Web [vzhurudolu.cz](https://www.vzhurudolu.cz) - blog o webové kodéřině, CSS, responzivním designu a rychlosti webů.

## Technologie (Devstack)

| Technologie | Verze | Popis |
|-------------|-------|-------|
| **Astro** | 4.x | Statický generátor webu |
| **SCSS** | - | CSS preprocesing (kompilace přes Grunt) |
| **Grunt** | 1.6.x | Task runner pro kompilaci CSS/JS |
| **Node.js** | - | Runtime prostředí |
| **Markdown** | - | Formát obsahu článků |

## Struktura projektu

```
www/
├── src/                    # Zdrojové soubory Astro
│   ├── components/         # Astro komponenty
│   ├── content/            # Markdown obsah
│   │   ├── blog/           # Články blogu (~142 článků)
│   │   ├── podcast/        # Epizody podcastu (~54 epizod)
│   │   └── prirucka/       # Příručka (~520 MD souborů + obrázky)
│   ├── layouts/            # Layout šablony
│   ├── pages/              # Stránky webu (routing)
│   └── utils/              # Pomocné utility (remark/rehype pluginy)
├── public/                 # Statické soubory (kopírují se do dist/)
│   ├── assets/             # CSS, JS, fonty, obrázky
│   ├── prirucka/           # Obrázky příručky (webp)
│   └── .htaccess           # Apache konfigurace
├── grunt/                  # Grunt konfigurace tasků
├── scripts/                # Pomocné skripty
├── _import/                # Importní soubory (legacy)
├── dist/                   # Build výstup (generuje se při npm run build)
├── astro.config.mjs        # Konfigurace Astro
├── package.json            # NPM závislosti a skripty
└── Gruntfile.js            # Grunt konfigurace
```

## Instalace a spuštění

```bash
# Instalace závislostí
npm install

# Development server (http://localhost:4321)
npm run dev

# Produkční build
npm run build

# Náhled produkčního buildu
npm run preview
```

## NPM skripty

| Skript | Popis |
|--------|-------|
| `npm run dev` | Spustí Astro dev server |
| `npm run build` | Vytvoří produkční build do `dist/` |
| `npm run preview` | Náhled produkčního buildu |
| `npm run convert-images` | Konverze obrázků příručky |
| `npm run fill-heading` | Doplnění nadpisů z H1 |

## Grunt příkazy

Grunt se používá pro kompilaci SCSS a minifikaci CSS/JS:

```bash
# Kompilace SCSS do CSS
grunt sass

# Minifikace CSS
grunt cssmin

# Watch mode
grunt watch
```

## Nasazení na produkci

### Postup

1. Spusťte build:
   ```bash
   npm run build
   ```

2. Nahrajte **obsah složky `dist/`** do rootu FTP serveru

### Důležité poznámky

- Nahrávejte **obsah** `dist/`, ne složku samotnou
- Složky `data/` a `files/` jsou **pouze na produkci** (legacy soubory) - nemazat!
- Po nahrání ověřte redirecty a 404 stránky

### Checklist před nasazením

Viz soubor [TODO-PRED-NASAZENIM.md](TODO-PRED-NASAZENIM.md) pro kompletní checklist.

## Konfigurace

| Soubor | Popis |
|--------|-------|
| [astro.config.mjs](astro.config.mjs) | Hlavní konfigurace Astro (pluginy, markdown) |
| [public/.htaccess](public/.htaccess) | Apache: redirecty, CORS, bezpečnost |
| [grunt/](grunt/) | Grunt tasky (sass, cssmin, watch...) |
| [src/content/config.ts](src/content/config.ts) | Definice content collections |

## Obsah webu

| Sekce | Složka | Počet |
|-------|--------|-------|
| Příručka | `src/content/prirucka/` | ~520 MD souborů |
| Blog | `src/content/blog/` | ~142 článků |
| Podcast | `src/content/podcast/` | ~54 epizod |

## Vlastní pluginy

Projekt používá vlastní remark/rehype pluginy pro transformaci Markdownu:

| Plugin | Popis |
|--------|-------|
| `remark-prirucka-images` | Transformace cest k obrázkům |
| `remark-process-markdown-attributes` | Zpracování `markdown="1"` atributů |
| `rehype-heading-anchors` | Přidání anchorů k nadpisům |
| `rehype-prirucka-links` | Transformace odkazů příručky |
| `rehype-remove-first-h1` | Odstranění prvního H1 |
| `rehype-connected-elements` | Transformace `.connected` elementů |

Pluginy jsou v `src/utils/`.

## Další informace

- **Sitemap**: Vlastní generátor v `src/utils/custom-sitemap.ts`
- **CORS**: Hlavičky pro fonty nastaveny v `.htaccess` (pro CodePen a externí domény)
- **404 stránka**: Vlastní design v `src/pages/404.astro`

## Repository

- **Git**: Bitbucket
- **URL**: https://bitbucket.org/machal/vd-web-2026
