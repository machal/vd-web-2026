---
phase: 02-shared-packages-extraction
plan: 02
subsystem: infra
tags: [vite, monorepo, sharp, chokidar, svgo, shared-package]

requires:
  - phase: 02-shared-packages-extraction
    plan: 01
    provides: "@vd/shared scaffold, exports map, vite.ssr.noExternal wiring"
provides:
  - "Four Vite plugins in packages/shared/vite-plugins/"
  - "sharp/chokidar/svgo devDependencies in @vd/shared"
  - "astro.config.mjs imports from @vd/shared/vite-plugins/*"
affects:
  - 02-03-PLAN.md
  - 02-04-PLAN.md
  - 02-05-PLAN.md
  - Phase 5 English app (shared build plugins)

tech-stack:
  added: [sharp@^0.33.0, chokidar@^3.6.0, svgo@^3.3.2]
  patterns:
    - "Move-only Vite plugin extraction with process.cwd() resolving to app root during turbo build"
    - "Subpath exports @vd/shared/vite-plugins/* for build-time plugins"

key-files:
  created:
    - packages/shared/vite-plugins/vite-plugin-validate-frontmatter.ts
    - packages/shared/vite-plugins/vite-plugin-prirucka-images.ts
    - packages/shared/vite-plugins/vite-plugin-content-images.ts
    - packages/shared/vite-plugins/vite-plugin-design-images.ts
  modified:
    - packages/shared/package.json
    - apps/vzhurudolu/astro.config.mjs
    - package-lock.json
  deleted:
    - apps/vzhurudolu/vite-plugin-validate-frontmatter.ts
    - apps/vzhurudolu/vite-plugin-prirucka-images.ts
    - apps/vzhurudolu/vite-plugin-content-images.ts
    - apps/vzhurudolu/vite-plugin-design-images.ts

key-decisions:
  - "Move-only extraction per D-10 — plugin bodies unchanged, process.cwd() kept for app-root path resolution"
  - "vitePluginCopyPublicToDist stays inline in astro.config.mjs per RESEARCH"
  - "Plugin deps (sharp, chokidar, svgo) declared in @vd/shared devDependencies; vite remains peerDependency"

patterns-established:
  - "Shared Vite plugins import via @vd/shared/vite-plugins/* subpath exports"
  - "Build plugins run from workspace package while filesystem paths resolve to consuming app cwd"

requirements-completed: [MONO-03]

duration: 65min
completed: 2026-06-07
---

# Phase 2 Plan 02: Vite Plugins Extraction Summary

**Four Czech-site Vite plugins moved verbatim to @vd/shared with pinned image-tooling deps — build and verify gate green with no app-root duplicates**

## Performance

- **Duration:** 65 min (includes prior session Tasks 1–2)
- **Started:** 2026-06-07T11:35:00Z
- **Completed:** 2026-06-07T12:40:54Z
- **Tasks:** 3
- **Files modified:** 10

## Accomplishments

- Copied four Vite plugins verbatim to `packages/shared/vite-plugins/` with export names preserved
- Added `sharp`, `chokidar`, and `svgo` devDependencies to `@vd/shared/package.json`
- Updated `apps/vzhurudolu/astro.config.mjs` to import all four plugins from `@vd/shared/vite-plugins/*`
- Deleted original `apps/vzhurudolu/vite-plugin-*.ts` files — no stale local imports remain
- Verified `npm run build:vzhurudolu`, `npx turbo run build --filter=@vd/vzhurudolu`, and `scripts/verify-phase2-extraction.sh` pass

## Task Commits

1. **Task 1: Move Vite plugins verbatim to @vd/shared** - `901d2f6` (feat)
2. **Task 2: Wire astro.config.mjs to @vd/shared Vite plugins** - `f08c42a` (feat)
3. **Task 3: Delete app-root plugin originals** - `ff8f9b4` (feat)

## Files Created/Modified

- `packages/shared/vite-plugins/vite-plugin-validate-frontmatter.ts` - Frontmatter validation at buildStart
- `packages/shared/vite-plugins/vite-plugin-prirucka-images.ts` - Příručka image WebP conversion
- `packages/shared/vite-plugins/vite-plugin-content-images.ts` - Content image WebP conversion
- `packages/shared/vite-plugins/vite-plugin-design-images.ts` - Design SVG/raster optimization
- `packages/shared/package.json` - Added sharp/chokidar/svgo devDependencies
- `apps/vzhurudolu/astro.config.mjs` - Imports from @vd/shared/vite-plugins/*

## Decisions Made

- Move-only extraction per D-10 — no path resolution rewrites; `process.cwd()` resolves to app root during turbo build
- `vitePluginCopyPublicToDist` remains inline in astro.config.mjs (not extracted per RESEARCH)
- Image tooling deps pinned in @vd/shared per threat model T-02-04 mitigation

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

- `gsd-tools` CLI unavailable in environment — STATE.md and ROADMAP.md updated manually
- Verify script requires full dist output; sandbox ls check failed until turbo build ran with `--force`

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Vite plugin layer ready for EN app reuse in Phase 5
- Plan 02-03 can proceed with markdown pipeline extraction
- Stale-path assertions for vite plugins still commented in verify script (activation deferred to Plan 05 per 02-01)

## Self-Check: PASSED

- FOUND: packages/shared/vite-plugins/vite-plugin-validate-frontmatter.ts
- FOUND: packages/shared/vite-plugins/vite-plugin-content-images.ts
- FOUND: packages/shared/vite-plugins/vite-plugin-prirucka-images.ts
- FOUND: packages/shared/vite-plugins/vite-plugin-design-images.ts
- FOUND: commit 901d2f6
- FOUND: commit f08c42a
- FOUND: commit ff8f9b4
- MISSING app-root plugins: confirmed (expected)

---
*Phase: 02-shared-packages-extraction*
*Completed: 2026-06-07*
