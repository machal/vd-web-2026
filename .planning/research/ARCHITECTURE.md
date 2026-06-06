# Architecture Patterns

**Domain:** Dual-brand, dual-locale Astro monorepo (Czech `vzhurudolu.cz` + English `michalek.dev`)  
**Project:** Martin Michálek · Web & Performance  
**Researched:** 2026-06-06  
**Overall confidence:** HIGH for monorepo/SSG patterns (Astro docs + production monorepo references); MEDIUM for cross-domain pairing edge cases (community patterns, not Astro-native)

---

## Executive Recommendation

Use a **two-app, one-shared-package monorepo** — not Astro’s built-in `i18n.domains`. Each site is an independent Astro 4 SSG app with its own content collections, `site` URL, and Vercel project. Cross-language linking is a **build-time pairing registry** in `packages/shared`, not locale-prefixed routing.

**Why not Astro `i18n.domains`:** Official docs require `output: "server"` with no prerendered pages ([Astro i18n routing — domains](https://docs.astro.build/en/guides/internationalization)). This project is `output: 'static'` and must stay SSG for Lighthouse goals. Separate domains with separate builds is the correct fit.

---

## Recommended Monorepo Layout

```text
www/
├── apps/
│   ├── vzhurudolu/                 # Czech brand — vzhurudolu.cz
│   │   ├── astro.config.mjs        # site: https://www.vzhurudolu.cz
│   │   ├── package.json            # astro + @astrojs/* declared HERE
│   │   ├── public/                 # CS-specific: .htaccess legacy, favicon overrides
│   │   └── src/
│   │       ├── content/
│   │       │   ├── blog/
│   │       │   ├── podcast/        # CS-only — not in EN app
│   │       │   └── prirucka/       # /prirucka/{id}
│   │       ├── pages/              # CS routes incl. kurzy, ebooks
│   │       ├── data/categories.ts  # CS taxonomy
│   │       └── site.config.ts      # brand, nav labels, locale: 'cs'
│   │
│   └── michalek-dev/               # English brand — michalek.dev
│       ├── astro.config.mjs        # site: https://michalek.dev
│       ├── package.json
│       ├── public/
│       └── src/
│           ├── content/
│           │   ├── blog/           # /blog/{slug}
│           │   └── guide/          # /guide/{slug} — EN equivalent of příručka articles
│           ├── pages/
│           │   ├── blog/
│           │   ├── guide/
│           │   └── martin.astro
│           ├── data/               # EN nav, optional EN tags
│           └── site.config.ts      # brand, nav labels, locale: 'en'
│
├── packages/
│   └── shared/                     # @vd/shared — consumed by both apps
│       ├── package.json              # "name": "@vd/shared", exports map
│       ├── components/             # BaseLayout, Header, Footer, Article*, LanguageSwitch
│       ├── layouts/
│       ├── markdown/               # remark-*.ts, rehype-*.ts (moved from src/utils)
│       ├── vite-plugins/           # image + frontmatter validators
│       ├── schemas/                # Zod base schemas + pairing fields
│       ├── content-pairing/        # pairs manifest + URL resolver + validator
│       ├── urls/                   # canonical getSlug, getCollectionUrl
│       ├── seo/                    # hreflang, canonical, OG helpers
│       └── static/                 # shared CSS, fonts, JS (legacy design system)
│
├── pnpm-workspace.yaml             # or npm workspaces — pick one, document in STACK.md
├── turbo.json                      # build orchestration
├── package.json                    # root scripts only; no astro dep at root
└── .github/workflows/              # per-app or turbo-filtered CI
```

**Dependency rule (non-negotiable):** `packages/shared` → never imports from `apps/*`. Apps import `@vd/shared`. Content never lives in `packages/shared` — only code, schemas, pairing metadata, and shared static assets.

---

## System Diagram

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│                         BUILD TIME (per app, parallel)                       │
├──────────────────────────────┬──────────────────────────────────────────────┤
│  apps/vzhurudolu             │  apps/michalek-dev                            │
│  ┌────────────────────────┐  │  ┌────────────────────────────────────────┐  │
│  │ CS content collections │  │  │ EN content: blog + guide               │  │
│  │ blog, podcast, prirucka│  │  │ pages: /martin, legal, listings        │  │
│  └───────────┬────────────┘  │  └──────────────────┬─────────────────────┘  │
│              │               │                     │                          │
│              └───────────────┼─────────────────────┘                          │
│                              ▼                                                │
│              ┌───────────────────────────────────────────────┐                  │
│              │           packages/shared (@vd/shared)       │                  │
│              │  schemas · markdown pipeline · vite plugins    │                  │
│              │  components/layouts · content-pairing registry │                  │
│              │  urls · seo (hreflang, canonical) · static CSS   │                  │
│              └───────────────────────────────────────────────┘                  │
│                              │                                                │
│              ┌───────────────┴───────────────┐                                │
│              ▼                               ▼                                │
│       dist/ (vzhurudolu)              dist/ (michalek-dev)                    │
└─────────────────────────────────────────────────────────────────────────────┘
              │                               │
              ▼                               ▼
┌─────────────────────────┐     ┌─────────────────────────┐
│ Vercel Project 1        │     │ Vercel Project 2        │
│ Root: apps/vzhurudolu   │     │ Root: apps/michalek-dev │
│ Domain: vzhurudolu.cz   │     │ Domain: michalek.dev    │
└─────────────────────────┘     └─────────────────────────┘
```

---

## Component Boundaries

| Component | Responsibility | Owns | Communicates With |
|-----------|----------------|------|-------------------|
| **`apps/vzhurudolu`** | Czech site: all CS content, podcast, příručka ebooks, kurzy, legacy Apache redirects | CS markdown, CS pages, CS `categories.ts`, CS `public/` overrides | `@vd/shared` (imports only); Vercel project 1 |
| **`apps/michalek-dev`** | English site: adapted blog + guide articles, `/martin`, legal pages | EN markdown, EN routes (`/guide/` not `/prirucka/`), EN copy | `@vd/shared`; Vercel project 2 |
| **`packages/shared` — schemas** | Zod collection schemas, shared field transforms (`title`, `date`, `published`, `tags`) | Base schema fragments, `pairId` field definition | Used by each app’s `src/content/config.ts` |
| **`packages/shared` — markdown** | remark/rehype pipeline (images, links, headings, ebook-only removal) | All unified plugins currently in `src/utils/remark-*`, `rehype-*` | Registered in each app’s `astro.config.mjs` |
| **`packages/shared` — vite-plugins** | Image WebP conversion, frontmatter validation | Plugins currently at repo root `vite-plugin-*.ts` | Each app’s `astro.config.mjs` `vite.plugins` |
| **`packages/shared` — components** | Visual chrome: layouts, header/footer, article list/detail shells | `BaseLayout`, `Header`, `Footer`, `ArticleHeader`, `ArticleFooter`, `LanguageSwitch` | Accepts `siteConfig` prop from app |
| **`packages/shared` — urls** | Single canonical URL builders per collection type | `getSlug()`, `getCollectionPath()`, `SITE_BASE_URL` injection | Used by pages, RSS, sitemap, pairing |
| **`packages/shared` — content-pairing** | Cross-domain EN↔CS link registry and validation | `pairs.ts` manifest, `resolveAlternate()`, build validator | Read by `LanguageSwitch`, `seo/hreflang`, sitemap |
| **`packages/shared` — seo** | Canonical, hreflang, OG helpers | `buildAlternateLinks()`, Person/Article JSON-LD fragments | Uses pairing + per-app `site` URL |
| **`packages/shared` — static** | Legacy CSS/JS/fonts shared by both brands | `static/assets/css/*`, fonts, `vrdl.min.js` | Each app `publicDir` or build copy step |
| **Per-app `site.config.ts`** | Brand-specific: site name, nav items, locale, social links, analytics flags | Not shared — each app defines its own | Passed into shared layouts as props |
| **Per-app `astro.config.mjs`** | `site`, `trailingSlash`, integrations, markdown plugin registration | App-specific `site` URL and any app-only integrations | Imports from `@vd/shared` |
| **CI / Vercel** | Independent deploy per app; shared package rebuilt when changed | Two Vercel projects, one Git repo | Turbo `dependsOn: ["^build"]` |

### What Stays App-Local (Do Not Share)

| Concern | vzhurudolu | michalek-dev |
|---------|------------|--------------|
| Content files | ~190 blog, ~68 podcast, ~370 prirucka | 8 pilot articles + `/martin` copy |
| Collection names | `blog`, `podcast`, `prirucka` | `blog`, `guide` |
| URL prefix for guides | `/prirucka/{id}` | `/guide/{slug}` |
| Category system | Full `categories.ts` + TOC components | Deferred / minimal tags only |
| Ebook landing pages | `/css-layout`, `/ebook-amp`, etc. | Out of scope |
| RSS aggregation | blog + podcast + prirucka | blog + guide only |
| Redirects | Apache `.htaccess` + middleware | Vercel middleware or `_redirects` if needed |

---

## Collection Integration: `/blog/` + `/guide/`

The English site preserves **content-type clarity** from the Czech site by mapping příručka articles to a `guide` collection with `/guide/` URLs — not `/prirucka/`.

| Czech (vzhurudolu) | English (michalek-dev) | Pairing key |
|--------------------|------------------------|-------------|
| `blog` → `/blog/{filename-slug}` | `blog` → `/blog/{slug}` | `pairId` + blog slug/id rules |
| `prirucka` → `/prirucka/{frontmatter-id}` | `guide` → `/guide/{slug}` | `pairId` — slugs may differ |
| `podcast` → `/podcast/{postID}-{slug}` | — (no EN collection) | No pair |

### Schema Strategy

**Base schema in `packages/shared/schemas/`** — fields common to all article types:

```typescript
// packages/shared/schemas/article-base.ts
z.object({
  title: z.string(),
  description: z.string().optional(),
  date: z.coerce.date().optional(),
  tags: z.array(z.string()).optional(),
  published: z.boolean().optional(),
  ogImage: z.string().optional(),
  pairId: z.string().optional(),  // echoes manifest; validated at build
})
```

**Per-app collection config** extends base:

```typescript
// apps/vzhurudolu/src/content/config.ts
import { blogBase, priruckaBase } from '@vd/shared/schemas';

const prirucka = defineCollection({
  type: 'content',
  schema: priruckaBase.extend({ id: z.string(), heading: z.string().optional(), /* CS legacy fields */ }),
});

// apps/michalek-dev/src/content/config.ts
const guide = defineCollection({
  type: 'content',
  schema: articleBase.extend({ slug: z.string().optional() }),  // slug for /guide/{slug}
});
```

### Markdown Link Plugin Adaptation

Current `rehypePriruckaLinks` resolves `.md` links to `/prirucka/`, `/blog/`, `/podcast/` based on file path. When moved to `@vd/shared`:

- Pass **site context** (collection route map) into the plugin factory
- EN app registers `{ guide: 'guide', blog: 'blog' }` — no `podcast`
- CS app keeps `{ prirucka: 'prirucka', blog: 'blog', podcast: 'podcast' }`

```typescript
// packages/shared/markdown/create-rehype-content-links.ts
export function createRehypeContentLinks(routeMap: Record<string, string>) { ... }
```

---

## Content Pairing Schema (Language Switch)

Cross-domain pairing cannot rely on Astro `astro:i18n` helpers — URLs live on different origins. Use a **central manifest in `packages/shared`** as the single source of truth, with optional `pairId` in front matter for editor discoverability and build-time cross-check.

### Pair Manifest (`packages/shared/content-pairing/pairs.ts`)

```typescript
export type SiteId = 'vzhurudolu' | 'michalek-dev';
export type CollectionId = 'blog' | 'prirucka' | 'guide' | 'page';

/** How to locate one side of a pair inside an app */
export interface ContentRef {
  site: SiteId;
  collection: CollectionId;
  /** blog: slug (filename minus .md); prirucka: frontmatter `id`; guide: slug; page: path e.g. '/martin' */
  key: string;
}

export interface ContentPair {
  /** Stable semantic ID — same across both sites, e.g. 'webp', 'martin' */
  pairId: string;
  cs: ContentRef;
  en: ContentRef;
}

export const CONTENT_PAIRS: ContentPair[] = [
  {
    pairId: 'webp',
    cs: { site: 'vzhurudolu', collection: 'prirucka', key: 'webp' },
    en: { site: 'michalek-dev', collection: 'guide', key: 'webp' },
  },
  {
    pairId: 'web-vitals',
    cs: { site: 'vzhurudolu', collection: 'prirucka', key: 'web-vitals' },
    en: { site: 'michalek-dev', collection: 'guide', key: 'web-vitals' },
  },
  {
    pairId: 'rok-2025',
    cs: { site: 'vzhurudolu', collection: 'blog', key: '261-rok-2025' },
    en: { site: 'michalek-dev', collection: 'blog', key: '2025-year-in-review' },  // slug may differ
  },
  {
    pairId: 'martin',
    cs: { site: 'vzhurudolu', collection: 'page', key: '/martin' },
    en: { site: 'michalek-dev', collection: 'page', key: '/martin' },
  },
  // ... remaining 5 pilot pairs
];
```

### URL Resolution (`packages/shared/content-pairing/resolve.ts`)

```typescript
const SITE_ORIGINS: Record<SiteId, string> = {
  vzhurudolu: 'https://www.vzhurudolu.cz',
  'michalek-dev': 'https://michalek.dev',
};

export function resolveContentUrl(ref: ContentRef): string {
  const base = SITE_ORIGINS[ref.site];
  switch (ref.collection) {
    case 'blog':   return `${base}/blog/${ref.key}`;
    case 'prirucka': return `${base}/prirucka/${ref.key}`;
    case 'guide':  return `${base}/guide/${ref.key}`;
    case 'page':   return `${base}${ref.key}`;
  }
}

export function resolveAlternate(
  currentSite: SiteId,
  collection: CollectionId,
  key: string,
): { locale: 'cs' | 'en'; href: string; pairId: string } | undefined {
  const pair = CONTENT_PAIRS.find(
    (p) =>
      (p.cs.site === currentSite && p.cs.collection === collection && p.cs.key === key) ||
      (p.en.site === currentSite && p.en.collection === collection && p.en.key === key),
  );
  if (!pair) return undefined;
  const target = currentSite === 'vzhurudolu' ? pair.en : pair.cs;
  return {
    locale: currentSite === 'vzhurudolu' ? 'en' : 'cs',
    href: resolveContentUrl(target),
    pairId: pair.pairId,
  };
}
```

### Front Matter Contract (Per Article)

Editors see pairing in the markdown they edit; build validates consistency:

```yaml
---
# apps/michalek-dev/src/content/guide/webp.md
title: WebP images for the modern web
pairId: webp
date: 2026-01-15
published: true
---
```

```yaml
---
# apps/vzhurudolu/src/content/prirucka/webp.md
id: webp
heading: Obrázky ve formátu WebP
pairId: webp
published: true
---
```

**Build validator** (`packages/shared/content-pairing/validate.ts`):
1. Every `pairId` in manifest has exactly one published entry per side (or warn if EN still draft)
2. Every `pairId` in front matter exists in manifest with matching `collection` + `key`
3. No duplicate `pairId` within a collection
4. `resolveAlternate()` is symmetric — CS→EN→CS returns same URL

### Hreflang + Language Switch Output

For paired pages only (8 articles + `/martin`):

```html
<link rel="alternate" hreflang="cs" href="https://www.vzhurudolu.cz/prirucka/webp" />
<link rel="alternate" hreflang="en" href="https://michalek.dev/guide/webp" />
<link rel="alternate" hreflang="x-default" href="https://michalek.dev/guide/webp" />
<link rel="canonical" href="https://michalek.dev/guide/webp" />
```

- **Canonical** always self-references (current page URL) — never cross-language
- **`x-default` → English** (global audience per PROJECT.md)
- **Language switch UI** uses same `resolveAlternate()` — label native script: "Česky" / "English"
- **No switcher** on unpaired pages (podcast, most příručka, kurzy)

Implement in `packages/shared/components/LanguageSwitch.astro` + `packages/shared/seo/hreflang.ts`. Inject from `BaseLayout` when `alternate` prop is provided.

---

## Data Flow

### 1. Content → Static HTML (per app)

```text
Markdown file (app-local src/content/)
    │
    ▼
Zod schema validation (app config.ts imports @vd/shared/schemas)
    │
    ▼
Vite plugins: validate-frontmatter, convert images (packages/shared/vite-plugins)
    │
    ▼
getStaticPaths() → getCollection() → entry.render()
    │
    ▼
remark/rehype pipeline (packages/shared/markdown)
    │
    ▼
Page .astro wraps <Content /> in BaseLayout (packages/shared/components)
    │  props: siteConfig, alternate (from resolveAlternate), canonical
    ▼
Static HTML in app/dist/
```

### 2. Cross-Site Pairing (build time only)

```text
CONTENT_PAIRS manifest (packages/shared)
    │
    ├─► Article page: resolveAlternate(site, collection, key) → LanguageSwitch href
    │
    ├─► BaseLayout: buildAlternateLinks() → <link rel="alternate" hreflang="…">
    │
    ├─► Custom sitemap: optional xhtml:link annotations per paired URL
    │
    └─► Build validator: frontmatter pairId ↔ manifest consistency
```

No runtime API, no shared database, no cross-app filesystem reads at build time. Each app build is self-contained; pairing is declarative TypeScript consumed from `@vd/shared`.

### 3. Related Articles (app-local)

`getRelatedArticles()` stays **per-app** — related content does not cross collections or sites at MVP. EN related posts come from EN `blog`/`guide` tags only.

### 4. RSS + Sitemap (per-app)

| Output | vzhurudolu | michalek-dev |
|--------|------------|--------------|
| RSS | `/rss` — blog + podcast + prirucka | `/rss` — blog + guide |
| Sitemap | `custom-sitemap.ts` pattern, `site` = vzhurudolu.cz | Same helper, `site` = michalek.dev |
| hreflang in sitemap | Optional; must match `<head>` if used | Same |

Move `custom-sitemap.ts` to `@vd/shared/seo` with `site` and `collections` injected.

---

## Suggested Build Order

### Phase A — Monorepo Scaffold (Czech parity first)

| Step | Work | Depends On | Validates |
|------|------|------------|-----------|
| A1 | Create `pnpm-workspace.yaml`, root `package.json`, `turbo.json` | — | `turbo build` runs |
| A2 | Create `packages/shared` package skeleton + exports map | A1 | Apps can `import from '@vd/shared'` |
| A3 | Move `src/` → `apps/vzhurudolu/src/`, config, public | A2 | Czech site builds from app root |
| A4 | Extract remark/rehype + vite plugins → `@vd/shared` | A3 | MD pipeline unchanged |
| A5 | Extract `getSlug` → `@vd/shared/urls` (fix duplication) | A3 | URLs match pre-migration |
| A6 | Extract `BaseLayout`, `Header`, `Footer` → `@vd/shared` with `siteConfig` prop | A4 | Visual parity |
| A7 | Declare `astro` + integrations in `apps/vzhurudolu/package.json` | A3 | Vercel-clean install works |
| A8 | FTP deploy from `apps/vzhurudolu` (or turbo filter) | A7 | Production parity before Vercel |

### Phase B — English App

| Step | Work | Depends On | Validates |
|------|------|------------|-----------|
| B1 | Scaffold `apps/michalek-dev` with `site.config.ts`, `guide` collection | A6 | `astro dev` runs |
| B2 | Add `blog` + `guide` pages, `/martin`, homepage | B1 | Routes resolve |
| B3 | Implement `content-pairing` manifest + `resolveAlternate` | A2 | Unit-testable URL resolution |
| B4 | Add `LanguageSwitch` + hreflang to shared layout | B3 | Pilot pair links resolve |
| B5 | Add pairing validator to build | B3, B4 | Broken pairId fails build |
| B6 | Publish 8 EN articles with `pairId` + CS counterparts | B5 | Switch + hreflang reciprocal |

### Phase C — Deploy

| Step | Work | Depends On | Validates |
|------|------|------------|-----------|
| C1 | Vercel project: `apps/vzhurudolu`, domain vzhurudolu.cz | A8 | Preview URL matches FTP |
| C2 | Vercel project: `apps/michalek-dev`, domain michalek.dev | B6 | EN site live |
| C3 | DNS cutover per domain | C1, C2 | Lighthouse 100/100 on both |

### Turbo Pipeline

```json
{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"],
      "inputs": ["src/**", "public/**", "astro.config.mjs"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    }
  }
}
```

`packages/shared` either has no build step (Astro/Vite consumes source via `exports`) or a lightweight `tsc` — prefer **source exports** for Astro components to avoid double-compilation.

**Parallel builds:** `turbo build` runs both apps concurrently after `@vd/shared` is available. Vercel uses per-project `turbo build --filter=vzhurudolu` / `--filter=michalek-dev` so a change to EN content does not rebuild CS unless `@vd/shared` changed.

---

## Patterns to Follow

### Pattern 1: Site Config Injection

**What:** Each app exports a `siteConfig` object; shared layouts never hardcode brand strings or URLs.

```typescript
// apps/michalek-dev/src/site.config.ts
export const siteConfig = {
  id: 'michalek-dev' as const,
  locale: 'en' as const,
  name: 'Martin Michálek · Web & Performance',
  origin: 'https://michalek.dev',
  nav: [
    { href: '/blog', label: 'Blog' },
    { href: '/guide', label: 'Guide' },
    { href: '/martin', label: 'Martin' },
  ],
};
```

```astro
---
// apps/michalek-dev/src/pages/guide/[slug].astro
import { BaseLayout } from '@vd/shared/layouts';
import { resolveAlternate } from '@vd/shared/content-pairing';
import { siteConfig } from '../../site.config';

const alternate = resolveAlternate(siteConfig.id, 'guide', entry.slug);
---
<BaseLayout siteConfig={siteConfig} alternate={alternate}>
```

### Pattern 2: Factory Markdown Config

**What:** Shared `createMarkdownConfig({ routeMap, entity })` returns remark/rehype arrays for `astro.config.mjs`.

**When:** Both apps share 90% of pipeline; only link resolution and entity detection differ.

### Pattern 3: Independent Vercel Projects

**What:** Two Vercel projects, same Git repo, different Root Directory ([Vercel monorepo guide](https://vercel.com/docs/monorepos)).

| Setting | vzhurudolu | michalek-dev |
|---------|------------|--------------|
| Root Directory | `apps/vzhurudolu` | `apps/michalek-dev` |
| Build Command | `cd ../.. && turbo build --filter=vzhurudolu` | `cd ../.. && turbo build --filter=michalek-dev` |
| Output | `dist` | `dist` |
| `vercel.json` | Inside app dir if needed (redirects) | Inside app dir |

**Note:** Avoid `vercel.json` rewrites for Astro — use Vercel middleware ([Astro on Vercel](https://vercel.com/docs/frameworks/frontend/astro)).

### Pattern 4: Shared Static Assets via `publicDir`

**What:** Point both apps at shared CSS:

```javascript
// astro.config.mjs
export default defineConfig({
  publicDir: '../../packages/shared/static',
  // app-local public/ merged via vite plugin or second copy step for favicon/robots
});
```

Or: turbo `build` copies `packages/shared/static` → `apps/*/public/assets` before Astro build. Pick one approach in implementation — document in STACK.md.

---

## Anti-Patterns to Avoid

### Anti-Pattern 1: Single Astro App with `i18n.domains`

**What:** One `src/` tree, Astro `i18n.domains` for vzhurudolu.cz + michalek.dev.  
**Why bad:** Requires SSR (`output: "server"`); couples unrelated brands; podcast/kurzy/ebook CS-only routes pollute EN; violates separate-brand decision.  
**Instead:** Two apps, shared package.

### Anti-Pattern 2: Locale-Prefixed Paths on One Domain

**What:** `michalek.dev/en/...` or `vzhurudolu.cz/en/...`.  
**Why bad:** Explicitly out of scope; weakens personal brand.  
**Instead:** Separate domain for English.

### Anti-Pattern 3: Frontmatter-Only Pairing (No Manifest)

**What:** `alternateUrl: https://...` in each file without central registry.  
**Why bad:** Bidirectional drift — CS updated, EN forgotten; no build-time symmetry check; grep-heavy auditing.  
**Instead:** Central `CONTENT_PAIRS` + `pairId` echo in front matter.

### Anti-Pattern 4: Shared Content Directory

**What:** `packages/shared/content/` with CS and EN subfolders.  
**Why bad:** Blurs editorial ownership; EN adaptation workflow is per-app; complicates collection schemas.  
**Instead:** Content stays in each app's `src/content/`.

### Anti-Pattern 5: Astro Dependencies at Monorepo Root Only

**What:** Single root `package.json` with `astro` hoisted.  
**Why bad:** Vercel clean install breaks; Astro monorepo troubleshooting explicitly requires deps in each app ([Astro troubleshooting](https://docs.astro.build/en/guides/troubleshooting/#adding-dependencies-to-astro-in-a-monorepo)).  
**Instead:** Full `astro` + `@astrojs/*` in each `apps/*/package.json`.

### Anti-Pattern 6: Cross-Language Canonical

**What:** EN page canonical points to CS original.  
**Why bad:** Google treats EN as duplicate; kills EN indexing.  
**Instead:** Self-referencing canonical on every page; use hreflang for relationship.

---

## Scalability Considerations

| Concern | MVP (8 EN articles) | Growth (50+ EN articles) | Large (full guide mirror) |
|---------|---------------------|--------------------------|---------------------------|
| Pairing maintenance | Manual `pairs.ts` edits | Same — consider script to generate manifest from `pairId` front matter | Manifest generator + CI diff |
| Build time | <2 min per app | Turbo cache + filtered builds | Content sharding unlikely needed |
| `@vd/shared` change | Rebuilds both apps | Acceptable | Version shared package if needed |
| hreflang | 9 paired pages | Scale linearly | Only paired pages — never global |
| Categories | CS full system; EN tags only | EN category pages when >20 posts | Separate `categories.en.ts` |
| Search | Not needed | Optional Pagefind per app | Per-app index |

---

## Migration from Current Root Layout

Current brownfield is a single Astro app at repo root. Recommended extraction order minimizes risk:

```text
1. packages/shared  ← utils, plugins (no behavior change)
2. apps/vzhurudolu  ← move entire src/, astro.config, public (byte-identical output)
3. Verify FTP/Vercel parity for Czech only
4. apps/michalek-dev ← new; imports shared components
5. content-pairing manifest ← add with first EN pilot
6. Retire root src/ when both apps build
```

Keep root `package.json` scripts as aliases during transition:

```json
{
  "scripts": {
    "dev:cs": "turbo dev --filter=vzhurudolu",
    "dev:en": "turbo dev --filter=michalek-dev",
    "build": "turbo build"
  }
}
```

---

## Phase-Specific Architecture Flags

| Roadmap Phase | Architecture Focus | Research Depth |
|---------------|-------------------|----------------|
| Monorepo scaffold | Workspace wiring, dep placement, turbo pipeline | Standard — follow Astro monorepo troubleshooting |
| packages/shared extraction | Plugin factory, component props, static assets | Standard |
| michalek-dev app | `guide` collection, `/martin`, EN site.config | Standard |
| Content pairing | Manifest schema, validator, hreflang | **Needs phase research** — pilot pair URL finalization |
| Vercel cutover | Two projects, env, redirects | Covered in STACK.md / PITFALLS.md |
| Lighthouse hardening | Shared CSS weight, per-app font strategy | Per-app audit |

---

## Sources

| Source | Confidence | Used For |
|--------|------------|----------|
| [Astro i18n — domains](https://docs.astro.build/en/guides/internationalization) | HIGH | Confirmed `i18n.domains` requires SSR — rejected for this project |
| [Astro monorepo troubleshooting](https://docs.astro.build/en/guides/troubleshooting/#adding-dependencies-to-astro-in-a-monorepo) | HIGH | Per-app dependency declaration |
| [Astro workspace packages](https://docs.astro.build/en/guides/integrations) | HIGH | Workspace + package exports pattern |
| [Astro on Vercel](https://vercel.com/docs/frameworks/frontend/astro) | HIGH | Static deploy, avoid vercel.json rewrites |
| [Vercel monorepo deploy](https://vercel.com/docs/monorepos) | HIGH | Two projects, root directory per app |
| [jnalewajk.me — Astro i18n guide](https://jnalewajk.me/en/blog/i18n-in-astro-complete-guide/) | MEDIUM | `translationKey` pattern (adapted to cross-domain manifest) |
| [DEV — trilingual Astro hreflang](https://dev.to/clarencyuboop/how-i-built-a-trilingual-astro-site-for-indian-card-games-and-what-i-learned-about-i18n-seo-164h) | MEDIUM | Bidirectional hreflang cluster rules |
| Existing codebase `.planning/codebase/ARCHITECTURE.md` | HIGH | Brownfield component map, data flows |
| `.planning/PROJECT.md` | HIGH | Scope: `/guide/`, separate domains, 8 pilots |

---

*Architecture research: 2026-06-06*
