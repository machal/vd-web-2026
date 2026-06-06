# Phase 1: Monorepo Foundation & CI - Pattern Map

**Mapped:** 2026-06-06
**Files analyzed:** 28 new/modified (excluding bulk moves of `src/`, `public/`, `scripts/`)
**Analogs found:** 22 / 28

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|-------------------|------|-----------|----------------|---------------|
| `package.json` (root) | config | batch | `package.json` (current) + `.planning/research/STACK.md` | role-match |
| `turbo.json` | config | batch | `.planning/research/STACK.md` | no-analog (research) |
| `tsconfig.json` (root) | config | transform | — | no-analog |
| `apps/vzhurudolu/package.json` | config | batch | `package.json` (current root) | exact |
| `apps/vzhurudolu/tsconfig.json` | config | transform | — | no-analog |
| `apps/vzhurudolu/astro.config.mjs` | config | transform | `astro.config.mjs` (move verbatim) | exact |
| `apps/vzhurudolu/vite-plugin-*.ts` (×4) | utility | file-I/O | `vite-plugin-*.ts` (move verbatim) | exact |
| `apps/michalek-dev/package.json` | config | — | — | no-analog |
| `packages/.gitkeep` | config | — | — | no-analog |
| `package-lock.json` | config | batch | `package-lock.json` (regenerate) | exact |
| `.github/workflows/pr-build.yml` | config | request-response | `.github/workflows/deploy-ftp.yml` | role-match |
| `.github/workflows/deploy-ftp.yml` | config | request-response | `.github/workflows/deploy-ftp.yml` | exact |
| `.github/workflows/secret-scan.yml` | config | request-response | (unchanged) | exact |
| `apps/vzhurudolu/src/utils/is-published.ts` | utility | transform | `src/pages/prirucka/[slug].astro` + `src/utils/validate-prirucka.ts` | role-match |
| `apps/vzhurudolu/src/pages/blog/[slug].astro` | route | CRUD | `src/pages/prirucka/[slug].astro` | exact |
| `apps/vzhurudolu/src/pages/podcast/[slug].astro` | route | CRUD | `src/pages/prirucka/[slug].astro` | exact |
| `apps/vzhurudolu/src/pages/rss.ts` | route | transform | `src/pages/rss.ts` + prirucka filter pattern | exact |
| `apps/vzhurudolu/src/utils/get-related-articles.ts` | utility | transform | `src/utils/get-related-articles.ts` | exact |
| `apps/vzhurudolu/src/pages/index.astro` | route | CRUD | `src/pages/prirucka/index.astro` | role-match |
| `apps/vzhurudolu/src/pages/[...page].astro` | route | CRUD | `src/pages/prirucka/[...page].astro` | role-match |
| `apps/vzhurudolu/src/pages/[category].astro` | route | CRUD | `src/pages/prirucka/index.astro` | role-match |
| `apps/vzhurudolu/src/pages/[category]/[...page].astro` | route | CRUD | `src/pages/[category].astro` | exact |
| `apps/vzhurudolu/src/pages/blog/index.astro` | route | CRUD | `src/pages/prirucka/index.astro` | role-match |
| `apps/vzhurudolu/src/pages/blog/[...page].astro` | route | CRUD | `src/pages/blog/index.astro` | exact |
| `apps/vzhurudolu/src/pages/podcast/index.astro` | route | CRUD | `src/pages/prirucka/index.astro` | role-match |
| `apps/vzhurudolu/src/pages/podcast/[...page].astro` | route | CRUD | `src/pages/podcast/index.astro` | exact |
| Bulk move: `src/`, `public/`, `scripts/` | — | file-I/O | Same paths at repo root | exact |

---

## Pattern Assignments

### `package.json` (root) — workspace orchestrator (config, batch)

**Analog:** Current `package.json` (split source) + `.planning/research/STACK.md` (target shape)

**Current scripts to replace** (lines 7-15):

```7:15:package.json
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "astro": "astro",
    "convert-images": "tsx scripts/convert-prirucka-images.ts",
    "fill-heading": "node scripts/fill-heading-from-h1.js",
    "check-frontmatter": "node scripts/check-frontmatter.js --check",
    "fix-frontmatter": "node scripts/check-frontmatter.js --fix"
  },
```

**Target orchestrator pattern** (from STACK.md — move app scripts to `apps/vzhurudolu`, keep turbo at root):

```json
{
  "name": "vd-monorepo",
  "private": true,
  "workspaces": ["apps/*", "packages/*"],
  "scripts": {
    "build": "turbo run build",
    "dev": "turbo run dev",
    "build:vzhurudolu": "turbo run build --filter=@vd/vzhurudolu",
    "dev:vzhurudolu": "turbo run dev --filter=@vd/vzhurudolu"
  },
  "devDependencies": {
    "turbo": "^2.9.16",
    "typescript": "^5.9.3"
  },
  "engines": { "node": ">=22" }
}
```

**Critical rule:** Do NOT keep `astro`, `@astrojs/*`, `sharp`, or runtime deps at root (D-03, D-07, D-08). Move all current `dependencies` and `devDependencies` except `turbo`/`typescript` to app package.

---

### `apps/vzhurudolu/package.json` — app package (config, batch)

**Analog:** Current root `package.json`

**Imports / metadata pattern** (lines 1-6, 37-44):

```1:6:package.json
{
  "name": "vzhuru-dolu",
  "description": "Vzhůru dolů",
  "version": "0.7.0",
  "private": true,
  "type": "module",
```

**Scripts pattern — keep astro + maintenance scripts** (lines 7-15):

```7:15:package.json
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "astro": "astro",
    "convert-images": "tsx scripts/convert-prirucka-images.ts",
    "fill-heading": "node scripts/fill-heading-from-h1.js",
    "check-frontmatter": "node scripts/check-frontmatter.js --check",
    "fix-frontmatter": "node scripts/check-frontmatter.js --fix"
  },
```

**Dependencies — move verbatim, pin astro exactly** (lines 17-35):

```17:35:package.json
  "dependencies": {
    "@astrojs/rss": "^4.0.15",
    "@superkoders/modal": "^1.7",
    "jquery": "^3.7.1",
    "markdown-it": "^14.1.0",
    "normalize.css": "^8.0.1",
    "remark-extract-frontmatter": "^3.2.0",
    "remark-frontmatter": "^5.0.0",
    "rollup": "^4.56.0",
    "sanitize-html": "^2.17.0"
  },
  "devDependencies": {
    "@astrojs/sitemap": "^3.4.0",
    "astro": "^4.15.0",
    "chokidar": "^3.6.0",
    "remark-gfm": "^4.0.0",
    "sharp": "^0.33.0",
    "svgo": "^3.3.2",
    "tsx": "^4.7.0"
  },
```

**Change on move:** `"name": "@vd/vzhurudolu"`, `"astro": "4.16.19"` (exact pin, D-06). Add missing deps used in `astro.config.mjs` if not in package.json (`rehype-raw` — verify during move).

---

### `turbo.json` — Turborepo task graph (config, batch)

**Analog:** `.planning/research/STACK.md` (no existing file in repo)

**Core pattern** (STACK.md lines 93-106):

```json
{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    }
  }
}
```

**Note:** Use `tasks` key (Turbo 2.x), not legacy `pipeline`. Phase 1 has no package builds — `^build` is forward-compatible for Phase 2.

---

### `apps/vzhurudolu/astro.config.mjs` — Astro config (config, transform)

**Analog:** Current `astro.config.mjs` (move verbatim to app root)

**Import block pattern** (lines 1-23):

```1:23:astro.config.mjs
import { defineConfig } from 'astro/config';
import fs from 'node:fs';
import path from 'node:path';
// import sitemap from '@astrojs/sitemap'; // Vypnuto - bug s undefined.reduce()
import { customSitemap } from './src/utils/custom-sitemap';
import { changedFilesIntegration } from './src/utils/changed-files-integration';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import { remarkHeadingIds } from './src/utils/remark-heading-ids.ts';
import { remarkProcessMarkdownAttributes } from './src/utils/remark-process-markdown-attributes.ts';
import { remarkPriruckaImages } from './src/utils/remark-prirucka-images.ts';
import { remarkNormalizeCodeLang } from './src/utils/remark-normalize-code-lang.ts';
import { rehypeRemoveFirstH1 } from './src/utils/rehype-remove-first-h1.ts';
import { rehypeRemoveEbookOnly } from './src/utils/rehype-remove-ebook-only.ts';
import { rehypeHeadingAnchors } from './src/utils/rehype-heading-anchors.ts';
import { rehypePriruckaLinks } from './src/utils/rehype-prirucka-links.ts';
import { rehypePriruckaImages } from './src/utils/rehype-prirucka-images.ts';
import { rehypeConnectedElements } from './src/utils/rehype-connected-elements.ts';
import { rehypeRelatedToInnerBox } from './src/utils/rehype-related-to-inner-box.ts';
import { vitePluginPriruckaImages } from './vite-plugin-prirucka-images.ts';
import { vitePluginContentImages } from './vite-plugin-content-images.ts';
import { vitePluginDesignImages } from './vite-plugin-design-images.ts';
import { vitePluginValidateFrontmatter } from './vite-plugin-validate-frontmatter.ts';
```

**cwd rule:** All relative imports (`./src/...`, `./vite-plugin-...`) assume cwd = `apps/vzhurudolu`. Turbo runs `astro build` in package directory — do not change paths, only location.

---

### `apps/vzhurudolu/vite-plugin-*.ts` — Vite plugins (utility, file-I/O)

**Analog:** Current `vite-plugin-prirucka-images.ts`, `vite-plugin-content-images.ts`, etc.

**cwd resolution pattern** (vite-plugin-prirucka-images.ts lines 10-11):

```10:11:vite-plugin-prirucka-images.ts
const SOURCE_DIR = join(process.cwd(), SOURCE_DIR_REL);
const OUTPUT_DIR = join(process.cwd(), OUTPUT_DIR_REL);
```

**Frontmatter validation cwd** (vite-plugin-validate-frontmatter.ts line 150):

```150:150:vite-plugin-validate-frontmatter.ts
        const relativeFiles = filesWithoutFrontMatter.map(f => path.relative(process.cwd(), f));
```

**Move rule:** Copy all four plugins unchanged. Build MUST run via `turbo run build --filter=@vd/vzhurudolu` so `process.cwd()` resolves to `apps/vzhurudolu`.

---

### `.github/workflows/pr-build.yml` — PR CI (config, request-response)

**Analog:** `.github/workflows/deploy-ftp.yml` + `.github/workflows/secret-scan.yml`

**Workflow skeleton from deploy-ftp.yml** (lines 1-21):

```1:21:.github/workflows/deploy-ftp.yml
name: Deploy na FTP

on:
  push:
    branches: [master, main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install & build
        run: |
          npm ci
          npm run build
```

**Trigger pattern from secret-scan.yml** (lines 4-8):

```4:8:.github/workflows/secret-scan.yml
on:
  push:
    branches: [master, main]
  pull_request:
    branches: [master, main]
```

**PR build target pattern:**

```yaml
name: PR Build
on:
  pull_request:
    branches: [master, main]
jobs:
  build-vzhurudolu:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '22'
          cache: 'npm'
      - run: npm ci
      - run: npx turbo run build --filter=@vd/vzhurudolu
      # Optional VD-02 smoke (RESEARCH.md):
      - run: test ! -e apps/vzhurudolu/dist/blog/115-google-speed-https/index.html
      - run: '! grep -q 115-google-speed-https apps/vzhurudolu/dist/sitemap.xml'
```

---

### `.github/workflows/deploy-ftp.yml` — FTP deploy update (config, request-response)

**Analog:** Current `.github/workflows/deploy-ftp.yml`

**FTP deploy step pattern** (lines 23-37):

```23:37:.github/workflows/deploy-ftp.yml
      - name: Deploy to FTP
        uses: SamKirkland/FTP-Deploy-Action@v4.3.6
        with:
          server: ${{ secrets.FTP_SERVER }}
          username: ${{ secrets.FTP_USERNAME }}
          password: ${{ secrets.FTP_PASSWORD }}
          local-dir: ./dist/
          server-dir: www/project/
          timeout: 60000
          exclude: |
            **/.git*
            **/.git*/**
            **/node_modules/**
            **/data/**
            **/files/**
```

**Changes for monorepo:** `node-version: '22'`, build step → `npx turbo run build --filter=@vd/vzhurudolu`, `local-dir: ./apps/vzhurudolu/dist/`. Keep exclude list unchanged.

**Post-build verify** (from `.cursor/rules/astro-build.md`):

```bash
ls -la apps/vzhurudolu/dist/_astro/
```

---

### `apps/vzhurudolu/src/utils/is-published.ts` — publish helper (utility, transform)

**Analog:** `src/pages/prirucka/[slug].astro` filter + `src/utils/validate-prirucka.ts` module style

**Prirucka filter logic to centralize** (prirucka/[slug].astro lines 21-24):

```21:24:src/pages/prirucka/[slug].astro
    const prirucka = await getCollection('prirucka', (entry): entry is CollectionEntry<'prirucka'> & { data: { id: string } } => {
      // Pouze soubory s povinnými poli (id) a publikované
      // Soubory bez front matter nemají 'id', takže budou vyfiltrovány
      return !!entry.data.id && entry.data.published === true;
```

**Schema source — published transform** (config.ts lines 57-58, 118):

```57:58:src/content/config.ts
      published: data.published !== false && data.postStatus !== 'Draft',
    };
```

```118:118:src/content/config.ts
      published: data.published !== false && data.postStatus !== 'Draft',
```

**Utility module pattern** (validate-prirucka.ts lines 1-12):

```1:12:src/utils/validate-prirucka.ts
/**
 * Centralizované validace pro prirucka kolekci
 * 
 * Tento modul obsahuje všechny validace pro příručku:
 * - Validace duplicitních ID (pouze pro published soubory)
 * - Validace frontmatter
 * 
 * Validace vylučují soubory s published: false, protože tyto soubory
 * jsou součástí ebooků a duplicita ID je očekávaná a v pořádku.
 */

import type { CollectionEntry } from 'astro:content';
```

**Target helper:**

```typescript
import type { CollectionEntry } from 'astro:content';

type PublishableCollection = 'blog' | 'podcast' | 'prirucka';

export function isPublished(
  entry: CollectionEntry<PublishableCollection>
): boolean {
  if (entry.collection === 'prirucka') {
    return !!entry.data.id && entry.data.published === true;
  }
  return entry.data.published === true;
}
```

Use strict `=== true` everywhere (D-13), not `!== false`.

---

### `apps/vzhurudolu/src/pages/blog/[slug].astro` — fix getStaticPaths (route, CRUD)

**Analog:** `src/pages/prirucka/[slug].astro`

**Current broken pattern** (blog/[slug].astro lines 12-17):

```12:17:src/pages/blog/[slug].astro
export async function getStaticPaths() {
  const blogPosts = await getCollection('blog');
  return blogPosts.map((post) => ({
    params: { slug: post.slug },
    props: { post },
  }));
}
```

**Correct pattern from prirucka** (prirucka/[slug].astro lines 17-25):

```17:25:src/pages/prirucka/[slug].astro
export async function getStaticPaths() {
  try {
    // Načíst všechny soubory z kolekce s filtrem, který zachytí pouze validní soubory s front matter
    // Soubory bez front matter budou automaticky vyfiltrovány, protože nemají povinné pole 'id'
    const prirucka = await getCollection('prirucka', (entry): entry is CollectionEntry<'prirucka'> & { data: { id: string } } => {
      // Pouze soubory s povinnými poli (id) a publikované
      // Soubory bez front matter nemají 'id', takže budou vyfiltrovány
      return !!entry.data.id && entry.data.published === true;
    });
```

**Target for blog:**

```typescript
import { isPublished } from '../../utils/is-published';

export async function getStaticPaths() {
  const blogPosts = await getCollection('blog', isPublished);
  return blogPosts.map((post) => ({
    params: { slug: post.slug },
    props: { post },
  }));
}
```

---

### `apps/vzhurudolu/src/pages/podcast/[slug].astro` — fix getStaticPaths (route, CRUD)

**Analog:** Same as blog — `src/pages/prirucka/[slug].astro`

**Current broken pattern** (podcast/[slug].astro lines 11-16):

```11:16:src/pages/podcast/[slug].astro
export async function getStaticPaths() {
  const podcasts = await getCollection('podcast');
  return podcasts.map((podcast) => ({
    params: { slug: `${podcast.data.postID}-${podcast.slug}` },
    props: { podcast },
  }));
}
```

**Target:** `getCollection('podcast', isPublished)` — keep existing slug param format.

---

### Listing pages — align `published === true` (route, CRUD)

**Analog:** `src/pages/prirucka/index.astro` (canonical strict filter)

**Correct getCollection filter** (prirucka/index.astro lines 10-12):

```10:12:src/pages/prirucka/index.astro
const priruckaPosts = await getCollection('prirucka', (entry): entry is CollectionEntry<'prirucka'> & { data: { id: string } } => {
  return !!entry.data.id && entry.data.published === true;
});
```

**Files to align** (replace `published !== false` with `isPublished` or `published === true`):

| File | Current filter | Fix |
|------|----------------|-----|
| `blog/index.astro` L10 | `published !== false` | `getCollection('blog', isPublished)` |
| `blog/[...page].astro` L11 | `published !== false` | same |
| `podcast/index.astro` L9 | `published !== false` | `getCollection('podcast', isPublished)` |
| `podcast/[...page].astro` L10 | `published !== false` | same |
| `index.astro` L27 | `published !== false` | `published === true` |
| `[...page].astro` L26 | `published !== false` | `published === true` |
| `[category].astro` L49 | `published === false` check | `!isPublished(post)` or `published === true` |
| `[category]/[...page].astro` L50 | same | same |

---

### `apps/vzhurudolu/src/pages/rss.ts` — RSS filter (route, transform)

**Analog:** Current `src/pages/rss.ts` + prirucka strict filter

**Current mixed filter** (rss.ts lines 46-51):

```46:51:src/pages/rss.ts
      // Filtrování podle published statusu
      if (post.collection === 'prirucka') {
        return post.data.published === true;
      } else {
        return post.data.published !== false;
      }
```

**Target:** Replace else branch with `post.data.published === true` for all collections. Optionally use `getCollection(..., isPublished)` at load time instead of post-hoc filter.

---

### `apps/vzhurudolu/src/utils/get-related-articles.ts` — related articles (utility, transform)

**Analog:** Current file — prirucka already filtered, blog/podcast not

**Partial filter pattern** (lines 35-38):

```35:38:src/utils/get-related-articles.ts
  const [prirucka, blog, podcast] = await Promise.all([
    getCollection('prirucka', (e) => e.data.published === true),
    getCollection('blog'),
    getCollection('podcast'),
  ]);
```

**Target:** Import `isPublished`; use for all three collections:

```typescript
getCollection('blog', isPublished),
getCollection('podcast', isPublished),
getCollection('prirucka', isPublished),
```

---

### `apps/vzhurudolu/src/utils/custom-sitemap.ts` — sitemap (utility, transform)

**Analog:** Current `src/utils/custom-sitemap.ts` (no code change required if getStaticPaths fixed)

**Indirect exclusion pattern** (lines 13-23):

```13:23:src/utils/custom-sitemap.ts
      'astro:build:done': async ({ dir, pages }) => {
        const site = 'https://www.vzhurudolu.cz';
        
        // Filtrovat stránky, které nemají být v sitemap
        const filteredPages = pages.filter((page) => {
          const path = page.pathname;
          // Vyřadit style guide a 404 stránku
          if (path.includes('style/')) return false;
          if (path.includes('404')) return false;
          return true;
        });
```

D-16: Fixing `getStaticPaths` removes draft URLs from `pages` automatically. No sitemap code change unless verification fails.

---

### `apps/michalek-dev/package.json` — placeholder (config, —)

**Analog:** None in codebase

**Minimal scaffold:**

```json
{
  "name": "@vd/michalek-dev",
  "private": true,
  "version": "0.0.0"
}
```

No `build` or `dev` script (D-12). Phase 5 adds real app.

---

## Shared Patterns

### Published-entry filtering (VD-02)

**Source:** `src/pages/prirucka/[slug].astro` + `src/content/config.ts`
**Apply to:** All `getStaticPaths`, listings, RSS, `get-related-articles.ts`

```typescript
// Strict check — never use !== false for blog/podcast after Phase 1
return entry.data.published === true;

// Prirucka additionally requires id
return !!entry.data.id && entry.data.published === true;
```

Schema already sets `published: false` for `postStatus: Draft` — route filters must trust `published === true`.

---

### GitHub Actions CI

**Source:** `.github/workflows/deploy-ftp.yml`
**Apply to:** `pr-build.yml`, updated `deploy-ftp.yml`

```yaml
- uses: actions/checkout@v4
- uses: actions/setup-node@v4
  with:
    node-version: '22'
    cache: 'npm'
- run: npm ci
- run: npx turbo run build --filter=@vd/vzhurudolu
```

Never `npm run build` from root without turbo filter after migration.

---

### npm workspaces dependency placement (MONO-04)

**Source:** Current root `package.json` (split pattern)
**Apply to:** Root vs `apps/vzhurudolu/package.json`

- Root: `turbo`, `typescript` only
- App: `astro`, `@astrojs/*`, `sharp`, all markdown/vite deps
- After scaffold: `npm install` at root to regenerate `package-lock.json` with workspace links

---

### Astro build output verification

**Source:** `.cursor/rules/astro-build.md`
**Apply to:** Local builds, FTP deploy workflow

```bash
ls -la apps/vzhurudolu/dist/_astro/
test ! -e apps/vzhurudolu/dist/blog/115-google-speed-https/index.html
```

---

### Vite plugin cwd contract

**Source:** `vite-plugin-prirucka-images.ts`, `vite-plugin-content-images.ts`
**Apply to:** All moved plugins; turbo build invocation

Turbo executes package scripts with cwd = package root. Never run `astro build` from monorepo root without `--cwd apps/vzhurudolu`.

---

## No Analog Found

| File | Role | Data Flow | Reason |
|------|------|-----------|--------|
| `turbo.json` | config | batch | No Turborepo in repo yet — use `.planning/research/STACK.md` template |
| `tsconfig.json` (root) | config | transform | No tsconfig exists; use Astro strict base per RESEARCH.md open question |
| `apps/vzhurudolu/tsconfig.json` | config | transform | No tsconfig exists; standard `extends: "astro/tsconfigs/strict"` |
| `apps/michalek-dev/package.json` | config | — | First placeholder app; no second app in codebase |
| `packages/.gitkeep` | config | — | Trivial scaffold |

---

## Metadata

**Analog search scope:** `/` (root config), `.github/workflows/`, `src/pages/`, `src/utils/`, `src/content/`, `vite-plugin-*.ts`, `astro.config.mjs`, `.planning/research/STACK.md`, `.cursor/rules/astro-build.md`

**Files scanned:** ~35 source + config files

**Pattern extraction date:** 2026-06-06
