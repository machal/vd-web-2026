# Quick Start - Astro Setup

## Co bylo vytvořeno

✅ **Dummy obsah**:
- 5 blog článků v `src/content/blog/`
- 5 podcast epizod v `src/content/podcast/`
- 5 příručkových článků v `src/content/prirucka/`

✅ **Základní stránky**:
- `src/pages/index.astro` - Homepage se seznamem článků
- `src/pages/blog/[slug].astro` - Detail blog článku
- `src/pages/podcast/[slug].astro` - Detail podcast epizody
- `src/pages/podcast/index.astro` - Seznam podcastů
- `src/pages/prirucka/[slug].astro` - Detail příručky

## Jak spustit

1. **Nainstaluj závislosti**:
```bash
npm install
```

2. **Spusť dev server**:
```bash
npm run dev
```

3. **Otevři prohlížeč**:
```
http://localhost:4321
```

## Co bys měl vidět

- ✅ Homepage (`/`) se seznamem článků (blog + podcast)
- ✅ Fungující odkazy na jednotlivé články
- ✅ Detail stránky pro blog články (`/blog/261-rok-2025`)
- ✅ Detail stránky pro podcast (`/podcast/259-podcast-konci-frontkec`)
- ✅ Detail stránky pro příručku (`/prirucka/css3`)
- ✅ Seznam podcastů (`/podcast`)

## Příprava assets

Před spuštěním je potřeba připravit assets. Máš dvě možnosti:

**1. Symlinky (doporučeno pro dev)**:
```bash
cd public
ln -s ../assets assets
ln -s ../favicon favicon
```

**2. Zkopírovat (pro produkci)**:
```bash
cp -r assets public/
cp -r favicon public/
```

## Co ještě chybí

- ⚠️ **Assets**: CSS a JS soubory musí být dostupné v `public/assets/` (viz výše)
- ⚠️ **Design**: Pokud design nevypadá správně, zkontroluj, že CSS soubory jsou správně načteny
- ⚠️ **Obrázky**: Avatar a další obrázky musí být v `public/assets/img/`

## Build pro produkci

```bash
npm run build
```

Výstup bude v `dist/` adresáři.

## Poznámky

- Markdown soubory jsou dummy obsah - později budou nahrazeny skutečným obsahem
- Design by měl být zachován z původních HTML šablon
- Pokud něco nefunguje, zkontroluj konzoli prohlížeče a terminál
