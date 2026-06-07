#!/usr/bin/env bash
# Phase 2 end-to-end extraction gate — extends Phase 1 dist smoke checks.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

echo "Phase 2 extraction gate: running Phase 1 dist checks..."
bash scripts/verify-phase1-build.sh

SHARED_PKG="packages/shared/package.json"
APP_PKG="apps/vzhurudolu/package.json"
ASTRO_CONFIG="apps/vzhurudolu/astro.config.mjs"

if [[ ! -f "$SHARED_PKG" ]]; then
  echo "Phase 2 extraction gate: FAIL — ${SHARED_PKG} missing" >&2
  exit 1
fi

if ! grep -q '"name": "@vd/shared"' "$SHARED_PKG"; then
  echo "Phase 2 extraction gate: FAIL — ${SHARED_PKG} must declare name @vd/shared" >&2
  exit 1
fi

if ! grep -q '"@vd/shared": "*"' "$APP_PKG"; then
  echo "Phase 2 extraction gate: FAIL — ${APP_PKG} must depend on @vd/shared" >&2
  exit 1
fi

if ! grep -q 'noExternal' "$ASTRO_CONFIG" || ! grep -q '@vd/shared' "$ASTRO_CONFIG"; then
  echo "Phase 2 extraction gate: FAIL — ${ASTRO_CONFIG} must set vite.ssr.noExternal for @vd/shared" >&2
  exit 1
fi

# @vd/shared import wiring in astro.config.mjs
for pattern in createMarkdownConfig createCustomSitemap '@vd/shared/vite-plugins'; do
  if ! grep -q "$pattern" "$ASTRO_CONFIG"; then
    echo "Phase 2 extraction gate: FAIL — ${ASTRO_CONFIG} must import/use ${pattern}" >&2
    exit 1
  fi
done

if ! grep -qE 'noExternal.*@vd/shared' "$ASTRO_CONFIG"; then
  echo "Phase 2 extraction gate: FAIL — ${ASTRO_CONFIG} must include noExternal for @vd/shared" >&2
  exit 1
fi

# Stale Vite plugins — must not remain in app root
for plugin in validate-frontmatter prirucka-images content-images design-images; do
  if [[ -f "apps/vzhurudolu/vite-plugin-${plugin}.ts" ]]; then
    echo "Phase 2 extraction gate: FAIL — stale vite-plugin at apps/vzhurudolu/vite-plugin-${plugin}.ts" >&2
    exit 1
  fi
done

# Stale markdown/SEO utils — must not remain in app src/utils
for stale in custom-sitemap remark-process-markdown-attributes rehype-prirucka-links; do
  if [[ -f "apps/vzhurudolu/src/utils/${stale}.ts" ]]; then
    echo "Phase 2 extraction gate: FAIL — stale util at apps/vzhurudolu/src/utils/${stale}.ts" >&2
    exit 1
  fi
done

# Stale layouts/components — must not remain in app tree
for stale in \
  "apps/vzhurudolu/src/layouts/BaseLayout.astro" \
  "apps/vzhurudolu/src/components/Header.astro" \
  "apps/vzhurudolu/src/components/Navigation.astro"; do
  if [[ -f "$stale" ]]; then
    echo "Phase 2 extraction gate: FAIL — stale file at ${stale}" >&2
    exit 1
  fi
done

# App-local files — must remain in app (D-13 content boundary)
for local in is-published get-related-articles changed-files-integration; do
  if [[ ! -f "apps/vzhurudolu/src/utils/${local}.ts" ]]; then
    echo "Phase 2 extraction gate: FAIL — app-local util missing: apps/vzhurudolu/src/utils/${local}.ts" >&2
    exit 1
  fi
done

echo "Phase 2 extraction gate: OK — scaffold, stale-path negation, and app-local preservation verified"
exit 0
