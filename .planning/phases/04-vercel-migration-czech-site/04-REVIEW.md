---
phase: 04-vercel-migration-czech-site
reviewed: 2026-06-07T21:00:00Z
depth: standard
files_reviewed: 4
files_reviewed_list:
  - apps/vzhurudolu/vercel.json
  - apps/vzhurudolu/.vercelignore
  - scripts/inventory-htaccess-rules.sh
  - scripts/verify-phase4-vercel.sh
findings:
  critical: 1
  warning: 3
  info: 1
  total: 5
status: issues_found
---

# Phase 4: Code Review Report

**Reviewed:** 2026-06-07T21:00:00Z
**Depth:** standard
**Files Reviewed:** 4
**Status:** issues_found

## Summary

Phase 4 delivers a solid Vercel monorepo scaffold, mechanical `.htaccess` → `vercel.json` redirect port (56 rules), inventory script, and preview parity gate. The kurzy catch-all and redirect sample matrix align with Phase 3 production behavior. One **critical** gap: the `prirucka/css3?p=` query-to-path redirect uses Vercel path-segment syntax (`:p`) that does not interpolate query values — legacy ebook links would 404 or redirect incorrectly on Vercel. Three warnings cover missing gate coverage and inventory parity gaps.

## Critical Issues

### CR-01: Query redirect `:p` does not interpolate query value

**File:** `apps/vzhurudolu/vercel.json:44-45`
**Issue:** Rules use `"destination": "/prirucka/css3-:p"` with `has: [{ type: "query", key: "p" }]`. Vercel `:name` tokens in `destination` bind to **path** captures from `source`, not query parameters. Apache maps `?p=transitions` → `/prirucka/css3-transitions` via `RewriteCond QUERY_STRING` + `%1`; the current config likely emits a literal `:p` segment or fails to redirect, breaking legacy ebook deep links.
**Fix:** Handle query-to-path in Vercel Routing Middleware (runs on static deploys; Astro `src/middleware.ts` does not). Remove the broken `vercel.json` entries; keep slashless `/prirucka/css3` → `/css` rules for requests without `p`.

```typescript
// apps/vzhurudolu/middleware.ts — Vercel Routing Middleware (project root, not src/)
export default function middleware(request: Request) {
  const url = new URL(request.url);
  const pathname =
    url.pathname.length > 1 && url.pathname.endsWith('/')
      ? url.pathname.slice(0, -1)
      : url.pathname;
  if (pathname === '/prirucka/css3') {
    const p = url.searchParams.get('p');
    if (p) {
      return new Response(null, {
        status: 308,
        headers: { Location: `/prirucka/css3-${p}` },
      });
    }
  }
}

export const config = {
  matcher: ['/prirucka/css3', '/prirucka/css3/'],
};
```

Also mirror in `src/middleware.ts` for `astro dev` parity.

## Warnings

### WR-01: Query redirect absent from redirect-samples matrix

**File:** `scripts/redirect-samples.txt`
**Issue:** Plan 04-02 requires `prirucka/css3?p=X` parity, but the 26-sample matrix has no query-string case. `verify-phase4-vercel.sh` reuses this file — the highest-risk ported rule is never gated.
**Fix:** Add production-verified samples:

```
/prirucka/css3?p=transitions|/prirucka/css3-transitions
/prirucka/css3|/css
```

### WR-02: inventory script does not compare vercel.json count

**File:** `scripts/inventory-htaccess-rules.sh:22-30`
**Issue:** Script counts `.htaccess` 301-family rules (54) but never reads `vercel.json`. The 56-entry redirect array cannot be validated in CI; drift between Apache port and inventory baseline goes undetected.
**Fix:** Append a `vercel.json` redirect count and WARN when counts diverge beyond expected trailing-slash splits:

```bash
VERCEL_JSON="${2:-apps/vzhurudolu/vercel.json}"
if [[ -f "$VERCEL_JSON" ]]; then
  VERCEL_COUNT=$(node -e "const v=require('./${VERCEL_JSON}'); console.log(Array.isArray(v.redirects)?v.redirects.length:0)")
  echo "vercel.json redirects: ${VERCEL_COUNT}"
fi
```

### WR-03: Font CORS gate passes on missing asset

**File:** `scripts/verify-phase4-vercel.sh:130-132`
**Issue:** When the font URL returns no response (fonts are not in `public/` — 0 `.woff2` files in repo), `check_font_cors` prints WARN and returns 0. A deployed preview with missing CORS headers but also missing fonts would pass the full gate despite header config being untested.
**Issue detail:** Documented as intentional in `04-VERIFICATION.md`, but weakens the font CORS port verification.
**Fix:** Distinguish 404 (WARN, skip) from response-without-CORS (FAIL). Optionally probe a path known from built `dist/` after local build.

## Info

### IN-01: Font assets absent from `public/`

**File:** `scripts/verify-phase4-vercel.sh:119-126`
**Issue:** `find apps/vzhurudolu/public -name '*.woff2'` returns nothing; fallback hardcodes `foro-extra-bold.woff2` which also does not exist locally. CORS header rule in `vercel.json` is structurally correct but cannot be validated until fonts ship with deploy output.
**Fix:** No code change required if WARN-on-404 policy is kept; note for human preview gate.

---

_Reviewed: 2026-06-07T21:00:00Z_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
