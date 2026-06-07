---
phase: 01-monorepo-foundation-ci
plan: 02
subsystem: infra
tags: [turborepo, npm-workspaces, mono-02, mono-04]

requires:
  - phase: 01-monorepo-foundation-ci
    provides: npm workspaces with @vd/vzhurudolu app and build gate script
provides:
  - turbo.json task graph (build, dev)
  - Root orchestrator with turbo filter commands
  - MONO-04 verified app-local Astro deps
affects: [01-03-draft-filter, 01-04-pr-ci, phase-2-packages, vercel-deploy]

tech-stack:
  added: [turbo@2.9.16, typescript@5.9.3]
  patterns: [turbo filter builds, root orchestrator-only devDeps]

key-files:
  created:
    - turbo.json
    - tsconfig.json
  modified:
    - package.json
    - package-lock.json

key-decisions:
  - "packageManager npm@10.9.4 required by Turbo 2.x workspace resolution"
  - "astro stays in app devDependencies (4.16.19 exact), not root"

patterns-established:
  - "Build: npx turbo run build --filter=@vd/vzhurudolu"
  - "Root devDependencies: turbo + typescript only"

requirements-completed: [MONO-02, MONO-04]

duration: 15min
completed: 2026-06-07
---

# Phase 01 Plan 02 Summary

**Turborepo 2.9 orchestrates filtered Czech app builds from repo root with app-local Astro 4.16.19 deps (MONO-02, MONO-04)**

## Performance

- **Duration:** ~15 min
- **Started:** 2026-06-07T13:00:00Z
- **Completed:** 2026-06-07T13:15:00Z
- **Tasks:** 3 (1 human checkpoint + 2 auto)
- **Files modified:** 4

## Accomplishments

- `turbo.json` with `tasks.build` (`dependsOn: ["^build"]`, `outputs: ["dist/**"]`) and `tasks.dev`
- Root `package.json` refactored to turbo scripts; devDependencies limited to turbo + typescript
- `npx turbo run build --filter=@vd/vzhurudolu` passes; verify gate OK
- Clean `npm ci` + turbo build succeeds (MONO-04 hoisting audit)

## Task Commits

1. **Task 1: Package legitimacy checkpoint** — human approved (no commit)
2. **Task 2: turbo.json and root orchestrator refactor** — `513ed64` (feat)
3. **Task 3: MONO-04 dependency isolation audit** — verification only (no file changes)

## Files Created/Modified

- `turbo.json` — Turborepo task graph
- `tsconfig.json` — minimal root TS base for IDE
- `package.json` — turbo scripts, packageManager, devDeps only

## Decisions Made

- Added `packageManager: "npm@10.9.4"` — required by Turbo 2.x to resolve workspaces (not in original plan text, necessary for build)

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Blocking] Added packageManager field**
- **Found during:** Task 2 (first turbo run)
- **Issue:** Turbo 2.9.16 failed with "Missing packageManager field in package.json"
- **Fix:** Added `"packageManager": "npm@10.9.4"` per STACK.md research
- **Files modified:** package.json
- **Verification:** `npx turbo run build --filter=@vd/vzhurudolu` exits 0
- **Committed in:** 513ed64

---

**Total deviations:** 1 auto-fixed (1 blocking)
**Impact on plan:** Required for Turbo workspace resolution. No scope creep.

## Issues Encountered

None beyond packageManager requirement.

## User Setup Required

None.

## Next Phase Readiness

- Ready for Plan 01-03: draft/unpublished content exclusion (VD-02)
- CI in Plan 01-04 can use `turbo run build --filter=@vd/vzhurudolu`

---
*Phase: 01-monorepo-foundation-ci*
*Completed: 2026-06-07*
