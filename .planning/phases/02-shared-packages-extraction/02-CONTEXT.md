# Phase 2: Shared Packages Extraction - Context

**Gathered:** 2026-06-07
**Status:** Ready for planning

<domain>
## Phase Boundary

Extract shared infrastructure from `apps/vzhurudolu` into `packages/*` so the Czech site builds with identical content rendering and EN app (Phase 5) can import the same code. This phase delivers markdown pipeline, Vite plugins, layouts, and SEO helpers as shared packages — not content, not EN routes, not Vercel/dual-app CI, not content pairing.

</domain>

<decisions>
## Implementation Decisions

### Package Structure
- **D-01:** Single package `@vd/shared` at `packages/shared/` — not multiple packages (`@vd/markdown`, `@vd/ui`, etc.) in Phase 2. Internal folder structure with `exports` map subpaths (`markdown/`, `vite-plugins/`, `seo/`, `components/`).
- **D-02:** Rationale: only `@vd/vzhurudolu` builds today; multiple packages add turbo/import complexity without benefit until EN app exists. Splitting into granular packages deferred to Phase 5+ if build graph requires it.

### Extraction Scope
- **D-03:** Extract in Phase 2 (move-only):
  - 4× Vite plugins (`vite-plugin-*.ts`)
  - Markdown/remark/rehype utilities (~12 files in `src/utils/`)
  - SEO helpers (`custom-sitemap.ts` and related)
  - Shared layouts/components: `BaseLayout`, `Header`, `Footer`, `ArticleHeader`, `ArticleFooter`
- **D-04:** Keep in app: all content (`src/content/`), pages/routes (`src/pages/`), app-specific data (`categories.ts`), podcast/kurzy-specific logic.
- **D-05:** Dependency rule: `@vd/shared` never imports from `apps/*`. Apps import `@vd/shared` only.

### Path Parameterization
- **D-06:** Introduce factory pattern now: `createMarkdownConfig({ contentPathPrefix: '/prirucka' })` (or equivalent). Czech app passes `/prirucka`; EN app (Phase 5) will pass `/guide`. No behavior change for CS in Phase 2 — parameter defaults to current paths.
- **D-07:** Parameterize link resolution in markdown pipeline (e.g. `rehype-prirucka-links.ts`) — do not leave hardcoded CS-only paths that require a second migration in Phase 5.

### Build Strategy
- **D-08:** Source exports — no `tsup`/`tsc` compile step for `@vd/shared` in Phase 2. Astro/Vite consumes TS/Astro source directly.
- **D-09:** Each app adds `vite.ssr.noExternal: ['@vd/shared']` in `astro.config.mjs` per Astro monorepo workspace guidance.

### Migration Discipline
- **D-10:** Strict move-only — file moves + import path updates, zero behavior changes. No refactors, cleanups, or feature tweaks "while we're here."
- **D-11:** Visual/URL parity verification is Phase 3 (VD-01); Phase 2 must not break the build but full parity diff is out of scope.

### Carried Forward from Phase 1
- **D-12:** `@vd/*` namespace, npm workspaces (not pnpm), Astro **4.16.19** pinned in app `package.json`.
- **D-13:** Content stays app-local — never in `packages/shared`.

### Claude's Discretion
- Exact `exports` map structure in `packages/shared/package.json`
- Order of extraction plans (plugins first vs markdown first)
- Whether `is-published.ts` and `get-related-articles.ts` move to shared or stay app-local (app-specific filtering logic)
- `siteConfig` injection pattern for layouts (prop shape, config file location)

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project & Requirements
- `.planning/PROJECT.md` — Monorepo vision, `@vd/shared` intent, Astro 4 constraint
- `.planning/REQUIREMENTS.md` — MONO-03 requirement definition
- `.planning/ROADMAP.md` — Phase 2 goal, success criteria, dependency on Phase 1

### Phase 1 Context & Outcomes
- `.planning/phases/01-monorepo-foundation-ci/01-CONTEXT.md` — D-02 deferred extraction to Phase 2
- `.planning/phases/01-monorepo-foundation-ci/01-01-SUMMARY.md` through `01-04-SUMMARY.md` — Completed monorepo foundation

### Research & Architecture
- `.planning/research/ARCHITECTURE.md` — `@vd/shared` structure, dependency rules, extraction sequence (A1–A6)
- `.planning/research/STACK.md` — Source exports, `vite.ssr.noExternal`, package naming
- `.planning/research/PITFALLS.md` — Pitfall 9 (markdown pipeline regression), move-only discipline, `/prirucka` hardcoding

### Codebase Maps
- `.planning/codebase/ARCHITECTURE.md` — Current build pipeline, content collections
- `.planning/codebase/CONCERNS.md` — Duplicated helpers, draft filtering (fixed Phase 1)

### Extraction Source (apps/vzhurudolu)
- `apps/vzhurudolu/astro.config.mjs` — Markdown plugin registration, Vite plugins
- `apps/vzhurudolu/vite-plugin-*.ts` — 4 build plugins to extract
- `apps/vzhurudolu/src/utils/rehype-*.ts`, `remark-*.ts` — Markdown pipeline
- `apps/vzhurudolu/src/utils/custom-sitemap.ts` — SEO helper
- `apps/vzhurudolu/src/layouts/`, `apps/vzhurudolu/src/components/` — Layouts to extract (subset)

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets (extraction candidates)
- `apps/vzhurudolu/vite-plugin-content-images.ts`, `vite-plugin-design-images.ts`, `vite-plugin-prirucka-images.ts`, `vite-plugin-validate-frontmatter.ts` — self-contained Vite plugins using `process.cwd()`
- `apps/vzhurudolu/src/utils/rehype-prirucka-links.ts` — hardcoded `/prirucka` paths; needs factory parameterization (D-06)
- `apps/vzhurudolu/src/utils/custom-sitemap.ts` — custom sitemap replacing broken `@astrojs/sitemap`
- `apps/vzhurudolu/src/components/BaseLayout.astro`, `Header.astro`, `Footer.astro` — shared chrome for EN reuse

### Established Patterns
- Astro 4 SSG, content collections with Zod schemas stay in app
- `isPublished()` helper in app utils — strict `published === true` filtering (Phase 1)
- Turbo `dependsOn: ["^build"]` ready for when `@vd/shared` gets a build step (not needed with source exports)

### Integration Points
- `apps/vzhurudolu/astro.config.mjs` — imports switch from local paths to `@vd/shared/*`
- `apps/vzhurudolu/package.json` — add `"@vd/shared": "*"` workspace dependency
- `packages/shared/package.json` — new workspace member with `exports` map
- `turbo.json` — no change expected (source exports, no package build task)

</code_context>

<specifics>
## Specific Ideas

- User requested advisor recommendation rather than selecting gray areas individually — agreed to conservative single-package, move-only approach.
- Czech-first: parameterize paths now but CS behavior unchanged; EN consumes shared code in Phase 5.

</specifics>

<deferred>
## Deferred Ideas

- **Granular packages** (`@vd/markdown`, `@vd/vite-plugins`, `@vd/ui`) — split from `@vd/shared` only if needed in Phase 5+
- **Content pairing / hreflang / LanguageSwitch** — Phase 6 (I18N)
- **EN app scaffold and routes** — Phase 5
- **Shared static assets** (`packages/shared/static`) — defer until EN app needs shared CSS/fonts
- **Output parity verification** — Phase 3 (VD-01)
- **Dual-app PR CI** — Phase 5 (MONO-05)
- **tsup/tsc compile for shared package** — defer; source exports sufficient for Astro 4

</deferred>

---

*Phase: 02-Shared Packages Extraction*
*Context gathered: 2026-06-07*
