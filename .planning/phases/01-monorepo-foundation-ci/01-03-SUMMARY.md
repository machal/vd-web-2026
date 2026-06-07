---
phase: 01-monorepo-foundation-ci
plan: 03
subsystem: content
tags: [vd-02, draft-filter, is-published, astro-content]

requires:
  - phase: 01-monorepo-foundation-ci
    provides: turbo build pipeline from repo root
provides:
  - isPublished helper for blog, podcast, prirucka collections
  - Strict published === true filtering across routes, RSS, related articles
  - VD-02 smoke checks in verify-phase1-build.sh
affects: [01-04-pr-ci, production-deploy]

tech-stack:
  added: []
  patterns: [centralized isPublished filter, strict === true not !== false]

key-files:
  created:
    - apps/vzhurudolu/src/utils/is-published.ts
  modified:
    - apps/vzhurudolu/src/pages/blog/[slug].astro
    - apps/vzhurudolu/src/pages/podcast/[slug].astro
    - apps/vzhurudolu/src/pages/rss.ts
    - apps/vzhurudolu/src/utils/get-related-articles.ts
    - scripts/verify-phase1-build.sh

key-decisions:
  - "Single isPublished helper with strict === true per D-13"
  - "Prirucka requires id AND published === true"

patterns-established:
  - "All collection loads use getCollection(..., isPublished) for blog/podcast"
  - "Verify script rejects draft HTML and sitemap entries for known draft slug"

requirements-completed: [VD-02]

duration: 20min
completed: 2026-06-07
---

# Phase 01 Plan 03 Summary

**Centralized isPublished filter stops draft blog/podcast pages and sitemap leaks (VD-02)**

## Performance

- **Duration:** ~20 min
- **Tasks:** 3
- **Files modified:** 14

## Accomplishments

- `isPublished()` helper with strict `published === true` for blog/podcast, id+published for prirucka
- Fixed critical leak: `blog/[slug].astro` and `podcast/[slug].astro` now filter getStaticPaths
- Aligned 10 listing/RSS/utility files — zero `published !== false` in audit paths
- Verify script active: rejects `115-google-speed-https` in dist and sitemap

## Task Commits

1. **Task 1: isPublished + getStaticPaths fix** — `1bc5ccf` (feat)
2. **Task 2: listings, RSS, related articles** — `8e23ae2` (feat)
3. **Task 3: verify script VD-02 smoke** — `958eaf6` (feat)

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

- Wrong import path in `rss.ts` (`../../` vs `../`) — fixed before build.

## Next Phase Readiness

- Ready for Plan 01-04: PR CI + FTP deploy path update

---
*Phase: 01-monorepo-foundation-ci*
*Completed: 2026-06-07*
