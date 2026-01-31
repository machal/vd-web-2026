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
├── _import/                # Interní soubory (Cursor výstupy, TODO) – není v gitu
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

1. Lokální build: `npm run build`
2. Obsah složky `dist/` nahrajte na server pomocí Transmitu (nebo jiného FTP/SFTP klienta)

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

## Validace obsahu

Projekt obsahuje centralizované validace pro kontrolu správnosti obsahu, zejména pro `prirucka` kolekci.

### Kde jsou validace definovány

Všechny validace jsou centralizovány v `src/utils/validate-prirucka.ts`:

- **`validateDuplicateIds()`** - Kontroluje duplicitní ID v kolekci (pouze pro published soubory)
- **`validateFrontmatter()`** - Validuje frontmatter v souborech
- **`runAllValidations()`** - Spustí všechny validace najednou
- **`formatValidationErrorsForDisplay()`** - Formátuje chyby pro zobrazení v prohlížeči

### Jak fungují validace

1. **Duplicitní ID**: Validace kontroluje, zda neexistují dva nebo více souborů se stejným `id` v frontmatter. Tato validace se provádí pouze pro soubory s `published !== false`.

2. **Vyloučení unpublished souborů**: Soubory s `published: false` jsou z validace vyloučeny, protože jsou součástí ebooků a duplicita ID je u nich očekávaná a v pořádku.

3. **Frontmatter validace**: Kontroluje, zda všechny soubory mají správně nastavené frontmatter (např. pole `id`).

### Zobrazení chyb v prohlížeči (dev mode)

V development módu (`npm run dev`) se validační chyby automaticky zobrazují v prohlížeči jako overlay na stránkách příručky:

- Chyby se zobrazí jako modal overlay s detailním popisem
- Obsahuje seznam problematických souborů
- Zahrnuje návod na řešení
- Overlay lze zavřít kliknutím na tlačítko "Zavřít" nebo stisknutím klávesy Escape

Komponenta `src/components/ValidationErrors.astro` zajišťuje zobrazení chyb v dev módu.

### Jak opravit běžné chyby

**Duplicitní ID:**
- Zkontrolujte frontmatter v uvedených souborech
- Zajistěte, že každý publikovaný článek má jedinečné ID
- Pokud je duplicita očekávaná (ebook obsah), nastavte `published: false`

**Chybějící frontmatter:**
- Spusťte `node scripts/check-frontmatter.js --fix` pro automatickou opravu
- Nebo přidejte frontmatter ručně do souboru

**Nastavení published: false pro ebook soubory:**
- Spusťte `node scripts/set-ebook-published-false.js` pro automatické nastavení
- Tento skript nastaví `published: false` u všech MD souborů v `content-*` podadresářích

### Validace při buildu

Při produkčním buildu (`npm run build`) se validace provádějí automaticky:

- **Vite plugin** (`vite-plugin-validate-frontmatter.ts`) kontroluje frontmatter při buildu
- **Astro getStaticPaths** (`src/pages/prirucka/[slug].astro`) kontroluje duplicitní ID
- Pokud jsou nalezeny chyby, build selže s detailní chybovou zprávou

## Další informace

- **Sitemap**: Vlastní generátor v `src/utils/custom-sitemap.ts`
- **CORS**: Hlavičky pro fonty nastaveny v `.htaccess` (pro CodePen a externí domény)
- **404 stránka**: Vlastní design v `src/pages/404.astro`

## Repository

- **Git**: GitHub
- **URL**: https://github.com/machal/vd-web-2026
