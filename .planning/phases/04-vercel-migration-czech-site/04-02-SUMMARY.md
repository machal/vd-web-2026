---
phase: 04-vercel-migration-czech-site
plan: 02
subsystem: infra
tags: [vercel, redirects, htaccess, apache]

requires:
  - phase: 04-vercel-migration-czech-site
    provides: vercel.json scaffold from 04-01
provides:
  - 56 vercel.json redirect rules ported from .htaccess
  - inventory-htaccess-rules.sh parity counter
affects: [04-03, 04-04]

tech-stack:
  added: []
  patterns: [Mechanical 1:1 Apache RedirectMatch → vercel.json permanent redirects]

key-files:
  created: [scripts/inventory-htaccess-rules.sh]
  modified: [apps/vzhurudolu/vercel.json]

key-decisions:
  - "Omitted www/HTTPS RewriteCond rules — Vercel domain settings handle TLS/www"
  - "Kurzy /kurzy/:path+ → /kurzy replicates middleware.ts for static output"

patterns-established:
  - "Specific redirect paths ordered before wildcard patterns in vercel.json"

requirements-completed: [VD-03]

duration: 15min
completed: 2026-06-07
---

# Phase 4 Plan 02: Redirect Port Summary

**56 permanent redirects in vercel.json mechanically ported from 311-line .htaccess including kurzy consolidation and query-string css3 rules**

## Performance

- **Duration:** 15 min
- **Tasks:** 2
- **Files modified:** 2

## Accomplishments

- Created `scripts/inventory-htaccess-rules.sh` reporting 54 Apache 301-family rules
- Ported all RedirectMatch/Redirect 301 rules to `vercel.json` redirects array (56 entries)
- Added kurzy catch-all, prirucka/css3 query redirect, node_modules 404 block

## Task Commits

1. **Task 1: Inventory .htaccess redirect rules** - `6cc1242` (feat)
2. **Task 2: Port .htaccess redirects to vercel.json** - `202866a` (feat)

## Files Created/Modified

- `scripts/inventory-htaccess-rules.sh` - Redirect rule counter for parity gates
- `apps/vzhurudolu/vercel.json` - Full redirects array appended

## Decisions Made

- www/HTTPS and internal index.html rewrite omitted per plan (documented in 04-VERIFICATION.md)

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None

## Self-Check: PASSED

- FOUND: scripts/inventory-htaccess-rules.sh
- FOUND: apps/vzhurudolu/vercel.json (redirects array)
- FOUND: 6cc1242
- FOUND: 202866a

---
*Phase: 04-vercel-migration-czech-site*
*Completed: 2026-06-07*
