---
name: vd-writer
description: Píše nový článek pro web Vzhůru dolů (blog, podcast, příručka) z nuly — front matter, obrázky, nadpisy, citace, tabulky, odkazování. Použij při „napiš článek“, „nový článek“, ne při feedbacku nebo úpravě existujícího textu (to je vd-editor).
---

# Psaní nového článku Vzhůru dolů

Skill pro **nový** článek na vzhurudolu.cz. Obsah je Markdown ve třech kolekcích: **blog**, **podcast**, **příručka**.

Pro zpětnou vazbu k hotovému draftu použij **vd-editor**. Pro anglickou adaptaci **vd-translator**.

## Kde co leží

| Sekce     | Složka                    | Poznámka |
|-----------|---------------------------|----------|
| Blog      | `src/content/blog/`       | Články blogu |
| Podcast   | `src/content/podcast/`   | Epizody |
| Příručka  | `src/content/prirucka/`  | Podsložky `content-ebook/`, `content-vdamp/`, `content-vdwd/`, `content-vdlayout/` mohou mít `published: false` (ebooky). |

Každý MD soubor **musí mít front matter**. Build bez něj selže. Soubory s `published: false` jsou z kontroly front matter při buildu vyloučeny.

## Front matter podle typu

Schema: `src/content/config.ts`. Pole a příklady: [reference.md](reference.md).

### Blog / podcast

- **Povinné:** `postTitle` (nebo `title`). Dále `postDateTime`/`date`, `excerpt`/`description`, `postStatus`, `category` (pole).
- **Typické:** `postID`, `postUrlId`, `excerpt`, `postStatus: Published`, `include_rss`, `category_highlight`, `no_ads`, `og_*`. Autor default „Martin Michálek”.
- Podcast může mít `audioUrl`.
- Publikováno, pokud `published !== false` a `postStatus !== 'Draft'`.

### Příručka

- **Povinné (published):** `id` — **jedinečné** mezi publikovanými články příručky.
- **Typické:** `heading`, `title`, `date`, `perex`, `published: true`, `category`, OG pole. Slug = název souboru.
- Ebooky v `content-*`: `published: false` — bez unikátního `id`.

**Doplnění front matter:** `node scripts/check-frontmatter.js --check` / `--fix`.

## Pravidla obsahu

1. **České uvozovky** — jen v próze. Ve front matter, HTML a kódu ASCII `"`.
2. **Nadpisy H2–H6** — na konec `{#slug}` (malá písmena, číslice, pomlčky; bez diakritiky). Unikátní v článku.
3. **Obrázky** — `<figure>`, `<img src="..." alt="...">`, `<figcaption markdown="1">` s popiskem v kurzívě. Dekorativní bez popisku: `![alt](url)`. Alt vždy smysluplný; pokud ho neznáš, dočasný alt + vyzvi autora.
4. **Citace** — blockquote + prázdný řádek v blockquote + `– *<cite>[Jméno](url)</cite>*`. V citacích české uvozovky.
5. **Tabulky** — `<div class="rwd-scrollable f-6" markdown="1">` a prázdný řádek před tabulkou.
6. **Výzva na konci** — `<small>*…*</small>`. Typicky odkaz na soc. síť — až po publikaci, když je URL.
7. **Odkazování** — externí nástroje u prvního výskytu; vnitřní odkazy přirozeně v textu. Ne do citací, perexů, meta. Ve `figcaption` odkazy OK (zdroj). Interní odkazy **vždy `.md`:** v příručce `[Text](nazev.md)`; mezi sekcemi `[Text](../blog/nazev.md)` atd. **Podcast výjimka:** finální URL `/podcast/{postID}-{slug}` piš rovnou (`.md` rewrite postID nepřidá). Nikdy hotové `/blog/258-…` ani `/prirucka/nazev`. Úvodní stránky: `/blog`, `/podcast`. **PageSpeed.ONE:** `https://pagespeed.one/` (bez `www.`).
8. **Perex / excerpt** — **2–3 věty** (cca 220–400 znaků). Neopakuj doslova první odstavec.
9. **Titulek je autorův — neměň ho.** `postTitle` / `title`, `heading`, H1, nastavený `og_title` ponech. SEO alternativy **jen návrh v chatu**.
10. **Anglicismy** — ne anglický genitiv s apostrofem (~~CEO's~~); český tvar.
11. **Zpětné odkazy** — při publikaci **drafty do chatu**, ne zápis do cílových článků. Pravidla stejná jako ve **vd-editor**.
12. **OG obrázek** — vlastní `og_image` 1200×630. JPG: `apps/vzhurudolu/src/assets/img/content/{slug}-og.jpg`, WebP: `public/assets/img/content/dest/{slug}-og.webp`, front matter: `og_image: /assets/img/content/dest/{slug}-og.webp`. `og_description` sladit s perexem.

## Obrázky – kam a jak

- **Blog / podcast:** zdroje do `src/assets/img/content/` nebo `src/assets/img/blog/`. V článku: `![Popis](/assets/img/content/dest/nazev.webp)`.
- **Příručka:**
  1. JPG/PNG do `src/content/prirucka/assets/images/` (příp. podsložka).
  2. V článku `/prirucka/images/nazev.jpg` (build → `.webp`).
  3. Konverze při `npm run dev` / `npm run build`.
  4. Formát: figure + img + figcaption.
  5. Max. šířka 1600 px, poměr 16:9.

## Validace

- Front matter: `npm run check-frontmatter` / `npm run fix-frontmatter`.
- Příručka heading z H1: `npm run fill-heading`.
- Build kontroluje front matter a duplicitní `id` příručky.

Po napsání nabídni spuštění **vd-editor** na draft.
