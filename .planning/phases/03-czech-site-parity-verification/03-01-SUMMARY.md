---
phase: 03-czech-site-parity-verification
plan: 01
subsystem: infra
tags: [astro, turbo, public-assets, vd-05, build-timing, ftp-deploy]

requires:
  - phase: 02-shared-package-extraction
    provides: Monorepo build pipeline and vitePluginCopyPublicToDist in apps/vzhurudolu
provides:
  - 03-PUBLIC-ASSET-AUDIT.md with 685 MB inventory, build timing, FTP gap analysis
  - VD-05 audit slice closure for Phase 3 Wave 1
affects:
  - 03-czech-site-parity-verification (plans 02-04)
  - Phase 4 Vercel migration optimization

tech-stack:
  added: []
  patterns:
    - "Read-only du/find inventory for public/ archives"
    - "Clean build timing with turbo --force for D-10 baseline"

key-files:
  created:
    - .planning/phases/03-czech-site-parity-verification/03-PUBLIC-ASSET-AUDIT.md
  modified: []

key-decisions:
  - "Local cold build 29s — well under 5-minute threshold; no Phase 3 copy optimization"
  - "vitePluginCopyPublicToDist unchanged per D-11; FTP data/files exclusion gap deferred to Phase 4+"
  - "CI build timing deferred to Plan 03-04 (RESEARCH open question #3)"

patterns-established:
  - "Public asset audit: measure public/, dist/, and FTP exclusion gap in single artifact"

requirements-completed: [VD-05]

duration: 5min
completed: 2026-06-07
---

# Phase 3 Plan 01: Public Asset Audit Summary

**685 MB public/ inventory, 29s clean build baseline, and VD-05 verdict documented without changing copy plugin behavior**

## Performance

- **Duration:** ~5 min
- **Started:** 2026-06-07T13:37:31Z
- **Completed:** 2026-06-07T13:40:00Z
- **Tasks:** 3/3
- **Files modified:** 1

## Accomplishments

- Timed clean build via `npm run build:vzhurudolu -- --force`: **29.02 s** (PASS vs 300 s)
- Read-only inventory of 685 MB `public/` with Active/Archive categorization (7,303 files)
- Documented FTP deploy exclusion gap (`data/**`, `files/**` excluded from upload but copied to dist)
- VD-05 satisfied; Phase 4+ recommendations for selective copy, vercel.json port, CI cache

## Task Commits

Each task delivered in single audit artifact commit:

1. **Task 1: Timed build baseline (D-10)** - `1c50a8a` (docs)
2. **Task 2: Public/ inventory and dist size table (D-09, D-12)** - `1c50a8a` (docs)
3. **Task 3: Phase 4+ recommendations and VD-05 closure** - `1c50a8a` (docs)

**Plan metadata:** pending final docs commit

## Files Created/Modified

- `.planning/phases/03-czech-site-parity-verification/03-PUBLIC-ASSET-AUDIT.md` — Build timing, inventory table, dist output, FTP exclusions, recommendations, VD-05 verdict

## Decisions Made

- Used `--force` turbo flag for representative cold build (cached replay was 0.42 s — not used for D-10)
- No changes to `vitePluginCopyPublicToDist()` per locked D-11
- CI timing capture deferred to Plan 03-04 per RESEARCH open question #3

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Clean build required for accurate D-10 timing**
- **Found during:** Task 1
- **Issue:** Initial `npm run build:vzhurudolu` hit turbo cache (0.42 s) — not representative
- **Fix:** Re-ran with `npx turbo run build --filter=@vd/vzhurudolu --force` → 29.02 s
- **Files modified:** 03-PUBLIC-ASSET-AUDIT.md (Build Timing section)
- **Committed in:** 1c50a8a

**2. [Rule 3 - Blocking] Sandbox blocked public/data du measurement**
- **Found during:** Task 2
- **Issue:** `du: apps/vzhurudolu/public/data: Operation not permitted` in sandbox
- **Fix:** Re-ran inventory with full permissions; confirmed 685 MB total
- **Committed in:** 1c50a8a

---

**Total deviations:** 2 auto-fixed (2 blocking)
**Impact on plan:** Measurement accuracy only; no scope or behavior changes.

## Issues Encountered

None beyond sandbox permission constraints (resolved).

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Plan 03-02 can proceed with verify-phase3-parity.sh skeleton
- Build baseline established; CI comparison pending Plan 03-04
- Archive paths documented read-only; safe for parity gates

## Self-Check: PASSED

- FOUND: `.planning/phases/03-czech-site-parity-verification/03-PUBLIC-ASSET-AUDIT.md`
- FOUND: commit `1c50a8a`
- ALL automated verifications passed

---
*Phase: 03-czech-site-parity-verification*
*Completed: 2026-06-07*
