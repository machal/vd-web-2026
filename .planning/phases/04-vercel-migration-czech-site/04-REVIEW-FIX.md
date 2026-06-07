---
phase: 04-vercel-migration-czech-site
fixed: 2026-06-07T21:05:00Z
review_source: 04-REVIEW.md
scope: critical_warning
findings_fixed: 4
findings_skipped: 1
status: fixed
---

# Phase 4: Code Review Fix Report

**Fixed:** 2026-06-07T21:05:00Z
**Scope:** Critical + Warning (Info skipped per default scope)

## Fixed

| ID | File | Fix applied |
|----|------|-------------|
| CR-01 | `apps/vzhurudolu/vercel.json`, `middleware.ts`, `src/middleware.ts` | Removed broken `:p` query redirect rules; added Vercel Routing Middleware + Astro dev middleware for `prirucka/css3?p=` → `/prirucka/css3-{p}` |
| WR-01 | `scripts/redirect-samples.txt` | Added `/prirucka/css3?p=transitions` and `/prirucka/css3` → `/css` samples (28 total) |
| WR-02 | `scripts/inventory-htaccess-rules.sh` | Added `vercel.json` redirect count with expected-parity check |
| WR-03 | `scripts/verify-phase4-vercel.sh` | Font CORS check now distinguishes 404 (WARN/skip) from response missing CORS header (FAIL) |

## Skipped

| ID | Reason |
|----|--------|
| IN-01 | Info scope — font assets absent from `public/` is documented in `04-VERIFICATION.md` |

## Verification

- `bash -n scripts/inventory-htaccess-rules.sh` — syntax OK
- `bash -n scripts/verify-phase4-vercel.sh` — syntax OK
- `bash scripts/inventory-htaccess-rules.sh` — vercel.json count 54 matches expected (54 + 1 404 − 1 query middleware)
- Redirect samples: 28 entries

---

_Fixed: 2026-06-07T21:05:00Z_
_Fixer: Claude (gsd-code-reviewer auto-fix)_
