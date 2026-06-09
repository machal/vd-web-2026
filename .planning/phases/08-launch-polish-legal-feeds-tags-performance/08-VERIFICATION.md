# Phase 8 Verification: Launch Polish — Legal, Feeds, Tags, Performance

**Status:** passed  
**Verified:** 2026-06-09  
**Gate:** `bash scripts/verify-phase8-launch-polish.sh`

## Automated Checks

| Check | Result |
|-------|--------|
| EN build (`@vd/michalek-dev`) | PASS |
| `sitemap.xml` generated | PASS |
| `robots.txt` + sitemap reference | PASS |
| `/rss` unified feed | PASS |
| Tag archives (`/performance`, `/ai`) | PASS |
| Tags visible on article pages | PASS |
| `lang="en"` on public pages | PASS |
| OG + Twitter Card meta | PASS |
| Person JSON-LD on `/martin` with `sameAs` | PASS |
| Article JSON-LD on pilot articles | PASS |
| Privacy + cookie policies (no stubs) | PASS |
| Cookie consent banner present | PASS |
| GA deferred (no blocking gtag in HTML) | PASS |
| No jQuery / Disqus in EN dist | PASS |

## Requirements Covered

- EN-09: Tag taxonomy + `/{tag}/` archive pages
- EN-10: Tags visible on article detail pages
- SEO-01: Unique title + meta description per page
- SEO-02: Open Graph + Twitter Card metadata
- SEO-03: XML sitemap
- SEO-04: RSS at `/rss`
- SEO-05: `robots.txt` references sitemap
- SEO-06: `lang="en"` on English pages
- SEO-07: Person + Article JSON-LD with `sameAs`
- LEGAL-01: English privacy policy (GDPR, Vercel)
- LEGAL-02: Cookie policy + consent for analytics
- LEGAL-03: Footer links to privacy and cookies
- PERF-02: Third-party scripts deferred; cookie-gated GA
- PERF-04: GA4 loads only after analytics consent

## Manual UAT (optional)

- Visual check of cookie banner on first visit (incognito)
- Confirm “Accept analytics” loads GA when `PUBLIC_GA_MEASUREMENT_ID` is set in Vercel
- Lighthouse mobile spot-check on homepage and one article (aspirational, not gate)

## Notes

- GA measurement ID via `PUBLIC_GA_MEASUREMENT_ID` env var — unset in local builds (loader present, no network call)
- Phase 9 covers DNS cutover and production deploy
