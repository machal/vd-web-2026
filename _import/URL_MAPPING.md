# Mapování URL ze sitemapy na HTML šablony

Tento dokument mapuje URL ze sitemapy (`vd-sitemap.xml`) na odpovídající HTML šablony v `_import/templates/`.

## Struktura URL

### Homepage
- `/` → `homepage.html`

### Blog články
- `/` → `homepage.html` (první stránka seznamu článků)
- `/p=2`, `/p=3`, atd. → `list-articles.html` (další stránky seznamu článků)
- `/blog/{id}-{slug}` → `article-blog.html`
  - Příklad: `/blog/261-rok-2025` → `article-blog.html`

### Podcast
- `/podcast` → `list-podcast.html`
- `/podcast/{id}-{slug}` → `article-podcast.html`
  - Příklad: `/podcast/259-podcast-konci-frontkec` → `article-podcast.html`

### E-booky (statické stránky)
- `/ebooky` → `list-ebooks.html`
- `/css-layout/` → `ebook-css-layout.html` (statická stránka)
- `/kniha-responzivni-design/` → `ebook-responzivni-design.html` (statická stránka)
- `/ebook-amp/` → `ebook-amp.html` (statická stránka)
- `/ebook-css3` → (pravděpodobně další ebook template - statická stránka)

### Příručka
- `/prirucka/{slug}` → `article-prirucka.html`
  - Příklad: `/prirucka/css3` → `article-prirucka.html`
  - Příklad: `/prirucka/ostatni` → `article-prirucka.html`

### Video
- `/video` → `video-list.html`

### Info stránky
- `/martin` → `info-martin.html`
- `/cookies` → `info-cookies.html`
- `/osobni-udaje` → `info-osobni-udaje.html`
- `/podminky` → `info-podminky.html`
- `/o-webu` → `info-o-webu.html`

### Témata (tagy/kategorie)
- `/css` → (pravděpodobně seznam článků s tagem CSS)
- `/rychlost-nacitani` → (seznam článků)
- `/nastroje` → (seznam článků)
- `/podcast` → (seznam podcastů)
- `/dovednosti` → (seznam článků)
- `/responzivni-design` → (seznam článků)
- `/javascript` → (seznam článků)
- `/html` → (seznam článků)
- `/svg` → (seznam článků)
- `/bootstrap` → (seznam článků)
- `/prohlizece` → (seznam článků)
- `/netechnicke` → (seznam článků)
- `/skoleni` → (seznam článků)
- `/pristupnost` → (seznam článků)
- `/organizace-css` → (seznam článků)
- `/wordpress` → (seznam článků)
- `/amp` → (seznam článků)
- `/webdesign` → (seznam článků)

### Kurzy
- `/kurzy` → (pravděpodobně seznam kurzů)
- `/kurzy/info` → (info o kurzech)
- `/kurzy/ohlas/{id}-{slug}` → (ohlas na kurz, pravděpodobně dynamický obsah)

### Ostatní
- `/email` → (newsletter signup?)
- `/style` → (style guide?)
- `/style/base` → (style guide sekce)
- `/style/colors` → (style guide sekce)
- `/style/modules` → (style guide sekce)

## Konkrétní příklady mapování

### Blog články
- `/blog/261-rok-2025` → `article-blog.html`
  - Template obsahuje: title, meta description, og:tags, hlavní obsah článku
  - Body class: `section-blog`
  
- `/blog/260-frontkon-2025` → `article-blog.html`
- `/blog/258-ai-programovani-psani` → `article-blog.html`

### Podcast
- `/podcast/259-podcast-konci-frontkec` → `article-podcast.html`
  - Template obsahuje: title, meta description, og:tags, audio player, obsah
  - Body class: `section-podcast`

- `/podcast/257-podcast-petr-burian-sabatikl` → `article-podcast.html`

### E-booky
- `/css-layout/` → `ebook-css-layout.html`
  - Template obsahuje: title, meta description, og:type="book", obsah knihy
  - Body class: `section-ebooks`

- `/kniha-responzivni-design/` → `ebook-responzivni-design.html`
- `/ebook-amp/` → `ebook-amp.html`

### Příručka
- `/prirucka/css3` → `article-prirucka.html`
- `/prirucka/ostatni` → `article-prirucka.html`
- `/prirucka/jednotky` → `article-prirucka.html` (z homepage odkazu)

### Info stránky
- `/martin` → `info-martin.html`
  - Body class: `section-autor`
  - Og:type: `profile`

- `/cookies` → `info-cookies.html`
- `/osobni-udaje` → `info-osobni-udaje.html`
- `/podminky` → `info-podminky.html`
- `/o-webu` → `info-o-webu.html`

## Astro struktura (návrh)

```
src/
  pages/
    index.astro                    # / → homepage.html (první stránka seznamu)
    [...page].astro                # /p=2, /p=3 → list-articles.html (další stránky seznamu)
    blog/
      [slug].astro                 # /blog/{slug} → article-blog.html
                                   # Příklad: /blog/261-rok-2025
                                   # Obsah: Markdown (dodáno později)
    podcast/
      index.astro                   # /podcast → list-podcast.html
      [slug].astro                  # /podcast/{slug} → article-podcast.html
                                    # Příklad: /podcast/259-podcast-konci-frontkec
                                    # Obsah: Markdown (dodáno později)
    ebooky/
      index.astro                   # /ebooky → list-ebooks.html
      css-layout.astro              # /css-layout/ → ebook-css-layout.html
                                    # Statická stránka - obsah z HTML šablony
      kniha-responzivni-design.astro # /kniha-responzivni-design/ → ebook-responzivni-design.html
                                      # Statická stránka - obsah z HTML šablony
      amp.astro                     # /ebook-amp/ → ebook-amp.html
                                    # Statická stránka - obsah z HTML šablony
      css3.astro                    # /ebook-css3 → (pokud existuje)
                                    # Statická stránka - obsah z HTML šablony
    prirucka/
      [slug].astro                  # /prirucka/{slug} → article-prirucka.html
                                    # Příklad: /prirucka/css3, /prirucka/jednotky
                                    # Obsah: Markdown (dodáno později)
    video/
      index.astro                   # /video → video-list.html
    martin.astro                    # /martin → info-martin.html
    cookies.astro                   # /cookies → info-cookies.html
    osobni-udaje.astro             # /osobni-udaje → info-osobni-udaje.html
    podminky.astro                  # /podminky → info-podminky.html
    o-webu.astro                   # /o-webu → info-o-webu.html
    [tag].astro                     # /{tag} → seznam článků podle tagu
                                    # Příklad: /css, /rychlost-nacitani, /nastroje
  layouts/
    BaseLayout.astro                # Základní layout (head, body wrapper)
  components/
    Header.astro                    # Header s navigací
    Footer.astro                    # Footer
    Article.astro                    # Komponenta pro článek
    ArticleList.astro               # Komponenta pro seznam článků
    ...
  content/
    blog/                            # Markdown soubory pro blog (dodáno později)
      {id}-{slug}.md                 # Příklad: 261-rok-2025.md
    podcast/                         # Markdown soubory pro podcast (dodáno později)
      {id}-{slug}.md                 # Příklad: 259-podcast-konci-frontkec.md
    prirucka/                        # Markdown soubory pro příručku (dodáno později)
      {slug}.md                      # Příklad: css3.md, jednotky.md
    ...
```

## Poznámky k migraci

1. **Body classes**: Každá stránka má specifickou body class:
   - `section-home` - homepage a seznamy článků
   - `section-blog` - blog články
   - `section-podcast` - podcast
   - `section-ebooks` - e-booky
   - `section-autor` - info-martin
   - atd.

2. **OG tags**: Různé typy stránek mají různé og:type:
   - `website` - homepage, seznamy
   - `article` - blog články, podcast, příručka
   - `book` - e-booky
   - `profile` - info-martin

3. **Obsah**:
   - **Blog články, podcasty, příručka**: Obsah bude v Markdown souborech (dodáno později)
   - **E-booky**: 4 statické stránky - obsah z HTML šablon, ne Markdown

4. **Stránkování**: 
   - Homepage (`/`) = první stránka seznamu článků
   - `/p=2`, `/p=3` atd. = další stránky seznamu → `list-articles.html`

5. **AMP verze**: Zrušeno - neimplementovat

6. **RSS feed**: `/rss` - RSS feed pro blog
