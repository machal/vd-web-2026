#!/usr/bin/env bash
# Phase 7 content adaptation gate — full EN pilots, attribution, start-here, pairing.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

echo "Phase 7 content adaptation gate: running phase 6 pairing gate..."
bash scripts/verify-phase6-content-pairing-i18n-seo.sh

echo "Phase 7 content adaptation gate: building EN app..."
npm run build -w @vd/michalek-dev

EN_DIST="apps/michalek-dev/dist"

assert_file() {
  local file="$1"
  local label="$2"
  if [[ ! -f "$file" ]]; then
    echo "Phase 7 content adaptation gate: FAIL — missing $label ($file)" >&2
    exit 1
  fi
}

assert_grep() {
  local file="$1"
  local pattern="$2"
  local label="$3"
  if ! grep -q "$pattern" "$file"; then
    echo "Phase 7 content adaptation gate: FAIL — $label not found in $file" >&2
    exit 1
  fi
}

assert_not_grep() {
  local file="$1"
  local pattern="$2"
  local label="$3"
  if grep -qi "$pattern" "$file"; then
    echo "Phase 7 content adaptation gate: FAIL — $label found in $file" >&2
    exit 1
  fi
}

PILOT_PATHS=(
  "$EN_DIST/guide/ai-saas/index.html"
  "$EN_DIST/guide/vibe-coding/index.html"
  "$EN_DIST/guide/email-inbox-zero/index.html"
  "$EN_DIST/guide/web-vitals/index.html"
  "$EN_DIST/guide/webp/index.html"
  "$EN_DIST/blog/2025-year-in-review/index.html"
  "$EN_DIST/blog/saying-no/index.html"
  "$EN_DIST/blog/save-on-devs-spend-on-consultants/index.html"
)

for path in "${PILOT_PATHS[@]}"; do
  assert_file "$path" "pilot article dist"
done

for path in "${PILOT_PATHS[@]}"; do
  assert_not_grep "$path" "placeholder" "stub placeholder text"
  assert_grep "$path" "adaptation-attribution" "attribution component"
  assert_grep "$path" "on Vzhůru dolů" "attribution wording"
done

assert_grep "$EN_DIST/index.html" "Start here" "homepage start-here heading"
assert_grep "$EN_DIST/index.html" "/guide/webp" "homepage webp link"
assert_grep "$EN_DIST/guide/webp/index.html" 'href="/martin"' "author byline link"
assert_grep "$EN_DIST/martin/index.html" "pagespeed.one" "martin pagespeed CTA"

echo "Phase 7 content adaptation gate: PASS"
