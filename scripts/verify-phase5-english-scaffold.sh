#!/usr/bin/env bash
# Phase 5 English app scaffold gate — dual-app build and EN route assertions.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

echo "Phase 5 English scaffold gate: building both apps..."
if [[ "${VERIFY_SKIP_BUILD:-}" != "1" ]]; then
  npm run build -w @vd/vzhurudolu
  npm run build -w @vd/michalek-dev
else
  echo "Phase 5 English scaffold gate: skipping build (VERIFY_SKIP_BUILD=1)"
fi

echo "Phase 5 English scaffold gate: Czech dist smoke..."
test -d apps/vzhurudolu/dist/_astro

EN_DIST="apps/michalek-dev/dist"
echo "Phase 5 English scaffold gate: EN dist smoke..."
test -d "$EN_DIST"
test -f "$EN_DIST/index.html"
test -f "$EN_DIST/martin/index.html"
test -f "$EN_DIST/404.html"
test -f "$EN_DIST/blog/2025-year-in-review/index.html"
test -f "$EN_DIST/guide/webp/index.html"

if [[ -f "$EN_DIST/blog/index.html" || -f "$EN_DIST/guide/index.html" ]]; then
  echo "Phase 5 English scaffold gate: FAIL — listing pages must not exist at /blog/ or /guide/" >&2
  exit 1
fi

if ! grep -q 'Martin Michálek' "$EN_DIST/index.html"; then
  echo "Phase 5 English scaffold gate: FAIL — EN branding missing from homepage" >&2
  exit 1
fi

if ! grep -q "contentPathPrefix: '/guide'" apps/michalek-dev/astro.config.mjs; then
  echo "Phase 5 English scaffold gate: FAIL — astro.config must use contentPathPrefix '/guide'" >&2
  exit 1
fi

if ! grep -q '@vd/michalek-dev' .github/workflows/pr-build.yml; then
  echo "Phase 5 English scaffold gate: FAIL — pr-build.yml must build @vd/michalek-dev" >&2
  exit 1
fi

if ! grep -rq 'jquery\|disqus' "$EN_DIST" 2>/dev/null; then
  : # pass — no legacy scripts in EN dist
else
  echo "Phase 5 English scaffold gate: FAIL — jquery/disqus found in EN dist" >&2
  exit 1
fi

echo "Phase 5 English scaffold gate: PASS"
