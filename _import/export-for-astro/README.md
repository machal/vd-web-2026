# Export pro Astro migraci

Tato složka obsahuje všechny podklady pro migraci struktury databáze do Astro formátu s Front Matter.

## 🚀 Rychlý start

Pro rychlou migraci článků příručky viz **[QUICK-START.md](./QUICK-START.md)**

Pro podrobnou dokumentaci migrace článků příručky viz **[MIGRACE-PRIRUCKA.md](./MIGRACE-PRIRUCKA.md)**

## Obsah složky

### Dokumentace
- **`frontmatter_schema.md`** - Kompletní dokumentace Front Matter schématu pro všechny typy článků (blog, příručka, podcast)

### Ukázkové soubory
- **`blog-rok-2025-example.md`** - Příklad blog článku s Front Matter
- **`guide-css-selektory-example.md`** - Příklad příručka článku s Front Matter
- **`podcast-konci-frontkec-example.md`** - Příklad podcast článku s Front Matter

### Skripty
- **`extract_frontmatter_schema.py`** - Skript pro extrakci Front Matter struktury z databáze
- **`extract_schema.py`** - Skript pro extrakci struktury databáze (CREATE TABLE, indexy, foreign keys)
- **`export_all_podcasts.py`** - Skript pro extrakci všech podcastů do Markdown souborů
- **`export_all_blogs.py`** - Skript pro extrakci všech blog postů (kromě podcastů) do Markdown souborů
- **`export_guide_articles_from_sitemap.py`** - Skript pro extrakci článků příručky podle sitemap.xml
- **`transform_to_astro.py`** - Skript pro transformaci Front Matter do Astro formátu

### Databáze
- **`vdinno.sql`** - Kompletní SQL dump databáze (37 MB)
- **`vdinno_schema.sql`** - Pouze struktura databáze bez dat (43 KB)

### Dokumentace migrace
- **`QUICK-START.md`** - Rychlý návod pro migraci článků příručky
- **`MIGRACE-PRIRUCKA.md`** - Podrobná dokumentace migrace článků příručky

## Použití

### Regenerace Front Matter schématu

Pokud potřebujete znovu vygenerovat Front Matter schéma z databáze:

```bash
python3 extract_frontmatter_schema.py
```

Skript automaticky:
1. Extrahuje data pro blog článek (postID 261 - "rok-2025")
2. Extrahuje data pro příručka článek (itemID 989 - "css-selektory")
3. Extrahuje data pro podcast (postID 259 - "podcast-konci-frontkec")
4. Vytvoří dokumentaci `frontmatter_schema.md`
5. Vytvoří ukázkové soubory `.md`

### Regenerace schématu databáze

Pokud potřebujete znovu extrahovat pouze strukturu databáze:

```bash
python3 extract_schema.py
```

Vytvoří soubor `vdinno_schema.sql` obsahující pouze CREATE TABLE příkazy, indexy a foreign keys.

### Export všech podcastů

Pokud potřebujete exportovat všechny podcasty do Markdown souborů:

```bash
python3 export_all_podcasts.py
```

Skript automaticky:
1. Najde všechny podcasty v databázi (podle `postUrlId` začínajícího "podcast-")
2. Extrahuje data pro každý podcast
3. Vytvoří Markdown soubory s Front Matter ve složce `content/podcast/`
4. Každý soubor má název podle `postUrlId` (např. `podcast-konci-frontkec.md`)

Vytvořené soubory obsahují:
- Kompletní Front Matter podle schématu
- Celý obsah článku z databáze
- Správně vyčištěný Markdown obsah

### Export všech blog postů

Pokud potřebujete exportovat všechny blog posty (kromě podcastů) do Markdown souborů:

```bash
python3 export_all_blogs.py
```

Skript automaticky:
1. Najde všechny blog posty v databázi (všechny posty kromě těch s `postUrlId` začínajícím "podcast-")
2. Extrahuje data pro každý blog post
3. Vytvoří Markdown soubory s Front Matter ve složce `content/blog/`
4. Každý soubor má název ve formátu `{postID}-{postUrlId}.md` (např. `261-rok-2025.md`)

Vytvořené soubory obsahují:
- Kompletní Front Matter podle schématu (včetně kategorií)
- Celý obsah článku z databáze
- Správně vyčištěný Markdown obsah

## Struktura entit

### Blog článek
- Tabulka: `perch2_blog_index`
- Klíčová pole: `postTitle`, `postSlug`, `postUrlId`, `postDateTime`, `excerpt`, `category`, `_category`
- Příklad: `blog-rok-2025-example.md`

### Příručka článek
- Tabulka: `perch2_content_index`
- Klíčová pole: `id`, `heading`, `slug`, `date`, `perex`, `category`, `_category`
- Příklad: `guide-css-selektory-example.md`

### Podcast článek
- Tabulka: `perch2_blog_index` (stejná jako blog)
- Rozdíly: `category` obsahuje `podcast,`, `_category` obsahuje `tema/podcast/`
- Příklad: `podcast-konci-frontkec-example.md`

### Export článků příručky

Pokud potřebujete exportovat všechny články příručky podle sitemap.xml:

```bash
python3 export_guide_articles_from_sitemap.py
```

Skript automaticky:
1. Načte slugy ze sitemap.xml
2. Najde odpovídající články v databázi
3. Vytvoří Markdown soubory s Front Matter ve složce `content/prirucka/`
4. Nastaví `published: true` pro články v sitemap.xml

**Výsledek:**
- 368 článků v `content/prirucka/`
- 86 článků s kompletními daty z databáze
- 261 článků publikovaných (podle sitemap.xml)

### Transformace do Astro formátu

Po exportu je potřeba transformovat Front Matter do Astro formátu:

```bash
python3 transform_to_astro.py
```

Skript automaticky:
- Přejmenuje `category` → `categories`
- Přejmenuje `og_title` → `socialTitle`
- Přejmenuje `og_description` → `socialDescription`
- Přidá `title` z `heading`
- Odstraní `slug` (není v Astro schématu)

## Poznámky

- Všechny cesty ve skriptech jsou nastavené na aktuální složku
- Databáze `vdinno.sql` obsahuje kompletní data včetně všech článků
- Schéma `vdinno_schema.sql` obsahuje pouze strukturu bez dat
- Články příručky jsou validovány podle `vd-sitemap.xml` pro správné nastavení `published` statusu
