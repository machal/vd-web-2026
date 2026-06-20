# Phase 8 Verification: Launch Polish — Legal, Feeds, Tags, Performance

**Status:** passed  
**Verified:** 2026-06-20  
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
| Footer links to privacy and cookies | PASS |
| GA4 async (no cookie banner — owner decision) | PASS |
| No jQuery / Disqus in EN dist | PASS |

## Requirements Covered

- EN-09: Tag taxonomy + `/{tag}/` archive pages
- EN-10: Tags visible on article detail pages
- SEO-01 through SEO-07
- LEGAL-01: English privacy policy (GDPR, Vercel)
- LEGAL-02: Cookie policy page (no interactive consent banner — 2026-06-20)
- LEGAL-03: Footer links to privacy and cookies
- PERF-02: Third-party scripts async
- PERF-04: GA4 integrated without blocking critical rendering path

## Notes

- Cookie consent banner removed from scope per owner decision (2026-06-20). GA loads async via `DeferredAnalytics`; users may block via browser or Google opt-out add-on.
- `verify-phase8-launch-polish.sh` updated to match.
