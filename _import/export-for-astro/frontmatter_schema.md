# Front Matter schéma pro články

Tento dokument popisuje strukturu Front Matter pro články blogu a příručky.

## Blog článek (perch2_blog_index)

### Struktura dat

```yaml
# Front Matter příklad pro blog článek
---
postID: 261
postTitle: 'Můj rok 2025: podnikatelský, strategický, úspěšný, ale taky úzkostný a hledající formu'
postSlug: 'muj-rok-2025-podnikatelsky-strategicky-uspesny-ale-taky-uzkostny-a-hledajici-formu'
postUrlId: rok-2025
postDateTime: 2026-01-06
postDescRaw: 'Můj rok 2025 byl obratový, takže zásadní. A kdyby byl jen pozitivní, není o čem psát, není se z čeho učit a byla by s tím rokem strašná nuda.\r\n\r\n## Trošku úzkost ze světa tam venku {#uzkost}\r\n\r\nZačnu s tou úzkostí v názvu. Určitě ten rozpor někteří z vás'
excerpt: 'Bilance roku 2025 jako roku zásadních přerodů. Cesta od freelancingu k podnikání. Je to místy depka, ale končí to dobře.'
postStatus: Published
authorID: 1
sectionID: 1
blogID: 1
category: osobní,netechnické,
_category:
  - tema/netechnicke/
postTags: 
no_ads: Bez reklam
include_rss: ano
category_highlight: ano
external_author_name: 
external_author: 
external_author_image: 
og_title: 'Můj rok 2025: podnikatelský, strategický, úspěšný, ale taky úzkostný a hledající formu'
og_description: 'Bilance roku 2025 jako roku zásadních přerodů. Cesta od freelancingu k podnikání.'
og_image: /perch-content/evoluce.jpg
og_type: article
_id: 261
itemID: 
itemRowID: 
og_description__flang: plain
og_description_processed: Bilance roku 2025 jako roku zásadních přerodů. Cesta od freelancingu k podnikání.
og_description_raw: Bilance roku 2025 jako roku zásadních přerodů. Cesta od freelancingu k podnikání.
og_image__default: /perch-content/evoluce.jpg
og_image_assetID: 107
og_image_bucket: default
og_image_h: 729
og_image_mime: image/jpeg
og_image_path: evoluce.jpg
og_image_size: 297427
og_image_title: Evoluce
og_image_w: 1613
postAllowComments: 1
postCommentCount: 0
postDescHTML: <p>Můj rok 2025 byl obratový, takže zásadní. A kdyby byl jen pozitivní, není o čem psát, není se z čeho učit a byla by s tím rokem strašná nuda.</p>\n<h2 id=\"uzkost\">Trošku úzkost ze světa tam venku</h2>\n<p>Začnu s tou úzkostí v názvu. Určitě ten rozpor ně
postImportID: 
postIsPublished: 0
postLegacyURL: 
postMetaTemplate: post_meta.html
postTemplate: post.html
postURL: /blog/muj-rok-2025-podnikatelsky-strategicky-uspesny-ale-taky-uzkostny-a-hledajici-formu
postURLFull: 'http://www.vzhurudolu.cz//blog/muj-rok-2025-podnikatelsky-strategicky-uspesny-ale-taky-uzkostny-a-hledajici-formu'
---
```

## Příručka článek (perch2_content_index)

### Struktura dat

```yaml
# Front Matter příklad pro příručka článek
---
id: css-selektory
heading: 'Selektory v CSS: znáte je všechny?'
slug: selektory-v-css-znate-je-vsechny
date: 2022-05-05
perex: 'Doplňuji mezery v pokrývání základů CSS. Cílím zde především na začátečníky, ale myslím, že osvěžit si tohle téma neuškodí ani pokročilým.'
published: Publikováno
category: css,selektory,
_category:
  - tema/css/
category_highlight: ano
include_rss: ano
no_ads: 
external_author_name: 
external_author: 
external_author_image: 
_id: 989
_order:
  - 1014
---
```

### Popis polí

#### Blog článek

- **postID**: ID článku v databázi
- **postTitle**: Název článku
- **postSlug**: URL slug článku
- **postUrlId**: Alternativní URL ID (např. "rok-2025")
- **postDateTime**: Datum a čas publikace (YYYY-MM-DD nebo YYYY-MM-DD HH:MM:SS)
- **postDescRaw**: Raw Markdown obsah článku
- **excerpt**: Krátký výtah článku
- **postStatus**: Status: "Published" nebo "Draft"
- **authorID**: ID autora
- **sectionID**: ID sekce
- **blogID**: ID blogu
- **category**: Kategorie (čárkami oddělené)
- **_category**: Interní kategorie (pole)
- **postTags**: Tagy (čárkami oddělené)
- **no_ads**: Bez reklam ("Bez reklam" nebo prázdné)
- **include_rss**: Zahrnout do RSS ("ano" nebo prázdné)
- **category_highlight**: Zvýraznit kategorii ("ano" nebo prázdné)
- **external_author_name**: Jméno externího autora
- **external_author**: URL externího autora
- **external_author_image**: Obrázek externího autora
- **og_title**: Open Graph název
- **og_description**: Open Graph popis
- **og_image**: Open Graph obrázek
- **og_type**: Open Graph typ (např. "article")

#### Příručka článek

- **id**: ID článku (např. "css-selektory")
- **heading**: Nadpis článku
- **slug**: URL slug článku
- **date**: Datum publikace (YYYY-MM-DD)
- **perex**: Perex článku
- **published**: Status publikace ("Publikováno" nebo prázdné)
- **category**: Kategorie (čárkami oddělené)
- **_category**: Interní kategorie (pole)
- **category_highlight**: Zvýraznit kategorii ("ano" nebo prázdné)
- **include_rss**: Zahrnout do RSS ("ano" nebo prázdné)
- **no_ads**: Bez reklam (prázdné nebo hodnota)
- **external_author_name**: Jméno externího autora
- **external_author**: URL externího autora
- **external_author_image**: Obrázek externího autora

#### Podcast článek

Podcast je součástí blogu a používá stejnou strukturu jako blog článek, ale má kategorii `podcast`.

```yaml
# Front Matter příklad pro podcast článek
---
postID: 259
postTitle: Podcast ze Vzhůru dolů končí, FrontKec začíná
postSlug: podcast-ze-vzhuru-dolu-konci-frontkec-zacina
postUrlId: podcast-konci-frontkec
postDateTime: 2025-09-01
postDescRaw: 'Milé posluchačky, milí posluchači,\r\n\r\npo 59 dílech [podcastu ze Vzhůru dolů](https://www.vzhurudolu.cz/podcast) jsme s Robinem dokroutili ciferníky. Nesmutněte však, není to konec. Podcast se v inovovaném formátu přesunuje pod křídla komunity Frontendisti'
excerpt: 'Do nulté epizodu FrontKecu, natáčené už před prázdninami, jsme si pozvali Tomáše Kouta, aby nás vyzpovídal. Bylo nám totiž hloupé vyzpovídávat sami sebe. Tomáš to vzal zgruntu a tak jsme prošli historii našich podcastů, založení Frontendistů, chystaný Fro'
postStatus: Published
authorID: 1
sectionID: 1
blogID: 1
category: podcast,
_category:
  - tema/podcast/
postTags: 
no_ads: Bez reklam
include_rss: ano
category_highlight: ano
---
```

**Rozdíly oproti běžnému blog článku:**
- `category` obsahuje `podcast,`
- `_category` obsahuje `tema/podcast/`
- `postUrlId` často obsahuje `podcast-` prefix (např. `podcast-konci-frontkec`)
