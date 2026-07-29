# Reference – front matter a pravidla článků VD

## Blog – pole front matter

| Pole | Povinné | Typ | Poznámka |
|------|---------|-----|----------|
| postTitle | ano | string | Autorův titulek článku; mapuje se na `title`. **Neměnit** bez výslovné žádosti. SEO alternativy jen jako návrh v chatu. |
| title | volitelné | string | Alternativa k postTitle |
| postDateTime / date | doporučené | string/date | Pro řazení a zobrazení |
| excerpt / description | doporučené | string | Homepage / RSS / OG – **2–3 věty** (cca 220–400 znaků) |
| postStatus | volitelné | string | Např. Published, Draft |
| postID, postUrlId | volitelné | number, string | Legacy z exportu |
| category | volitelné | string[] | Default [] |
| tags | volitelné | string[] | Mapuje se z category |
| author | volitelné | string | Default „Martin Michálek“ |
| include_rss, no_ads, category_highlight | volitelné | bool | |
| og_title, og_description, og_image, og_type | volitelné | string | Open Graph |
| published | volitelné | bool | true pokud není false a postStatus není Draft |

### Příklad (blog)

```yaml
---
postID: 261
postTitle: 'Můj rok 2025: podnikatelský, strategický…'
postUrlId: rok-2025
postDateTime: 2026-01-06
excerpt: 'Bilance roku 2025…'
postStatus: Published
category:
  - osobní
  - netechnické
include_rss: true
category_highlight: true
og_title: '…'
og_description: '…'
og_type: article
---
```

## Podcast – pole front matter

Stejná jako blog; navíc může být `audioUrl`. Mapování `title`, `description`, `date`, `author`, `tags` stejné jako u blogu.

### Příklad (podcast)

```yaml
---
postID: 247
postTitle: 'LIVE v mezičase WebExpo 2024…'
postUrlId: podcast-webexpo-2024
postDateTime: 2024-06-24
excerpt: '…'
postStatus: Published
category:
  - webexpo
  - rychlost-nacitani
include_rss: true
og_type: article
---
```

## Příručka – pole front matter

| Pole | Povinné (published) | Typ | Poznámka |
|------|----------------------|-----|----------|
| id | ano | string | Unikátní v rámci published článků |
| heading | doporučené | string | Zobrazený nadpis (obvykle = autorův titulek / H1). Neměnit bez žádosti. |
| title | volitelné | string | Autorův titulek; fallback heading nebo id. Neměnit bez žádosti; SEO jen návrh v chatu. |
| date | volitelné | string/date | |
| perex / description | volitelné | string | Homepage / RSS / OG – **2–3 věty** (cca 220–400 znaků), ne jedna krátká věta |
| published | volitelné | bool/string | true = publikováno; u ebooků false |
| category | volitelné | string[] | |
| tags | volitelné | string[] | Mapuje se z category |
| category_highlight, include_rss, no_ads | volitelné | bool | |
| og_title, og_description, og_type | volitelné | string | |
| og_image | doporučené u nových | string | Vlastní OG 1200×630, např. `/assets/img/content/dest/{slug}-og.webp` |

### Příklad (příručka – publikovaný článek)

```yaml
---
id: css-flexbox
tags: ['css']
title: 'Flexbox: referenční příručka všech vlastností'
heading: 'CSS flexbox: Průvodce všemi vlastnostmi'
date: 2021-02-12
perex: 'Flexbox je layout pomocí pružných boxů…'
published: true
category:
  - css3
  - css
  - flexbox
category_highlight: true
include_rss: true
og_title: '…'
og_type: article
---
```

### Příklad (příručka – ebook, nepublikováno)

```yaml
---
category:
  - css
published: false
---
```

## Rozdíly mezi typy

| Aspekt | Blog | Podcast | Příručka |
|--------|------|---------|----------|
| Titulek článku | postTitle, og_title (autorův; SEO jen po souhlasu) | stejně | title, og_title (stejně) |
| H1 / heading | obvykle = autorův titulek; neměnit bez žádosti | stejně | stejně |
| Datum | postDateTime / date | postDateTime / date | date (volitelné) |
| Popis | excerpt | excerpt | perex |
| Unikátní id | ne | ne | ano (u published) |
| published: false | koncept | koncept | ebooky v content-* |

## Pravidla z .cursor/rules (odkazy)

- **content-ceske-uvozovky.md** – české „ " jen v proze; ve front matter a v kódu vždy ASCII `"`.
- **content-nadpisy-anchor-hashe.md** – u H2–H6 vždy `{#slug}` na konci řádku.
- **content-obrazky-popisky.md** – figure + img + figcaption; figcaption s `markdown="1"`, popisek v kurzívě.
- **content-odkazovani.md** – odkazy u prvního výskytu; ne do citací a perexů. Ve figcaption povolené (zdroj obrázku/grafu).
- **content-citace-blockquote.md** – blockquote + `– *<cite>...</cite>*`.
- **content-tabulky-male.md** – tabulka v `<div class="rwd-scrollable f-6" markdown="1">`.
- **content-vyzva-na-konci.md** – výzva v `<small>*…*</small>`.

## Skripty a příkazy

| Příkaz | Účel |
|--------|------|
| `npm run check-frontmatter` | Kontrola, že všechny MD mají front matter |
| `npm run fix-frontmatter` | Doplnění chybějícího front matter (id/heading pro prirucka, postTitle pro blog/podcast) |
| `npm run fill-heading` | Doplnění heading (z H1) u příručky |
| `npm run build` | Build včetně validace front matter a (u příručky) duplicitních id |

## Validace příručky (src/utils/validate-prirucka.ts)

- **validateDuplicateIds** – pouze u souborů s `published !== false`; stejné `id` u dvou a více souborů = chyba.
- **validateFrontmatter** – u published souborů musí být vyplněné `id`.
- Chyby se v dev módu zobrazují v prohlížeči (ValidationErrors.astro).
