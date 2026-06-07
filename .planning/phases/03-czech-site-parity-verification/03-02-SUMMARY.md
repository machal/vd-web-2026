---
phase: 03-czech-site-parity-verification
plan: 02
subsystem: infra
tags: [bash, sitemap, parity, vd-01, curl, comm]

requires:
  - phase: 03-czech-site-parity-verification
    provides: Plan 01 public asset audit baseline
provides:
  - scripts/verify-phase3-parity.sh skeleton composing phase2 gate
  - Production vs local sitemap URL inventory diff
  - Dist HTML existence map for local sitemap paths
affects:
  - 03-czech-site-parity-verification plans 03-04

tech-stack:
  added: []
  patterns:
    - "Portable sed sitemap path extraction (no grep -P)"
    - "comm set diff: missing prod paths FAIL, local extras WARN"
    - "Draft blog slugs excluded from production-missing count"

key-files:
  created:
    - scripts/verify-phase3-parity.sh
  modified: []

key-decisions:
  - "Local draft posts excluded from sitemap missing FAIL per D-03 draft absence rule"
  - "Local-only sitemap extras emit WARN only (RESEARCH open question #1 resolved)"

patterns-established:
  - "path_to_file(): trailingSlash never → dist{path}/index.html"

requirements-completed: [VD-01]

duration: 15min
completed: 2026-06-07
---

# Phase 3 Plan 02: Sitemap Parity Gate Summary

**Production sitemap diff with draft-aware exclusions and dist HTML existence map for 871 local URLs**

## Performance

- **Duration:** ~15 min (across tasks 1-3)
- **Started:** 2026-06-07T13:40:00Z
- **Completed:** 2026-06-07T15:50:00Z
- **Tasks:** 3/3
- **Files modified:** 1

## Accomplishments

- Phase 3 gate composes `verify-phase2-extraction.sh` + dist preconditions
- Live production sitemap fetched at verify time (873 URLs)
- Missing non-draft production paths FAIL; local extras WARN only
- Every local sitemap path verified against dist HTML file

## Task Commits

1. **Task 1: Skeleton + phase2 composition** - `de49b86` (feat)
2. **Task 2: Production vs local sitemap diff** - `b40df67` (feat)
3. **Task 3: Dist file existence map** - `723994b` (feat)

**Plan metadata:** pending docs commit

## Files Created/Modified

- `scripts/verify-phase3-parity.sh` — Phase 3 parity gate (sitemap + dist sections)

## Decisions Made

- Draft slugs (`postStatus: Draft`) excluded from production-missing FAIL — aligns with Phase 1 draft absence gate
- Two production-only draft URLs (`115-google-speed-https`, `179-covid-skoleni-podzim`) logged as INFO

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 2 - Missing Critical] Draft-aware sitemap missing filter**
- **Found during:** Task 2 verification
- **Issue:** Production sitemap includes draft URLs still live on FTP; local build correctly excludes them — caused false FAIL
- **Fix:** `collect_draft_exclude_paths()` filters missing set before FAIL
- **Files modified:** scripts/verify-phase3-parity.sh
- **Committed in:** 723994b

**Note:** Task 3 commit (`723994b`) also includes Plan 03 linkinator/redirect sections (same file) — Plan 03 summary tracks that scope.

## Issues Encountered

None blocking.

## User Setup Required

None.

## Next Phase Readiness

- Sitemap URL inventory slice complete — Plan 03 extends same script with linkinator + redirects

## Self-Check: PASSED

- scripts/verify-phase3-parity.sh exists
- Commits de49b86, b40df67, 723994b found in git log

---
*Phase: 03-czech-site-parity-verification*
*Completed: 2026-06-07*
