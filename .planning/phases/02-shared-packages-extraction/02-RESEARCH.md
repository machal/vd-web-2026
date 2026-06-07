# Phase 2: Shared Packages Extraction - Research

**Researched:** 2026-06-07
**Domain:** npm workspaces monorepo, Astro 4 SSG, shared package extraction (move-only)
**Confidence:** HIGH

## Summary

Phase 2 extracts shared build infrastructure from `apps/vzhurudolu` into a single workspace package `@vd/shared` at `packages/shared/`. The brownfield app already centralizes markdown transforms in `src/utils/remark-*.ts` / `rehype-*.ts`, four root-level Vite plugins, one custom sitemap integration, and five layout/chrome components consumed by ~40 page routes. Phase 1 established npm workspaces, Turborepo, and PR CI with `verify-phase1-build.sh`; `packages/` exists as `.gitkeep` only.

The lowest-risk implementation path is: scaffold `@vd/shared` with source exports and an `exports` map → move Vite plugins (self-contained, `process.cwd()`-relative) → move markdown plugins plus a thin `createMarkdownConfig()` factory that defaults to current `/prirucka` behavior → move `custom-sitemap.ts` with a `site` parameter defaulting to the Czech origin → move layout components including the transitive `Navigation.astro` dependency of `Header.astro` → update `astro.config.mjs` and ~40 page imports → gate with existing `turbo build --filter=@vd/vzhurudolu` + build verification script.

Critical dependency findings: (1) `Header.astro` imports `Navigation.astro` — both must move together; (2) `ArticleFooter.astro` imports `CategoryConfig` type from `src/data/categories.ts` — shared package cannot import from apps (D-05), so a minimal shared interface or inlined props type is required; (3) `remark-process-markdown-attributes.ts` imports `remark-heading-ids.ts` and five unified/remark packages — all must land in `@vd/shared` with declared dependencies; (4) Vite plugins resolve paths via `process.cwd()`, which correctly resolves to the **app root** when plugins run inside `apps/vzhurudolu` — no path rewrite needed for Phase 2.

**Primary recommendation:** Create `@vd/shared` with source exports, `vite.ssr.noExternal: ['@vd/shared']`, move files verbatim with factory wrappers only where D-06/D-07 require parameterization (`createMarkdownConfig`, `createCustomSitemap`), and gate every wave with the existing PR build + dist verification script — no refactors, no visual parity diff (Phase 3).

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

#### Package Structure
- **D-01:** Single package `@vd/shared` at `packages/shared/` — not multiple packages (`@vd/markdown`, `@vd/ui`, etc.) in Phase 2. Internal folder structure with `exports` map subpaths (`markdown/`, `vite-plugins/`, `seo/`, `components/`).
- **D-02:** Rationale: only `@vd/vzhurudolu` builds today; multiple packages add turbo/import complexity without benefit until EN app exists. Splitting into granular packages deferred to Phase 5+ if build graph requires it.

#### Extraction Scope
- **D-03:** Extract in Phase 2 (move-only):
  - 4× Vite plugins (`vite-plugin-*.ts`)
  - Markdown/remark/rehype utilities (~12 files in `src/utils/`)
  - SEO helpers (`custom-sitemap.ts` and related)
  - Shared layouts/components: `BaseLayout`, `Header`, `Footer`, `ArticleHeader`, `ArticleFooter`
- **D-04:** Keep in app: all content (`src/content/`), pages/routes (`src/pages/`), app-specific data (`categories.ts`), podcast/kurzy-specific logic.
- **D-05:** Dependency rule: `@vd/shared` never imports from `apps/*`. Apps import `@vd/shared` only.

#### Path Parameterization
- **D-06:** Introduce factory pattern now: `createMarkdownConfig({ contentPathPrefix: '/prirucka' })` (or equivalent). Czech app passes `/prirucka`; EN app (Phase 5) will pass `/guide`. No behavior change for CS in Phase 2 — parameter defaults to current paths.
- **D-07:** Parameterize link resolution in markdown pipeline (e.g. `rehype-prirucka-links.ts`) — do not leave hardcoded CS-only paths that require a second migration in Phase 5.

#### Build Strategy
- **D-08:** Source exports — no `tsup`/`tsc` compile step for `@vd/shared` in Phase 2. Astro/Vite consumes TS/Astro source directly.
- **D-09:** Each app adds `vite.ssr.noExternal: ['@vd/shared']` in `astro.config.mjs` per Astro monorepo workspace guidance.

#### Migration Discipline
- **D-10:** Strict move-only — file moves + import path updates, zero behavior changes. No refactors, cleanups, or feature tweaks "while we're here."
- **D-11:** Visual/URL parity verification is Phase 3 (VD-01); Phase 2 must not break the build but full parity diff is out of scope.

#### Carried Forward from Phase 1
- **D-12:** `@vd/*` namespace, npm workspaces (not pnpm), Astro **4.16.19** pinned in app `package.json`.
- **D-13:** Content stays app-local — never in `packages/shared`.

### Claude's Discretion
- Exact `exports` map structure in `packages/shared/package.json`
- Order of extraction plans (plugins first vs markdown first)
- Whether `is-published.ts` and `get-related-articles.ts` move to shared or stay app-local (app-specific filtering logic)
- `siteConfig` injection pattern for layouts (prop shape, config file location)

### Deferred Ideas (OUT OF SCOPE)
- **Granular packages** (`@vd/markdown`, `@vd/vite-plugins`, `@vd/ui`) — split from `@vd/shared` only if needed in Phase 5+
- **Content pairing / hreflang / LanguageSwitch** — Phase 6 (I18N)
- **EN app scaffold and routes** — Phase 5
- **Shared static assets** (`packages/shared/static`) — defer until EN app needs shared CSS/fonts
- **Output parity verification** — Phase 3 (VD-01)
- **Dual-app PR CI** — Phase 5 (MONO-05)
- **tsup/tsc compile for shared package** — defer; source exports sufficient for Astro 4
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| MONO-03 | Shared markdown pipeline, Vite plugins, layouts, and SEO helpers live in packages — no duplicated plugin code | File inventory below; `@vd/shared` structure with exports map; `createMarkdownConfig()` factory; 22 source files + 1 factory; app imports switch to `@vd/shared/*`; only one app today — EN consumption deferred to Phase 5 |
</phase_requirements>

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Markdown remark/rehype pipeline | **Build (Vite/Astro config)** | `@vd/shared/markdown` | Plugins registered in `astro.config.mjs`; run at content render time during SSG |
| Vite image/frontmatter plugins | **Build (Vite)** | `@vd/shared/vite-plugins` | Hook into dev/build; filesystem paths relative to app `process.cwd()` |
| Custom sitemap generation | **Build (Astro integration)** | `@vd/shared/seo` | `astro:build:done` hook writes `dist/sitemap.xml`; `site` URL injected per app |
| BaseLayout / Header / Footer chrome | **Presentation (Astro components)** | App pages pass slots/props | Static HTML shell; consumed by ~40 page routes |
| Content collections & schemas | **App-local** | — | Stays in `apps/vzhurudolu/src/content/` per D-04/D-13 |
| Category taxonomy & related articles | **App-local** | — | CS-specific `categories.ts`, podcast collection — not shared in Phase 2 |
| PR/build verification | **CI (GitHub Actions)** | Shell gate script | Existing `pr-build.yml` + `verify-phase1-build.sh` |

## Extraction Inventory (Codebase Scout)

### Files to extract — Vite plugins (4)

| Source path | Dependencies | Notes |
|-------------|--------------|-------|
| `apps/vzhurudolu/vite-plugin-validate-frontmatter.ts` | `vite`, `node:fs`, `node:path` | Resolves `src/content` via `path.resolve('src/content')` — app cwd |
| `apps/vzhurudolu/vite-plugin-prirucka-images.ts` | `vite`, `chokidar`, `sharp`, `fs/promises`, `path` | `SOURCE_DIR` / `OUTPUT_DIR` via `process.cwd()` |
| `apps/vzhurudolu/vite-plugin-content-images.ts` | same + `fs/promises` read/write | Multiple `SOURCE_DIRS_REL` under app tree |
| `apps/vzhurudolu/vite-plugin-design-images.ts` | same + dynamic `svgo` import | SVG + raster design assets |

**Not in extraction scope:** `vitePluginCopyPublicToDist()` — inline function in `astro.config.mjs` (lines 72–102); stays app-local.

### Files to extract — Markdown pipeline (12)

| Source path | Intra-pipeline deps | Hardcoded `/prirucka`? |
|-------------|---------------------|------------------------|
| `remark-process-markdown-attributes.ts` | `./remark-heading-ids.ts`, `unified`, `remark-parse`, `remark-gfm`, `remark-rehype`, `rehype-stringify`, `hast-util-from-html`, `unist-util-visit` | No |
| `remark-heading-ids.ts` | — | No (disabled in config but imported by remark-process) |
| `remark-prirucka-images.ts` | — | **Yes** — `/prirucka/images/` output paths |
| `remark-normalize-code-lang.ts` | `unist-util-visit` | No |
| `rehype-raw` | — (registered in config, not a local file) | — |
| `rehype-prirucka-images.ts` | — | **Yes** |
| `rehype-prirucka-links.ts` | — | **Yes** — entity names `prirucka/blog/podcast`; needs factory (D-07) |
| `rehype-connected-elements.ts` | `unist-util-visit` | Comments reference `/prirucka/images/` |
| `rehype-related-to-inner-box.ts` | `unist-util-visit` | No |
| `rehype-remove-ebook-only.ts` | `unist-util-visit` | No |
| `rehype-remove-first-h1.ts` | — | No |
| `rehype-heading-anchors.ts` | `hast-util-to-text` | No |

**New file (factory, not move):** `packages/shared/markdown/create-markdown-config.ts` — wraps plugin arrays + shikiConfig; defaults preserve current CS behavior.

### Files to extract — SEO (1)

| Source path | Hardcoded values | Factory needed |
|-------------|------------------|----------------|
| `apps/vzhurudolu/src/utils/custom-sitemap.ts` | `site = 'https://www.vzhurudolu.cz'` (line 14) | `createCustomSitemap({ site })` — CS app passes same URL; zero behavior change |

**Not in extraction scope:** `changed-files-integration.ts` — FTP incremental deploy manifest; app-specific, stays in `apps/vzhurudolu`.

### Files to extract — Layouts & components (6, not 5)

| Source path | Import dependencies | Action |
|-------------|---------------------|--------|
| `src/layouts/BaseLayout.astro` | None (props only) | Move to `packages/shared/layouts/` or `components/` per exports map |
| `src/components/Header.astro` | `./Navigation.astro` | Move **with** Navigation |
| `src/components/Navigation.astro` | None (CS route detection) | **Required transitive move** — not listed in D-03 but blocks Header extraction |
| `src/components/Footer.astro` | None | Move |
| `src/components/ArticleHeader.astro` | None | Move |
| `src/components/ArticleFooter.astro` | `CategoryConfig` type from `../data/categories` | Move; replace type import with minimal shared interface (D-05) |

**Page import fan-out:** ~40 files under `apps/vzhurudolu/src/pages/` import `BaseLayout`, `Header`, `Footer`; article pages also import `ArticleHeader` / `ArticleFooter`.

### Files explicitly staying in app

| Path | Reason |
|------|--------|
| `src/content/**` | D-04, D-13 |
| `src/pages/**` | D-04 |
| `src/data/categories.ts` | App-specific CS taxonomy |
| `src/utils/is-published.ts` | **Recommendation:** stay — `astro:content` collection types are app-scoped |
| `src/utils/get-related-articles.ts` | **Recommendation:** stay — aggregates CS blog/podcast/prirucka |
| `src/utils/validate-prirucka.ts` | Prirucka-specific validation |
| `src/utils/extract-content-fallback.ts` | Prirucka enrichment |
| `src/utils/changed-files-integration.ts` | FTP deploy tooling |
| `src/components/ValidationErrors.astro` | App-specific dev overlay |
| `astro.config.mjs` inline `vitePluginCopyPublicToDist` | App-specific public copy |

### Import dependency graph (extracted modules)

```text
astro.config.mjs
├── createMarkdownConfig()          ← @vd/shared/markdown
│   ├── remarkGfm                   ← declared in @vd/shared deps
│   ├── remarkPriruckaImages        ← parameterized guide prefix
│   ├── remarkNormalizeCodeLang
│   ├── remarkProcessMarkdownAttributes
│   │   └── remarkHeadingIds
│   ├── rehypeRaw
│   ├── rehypePriruckaImages        ← parameterized
│   ├── rehypeRemoveEbookOnly
│   ├── rehypeConnectedElements
│   ├── rehypeRelatedToInnerBox
│   ├── rehypeHeadingAnchors
│   ├── rehypePriruckaLinks         ← parameterized route map
│   └── rehypeRemoveFirstH1
├── createCustomSitemap()           ← @vd/shared/seo
├── changedFilesIntegration()       ← stays app-local
└── vite.plugins[]
    ├── vitePluginValidateFrontmatter
    ├── vitePluginPriruckaImages
    ├── vitePluginContentImages
    ├── vitePluginDesignImages
    └── vitePluginCopyPublicToDist  ← stays inline in app

pages/*.astro
├── BaseLayout                      ← @vd/shared/layouts
├── Header → Navigation             ← @vd/shared/components
├── Footer
├── ArticleHeader
└── ArticleFooter                   ← props: categories[] via shared CategoryConfig interface
```

## Project Constraints (from `.cursor/rules/`)

Directives affecting Phase 2 planning:

| Rule file | Relevant directive |
|-----------|-------------------|
| `astro-build.md` | `dist/_astro/` must exist after build — verification gate already checks this |
| `content-odkazovani.md` | Internal article links use `.md` format; `rehype-prirucka-links` must keep transforming them identically after extraction |
| `no-inline-css.md` | Content authoring rule — no impact on package move |
| Other `content-*.md` | Content authoring only — out of scope for extraction phase |

No `.cursor/rules/` directive forbids monorepo package extraction or requires compile step for shared packages.

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| `@vd/shared` | workspace `*` | Shared markdown, plugins, layouts, SEO | Locked D-01; single package until Phase 5+ |
| `astro` | **4.16.19** (exact, app-local) | SSG host | D-12; pinned in `apps/vzhurudolu/package.json` |
| `remark-gfm` | **4.0.1** [VERIFIED: npm registry] | GFM in markdown pipeline | Already in app; move dep to `@vd/shared` |
| `rehype-raw` | **7.0.0** [VERIFIED: npm registry] | Raw HTML in legacy content | Already in app devDeps |
| `unist-util-visit` | **5.1.0** [VERIFIED: npm registry] | AST traversal in 5 plugins | Used across remark/rehype utils |
| `hast-util-to-text` | **4.0.2** [VERIFIED: npm registry] | Heading anchor text | `rehype-heading-anchors.ts` |
| `hast-util-from-html` | **2.0.3** [VERIFIED: npm registry] | `markdown="1"` processing | `remark-process-markdown-attributes.ts` |
| `sharp` | **^0.33.0** (app today) | WebP in Vite plugins | Move to `@vd/shared` devDeps |
| `chokidar` | **^3.6.0** | Dev watch in image plugins | Move to `@vd/shared` |
| `svgo` | **^3.3.2** | SVG optimize in design plugin | Dynamic import in plugin |

### Supporting (transitive markdown — declare in `@vd/shared`)

| Library | Version | Purpose |
|---------|---------|---------|
| `remark-parse` | 11.0.0 [VERIFIED: npm registry] | Sub-parse in remark-process |
| `remark-rehype` | 11.1.2 [VERIFIED: npm registry] | Sub-pipeline in remark-process |
| `rehype-stringify` | 10.0.1 [VERIFIED: npm registry] | Sub-pipeline in remark-process |
| `unified` | 11.x (transitive) [ASSUMED] | Sub-pipeline in remark-process |
| `@types/mdast` | 4.0.4 [VERIFIED: npm registry] | TS types for remark plugins |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Source exports (D-08) | `tsup` compile to `dist/` | STACK.md recommends tsup for Astro 5+; unnecessary for Phase 2 Astro 4; adds turbo `^build` dependency |
| Multiple `@vd/*` packages | Single `@vd/shared` | Locked D-01/D-02 |
| Rename plugins (`rehype-guide-links`) | Keep filenames, factory params | Move-only D-10 — rename deferred to Phase 5 if desired |

**Recommended `packages/shared/package.json` skeleton:**

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
  "dependencies": {
    "remark-gfm": "^4.0.1",
    "rehype-raw": "^7.0.0",
    "unist-util-visit": "^5.1.0",
    "hast-util-to-text": "^4.0.2",
    "hast-util-from-html": "^2.0.3",
    "remark-parse": "^11.0.0",
    "remark-rehype": "^11.1.2",
    "rehype-stringify": "^10.0.1",
    "unified": "^11.0.0"
  },
  "devDependencies": {
    "sharp": "^0.33.0",
    "chokidar": "^3.6.0",
    "svgo": "^3.3.2",
    "@types/mdast": "^4.0.4"
  },
  "peerDependencies": {
    "astro": "4.16.19",
    "vite": "^5.4.0"
  }
}
```

**App wiring (`apps/vzhurudolu/package.json`):**

```json
"dependencies": {
  "@vd/shared": "*"
}
```

**App wiring (`apps/vzhurudolu/astro.config.mjs`):**

```javascript
import { createMarkdownConfig } from '@vd/shared/markdown';
import { createCustomSitemap } from '@vd/shared/seo/custom-sitemap';
import { vitePluginValidateFrontmatter } from '@vd/shared/vite-plugins/vite-plugin-validate-frontmatter';
// ...

export default defineConfig({
  site: 'https://www.vzhurudolu.cz',
  integrations: [
    createCustomSitemap({ site: 'https://www.vzhurudolu.cz' }),
    changedFilesIntegration(),
  ],
  markdown: createMarkdownConfig({
    contentPathPrefix: '/prirucka',
    collections: ['prirucka', 'blog', 'podcast'],
  }),
  vite: {
    ssr: { noExternal: ['@vd/shared'] },
    plugins: [/* vite plugins from @vd/shared */],
  },
});
```

## Package Legitimacy Audit

> slopcheck installed but not on PATH in research environment — all packages tagged `[ASSUMED]`; planner should gate installs behind `checkpoint:human-verify` if desired.

| Package | Registry | slopcheck | Disposition |
|---------|----------|-----------|-------------|
| remark-gfm | npm 4.0.1 | unavailable | Approved [ASSUMED] |
| rehype-raw | npm 7.0.0 | unavailable | Approved [ASSUMED] |
| unist-util-visit | npm 5.1.0 | unavailable | Approved [ASSUMED] |
| hast-util-to-text | npm 4.0.2 | unavailable | Approved [ASSUMED] |
| hast-util-from-html | npm 2.0.3 | unavailable | Approved [ASSUMED] |
| sharp | npm (app uses ^0.33.0) | unavailable | Approved [ASSUMED] |
| chokidar | npm ^3.6.0 | unavailable | Approved [ASSUMED] |
| svgo | npm ^3.3.2 | unavailable | Approved [ASSUMED] |

**Packages removed due to slopcheck [SLOP] verdict:** none (slopcheck not runnable)
**Packages flagged as suspicious [SUS]:** none

## Architecture Patterns

### System Architecture Diagram

```text
┌──────────────────────────────────────────────────────────────────────┐
│                    apps/vzhurudolu (Astro 4 SSG)                      │
│  astro.config.mjs ──registers──► markdown + vite plugins + sitemap   │
│  src/pages/*.astro ──imports──► layouts/components from @vd/shared   │
│  src/content/ ──local──► blog, podcast, prirucka collections         │
└───────────────────────────────┬──────────────────────────────────────┘
                                │ workspace import (@vd/shared)
                                ▼
┌──────────────────────────────────────────────────────────────────────┐
│                      packages/shared (@vd/shared)                     │
│  markdown/create-markdown-config.ts ──► remark/rehype plugin arrays    │
│  vite-plugins/*.ts ──► image WebP, frontmatter validation             │
│  seo/custom-sitemap.ts ──► astro:build:done → sitemap.xml            │
│  layouts/BaseLayout.astro + components/Header,Footer,Article*        │
└───────────────────────────────┬──────────────────────────────────────┘
                                │ process.cwd() = apps/vzhurudolu
                                ▼
┌──────────────────────────────────────────────────────────────────────┐
│              Filesystem (app-local paths unchanged)                   │
│  src/content/, src/assets/, public/, dist/                           │
└──────────────────────────────────────────────────────────────────────┘
```

### Recommended Project Structure

```text
packages/shared/
├── package.json                 # exports map, deps
├── types/
│   └── index.ts                 # CategoryConfig minimal interface
├── markdown/
│   ├── create-markdown-config.ts
│   ├── remark-*.ts              # 4 files (+ heading-ids)
│   └── rehype-*.ts              # 7 files
├── vite-plugins/
│   └── vite-plugin-*.ts         # 4 files
├── seo/
│   └── custom-sitemap.ts        # createCustomSitemap factory
├── layouts/
│   └── BaseLayout.astro
└── components/
    ├── Header.astro
    ├── Navigation.astro         # transitive dep
    ├── Footer.astro
    ├── ArticleHeader.astro
    └── ArticleFooter.astro
```

### Pattern 1: Source Exports + `vite.ssr.noExternal`

**What:** `@vd/shared` exposes TypeScript and `.astro` source via `package.json` `exports`; Astro/Vite bundles them at app build time.

**When:** Astro 4 monorepo with `.astro` components in shared package (D-08).

**Example:**

```javascript
// Source: https://docs.astro.build/en/guides/troubleshooting/#adding-dependencies-to-astro-in-a-monorepo
export default defineConfig({
  vite: {
    ssr: {
      noExternal: ['@vd/shared'],
    },
  },
});
```

[CITED: docs.astro.build/en/guides/troubleshooting — monorepo dependencies]

### Pattern 2: `createMarkdownConfig()` Factory

**What:** Single function returns `{ shikiConfig, remarkPlugins, remarkRehype, rehypePlugins }` for `defineConfig({ markdown })`.

**When:** Both apps share pipeline; only path prefix and collection route map differ (D-06, D-07).

**Example (sketch — defaults preserve CS behavior):**

```typescript
// packages/shared/markdown/create-markdown-config.ts
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
  // Return same plugin ORDER as astro.config.mjs lines 128-150
  return {
    shikiConfig: { theme: 'css-variables', langAlias: { /* unchanged */ } },
    remarkPlugins: [
      remarkGfm,
      createRemarkGuideImages({ imagesPrefix }),
      remarkNormalizeCodeLang,
      remarkProcessMarkdownAttributes,
    ],
    remarkRehype: { allowDangerousHtml: true },
    rehypePlugins: [
      rehypeRaw,
      createRehypeGuideImages({ imagesPrefix }),
      ...(opts.includeEbookOnly !== false ? [rehypeRemoveEbookOnly] : []),
      rehypeConnectedElements,
      rehypeRelatedToInnerBox,
      rehypeHeadingAnchors,
      createRehypeContentLinks({ collections, defaultCollection: prefix.slice(1) }),
      rehypeRemoveFirstH1,
    ],
  };
}
```

**Move-only constraint:** Factory wraps existing plugin bodies; parameterized plugins read options but defaults produce byte-identical output for CS.

### Pattern 3: Recommended Extraction Order

| Wave | Work | Validates | Rationale |
|------|------|-----------|-----------|
| 0 | Scaffold `packages/shared/package.json`, empty exports, app adds `"@vd/shared": "*"`, `noExternal` | `npm install` links workspace | Foundation before moves |
| 1 | Move 4 Vite plugins | `astro dev` starts; images convert | Self-contained; fewest cross-deps |
| 2 | Move 12 markdown files + `createMarkdownConfig` | Build passes; prirucka page renders | Highest regression risk (Pitfall 9) |
| 3 | Move `custom-sitemap` + `createCustomSitemap({ site })` | sitemap.xml generated; draft excluded | Small surface |
| 4 | Move layouts/components (+ Navigation) | All pages compile | ~40 import path updates |
| 5 | Delete empty originals; verify no stale imports | CI green | Cleanup |

### Anti-Patterns to Avoid

- **Refactor while moving:** Renaming `rehypePriruckaLinks` → `rehypeContentLinks` in the same PR as the move violates D-10; parameterize internals, keep export names stable initially.
- **Import markdown deps only from app:** Shared package must declare its own `remark-gfm`, `rehype-raw`, etc. — Astro monorepo docs require workspace packages declare dependencies locally [CITED: Astro troubleshooting].
- **Compile `@vd/shared` prematurely:** Adds turbo `^build` ordering and double-processing of `.astro` files; contradicts D-08.
- **Move `changed-files-integration`:** FTP-specific; not part of MONO-03 shared infrastructure.
- **Skip Navigation.astro:** Breaks Header at compile time.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Workspace package resolution for `.astro` | Custom alias/tsconfig paths only | `exports` map + `vite.ssr.noExternal` | Astro/Vite SSR bundling heuristics expect this [CITED: Astro docs] |
| Sitemap generation | Re-enable `@astrojs/sitemap` | Keep `createCustomSitemap` | Known `undefined.reduce()` bug in codebase |
| Markdown AST transforms | Regex on HTML strings | Existing remark/rehype plugins moved verbatim | 520+ prirucka pages depend on AST order |
| Shared package build pipeline | tsup/tsc in Phase 2 | Source exports consumed by Astro | D-08; turbo.json unchanged |

**Key insight:** The markdown pipeline order in `astro.config.mjs` (remark → rehype, 10 plugins) is the contract — the factory must preserve exact order, not simplify it.

## Common Pitfalls

### Pitfall 1: Markdown Pipeline Regression (Pitfall 9)

**What goes wrong:** Plugin order changes or `allowDangerousHtml: false` after extraction; connected boxes, ebook-only, `markdown="1"` break silently.

**Why it happens:** Temptation to "clean up" during move; shared package resolution changes load order.

**How to avoid:** Move-only; `createMarkdownConfig` copies exact array from `astro.config.mjs:128-150`; run full build after wave 2.

**Warning signs:** Prirucka article loses connected-box styling; internal `.md` links stop resolving.

### Pitfall 2: `process.cwd()` Assumption Breaks

**What goes wrong:** Vite plugins resolve wrong directories if build invoked from monorepo root without app as cwd.

**Why it happens:** Turbo runs from root; Astro/Vite typically chdir to app root — but custom scripts might not.

**How to avoid:** CI already runs `turbo build --filter=@vd/vzhurudolu`; verify plugins still find `src/content` and image dirs post-move.

**Warning signs:** Frontmatter validation scans wrong path; zero images converted.

### Pitfall 3: Shared Package Imports from App (D-05 Violation)

**What goes wrong:** `ArticleFooter.astro` keeps `import type { CategoryConfig } from '../../../apps/vzhurudolu/src/data/categories'`.

**Why it happens:** Type-only import seems harmless.

**How to avoid:** Define minimal `CategoryConfig` interface in `packages/shared/types/index.ts` matching current shape; app passes data, shared owns type.

**Warning signs:** Circular dependency errors; Vercel build can’t resolve app path from package.

### Pitfall 4: Missing `Navigation.astro`

**What goes wrong:** Header moved without Navigation; build fails.

**How to avoid:** Move both in same commit; update relative import to same-folder path in package.

### Pitfall 5: Hardcoded Sitemap Site Survives Parameterization Incomplete

**What goes wrong:** `createCustomSitemap` factory added but still hardcodes Czech URL inside hook.

**How to avoid:** Use `options.site` parameter throughout; CS app passes `config.site` value.

### Pitfall 6: Duplicate Dependencies / Version Drift

**What goes wrong:** `remark-gfm` in both app and shared at different versions; dual copies in bundle.

**How to avoid:** Move markdown deps to `@vd/shared`; remove duplicates from app `devDependencies` only after verifying app doesn't import them directly in `astro.config.mjs`.

## Code Examples

### `createCustomSitemap` (parameterized, CS-default)

```typescript
// Source: adapted from apps/vzhurudolu/src/utils/custom-sitemap.ts
import type { AstroIntegration } from 'astro';

export function createCustomSitemap(options: { site: string }): AstroIntegration {
  const { site } = options;
  return {
    name: 'custom-sitemap',
    hooks: {
      'astro:build:done': async ({ dir, pages }) => {
        const filteredPages = pages.filter((page) => {
          const pathname = page.pathname;
          if (pathname.includes('style/')) return false;
          if (pathname.includes('404')) return false;
          return true;
        });
        // ... unchanged XML generation using `site`
      },
    },
  };
}
```

### App page import after extraction

```astro
---
// apps/vzhurudolu/src/pages/blog/[slug].astro
import BaseLayout from '@vd/shared/layouts/BaseLayout.astro';
import Header from '@vd/shared/components/Header.astro';
import Footer from '@vd/shared/components/Footer.astro';
import ArticleHeader from '@vd/shared/components/ArticleHeader.astro';
import ArticleFooter from '@vd/shared/components/ArticleFooter.astro';
---
```

### Parameterized link plugin (sketch for D-07)

```typescript
// Wrap existing rehype-prirucka-links.ts body
export function createRehypeContentLinks(opts: {
  collections: string[]; // ['prirucka','blog','podcast'] or ['guide','blog']
}) {
  const CONTENT_ENTITIES = opts.collections;
  // ... existing processNode logic using CONTENT_ENTITIES instead of const array
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Plugins at `apps/vzhurudolu/` root + `src/utils/` | `@vd/shared` workspace package | Phase 2 | Import path change only |
| Hardcoded markdown in `astro.config.mjs` | `createMarkdownConfig()` factory | Phase 2 | EN-ready; CS defaults unchanged |
| Multiple `@vd/*` packages (STACK.md sketch) | Single `@vd/shared` (D-01) | Phase 2 context | Simpler turbo graph |
| tsup compile for shared packages | Source exports (D-08) | Phase 2 | No `^build` on shared |

**Deprecated/outdated:**
- `@astrojs/sitemap` — still disabled; do not re-enable during extraction

## Discretion Recommendations (for planner)

| Discretion item | Recommendation | Rationale |
|---------------|----------------|-----------|
| `exports` map | Subpaths per folder as in skeleton above | Matches D-01 internal structure; explicit `.astro` paths |
| Extraction order | Vite plugins → markdown → SEO → components | Isolates highest-risk markdown wave; plugins validate workspace wiring early |
| `is-published.ts` | **Stay app-local** | Tied to app's `astro:content` collection union type |
| `get-related-articles.ts` | **Stay app-local** | CS three-collection logic; EN will differ (blog + guide only) |
| `siteConfig` injection | **Defer to Phase 5** for layouts; parameterize SEO/markdown factories only in Phase 2 | D-10 move-only — BaseLayout keeps hardcoded CS branding; moving file without prop refactor preserves behavior |

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | Astro/Vite sets `process.cwd()` to app root during `turbo build --filter=@vd/vzhurudolu` | Pitfalls | Image plugins scan wrong directories |
| A2 | `unified` ^11.0.0 satisfies remark-process imports | Standard Stack | Sub-parse fails at build |
| A3 | Source exports work for `.astro` in `@vd/shared` without `tsup` on Astro 4.16.19 | Standard Stack | Need compile step + turbo change |
| A4 | `Navigation.astro` move is acceptable though not listed in D-03 | Inventory | Planner might omit file |
| A5 | ROADMAP criterion "both apps import packages" applies from Phase 5 onward for EN | Open Questions | Scope creep if EN scaffold required in Phase 2 |

## Open Questions

1. **Should `remark-heading-ids.ts` move even though disabled in config?**
   - What we know: Still imported by `remark-process-markdown-attributes.ts`
   - Recommendation: Yes — move with markdown folder; required for compile

2. **ROADMAP success criterion #1 says "both apps" — only vzhurudolu exists**
   - What we know: EN app is Phase 5; Phase 2 delivers package ready for EN import
   - Recommendation: Phase 2 gate = vzhurudolu imports `@vd/shared`; EN import is Phase 5 acceptance

3. **Remove duplicate `remark-gfm`/`rehype-raw` from app package.json after move?**
   - What we know: App may still need them if referenced outside shared factory
   - Recommendation: After `createMarkdownConfig` fully owns registration, remove from app devDeps in final wave

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | Astro build | ✓ | v22.21.1 | — |
| npm | workspaces | ✓ | 10.9.4 | — |
| turbo | CI/local build | ✓ | ^2.9.16 (root) | — |
| astro | apps/vzhurudolu | ✓ | 4.16.19 | — |

**Missing dependencies with no fallback:** none

**Missing dependencies with fallback:** none

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | None — shell build gate + GitHub Actions |
| Config file | `.github/workflows/pr-build.yml`, `scripts/verify-phase1-build.sh` |
| Quick run command | `npm run build:vzhurudolu` |
| Full suite command | `npx turbo run build --filter=@vd/vzhurudolu && bash scripts/verify-phase1-build.sh` |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| MONO-03 | Shared code lives in `packages/shared`, app imports `@vd/shared` | integration (build) | `npx turbo run build --filter=@vd/vzhurudolu` | ✅ pr-build.yml |
| MONO-03 | No duplicated plugin files in app tree | static check | `! test -f apps/vzhurudolu/vite-plugin-content-images.ts && ! test -d apps/vzhurudolu/src/utils/rehype-prirucka-links.ts` (after move) | ❌ Wave 0 — add to verify script |
| MONO-03 | Czech build output intact (sitemap, drafts, _astro) | smoke | `bash scripts/verify-phase1-build.sh` | ✅ |
| MONO-03 | `createMarkdownConfig` accepts path prefix | manual/config inspect | Grep `createMarkdownConfig({ contentPathPrefix: '/prirucka'` in astro.config.mjs | ❌ Wave 2 |
| VD-01 (partial) | Full parity diff | manual | Out of scope Phase 2 (D-11) | Phase 3 |

### Sampling Rate

- **Per task commit:** `npm run build:vzhurudolu`
- **Per wave merge:** `npx turbo run build --filter=@vd/vzhurudolu && bash scripts/verify-phase1-build.sh`
- **Phase gate:** PR CI green; optional extend `verify-phase1-build.sh` → `verify-phase2-extraction.sh` with stale-file checks

### Wave 0 Gaps

- [ ] `scripts/verify-phase2-extraction.sh` — assert extracted files absent from old paths; assert `@vd/shared` imports present in `astro.config.mjs`
- [ ] Remove duplicated markdown deps from app after migration (final cleanup task)
- [ ] No unit test framework — acceptable for move-only; Phase 3 adds parity diff

## Security Domain

### Applicable ASVS Categories

| ASVS Category | Applies | Standard Control |
|---------------|---------|------------------|
| V2 Authentication | no | N/A — static public site |
| V3 Session Management | no | N/A |
| V4 Access Control | no | N/A |
| V5 Input Validation | yes | Frontmatter validation plugin; Zod schemas stay app-local |
| V6 Cryptography | no | N/A |

### Known Threat Patterns for Astro SSG + markdown

| Pattern | STRIDE | Standard Mitigation |
|---------|--------|---------------------|
| Raw HTML in markdown (`allowDangerousHtml: true`) | Tampering / XSS in static output | Preserve existing pipeline unchanged; content is trusted author MD in git |
| Dependency confusion in `@vd/shared` | Spoofing | Workspace `*` protocol; private monorepo; slopcheck when available |
| Supply-chain in image plugins (sharp native) | Tampering | Pin versions; npm ci in CI |

## Sources

### Primary (HIGH confidence)
- [Astro troubleshooting — monorepo dependencies](https://docs.astro.build/en/guides/troubleshooting/#adding-dependencies-to-astro-in-a-monorepo) — `vite.ssr.noExternal`, per-package deps
- Codebase scout — `apps/vzhurudolu/astro.config.mjs`, vite plugins, utils, layouts, components (2026-06-07)
- `.planning/phases/02-shared-packages-extraction/02-CONTEXT.md` — locked decisions
- `.planning/research/PITFALLS.md` — Pitfall 9, move-only discipline

### Secondary (MEDIUM confidence)
- `.planning/research/ARCHITECTURE.md` — extraction sequence A4–A6, factory patterns
- `.planning/research/STACK.md` — npm workspaces, source exports vs tsup
- `npm view` — package versions verified 2026-06-07

### Tertiary (LOW confidence)
- `.planning/research/STACK.md` multi-package sketch — superseded by D-01 single package

## Metadata

**Confidence breakdown:**
- Standard stack: **HIGH** — verified against live codebase + npm registry + Astro docs
- Architecture: **HIGH** — complete file inventory and dependency graph from grep/read
- Pitfalls: **HIGH** — aligned with PITFALLS.md Pitfall 9 and codebase specifics

**Research date:** 2026-06-07
**Valid until:** 2026-07-07 (stable Astro 4 monorepo patterns)

## RESEARCH COMPLETE

**Phase:** 02 - Shared Packages Extraction
**Confidence:** HIGH

### Key Findings
- **22 files + 1 factory** identified for extraction; `Navigation.astro` is a required sixth component (Header dependency)
- **Vite plugins use `process.cwd()`** — correct when build runs from app context; no path rewrite needed for Phase 2
- **5 markdown files hardcode `/prirucka`** — factory must parameterize with CS defaults per D-06/D-07 without behavior change
- **`is-published.ts` / `get-related-articles.ts` should stay app-local** — collection-specific; violates D-05 if shared imports `astro:content` app schemas
- **Existing CI gate** (`verify-phase1-build.sh`) sufficient for Phase 2; extend with stale-path checks

### File Created
`.planning/phases/02-shared-packages-extraction/02-RESEARCH.md`

### Confidence Assessment
| Area | Level | Reason |
|------|-------|--------|
| Standard Stack | HIGH | npm versions verified; Astro monorepo pattern cited |
| Architecture | HIGH | Full codebase scout with import graph |
| Pitfalls | HIGH | Grounded in PITFALLS.md + concrete file deps |

### Open Questions
- Confirm Navigation.astro as in-scope transitive move
- Clarify ROADMAP "both apps" criterion timing (recommend Phase 5 for EN)

### Ready for Planning
Research complete. Planner can now create PLAN.md files.
