# Phase 1: Monorepo Foundation & CI - Context

**Gathered:** 2026-06-06
**Status:** Ready for planning

<domain>
## Phase Boundary

Restructure the brownfield Astro monolith into an npm workspaces + Turborepo layout so the Czech site builds reliably from `apps/vzhurudolu`. This phase delivers workspace structure, Turborepo orchestration, per-app dependency declarations, and draft/unpublished content exclusion from production output. Shared package extraction, English app implementation, Vercel migration, and full dual-app PR CI are out of scope — they belong in Phases 2, 5, 4, and 5 respectively.

</domain>

<decisions>
## Implementation Decisions

### Monorepo Cutover Strategy
- **D-01:** Big-bang move — relocate the entire current codebase (`src/`, `public/`, `astro.config.mjs`, root `vite-plugin-*.ts`, `scripts/`) into `apps/vzhurudolu` in a single migration. No half-migrated dual-root state.
- **D-02:** Vite plugins and markdown utilities stay inside `apps/vzhurudolu` for Phase 1. Phase 2 extracts them to `packages/*`; do not pre-extract in Phase 1.
- **D-03:** Root `package.json` becomes workspace orchestrator only (`turbo`, shared dev tooling). No app runtime dependencies at root.

### Workspace Scaffolding
- **D-04:** Create full workspace skeleton per MONO-01: `apps/vzhurudolu` (working), `apps/michalek-dev` (minimal placeholder with `package.json` name `@vd/michalek-dev`, no build target yet), `packages/` directory present but empty except optional `.gitkeep`.
- **D-05:** Package naming uses `@vd/*` namespace (e.g. `@vd/vzhurudolu`, `@vd/michalek-dev`). Shared packages (`@vd/markdown`, `@vd/vite-plugins`, etc.) are named in research but not created until Phase 2.
- **D-06:** Pin Astro to **4.16.19** (exact) in `apps/vzhurudolu/package.json`. No Astro 5/6 upgrade during migration.

### Dependency Management (MONO-04)
- **D-07:** `apps/vzhurudolu` declares its own `astro`, `@astrojs/*`, `sharp`, and all runtime/build deps — no reliance on root hoisting for Astro packages.
- **D-08:** Root declares only orchestration devDependencies: `turbo`, `typescript`. Use `engines.node: ">=22"` at root.
- **D-09:** Keep existing `package-lock.json` at repo root (npm workspaces). Do not migrate to pnpm.

### Turborepo Configuration (MONO-02)
- **D-10:** `turbo.json` with `build` task (`dependsOn: ["^build"]`, `outputs: ["dist/**"]`) and `dev` task (`cache: false`, `persistent: true`).
- **D-11:** Filter commands for local dev and CI: `turbo run build --filter=@vd/vzhurudolu`, `turbo run dev --filter=@vd/vzhurudolu`.
- **D-12:** Phase 1 turbo pipeline builds only `@vd/vzhurudolu`. Placeholder `@vd/michalek-dev` has no `build` script yet.

### Draft Exclusion (VD-02)
- **D-13:** Fix known bug: filter `getStaticPaths()` in blog (and all collection routes) on `entry.data.published === true`. Draft posts with `postStatus: Draft` must not generate static pages.
- **D-14:** Apply same `published` filter consistently across homepage listing, paginated pages, category pages, RSS feed (`src/pages/rss.ts`), and custom sitemap (`src/utils/custom-sitemap.ts`).
- **D-15:** Ebook/prirucka files with `published: false` follow the same exclusion rules — no pages, no sitemap entries, no RSS.
- **D-16:** No separate CI draft-leak check in Phase 1 — build-time filtering is sufficient. If a draft page appears in `dist/`, the build itself is the guardrail.

### CI Guardrails (Phase 1 scope)
- **D-17:** Add GitHub Actions workflow: on PR to protected branch, run `npm ci && turbo run build --filter=@vd/vzhurudolu`. This is Czech-only CI; dual-app PR CI waits for Phase 5 (MONO-05).
- **D-18:** Keep existing FTP deploy workflow on push to `main`/`master` until Phase 4 Vercel cutover — update its paths to build from `apps/vzhurudolu` after monorepo move.
- **D-19:** Upgrade CI Node.js from 20 to **22** during Phase 1 migration (aligns with research and Vercel 2026 defaults).
- **D-20:** Keep existing Gitleaks secret-scan workflow unchanged.

### Branch & Development Workflow
- **D-21:** Continue development on `michalek-dev` branch per PROJECT.md. Monorepo restructure happens on this branch.
- **D-22:** Czech site must produce identical output after move — URL parity verification is Phase 3, but Phase 1 must not break the build.

### Claude's Discretion
- Exact file move mapping (which root files stay at root vs move to app) — planner/researcher decides based on Astro monorepo best practices.
- Whether to add root `tsconfig.json` in Phase 1 or defer — recommended yes, but not a hard requirement.
- Turbo cache configuration for CI — local + remote cache setup left to planner.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project & Requirements
- `.planning/PROJECT.md` — Monorepo vision, constraints (Astro 4, npm workspaces, Czech-first)
- `.planning/REQUIREMENTS.md` — MONO-01, MONO-02, MONO-04, VD-02 requirement definitions
- `.planning/ROADMAP.md` — Phase 1 goal, success criteria, dependency chain

### Research & Stack Decisions
- `.planning/research/STACK.md` — npm workspaces + Turborepo recommendation, `@vd/*` naming, monorepo directory structure, Node 22, Astro 4.16.19 pin
- `.planning/research/ARCHITECTURE.md` — Target monorepo architecture patterns
- `.planning/research/PITFALLS.md` — Known migration risks

### Codebase Maps
- `.planning/codebase/STACK.md` — Current single-package stack (Astro 4.16.19, npm, Node 20 CI)
- `.planning/codebase/ARCHITECTURE.md` — Current build pipeline, content collections, deploy flow
- `.planning/codebase/INTEGRATIONS.md` — GitHub Actions FTP deploy, secret-scan workflows
- `.planning/codebase/CONCERNS.md` — Draft blog bug (getStaticPaths without published filter), duplicated helpers

### Existing Code (migration source)
- `package.json` — Current root dependencies and scripts
- `astro.config.mjs` — Site config, markdown pipeline, Vite plugins
- `src/content/config.ts` — Zod schemas with `published` transform logic
- `.github/workflows/deploy-ftp.yml` — Current CI/deploy pipeline to update paths for
- `.github/workflows/secret-scan.yml` — Existing secret scanning

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `astro.config.mjs` — Full Astro + Vite plugin config moves intact to `apps/vzhurudolu/`
- `src/content/config.ts` — Published/draft logic already in Zod transforms; needs route-level filtering, not schema rewrite
- `vite-plugin-*.ts` — Image pipeline, frontmatter validation; stay in app until Phase 2 extraction
- `.github/workflows/deploy-ftp.yml` — Existing CI pattern to adapt (change build cwd, keep FTP logic)

### Established Patterns
- Static SSG with `output: 'static'` — no server adapter needed
- Content collections with Zod schemas — blog, podcast, prirucka
- Custom sitemap (`src/utils/custom-sitemap.ts`) replaces broken `@astrojs/sitemap`
- `published: false` for ebook subdirs in prirucka — same exclusion pattern as drafts

### Integration Points
- Root `package.json` → workspace root with turbo scripts
- `apps/vzhurudolu/package.json` → inherits all current app deps
- GitHub Actions → build path changes from repo root to filtered turbo target
- FTP deploy → `dist/` output path remains `apps/vzhurudolu/dist/` after build

</code_context>

<specifics>
## Specific Ideas

- User skipped interactive discussion — all decisions derived from PROJECT.md, REQUIREMENTS.md, research, and codebase analysis.
- Czech-first sequencing: monorepo structure before shared packages, before English app, before Vercel.
- Fix the draft leak bug documented in CONCERNS.md as part of VD-02 — this is a known production issue today.

</specifics>

<deferred>
## Deferred Ideas

- **Shared package extraction** (`@vd/markdown`, `@vd/vite-plugins`, `@vd/ui`) — Phase 2 (MONO-03)
- **English app scaffold** — Phase 5 (EN-01)
- **Dual-app PR CI** — Phase 5 (MONO-05)
- **Vercel migration & vercel.json** — Phase 4 (VD-03)
- **FTP workflow removal** — Phase 9 (DEPLOY-03)
- **Output parity verification** — Phase 3 (VD-01)
- **Package granularity decision** (`@vd/markdown` vs monolithic `@vd/shared`) — Phase 2 planning
- **ESLint/Prettier CI** — not in Phase 1 scope; noted in CONCERNS.md as future hygiene

</deferred>

---

*Phase: 01-Monorepo Foundation & CI*
*Context gathered: 2026-06-06*
