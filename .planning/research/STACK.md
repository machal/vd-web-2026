# Technology Stack

**Project:** Martin Michálek · Web & Performance (michalek.dev) + Vzhůru dolů monorepo  
**Researched:** 2026-06-06  
**Scope:** Stack dimension for monorepo refactor, dual-site Vercel deploy, shared Markdown pipeline, Lighthouse 100/100

---

## Executive Recommendation

**Use npm workspaces + Turborepo on Astro 4.16.19 (pinned), two Vercel projects from one repo, shared packages for Markdown/Vite/UI — zero framework islands, zero `@astrojs/vercel` adapter.**

This is the lowest-risk path for a brownfield Astro 4 codebase that already uses npm and `package-lock.json`. Turborepo adds build orchestration and Vercel-native caching without forcing a package-manager migration. Astro 5/6 upgrade is a separate milestone — not bundled with monorepo cutover.

| Decision | Choice | Confidence |
|----------|--------|------------|
| Framework | Astro **4.16.19** (static SSG) | **HIGH** |
| Package manager | **npm workspaces** (keep existing lockfile) | **HIGH** |
| Build orchestrator | **Turborepo 2.9.x** | **HIGH** |
| Hosting | **Vercel** — 2 projects, 1 repo | **HIGH** |
| Client JS | **None** on michalek.dev; minimal legacy on vzhurudolu | **HIGH** |
| Astro upgrade | Defer to post-monorepo phase | **MEDIUM** |

---

## Recommended Stack

### Core Framework

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| **Astro** | **4.16.19** (exact pin) | SSG for both sites | Latest Astro 4.x; matches existing codebase and PROJECT constraint ("Stay on Astro 4 SSG"). Astro 6.4.4 is current but Content Layer migration + content config rewrite adds scope to an already risky monorepo move. | **HIGH** |
| **Vite** | 5.4.x (bundled with Astro 4) | Dev server, bundling | Comes with Astro; custom image/validation plugins already built on Vite API. | **HIGH** |
| **Node.js** | **22.x** (Vercel + local) | Build runtime | Vercel default in 2026; existing CI uses Node 20 — upgrade during monorepo migration. Astro 4 supports Node 18+. | **HIGH** |
| **TypeScript** | **5.9.x** | Shared packages, plugins | Existing remark/rehype plugins are `.ts`; add `packages/tsconfig` base config. Apps can stay `.mjs` initially. | **HIGH** |

### Monorepo Tooling

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| **npm workspaces** | npm 10.x (ships with Node 22) | Package linking | Brownfield: `package-lock.json` already exists; Astro docs explicitly support `workspaces` in root `package.json`. Zero lockfile-format migration. | **HIGH** |
| **Turborepo** | **2.9.16** | Build graph, caching, CI | Not a package manager — orchestrates `build`/`dev` across apps. Vercel auto-detects `turbo.json` and runs filtered builds. Community Astro monorepos (Wumty, Astro Fleet, casoon templates) standardize on Turborepo + workspaces. | **HIGH** |
| **tsup** | **8.5.x** | Build shared TS packages | Compiles `packages/*` to ESM before Astro consumes them. Required on Astro 5+ for config-linked packages; good practice on Astro 4 too. | **MEDIUM** |

#### Monorepo Structure

```
/
├── package.json              # workspaces: ["apps/*", "packages/*"]
├── package-lock.json
├── turbo.json
├── apps/
│   ├── vzhurudolu/           # vzhurudolu.cz (Czech, full legacy)
│   └── michalek-dev/         # michalek.dev (English, lean)
└── packages/
    ├── tsconfig/             # @vd/tsconfig — shared TS bases
    ├── markdown/             # @vd/markdown — remark/rehype plugins + shiki config
    ├── vite-plugins/         # @vd/vite-plugins — image pipeline, frontmatter validation
    ├── astro-config/         # @vd/astro-config — factory: createAstroConfig({ site, plugins })
    └── ui/                   # @vd/ui — shared layouts, components, CSS tokens
```

**Package naming:** `@vd/*` namespace (e.g. `@vd/markdown`, `@vd/vzhurudolu`).

#### Root `package.json` (essential fields)

```json
{
  "name": "vd-monorepo",
  "private": true,
  "workspaces": ["apps/*", "packages/*"],
  "packageManager": "npm@10.9.4",
  "scripts": {
    "dev": "turbo run dev",
    "build": "turbo run build",
    "dev:vzhurudolu": "turbo run dev --filter=@vd/vzhurudolu",
    "dev:michalek-dev": "turbo run dev --filter=@vd/michalek-dev",
    "build:vzhurudolu": "turbo run build --filter=@vd/vzhurudolu",
    "build:michalek-dev": "turbo run build --filter=@vd/michalek-dev"
  },
  "devDependencies": {
    "turbo": "^2.9.16",
    "typescript": "^5.9.3"
  },
  "engines": {
    "node": ">=22"
  }
}
```

#### `turbo.json`

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

The `^build` dependency ensures shared packages compile before apps build.

---

### npm workspaces vs pnpm vs Turborepo — Decision Matrix

| Option | Verdict | Rationale |
|--------|---------|-----------|
| **npm workspaces + Turborepo** | **✅ Recommended** | Lowest migration friction from single-package npm repo. Vercel natively supports npm workspaces for "skip unaffected projects" (Feb 2025 default). Astro troubleshooting docs cover npm monorepos. |
| **pnpm workspaces + Turborepo** | ⚠️ Defer | Better disk efficiency and `catalog:` for version pinning (used in astro-v5/v6 templates). Requires lockfile migration (`pnpm import`), CI rewrite, and team tooling change — scope creep for a milestone that already moves deploy + structure. Consider for a later hygiene phase. |
| **Turborepo alone** | ❌ N/A | Turborepo is not a package manager; it requires workspaces underneath. |
| **npm workspaces alone (no Turbo)** | ⚠️ Acceptable for MVP | Works for 2 apps, but no task caching, no `dependsOn` graph, manual `npm run build -w @vd/...` scripts. Turbo adds ~30 min setup, saves CI time immediately. |
| **Nx** | ❌ Avoid | Enterprise monorepo tool; heavy config for 2 static sites + 4 packages. Overkill. |
| **Lerna** | ❌ Avoid | Largely superseded by Turborepo (same org). No benefit over Turbo for this scale. |
| **Yarn Berry (PnP)** | ❌ Avoid | Astro docs warn about PnP issues; requires `nodeLinker: node-modules` workaround. |

**Confidence:** **HIGH** — verified against [Astro monorepo troubleshooting](https://docs.astro.build/en/guides/troubleshooting/#adding-dependencies-to-astro-in-a-monorepo), [Vercel monorepo docs](https://vercel.com/docs/monorepos), Turborepo + Vercel integration guides.

---

### Vercel Dual-Site Deploy

| Setting | vzhurudolu project | michalek-dev project |
|---------|-------------------|---------------------|
| **Root Directory** | `apps/vzhurudolu` | `apps/michalek-dev` |
| **Framework Preset** | Astro (auto-detected) | Astro (auto-detected) |
| **Build Command** | `cd ../.. && npx turbo run build --filter=@vd/vzhurudolu` | `cd ../.. && npx turbo run build --filter=@vd/michalek-dev` |
| **Output Directory** | `dist` (default) | `dist` (default) |
| **Install Command** | default (`npm install` from repo root) | default |
| **Node.js Version** | 22.x | 22.x |
| **Production Domain** | `www.vzhurudolu.cz` | `michalek.dev` |
| **Include source files outside Root Directory** | **Enabled** | **Enabled** |
| **Skip unaffected projects** | **Enabled** (default for new projects since Feb 2025) | **Enabled** |

#### Why two Vercel projects (not one project with rewrites)

Each site is a separate brand, domain, and deploy lifecycle. Vercel's standard monorepo pattern is **one project per app directory**, same Git repo ([Vercel monorepo docs](https://vercel.com/docs/monorepos)). Cross-domain rewrites add latency, complicate caching headers, and break independent preview URLs.

#### Static deploy — no adapter

Both sites use `output: 'static'`. Vercel deploys static Astro with **zero configuration** — no `@astrojs/vercel` adapter needed ([Astro Vercel deploy guide](https://docs.astro.build/en/guides/deploy/vercel/)). Adapters are only for SSR/on-demand rendering.

#### `vercel.json` per app (replace `.htaccess`)

Apache redirects in `public/.htaccess` do not apply on Vercel. Each app gets its own `vercel.json`:

```json
{
  "trailingSlash": false,
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" }
      ]
    },
    {
      "source": "/assets/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    }
  ],
  "redirects": []
}
```

Migrate `.htaccess` redirect rules into `apps/vzhurudolu/vercel.json` incrementally; michalek.dev starts clean.

#### CI/CD replacement

Remove GitHub Actions FTP deploy (`.github/workflows/deploy-ftp.yml`). Vercel Git integration replaces it: push to `main` → production deploy for both projects; PR → preview URLs per project.

**Optional:** GitHub Action for Lighthouse CI on PR previews (not blocking MVP).

**Confidence:** **HIGH** — Vercel official docs + Astro deploy guide.

---

### Markdown Pipeline (Shared remark/rehype)

| Library | Version | Purpose | Confidence |
|---------|---------|---------|------------|
| **remark-gfm** | **4.0.1** | GFM tables, strikethrough, task lists | **HIGH** |
| **rehype-raw** | **7.0.0** | Raw HTML passthrough (legacy content uses `markdown="1"`) | **HIGH** |
| **unified** | 11.x (transitive) | Plugin pipeline runtime | **HIGH** |
| **unist-util-visit** | **5.1.0** | AST traversal in custom plugins | **HIGH** |
| **@types/mdast** | **4.0.4** | TypeScript types for remark plugins | **HIGH** |
| **Shiki** | via Astro built-in | Syntax highlighting, `css-variables` theme | **HIGH** |

#### Package: `@vd/markdown`

Export shared plugins currently in `src/utils/`:

| Plugin | Shared? | Notes |
|--------|---------|-------|
| `remarkGfm` | ✅ | Identical both sites |
| `remarkNormalizeCodeLang` | ✅ | Shiki lang aliases |
| `remarkProcessMarkdownAttributes` | ✅ | `markdown="1"` legacy pattern |
| `remarkPriruckaImages` | ⚠️ Parameterized | Accept `{ assetPrefix: '/prirucka' \| '/guide' }` |
| `rehypeRaw` | ✅ | Required for legacy HTML |
| `rehypeHeadingAnchors` | ✅ | TOC anchor links |
| `rehypeRemoveFirstH1` | ✅ | Layout provides H1 |
| `rehypeRemoveEbookOnly` | ✅ vzhurudolu only | Omit from michalek-dev config |
| `rehypePriruckaLinks` | ⚠️ Parameterized | `{ basePath: '/prirucka' \| '/guide' }` |
| `rehypePriruckaImages` | ⚠️ Parameterized | Path prefix differs |
| `rehypeConnectedElements` | ✅ vzhurudolu | Include if EN guide uses same patterns |
| `rehypeRelatedToInnerBox` | ✅ vzhurudolu | Same |

Factory pattern in `@vd/astro-config`:

```typescript
// packages/astro-config/create-markdown-config.ts
import { baseRemarkPlugins, baseRehypePlugins } from '@vd/markdown';

export function createMarkdownConfig(opts: {
  guidePath: '/prirucka' | '/guide';
  includeEbookOnly?: boolean;
}) {
  return {
    shikiConfig: { theme: 'css-variables', langAlias: { /* shared */ } },
    remarkPlugins: [
      ...baseRemarkPlugins,
      remarkGuideImages({ prefix: opts.guidePath }),
    ],
    remarkRehype: { allowDangerousHtml: true },
    rehypePlugins: [
      ...baseRehypePlugins,
      rehypeGuideLinks({ basePath: opts.guidePath }),
      ...(opts.includeEbookOnly ? [rehypeRemoveEbookOnly] : []),
    ],
  };
}
```

#### Astro monorepo plugin consumption

Per [Astro troubleshooting — monorepo dependencies](https://docs.astro.build/en/guides/troubleshooting/#adding-dependencies-to-astro-in-a-monorepo):

1. Declare `@vd/markdown` as dependency in each app's `package.json` (`"@vd/markdown": "*"`).
2. Build `@vd/markdown` to ESM (`dist/`) before Astro dev/build (`turbo.json` `^build`).
3. If importing TS source directly (dev shortcut), add to `vite.ssr.noExternal`:

```javascript
// astro.config.mjs
export default defineConfig({
  vite: {
    ssr: { noExternal: ['@vd/markdown', '@vd/vite-plugins', '@vd/ui'] },
  },
});
```

**Do not** import remark plugins from root `node_modules` only — each workspace package must declare its own dependencies.

**Confidence:** **HIGH** for architecture; **MEDIUM** for parameterized plugin refactor effort (existing plugins hardcode `/prirucka` paths).

---

### Content & Data

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| **Astro Content Collections (legacy API)** | Astro 4 built-in | Blog, guide, podcast schemas | Existing `src/content/config.ts` with Zod schemas works on Astro 4. Keep legacy API until deliberate Astro 5+ upgrade. | **HIGH** |
| **Zod** | 3.x (Astro 4 bundled) | Front matter validation | Already in use; extend schemas for EN fields (`lang`, `translationOf`, `originalUrl`). | **HIGH** |
| **@astrojs/rss** | **4.0.18** | RSS feeds | Already used; one feed per app. | **HIGH** |
| **Custom sitemap integration** | existing | Sitemap generation | Keep custom sitemap — `@astrojs/sitemap` was disabled due to `undefined.reduce()` bug. Re-evaluate on Astro upgrade. | **HIGH** |
| **markdown-it** | **14.1.0** | RSS full-content HTML | Keep for RSS rendering only; not in page pipeline. | **HIGH** |
| **sanitize-html** | **2.17.x** | RSS HTML sanitization | Already in use. | **HIGH** |

#### michalek.dev content collections

| Collection | Route | Notes |
|------------|-------|-------|
| `blog` | `/blog/[slug]` | EN adapted articles |
| `guide` | `/guide/[slug]` | EN guide (not `prirucka`) |
| `pages` | `/martin`, legal | Data or content collection |

Add schema fields: `lang: 'en'`, `translationOf?: string` (slug of CZ original), `alternateUrl?: string`.

---

### Image Pipeline

| Technology | Version | Purpose | Confidence |
|---------|---------|---------|------------|
| **sharp** | **0.34.5** | WebP conversion | **HIGH** — existing Vite plugins depend on it |
| **svgo** | **3.3.2** | SVG optimization | **HIGH** |
| **chokidar** | **3.6.0** | Dev-time file watching | **HIGH** |

Move `vite-plugin-*.ts` files to `@vd/vite-plugins`. Apps pass `{ collections: ['blog', 'guide'] }` config. michalek-dev skips prirucka-specific image paths.

Use `<img>` with explicit `width`/`height`, `loading="lazy"`, `decoding="async"`. Astro `<Image />` component optional — existing Sharp pipeline already produces WebP; migrating to `@astrojs/image` adds integration weight without clear gain on Astro 4.

---

### Performance / Minimal JS (Lighthouse 100/100)

| Rule | Implementation | Confidence |
|------|----------------|------------|
| **Zero framework islands** | No `@astrojs/react`, `@astrojs/vue`, etc. Pure `.astro` components. Codebase already has zero `client:*` directives. | **HIGH** |
| **No jQuery on michalek.dev** | vzhurudolu keeps legacy `jquery` + `@superkoders/modal` temporarily; EN site ships **zero** client bundles for MVP. | **HIGH** |
| **No service worker** | Drop AMP `sw.js` on michalek.dev. Evaluate removal on vzhurudolu during migration. | **HIGH** |
| **CSS-only interactions** | Mobile nav toggle, language switch → `<details>/<summary>` or checkbox hack; no JS required. | **HIGH** |
| **Self-hosted fonts** | `font-display: swap`; preload only primary woff2. Avoid Google Fonts CDN (GDPR + extra connection). | **HIGH** |
| **Critical CSS** | Single CSS bundle per layout; Astro scoped styles in components. No CSS-in-JS. | **HIGH** |
| **No analytics JS in MVP** | Defer Plausible/Fathom to post-launch; third-party scripts are the #1 Lighthouse killer. | **HIGH** |
| **Cookie consent** | CSS-only banner or `<details>` for MVP; no OneTrust/Cookiebot script. Link to privacy policy. | **MEDIUM** |
| **Third-party embeds** | No YouTube iframe on pilot articles; use link + thumbnail image instead. | **HIGH** |

Target metrics: **100 Performance, 100 Accessibility, 100 Best Practices, 100 SEO** on michalek.dev homepage, `/martin`, and one blog + one guide article.

---

### Supporting Libraries

| Library | Version | App | Purpose | Confidence |
|---------|---------|-----|---------|------------|
| `normalize.css` | **8.0.1** | both (via `@vd/ui`) | CSS reset | **HIGH** |
| `@playwright/test` | **1.52.x** | root devDep | Optional E2E smoke tests post-migration | **LOW** — not in MVP |

---

## What NOT to Use (and Why)

| Technology | Why Not |
|------------|---------|
| **Astro 5/6 upgrade during monorepo migration** | Content Layer API rewrite (`content.config.ts`, `glob()` loaders, `slug` → `id`) is a second large migration. PROJECT constraint: stay on Astro 4. Bundle = double risk. |
| **@astrojs/vercel adapter** | Static output only. Adapter adds SSR machinery, serverless functions, and JS bundle analysis complexity — opposite of performance goal. |
| **@astrojs/react, vue, svelte, solid** | No interactive islands needed. Framework runtimes cost 40–85 KB gzip each. |
| **@astrojs/mdx** | Existing content is Markdown with raw HTML. MDX adds JSX compilation + `@astrojs/mdx` dep for no MVP benefit. |
| **@astrojs/sitemap (official)** | Disabled in production due to bug. Custom sitemap works. |
| **Tailwind CSS** | Not in existing stack; SCSS + CSS custom properties already established. Adding Tailwind = new toolchain for both sites. |
| **pnpm migration (same milestone)** | Lockfile rewrite + CI changes compete with monorepo structure + Vercel cutover. |
| **Nx, Lerna, Rush** | Over-engineered for 2 static sites. |
| **Headless CMS (Sanity, Contentful)** | File-based Markdown + Cursor workflow is the content pipeline. CMS adds cost, latency, and JS. |
| **Cloudflare Pages / Netlify (instead of Vercel)** | PROJECT decision: Vercel. Both support Astro static equally well, but switching hosts adds decision churn. |
| **Webpack / Rollup bundling for site JS** | Legacy `vrdl.webpack.js` pattern. michalek.dev: no bundled JS at all. |
| **Google Fonts CDN** | Extra connection, GDPR concern for EU audience. Self-host. |
| **Cookie consent SaaS (Cookiebot, OneTrust)** | Heavy third-party JS. Minimal GDPR banner suffices for MVP. |

---

## Alternatives Considered

| Category | Recommended | Alternative | Why Not Alternative |
|----------|-------------|-------------|---------------------|
| Package manager | npm workspaces | pnpm workspaces | Existing `package-lock.json`; lower migration risk |
| Build orchestrator | Turborepo | None (raw npm `-w`) | No caching, no dependency graph, slower CI |
| Astro version | 4.16.19 | 5.x / 6.x | Content Layer migration; PROJECT constraint |
| Hosting | Vercel (2 projects) | 1 Vercel project + rewrites | Separate domains/brands need separate projects |
| Vercel adapter | None (static) | @astrojs/vercel | SSR not needed |
| Client interactivity | `.astro` + CSS | Preact islands | Zero JS goal; no interactivity needed on MVP pages |
| Image optimization | Sharp Vite plugins (existing) | @astrojs/image | Already built and working; avoid duplicate pipeline |
| Sitemap | Custom integration | @astrojs/sitemap | Known bug in current codebase |
| Monorepo scope | 4–5 shared packages | Single shared package | Markdown plugins, Vite plugins, UI, and config have distinct build needs and release cadences |

---

## Installation & Bootstrap

```bash
# 1. Root monorepo tooling
npm install -D turbo@^2.9.16 typescript@^5.9.3

# 2. Per shared package (example: @vd/markdown)
npm install -w packages/markdown \
  remark-gfm@^4.0.1 \
  unist-util-visit@^5.1.0
npm install -D -w packages/markdown \
  tsup@^8.5.0 \
  @types/mdast@^4.0.4 \
  typescript@^5.9.3

# 3. Per app (example: michalek-dev)
npm install -w apps/michalek-dev \
  astro@4.16.19 \
  @astrojs/rss@^4.0.18 \
  @vd/markdown \
  @vd/vite-plugins \
  @vd/ui \
  @vd/astro-config

# 4. Pin Astro exactly in apps (prevent accidental major bump)
# apps/*/package.json → "astro": "4.16.19" (no caret)
```

---

## Version Pinning Policy

| Package | Pin strategy | Reason |
|---------|-------------|--------|
| `astro` | **Exact** `4.16.19` | Prevent accidental 5.x install |
| `turbo` | Caret `^2.9.16` | Safe minor updates |
| `sharp` | Caret `^0.34.5` | Native bindings; test on upgrade |
| Shared `@vd/*` | `workspace:*` (npm) | Always use local monorepo version |

---

## Astro Upgrade Path (Post-Monorepo)

Defer to a dedicated milestone after Vercel cutover stabilizes:

| Target | When | Key work |
|--------|------|----------|
| **Astro 5.x** | After monorepo stable | Content Layer API, `content.config.ts` move, `glob()` loaders, `render()` import change |
| **Astro 6.x** | After Astro 5 stable | Legacy content collections removed entirely; Vite Environment API |

Use `npx @astrojs/upgrade` per official guides. Upgrade both apps simultaneously — shared packages depend on one Astro version.

**Confidence:** **HIGH** for sequencing; **MEDIUM** for timeline (Astro 6 is current as of June 2026).

---

## Sources

| Source | URL | Used for | Confidence |
|--------|-----|----------|------------|
| Astro Vercel deploy guide | https://docs.astro.build/en/guides/deploy/vercel/ | Static deploy, no adapter | **HIGH** |
| Astro monorepo troubleshooting | https://docs.astro.build/en/guides/troubleshooting/ | Workspaces, `vite.ssr.noExternal` | **HIGH** |
| Astro client directives | https://docs.astro.build/en/reference/directives-reference/ | Zero-JS strategy | **HIGH** |
| Astro v5 upgrade guide | https://docs.astro.build/en/guides/upgrade-to/v5/ | Defer upgrade rationale | **HIGH** |
| Astro v6 upgrade guide | https://docs.astro.build/en/guides/upgrade-to/v6/ | Future path | **HIGH** |
| Vercel monorepo docs | https://vercel.com/docs/monorepos | Dual-project setup, skip builds | **HIGH** |
| Vercel changelog (Feb 2025) | https://vercel.com/changelog/new-monorepo-projects-now-skip-builds-with-unchanged-code-by-default | Skip unaffected projects default | **HIGH** |
| Turborepo Vercel CI reference | https://github.com/vercel/turborepo/blob/main/skills/turborepo/references/ci/vercel.md | Build commands, turbo-ignore | **MEDIUM** |
| npm registry (live) | `npm view` on 2026-06-06 | Current package versions | **HIGH** |
| Existing codebase | `.planning/codebase/STACK.md`, `astro.config.mjs`, `package.json` | Brownfield constraints | **HIGH** |
| PROJECT.md | `.planning/PROJECT.md` | Requirements, Astro 4 constraint | **HIGH** |
| Wumty Astro monorepo | https://wumty.com/blog/build-15-client-sites-one-codebase-astro-monorepo/ | Monorepo patterns | **MEDIUM** |
| Astro Fleet (DEV) | https://dev.to/varinder_singh_c541dcb059/how-to-manage-multiple-websites-from-one-astro-monorepo-23h4 | Shared UI pattern | **MEDIUM** |

---

*Stack research complete: 2026-06-06*
