# Příklady Astro implementace

Tento dokument ukazuje konkrétní příklady, jak by některé URL mohly být implementovány v Astro.

## 1. Homepage (`/`) a seznam článků (`/p=2`, `/p=3`)

**Template**: `homepage.html` (první stránka), `list-articles.html` (další stránky)  
**Astro soubor**: `src/pages/index.astro` (první stránka), `src/pages/[...page].astro` (další stránky)

```astro
---
// index.astro - první stránka
import BaseLayout from '../layouts/BaseLayout.astro';
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
import ArticleList from '../components/ArticleList.astro';

// Načtení nejnovějších článků z Markdown souborů
const allPosts = await Astro.glob('../content/blog/*.md');
const podcasts = await Astro.glob('../content/podcast/*.md');
const allContent = [...allPosts, ...podcasts]
  .sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date));

const currentPage = 1;
const postsPerPage = 20;
const paginatedPosts = allContent.slice(0, postsPerPage);
const latestPost = paginatedPosts[0];
---

<BaseLayout 
  title="Vzhůru dolů – webová kodéřina ze všech stran"
  description="HTML5, CSS3, responzivní design v textech a na školeních Martina Michálka."
  bodyClass="section-home"
>
  <Header />
  
  <main>
    <!-- Obsah z homepage.html -->
    <ArticleList posts={paginatedPosts} currentPage={currentPage} />
  </main>
  
  <Footer />
</BaseLayout>
```

```astro
---
// [...page].astro - další stránky (/p=2, /p=3)
import BaseLayout from '../layouts/BaseLayout.astro';
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
import ArticleList from '../components/ArticleList.astro';

export async function getStaticPaths() {
  const allPosts = await Astro.glob('../content/blog/*.md');
  const podcasts = await Astro.glob('../content/podcast/*.md');
  const allContent = [...allPosts, ...podcasts]
    .sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date));
  
  const postsPerPage = 20;
  const totalPages = Math.ceil(allContent.length / postsPerPage);
  
  return Array.from({ length: totalPages - 1 }, (_, i) => ({
    params: { page: `p=${i + 2}` },
    props: { currentPage: i + 2, allContent },
  }));
}

const { currentPage, allContent } = Astro.props;
const postsPerPage = 20;
const start = (currentPage - 1) * postsPerPage;
const paginatedPosts = allContent.slice(start, start + postsPerPage);
---

<BaseLayout 
  title="Vzhůru dolů – webová kodéřina ze všech stran"
  description="HTML5, CSS3, responzivní design v textech a na školeních Martina Michálka."
  bodyClass="section-home"
>
  <Header />
  
  <main>
    <!-- Obsah z list-articles.html -->
    <ArticleList posts={paginatedPosts} currentPage={currentPage} />
  </main>
  
  <Footer />
</BaseLayout>
```

## 2. Blog článek (`/blog/261-rok-2025`)

**Template**: `article-blog.html`  
**Astro soubor**: `src/pages/blog/[slug].astro`

**Poznámka**: Obsah bude v Markdown souborech (dodáno později)

```astro
---
// [slug].astro
import { getCollection } from 'astro:content';
import BaseLayout from '../../layouts/BaseLayout.astro';
import Header from '../../components/Header.astro';
import Footer from '../../components/Footer.astro';

export async function getStaticPaths() {
  const blogPosts = await getCollection('blog');
  return blogPosts.map((post) => ({
    params: { slug: post.slug },
    props: { post },
  }));
}

const { post } = Astro.props;
const { Content } = await post.render();
---

<BaseLayout 
  title={post.data.title}
  description={post.data.description}
  ogType="article"
  ogUrl={`https://www.vzhurudolu.cz/blog/${post.slug}`}
  bodyClass="section-blog"
>
  <Header />
  
  <main>
    <article>
      <h1>{post.data.title}</h1>
      <div class="page-subhead">
        <p>
          <a href="/martin">Martin Michálek</a>
          <span>{post.data.date}</span>
        </p>
      </div>
      <Content />
    </article>
  </main>
  
  <Footer />
</BaseLayout>
```

**Markdown soubor**: `src/content/blog/261-rok-2025.md` (dodáno později)

```markdown
---
title: "Můj rok 2025: podnikatelský, strategický, úspěšný, ale taky úzkostný a hledající formu"
description: "Bilance roku 2025 jako roku zásadních přerodů. Cesta od freelancingu k podnikání. Je to místy depka, ale končí to dobře."
date: 2026-01-06
author: "Martin Michálek"
tags: ["netechnicke"]
---

Bilance roku 2025 jako roku zásadních přerodů...
```

## 3. Podcast (`/podcast/259-podcast-konci-frontkec`)

**Template**: `article-podcast.html`  
**Astro soubor**: `src/pages/podcast/[slug].astro`

**Poznámka**: Obsah bude v Markdown souborech (dodáno později)

```astro
---
// [slug].astro
import { getCollection } from 'astro:content';
import BaseLayout from '../../layouts/BaseLayout.astro';
import Header from '../../components/Header.astro';
import Footer from '../../components/Footer.astro';

export async function getStaticPaths() {
  const podcasts = await getCollection('podcast');
  return podcasts.map((podcast) => ({
    params: { slug: podcast.slug },
    props: { podcast },
  }));
}

const { podcast } = Astro.props;
const { Content } = await podcast.render();
---

<BaseLayout 
  title={podcast.data.title}
  description={podcast.data.description}
  ogType="article"
  ogUrl={`https://www.vzhurudolu.cz/podcast/${podcast.slug}`}
  bodyClass="section-podcast"
>
  <Header />
  
  <main>
    <article>
      <h1>{podcast.data.title}</h1>
      {podcast.data.audioUrl && (
        <audio controls>
          <source src={podcast.data.audioUrl} type="audio/mpeg" />
        </audio>
      )}
      <Content />
    </article>
  </main>
  
  <Footer />
</BaseLayout>
```

**Markdown soubor**: `src/content/podcast/259-podcast-konci-frontkec.md` (dodáno později)

```markdown
---
title: "Podcast ze Vzhůru dolů končí, FrontKec začíná"
description: "Do nulté epizodu FrontKecu, natáčené už před prázdninami, jsme si pozvali Tomáše Kouta..."
date: 2025-09-01
audioUrl: "/assets/audio/podcast-259.mp3"
---

Do nulté epizodu FrontKecu...
```

## 4. E-book (`/css-layout/`)

**Template**: `ebook-css-layout.html`  
**Astro soubor**: `src/pages/ebooky/css-layout.astro`

**Poznámka**: E-booky jsou **statické stránky** - obsah se vezme přímo z HTML šablony, ne z Markdownu. Celkem 4 statické stránky e-booků.

```astro
---
// css-layout.astro
import BaseLayout from '../../layouts/BaseLayout.astro';
import Header from '../../components/Header.astro';
import Footer from '../../components/Footer.astro';

// Statická stránka - obsah z HTML šablony ebook-css-layout.html
---

<BaseLayout 
  title="Kniha a e-book „CSS: moderní layout""
  description="Grid, flexbox a nové metody rozvržení webů ve 170 ukázkách."
  ogType="book"
  ogUrl="https://www.vzhurudolu.cz/css-layout/"
  bodyClass="section-ebooks"
>
  <Header />
  
  <main>
    <article>
      <h1>CSS: moderní layout</h1>
      <!-- Obsah zkopírován z ebook-css-layout.html -->
      <!-- Statický HTML obsah, ne Markdown -->
    </article>
  </main>
  
  <Footer />
</BaseLayout>
```

**Další e-booky** (stejný princip):
- `/kniha-responzivni-design/` → `ebook-responzivni-design.html`
- `/ebook-amp/` → `ebook-amp.html`
- `/ebook-css3` → (pokud existuje template)

## 5. Info stránka (`/martin`)

**Template**: `info-martin.html`  
**Astro soubor**: `src/pages/martin.astro`

```astro
---
// martin.astro
import BaseLayout from '../layouts/BaseLayout.astro';
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
---

<BaseLayout 
  title="Martin Michálek — optimalizace rychlosti webu"
  description="Ahoj! Jsem konzultant rychlosti webu a tvůrce obsahu pro frontendové vývojáře. Vedu spolek Frontendisti.cz."
  ogType="profile"
  ogUrl="https://www.vzhurudolu.cz/martin"
  bodyClass="section-autor"
>
  <Header />
  
  <main>
    <!-- Obsah z info-martin.html -->
  </main>
  
  <Footer />
</BaseLayout>
```

## 6. Příručka (`/prirucka/css3`)

**Template**: `article-prirucka.html`  
**Astro soubor**: `src/pages/prirucka/[slug].astro`

**Poznámka**: Obsah bude v Markdown souborech (dodáno později)

```astro
---
// [slug].astro
import { getCollection } from 'astro:content';
import BaseLayout from '../../layouts/BaseLayout.astro';
import Header from '../../components/Header.astro';
import Footer from '../../components/Footer.astro';

export async function getStaticPaths() {
  const prirucka = await getCollection('prirucka');
  return prirucka.map((item) => ({
    params: { slug: item.slug },
    props: { item },
  }));
}

const { item } = Astro.props;
const { Content } = await item.render();
---

<BaseLayout 
  title={item.data.title}
  description={item.data.description}
  ogType="article"
  ogUrl={`https://www.vzhurudolu.cz/prirucka/${item.slug}`}
  bodyClass="section-prirucka"
>
  <Header />
  
  <main>
    <article>
      <h1>{item.data.title}</h1>
      <Content />
    </article>
  </main>
  
  <Footer />
</BaseLayout>
```

**Markdown soubor**: `src/content/prirucka/css3.md` (dodáno později)

## 7. Seznam podle tagu (`/css`)

**Template**: (pravděpodobně podobný homepage nebo seznamu)  
**Astro soubor**: `src/pages/[tag].astro`

```astro
---
// [tag].astro
import { getCollection } from 'astro:content';
import BaseLayout from '../layouts/BaseLayout.astro';
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';

export async function getStaticPaths() {
  const tags = ['css', 'rychlost-nacitani', 'nastroje', 'dovednosti', /* ... */];
  return tags.map((tag) => ({
    params: { tag },
  }));
}

const { tag } = Astro.params;
const allPosts = await getCollection('blog');
const taggedPosts = allPosts.filter(post => 
  post.data.tags?.includes(tag)
);
---

<BaseLayout 
  title={`${tag} – Vzhůru dolů`}
  description={`Články na téma ${tag}`}
  bodyClass="section-tag"
>
  <Header />
  
  <main>
    <h1>{tag}</h1>
    <ul>
      {taggedPosts.map((post) => (
        <li>
          <a href={`/blog/${post.slug}`}>{post.data.title}</a>
        </li>
      ))}
    </ul>
  </main>
  
  <Footer />
</BaseLayout>
```

## Poznámky

1. **Content Collections**: Astro podporuje Content Collections pro typově bezpečnou práci s Markdown soubory
2. **Static Paths**: Pro dynamické routy je potřeba exportovat `getStaticPaths()`
3. **Layout komponenty**: Společné části (Header, Footer) jako komponenty
4. **BaseLayout**: Společný layout pro všechny stránky s meta tagy, CSS, JS
5. **Obsah**:
   - **Blog, podcast, příručka**: Obsah v Markdown souborech (dodáno později)
   - **E-booky**: Statické HTML stránky - obsah z HTML šablon, ne Markdown
6. **AMP verze**: Zrušeno - neimplementovat
7. **Stránkování**: Homepage (`/`) = první stránka, `/p=2`, `/p=3` = další stránky seznamu článků
