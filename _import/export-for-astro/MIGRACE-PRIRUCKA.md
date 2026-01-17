# Migrace článků příručky do Astro

Tento dokument popisuje proces exportu článků příručky z databáze a jejich přípravu pro migraci do Astro projektu.

## Co bylo provedeno

### 1. Export článků příručky z databáze

Všechny články příručky byly exportovány z databáze (`vdinno.sql`) a převedeny do Markdown souborů s Front Matter.

**Skript:** `export_guide_articles_from_sitemap.py`

**Výsledek:**
- **368 článků** v adresáři `content/prirucka/`
- **86 článků** má kompletní data z databáze (`published: true`)
- **282 článků** má základní front matter (část z nich má `published: true` podle sitemap.xml)

### 2. Validace podle sitemap.xml

Skript používá `vd-sitemap.xml` jako zdroj pravdy pro publikované články:
- Všechny články v sitemap.xml mají `published: true`
- Články mimo sitemap.xml mají `published: false`

**Výsledek validace:**
- ✅ **261 článků** v sitemap.xml s `published: true`
- ✅ **0 článků** v sitemap.xml s `published: false` (všechny správně označené)
- ✅ **106 článků** není v sitemap.xml a má `published: false` (správně)

## Struktura Front Matter

### Základní struktura

Každý článek příručky má následující Front Matter strukturu:

```yaml
---
id: css-selektory                    # ID článku (slug)
heading: 'Selektory v CSS'           # Nadpis článku
slug: selektory-v-css-znate-je-vsechny  # URL slug
date: 2022-05-05                     # Datum publikace (YYYY-MM-DD)
perex: 'Krátký popis článku...'      # Perex/úvod
published: true                       # Status publikace (true/false)
category:                             # Kategorie (pole)
  - css
  - selektory
category_highlight: true              # Zvýraznit kategorii
include_rss: true                     # Zahrnout do RSS
no_ads: false                         # Bez reklam
og_title: 'Selektory v CSS'           # Open Graph název
og_description: 'Krátký popis...'     # Open Graph popis
og_type: article                      # Open Graph typ
---
```

### Pole Front Matter

| Pole | Typ | Popis | Povinné |
|------|-----|-------|---------|
| `id` | string | ID článku (obvykle slug) | ✅ |
| `heading` | string | Nadpis článku | ✅ |
| `slug` | string | URL slug článku | ✅ |
| `date` | string | Datum publikace (YYYY-MM-DD) | ⚠️ |
| `perex` | string | Perex/úvod článku | ⚠️ |
| `published` | boolean | Status publikace | ✅ |
| `category` | array | Seznam kategorií | ✅ |
| `category_highlight` | boolean | Zvýraznit kategorii | ⚠️ |
| `include_rss` | boolean | Zahrnout do RSS | ⚠️ |
| `no_ads` | boolean | Bez reklam | ⚠️ |
| `og_title` | string | Open Graph název | ⚠️ |
| `og_description` | string | Open Graph popis | ⚠️ |
| `og_type` | string | Open Graph typ (obvykle "article") | ⚠️ |

### Příklady

#### Článek s kompletními daty z databáze

```yaml
---
id: bower
heading: 'Bower'
slug: bower
date: 2014-09-17
perex: 'Bower je správce frontend balíčků. jQuery, Bootstrap… Prostě balíčků.'
published: true
category:
  - etc
  - automatizace
og_title: 'Bower'
og_description: 'Bower je správce frontend balíčků. jQuery, Bootstrap… Prostě balíčků.'
og_type: article
---
```

#### Článek bez dat v databázi (pouze v sitemap.xml)

```yaml
---
id: css-align-content
heading: ''
slug: css-align-content
date: 
perex: ''
published: true
category: []
category_highlight: false
include_rss: false
no_ads: false
og_title: ''
og_description: ''
og_type: article
---
```

## Mapování do Astro schématu

### Současné Astro schéma (`src/content/config.ts`)

```typescript
const prirucka = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),                    // ← heading
    heading: z.string().optional(),       // ← heading (duplicitní?)
    id: z.string(),                       // ← id
    date: z.string().optional(),          // ← date
    perex: z.string().optional(),         // ← perex
    categories: z.array(z.string()),      // ← category
    books: z.array(z.string()).optional(),
    published: z.boolean(),               // ← published
    include_rss: z.boolean().nullable().optional(),
    no_ads: z.boolean().nullable().optional(),
    category_highlight: z.boolean().nullable().optional(),
    socialImage: z.string().optional(),
    socialTitle: z.string().optional(),   // ← og_title
    socialDescription: z.string().optional(), // ← og_description
    og_type: z.string().optional(),
    external_author: z.object({...}).optional(),
  }),
});
```

### Mapování polí

| Exportované pole | Astro pole | Poznámka |
|------------------|------------|----------|
| `heading` | `title` | Použít `heading` jako `title` |
| `heading` | `heading` | Zachovat i jako `heading` (pokud je potřeba) |
| `id` | `id` | ✅ Stejné |
| `slug` | - | Není v Astro schématu (používá se název souboru) |
| `date` | `date` | ✅ Stejné |
| `perex` | `perex` | ✅ Stejné |
| `category` | `categories` | ⚠️ Přejmenovat `category` → `categories` |
| `published` | `published` | ✅ Stejné |
| `category_highlight` | `category_highlight` | ✅ Stejné |
| `include_rss` | `include_rss` | ✅ Stejné |
| `no_ads` | `no_ads` | ✅ Stejné |
| `og_title` | `socialTitle` | ⚠️ Přejmenovat |
| `og_description` | `socialDescription` | ⚠️ Přejmenovat |
| `og_type` | `og_type` | ✅ Stejné |

### Požadované úpravy před migrací

1. **Přejmenovat `category` → `categories`** v každém souboru
2. **Přejmenovat `og_title` → `socialTitle`**
3. **Přejmenovat `og_description` → `socialDescription`**
4. **Přidat `title`** pole (kopie z `heading`)
5. **Odstranit `slug`** pole (není v Astro schématu)

## Struktura souborů v Astro repo

### Očekávaná struktura

```
vd-astro/
├── src/
│   └── content/
│       ├── prirucka/           # Články příručky
│       │   ├── amp.md
│       │   ├── bower.md
│       │   ├── css-selektory.md
│       │   └── ...
│       ├── blog/               # Blog články
│       ├── categories/         # Kategorie
│       └── config.ts           # Astro content config
```

### Názvy souborů

- Soubory mají názvy podle slugu: `{slug}.md`
- Např: `css-selektory.md`, `bower.md`, `amp.md`
- Pokud má článek číselný prefix (např. `3-principy-rwd.md`), prefix se odstraní při extrakci slugu

## Postup migrace

### 1. Zkopírovat soubory

```bash
# Zkopírovat všechny články příručky
cp -r _VD26/export-for-astro/content/prirucka/* vd-astro/src/content/prirucka/
```

### 2. Upravit Front Matter

Před migrací je potřeba upravit Front Matter v každém souboru:

**Skript pro úpravu Front Matter:**

```python
# transform_frontmatter.py
import os
import re
import yaml
import frontmatter

def transform_frontmatter(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        post = frontmatter.load(f)
    
    # Přejmenovat category → categories
    if 'category' in post.metadata:
        post.metadata['categories'] = post.metadata.pop('category')
    
    # Přejmenovat og_title → socialTitle
    if 'og_title' in post.metadata:
        post.metadata['socialTitle'] = post.metadata.pop('og_title')
    
    # Přejmenovat og_description → socialDescription
    if 'og_description' in post.metadata:
        post.metadata['socialDescription'] = post.metadata.pop('og_description')
    
    # Přidat title z heading
    if 'heading' in post.metadata and 'title' not in post.metadata:
        post.metadata['title'] = post.metadata['heading']
    
    # Odstranit slug (není v Astro schématu)
    if 'slug' in post.metadata:
        del post.metadata['slug']
    
    # Uložit zpět
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(frontmatter.dumps(post))
```

### 3. Validace

Po migraci zkontrolovat:

1. **Astro build** - zda všechny soubory projdou validací schématu
2. **Published status** - zda všechny publikované články mají `published: true`
3. **Kategorie** - zda všechny kategorie existují v `src/content/categories/`

## Poznámky

### Články bez dat v databázi

Některé články nejsou v databázi, ale jsou v sitemap.xml (jsou publikované):
- Tyto články mají `published: true`, ale prázdná pole (`heading`, `date`, `perex`)
- Je potřeba doplnit chybějící data ručně nebo z jiného zdroje

### Články mimo sitemap.xml

Některé články nejsou v sitemap.xml:
- Tyto články mají `published: false`
- Jsou to buď nové články, nebo články, které nebyly publikované

### Kategorie

Kategorie jsou v poli `category` (v exportu) nebo `categories` (v Astro):
- Je potřeba zajistit, že všechny kategorie existují v `src/content/categories/`
- Pokud kategorie neexistuje, vytvořit ji nebo odstranit z článku

## Skripty

### `export_guide_articles_from_sitemap.py`

Hlavní skript pro export článků příručky:
- Načte slugy ze sitemap.xml
- Najde odpovídající články v databázi
- Vytvoří Markdown soubory s Front Matter
- Nastaví `published: true` pro články v sitemap.xml

**Použití:**
```bash
python3 export_guide_articles_from_sitemap.py
```

### `extract_frontmatter_schema.py`

Skript pro extrakci Front Matter schématu z databáze:
- Extrahuje strukturu dat z databáze
- Vytvoří dokumentaci Front Matter schématu
- Vytvoří ukázkové soubory

**Použití:**
```bash
python3 extract_frontmatter_schema.py
```

## Kontakt a podpora

Pro dotazy nebo problémy s migrací kontaktujte autora migračních skriptů.
