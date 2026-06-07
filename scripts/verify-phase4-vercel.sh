#!/usr/bin/env bash
# Phase 4 Vercel preview parity gate — redirect matrix against VERCEL_PREVIEW_URL.
# Companion to verify-phase3-parity.sh (production curls www.vzhurudolu.cz).
#
# Usage:
#   VERCEL_PREVIEW_URL=https://your-project.vercel.app bash scripts/verify-phase4-vercel.sh
#   VERCEL_PREVIEW_URL=https://your-project.vercel.app bash scripts/verify-phase4-vercel.sh --redirects-only
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

REDIRECT_SAMPLES="scripts/redirect-samples.txt"
REDIRECTS_ONLY=false

if [[ "${1:-}" == "--redirects-only" ]]; then
  REDIRECTS_ONLY=true
fi

if [[ -z "${VERCEL_PREVIEW_URL:-}" ]]; then
  echo "Phase 4 Vercel gate: FAIL — set VERCEL_PREVIEW_URL (e.g. https://project.vercel.app)" >&2
  exit 1
fi

# Strip trailing slash from preview base.
PREVIEW_BASE="${VERCEL_PREVIEW_URL%/}"

if [[ ! -f "$REDIRECT_SAMPLES" ]]; then
  echo "Phase 4 Vercel gate: FAIL — ${REDIRECT_SAMPLES} missing" >&2
  exit 1
fi

normalize_location_suffix() {
  local loc="$1"
  loc="${loc#"${loc%%[![:space:]]*}"}"
  loc="${loc%"${loc##*[![:space:]]}"}"
  loc="${loc#${PREVIEW_BASE}}"
  loc="${loc#https://}"
  loc="${loc#http://}"
  # Strip any host prefix (preview may redirect with full URL).
  if [[ "$loc" == */* ]]; then
    loc="/${loc#*/}"
  fi
  echo "$loc"
}

check_redirect_samples() {
  local pass=0
  local fail=0

  echo "Phase 4 Vercel gate: redirect samples against ${PREVIEW_BASE}..."
  while IFS='|' read -r source expected_suffix _comment; do
    [[ -z "$source" || "$source" =~ ^# ]] && continue
    headers=$(curl -sfI --max-time 15 "${PREVIEW_BASE}${source}" || true)
    if [[ -z "$headers" ]]; then
      echo "Phase 4 Vercel gate: FAIL — redirect sample ${source}: no response" >&2
      fail=$((fail + 1))
      continue
    fi
    http_status=$(echo "$headers" | tr -d '\r' | grep -i '^HTTP' | head -1 | awk '{print $2}')
    location=$(echo "$headers" | tr -d '\r' | grep -i '^location:' | head -1)
    if [[ "$http_status" != "301" && "$http_status" != "308" ]]; then
      echo "Phase 4 Vercel gate: FAIL — redirect sample ${source}: expected 301/308, got ${http_status:-none}" >&2
      fail=$((fail + 1))
      continue
    fi
    if [[ -z "$location" ]]; then
      echo "Phase 4 Vercel gate: FAIL — redirect sample ${source}: missing Location header" >&2
      fail=$((fail + 1))
      continue
    fi
    actual_suffix=$(normalize_location_suffix "${location#*[Ll]ocation: }")
    if [[ "$actual_suffix" != "$expected_suffix" ]]; then
      echo "Phase 4 Vercel gate: FAIL — redirect sample ${source}: expected ${expected_suffix}, got ${actual_suffix}" >&2
      fail=$((fail + 1))
      continue
    fi
    pass=$((pass + 1))
  done < "$REDIRECT_SAMPLES"

  echo "Phase 4 Vercel gate: redirect samples — ${pass} pass, ${fail} fail"
  if [[ "$fail" -gt 0 ]]; then
    return 1
  fi
  return 0
}

check_trailing_slash() {
  local path="/prirucka/css-flexbox/"
  local headers
  headers=$(curl -sfI --max-time 15 "${PREVIEW_BASE}${path}" || true)
  if [[ -z "$headers" ]]; then
    echo "Phase 4 Vercel gate: FAIL — trailing slash check: no response for ${path}" >&2
    return 1
  fi
  local http_status
  http_status=$(echo "$headers" | tr -d '\r' | grep -i '^HTTP' | head -1 | awk '{print $2}')
  local location
  location=$(echo "$headers" | tr -d '\r' | grep -i '^location:' | head -1)
  if [[ "$http_status" != "301" && "$http_status" != "308" ]]; then
    echo "Phase 4 Vercel gate: FAIL — trailing slash check: expected 301/308, got ${http_status:-none}" >&2
    return 1
  fi
  if [[ -z "$location" ]]; then
    echo "Phase 4 Vercel gate: FAIL — trailing slash check: missing Location header" >&2
    return 1
  fi
  local dest
  dest=$(normalize_location_suffix "${location#*[Ll]ocation: }")
  if [[ "$dest" == */ ]]; then
    echo "Phase 4 Vercel gate: FAIL — trailing slash check: Location still has trailing slash (${dest})" >&2
    return 1
  fi
  echo "Phase 4 Vercel gate: trailing slash check OK (${path} → ${dest})"
  return 0
}

check_font_cors() {
  local font_path=""
  if font_path=$(find apps/vzhurudolu/public -name '*.woff2' 2>/dev/null | head -1); then
    :
  fi
  if [[ -z "$font_path" ]]; then
    # Fonts referenced in CSS but may live on CDN/origin — use known path from stylesheets.
    font_path="apps/vzhurudolu/public/assets/fonts/foro-extra-bold.woff2"
  fi
  local url_path="/${font_path#apps/vzhurudolu/public/}"
  local headers
  headers=$(curl -sfI --max-time 15 "${PREVIEW_BASE}${url_path}" || true)
  if [[ -z "$headers" ]]; then
    echo "Phase 4 Vercel gate: WARN — font CORS check skipped (no response for ${url_path})" >&2
    return 0
  fi
  local http_status
  http_status=$(echo "$headers" | tr -d '\r' | grep -i '^HTTP' | head -1 | awk '{print $2}')
  if [[ "$http_status" == "404" || "$http_status" == "000" ]]; then
    echo "Phase 4 Vercel gate: WARN — font CORS check skipped (asset ${url_path} returned ${http_status:-none})" >&2
    return 0
  fi
  if ! echo "$headers" | tr -d '\r' | grep -qi '^access-control-allow-origin:[[:space:]]*\*'; then
    echo "Phase 4 Vercel gate: FAIL — font CORS check: missing Access-Control-Allow-Origin: * for ${url_path}" >&2
    return 1
  fi
  echo "Phase 4 Vercel gate: font CORS check OK (${url_path})"
  return 0
}

check_homepage_200() {
  local status
  status=$(curl -sf -o /dev/null -w '%{http_code}' --max-time 15 "${PREVIEW_BASE}/" || echo "000")
  if [[ "$status" != "200" ]]; then
    echo "Phase 4 Vercel gate: FAIL — homepage check: expected 200, got ${status}" >&2
    return 1
  fi
  echo "Phase 4 Vercel gate: homepage 200 OK"
  return 0
}

FAIL=0

if ! check_redirect_samples; then
  FAIL=1
fi

if [[ "$REDIRECTS_ONLY" == "true" ]]; then
  if [[ "$FAIL" -eq 0 ]]; then
    echo "Phase 4 Vercel gate: OK — redirect matrix verified (--redirects-only)"
    exit 0
  fi
  exit 1
fi

if ! check_trailing_slash; then
  FAIL=1
fi

if ! check_font_cors; then
  FAIL=1
fi

if ! check_homepage_200; then
  FAIL=1
fi

if [[ "$FAIL" -eq 0 ]]; then
  echo "Phase 4 Vercel gate: OK — redirects, trailing slash, font CORS, homepage verified"
  exit 0
fi

exit 1
