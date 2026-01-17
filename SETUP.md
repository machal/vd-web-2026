# Astro Setup - Vzhůru dolů

## Co bylo vytvořeno

### Základní struktura
- `astro.config.mjs` - Konfigurace Astro (static site)
- `src/content/config.ts` - Content Collections schema pro Markdown
- `src/env.d.ts` - TypeScript definice pro Astro
- `src/layouts/BaseLayout.astro` - Základní layout s meta tagy
- `src/components/Header.astro` - Header komponenta
- `src/components/Footer.astro` - Footer komponenta
- `src/pages/index.astro` - Homepage (první stránka)

### Co ještě potřebuješ udělat

1. **Nainstalovat závislosti**:
```bash
npm install astro @astrojs/sitemap
```

2. **Vytvořit adresář pro content** (Markdown soubory budou přidány později):
```
src/content/
  blog/        # Blog články (Markdown)
  podcast/     # Podcast epizody (Markdown)
  prirucka/    # Příručka (Markdown)
```

3. **Vytvořit další stránky** podle mapování v `_import/URL_MAPPING.md`:
   - `src/pages/[...page].astro` - Stránkování (`/p=2`, `/p=3`)
   - `src/pages/blog/[slug].astro` - Blog články
   - `src/pages/podcast/[slug].astro` - Podcast epizody
   - `src/pages/prirucka/[slug].astro` - Příručka
   - `src/pages/ebooky/*.astro` - Statické e-book stránky
   - `src/pages/martin.astro` - Info stránky
   - atd.

4. **Zkopírovat assets**:
   - `assets/` → `public/assets/` (nebo zachovat současnou strukturu)
   - `favicon/` → `public/favicon/`

5. **Nastavit build scripty** v `package.json`:
```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview"
  }
}
```

## Poznámky

- **SCSS**: Existující SCSS soubory v `assets/scss/` budou použity přes Grunt build (nebo přes Astro Vite)
- **Statické stránky**: E-booky a info stránky budou statické HTML (obsah z HTML šablon)
- **Markdown**: Blog, podcast a příručka budou z Markdown souborů (dodáno později)
- **AMP**: Zrušeno - neimplementovat
