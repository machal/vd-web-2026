#!/usr/bin/env bash
# Phase 6 content pairing & i18n SEO gate — validator, dual-app build, dist assertions.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

echo "Phase 6 content pairing gate: validating CONTENT_PAIRS manifest..."
node scripts/validate-content-pairs.mjs

echo "Phase 6 content pairing gate: building both apps..."
npm run build -w @vd/vzhurudolu
npm run build -w @vd/michalek-dev

CS_DIST="apps/vzhurudolu/dist"
EN_DIST="apps/michalek-dev/dist"

assert_file() {
  local file="$1"
  local label="$2"
  if [[ ! -f "$file" ]]; then
    echo "Phase 6 content pairing gate: FAIL — missing $label ($file)" >&2
    exit 1
  fi
}

assert_grep() {
  local file="$1"
  local pattern="$2"
  local label="$3"
  if ! grep -q "$pattern" "$file"; then
    echo "Phase 6 content pairing gate: FAIL — $label not found in $file" >&2
    exit 1
  fi
}

assert_not_grep() {
  local file="$1"
  local pattern="$2"
  local label="$3"
  if grep -q "$pattern" "$file"; then
    echo "Phase 6 content pairing gate: FAIL — $label unexpectedly found in $file" >&2
    exit 1
  fi
}

CS_WEBP="$CS_DIST/prirucka/webp/index.html"
CS_BLOG="$CS_DIST/blog/261-rok-2025/index.html"
EN_GUIDE="$EN_DIST/guide/webp/index.html"
EN_BLOG="$EN_DIST/blog/2025-year-in-review/index.html"

echo "Phase 6 content pairing gate: CS paired page assertions..."
assert_file "$CS_WEBP" "CS prirucka/webp"
assert_file "$CS_BLOG" "CS blog/261-rok-2025"
assert_grep "$CS_WEBP" 'hreflang="en"' "CS webp hreflang en"
assert_grep "$CS_WEBP" 'hreflang="cs"' "CS webp hreflang cs"
assert_grep "$CS_WEBP" 'hreflang="x-default"' "CS webp hreflang x-default"
assert_grep "$CS_WEBP" 'michalek.dev/guide/webp' "CS webp x-default/en target"
assert_grep "$CS_WEBP" 'rel="canonical" href="https://www.vzhurudolu.cz/prirucka/webp"' "CS webp self canonical"
assert_grep "$CS_WEBP" 'English' "CS webp language switch"

echo "Phase 6 content pairing gate: EN paired page assertions..."
assert_file "$EN_GUIDE" "EN guide/webp"
assert_file "$EN_BLOG" "EN blog/2025-year-in-review"
assert_grep "$EN_GUIDE" 'hreflang="cs"' "EN webp hreflang cs"
assert_grep "$EN_GUIDE" 'hreflang="en"' "EN webp hreflang en"
assert_grep "$EN_GUIDE" 'hreflang="x-default"' "EN webp hreflang x-default"
assert_grep "$EN_GUIDE" 'rel="canonical" href="https://michalek.dev/guide/webp"' "EN webp self canonical"
assert_grep "$EN_GUIDE" 'vzhurudolu.cz/prirucka/webp' "EN webp Česky link target"
assert_grep "$EN_GUIDE" 'Česky' "EN webp language switch"

echo "Phase 6 content pairing gate: /martin cross-site footer link on both sites..."
assert_file "$CS_DIST/martin/index.html" "CS /martin"
assert_file "$EN_DIST/martin/index.html" "EN /martin"
assert_not_grep "$CS_DIST/martin/index.html" 'language-switch' "CS martin no language switch"
assert_not_grep "$EN_DIST/martin/index.html" 'language-switch' "EN martin no language switch"
assert_grep "$CS_DIST/martin/index.html" 'michalek.dev' "CS martin EN footer link"
assert_grep "$EN_DIST/martin/index.html" 'vzhurudolu.cz' "EN martin CS footer link"

echo "Phase 6 content pairing gate: unpaired CS homepage lacks pairing hreflang cluster..."
assert_not_grep "$CS_DIST/index.html" 'michalek.dev/guide/' "CS homepage guide pairing link"

echo "Phase 6 content pairing gate: no Accept-Language auto-redirect (I18N-07)..."
if grep -rq 'Accept-Language' apps/vzhurudolu/vercel.json apps/michalek-dev/vercel.json 2>/dev/null; then
  echo "Phase 6 content pairing gate: FAIL — Accept-Language redirect in vercel.json" >&2
  exit 1
fi
if grep -rq 'Accept-Language' apps/vzhurudolu/astro.config.mjs apps/michalek-dev/astro.config.mjs 2>/dev/null; then
  echo "Phase 6 content pairing gate: FAIL — Accept-Language redirect in astro.config" >&2
  exit 1
fi

echo "Phase 6 content pairing gate: PASS"
