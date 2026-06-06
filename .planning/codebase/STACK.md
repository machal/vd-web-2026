# Technology Stack

**Analysis Date:** 2026-06-06

## Languages

**Primary:**
- **TypeScript / JavaScript (ES modules)** — Astro pages, components, utilities, Vite plugins, build scripts (`src/`, `vite-plugin-*.ts`, `scripts/`)
- **Markdown** — All site content in Astro content collections (`src/content/blog/`, `src/content/podcast/`, `src/content/prirucka/`)

**Secondary:**
- **SCSS** — Legacy stylesheet sources in `public/assets/scss/`; compiled CSS committed to `public/assets/css/` (no Sass compiler in `package.json`)
- **Python** — One-off maintenance script `scripts/insert-adsnippet-css.py`
- **HTML** — Embedded in Markdown content and legacy archives under `public/data/`

## Runtime

**Environment:**
- **Node.js 20** — Required for dev/build (pinned in `.github/workflows/deploy-ftp.yml` via `actions/setup-node@v4`)
- **Static output only** — `output: 'static'` in `astro.config.mjs`; no server-side runtime in production

**Package Manager:**
- **npm** — Scripts and dependency management via `package.json`
- Lockfile: **present** (`package-lock.json`)

## Frameworks

**Core:**
- **Astro 4.16.19** — Static site generator; routing, content collections, Markdown pipeline (`astro.config.mjs`, `src/pages/`, `src/content/config.ts`)
- **Vite 5.4.x** (bundled with Astro) — Dev server, build bundling, custom Vite plugins in project root

**Testing:**
- Not detected — No Jest, Vitest, Playwright, or Cypress config or test scripts in `package.json`

**Build/Dev:**
- **Sharp 0.33.x** — Image conversion to WebP in Vite plugins (`vite-plugin-prirucka-images.ts`, `vite-plugin-content-images.ts`, `vite-plugin-design-images.ts`)
- **SVGO 3.3.x** — SVG optimization in `vite-plugin-design-images.ts`
- **Chokidar 3.6.x** — File watching for image pipeline plugins
- **tsx 4.7.x** — Run TypeScript scripts (`scripts/convert-prirucka-images.ts`, `scripts/assign-categories.ts`)
- **Remark / Rehype ecosystem** — Markdown AST transforms via custom plugins in `src/utils/` and `remark-gfm`
- **Shiki** (via Astro Markdown config) — Syntax highlighting with `css-variables` theme in `astro.config.mjs`
- **Markdown-it 14.x** — RSS full-content HTML rendering in `src/pages/rss.ts`
- **sanitize-html 2.x** — RSS content sanitization in `src/pages/rss.ts`

## Key Dependencies

**Critical:**
- `astro` (^4.15.0, resolved 4.16.19) — Entire site build and content pipeline
- `@astrojs/rss` (^4.0.15) — RSS feed endpoint at `/rss` (`src/pages/rss.ts`)
- `sharp` (^0.33.0) — Image pipeline for prirucka, blog, and design assets
- `remark-gfm` (^4.0.0) — GitHub Flavored Markdown (tables, strikethrough, etc.)
- `rehype-raw` (^7.0.0, transitive) — Raw HTML passthrough in Markdown pipeline (`astro.config.mjs`)

**Content / UI:**
- `jquery` (^3.7.1) — Legacy client interactions (`public/assets/js/index.js`, bundled in `public/assets/js/vrdl.webpack.js`)
- `@superkoders/modal` (^1.7) — Image gallery modals (`public/assets/js/modal.js`)
- `normalize.css` (^8.0.1) — CSS reset (imported in SCSS stack)
- `remark-frontmatter`, `remark-extract-frontmatter` — Front matter handling in tooling

**Infrastructure:**
- `rollup` (^4.56.0) — Direct dependency; legacy/prebuilt JS bundle (`public/assets/js/vrdl.webpack.js`) was produced with Webpack/Rollup toolchain outside current npm scripts

## Configuration

**Environment:**
- No `.env` files detected in repository
- Runtime flags: `import.meta.env.DEV` in `src/components/ValidationErrors.astro`; `process.env.NODE_ENV` in `src/pages/prirucka/[slug].astro`
- Production secrets stored in **GitHub Actions secrets** (FTP credentials), not in repo

**Build:**
- `astro.config.mjs` — Site URL, static output, Markdown remark/rehype plugins, Vite plugins, SCSS include paths
- `src/content/config.ts` — Zod schemas for `blog`, `podcast`, `prirucka` collections
- `src/env.d.ts` — Astro type references
- `public/.htaccess` — Apache redirects, CORS for fonts, security headers, legacy URL rules
- `public/robots.txt` — Crawler rules and sitemap URL

**Key npm scripts (`package.json`):**
```bash
npm run dev          # astro dev (default http://localhost:4321)
npm run build        # astro build → dist/
npm run preview      # astro preview
npm run convert-images   # tsx scripts/convert-prirucka-images.ts
npm run check-frontmatter / fix-frontmatter  # node scripts/check-frontmatter.js
```

## Platform Requirements

**Development:**
- Node.js 20+
- npm install from `package-lock.json`
- No Docker, no database, no external services required for local dev

**Production:**
- **Static HTML/CSS/JS** deployed to Apache hosting via FTP
- Target path on server: `www/project/` (`.github/workflows/deploy-ftp.yml`)
- Canonical site: `https://www.vzhurudolu.cz` (`astro.config.mjs`)
- `public/data/` and `public/files/` excluded from FTP deploy (must exist on server separately)
- Service worker at `public/sw.js` (AMP SW from `cdn.ampproject.org`)

---

*Stack analysis: 2026-06-06*
