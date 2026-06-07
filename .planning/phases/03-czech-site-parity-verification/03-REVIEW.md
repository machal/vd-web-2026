---
phase: 03-czech-site-parity-verification
reviewed: 2026-06-07T20:00:00Z
depth: standard
files_reviewed: 3
files_reviewed_list:
  - scripts/verify-phase3-parity.sh
  - scripts/redirect-samples.txt
  - .github/workflows/pr-build.yml
findings:
  critical: 0
  warning: 4
  info: 1
  total: 5
status: issues_found
---

# Phase 3: Code Review Report

**Reviewed:** 2026-06-07T20:00:00Z
**Depth:** standard
**Files Reviewed:** 3
**Status:** issues_found

## Summary

Phase 3 delivers a well-structured parity gate: sitemap diff with draft exclusions, dist existence map, linkinator with production regression detection, and redirect sampling. The CI wiring via `--links-only` is appropriate. Four robustness issues in `verify-phase3-parity.sh` could cause false passes or hung runs under network stress; all are fixable without changing gate semantics.

## Warnings

### WR-01: Redirect sample curl has no timeout

**File:** `scripts/verify-phase3-parity.sh:271`
**Issue:** Production redirect checks use `curl -sfI` without `--max-time`, while `check_production_status()` correctly caps at 15s. A slow or hung production response can block the full gate indefinitely.
**Fix:**
```bash
headers=$(curl -sfI --max-time 15 "https://www.vzhurudolu.cz${source}" || true)
```

### WR-02: Empty production status treated as legacy (false pass)

**File:** `scripts/verify-phase3-parity.sh:138-145`
**Issue:** When `check_production_status()` returns empty (curl network failure, timeout, or parse miss), the path is counted as `legacy` and the gate passes. A local 404 on a URL that is actually HTTP 200 in production would be missed during transient network failures.
**Fix:**
```bash
for path in "${broken[@]}"; do
  prod_status=$(check_production_status "$path")
  if [[ -z "$prod_status" ]]; then
    echo "Phase 3 parity gate: FAIL — could not verify production status for ${path}" >&2
    regressions=$((regressions + 1))
  elif [[ "$prod_status" == "200" ]]; then
    echo "Phase 3 parity gate: FAIL — local 404 but production 200: ${path}" >&2
    regressions=$((regressions + 1))
  else
    legacy=$((legacy + 1))
  fi
done
```

### WR-03: Local dist server binds all interfaces

**File:** `scripts/verify-phase3-parity.sh:90`
**Issue:** `python3 -m http.server` without `--bind 127.0.0.1` listens on all interfaces. On shared CI runners or local networks this briefly exposes the dist tree beyond localhost.
**Fix:**
```bash
python3 -m http.server "$port" --bind 127.0.0.1 --directory "$DIST_DIR" >/dev/null 2>&1 &
```

### WR-04: No server cleanup trap on interrupt

**File:** `scripts/verify-phase3-parity.sh:90-118`
**Issue:** `run_linkinator()` starts a background HTTP server but only kills it on the happy path. SIGINT/SIGTERM during the linkinator crawl can leave an orphan `python3 -m http.server` process holding port 8765.
**Fix:**
```bash
cleanup_server() {
  kill "$server_pid" 2>/dev/null || true
  wait "$server_pid" 2>/dev/null || true
}
trap cleanup_server RETURN
```

## Info

### IN-01: `broken` array not declared local

**File:** `scripts/verify-phase3-parity.sh:125`
**Issue:** `broken=()` inside `run_linkinator()` pollutes the global namespace. Harmless for single invocation but inconsistent with other locals in the function.
**Fix:** Declare `local -a broken=()` at the start of the assignment block.

---

_Reviewed: 2026-06-07T20:00:00Z_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
