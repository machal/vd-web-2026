---
phase: 04-vercel-migration-czech-site
plan: 03
subsystem: testing
tags: [vercel, verification, curl, redirects]

requires:
  - phase: 04-vercel-migration-czech-site
    provides: vercel.json redirects and redirect-samples.txt from prior phases
provides:
  - verify-phase4-vercel.sh preview URL parity gate
affects: [04-04]

tech-stack:
  added: []
  patterns: [VERCEL_PREVIEW_URL env targets live Vercel deployment for redirect matrix]

key-files:
  created: [scripts/verify-phase4-vercel.sh]
  modified: []

key-decisions:
  - "Preview gate uses same redirect-samples.txt matrix as Phase 3 production gate"
  - "--redirects-only flag for partial gate before full deploy"

patterns-established:
  - "Phase N verify scripts extend prior phase gates with new URL target"

requirements-completed: [VD-03]

duration: 12min
completed: 2026-06-07
---

# Phase 4 Plan 03: Verify Script Summary

**Vercel preview parity gate testing 26 redirect samples plus trailing-slash, font CORS, and homepage checks via VERCEL_PREVIEW_URL**

## Performance

- **Duration:** 12 min
- **Tasks:** 2
- **Files modified:** 1

## Accomplishments

- Created `scripts/verify-phase4-vercel.sh` with required VERCEL_PREVIEW_URL
- Reused Phase 3 redirect sample loop with preview-origin normalization
- Added trailing slash, font CORS, homepage 200 checks; `--redirects-only` flag

## Task Commits

1. **Task 1: Create verify-phase4-vercel.sh scaffold** - `37d710d` (feat)
2. **Task 2: Add header and trailing-slash checks** - `0668ba0` (feat)

## Files Created/Modified

- `scripts/verify-phase4-vercel.sh` - Vercel preview parity gate

## Decisions Made

None - followed plan as specified.

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None

## Self-Check: PASSED

- FOUND: scripts/verify-phase4-vercel.sh
- FOUND: 37d710d
- FOUND: 0668ba0

---
*Phase: 04-vercel-migration-czech-site*
*Completed: 2026-06-07*
