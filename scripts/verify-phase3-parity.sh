#!/usr/bin/env bash
# Phase 3 Czech site parity gate — extends Phase 2 extraction checks.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

DIST_DIR="apps/vzhurudolu/dist"
DRAFT_BLOG_DIR="apps/vzhurudolu/src/content/blog"
REDIRECT_SAMPLES="scripts/redirect-samples.txt"

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

LINKS_ONLY=false
if [[ "${1:-}" == "--links-only" ]]; then
  LINKS_ONLY=true
fi

collect_draft_exclude_paths() {
  local f slug
  for f in "${DRAFT_BLOG_DIR}"/*.md; do
    [[ -f "$f" ]] || continue
    if grep -q '^postStatus: Draft' "$f"; then
      slug=$(basename "$f" .md)
      echo "/blog/${slug}"
    fi
  done
}

extract_paths() {
  sed -n 's|.*<loc>https://www.vzhurudolu.cz\(.*\)</loc>.*|\1|p' "$1" | sort -u
}

path_to_file() {
  local p="$1"
  if [[ "$p" == "/" ]]; then
    echo "${DIST_DIR}/index.html"
  else
    echo "${DIST_DIR}${p}/index.html"
  fi
}

normalize_location_suffix() {
  local loc="$1"
  loc="${loc#"${loc%%[![:space:]]*}"}"
  loc="${loc%"${loc##*[![:space:]]}"}"
  loc="${loc#https://www.vzhurudolu.cz}"
  loc="${loc#http://www.vzhurudolu.cz}"
  echo "$loc"
}

check_production_status() {
  local path="$1"
  curl -sfI --max-time 15 "https://www.vzhurudolu.cz${path}" 2>/dev/null | tr -d '\r' | grep -i '^HTTP' | head -1 | awk '{print $2}'
}

run_linkinator() {
  local port=8765
  local origin="http://127.0.0.1:${port}"
  local log
  log=$(mktemp)
  local -a skip_args=(
    --skip '^mailto:'
    --skip '^#'
    --skip '^data:'
    --skip '/style/'
    --skip '\.md$'
    --skip '^https://(?!www\.vzhurudolu\.cz)'
    --skip '^http://(?!127\.0\.0\.1)'
    --skip "${origin}/kurzy/.+"
    --skip "${origin}/prace/.+"
  )
  local source
  while IFS='|' read -r source _rest; do
    [[ -z "$source" || "$source" =~ ^# ]] && continue
    skip_args+=(--skip "${origin}${source}(/|$)")
  done < "$REDIRECT_SAMPLES"

  python3 -m http.server "$port" --directory "$DIST_DIR" >/dev/null 2>&1 &
  local server_pid=$!
  local ready=0
  for _ in $(seq 1 30); do
    if curl -sf "${origin}/" >/dev/null 2>&1; then
      ready=1
      break
    fi
    sleep 0.2
  done
  if [[ "$ready" -ne 1 ]]; then
    kill "$server_pid" 2>/dev/null || true
    rm -f "$log"
    echo "Phase 3 parity gate: FAIL — local dist server did not start" >&2
    return 1
  fi

  set +e
  npx --yes linkinator@7.6.1 "$origin" \
    --recurse \
    --clean-urls \
    "${skip_args[@]}" \
    --url-rewrite-search 'https://www.vzhurudolu.cz' \
    --url-rewrite-replace "$origin" \
    --verbosity error 2>&1 | tee "$log"
  local rc=${PIPESTATUS[0]}
  set -e
  kill "$server_pid" 2>/dev/null || true
  wait "$server_pid" 2>/dev/null || true

  if [[ "$rc" -eq 0 ]]; then
    rm -f "$log"
    return 0
  fi

  broken=()
  while IFS= read -r line; do
    [[ -n "$line" ]] && broken+=("$line")
  done < <(grep -oE '\[404\] '"${origin}"'[^ ]+' "$log" | sed "s|^\[404\] ${origin}||" | sort -u || true)

  if [[ ${#broken[@]} -eq 0 ]]; then
    rm -f "$log"
    echo "Phase 3 parity gate: FAIL — linkinator reported errors but no [404] paths parsed" >&2
    return 1
  fi
  local regressions=0
  local legacy=0
  local path prod_status
  for path in "${broken[@]}"; do
    prod_status=$(check_production_status "$path")
    if [[ "$prod_status" == "200" ]]; then
      echo "Phase 3 parity gate: FAIL — local 404 but production 200: ${path}" >&2
      regressions=$((regressions + 1))
    else
      legacy=$((legacy + 1))
    fi
  done

  rm -f "$log"
  if [[ "$regressions" -gt 0 ]]; then
    return 1
  fi
  echo "Phase 3 parity gate: WARN — ${#broken[@]} local 404 links match production legacy/redirect behavior (${legacy} non-200 on prod)"
  return 0
}

if [[ "$LINKS_ONLY" == true ]]; then
  if [[ ! -f "$REDIRECT_SAMPLES" ]]; then
    echo "Phase 3 parity gate: FAIL — ${REDIRECT_SAMPLES} missing" >&2
    exit 1
  fi
  echo "Phase 3 parity gate: internal link crawl (CI links-only mode)..."
  if ! run_linkinator; then
    echo "Phase 3 parity gate: FAIL — broken internal links detected" >&2
    exit 1
  fi
  echo "Phase 3 parity gate: internal links OK"
  exit 0
fi

echo "Phase 3 parity gate: sitemap path diff..."
PROD_SITEMAP=$(mktemp)
LOCAL_SITEMAP="${DIST_DIR}/sitemap.xml"
PROD_PATHS=$(mktemp)
LOCAL_PATHS=$(mktemp)
DRAFT_EXCLUDES=$(mktemp)
FILTERED_MISSING=$(mktemp)
DRAFT_MISSING=$(mktemp)
trap 'rm -f "$PROD_SITEMAP" "$PROD_PATHS" "$LOCAL_PATHS" "$DRAFT_EXCLUDES" "$FILTERED_MISSING" "$DRAFT_MISSING"' EXIT

if ! curl -sf "https://www.vzhurudolu.cz/sitemap.xml" -o "$PROD_SITEMAP"; then
  echo "Phase 3 parity gate: FAIL — could not fetch production sitemap (network required)" >&2
  exit 1
fi

extract_paths "$PROD_SITEMAP" > "$PROD_PATHS"
extract_paths "$LOCAL_SITEMAP" > "$LOCAL_PATHS"
collect_draft_exclude_paths | sort -u > "$DRAFT_EXCLUDES"

PROD_COUNT=$(wc -l < "$PROD_PATHS" | tr -d ' ')
LOCAL_COUNT=$(wc -l < "$LOCAL_PATHS" | tr -d ' ')

MISSING=$(comm -23 "$PROD_PATHS" "$LOCAL_PATHS" || true)
: > "$FILTERED_MISSING"
: > "$DRAFT_MISSING"
while IFS= read -r path; do
  [[ -z "$path" ]] && continue
  if grep -Fxq "$path" "$DRAFT_EXCLUDES"; then
    echo "$path" >> "$DRAFT_MISSING"
  else
    echo "$path" >> "$FILTERED_MISSING"
  fi
done <<< "$MISSING"

MISSING_COUNT=0
if [[ -s "$FILTERED_MISSING" ]]; then
  MISSING_COUNT=$(wc -l < "$FILTERED_MISSING" | tr -d ' ')
fi

DRAFT_MISSING_COUNT=0
if [[ -s "$DRAFT_MISSING" ]]; then
  DRAFT_MISSING_COUNT=$(wc -l < "$DRAFT_MISSING" | tr -d ' ')
fi

EXTRAS=$(comm -13 "$PROD_PATHS" "$LOCAL_PATHS" || true)
EXTRAS_COUNT=0
if [[ -n "$EXTRAS" ]]; then
  EXTRAS_COUNT=$(echo "$EXTRAS" | wc -l | tr -d ' ')
fi

echo "Phase 3 parity gate: sitemap counts — prod ${PROD_COUNT}, local ${LOCAL_COUNT}, missing ${MISSING_COUNT}, draft-excluded ${DRAFT_MISSING_COUNT}, extras ${EXTRAS_COUNT}"

if [[ -s "$DRAFT_MISSING" ]]; then
  echo "Phase 3 parity gate: INFO — production sitemap paths excluded (local drafts per D-03):"
  head -20 "$DRAFT_MISSING"
fi

if [[ -s "$FILTERED_MISSING" ]]; then
  echo "Phase 3 parity gate: FAIL — paths in production sitemap missing from dist:" >&2
  head -20 "$FILTERED_MISSING" >&2
  exit 1
fi

if [[ -n "$EXTRAS" ]]; then
  echo "Phase 3 parity gate: WARN — local-only sitemap paths (not in production):" >&2
  echo "$EXTRAS" | head -20 >&2
fi

echo "Phase 3 parity gate: dist file existence..."
MISSING_FILES=()
while IFS= read -r path; do
  [[ -z "$path" ]] && continue
  file=$(path_to_file "$path")
  if [[ ! -f "$file" ]]; then
    MISSING_FILES+=("$path → $file")
  fi
done < "$LOCAL_PATHS"

if [[ ${#MISSING_FILES[@]} -gt 0 ]]; then
  echo "Phase 3 parity gate: FAIL — sitemap paths missing dist HTML (${#MISSING_FILES[@]}):" >&2
  printf '%s\n' "${MISSING_FILES[@]}" | head -20 >&2
  exit 1
fi

if [[ ! -f "$REDIRECT_SAMPLES" ]]; then
  echo "Phase 3 parity gate: FAIL — ${REDIRECT_SAMPLES} missing" >&2
  exit 1
fi

echo "Phase 3 parity gate: internal link crawl..."
if ! run_linkinator; then
  echo "Phase 3 parity gate: FAIL — broken internal links detected" >&2
  exit 1
fi
echo "Phase 3 parity gate: internal links OK"

echo "Phase 3 parity gate: production redirect samples..."
REDIRECT_PASS=0
REDIRECT_FAIL=0
while IFS='|' read -r source expected_suffix _comment; do
  [[ -z "$source" || "$source" =~ ^# ]] && continue
  headers=$(curl -sfI "https://www.vzhurudolu.cz${source}" || true)
  if [[ -z "$headers" ]]; then
    echo "Phase 3 parity gate: FAIL — redirect sample ${source}: no response" >&2
    REDIRECT_FAIL=$((REDIRECT_FAIL + 1))
    continue
  fi
  http_status=$(echo "$headers" | tr -d '\r' | grep -i '^HTTP' | head -1 | awk '{print $2}')
  location=$(echo "$headers" | tr -d '\r' | grep -i '^location:' | head -1)
  if [[ "$http_status" != "301" && "$http_status" != "308" ]]; then
    echo "Phase 3 parity gate: FAIL — redirect sample ${source}: expected 301/308, got ${http_status:-none}" >&2
    REDIRECT_FAIL=$((REDIRECT_FAIL + 1))
    continue
  fi
  if [[ -z "$location" ]]; then
    echo "Phase 3 parity gate: FAIL — redirect sample ${source}: missing Location header" >&2
    REDIRECT_FAIL=$((REDIRECT_FAIL + 1))
    continue
  fi
  actual_suffix=$(normalize_location_suffix "${location#*[Ll]ocation: }")
  if [[ "$actual_suffix" != "$expected_suffix" ]]; then
    echo "Phase 3 parity gate: FAIL — redirect sample ${source}: expected ${expected_suffix}, got ${actual_suffix}" >&2
    REDIRECT_FAIL=$((REDIRECT_FAIL + 1))
    continue
  fi
  REDIRECT_PASS=$((REDIRECT_PASS + 1))
done < "$REDIRECT_SAMPLES"

echo "Phase 3 parity gate: redirect samples — ${REDIRECT_PASS} pass, ${REDIRECT_FAIL} fail"
if [[ "$REDIRECT_FAIL" -gt 0 ]]; then
  exit 1
fi

echo "Phase 3 parity gate: OK — phase2 green, sitemap parity, dist files, links, redirects verified"
exit 0
