# Codebase Structure

**Analysis Date:** 2026-06-06

## Directory Layout

```
www/
├── astro.config.mjs           # Astro + Vite + markdown pipeline config
├── package.json               # Dependencies and npm scripts
├── vite-plugin-*.ts           # Root-level Vite build plugins (4 files)
├── src/                       # Astro application source
│   ├── pages/                 # File-based routes (SSG entry points)
│   ├── layouts/               # Page shell templates
│   ├── components/            # Reusable Astro UI components
│   ├── content/               # Markdown content collections
│   ├── data/                  # Static configuration data
│   ├── utils/                 # remark/rehype plugins, helpers, integrations
│   ├── assets/                # Source images processed by Vite plugins
│   ├── middleware.ts          # Request middleware (redirects)
│   └── env.d.ts               # TypeScript ambient declarations
├── public/                    # Static files copied verbatim to dist/
│   ├── assets/                # CSS, JS, fonts, images (legacy design system)
│   ├── data/                  # Legacy archive (/data/… URLs)
│   ├── files/                 # Downloadable files (/files/… URLs)
│   ├── favicon/               # Icons and PWA manifest
│   ├── prirucka/images/       # Generated WebP images (build output)
│   ├── .htaccess              # Apache redirects and headers
│   └── robots.txt             # Crawler rules
├── scripts/                   # Content maintenance CLI scripts
├── dist/                      # Production build output (gitignored)
├── .github/workflows/         # CI: FTP deploy, secret scanning
├── .cursor/skills/            # Cursor agent skills for content editing
├── _import/                   # Import staging area (migration artifacts)
├── _working/                  # Working notes and templates (not part of build)
└── .planning/                 # GSD planning artifacts
```

## Directory Purposes

**`src/pages/`:**
- Purpose: Astro file-based routing; each `.astro` file becomes one or more static routes
- Contains: ~40 page files including dynamic routes with `getStaticPaths`
- Key files: `index.astro`, `blog/[slug].astro`, `prirucka/[slug].astro`, `podcast/[slug].astro`, `[category].astro`, `[...page].astro`, `rss.ts`

**`src/layouts/`:**
- Purpose: Shared HTML document structure
- Contains: `BaseLayout.astro` (sole layout)
- Key files: `BaseLayout.astro` — meta tags, CSS bundles, slot-based header/footer/main

**`src/components/`:**
- Purpose: Reusable UI fragments composed by pages
- Contains: Header, Footer, article chrome, category TOCs, validation overlay
- Key files: `Header.astro`, `Footer.astro`, `ArticleHeader.astro`, `ArticleFooter.astro`, `ArticleListItem.astro`, `categories/CategoryTOC*.astro`

**`src/content/`:**
- Purpose: Markdown source for Astro Content Collections
- Contains: ~190 blog, ~68 podcast, ~370+ prirucka MD files; prirucka subdirs for ebooks and images
- Key files: `config.ts` (collection schemas), `blog/*.md`, `podcast/*.md`, `prirucka/*.md`

**`src/content/prirucka/` (special subdirs):**
- Purpose: Příručka articles plus ebook-only and asset content
- Contains:
  - `assets/images/` — source images converted to `public/prirucka/images/`
  - `content-ebook/`, `content-vdamp/`, `content-vdlayout/`, `content-vdwd/` — ebook chapter MD with `published: false`
- Key files: Individual `.md` per guide article; front matter requires `id` for published articles

**`src/data/`:**
- Purpose: Static configuration not derived from content collections
- Contains: Category definitions with slugs, titles, tags, TOC flags
- Key files: `categories.ts`

**`src/utils/`:**
- Purpose: Markdown transform plugins, build integrations, content helpers
- Contains: 16 TypeScript modules (remark/rehype plugins, sitemap, validation, related articles)
- Key files: `rehype-prirucka-links.ts`, `validate-prirucka.ts`, `get-related-articles.ts`, `custom-sitemap.ts`

**`src/assets/`:**
- Purpose: Source images for blog/podcast/design icons; processed by Vite plugins into `public/assets/`
- Contains: `img/content/`, `img/design/`, `img/blog/`
- Key files: Organized by content type; WebP output goes to `public/assets/img/content/dest/`

**`public/assets/`:**
- Purpose: Pre-built frontend assets served at `/assets/…`
- Contains: Compiled CSS (`1-base.min.css` through `4-helpers.min.css`), JS (`vrdl.min.js`), fonts, SCSS sources, icons
- Key files: `css/`, `js/`, `fonts/`, `scss/`, `img/`

**`public/data/`:**
- Purpose: Legacy static archive (old site versions, CSS framework demos, tests)
- Contains: Large historical snapshot; not deployed via FTP (excluded in workflow)
- Key files: `archiv/`, `css-frameworks/`, `2012-tumblr/`

**`scripts/`:**
- Purpose: One-off and maintenance CLI tools for content operations
- Contains: Frontmatter check/fix, category assignment, image conversion, ebook published flags
- Key files: `check-frontmatter.js`, `convert-prirucka-images.ts`, `assign-categories.ts`

**Root `vite-plugin-*.ts`:**
- Purpose: Vite hooks for build-time image processing and validation
- Contains: 4 plugins registered in `astro.config.mjs:153-158`
- Key files: `vite-plugin-prirucka-images.ts`, `vite-plugin-content-images.ts`, `vite-plugin-design-images.ts`, `vite-plugin-validate-frontmatter.ts`

## Key File Locations

**Entry Points:**
- `astro.config.mjs`: Central build configuration
- `src/pages/index.astro`: Homepage
- `src/pages/rss.ts`: RSS feed endpoint
- `src/middleware.ts`: Redirect rules
- `package.json`: `dev`, `build`, `preview` scripts

**Configuration:**
- `astro.config.mjs`: Astro, Vite, markdown pipeline
- `src/content/config.ts`: Content collection Zod schemas
- `src/data/categories.ts`: Topic category definitions
- `public/.htaccess`: Apache production config
- `.github/workflows/deploy-ftp.yml`: CI/CD pipeline

**Core Logic:**
- `src/utils/rehype-prirucka-links.ts`: Internal `.md` link → URL transformation
- `src/utils/get-related-articles.ts`: Cross-collection related content
- `src/utils/validate-prirucka.ts`: Content validation rules
- `src/utils/extract-content-fallback.ts`: H1/perex extraction for prirucka

**Testing:**
- Not detected — no test framework or test files in project

## Naming Conventions

**Files:**
- Astro pages/components: PascalCase — `ArticleHeader.astro`, `BaseLayout.astro`
- Utils/plugins: kebab-case with type prefix — `rehype-prirucka-links.ts`, `remark-gfm` (external)
- Vite plugins: `vite-plugin-{purpose}.ts` at repo root
- Content MD (blog): `{postID}-{slug}.md` — e.g. `100-2016-podelal.md`
- Content MD (podcast): `{slug}.md` with `postID` in front matter
- Content MD (prirucka): `{topic-slug}.md` with `id` field in front matter (URL uses `id`, not filename)
- CSS bundles: numbered layers — `1-base.min.css`, `2-components.min.css`, `3-libraries.min.css`, `4-helpers.min.css`
- Standalone CSS modules: `public/assets/css/modules-standalone/min/{module}.min.css`

**Directories:**
- Content collections match collection name: `src/content/{blog,podcast,prirucka}/`
- Category TOC components: `src/components/categories/CategoryTOC{CategoryName}.astro`
- Page routes mirror URL structure: `src/pages/blog/`, `src/pages/prirucka/`, `src/pages/ebook-amp/`
- Ebook landing pages: `src/pages/{product}/index.astro` + `info.astro`

**Front Matter Fields:**
- Blog/podcast: WordPress-export style — `postTitle`, `postDateTime`, `postStatus`, `category[]`; normalized to `title`, `date`, `tags`, `published` in schema transform
- Příručka: `id`, `heading`, `perex`, `published`, `category[]`; normalized to `title`, `description`, `tags`
- Tags: kebab-case Czech slugs — `rychlost-nacitani`, `responzivni-design`

**URLs:**
- No trailing slash (except root `/`)
- Pagination: `/p=2`, `/p=3` (not `/page/2`)
- Category pagination: `/{category}/p=2`
- Podcast: `/podcast/{postID}-{slug}`
- Příručka: `/prirucka/{id}` (from front matter, not filename)

## Where to Add New Code

**New blog/podcast/prirucka article:**
- Content: `src/content/{blog,podcast,prirucka}/{filename}.md`
- No page changes needed — dynamic routes auto-generate from collection
- Run `npm run check-frontmatter` before commit

**New static page (e.g. landing page):**
- Primary code: `src/pages/{url-path}.astro` or `src/pages/{section}/index.astro`
- Layout: Wrap in `BaseLayout.astro` with `Header`/`Footer` slots
- Follow existing ebook pages: `src/pages/css-layout/index.astro`, `src/pages/ebook-amp/index.astro`

**New topic category:**
- Config: Add entry to `src/data/categories.ts` with `slug`, `title`, `tags[]`, `hasTOC`
- Optional TOC component: `src/components/categories/CategoryTOC{Name}.astro`
- Wire TOC: Add case in `getTOCComponent()` switch in `src/pages/[category].astro`
- Tag articles: Set matching tag in article front matter

**New Astro component:**
- Shared UI: `src/components/{ComponentName}.astro`
- Category-specific: `src/components/categories/`

**New markdown transform:**
- Remark plugin (MD AST): `src/utils/remark-{name}.ts` → register in `astro.config.mjs` `remarkPlugins`
- Rehype plugin (HTML AST): `src/utils/rehype-{name}.ts` → register in `astro.config.mjs` `rehypePlugins`

**New Vite build plugin:**
- File: `vite-plugin-{name}.ts` at repo root
- Register: Add to `astro.config.mjs` → `vite.plugins[]`

**New content validation:**
- Logic: Extend `src/utils/validate-prirucka.ts`
- Enforce: Call from `getStaticPaths` or Vite plugin

**New blog/podcast image:**
- Source: `src/assets/img/content/` or `src/assets/img/blog/`
- Reference in MD: `/assets/img/content/dest/{name}.webp` (generated at build)
- External option: Cloudinary URL directly in markdown

**New prirucka image:**
- Source: `src/content/prirucka/assets/images/`
- Reference in MD: `../dist/images/{path}` (transformed to `/prirucka/images/{path}` at build)

**Maintenance script:**
- Location: `scripts/{purpose}.{js,ts}`
- Register: Add npm script in `package.json` if frequently used

## Special Directories

**`dist/`:**
- Purpose: Astro build output
- Generated: Yes (`npm run build`)
- Committed: No (gitignored)

**`public/prirucka/images/`:**
- Purpose: WebP output from prirucka source images
- Generated: Yes (Vite plugin during dev/build)
- Committed: Typically yes (served in production)

**`public/data/`, `public/files/`:**
- Purpose: Legacy static archives on production server
- Generated: No
- Committed: Yes, but excluded from FTP deploy (`.github/workflows/deploy-ftp.yml`)

**`_import/`, `_working/`:**
- Purpose: Migration staging and working notes
- Generated: No
- Committed: Partially; not part of Astro build

**`.cursor/skills/`:**
- Purpose: Agent instructions for Czech proofreading, article writing, internal link rules
- Generated: No
- Committed: Yes

**`.planning/`:**
- Purpose: GSD workflow artifacts including codebase maps
- Generated: By GSD commands
- Committed: Yes

**`node_modules/`, `.astro/`:**
- Purpose: Dependencies and Astro cache
- Generated: Yes
- Committed: No

## Route Map (Key URLs → Files)

| URL Pattern | Source File |
|-------------|-------------|
| `/` | `src/pages/index.astro` |
| `/p={n}` | `src/pages/[...page].astro` |
| `/blog/{slug}` | `src/pages/blog/[slug].astro` |
| `/blog/p={n}` | `src/pages/blog/[...page].astro` |
| `/podcast/{id}-{slug}` | `src/pages/podcast/[slug].astro` |
| `/prirucka/{id}` | `src/pages/prirucka/[slug].astro` |
| `/{category}` | `src/pages/[category].astro` |
| `/{category}/p={n}` | `src/pages/[category]/[...page].astro` |
| `/rss` | `src/pages/rss.ts` |
| `/css-layout`, `/ebook-amp`, etc. | `src/pages/{product}/index.astro` |
| `/style/{slug}` | `src/pages/style/[slug].astro` |
| `/404` | `src/pages/404.astro` |

---

*Structure analysis: 2026-06-06*
