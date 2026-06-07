#!/usr/bin/env bash
# Phase 1 end-to-end build gate — verifies Czech app dist output after monorepo move.
set -euo pipefail

DIST_DIR="apps/vzhurudolu/dist"
ASTRO_DIR="${DIST_DIR}/_astro"
DRAFT_HTML="${DIST_DIR}/blog/115-google-speed-https/index.html"
SITEMAP="${DIST_DIR}/sitemap.xml"

if [[ ! -d "$DIST_DIR" ]]; then
  echo "Phase 1 build gate: FAIL — ${DIST_DIR}/ missing" >&2
  exit 1
fi

if [[ ! -d "$ASTRO_DIR" ]] || [[ -z "$(ls -A "$ASTRO_DIR" 2>/dev/null)" ]]; then
  echo "Phase 1 build gate: FAIL — ${ASTRO_DIR}/ missing or empty" >&2
  exit 1
fi

if [[ -e "$DRAFT_HTML" ]]; then
  echo "Phase 1 build gate: FAIL — draft page present at ${DRAFT_HTML}" >&2
  exit 1
fi

if [[ ! -f "$SITEMAP" ]]; then
  echo "Phase 1 build gate: FAIL — ${SITEMAP} missing" >&2
  exit 1
fi

if grep -q '115-google-speed-https' "$SITEMAP"; then
  echo "Phase 1 build gate: FAIL — draft slug 115-google-speed-https found in sitemap" >&2
  exit 1
fi

echo "Phase 1 build gate: dist OK"
exit 0
