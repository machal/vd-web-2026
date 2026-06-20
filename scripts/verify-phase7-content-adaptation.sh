#!/usr/bin/env bash
# Phase 7 content adaptation gate — full EN pilots, attribution, start-here, pairing.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

echo "Phase 7 content adaptation gate: running phase 6 pairing gate..."
VERIFY_SKIP_BUILD="${VERIFY_SKIP_BUILD:-}" bash scripts/verify-phase6-content-pairing-i18n-seo.sh

echo "Phase 7 content adaptation gate: building EN app..."
if [[ "${VERIFY_SKIP_BUILD:-}" != "1" ]]; then
  npm run build -w @vd/michalek-dev
else
  echo "Phase 7 content adaptation gate: skipping build (VERIFY_SKIP_BUILD=1)"
fi

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
done

# Phase 13 removed AdaptationAttribution footer from article detail (ART-02).
# adaptedFrom remains in content front matter; pairing gate covers hreflang/canonical.

assert_grep "$EN_DIST/guide/webp/index.html" 'href="/martin"' "author byline link"
assert_grep "$EN_DIST/martin/index.html" "pagespeed.one" "martin pagespeed CTA"

echo "Phase 7 content adaptation gate: recent EN blog assets..."
RECENT_BLOG_IMAGES=(
  "apps/michalek-dev/src/assets/img/content/blog/ps-one-insights-amazon.jpg"
  "apps/michalek-dev/src/assets/img/content/blog/skill-shapes.jpg"
  "apps/michalek-dev/src/assets/img/content/blog/skill-shaper-i-shaped.jpg"
  "apps/michalek-dev/src/assets/img/content/blog/skill-shaper-multi-skill.jpg"
  "apps/michalek-dev/src/assets/img/content/machal-webexpo-2026.jpg"
  "apps/michalek-dev/public/assets/img/content/dest/blog/ps-one-insights-amazon.webp"
  "apps/michalek-dev/public/assets/img/content/dest/blog/skill-shapes.webp"
  "apps/michalek-dev/public/assets/img/content/dest/machal-webexpo-2026.webp"
)
for path in "${RECENT_BLOG_IMAGES[@]}"; do
  assert_file "$path" "EN blog image asset"
done

assert_file "$EN_DIST/blog/ceo-takes-your-job/index.html" "ceo-takes-your-job article"
assert_file "$EN_DIST/blog/webexpo-2026/index.html" "webexpo-2026 article"
assert_grep "$EN_DIST/blog/ceo-takes-your-job/index.html" 'ps-one-insights-amazon.webp' "ceo article hero image"
assert_grep "$EN_DIST/blog/webexpo-2026/index.html" 'machal-webexpo-2026.webp' "webexpo og/body image"

# Homepage "Start here" (CONT-06) shipped in Phase 7; removed in Phase 12 CS parity.
# Author box + topic hub layout covered by verify-phase14-v1-1-visual-polish.sh.

echo "Phase 7 content adaptation gate: PASS"
