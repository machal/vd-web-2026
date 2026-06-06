# Walking Skeleton — Vzhůru dolů Monorepo

**Phase:** 1
**Generated:** 2026-06-06

## Capability Proven End-to-End

A developer runs `npm install` at the repo root and `npx turbo run build --filter=@vd/vzhurudolu` to produce a complete Czech static site in `apps/vzhurudolu/dist/` — the same SSG output path the FTP deploy workflow uploads to production.

## Phase Goal

**As a** developer maintaining vzhurudolu.cz, **I want to** build the Czech site from the monorepo with CI guardrails, **so that** structural changes do not break production deploys or leak draft content.

## Architectural Decisions

| Decision | Choice | Rationale |
|---|---|---|
| Monorepo tool | npm workspaces + Turborepo 2.9.x | Brownfield lockfile (D-09); filter commands for CI/Vercel (MONO-02) |
| Package namespace | `@vd/*` | Locked D-05; shared packages named in Phase 2 |
| Czech app location | `apps/vzhurudolu` | Big-bang move per D-01; no dual-root half-migration |
| English app | `apps/michalek-dev` placeholder only | D-04, D-12; real scaffold in Phase 5 |
| Shared packages | `packages/` empty (`.gitkeep`) | D-02; extraction in Phase 2 (MONO-03) |
| Framework | Astro **4.16.19** exact pin | D-06; no Astro 5/6 during migration |
| Dependency placement | Astro + `@astrojs/*` in app `package.json` only | MONO-04; Astro monorepo troubleshooting rule |
| Root `package.json` | Orchestration only (`turbo`, `typescript`) | D-03, D-08 |
| Node.js | **22.x** (local + CI) | D-19; aligns with Vercel 2026 default |
| Package manager | npm (root `package-lock.json`) | D-09; no pnpm migration |
| Build orchestration | `turbo run build --filter=@vd/vzhurudolu` | D-11; cwd = app package for Vite plugins |
| Draft exclusion | Build-time `published === true` filter | VD-02; static SSG has no runtime middleware |
| Production deploy (Phase 1) | GitHub Actions → FTP (`apps/vzhurudolu/dist/`) | D-18; Vercel cutover deferred to Phase 4 |
| PR CI | Czech-only turbo build on pull_request | D-17; dual-app CI deferred to Phase 5 (MONO-05) |
| Directory layout | See RESEARCH.md file move inventory | Vite plugins use `process.cwd()` — app root is cwd |

## Stack Touched in Phase 1

- [x] Project scaffold — npm workspaces, `apps/*`, `packages/*`, root orchestrator
- [x] Build pipeline — Turborepo task graph, Astro SSG in `apps/vzhurudolu`
- [x] Content routing — existing Astro pages/collections (moved verbatim)
- [x] CI — PR build workflow + updated FTP deploy paths
- [x] Deployment — FTP upload from `apps/vzhurudolu/dist/` (existing secrets)
- [ ] Shared packages — deferred Phase 2
- [ ] English app build — deferred Phase 5
- [ ] Vercel hosting — deferred Phase 4

## Out of Scope (Deferred to Later Slices)

- Shared package extraction (`@vd/markdown`, `@vd/vite-plugins`) — Phase 2
- Output parity verification vs production — Phase 3 (VD-01)
- Vercel migration and `vercel.json` — Phase 4 (VD-03)
- English app scaffold and dual-app PR CI — Phase 5 (EN-01, MONO-05)
- FTP workflow removal — Phase 9 (DEPLOY-03)
- ESLint/Prettier CI — future hygiene
- Turbo remote cache — optional when EN app adds second build target

## Subsequent Slice Plan

Each later phase adds capability on this skeleton without renegotiating layout decisions:

- **Phase 2:** Extract shared markdown pipeline and Vite plugins to `packages/*` (MONO-03)
- **Phase 3:** Verify Czech build output parity with live production (VD-01, VD-05)
- **Phase 4:** Vercel cutover for Czech site with redirect port (VD-03)
- **Phase 5:** English app scaffold + dual Vercel project config (EN-01, MONO-05)

## Artifacts This Phase Produces

| Artifact | Path | Purpose |
|----------|------|---------|
| Workspace root | `package.json`, `package-lock.json` | npm workspaces orchestrator |
| Turborepo config | `turbo.json` | Build task graph and cache outputs |
| Czech app | `apps/vzhurudolu/` | Full relocated Astro site |
| EN placeholder | `apps/michalek-dev/package.json` | MONO-01 workspace member |
| Packages dir | `packages/.gitkeep` | MONO-01 skeleton |
| Publish helper | `apps/vzhurudolu/src/utils/is-published.ts` | VD-02 centralized filter |
| PR CI | `.github/workflows/pr-build.yml` | D-17 build gate |
| FTP deploy | `.github/workflows/deploy-ftp.yml` (updated) | D-18 monorepo paths |
| Build verify script | `scripts/verify-phase1-build.sh` | Automated draft + dist smoke checks |
