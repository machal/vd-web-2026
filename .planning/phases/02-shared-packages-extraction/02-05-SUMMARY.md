---
phase: 02-shared-packages-extraction
plan: 05
subsystem: infra
tags: [monorepo, turbo, astro, @vd/shared, verify-script]

requires:
  - phase: 02-shared-packages-extraction
    provides: "@vd/shared package with plugins, markdown, SEO, layouts from plans 01-04"
provides:
  - Complete Phase 2 verify gate with stale-path negation
  - Deduped app devDependencies owned by @vd/shared
  - MONO-03 closure — zero stale extraction paths in Czech app
affects:
  - phase-03-czech-site-parity-verification
  - phase-05-english-app-scaffold

tech-stack:
  added: []
  patterns:
    - "verify-phase2-extraction.sh extends Phase 1 dist gate with stale-path asserts"
    - "App keeps content-local utils; shared infra imports exclusively from @vd/shared"

key-files:
  created: []
  modified:
    - scripts/verify-phase2-extraction.sh
    - apps/vzhurudolu/package.json
    - package-lock.json

key-decisions:
  - "Removed chokidar, rehype-raw, remark-gfm, sharp, svgo from app devDependencies — @vd/shared owns them"
  - "VD-01 visual/URL parity deferred to Phase 3 per D-11 — Phase 2 gate is build + stale-path only"

patterns-established:
  - "Phase 2 gate: verify-phase1-build → scaffold checks → stale absent → app-local present"

requirements-completed: [MONO-03]

duration: 12min
completed: 2026-06-07
---

# Phase 2 Plan 05: Final Cleanup and Verify Gate Summary

**Full Phase 2 extraction gate with stale-path negation, deduped app deps, and CI-equivalent build verification closing MONO-03**

## Performance

- **Duration:** 12 min
- **Started:** 2026-06-07T12:51:00Z
- **Completed:** 2026-06-07T13:03:12Z
- **Tasks:** 3
- **Files modified:** 3

## Accomplishments

- Activated complete stale-path checks in `verify-phase2-extraction.sh` (vite plugins, markdown utils, layouts, chrome components)
- Verified `@vd/shared` wiring in `astro.config.mjs` (createMarkdownConfig, createCustomSitemap, vite-plugins, noExternal)
- Removed duplicate markdown/image deps from app `package.json`; build and full gate pass
- Confirmed zero stale import paths; app-local utils (`is-published`, `get-related-articles`, `changed-files-integration`) preserved

## Task Commits

Each task was committed atomically:

1. **Task 1: Activate full stale-path checks in verify script** - `769e239` (feat)
2. **Task 2: Remove duplicate deps and empty app directories** - `84dec86` (chore)
3. **Task 3: Final MONO-03 gate and repo-wide stale import scan** - verification only (no file changes)

**Plan metadata:** `04fd828` (docs: complete plan)

## Files Created/Modified

- `scripts/verify-phase2-extraction.sh` — Full Phase 2 gate with stale-path negation and app-local preservation
- `apps/vzhurudolu/package.json` — Removed chokidar, rehype-raw, remark-gfm, sharp, svgo from devDependencies
- `package-lock.json` — Lockfile updated after dedupe

## Decisions Made

- Deduped only deps confirmed unused in app code (grep found zero direct imports)
- VD-01 visual/URL parity explicitly out of scope — Phase 3 handoff for production diff

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Phase 2 extraction complete — all 5 plans executed
- `npx turbo run build --filter=@vd/vzhurudolu && bash scripts/verify-phase2-extraction.sh && bash scripts/verify-phase1-build.sh` passes locally
- Ready for Phase 3 Czech Site Parity Verification (VD-01, VD-05)
- EN app can import `@vd/shared` in Phase 5 using same factory patterns

---
*Phase: 02-shared-packages-extraction*
*Completed: 2026-06-07*

## Self-Check: PASSED

- FOUND: scripts/verify-phase2-extraction.sh
- FOUND: apps/vzhurudolu/package.json
- FOUND: .planning/phases/02-shared-packages-extraction/02-05-SUMMARY.md
- FOUND: 769e239
- FOUND: 84dec86
