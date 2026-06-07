---
phase: 04-vercel-migration-czech-site
plan: 01
subsystem: infra
tags: [vercel, astro, turbo, monorepo, cors]

requires:
  - phase: 03-czech-site-parity-verification
    provides: Parity baseline and FTP exclude policy
provides:
  - Vercel monorepo build scaffold for apps/vzhurudolu
  - .vercelignore archive exclusions
  - Font CORS headers in vercel.json
affects: [04-02, 04-03, 04-04, 05-english-app-scaffold]

tech-stack:
  added: []
  patterns: [Vercel Root Directory apps/vzhurudolu with cd ../.. monorepo install/build]

key-files:
  created: [apps/vzhurudolu/vercel.json, apps/vzhurudolu/.vercelignore]
  modified: []

key-decisions:
  - "trailingSlash false in vercel.json matches Astro trailingSlash never"
  - "No @astrojs/vercel adapter — static SSG output to dist/"

patterns-established:
  - "Monorepo Vercel: installCommand/buildCommand cd to repo root, turbo filter @vd/vzhurudolu"

requirements-completed: [VD-03]

duration: 8min
completed: 2026-06-07
---

# Phase 4 Plan 01: Vercel Scaffold Summary

**Monorepo-aware Vercel config with turbo build, trailingSlash false, font CORS, and FTP-mirrored archive exclusions**

## Performance

- **Duration:** 8 min
- **Tasks:** 2
- **Files modified:** 2

## Accomplishments

- Created `apps/vzhurudolu/vercel.json` with npm ci + turbo build from repo root
- Set `trailingSlash: false` and `outputDirectory: dist`
- Added font CORS headers porting `.htaccess` FilesMatch behavior
- Created `.vercelignore` excluding `data/` and `files/` archives

## Task Commits

1. **Task 1: Create vercel.json monorepo build scaffold** - `4651a5a` (feat)
2. **Task 2: Add .vercelignore and font CORS headers** - `b8aaf36` (feat)

## Files Created/Modified

- `apps/vzhurudolu/vercel.json` - Vercel build/output/trailingSlash/headers config
- `apps/vzhurudolu/.vercelignore` - Deploy exclusion for legacy archives

## Decisions Made

None - followed plan as specified.

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None

## Self-Check: PASSED

- FOUND: apps/vzhurudolu/vercel.json
- FOUND: apps/vzhurudolu/.vercelignore
- FOUND: 4651a5a
- FOUND: b8aaf36

---
*Phase: 04-vercel-migration-czech-site*
*Completed: 2026-06-07*
