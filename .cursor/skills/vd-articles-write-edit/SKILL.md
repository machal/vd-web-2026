---
name: vd-articles-write-edit
description: Píše a upravuje články pro web Vzhůru dolů (blog, podcast, příručka). Zná front matter podle typu obsahu, pravidla pro obrázky, nadpisy, citace, tabulky a odkazování. Použij při psaní nových článků, editaci stávajících nebo při doplňování front matter.
---

# Psaní a editace článků Vzhůru dolů

Skill pro konzistentní psaní a úpravy článků na vzhurudolu.cz. Obsah je v Markdownu ve třech kolekcích: **blog**, **podcast**, **příručka**.

## Kde co leží

| Sekce     | Složka                    | Poznámka |
|-----------|---------------------------|----------|
| Blog      | `src/content/blog/`       | Články blogu (~188 MD) |
| Podcast   | `src/content/podcast/`   | Epizody (~68 MD) |
| Příručka  | `src/content/prirucka/`  | Články příručky (~520 MD). Podsložky `content-ebook/`, `content-vdamp/`, `content-vdwd/`, `content-vdlayout/` obsahují i soubory s `published: false` (ebooky). |

Každý MD soubor **musí mít front matter** (blok `---` … `---` na začátku). Build bez něj selže. Soubory s `published: false` jsou z kontroly front matter při buildu vyloučeny.

## Front matter podle typu

Struktura se liší podle kolekce. Schema jsou v `src/content/config.ts`; zde jen přehled povinného a typického.

### Blog

- **Povinné:** `postTitle` (nebo `title`). Pro zobrazení a RSS se dále používají `postDateTime` nebo `date`, `excerpt`/`description`, `postStatus`, `category` (pole).
- **Typické:** `postID`, `postUrlId`, `excerpt`, `postStatus: Published`, `category`, `include_rss`, `category_highlight`, `no_ads`, `og_title`, `og_description`, `og_image`, `og_type`. Autor se defaultně mapuje na „Martin Michálek”.
- **Publikace:** Článek je považován za publikovaný, pokud `published !== false` a `postStatus !== 'Draft'`.

### Podcast

- Stejná struktura jako blog (včetně `postTitle`, `postDateTime`, `excerpt`, `category`, OG polí). Může mít navíc `audioUrl`.
- Mapování `title`, `description`, `date`, `author`, `tags` z legacy polí je stejné jako u blogu.

### Příručka

- **Povinné (pro published):** `id` – musí být **jedinečné** v rámci všech publikovaných článků příručky. Duplicitní `id` způsobí pád validace a buildu.
- **Typické:** `id`, `heading`, `title`, `date`, `perex` (popis), `published: true`, `category` (pole), `category_highlight`, `include_rss`, `no_ads`, `og_title`, `og_description`, `og_type`. Slug se bere z názvu souboru.
- **Ebook / nepublikované:** Soubory v `content-*` mohou mít `published: false`; u nich se nevyžaduje unikátní `id` a neúčastní se validace duplicit.

**Doplňování chybějícího front matter:** `node scripts/check-frontmatter.js --check` / `--fix`. Pro příručku skript generuje `id`, `title`, `heading`, `published: true`. Pro blog/podcast minimálně `postTitle`, `title`, `published: false`.

## Pravidla obsahu (blog a příručka)

Při psaní nebo úpravách v `src/content/blog/` a `src/content/prirucka/` (a kde je to vhodné i v podcastu) dodržuj:

1. **České uvozovky** – pouze v prozaickém textu (odstavce, citace). Ve front matter, v HTML a v kódu vždy jen rovné ASCII uvozovky `"`.
2. **Nadpisy H2–H6** – na konec každého nadpisu přidej anchor ve tvaru `{#slug}` (malá písmena, číslice, pomlčky; bez diakritiky). Každý anchor v článku jedinečný.
3. **Obrázky s popiskem** – používej `<figure>`, `<img src="..." alt="...">`, `<figcaption markdown="1">` s popiskem v kurzívě. Pro dekorativní obrázek bez popisku stačí `![alt](url)`.
4. **Citace s atribucí** – blockquote (`>`) + prázdný řádek v blockquote + atribuce: `– *<cite>[Jméno](url)</cite>*` (nebo bez odkazu `*<cite>Jméno</cite>*`). V citacích české uvozovky „ ".
5. **Tabulky** – obalit v `<div class="rwd-scrollable f-6" markdown="1">` s prázdným řádkem mezi divem a tabulkou.
6. **Výzva na konci** – obalit v `<small>*…*</small>` (kurzíva, malé písmo).
7. **Odkazování** – externí nástroje/služby odkazovat u prvního výskytu; vnitřní odkazy na důležité články přirozeně v textu. Odkazy nedávat do citací, figcaption, perexů ani do meta částí. Příručka: relativní cesty `nazev.md` → `/prirucka/nazev`. Blog/podcast: `/blog/…`, `/podcast/…`.

## Obrázky – kam a jak

- **Blog / podcast:** zdroje do `src/assets/img/content/` nebo `src/assets/img/blog/`. V článku: `![Popis](/assets/img/content/dest/nazev.webp)` (po buildu WebP). Příp. Cloudinary: `![Popis](https://res.cloudinary.com/vzhurudolu-cz/image/upload/…/soubor.jpg)`.
- **Příručka:** obrázky do `src/content/prirucka/assets/images/`. V MD: `![Alt](../dist/images/original/nazev.jpg)` – build cestu přepíše na `/prirucka/images/…`. Doporučená max. šířka 1600 px, poměr 16:9.

## Validace a opravy

- **Kontrola front matter:** `npm run check-frontmatter` (nebo `node scripts/check-frontmatter.js --check`). Oprava: `npm run fix-frontmatter` (nebo `--fix`).
- **Build:** Při `npm run build` se kontroluje, že všechny MD (kromě `published: false`) mají front matter. U příručky se navíc kontrolují duplicitní `id` a chybějící `id` u published souborů.
- **Příručka – duplicitní ID:** Řešit změnou `id` v jednom z duplicitních souborů nebo nastavením `published: false` u ebookových variant. Chyby se v dev módu zobrazují v prohlížeči (overlay).

## Doplnění nadpisů z H1

Skript `npm run fill-heading` doplní do front matter příručky pole odvozená z prvního H1 (např. `heading`). Použij po přidání nového souboru nebo po změně H1.

## Shrnutí povinností

| Co | Blog/Podcast | Příručka (published) |
|----|----------------|----------------------|
| Front matter | Ano, vždy | Ano, vždy |
| Unikátní id | — | Ano (`id`) |
| postTitle / title | postTitle (nebo title) | title / heading |
| published: false | pro koncepty | pouze v content-* (ebooky) |

Pro detailní přehled polí a příklady front matter viz [reference.md](reference.md).
