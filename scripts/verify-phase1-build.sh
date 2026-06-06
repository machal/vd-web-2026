#!/usr/bin/env bash
# Phase 1 end-to-end build gate — verifies Czech app dist output after monorepo move.
set -euo pipefail

DIST_DIR="apps/vzhurudolu/dist"
ASTRO_DIR="${DIST_DIR}/_astro"

if [[ ! -d "$DIST_DIR" ]]; then
  echo "Phase 1 build gate: FAIL — ${DIST_DIR}/ missing" >&2
  exit 1
fi

if [[ ! -d "$ASTRO_DIR" ]] || [[ -z "$(ls -A "$ASTRO_DIR" 2>/dev/null)" ]]; then
  echo "Phase 1 build gate: FAIL — ${ASTRO_DIR}/ missing or empty" >&2
  exit 1
fi

# VD-02 draft smoke checks — activated in Plan 03
# TODO: verify no draft content in dist output
# TODO: verify frontmatter validation passed during build

echo "Phase 1 build gate: dist OK"
exit 0
