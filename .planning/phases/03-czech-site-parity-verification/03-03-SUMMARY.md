---
phase: 03-czech-site-parity-verification
plan: 03
subsystem: infra
tags: [linkinator, redirects, curl, vd-01, parity]

requires:
  - phase: 03-czech-site-parity-verification
    provides: Plan 02 sitemap parity gate in verify-phase3-parity.sh
provides:
  - Internal link crawl via linkinator@7.6.1 with production regression detection
  - scripts/redirect-samples.txt — 28 verified production redirect pairs
  - Complete automated verify-phase3-parity.sh gate
affects:
  - 03-czech-site-parity-verification plan 04

tech-stack:
  added: [linkinator@7.6.1 via npx]
  patterns:
    - "Local http.server + URL rewrite for same-host absolute links"
    - "Local 404 vs production status comparison (FAIL only on prod 200 regression)"
    - "Redirect samples verified against live production curl -sI"

key-files:
  created:
    - scripts/redirect-samples.txt
  modified:
    - scripts/verify-phase3-parity.sh

key-decisions:
  - "linkinator@7.6.1 approved — JustinBeckwith npm publisher, MIT, no postinstall"
  - "Legacy local 404s matching production non-200 emit WARN not FAIL"
  - "CI uses --links-only mode (localhost server + prod compare, no sitemap curl)"

patterns-established:
  - "run_linkinator(): python3 http.server + url-rewrite www.vzhurudolu.cz → localhost"

requirements-completed: [VD-01]

duration: 20min
completed: 2026-06-07
---

# Phase 3 Plan 03: Link Crawl and Redirect Samples Summary

**linkinator@7.6.1 internal link gate with production regression detection and 28-sample redirect matrix**

## Performance

- **Duration:** ~20 min
- **Completed:** 2026-06-07T15:52:00Z
- **Tasks:** 3/3
- **Files modified:** 2

## Accomplishments

- Package legitimacy checkpoint resolved: linkinator@7.6.1 verified on npm (JustinBeckwith, MIT)
- Internal link crawl via local HTTP server + production URL rewrite
- 166 legacy local 404s match production non-200 — WARN only (full gate); 165 in --links-only mode
- 28 redirect samples pass against live production

## Task Commits

1. **Task 1: linkinator package approval** — checkpoint resolved (verified via npm view)
2. **Task 2: Internal link crawl** - `723994b` (feat, combined with Plan 02 task 3)
3. **Task 3: Redirect sample matrix** - `723994b` (feat)

## Files Created/Modified

- `scripts/verify-phase3-parity.sh` — run_linkinator(), redirect loop, --links-only CI mode
- `scripts/redirect-samples.txt` — 28 production-verified redirect pairs

## Decisions Made

- Direct file:// linkinator crawl rejected — 3600+ false positives; localhost server + prod compare adopted
- mapfile replaced with while-read for macOS bash 3.2 compatibility

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] linkinator direct dist crawl false positives**
- **Found during:** Task 2 verification
- **Issue:** Scanning dist/ directly reported 3600+ broken links (absolute prod URLs, legacy paths)
- **Fix:** Local http.server on port 8765, `--url-rewrite-search/replace`, production status comparison for [404]s
- **Files modified:** scripts/verify-phase3-parity.sh
- **Committed in:** 723994b

**2. [Rule 3 - Blocking] mapfile unavailable on macOS bash 3.2**
- **Fix:** while-read loop for broken link array
- **Committed in:** 723994b

**3. [Rule 2 - Missing Critical] --links-only flag for CI**
- **Issue:** Naive CI linkinator on dist would always fail
- **Fix:** `--links-only` mode reuses localhost + prod compare path
- **Committed in:** 723994b

## Auth Gates

- linkinator@7.6.1 package legitimacy checkpoint: resolved via npm registry verification (JustinBeckwith, v7.6.1, no postinstall)

## Issues Encountered

None blocking after linkinator approach fix.

## User Setup Required

None.

## Next Phase Readiness

- Full automated gate green — Plan 04 wires CI + verification doc

## Self-Check: PASSED

- scripts/redirect-samples.txt exists (28 pairs)
- scripts/verify-phase3-parity.sh exists with linkinator + redirect loop
- Commit 723994b found in git log (feat implementation)
- Commit 34ec9d2 found in git log (docs metadata)
- Re-verified 2026-06-07: full gate exit 0, "internal links OK", 28/28 redirect samples pass

---
*Phase: 03-czech-site-parity-verification*
*Completed: 2026-06-07*
