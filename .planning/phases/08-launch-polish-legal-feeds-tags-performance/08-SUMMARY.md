---
phase: 08-launch-polish-legal-feeds-tags-performance
plan: 05
subsystem: seo
tags: [rss, sitemap, json-ld, tags, gdpr, ga4, cookies]

requires:
  - phase: 07-content-adaptation-pilot-8-martin
    provides: 8 EN pilot articles with tags in front matter
provides:
  - EN tag archive pages at /{tag}/
  - RSS at /rss and sitemap.xml via createCustomSitemap
  - robots.txt with sitemap reference
  - Person + Article JSON-LD with sameAs
  - GDPR privacy/cookie pages and consent banner
  - Cookie-gated deferred GA4 loader
  - verify-phase8-launch-polish.sh CI gate
affects: [09-production-cutover]

tech-stack:
  added: ["@astrojs/rss in michalek-dev"]
  patterns: ["tags.ts taxonomy", "json-ld helpers", "cookie-consent localStorage gate"]

key-files:
  created:
    - apps/michalek-dev/src/data/tags.ts
    - apps/michalek-dev/src/pages/[tag].astro
    - apps/michalek-dev/src/pages/rss.ts
    - apps/michalek-dev/public/robots.txt
    - packages/shared/seo/json-ld.ts
    - packages/shared/components/JsonLd.astro
    - packages/shared/components/CookieConsent.astro
    - packages/shared/components/DeferredAnalytics.astro
    - scripts/verify-phase8-launch-polish.sh
  modified:
    - packages/shared/layouts/BaseLayout.astro
    - apps/michalek-dev/src/pages/privacy.astro
    - apps/michalek-dev/src/pages/cookies.astro
    - .github/workflows/pr-build.yml

key-decisions:
  - "Tag taxonomy in tags.ts with English labels; slugs match front matter"
  - "GA4 via PUBLIC_GA_MEASUREMENT_ID; loads only after analytics cookie consent"
  - "Minimal custom cookie banner (no jQuery) with essential vs all choice"

requirements-completed: [EN-09, EN-10, SEO-01, SEO-02, SEO-03, SEO-04, SEO-05, SEO-06, SEO-07, LEGAL-01, LEGAL-02, LEGAL-03, PERF-02, PERF-04]

duration: 25min
completed: 2026-06-09
---

# Phase 8: Launch Polish Summary

**michalek.dev launch polish: tags, RSS/sitemap, JSON-LD, legal pages, cookie-gated deferred GA, and automated verify gate.**

## Performance

- **Duration:** ~25 min
- **Completed:** 2026-06-09
- **Plans executed:** 5 (from CONTEXT; no PLAN.md files on disk)
- **Verify gate:** PASS

## Accomplishments

- EN tag taxonomy with 17 archive pages filtering unified blog + guide stream; tags linked from article footers
- `/rss` feed, `sitemap.xml`, and `robots.txt` for discovery
- Twitter Cards, canonical URLs, Person/Article JSON-LD with LinkedIn and pagespeed.one `sameAs`
- Full privacy and cookie policies replacing Phase 5 stubs; lightweight consent banner
- Deferred GA4 loader gated on analytics consent; verify script wired into PR CI

## Task Commits

1. **08-01 Tags** - `4a37334` (feat)
2. **08-02 RSS + robots** - `24e6b39` (feat)
3. **08-03 SEO + JSON-LD** - `fbd6587` (feat)
4. **08-04 Legal + cookies** - `c96ff8f` (feat)
5. **08-05 Verify gate** - `4118036` (feat)

## Deviations from Plan

None — executed from 08-CONTEXT.md (formal PLAN.md files were TBD in ROADMAP).

## Self-Check: PASSED

- FOUND: scripts/verify-phase8-launch-polish.sh
- FOUND: .planning/phases/08-launch-polish-legal-feeds-tags-performance/08-VERIFICATION.md
- FOUND: commits 4a37334, 24e6b39, fbd6587, c96ff8f, 4118036
