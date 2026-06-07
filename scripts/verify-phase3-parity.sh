#!/usr/bin/env bash
# Phase 3 Czech site parity gate — extends Phase 2 extraction checks.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

DIST_DIR="apps/vzhurudolu/dist"

if [[ ! -d "$DIST_DIR" ]]; then
  echo "Phase 3 parity gate: FAIL — ${DIST_DIR}/ missing (run build first)" >&2
  exit 1
fi

echo "Phase 3 parity gate: Phase 2 extraction checks..."
bash scripts/verify-phase2-extraction.sh

if [[ ! -f "${DIST_DIR}/.htaccess" ]]; then
  echo "Phase 3 parity gate: FAIL — ${DIST_DIR}/.htaccess missing" >&2
  exit 1
fi

# Plan 03: linkinator internal link crawl
# npx --yes linkinator@7.6.1 apps/vzhurudolu/dist \
#   --recurse --clean-urls \
#   --skip '^mailto:' --skip '^#' --skip '^data:' --skip '/style/' \
#   --verbosity error

# Plan 03: production redirect chain sampling
# check_redirect_samples() { ... }

extract_paths() {
  sed -n 's|.*<loc>https://www.vzhurudolu.cz\(.*\)</loc>.*|\1|p' "$1" | sort -u
}

echo "Phase 3 parity gate: sitemap path diff..."
PROD_SITEMAP=$(mktemp)
LOCAL_SITEMAP="${DIST_DIR}/sitemap.xml"
PROD_PATHS=$(mktemp)
LOCAL_PATHS=$(mktemp)
trap 'rm -f "$PROD_SITEMAP" "$PROD_PATHS" "$LOCAL_PATHS"' EXIT

if ! curl -sf "https://www.vzhurudolu.cz/sitemap.xml" -o "$PROD_SITEMAP"; then
  echo "Phase 3 parity gate: FAIL — could not fetch production sitemap (network required)" >&2
  exit 1
fi

extract_paths "$PROD_SITEMAP" > "$PROD_PATHS"
extract_paths "$LOCAL_SITEMAP" > "$LOCAL_PATHS"

PROD_COUNT=$(wc -l < "$PROD_PATHS" | tr -d ' ')
LOCAL_COUNT=$(wc -l < "$LOCAL_PATHS" | tr -d ' ')

MISSING=$(comm -23 "$PROD_PATHS" "$LOCAL_PATHS" || true)
MISSING_COUNT=0
if [[ -n "$MISSING" ]]; then
  MISSING_COUNT=$(echo "$MISSING" | wc -l | tr -d ' ')
fi

EXTRAS=$(comm -13 "$PROD_PATHS" "$LOCAL_PATHS" || true)
EXTRAS_COUNT=0
if [[ -n "$EXTRAS" ]]; then
  EXTRAS_COUNT=$(echo "$EXTRAS" | wc -l | tr -d ' ')
fi

echo "Phase 3 parity gate: sitemap counts — prod ${PROD_COUNT}, local ${LOCAL_COUNT}, missing ${MISSING_COUNT}, extras ${EXTRAS_COUNT}"

if [[ -n "$MISSING" ]]; then
  echo "Phase 3 parity gate: FAIL — paths in production sitemap missing from dist:" >&2
  echo "$MISSING" | head -20 >&2
  exit 1
fi

if [[ -n "$EXTRAS" ]]; then
  echo "Phase 3 parity gate: WARN — local-only sitemap paths (not in production):" >&2
  echo "$EXTRAS" | head -20 >&2
fi

echo "Phase 3 parity gate: FAIL — dist file existence check not yet implemented" >&2
exit 1
