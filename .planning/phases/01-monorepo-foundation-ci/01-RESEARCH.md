# Phase 1: Monorepo Foundation & CI - Research

**Researched:** 2026-06-06
**Domain:** npm workspaces + Turborepo monorepo migration; Astro 4 SSG; draft content exclusion; GitHub Actions CI
**Confidence:** HIGH

## Summary

Phase 1 is a **brownfield structural migration**: the entire working Astro 4 site moves from repo root into `apps/vzhurudolu`, wrapped in npm workspaces and Turborepo, with Czech-only PR CI and an updated FTP deploy path. No shared-package extraction, no English app build, no Vercel cutover — those stay in later phases per locked CONTEXT decisions.

The migration is mechanically straightforward because the current codebase is a single-package Astro app with all runtime code under `src/`, `public/`, root Vite plugins, and `scripts/`. The highest-risk areas are (1) **dependency hoisting** — Astro and every `@astrojs/*` integration must live in `apps/vzhurudolu/package.json`, not root; (2) **cwd-relative paths** — all four Vite plugins and `astro.config.mjs` use `process.cwd()` / relative paths and must run with cwd = `apps/vzhurudolu`; (3) **draft leak bug** — `blog/[slug].astro` and `podcast/[slug].astro` generate static pages for all entries regardless of `published`, while listings mostly filter correctly.

**Primary recommendation:** Big-bang move per D-01 into `apps/vzhurudolu`, scaffold root workspace + `turbo.json`, declare all Astro deps in the app package, fix draft filtering at `getStaticPaths` + shared helper, add PR CI with `npm ci && turbo run build --filter=@vd/vzhurudolu`, update FTP `local-dir` to `./apps/vzhurudolu/dist/`.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

#### Monorepo Cutover Strategy
- **D-01:** Big-bang move — relocate the entire current codebase (`src/`, `public/`, `astro.config.mjs`, root `vite-plugin-*.ts`, `scripts/`) into `apps/vzhurudolu` in a single migration. No half-migrated dual-root state.
- **D-02:** Vite plugins and markdown utilities stay inside `apps/vzhurudolu` for Phase 1. Phase 2 extracts them to `packages/*`; do not pre-extract in Phase 1.
- **D-03:** Root `package.json` becomes workspace orchestrator only (`turbo`, shared dev tooling). No app runtime dependencies at root.

#### Workspace Scaffolding
- **D-04:** Create full workspace skeleton per MONO-01: `apps/vzhurudolu` (working), `apps/michalek-dev` (minimal placeholder with `package.json` name `@vd/michalek-dev`, no build target yet), `packages/` directory present but empty except optional `.gitkeep`.
- **D-05:** Package naming uses `@vd/*` namespace (e.g. `@vd/vzhurudolu`, `@vd/michalek-dev`). Shared packages (`@vd/markdown`, `@vd/vite-plugins`, etc.) are named in research but not created until Phase 2.
- **D-06:** Pin Astro to **4.16.19** (exact) in `apps/vzhurudolu/package.json`. No Astro 5/6 upgrade during migration.

#### Dependency Management (MONO-04)
- **D-07:** `apps/vzhurudolu` declares its own `astro`, `@astrojs/*`, `sharp`, and all runtime/build deps — no reliance on root hoisting for Astro packages.
- **D-08:** Root declares only orchestration devDependencies: `turbo`, `typescript`. Use `engines.node: ">=22"` at root.
- **D-09:** Keep existing `package-lock.json` at repo root (npm workspaces). Do not migrate to pnpm.

#### Turborepo Configuration (MONO-02)
- **D-10:** `turbo.json` with `build` task (`dependsOn: ["^build"]`, `outputs: ["dist/**"]`) and `dev` task (`cache: false`, `persistent: true`).
- **D-11:** Filter commands for local dev and CI: `turbo run build --filter=@vd/vzhurudolu`, `turbo run dev --filter=@vd/vzhurudolu`.
- **D-12:** Phase 1 turbo pipeline builds only `@vd/vzhurudolu`. Placeholder `@vd/michalek-dev` has no `build` script yet.

#### Draft Exclusion (VD-02)
- **D-13:** Fix known bug: filter `getStaticPaths()` in blog (and all collection routes) on `entry.data.published === true`. Draft posts with `postStatus: Draft` must not generate static pages.
- **D-14:** Apply same `published` filter consistently across homepage listing, paginated pages, category pages, RSS feed (`src/pages/rss.ts`), and custom sitemap (`src/utils/custom-sitemap.ts`).
- **D-15:** Ebook/prirucka files with `published: false` follow the same exclusion rules — no pages, no sitemap entries, no RSS.
- **D-16:** No separate CI draft-leak check in Phase 1 — build-time filtering is sufficient. If a draft page appears in `dist/`, the build itself is the guardrail.

#### CI Guardrails (Phase 1 scope)
- **D-17:** Add GitHub Actions workflow: on PR to protected branch, run `npm ci && turbo run build --filter=@vd/vzhurudolu`. This is Czech-only CI; dual-app PR CI waits for Phase 5 (MONO-05).
- **D-18:** Keep existing FTP deploy workflow on push to `main`/`master` until Phase 4 Vercel cutover — update its paths to build from `apps/vzhurudolu` after monorepo move.
- **D-19:** Upgrade CI Node.js from 20 to **22** during Phase 1 migration (aligns with research and Vercel 2026 defaults).
- **D-20:** Keep existing Gitleaks secret-scan workflow unchanged.

#### Branch & Development Workflow
- **D-21:** Continue development on `michalek-dev` branch per PROJECT.md. Monorepo restructure happens on this branch.
- **D-22:** Czech site must produce identical output after move — URL parity verification is Phase 3, but Phase 1 must not break the build.

### Claude's Discretion
- Exact file move mapping (which root files stay at root vs move to app) — planner/researcher decides based on Astro monorepo best practices.
- Whether to add root `tsconfig.json` in Phase 1 or defer — recommended yes, but not a hard requirement.
- Turbo cache configuration for CI — local + remote cache setup left to planner.

### Deferred Ideas (OUT OF SCOPE)
- **Shared package extraction** (`@vd/markdown`, `@vd/vite-plugins`, `@vd/ui`) — Phase 2 (MONO-03)
- **English app scaffold** — Phase 5 (EN-01)
- **Dual-app PR CI** — Phase 5 (MONO-05)
- **Vercel migration & vercel.json** — Phase 4 (VD-03)
- **FTP workflow removal** — Phase 9 (DEPLOY-03)
- **Output parity verification** — Phase 3 (VD-01)
- **Package granularity decision** (`@vd/markdown` vs monolithic `@vd/shared`) — Phase 2 planning
- **ESLint/Prettier CI** — not in Phase 1 scope; noted in CONCERNS.md as future hygiene
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| MONO-01 | npm workspaces with `apps/vzhurudolu`, `apps/michalek-dev`, `packages/*` | File move inventory + root `package.json` workspaces config; placeholder app scaffold |
| MONO-02 | Turborepo orchestrates builds with per-app filter commands | `turbo.json` tasks; filter `--filter=@vd/vzhurudolu`; CI/deploy commands |
| MONO-04 | Each app declares its own `astro` and `@astrojs/*` deps | Astro monorepo troubleshooting: deps in each project's `package.json` [CITED: docs.astro.build] |
| VD-02 | Draft/unpublished excluded from build output and sitemap | Draft touchpoint audit; `getStaticPaths` fix; sitemap derives from built pages |
</phase_requirements>

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Workspace structure (apps/packages) | Repo root (`package.json`, `turbo.json`) | — | npm workspaces and Turborepo live at monorepo root |
| Astro build & content SSG | `apps/vzhurudolu` | CDN/FTP (deploy) | All pages, collections, plugins are app-local in Phase 1 |
| Draft/unpublished filtering | `apps/vzhurudolu` (build-time routes) | — | Static SSG — no runtime middleware on production |
| PR CI build gate | GitHub Actions (repo root `.github/`) | Turborepo filter | CI orchestrates install + filtered build; does not contain app logic |
| FTP production deploy | GitHub Actions | FTP server | Push-to-main workflow uploads `apps/vzhurudolu/dist/` |
| Shared packages | — (Phase 2) | — | `packages/` empty in Phase 1 |
| English app | — (Phase 5) | — | Placeholder only |

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| **Astro** | **4.16.19** (exact pin) | Czech SSG app | Locked D-06; matches current codebase [VERIFIED: npm registry] |
| **npm workspaces** | npm **10.9.4** (Node 22) | Package linking | Brownfield: existing `package-lock.json`; Astro supports workspaces [CITED: docs.astro.build] |
| **Turborepo** | **2.9.16** | Build graph, CI filters | Standard for npm monorepos; Vercel-native [VERIFIED: npm registry] |
| **Node.js** | **22.x** | Build runtime | Locked D-19; local env has v22.21.1 [VERIFIED: local probe] |
| **TypeScript** | **5.9.x** (6.0.3 latest) | Root + app typing | Existing `.ts` plugins; root `typescript` per D-08 [VERIFIED: npm registry] |

### Supporting (stay in `apps/vzhurudolu/package.json`)

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `@astrojs/rss` | ^4.0.15 (current) | RSS feed | Already in use at `src/pages/rss.ts` |
| `sharp` | ^0.33.0 → pin ^0.34.5 | Image pipeline | Vite plugins depend on it |
| `remark-gfm`, `rehype-raw` | current | Markdown pipeline | Registered in `astro.config.mjs` |
| `@astrojs/sitemap` | ^3.4.0 | — | Installed but disabled; keep in app deps until cleanup PR |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| npm workspaces + Turbo | pnpm workspaces | Lower migration friction with existing lockfile (D-09) |
| Turborepo | raw `npm run -w` | No task graph/caching; slower CI |
| Turbo remote cache | local cache only | Remote optional in Phase 1 (Claude's discretion) |

**Installation:**

```bash
# Root (orchestration only)
npm install -D turbo@^2.9.16 typescript@^5.9.3

# App inherits current deps — move from root package.json, pin astro exactly:
# apps/vzhurudolu/package.json → "astro": "4.16.19"
npm install -w @vd/vzhurudolu
```

**Version verification (2026-06-06):**

```bash
npm view turbo version          # 2.9.16
npm view astro@4.16.19 version # 4.16.19
npm view typescript version     # 6.0.3
node --version                  # v22.21.1 (local)
npm --version                   # 10.9.4 (local)
```

## Package Legitimacy Audit

> slopcheck unavailable at research time (install failed in sandbox). All packages tagged `[ASSUMED]` — planner must gate install behind `checkpoint:human-verify` if required.

| Package | Registry | Age | Downloads | Source Repo | slopcheck | Disposition |
|---------|----------|-----|-----------|-------------|-----------|-------------|
| `turbo` | npm | ~4 yrs | very high | github.com/vercel/turborepo | n/a | Approved [ASSUMED] — no postinstall script [VERIFIED: npm registry] |
| `typescript` | npm | mature | very high | github.com/microsoft/TypeScript | n/a | Approved [ASSUMED] |

**Packages removed due to slopcheck [SLOP] verdict:** none (slopcheck not run)
**Packages flagged as suspicious [SUS]:** none

*Phase 1 adds only `turbo` and `typescript` at root. All other deps move from existing root `package.json` to app — already in use, not new installs.*

## Architecture Patterns

### System Architecture Diagram

```text
┌─────────────────────────────────────────────────────────────────────────┐
│                         REPO ROOT (orchestration)                        │
│  package.json (workspaces) · package-lock.json · turbo.json               │
│  .github/workflows/ (PR CI + FTP deploy + secret-scan)                  │
└───────────────────────────────┬─────────────────────────────────────────┘
                                │
                    turbo run build --filter=@vd/vzhurudolu
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                      apps/vzhurudolu (@vd/vzhurudolu)                    │
├──────────────────┬──────────────────────┬───────────────────────────────┤
│  astro.config.mjs│  src/pages/          │  vite-plugin-*.ts             │
│  src/content/    │  getStaticPaths      │  scripts/                     │
│  src/utils/      │  (published filter)  │  (maintenance)                │
│  public/         │                      │                               │
└────────┬─────────┴──────────┬───────────┴───────────────┬───────────────┘
         │                    │                           │
         ▼                    ▼                           ▼
┌─────────────────────────────────────────────────────────────────────────┐
│              Markdown pipeline · custom-sitemap · RSS                    │
└─────────────────────────────────────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                    apps/vzhurudolu/dist/                                 │
└─────────────────────────────────────────────────────────────────────────┘
         │
         ▼ (push main/master)
┌─────────────────────────────────────────────────────────────────────────┐
│  GitHub Actions deploy-ftp.yml → FTP upload (excludes data/, files/)    │
└─────────────────────────────────────────────────────────────────────────┘

apps/michalek-dev (@vd/michalek-dev) — placeholder package.json only (Phase 5)
packages/ — empty (.gitkeep)
```

### Exact File Move Inventory

#### MOVE → `apps/vzhurudolu/` (D-01, D-02)

| Path | Notes |
|------|-------|
| `src/` | Entire tree: pages, components, layouts, content, utils, assets, `middleware.ts`, `env.d.ts` |
| `public/` | Static assets (~685 MB); includes `public/favicon/`, `.htaccess`, `robots.txt` |
| `astro.config.mjs` | Site config; update nothing except verify relative imports still resolve |
| `vite-plugin-content-images.ts` | Uses `process.cwd()` — must run with app as cwd |
| `vite-plugin-design-images.ts` | Same |
| `vite-plugin-prirucka-images.ts` | Same |
| `vite-plugin-validate-frontmatter.ts` | Resolves `src/content` relative to cwd |
| `scripts/` | All 10 maintenance scripts; wire via app `package.json` scripts |

#### STAY at repo root

| Path | Notes |
|------|-------|
| `package.json` | Becomes workspace orchestrator (D-03) |
| `package-lock.json` | Regenerated after workspace restructure (D-09) |
| `turbo.json` | New |
| `tsconfig.json` | Recommended: root base + `apps/vzhurudolu/tsconfig.json` extending Astro strict |
| `.github/` | Workflows updated for monorepo paths |
| `.planning/`, `.cursor/` | Project meta |
| `.gitignore`, `.gitleaks.toml`, `.stylelintrc` | Repo hygiene |
| `README.md`, `SECURITY.md`, `docs/` | Repo documentation |
| `_import/`, `_working/` | Gitignored working dirs (`.gitignore`) |
| `.env` | Gitignored; move to `apps/vzhurudolu/.env` if app-specific, or keep at root with env loading audit |

#### DO NOT MOVE / CLEAN UP (planner discretion)

| Path | Notes |
|------|-------|
| `dist/` | Build artifact — delete root `dist/` after migration; output → `apps/vzhurudolu/dist/` |
| `.astro/` | Astro cache — per-app at `apps/vzhurudolu/.astro/` |
| `node_modules/` | Root hoisted; reinstall after workspace setup |
| `favicon/` (root) | **Duplicate** of `public/favicon/` — same files exist in both. URLs serve from `/favicon/` via `public/`. Do **not** move separately; audit and delete root duplicate if confirmed unused |
| `grunt/` | Legacy; not referenced in `package.json` — leave at root or delete in cleanup (out of Phase 1 scope unless blocking) |

#### NEW files (scaffold)

| Path | Purpose |
|------|---------|
| `apps/vzhurudolu/package.json` | `"name": "@vd/vzhurudolu"`, all current app deps, scripts |
| `apps/michalek-dev/package.json` | `"name": "@vd/michalek-dev"`, no `build` script |
| `packages/.gitkeep` | Empty packages dir (D-04) |
| `.github/workflows/pr-build.yml` (or similar) | PR CI (D-17) |

### Recommended Project Structure

```text
/
├── package.json                 # workspaces, turbo scripts, engines.node >=22
├── package-lock.json
├── turbo.json
├── tsconfig.json                # optional base (recommended)
├── apps/
│   ├── vzhurudolu/
│   │   ├── package.json         # astro 4.16.19 exact + all @astrojs/* + deps
│   │   ├── astro.config.mjs
│   │   ├── tsconfig.json        # extends astro/tsconfigs/strict
│   │   ├── vite-plugin-*.ts
│   │   ├── scripts/
│   │   ├── public/
│   │   └── src/
│   └── michalek-dev/
│       └── package.json         # placeholder only
├── packages/
│   └── .gitkeep
└── .github/workflows/
    ├── deploy-ftp.yml           # updated paths + Node 22
    ├── pr-build.yml             # new
    └── secret-scan.yml          # unchanged
```

### Pattern 1: Root Workspace Orchestrator

**What:** Root owns workspaces + Turbo; apps own runtime deps.
**When to use:** Always — locked D-03, D-07, D-08.

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

### Pattern 2: App-Local Astro Dependencies (MONO-04)

**What:** Every Astro integration declared in `apps/vzhurudolu/package.json`.
**When to use:** Always for Astro monorepos [CITED: docs.astro.build/en/guides/troubleshooting].

```json
{
  "name": "@vd/vzhurudolu",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview"
  },
  "dependencies": {
    "@astrojs/rss": "^4.0.15",
    "astro": "4.16.19"
  },
  "devDependencies": {
    "@astrojs/sitemap": "^3.4.0",
    "sharp": "^0.33.0",
    "chokidar": "^3.6.0",
    "remark-gfm": "^4.0.0",
    "tsx": "^4.7.0"
  }
}
```

Phase 2 note: when `@vd/*` workspace packages are added, configure `vite.ssr.noExternal` per Astro monorepo docs [CITED: docs.astro.build].

### Pattern 3: Published-Entry Filter (VD-02)

**What:** Single helper; strict `published === true` everywhere.
**When to use:** All `getStaticPaths`, listings, RSS, related articles.

```typescript
// apps/vzhurudolu/src/utils/is-published.ts
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

Schema already sets `published: false` for `postStatus: Draft` in `src/content/config.ts` (blog/podcast transform). Prirucka uses explicit `published: false` for ebook subdirs.

### Pattern 4: GitHub Actions Monorepo Build

**PR CI (new):**

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
```

**FTP deploy (update existing):**

```yaml
# Key changes from current deploy-ftp.yml:
# node-version: '22'
# npm ci && npx turbo run build --filter=@vd/vzhurudolu
# local-dir: ./apps/vzhurudolu/dist/
```

Per `.cursor/rules/astro-build.md`: verify `dist/_astro/` exists after build before deploy.

### Anti-Patterns to Avoid

- **Root-only `astro` dependency:** Breaks Vercel/clean CI installs [CITED: PITFALLS.md Pitfall 2]
- **Running build from repo root without Turbo filter:** Vite plugins resolve wrong paths via `process.cwd()`
- **Half-migrated state:** Keeping `src/` at root while adding `apps/` — violates D-01
- **Pre-extracting packages in Phase 1:** Violates D-02; highest regression risk per PITFALLS Pitfall 9
- **`published !== false` instead of `=== true`:** Inconsistent with D-13; fails if schema transform changes

## Draft / Unpublished Filtering — Touchpoint Audit (VD-02)

### Schema source (no change needed)

`src/content/config.ts` transforms:
- **blog/podcast:** `published: data.published !== false && data.postStatus !== 'Draft'`
- **prirucka:** boolean/`'Publikováno'` → `published` boolean

Confirmed draft: `src/content/blog/115-google-speed-https.md` has `postStatus: Draft`.

### Touchpoints — action required

| File | Current behavior | Fix |
|------|------------------|-----|
| `src/pages/blog/[slug].astro` | `getCollection('blog')` — **no filter** | Filter `isPublished` in `getStaticPaths` |
| `src/pages/podcast/[slug].astro` | `getCollection('podcast')` — **no filter** | Filter `isPublished` in `getStaticPaths` |
| `src/pages/rss.ts` | blog/podcast: `published !== false` | Change to `published === true` |
| `src/utils/get-related-articles.ts` | blog/podcast: unfiltered `getCollection` | Add published filter |
| `src/pages/index.astro` | blog/podcast: `published !== false` in filter | Align to `published === true` |
| `src/pages/[...page].astro` | same as index | Align to `published === true` |
| `src/pages/[category].astro` | mixed filter in render | Align collection loads + filters |
| `src/pages/[category]/[...page].astro` | mixed | Align |

### Touchpoints — already correct

| File | Behavior |
|------|----------|
| `src/pages/prirucka/[slug].astro` | `published === true` + id required |
| `src/pages/prirucka/index.astro` | `published === true` |
| `src/pages/prirucka/[...page].astro` | `published === true` |
| `src/pages/blog/index.astro` | `published !== false` (OK for drafts; align to `=== true`) |
| `src/pages/blog/[...page].astro` | `published !== false` (align) |
| `src/pages/podcast/index.astro` | `published !== false` (align) |
| `src/pages/podcast/[...page].astro` | `published !== false` (align) |

### Sitemap (indirect + verify)

`src/utils/custom-sitemap.ts` builds from Astro's `pages` list in `astro:build:done` hook — **no explicit published filter**. Fixing `getStaticPaths` removes draft URLs from built pages, which removes them from sitemap automatically (D-16). No sitemap code change strictly required; optional belt-and-suspenders filter on pathname patterns is out of scope unless drafts still appear after fix.

Verification command after fix:

```bash
# Must NOT exist in dist after build:
test ! -f apps/vzhurudolu/dist/blog/115-google-speed-https/index.html
grep -q '115-google-speed-https' apps/vzhurudolu/dist/sitemap.xml && exit 1 || true
```

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Monorepo task orchestration | Custom shell scripts per app | Turborepo + npm workspaces | Caching, `dependsOn`, CI filters [CITED: turbo.build] |
| Workspace package linking | Manual symlinks | npm `workspaces` | Lockfile-aware, standard |
| Draft detection CI job | Separate crawl of git vs dist | Fix `getStaticPaths` + build gate | D-16: build is the guardrail |
| Sitemap generation | New sitemap library | Keep `custom-sitemap.ts` | `@astrojs/sitemap` disabled due to bug |

**Key insight:** Phase 1 is structural — reuse existing Astro app verbatim inside `apps/vzhurudolu`; only add workspace wiring, CI, and draft filters.

## Common Pitfalls

### Pitfall 1: Vite Plugins Break on Wrong cwd

**What goes wrong:** Image/validation plugins use `process.cwd()` for `src/content`, `public/`. Build from repo root finds no content.
**Why it happens:** Legacy single-package assumption.
**How to avoid:** Turbo runs task in package directory; app `build` script is `astro build` in `apps/vzhurudolu`; never `astro build` from root without `--cwd`.
**Warning signs:** Empty dist, missing prirucka pages, frontmatter validation passes 0 files.

### Pitfall 2: Astro Deps Hoisted to Root Only

**What goes wrong:** Clean `npm ci` on CI can't resolve `@astrojs/rss` from app directory.
**Why it happens:** Declaring deps only at root.
**How to avoid:** D-07 — full dep list in `apps/vzhurudolu/package.json` [CITED: docs.astro.build].
**Warning signs:** Build works locally from root, fails in CI or Vercel.

### Pitfall 3: FTP Deploy Still Points at Root dist/

**What goes wrong:** Deploy uploads stale/empty root `dist/` after migration.
**How to avoid:** Update `local-dir: ./apps/vzhurudolu/dist/` in `deploy-ftp.yml` (D-18).
**Warning signs:** Deploy succeeds but site unchanged or empty.

### Pitfall 4: Draft Pages Still Reachable

**What goes wrong:** `/blog/115-google-speed-https` returns 200 in production.
**How to avoid:** Fix `blog/[slug].astro` and `podcast/[slug].astro` getStaticPaths (D-13).
**Warning signs:** Draft URLs in sitemap.xml or direct HTTP 200.

### Pitfall 5: lockfile Not Regenerated

**What goes wrong:** Workspace packages not linked; missing deps after move.
**How to avoid:** After scaffolding, run `npm install` at root to rewrite `package-lock.json` with workspace entries.
**Warning signs:** `npm ci` fails with ERESOLVE or missing workspace links.

## Code Examples

### Filtered getStaticPaths (blog)

```typescript
// Source: Phase pattern; aligns with D-13
import { getCollection } from 'astro:content';
import { isPublished } from '../../utils/is-published';

export async function getStaticPaths() {
  const blogPosts = await getCollection('blog', isPublished);
  return blogPosts.map((post) => ({
    params: { slug: post.slug },
    props: { post },
  }));
}
```

### turbo.json

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

Source: [CITED: turbo.build/docs/guides/workspaces] — use `tasks` not legacy `pipeline` (Turbo 2.x).

### Astro monorepo dependency rule

From Astro troubleshooting [CITED: docs.astro.build/en/guides/troubleshooting]:

> When working with Astro in a monorepo setup, project dependencies should be added in each project's own `package.json` file.

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Single package at root | npm workspaces + Turborepo | Phase 1 (this) | CI filters, future EN app |
| Node 20 in CI | Node 22 | Phase 1 (D-19) | Aligns with Vercel 2026 default |
| No PR build gate | Turbo filtered PR CI | Phase 1 (D-17) | Catch breaks before merge |
| Draft pages generated | `published === true` filter | Phase 1 (VD-02) | Fixes production leak |

**Deprecated/outdated:**
- Root-level `npm run build` as primary entry — replace with `turbo run build --filter=@vd/vzhurudolu`
- Turbo 1.x `pipeline` key — use `tasks` in Turbo 2.9.x

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | Turbo runs app tasks with cwd = package directory | Pitfall 1 | Vite plugins resolve wrong paths |
| A2 | Root `favicon/` is duplicate of `public/favicon/` | File inventory | Redundant copy if moved twice |
| A3 | Fixing getStaticPaths is sufficient for sitemap draft exclusion | Draft audit | Draft URLs remain in sitemap if Astro lists unpublished routes elsewhere |
| A4 | `npm install` at root correctly hoists + links workspace packages | Standard Stack | lockfile/workspace link failures |

## Open Questions

1. **Root `tsconfig.json` in Phase 1?**
   - What we know: No tsconfig today; recommended in Claude's discretion.
   - Recommendation: Add minimal root + app `tsconfig.json` extending `astro/tsconfigs/strict` — low cost, helps Phase 2 package extraction.

2. **Turbo remote cache in CI?**
   - What we know: Discretion left to planner; not required for 1-app build.
   - Recommendation: Local cache only in Phase 1; remote cache optional when EN app adds second build target (Phase 5).

3. **`.env` location after move**
   - What we know: Root `.env` exists (gitignored).
   - Recommendation: Move to `apps/vzhurudolu/.env` if any app code reads env vars; audit grep for `import.meta.env` — currently minimal in static SSG.

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js 22 | CI, local dev, D-19 | ✓ | v22.21.1 | — |
| npm 10.x | workspaces | ✓ | 10.9.4 | — |
| GitHub Actions | PR CI, FTP deploy | ✓ | — | — |
| FTP server secrets | deploy-ftp.yml | ✓ (assumed) | — | Block deploy only |
| turbo (npm) | MONO-02 | not installed yet | 2.9.16 registry | `npm install -D turbo` at root |

**Missing dependencies with no fallback:** none blocking Phase 1 planning

**Missing dependencies with fallback:** none

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | **None** — zero `*.test.*` / `*.spec.*` files in repo |
| Config file | none — Wave 0 gap |
| Quick run command | `npx turbo run build --filter=@vd/vzhurudolu` |
| Full suite command | same (only build gate in Phase 1) |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| MONO-01 | Workspace layout builds | integration | `npm ci && npx turbo run build --filter=@vd/vzhurudolu` | ❌ Wave 0 (CI workflow) |
| MONO-02 | Turbo filter builds Czech app only | integration | `npx turbo run build --filter=@vd/vzhurudolu` | ❌ Wave 0 (turbo.json) |
| MONO-04 | App declares own astro deps | manual/structural | `node -e "require('./apps/vzhurudolu/package.json').dependencies.astro"` | ❌ Wave 0 |
| VD-02 | Draft blog not in dist | smoke | `test ! -e apps/vzhurudolu/dist/blog/115-google-speed-https/index.html` | ❌ Wave 0 (script in CI) |
| VD-02 | Draft not in sitemap | smoke | `! grep -q '115-google-speed-https' apps/vzhurudolu/dist/sitemap.xml` | ❌ Wave 0 |

### Sampling Rate

- **Per task commit:** `npx turbo run build --filter=@vd/vzhurudolu`
- **Per wave merge:** same + draft smoke grep (above)
- **Phase gate:** PR CI green + manual spot-check draft URL 404 on preview/deploy

### Wave 0 Gaps

- [ ] `.github/workflows/pr-build.yml` — PR build gate (MONO-01, MONO-02, D-17)
- [ ] `turbo.json` — task graph (MONO-02)
- [ ] `apps/vzhurudolu/package.json` — app deps (MONO-04)
- [ ] Draft exclusion smoke script or CI step (VD-02) — shell grep acceptable for Phase 1
- [ ] Optional: `vitest` + unit test for `isPublished()` — not required by D-16 but improves Phase 2 safety

## Security Domain

### Applicable ASVS Categories

| ASVS Category | Applies | Standard Control |
|---------------|---------|-----------------|
| V2 Authentication | no | N/A — static public site |
| V3 Session Management | no | N/A |
| V4 Access Control | no | N/A |
| V5 Input Validation | yes | Zod schemas in `src/content/config.ts`; frontmatter validation plugin |
| V6 Cryptography | no | N/A for this phase |

### Known Threat Patterns

| Pattern | STRIDE | Standard Mitigation |
|---------|--------|---------------------|
| Secrets in repo | Information Disclosure | Existing Gitleaks workflow (D-20, unchanged) |
| Raw HTML in markdown | Tampering (content integrity) | Trusted authors only; `allowDangerousHtml` accepted risk [from CONCERNS.md] |
| FTP cleartext credentials | Information Disclosure | Out of Phase 1 scope; FTPS noted in CONCERNS.md |
| Draft content exposure | Information Disclosure | VD-02 build-time filtering |

## Project Constraints (from .cursor/rules/)

| Rule file | Directive | Phase 1 impact |
|-----------|-----------|----------------|
| `astro-build.md` | `dist/_astro/` must be deployed | Verify after build in `apps/vzhurudolu/dist/_astro/`; FTP path update |
| `cleanup-warnings.md` | Warn before deleting temp scripts | Note if migration leaves verification scripts |
| `content-*.md`, `no-inline-css.md` | Content/CSS conventions | No change in Phase 1 (structural only) |
| `archiv-public-data-files.md` | Legacy `public/data/` handling | Unchanged; FTP still excludes `data/`, `files/` |

## Sources

### Primary (HIGH confidence)

- [VERIFIED: npm registry] — `turbo@2.9.16`, `astro@4.16.19`, `typescript@6.0.3` via `npm view` 2026-06-06
- [CITED: docs.astro.build/en/guides/troubleshooting] — monorepo deps in each project's package.json
- [CITED: turbo.build/docs/guides/workspaces] — monorepo structure, root turbo.json, workspaces
- [CITED: turbo.build/docs/core-concepts/package-and-task-graph] — `dependsOn: ["^build"]`, filter semantics
- Existing codebase — `package.json`, `astro.config.mjs`, `src/pages/**`, `src/content/config.ts`, `.github/workflows/deploy-ftp.yml`
- `.planning/phases/01-monorepo-foundation-ci/01-CONTEXT.md` — locked decisions
- `.planning/codebase/CONCERNS.md` — draft bug, CI gap, hoisting risk

### Secondary (MEDIUM confidence)

- `.planning/research/STACK.md` — version pins, turbo.json template
- `.planning/research/PITFALLS.md` — Pitfalls 2, 16, 25 (hoisting, drafts, PR CI)
- `.planning/codebase/ARCHITECTURE.md` — current build pipeline

### Tertiary (LOW confidence)

- Community Astro+Turbo monorepo examples — patterns only, not verified against this codebase

## Metadata

**Confidence breakdown:**
- Standard stack: **HIGH** — npm/turbo/astro versions verified; Astro monorepo rule cited from official docs
- Architecture: **HIGH** — file inventory from live repo listing; move scope locked in CONTEXT
- Pitfalls: **HIGH** — cwd and hoisting risks confirmed in vite plugins + Astro docs + CONCERNS
- Draft filtering: **HIGH** — grep audit of all `getCollection` call sites complete

**Research date:** 2026-06-06
**Valid until:** 2026-07-06 (stable stack); re-verify turbo patch releases if CI fails
