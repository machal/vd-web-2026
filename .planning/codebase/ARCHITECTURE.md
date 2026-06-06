<!-- refreshed: 2026-06-06 -->
# Architecture

**Analysis Date:** 2026-06-06

## System Overview

```text
┌─────────────────────────────────────────────────────────────────────────┐
│                         Build Time (Node.js)                             │
├──────────────────┬──────────────────────┬───────────────────────────────┤
│  Astro Pages     │  Content Collections │  Vite Plugins                 │
│  `src/pages/`    │  `src/content/`      │  `vite-plugin-*.ts`           │
│  `src/layouts/`  │  `src/content/config.ts` │ `astro.config.mjs`        │
│  `src/components/`│                     │                               │
└────────┬─────────┴──────────┬───────────┴───────────────┬───────────────┘
         │                    │                           │
         ▼                    ▼                           ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                    Markdown Pipeline (remark → rehype)                   │
│  `src/utils/remark-*.ts`  →  `src/utils/rehype-*.ts`                    │
└─────────────────────────────────────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                    Static Output (`dist/`)                               │
│  HTML pages + `public/` assets (CSS, JS, fonts, legacy data)            │
└─────────────────────────────────────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  Production: GitHub Actions → FTP deploy → Apache (`.htaccess`)         │
│  `.github/workflows/deploy-ftp.yml`                                      │
└─────────────────────────────────────────────────────────────────────────┘
```

## Component Responsibilities

| Component | Responsibility | File |
|-----------|----------------|------|
| Astro config | Site URL, static output, markdown plugins, Vite plugins, integrations | `astro.config.mjs` |
| Content schema | Zod schemas for blog, podcast, prirucka; field normalization | `src/content/config.ts` |
| Base layout | HTML shell, meta/OG tags, CSS bundles, slot-based composition | `src/layouts/BaseLayout.astro` |
| Page routes | File-based routing, `getStaticPaths`, content rendering | `src/pages/**/*.astro` |
| UI components | Header, footer, article chrome, category TOCs | `src/components/` |
| Category config | Tag-to-category mapping, TOC flags | `src/data/categories.ts` |
| Markdown plugins | Transform MD → HTML (images, links, headings, ebook-only) | `src/utils/remark-*.ts`, `src/utils/rehype-*.ts` |
| Build plugins | Image conversion, frontmatter validation, public copy | `vite-plugin-*.ts` |
| Validations | Duplicate prirucka IDs, frontmatter checks | `src/utils/validate-prirucka.ts` |
| Middleware | Runtime redirects (dev/preview only for static) | `src/middleware.ts` |
| RSS feed | Aggregated feed from all collections | `src/pages/rss.ts` |
| Sitemap | Custom XML generation (replaces broken `@astrojs/sitemap`) | `src/utils/custom-sitemap.ts` |
| Deploy manifest | MD5 hashes for incremental FTP sync | `src/utils/changed-files-integration.ts` |

## Pattern Overview

**Overall:** Static Site Generation (SSG) with Astro Content Collections

**Key Characteristics:**
- All pages pre-rendered at build time (`output: 'static'` in `astro.config.mjs`)
- Content lives in Markdown files with typed front matter (Zod schemas in `src/content/config.ts`)
- Heavy content transformation happens in a two-phase Markdown pipeline (remark parse → rehype HTML transform)
- Legacy CSS/JS served from `public/assets/`; Astro components compose HTML around pre-built stylesheets
- Three content types (blog, podcast, prirucka) share listing/category logic but have distinct URL patterns

## Layers

**Presentation (Pages + Components):**
- Purpose: Route definitions, page assembly, article/list rendering
- Location: `src/pages/`, `src/components/`, `src/layouts/`
- Contains: `.astro` files with frontmatter scripts and HTML templates
- Depends on: Content collections, `src/data/categories.ts`, utilities
- Used by: Astro build to generate static HTML

**Content (Collections):**
- Purpose: Markdown source files with front matter
- Location: `src/content/blog/`, `src/content/podcast/`, `src/content/prirucka/`
- Contains: `.md` files; prirucka also has `assets/images/` and ebook subdirs (`content-vdwd/`, etc.)
- Depends on: Schema in `src/content/config.ts`
- Used by: Pages via `getCollection()` and `.render()`

**Transform (Markdown Pipeline):**
- Purpose: Convert legacy Markdown/HTML into site-ready output
- Location: `src/utils/remark-*.ts`, `src/utils/rehype-*.ts`; registered in `astro.config.mjs`
- Contains: Unified/remark/rehype plugins for images, links, headings, ebook-only removal
- Depends on: `remark-gfm`, `rehype-raw`, Shiki (via Astro markdown config)
- Used by: All `.md` content at render time

**Build (Vite Plugins + Integrations):**
- Purpose: Image optimization, validation gates, asset copying, sitemap/manifest generation
- Location: Root `vite-plugin-*.ts`, `src/utils/custom-sitemap.ts`, `src/utils/changed-files-integration.ts`
- Contains: Sharp/SVGO image pipelines, frontmatter validator, public→dist copy
- Depends on: Node.js fs, Sharp, chokidar
- Used by: `npm run dev` and `npm run build`

**Static Assets:**
- Purpose: CSS, JS, fonts, legacy archives served as-is
- Location: `public/` (served at root URL), `src/assets/` (processed by Vite plugins)
- Contains: SCSS-compiled CSS bundles, `vrdl.min.js`, favicon, `public/data/` legacy archive
- Depends on: Pre-built CSS (not compiled by Astro at runtime)
- Used by: All pages via `<link>` and `<script>` tags in layouts/pages

## Data Flow

### Primary Request Path (Build → Static HTML)

1. **Build invoked** — `npm run build` runs Astro with config from `astro.config.mjs`
2. **Vite plugins run** — `vite-plugin-validate-frontmatter.ts` checks MD files; image plugins convert sources to WebP in `public/`
3. **Static paths generated** — Each page's `getStaticPaths()` loads collections via `getCollection()` (e.g. `src/pages/blog/[slug].astro:12-18`)
4. **Content rendered** — `post.render()` applies remark/rehype pipeline configured in `astro.config.mjs:113-150`
5. **HTML assembled** — Page wraps rendered `<Content />` in `BaseLayout.astro` with Header/Footer components
6. **Output written** — Static files land in `dist/`; `vitePluginCopyPublicToDist()` ensures full `public/` copy including dotfiles

### Article Page Flow (Blog Example)

1. **Route match** — `src/pages/blog/[slug].astro` resolves slug from filename (e.g. `100-2016-podelal.md` → `/blog/100-2016-podelal`)
2. **Content load** — `getCollection('blog')` returns typed entry with normalized fields from schema transform
3. **Markdown render** — `post.render()` produces `<Content />` component; rehype plugins transform links/images/headings
4. **Related content** — `getRelatedArticles()` in `src/utils/get-related-articles.ts` finds up to 3 articles by shared tags across all collections
5. **Category mapping** — Tags matched against `src/data/categories.ts` via diacritic-normalized comparison
6. **Layout output** — `ArticleHeader`, article body, `ArticleFooter` composed inside `BaseLayout.astro`

### Příručka (Guide) Page Flow

1. **Route match** — `src/pages/prirucka/[slug].astro` uses front matter `id` (not filename) as URL param
2. **Validation gate** — `validateDuplicateIds()` in `getStaticPaths` fails build on duplicate published IDs
3. **Content enrichment** — Raw MD read from disk; `enrichPriruckaEntry()` in `src/utils/extract-content-fallback.ts` extracts H1/perex when front matter is incomplete
4. **Render + transform** — Same remark/rehype pipeline; `rehypePriruckaLinks` converts `.md` links to final URLs
5. **Dev validation UI** — `ValidationErrors.astro` shows overlay in development mode

### Homepage / Listing Flow

1. **Aggregate collections** — `src/pages/index.astro` loads blog + podcast + prirucka, filters published, sorts by date
2. **Paginate** — Homepage shows 5 items; further pages at `/p=2`, `/p=3` via `src/pages/[...page].astro`
3. **Category listings** — `src/pages/[category].astro` filters by tags from `src/data/categories.ts`; paginated at `src/pages/[category]/[...page].astro`

### RSS Feed Flow

1. **Endpoint** — `src/pages/rss.ts` exports `GET` handler
2. **Aggregate + filter** — Same three collections; respects `include_rss` flag; limits to 10 items
3. **Output** — `@astrojs/rss` generates XML at `/rss`

**State Management:**
- No client-side state framework; pages are fully static HTML
- Build-time only: content collections loaded per-page during SSG
- Incremental deploy state stored in manifest generated by `changed-files-integration.ts` (MD5 hashes of `dist/` files)

## Key Abstractions

**Content Collections:**
- Purpose: Typed Markdown content with Zod-validated front matter
- Examples: `src/content/config.ts`, `src/content/blog/`, `src/content/podcast/`, `src/content/prirucka/`
- Pattern: Astro `defineCollection()` + `getCollection()` + `.render()`

**URL Slug Conventions:**
- Purpose: Stable public URLs per content type
- Examples:
  - Blog: filename slug → `/blog/{slug}` (`src/pages/blog/[slug].astro`)
  - Podcast: `{postID}-{slug}` → `/podcast/{postID}-{slug}` (`src/pages/podcast/[slug].astro:14`)
  - Příručka: front matter `id` → `/prirucka/{id}` (`src/pages/prirucka/[slug].astro:44-48`)
- Pattern: `getSlug()` helper duplicated in `ArticleListItem.astro`, `index.astro`, `rss.ts` — always use collection-specific logic

**Category System:**
- Purpose: Group articles by topic tags
- Examples: `src/data/categories.ts`, `src/pages/[category].astro`
- Pattern: Categories define `tags[]`; articles filtered by matching `post.data.tags`; some categories have dedicated TOC components in `src/components/categories/`

**Markdown Transform Pipeline:**
- Purpose: Legacy content compatibility (raw HTML, `markdown="1"`, ebook-only sections, `.md` internal links)
- Examples: `src/utils/remark-process-markdown-attributes.ts`, `src/utils/rehype-prirucka-links.ts`
- Pattern: remark plugins modify MD AST; rehype plugins modify HTML HAST after `rehypeRaw`

**Layout Slots:**
- Purpose: Composable page structure without nested layouts
- Examples: `src/layouts/BaseLayout.astro` — slots: default (main), `header`, `footer`, `styles`
- Pattern: `<Header slot="header" />`, page-specific CSS via `<Fragment slot="styles">`

## Entry Points

**Development server:**
- Location: `npm run dev` → Astro dev server (default `localhost:4321`)
- Triggers: Local development; Vite plugins watch and convert images
- Responsibilities: Hot reload, dev-mode validation overlays

**Production build:**
- Location: `npm run build` → `dist/`
- Triggers: Manual build or GitHub Actions on push to `master`/`main`
- Responsibilities: SSG all routes, run validations, generate sitemap, copy public assets

**GitHub Actions deploy:**
- Location: `.github/workflows/deploy-ftp.yml`
- Triggers: Push to `master` or `main`
- Responsibilities: `npm ci && npm run build`, FTP upload of `dist/` (excludes `data/`, `files/`)

**Content maintenance scripts:**
- Location: `scripts/`
- Triggers: Manual via npm scripts or direct node invocation
- Responsibilities: Frontmatter fixes, category assignment, image conversion

## Architectural Constraints

- **Threading:** Single-threaded Node.js build; no server runtime (static output only)
- **Global state:** No shared mutable runtime state; build plugins use filesystem only
- **Circular imports:** Not detected; utils are leaf modules imported by config and pages
- **CSS architecture:** Legacy pre-compiled CSS in `public/assets/css/`; Astro does not process SCSS at build time (SCSS sources in `public/assets/scss/` maintained separately)
- **URL trailing slash:** `trailingSlash: 'never'` in `astro.config.mjs:108` — all URLs except root omit trailing slash
- **Ebook content isolation:** Files in `src/content/prirucka/content-*/` subdirs use `published: false` to exclude from site while sharing IDs with standalone prirucka articles
- **Legacy data:** `public/data/` and `public/files/` are large static archives excluded from FTP deploy; must exist on server independently

## Anti-Patterns

### Duplicated getSlug / normalizeTag Logic

**What happens:** URL-building and tag-normalization functions are copy-pasted across `index.astro`, `[...page].astro`, `ArticleListItem.astro`, `rss.ts`, and article detail pages.

**Why it's wrong:** Divergent URL generation causes broken links if one copy is updated and others are not.

**Do this instead:** Extract shared helpers to `src/utils/content-urls.ts` (or similar) and import everywhere. Follow the canonical patterns already in `ArticleListItem.astro:19-28`.

### Direct Filesystem Reads in Pages

**What happens:** `src/pages/prirucka/[slug].astro` reads raw MD via `readFileSync` for enrichment alongside Astro's content layer.

**Why it's wrong:** Bypasses Astro content APIs; path construction is fragile; duplicates parsing logic.

**Do this instead:** Keep enrichment in utility (`extract-content-fallback.ts`) but prefer extending the Zod schema transform or a custom integration if adding new fields.

### Inline Styles in Page Templates

**What happens:** Article pages embed `<style>` blocks for heading anchor hover effects directly in `[slug].astro` files.

**Why it's wrong:** Duplicated CSS across blog/podcast/prirucka pages; harder to maintain.

**Do this instead:** Move shared article styles to `public/assets/css/modules-standalone/` or a shared Astro component with scoped styles.

## Error Handling

**Strategy:** Fail fast at build time for content errors; graceful degradation for optional enrichment

**Patterns:**
- Duplicate prirucka IDs → build throws in `getStaticPaths` (`src/pages/prirucka/[slug].astro:38`)
- Missing frontmatter → `vite-plugin-validate-frontmatter.ts` fails build (excludes `published: false` ebook files)
- Enrichment failure → warn and fall back to schema data (`src/pages/prirucka/[slug].astro:87-90`)
- Copy/I/O errors during public sync → warn but continue build (`astro.config.mjs:57-63`)

## Cross-Cutting Concerns

**Logging:** `console.log`/`console.warn`/`console.error` in build plugins and validations; no structured logging framework

**Validation:** Centralized in `src/utils/validate-prirucka.ts`; enforced at Vite plugin level and in prirucka `getStaticPaths`; dev overlay via `ValidationErrors.astro`

**Authentication:** Not applicable — fully public static site

**SEO:** Meta/OG tags in `BaseLayout.astro`; custom sitemap; RSS feed; `robots.txt` in `public/`

**Redirects:** Apache rules in `public/.htaccess` for legacy URLs; Astro middleware in `src/middleware.ts` for `/kurzy/*` → `/kurzy`

---

*Architecture analysis: 2026-06-06*
