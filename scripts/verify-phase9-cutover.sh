#!/usr/bin/env bash
# Phase 9 production cutover smoke gate — both domains after DNS points to Vercel.
#
# Usage:
#   bash scripts/verify-phase9-cutover.sh
#   VZHURUDOLU_URL=https://www.vzhurudolu.cz MICHALEK_DEV_URL=https://michalek.dev bash scripts/verify-phase9-cutover.sh
#
# Override bases for preview/staging:
#   VZHURUDOLU_URL=https://your-cs-preview.vercel.app \
#   MICHALEK_DEV_URL=https://your-en-preview.vercel.app \
#   bash scripts/verify-phase9-cutover.sh
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

VZHURUDOLU_URL="${VZHURUDOLU_URL:-https://www.vzhurudolu.cz}"
MICHALEK_DEV_URL="${MICHALEK_DEV_URL:-https://michalek.dev}"
REDIRECT_SAMPLES="scripts/redirect-samples.txt"

CS_BASE="${VZHURUDOLU_URL%/}"
EN_BASE="${MICHALEK_DEV_URL%/}"

FAIL=0

check_http_200() {
  local base="$1"
  local path="$2"
  local label="$3"
  local status
  status=$(curl -sf -o /dev/null -w '%{http_code}' --max-time 20 "${base}${path}" || echo "000")
  if [[ "$status" != "200" ]]; then
    echo "Phase 9 cutover gate: FAIL — ${label}: expected 200, got ${status} (${base}${path})" >&2
    return 1
  fi
  echo "Phase 9 cutover gate: ${label} OK"
  return 0
}

normalize_location_suffix() {
  local loc="$1"
  local base="$2"
  loc="${loc#"${loc%%[![:space:]]*}"}"
  loc="${loc%"${loc##*[![:space:]]}"}"
  loc="${loc#${base}}"
  loc="${loc#https://}"
  loc="${loc#http://}"
  if [[ "$loc" == */* ]]; then
    loc="/${loc#*/}"
  fi
  echo "$loc"
}

check_redirect_samples() {
  local base="$1"
  local count=0
  local pass=0
  local fail=0

  if [[ ! -f "$REDIRECT_SAMPLES" ]]; then
    echo "Phase 9 cutover gate: FAIL — ${REDIRECT_SAMPLES} missing" >&2
    return 1
  fi

  echo "Phase 9 cutover gate: CS redirect samples against ${base}..."
  while IFS='|' read -r source expected_suffix _comment; do
    [[ -z "$source" || "$source" =~ ^# ]] && continue
    count=$((count + 1))
    [[ "$count" -gt 5 ]] && break

    headers=$(curl -sfI --max-time 20 "${base}${source}" || true)
    if [[ -z "$headers" ]]; then
      echo "Phase 9 cutover gate: FAIL — redirect ${source}: no response" >&2
      fail=$((fail + 1))
      continue
    fi
    http_status=$(echo "$headers" | tr -d '\r' | grep -i '^HTTP' | head -1 | awk '{print $2}')
    location=$(echo "$headers" | tr -d '\r' | grep -i '^location:' | head -1)
    if [[ "$http_status" != "301" && "$http_status" != "308" ]]; then
      echo "Phase 9 cutover gate: FAIL — redirect ${source}: expected 301/308, got ${http_status:-none}" >&2
      fail=$((fail + 1))
      continue
    fi
    if [[ -z "$location" ]]; then
      echo "Phase 9 cutover gate: FAIL — redirect ${source}: missing Location" >&2
      fail=$((fail + 1))
      continue
    fi
    actual_suffix=$(normalize_location_suffix "${location#*[Ll]ocation: }" "$base")
    if [[ "$actual_suffix" != "$expected_suffix" ]]; then
      echo "Phase 9 cutover gate: FAIL — redirect ${source}: expected ${expected_suffix}, got ${actual_suffix}" >&2
      fail=$((fail + 1))
      continue
    fi
    pass=$((pass + 1))
  done < "$REDIRECT_SAMPLES"

  echo "Phase 9 cutover gate: CS redirect samples — ${pass} pass, ${fail} fail"
  [[ "$fail" -eq 0 ]]
}

check_rss() {
  local base="$1"
  local label="$2"
  local body
  body=$(curl -sf --max-time 20 "${base}/rss" || true)
  if [[ -z "$body" ]]; then
    echo "Phase 9 cutover gate: FAIL — ${label} RSS: empty response" >&2
    return 1
  fi
  if ! echo "$body" | head -5 | grep -qiE 'rss|<feed|<channel'; then
    echo "Phase 9 cutover gate: FAIL — ${label} RSS: unexpected body" >&2
    return 1
  fi
  echo "Phase 9 cutover gate: ${label} RSS OK"
  return 0
}

echo "Phase 9 cutover gate: CS site ${CS_BASE}"
echo "Phase 9 cutover gate: EN site ${EN_BASE}"

if ! check_http_200 "$CS_BASE" "/" "CS homepage"; then
  FAIL=1
fi

if ! check_redirect_samples "$CS_BASE"; then
  FAIL=1
fi

if ! check_rss "$CS_BASE" "CS"; then
  FAIL=1
fi

if ! check_http_200 "$CS_BASE" "/sitemap.xml" "CS sitemap"; then
  FAIL=1
fi

echo "Phase 9 cutover gate: EN routes..."
if ! check_http_200 "$EN_BASE" "/" "EN homepage"; then
  FAIL=1
fi

if ! check_http_200 "$EN_BASE" "/martin" "EN /martin"; then
  FAIL=1
fi

if ! check_http_200 "$EN_BASE" "/guide/webp" "EN guide/webp"; then
  FAIL=1
fi

if ! check_http_200 "$EN_BASE" "/blog/2025-year-in-review" "EN blog pilot"; then
  FAIL=1
fi

if ! check_rss "$EN_BASE" "EN"; then
  FAIL=1
fi

if ! check_http_200 "$EN_BASE" "/sitemap.xml" "EN sitemap"; then
  FAIL=1
fi

if [[ "$FAIL" -eq 0 ]]; then
  echo "Phase 9 cutover gate: PASS — both domains smoke checks OK"
  exit 0
fi

exit 1
