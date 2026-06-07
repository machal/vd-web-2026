# Phase 2: Shared Packages Extraction - Pattern Map

**Mapped:** 2026-06-07
**Files analyzed:** 32 (24 new/moved in `@vd/shared`, 2 app config files, ~40 page import updates, 1 optional verify script)
**Analogs found:** 28 / 32

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|-------------------|------|-----------|----------------|---------------|
| `packages/shared/package.json` | config | transform | Root `package.json` + `apps/vzhurudolu/package.json` | role-match |
| `packages/shared/types/index.ts` | utility | transform | `apps/vzhurudolu/src/data/categories.ts` (interface only) | partial |
| `packages/shared/markdown/create-markdown-config.ts` | utility | transform | `apps/vzhurudolu/astro.config.mjs` markdown block | exact (source to wrap) |
| `packages/shared/markdown/remark-*.ts` (4 files) | utility | transform | Same files in `apps/vzhurudolu/src/utils/` | exact |
| `packages/shared/markdown/rehype-*.ts` (7 files) | utility | transform | Same files in `apps/vzhurudolu/src/utils/` | exact |
| `packages/shared/vite-plugins/vite-plugin-*.ts` (4 files) | utility | file-I/O | Same files at `apps/vzhurudolu/` root | exact |
| `packages/shared/seo/custom-sitemap.ts` | utility | event-driven | `apps/vzhurudolu/src/utils/custom-sitemap.ts` | exact |
| `packages/shared/layouts/BaseLayout.astro` | component | request-response | `apps/vzhurudolu/src/layouts/BaseLayout.astro` | exact |
| `packages/shared/components/Header.astro` | component | request-response | `apps/vzhurudolu/src/components/Header.astro` | exact |
| `packages/shared/components/Navigation.astro` | component | request-response | `apps/vzhurudolu/src/components/Navigation.astro` | exact |
| `packages/shared/components/Footer.astro` | component | request-response | `apps/vzhurudolu/src/components/Footer.astro` | exact |
| `packages/shared/components/ArticleHeader.astro` | component | request-response | `apps/vzhurudolu/src/components/ArticleHeader.astro` | exact |
| `packages/shared/components/ArticleFooter.astro` | component | request-response | `apps/vzhurudolu/src/components/ArticleFooter.astro` | exact |
| `apps/vzhurudolu/package.json` | config | transform | Current file + workspace dep pattern from Phase 1 | exact |
| `apps/vzhurudolu/astro.config.mjs` | config | transform | Current file (import paths change only) | exact |
| `apps/vzhurudolu/src/pages/**/*.astro` (~40) | route | request-response | `apps/vzhurudolu/src/pages/blog/[slug].astro` | exact |
| `scripts/verify-phase2-extraction.sh` (optional) | test | batch | `scripts/verify-phase1-build.sh` | role-match |

## Pattern Assignments

### `packages/shared/package.json` (config, transform)

**Analog:** Root `package.json` (workspaces) + `apps/vzhurudolu/package.json` (scoped name, deps)

**Workspaces pattern** (root `package.json` lines 1-7):

```json
{
  "name": "vd-monorepo",
  "private": true,
  "workspaces": [
    "apps/*",
    "packages/*"
  ],
```

**Scoped package naming** (`apps/vzhurudolu/package.json` lines 1-6):

```json
{
  "name": "@vd/vzhurudolu",
  "description": "Vzhůru dolů",
  "version": "0.7.0",
  "private": true,
  "type": "module",
```

**Target shape for `@vd/shared`** — copy from RESEARCH.md skeleton (no existing package yet; `packages/` is `.gitkeep` only):

```json
{
  "name": "@vd/shared",
  "version": "0.0.0",
  "private": true,
  "type": "module",
  "exports": {
    "./markdown": "./markdown/create-markdown-config.ts",
    "./markdown/*": "./markdown/*",
    "./vite-plugins/*": "./vite-plugins/*",
    "./seo/custom-sitemap": "./seo/custom-sitemap.ts",
    "./layouts/*": "./layouts/*",
    "./components/*": "./components/*",
    "./types": "./types/index.ts"
  },
  "peerDependencies": {
    "astro": "4.16.19",
    "vite": "^5.4.0"
  }
}
```

Move markdown deps (`remark-gfm`, `rehype-raw`, `unist-util-visit`, etc.) from app `devDependencies` into `@vd/shared` `dependencies`; move `sharp`, `chokidar`, `svgo` to `@vd/shared` `devDependencies`.

---

### `packages/shared/types/index.ts` (utility, transform)

**Analog:** `apps/vzhurudolu/src/data/categories.ts` (interface only — data array stays app-local)

**Interface to extract** (lines 1-8):

```typescript
export interface CategoryConfig {
  slug: string;
  title: string;
  description: string;
  hasTOC: boolean;
  tags: string[]; // Tagy pro filtrování článků
}
```

**Usage in shared component** — replace app import in `ArticleFooter.astro`:

```typescript
// Before (app-local):
import type { CategoryConfig } from '../data/categories';

// After (shared):
import type { CategoryConfig } from '@vd/shared/types';
```

App pages continue importing `categories` array from `../../data/categories`; only the type moves to shared.

---

### `packages/shared/markdown/create-markdown-config.ts` (utility, transform — NEW factory)

**Analog:** `apps/vzhurudolu/astro.config.mjs` markdown block (lines 113-150)

**Source config to wrap verbatim** (plugin order is the contract):

```javascript
  markdown: {
    shikiConfig: {
      theme: 'css-variables',
      langAlias: {
        url: 'text',
        terminal: 'text',
        img: 'text',
        htaccess: 'text',
        robotstxt: 'text',
        svg: 'xml',
      },
    },
    remarkPlugins: [
      remarkGfm,
      remarkPriruckaImages,
      remarkNormalizeCodeLang,
      remarkProcessMarkdownAttributes,
    ],
    remarkRehype: {
      allowDangerousHtml: true,
    },
    rehypePlugins: [
      rehypeRaw,
      rehypePriruckaImages,
      rehypeRemoveEbookOnly,
      rehypeConnectedElements,
      rehypeRelatedToInnerBox,
      rehypeHeadingAnchors,
      rehypePriruckaLinks,
      rehypeRemoveFirstH1,
    ],
  },
```

**Factory signature** (from RESEARCH.md — defaults must preserve CS output):

```typescript
export interface MarkdownConfigOptions {
  contentPathPrefix?: string; // default '/prirucka'
  guideImagesPrefix?: string; // default '/prirucka/images'
  collections?: Array<'prirucka' | 'blog' | 'podcast' | 'guide'>;
  includeEbookOnly?: boolean;   // default true
}

export function createMarkdownConfig(opts: MarkdownConfigOptions = {}) {
  const prefix = opts.contentPathPrefix ?? '/prirucka';
  const imagesPrefix = opts.guideImagesPrefix ?? `${prefix}/images`;
  const collections = opts.collections ?? ['prirucka', 'blog', 'podcast'];
  // Return { shikiConfig, remarkPlugins, remarkRehype, rehypePlugins }
  // Parameterize remarkPriruckaImages, rehypePriruckaImages, rehypePriruckaLinks only
}
```

**Intra-pipeline import pattern** (`remark-process-markdown-attributes.ts` lines 1-10):

```typescript
import type { Plugin } from 'unified';
import type { Root } from 'mdast';
import { visit } from 'unist-util-visit';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import { fromHtml } from 'hast-util-from-html';
import { remarkHeadingIds } from './remark-heading-ids.ts';
```

Keep relative `./remark-heading-ids.ts` imports within `packages/shared/markdown/` after move.

---

### `packages/shared/markdown/rehype-prirucka-links.ts` (utility, transform — parameterize)

**Analog:** Current file at `apps/vzhurudolu/src/utils/rehype-prirucka-links.ts`

**Hardcoded values to parameterize** (lines 9-18):

```typescript
const CONTENT_ENTITIES = ['prirucka', 'blog', 'podcast'] as const;
type ContentEntity = (typeof CONTENT_ENTITIES)[number];

function getEntityFromFilePath(filePath: string | undefined): ContentEntity {
  if (!filePath) return 'prirucka';
  const normalized = filePath.replace(/\\/g, '/');
  if (normalized.includes('/content/blog/')) return 'blog';
  if (normalized.includes('/content/podcast/')) return 'podcast';
  if (normalized.includes('/content/prirucka/')) return 'prirucka';
  return 'prirucka';
}
```

**Plugin export pattern** (lines 35-36):

```typescript
export const rehypePriruckaLinks: Plugin<[], Root> = () => {
  return (tree, file: FileLike | undefined) => {
```

Wrap with `createRehypeContentLinks({ collections })` factory; default `collections` produces identical regex matches. Keep export name `rehypePriruckaLinks` per D-10 move-only.

---

### `packages/shared/markdown/remark-prirucka-images.ts` + `rehype-prirucka-images.ts` (utility, transform — parameterize)

**Analog:** Current files in `apps/vzhurudolu/src/utils/`

**Hardcoded `/prirucka/images/` output** (`remark-prirucka-images.ts` lines 18-34):

```typescript
        const simpleMatch = node.url.match(/^\/prirucka\/images\/(.+\.(jpg|jpeg|png))(?:\?.*)?$/i);
        if (simpleMatch) {
          newPath = simpleMatch[1].replace(/\.(jpg|jpeg|png)(\?.*)?$/i, '.webp');
        }
        // ...
        if (newPath) {
          node.url = `/prirucka/images/${newPath}`;
        }
```

Same pattern in `rehype-prirucka-images.ts` lines 19-34 with `node.properties.src`. Replace literal `/prirucka/images` with `imagesPrefix` option defaulting to `/prirucka/images`.

---

### `packages/shared/vite-plugins/vite-plugin-*.ts` (utility, file-I/O — move verbatim)

**Analog:** `apps/vzhurudolu/vite-plugin-validate-frontmatter.ts` (all 4 plugins share this structure)

**Imports + export** (lines 9-11, 123-128):

```typescript
import type { Plugin } from 'vite';
import fs from 'node:fs';
import path from 'node:path';

export function vitePluginValidateFrontmatter(): Plugin {
  return {
    name: 'validate-frontmatter',
    apply: 'build',
    buildStart() {
      const contentDir = path.resolve('src/content');
```

**process.cwd() path resolution** (`vite-plugin-prirucka-images.ts` lines 8-11):

```typescript
const SOURCE_DIR_REL = 'src/content/prirucka/assets/images';
const OUTPUT_DIR_REL = 'public/prirucka/images';
const SOURCE_DIR = join(process.cwd(), SOURCE_DIR_REL);
const OUTPUT_DIR = join(process.cwd(), OUTPUT_DIR_REL);
```

**All four export names** (grep-confirmed): `vitePluginValidateFrontmatter`, `vitePluginPriruckaImages`, `vitePluginContentImages`, `vitePluginDesignImages`. No path rewrites needed — `process.cwd()` resolves to app root during `turbo build --filter=@vd/vzhurudolu`.

---

### `packages/shared/seo/custom-sitemap.ts` (utility, event-driven — factory wrap)

**Analog:** `apps/vzhurudolu/src/utils/custom-sitemap.ts`

**AstroIntegration pattern** (lines 1-14):

```typescript
import type { AstroIntegration } from 'astro';
import { writeFileSync } from 'fs';
import { join } from 'path';

export function customSitemap(): AstroIntegration {
  return {
    name: 'custom-sitemap',
    hooks: {
      'astro:build:done': async ({ dir, pages }) => {
        const site = 'https://www.vzhurudolu.cz';
```

**Secondary analog for integration structure:** `apps/vzhurudolu/src/utils/changed-files-integration.ts` (lines 1-2) — same `AstroIntegration` import, stays app-local.

**Factory target:**

```typescript
export function createCustomSitemap(options: { site: string }): AstroIntegration {
  const { site } = options;
  // Replace hardcoded line 14 with `site` parameter throughout
}
```

---

### `packages/shared/layouts/BaseLayout.astro` (component, request-response — move verbatim)

**Analog:** `apps/vzhurudolu/src/layouts/BaseLayout.astro`

**Props interface pattern** (lines 1-12):

```astro
---
interface Props {
  title: string;
  description: string;
  bodyClass?: string;
  ogType?: 'website' | 'article' | 'book' | 'profile';
  ogUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string | string[];
  canonicalUrl?: string;
}
```

**Slot-based chrome** (lines 106-114) — no changes; CS branding stays hardcoded per D-10:

```astro
    <div class="container">
      <slot name="header" />
      <div class="content-container">
        <slot />
      </div>
      <slot name="footer" />
    </div>
```

---

### `packages/shared/components/Header.astro` + `Navigation.astro` (component, request-response — move together)

**Analog:** `apps/vzhurudolu/src/components/Header.astro`

**Transitive import** (lines 1-3):

```astro
---
import Navigation from './Navigation.astro';
```

Keep relative same-folder import after move to `packages/shared/components/`. Both files move in same commit.

---

### `packages/shared/components/ArticleFooter.astro` (component, request-response — type decoupling)

**Analog:** Current file + `categories.ts` interface

**Props pattern** (lines 7-13):

```astro
interface Props {
  post: CollectionEntry<'blog' | 'podcast' | 'prirucka'>;
  categories: CategoryConfig[];
  relatedArticles?: ArticleEntry[];
}
```

**Keep app-scoped collection types** — `CollectionEntry` from `astro:content` is fine in shared `.astro` (peer dep on astro). Replace only `CategoryConfig` import with `@vd/shared/types`. Hardcoded CS URLs in `articleUrl` (lines 40-44) stay unchanged in Phase 2.

---

### `apps/vzhurudolu/package.json` (config, transform)

**Analog:** Current file

**Add workspace dependency** (alongside existing deps block):

```json
"dependencies": {
  "@vd/shared": "*",
  "@astrojs/rss": "^4.0.15",
```

Remove markdown/image plugin deps from app `devDependencies` only after `createMarkdownConfig` fully owns registration (final wave).

---

### `apps/vzhurudolu/astro.config.mjs` (config, transform)

**Analog:** Current file — swap local imports for `@vd/shared/*`, add `noExternal`

**Current import pattern to replace** (lines 5-23):

```javascript
import { customSitemap } from './src/utils/custom-sitemap';
import { remarkGfm } from './src/utils/remark-process-markdown-attributes.ts';
// ... 10 more local utils + 4 vite plugins
import { vitePluginValidateFrontmatter } from './vite-plugin-validate-frontmatter.ts';
```

**Target wiring** (from RESEARCH.md, validated against current config):

```javascript
import { createMarkdownConfig } from '@vd/shared/markdown';
import { createCustomSitemap } from '@vd/shared/seo/custom-sitemap';
import { vitePluginValidateFrontmatter } from '@vd/shared/vite-plugins/vite-plugin-validate-frontmatter';
// ...

export default defineConfig({
  site: 'https://www.vzhurudolu.cz',
  integrations: [
    createCustomSitemap({ site: 'https://www.vzhurudolu.cz' }),
    changedFilesIntegration(), // stays app-local
  ],
  markdown: createMarkdownConfig({
    contentPathPrefix: '/prirucka',
    collections: ['prirucka', 'blog', 'podcast'],
  }),
  vite: {
    ssr: { noExternal: ['@vd/shared'] },
    plugins: [
      vitePluginValidateFrontmatter(),
      vitePluginPriruckaImages(),
      vitePluginContentImages(),
      vitePluginDesignImages(),
      vitePluginCopyPublicToDist(), // stays inline in app
    ],
  },
});
```

Keep inline `vitePluginCopyPublicToDist()` (lines 72-102) and `changedFilesIntegration()` import unchanged.

---

### `apps/vzhurudolu/src/pages/**/*.astro` (~40 files) (route, request-response)

**Analog:** `apps/vzhurudolu/src/pages/blog/[slug].astro`

**Layout/component imports to update** (lines 4-8):

```astro
import BaseLayout from '../../layouts/BaseLayout.astro';
import Header from '../../components/Header.astro';
import Footer from '../../components/Footer.astro';
import ArticleHeader from '../../components/ArticleHeader.astro';
import ArticleFooter from '../../components/ArticleFooter.astro';
```

**Target imports:**

```astro
import BaseLayout from '@vd/shared/layouts/BaseLayout.astro';
import Header from '@vd/shared/components/Header.astro';
import Footer from '@vd/shared/components/Footer.astro';
import ArticleHeader from '@vd/shared/components/ArticleHeader.astro';
import ArticleFooter from '@vd/shared/components/ArticleFooter.astro';
```

**Keep app-local imports unchanged** (lines 9-11):

```astro
import { categories, type CategoryConfig } from '../../data/categories';
import { getRelatedArticles } from '../../utils/get-related-articles';
import { isPublished } from '../../utils/is-published';
```

Pages without article chrome (e.g. `index.astro`) only update `BaseLayout`/`Header`/`Footer` imports.

---

### `scripts/verify-phase2-extraction.sh` (test, batch — optional new)

**Analog:** `scripts/verify-phase1-build.sh`

**Shell gate structure** (lines 1-8):

```bash
#!/usr/bin/env bash
# Phase 1 end-to-end build gate — verifies Czech app dist output after monorepo move.
set -euo pipefail

DIST_DIR="apps/vzhurudolu/dist"
ASTRO_DIR="${DIST_DIR}/_astro"
```

Extend with stale-path checks: assert old plugin paths absent, `@vd/shared` imports present in `astro.config.mjs`. Reuse existing dist/_astro/sitemap/draft checks from Phase 1 script.

---

## Shared Patterns

### npm Workspaces + `@vd/*` Namespace

**Source:** Root `package.json` + Phase 1 `01-01-SUMMARY.md`
**Apply to:** `packages/shared/package.json`, `apps/vzhurudolu/package.json`

```json
"workspaces": ["apps/*", "packages/*"]
```

App declares `"@vd/shared": "*"`; run `npm install` at root to link.

---

### Source Exports + `vite.ssr.noExternal`

**Source:** `.planning/research/STACK.md` (lines 246-261), Astro monorepo docs
**Apply to:** `packages/shared/package.json`, `apps/vzhurudolu/astro.config.mjs`

```javascript
vite: {
  ssr: { noExternal: ['@vd/shared'] },
}
```

No `tsup`/`tsc` build step; no `turbo.json` change. `@vd/shared` declares its own `remark-gfm`, `rehype-raw`, etc. — do not rely on app `node_modules`.

---

### Vite Plugin Factory Export

**Source:** All 4 `vite-plugin-*.ts` files
**Apply to:** `packages/shared/vite-plugins/*`

```typescript
import type { Plugin } from 'vite';

export function vitePluginXxx(): Plugin {
  return {
    name: 'plugin-name',
    apply: 'build' | undefined,
    buildStart() { /* path.resolve('src/content') or join(process.cwd(), REL) */ },
  };
}
```

---

### Unified Remark/Rehype Plugin Export

**Source:** `rehype-prirucka-links.ts`, `remark-normalize-code-lang.ts`
**Apply to:** All 11 markdown utility files

```typescript
import type { Plugin } from 'unified';
import type { Root } from 'hast'; // or 'mdast' for remark

export const rehypeXxx: Plugin<[], Root> = () => {
  return (tree, file) => { /* visit/transform */ };
};
```

Use `unist-util-visit` where tree walking is needed.

---

### AstroIntegration Hook Pattern

**Source:** `custom-sitemap.ts`, `changed-files-integration.ts`
**Apply to:** `packages/shared/seo/custom-sitemap.ts`

```typescript
import type { AstroIntegration } from 'astro';

export function createCustomSitemap(options: { site: string }): AstroIntegration {
  return {
    name: 'custom-sitemap',
    hooks: {
      'astro:build:done': async ({ dir, pages }) => { /* filter + writeFileSync */ },
    },
  };
}
```

---

### Astro Component Props Interface

**Source:** `BaseLayout.astro`, `Header.astro`, `ArticleFooter.astro`
**Apply to:** All 6 moved `.astro` files

```astro
---
interface Props {
  title: string;
  // ...
}
const { title } = Astro.props;
---
```

No `siteConfig` injection in Phase 2 — hardcoded CS strings preserved.

---

### Dependency Boundary (D-05)

**Source:** CONTEXT D-05, RESEARCH Pitfall 3
**Apply to:** All `@vd/shared` files

- `@vd/shared` NEVER imports from `apps/*`
- Apps import `@vd/shared` only
- Shared types (`CategoryConfig`) live in `packages/shared/types/`; app data (`categories` array) stays in `src/data/categories.ts`
- `is-published.ts`, `get-related-articles.ts` stay app-local

---

### Build Verification Gate

**Source:** `scripts/verify-phase1-build.sh`, `.github/workflows/pr-build.yml`
**Apply to:** Every extraction wave

```bash
npx turbo run build --filter=@vd/vzhurudolu && bash scripts/verify-phase1-build.sh
```

Checks: `dist/_astro/` exists, draft excluded from dist and sitemap, `sitemap.xml` present.

---

## No Analog Found

| File | Role | Data Flow | Reason |
|------|------|-----------|--------|
| `packages/shared/package.json` `exports` map | config | transform | Greenfield — no workspace package exists yet; follow RESEARCH skeleton + npm/Astro monorepo docs |
| `packages/shared/markdown/create-markdown-config.ts` | utility | transform | New factory file — wraps existing `astro.config.mjs` block; no prior factory in codebase |
| `packages/shared/seo/custom-sitemap.ts` factory | utility | event-driven | `createCustomSitemap({ site })` is new wrapper; body copies existing integration |

## Metadata

**Analog search scope:** `apps/vzhurudolu/` (root plugins, `src/utils/`, `src/layouts/`, `src/components/`, `src/pages/`, `astro.config.mjs`), root `package.json`, `turbo.json`, `scripts/`, `.planning/research/STACK.md`, `.planning/phases/01-monorepo-foundation-ci/`
**Files scanned:** ~35 source files + 5 planning docs
**Pattern extraction date:** 2026-06-07
