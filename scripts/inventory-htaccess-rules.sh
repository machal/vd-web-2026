#!/usr/bin/env bash
# Count redirect-eligible directives in apps/vzhurudolu/public/.htaccess.
# Companion parity gate for verify-phase4-vercel.sh (Plan 04-02).
set -euo pipefail

HTACCESS="${1:-apps/vzhurudolu/public/.htaccess}"
VERCEL_JSON="${2:-apps/vzhurudolu/vercel.json}"

if [[ ! -f "$HTACCESS" ]]; then
  echo "inventory-htaccess-rules: FAIL — ${HTACCESS} not found" >&2
  exit 1
fi

# Strip comment lines and count redirect-eligible directives.
FILTERED=$(grep -v '^#' "$HTACCESS" | grep -v '^[[:space:]]*#')

REDIRECT_MATCH=$(printf '%s\n' "$FILTERED" | grep -cE 'RedirectMatch[[:space:]]+301' || true)
REDIRECT_301=$(printf '%s\n' "$FILTERED" | grep -cE '^[[:space:]]*Redirect[[:space:]]+301' || true)
REWRITE_R301=$(printf '%s\n' "$FILTERED" | grep -cE 'RewriteRule.*R=301' || true)
REDIRECT_MATCH_404=$(printf '%s\n' "$FILTERED" | grep -cE 'RedirectMatch[[:space:]]+404' || true)
QUERY_REDIRECT=$(printf '%s\n' "$FILTERED" | grep -cE 'RewriteCond.*QUERY_STRING' || true)

TOTAL=$((REDIRECT_MATCH + REDIRECT_301 + REWRITE_R301))

echo "=== .htaccess redirect inventory: ${HTACCESS} ==="
echo "RedirectMatch 301:     ${REDIRECT_MATCH}"
echo "Redirect 301:          ${REDIRECT_301}"
echo "RewriteRule R=301:     ${REWRITE_R301}"
echo "RedirectMatch 404:     ${REDIRECT_MATCH_404} (node_modules block)"
echo "Query-string rules:    ${QUERY_REDIRECT} (prirucka/css3?p=)"
echo "Total redirect-eligible (301 family): ${TOTAL}"

if [[ -f "$VERCEL_JSON" ]]; then
  VERCEL_COUNT=$(node -e "const v=require('./${VERCEL_JSON}'); process.stdout.write(String(Array.isArray(v.redirects)?v.redirects.length:0))")
  echo "vercel.json redirects:     ${VERCEL_COUNT}"
  # Query-string css3 and node_modules 404 block: Vercel Routing Middleware, not vercel.json redirects.
  EXPECTED_VERCEL=$((TOTAL - QUERY_REDIRECT))
  if [[ "$VERCEL_COUNT" -ne "$EXPECTED_VERCEL" ]]; then
    echo "inventory-htaccess-rules: WARN — vercel.json count (${VERCEL_COUNT}) != expected (${EXPECTED_VERCEL}); review trailing-slash splits and middleware-handled rules" >&2
  fi
else
  echo "vercel.json redirects:     (missing — ${VERCEL_JSON})"
fi

echo ""
echo "Excluded from counts: mod_deflate, mod_expires, ETag, AddType, internal rewrites (index.html)"
echo "Query-string css3?p= and node_modules 404 handled by apps/vzhurudolu/middleware.ts (not vercel.json)"

exit 0
