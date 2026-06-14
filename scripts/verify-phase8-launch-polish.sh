#!/usr/bin/env bash
# Phase 8 launch polish gate — EN build, feeds, tags, legal, SEO, deferred GA.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

echo "Phase 8 launch polish gate: building English app..."
npm run build -w @vd/michalek-dev

EN_DIST="apps/michalek-dev/dist"

assert_file() {
  local file="$1"
  local label="$2"
  if [[ ! -f "$file" ]]; then
    echo "Phase 8 launch polish gate: FAIL — missing $label ($file)" >&2
    exit 1
  fi
}

assert_grep() {
  local file="$1"
  local pattern="$2"
  local label="$3"
  if ! grep -q "$pattern" "$file"; then
    echo "Phase 8 launch polish gate: FAIL — $label not found in $file" >&2
    exit 1
  fi
}

assert_not_grep() {
  local file="$1"
  local pattern="$2"
  local label="$3"
  if grep -q "$pattern" "$file"; then
    echo "Phase 8 launch polish gate: FAIL — $label unexpectedly found in $file" >&2
    exit 1
  fi
}

echo "Phase 8 launch polish gate: discovery files..."
assert_file "$EN_DIST/sitemap.xml" "sitemap.xml"
assert_file "$EN_DIST/robots.txt" "robots.txt"
assert_file "$EN_DIST/rss" "RSS feed"
assert_grep "$EN_DIST/robots.txt" 'Sitemap: https://michalek.blog/sitemap.xml' "robots sitemap reference"

echo "Phase 8 launch polish gate: tag archive pages..."
assert_file "$EN_DIST/performance/index.html" "tag /performance"
assert_file "$EN_DIST/ai/index.html" "tag /ai"
assert_grep "$EN_DIST/guide/webp/index.html" 'href="/performance"' "article tag link"
assert_grep "$EN_DIST/guide/webp/index.html" 'Tagged in:' "tag footer label"

echo "Phase 8 launch polish gate: SEO and JSON-LD..."
assert_grep "$EN_DIST/index.html" 'lang="en"' "homepage lang=en"
assert_grep "$EN_DIST/index.html" 'property="og:title"' "homepage OG title"
assert_grep "$EN_DIST/index.html" 'name="twitter:card"' "homepage Twitter card"
assert_grep "$EN_DIST/martin/index.html" '"@type":"Person"' "Person JSON-LD on /martin"
assert_grep "$EN_DIST/martin/index.html" 'linkedin.com/in/martinmichalek' "Person sameAs LinkedIn"
assert_grep "$EN_DIST/martin/index.html" 'pagespeed.one' "Person sameAs pagespeed.one"
assert_grep "$EN_DIST/guide/webp/index.html" '"@type":"Article"' "Article JSON-LD"
assert_grep "$EN_DIST/guide/webp/index.html" 'rel="canonical" href="https://michalek.blog/guide/webp"' "article self canonical"

echo "Phase 8 launch polish gate: legal pages..."
assert_file "$EN_DIST/privacy/index.html" "privacy page"
assert_file "$EN_DIST/cookies/index.html" "cookies page"
assert_grep "$EN_DIST/privacy/index.html" 'Vercel' "privacy mentions Vercel"
assert_not_grep "$EN_DIST/privacy/index.html" 'coming soon' "privacy stub removed"
assert_not_grep "$EN_DIST/cookies/index.html" 'coming soon' "cookies stub removed"
assert_grep "$EN_DIST/index.html" 'href="/privacy"' "footer privacy link"
assert_grep "$EN_DIST/index.html" 'cookie-consent' "cookie banner markup"

echo "Phase 8 launch polish gate: deferred analytics (no blocking GA in HTML)..."
assert_not_grep "$EN_DIST/index.html" 'googletagmanager.com/gtag/js' "no sync GA script in HTML"
assert_grep "$EN_DIST/index.html" 'michalek-cookie-consent' "consent storage key in bundle"

echo "Phase 8 launch polish gate: RSS content..."
assert_grep "$EN_DIST/rss" 'WebP images' "RSS includes pilot article"
assert_grep "$EN_DIST/rss" '<language>en-us</language>' "RSS language en-us"

echo "Phase 8 launch polish gate: sitemap coverage..."
assert_grep "$EN_DIST/sitemap.xml" 'michalek.blog/guide/webp' "sitemap guide URL"
assert_grep "$EN_DIST/sitemap.xml" 'michalek.blog/performance' "sitemap tag URL"
assert_grep "$EN_DIST/sitemap.xml" 'michalek.blog/privacy' "sitemap privacy URL"

echo "Phase 8 launch polish gate: no legacy bloat..."
if grep -rq 'jquery\|disqus' "$EN_DIST" 2>/dev/null; then
  echo "Phase 8 launch polish gate: FAIL — jquery/disqus found in EN dist" >&2
  exit 1
fi

echo "Phase 8 launch polish gate: PASS"
