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
3. **Obrázky s popiskem** – používej `<figure>`, `<img src="..." alt="...">`, `<figcaption markdown="1">` s popiskem v kurzívě. Pro dekorativní obrázek bez popisku stačí `![alt](url)`. **Alt u obrázků:** vždy doplň smysluplný alt text (co obrázek zobrazuje, v kontextu článku). Pokud ho neznáš nebo je to na autorovi, doplň alespoň dočasný alt a výslovně autora vyzvi: „Doplň prosím alt u obrázku …“ – nikdy obrázek nevkládej s prázdným nebo čistě generickým altem bez toho, že na to upozorníš.
4. **Citace s atribucí** – blockquote (`>`) + prázdný řádek v blockquote + atribuce: `– *<cite>[Jméno](url)</cite>*` (nebo bez odkazu `*<cite>Jméno</cite>*`). V citacích české uvozovky „ ".
5. **Tabulky** – obalit v `<div class="rwd-scrollable f-6" markdown="1">` s prázdným řádkem mezi divem a tabulkou.
6. **Výzva na konci** – obalit v `<small>*…*</small>` (kurzíva, malé písmo). Typicky jde o odkaz na komentování na sociálních sítích (LinkedIn, X apod.) – přidávat až po publikaci článku, když je k dispozici URL příspěvku na soc. síti.
7. **Odkazování** – externí nástroje/služby odkazovat u prvního výskytu; vnitřní odkazy na důležité články přirozeně v textu. Odkazy nedávat do citací, perexů ani do meta částí. Ve `figcaption` jsou odkazy povolené (typicky pro uvedení zdroje obrázku/grafu). **Interní odkazy na články vždy jako .md:** v příručce `[Text](nazev.md)`; mezi sekcemi `[Text](../blog/nazev.md)`, `[Text](../prirucka/nazev.md)` nebo `[Text](../podcast/nazev.md)`. V Markdownu nikdy nepsat hotové URL typu `/blog/258-…` ani `/prirucka/nazev` – build přepisuje z .md cest. Na úvodní stránky sekcí lze `/blog`, `/podcast`.
8. **Perex vs. text článku** – perex (`excerpt`/`perex`) je shrnutí pro RSS, náhledy a OG. Text článku by neměl perex opakovat doslova; první odstavce by měly čtenáře vtáhnout jinak než perex.
9. **H1 vs. title (postTitle / title)** – **nemusí být stejné.** `postTitle` (blog/podcast) nebo `title` (příručka) a `og_title` piš **stručně a SEO** (klíčová slova, rok, jména speakerů). **H1** v těle článku piš **článkově**: popisnější, osobnější, klidně s vtipem — má lákat ke čtení, ne kopírovat meta titulek. Nesmí ale zavádět (jiné téma než článek).
10. **Anglicismy v českém textu** – nepoužívat anglický genitiv s apostrofem (např. ~~CEO's~~); místo toho český tvar (CEO, šéfové firem apod.).
11. **Zpětné odkazy na nový článek** – při publikaci nového článku najdi v existujících článcích alespoň 3–5 míst pro odkaz na nový text. Nikdy nepřidávej umělé „→ Související:" bloky. Místo toho: (a) hledej výskyt klíčového slova odpovídajícího URL/id nového článku a prolinkuj ho, nebo (b) na vhodné místo přímo do textu připiš stručnou zmínku s odkazem, která tam čtenářsky sedí. Odkaz musí působit, jako by tam byl od začátku.

## Obrázky – kam a jak

- **Alt:** U každého obrázku vždy mít vyplněný smysluplný alt; pokud ho nedoplníš sám, vyzvi autora k doplnění.
- **Blog / podcast:** zdroje do `src/assets/img/content/` nebo `src/assets/img/blog/`. V článku: `![Popis](/assets/img/content/dest/nazev.webp)` (po buildu WebP). Příp. Cloudinary: `![Popis](https://res.cloudinary.com/vzhurudolu-cz/image/upload/…/soubor.jpg)`.
- **Příručka** – automatický workflow:
  1. **Přidej obrázek** (JPG/PNG) do `src/content/prirucka/assets/images/` (případně do podsložky, např. `ai-saas/`).
  2. **V článku použij cestu** `/prirucka/images/nazev.jpg` (build ji přepíše na `.webp`). Pro podsložku: `/prirucka/images/ai-saas/nazev.jpg`.
  3. **Konverze na WebP** proběhne automaticky při `npm run dev` nebo `npm run build` (Vite plugin). Při přidání nového souboru stačí spustit dev server nebo build.
  4. **Formát v MD:** `<figure><img src="/prirucka/images/nazev.jpg" alt="Popis"><figcaption markdown="1">*Popisek v kurzívě.*</figcaption></figure>`
  5. Doporučená max. šířka 1600 px, poměr 16:9.

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
| postTitle / title | postTitle (nebo title), SEO; H1 může být jiný | title (SEO); H1 / heading může být jiný |
| published: false | pro koncepty | pouze v content-* (ebooky) |

Pro detailní přehled polí a příklady front matter viz [reference.md](reference.md).
