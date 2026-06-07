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

# ---------------------------------------------------------------------------
# Stale-path assertions — activate in Plan 05 after file moves complete.
# Uncomment each block when the corresponding files move to @vd/shared.
# ---------------------------------------------------------------------------
# Vite plugins (currently at apps/vzhurudolu/vite-plugin-*.ts):
# for plugin in validate-frontmatter prirucka-images content-images design-images; do
#   if [[ -f "apps/vzhurudolu/vite-plugin-${plugin}.ts" ]]; then
#     echo "Phase 2 extraction gate: FAIL — stale vite-plugin at apps/vzhurudolu/vite-plugin-${plugin}.ts" >&2
#     exit 1
#   fi
# done
#
# Markdown utils (currently at apps/vzhurudolu/src/utils/remark-*.ts, rehype-*.ts):
# for stale in remark-process-markdown-attributes remark-heading-ids remark-prirucka-images \
#   remark-normalize-code-lang rehype-prirucka-images rehype-prirucka-links \
#   rehype-connected-elements rehype-related-to-inner-box rehype-remove-ebook-only \
#   rehype-remove-first-h1 rehype-heading-anchors; do
#   if [[ -f "apps/vzhurudolu/src/utils/${stale}.ts" ]]; then
#     echo "Phase 2 extraction gate: FAIL — stale markdown util at apps/vzhurudolu/src/utils/${stale}.ts" >&2
#     exit 1
#   fi
# done
#
# SEO helper (currently at apps/vzhurudolu/src/utils/custom-sitemap.ts):
# if [[ -f "apps/vzhurudolu/src/utils/custom-sitemap.ts" ]]; then
#   echo "Phase 2 extraction gate: FAIL — stale custom-sitemap at apps/vzhurudolu/src/utils/custom-sitemap.ts" >&2
#   exit 1
# fi

echo "Phase 2 extraction gate: scaffold OK"
exit 0
