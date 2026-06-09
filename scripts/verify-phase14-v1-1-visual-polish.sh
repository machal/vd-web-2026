#!/usr/bin/env bash
# Phase 14 v1.1 visual polish gate — static checks on both app builds.
#
# Usage:
#   bash scripts/verify-phase14-v1-1-visual-polish.sh
#
# Optional live preview smoke (after deploy):
#   VZHURUDOLU_URL=https://vd-web-2026.vercel.app \
#   MICHALEK_DEV_URL=https://vd-web-2026-xco9.vercel.app \
#   bash scripts/verify-phase14-v1-1-visual-polish.sh --live
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

echo "Phase 14 v1.1 visual polish gate: building both apps..."
npm run build:vzhurudolu
npm run build:michalek-dev

CS_DIST="apps/vzhurudolu/dist"
EN_DIST="apps/michalek-dev/dist"

assert_file() {
  local file="$1"
  local label="$2"
  if [[ ! -f "$file" ]]; then
    echo "Phase 14 v1.1 gate: FAIL — missing $label ($file)" >&2
    exit 1
  fi
}

assert_grep() {
  local file="$1"
  local pattern="$2"
  local label="$3"
  if ! grep -q "$pattern" "$file"; then
    echo "Phase 14 v1.1 gate: FAIL — $label not found in $file" >&2
    exit 1
  fi
}

assert_not_grep() {
  local file="$1"
  local pattern="$2"
  local label="$3"
  if grep -q "$pattern" "$file"; then
    echo "Phase 14 v1.1 gate: FAIL — $label unexpectedly found in $file" >&2
    exit 1
  fi
}

echo "Phase 14 v1.1 gate: CS homepage author box..."
assert_file "$CS_DIST/index.html" "CS homepage"
assert_grep "$CS_DIST/index.html" 'id="author-profile"' "CS author profile box"
assert_grep "$CS_DIST/index.html" 'Martin Michálek\.' "CS author heading"
assert_grep "$CS_DIST/index.html" 'brown-bg' "CS inverse brown band"
assert_grep "$CS_DIST/index.html" 'href="/martin"' "CS author link"
assert_not_grep "$CS_DIST/index.html" 'kurzy-top' "CS homepage ebook aside removed"
assert_not_grep "$CS_DIST/index.html" 'promoTop-heading' "CS homepage ebook promo heading removed"

echo "Phase 14 v1.1 gate: EN homepage CS parity..."
assert_file "$EN_DIST/index.html" "EN homepage"
assert_grep "$EN_DIST/index.html" 'id="author-profile"' "EN author profile box"
assert_grep "$EN_DIST/index.html" 'About Martin' "EN author CTA"
assert_grep "$EN_DIST/index.html" 'Article topics' "EN topic hub heading"
assert_grep "$EN_DIST/index.html" 'href="/performance"' "EN performance topic button"
assert_not_grep "$EN_DIST/index.html" 'Start here' "EN Start here section removed"

echo "Phase 14 v1.1 gate: article detail language row..."
CS_ARTICLE="$(find "$CS_DIST/blog" -name 'index.html' | head -1)"
EN_GUIDE="$(find "$EN_DIST/guide" -name 'index.html' | head -1)"
EN_BLOG="$(find "$EN_DIST/blog" -name 'index.html' | head -1)"
assert_file "$CS_ARTICLE" "CS blog article sample"
assert_file "$EN_GUIDE" "EN guide article sample"
assert_grep "$CS_ARTICLE" 'page-subhead--split' "CS article language row"
assert_grep "$EN_GUIDE" 'page-subhead--split' "EN article language row"
assert_not_grep "$EN_GUIDE" 'adaptation-attribution' "EN guide adaptation footer removed"
assert_not_grep "$EN_BLOG" 'adaptation-attribution' "EN blog adaptation footer removed"

if [[ "${1:-}" == "--live" ]]; then
  VZHURUDOLU_URL="${VZHURUDOLU_URL:-https://vd-web-2026.vercel.app}"
  MICHALEK_DEV_URL="${MICHALEK_DEV_URL:-https://vd-web-2026-xco9.vercel.app}"
  CS_BASE="${VZHURUDOLU_URL%/}"
  EN_BASE="${MICHALEK_DEV_URL%/}"

  echo "Phase 14 v1.1 gate: live preview smoke (${CS_BASE}, ${EN_BASE})..."
  for url in "${CS_BASE}/" "${EN_BASE}/"; do
    status=$(curl -sf -o /dev/null -w '%{http_code}' --max-time 20 "$url" || echo "000")
    if [[ "$status" != "200" ]]; then
      echo "Phase 14 v1.1 gate: FAIL — ${url} returned ${status}" >&2
      exit 1
    fi
    echo "Phase 14 v1.1 gate: ${url} OK"
  done
fi

echo "Phase 14 v1.1 visual polish gate: PASS"
