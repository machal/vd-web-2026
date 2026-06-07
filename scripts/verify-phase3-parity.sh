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

echo "Phase 3 parity gate: FAIL — sitemap diff not yet implemented" >&2
exit 1
