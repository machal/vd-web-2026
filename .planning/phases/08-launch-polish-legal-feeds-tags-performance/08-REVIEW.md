---
phase: 08-launch-polish-legal-feeds-tags-performance
reviewed: 2026-06-09T07:10:00Z
depth: standard
files_reviewed: 20
files_reviewed_list:
  - .github/workflows/pr-build.yml
  - apps/michalek-dev/package.json
  - apps/michalek-dev/public/robots.txt
  - apps/michalek-dev/src/data/tags.ts
  - apps/michalek-dev/src/pages/404.astro
  - apps/michalek-dev/src/pages/[tag].astro
  - apps/michalek-dev/src/pages/blog/[slug].astro
  - apps/michalek-dev/src/pages/cookies.astro
  - apps/michalek-dev/src/pages/guide/[slug].astro
  - apps/michalek-dev/src/pages/index.astro
  - apps/michalek-dev/src/pages/martin.astro
  - apps/michalek-dev/src/pages/privacy.astro
  - apps/michalek-dev/src/pages/rss.ts
  - packages/shared/components/CookieConsent.astro
  - packages/shared/components/DeferredAnalytics.astro
  - packages/shared/components/JsonLd.astro
  - packages/shared/layouts/BaseLayout.astro
  - packages/shared/package.json
  - packages/shared/seo/json-ld.ts
  - scripts/verify-phase8-launch-polish.sh
findings:
  critical: 0
  warning: 4
  info: 2
  total: 6
status: issues_found
---

# Phase 8: Code Review Report

**Reviewed:** 2026-06-09T07:10:00Z  
**Depth:** standard  
**Files Reviewed:** 20  
**Status:** issues_found  
**Verdict:** **PASS with warnings** — no blockers; automated gate passes; fix warnings before production cutover (Phase 9) where noted.

## Summary

Phase 8 delivers EN tag archives, RSS/sitemap/robots, Twitter/OG metadata, Person/Article JSON-LD, full privacy/cookie policies, a cookie-gated deferred GA4 loader, and a CI verify script. I ran `bash scripts/verify-phase8-launch-polish.sh` locally — **PASS**. Core launch-polish behavior is sound.

No critical (blocker) defects found. Four warnings target GDPR consent UX, tag taxonomy drift, and JSON-LD robustness. Two info items are minor maintainability gaps.

## Warnings

### WR-01: Unvalidated `localStorage` consent hides banner permanently

**File:** `packages/shared/components/CookieConsent.astro:79-86`  
**Issue:** Any truthy value in `michalek-cookie-consent` hides the banner and skips re-prompting, even if the value is not `essential` or `all`. A corrupted or manually edited value leaves users without a way to accept analytics (or re-see the banner) except clearing site data.  
**Fix:** Validate stored consent before hiding the banner:

```javascript
const existing = getConsent();
if (existing === 'essential' || existing === 'all') {
  banner.hidden = true;
  document.dispatchEvent(
    new CustomEvent('cookie-consent', { detail: { level: existing } }),
  );
  return;
}
// fall through to show banner for unknown values
```

### WR-02: No in-page consent withdrawal (GDPR Art. 7(3))

**File:** `packages/shared/components/CookieConsent.astro` (component-wide)  
**Issue:** After choosing “Accept analytics”, there is no UI to switch to “Essential only” without clearing browser storage. Privacy/cookie copy documents clearing site data, but GDPR expects withdrawal to be as easy as granting consent.  
**Fix:** Add a footer or `/cookies` page control (e.g. “Change cookie preferences”) that clears `michalek-cookie-consent`, re-shows the banner, and dispatches a revocation event so `DeferredAnalytics` can stop future loads (note: already-set GA cookies may persist until browser expiry).

### WR-03: Front matter tags not validated against taxonomy

**File:** `apps/michalek-dev/src/data/tags.ts:130-133`, `apps/michalek-dev/src/content/config.ts:15`  
**Issue:** `getTagsForArticle()` silently drops tags absent from `tags.ts`. A typo in front matter (e.g. `performanc`) produces no footer link and no archive association, with no build failure. Verify script only checks one sample article.  
**Fix:** Extend `vitePluginValidateFrontmatter` (or content schema transform) to assert every `tags[]` value exists in `tags.ts` slugs; add a verify grep/assert loop over all 8 pilot MD files.

### WR-04: `buildArticleJsonLd` throws on invalid dates

**File:** `packages/shared/seo/json-ld.ts:52-54`  
**Issue:** `datePublished.toISOString()` throws `RangeError` when `post.data.date` is an invalid `Date`. Zod transforms strings to `Date` without validating `!isNaN(date.getTime())`, so a bad front matter date crashes the static build for that page.  
**Fix:** Guard before serializing:

```typescript
...(options.datePublished && !isNaN(options.datePublished.getTime())
  ? { datePublished: options.datePublished.toISOString().split('T')[0] }
  : {}),
```

## Info

### IN-01: Hardcoded site URLs in shared JSON-LD helper

**File:** `packages/shared/seo/json-ld.ts:34,49`  
**Issue:** `buildArticleJsonLd` hardcodes `https://michalek.dev/martin` for author/publisher URLs instead of accepting `siteConfig.origin`. Works today but couples `@vd/shared` to one deployment target.  
**Fix:** Pass `authorUrl` / `publisherUrl` from `siteConfig.origin` at call sites.

### IN-02: Unused `serializeJsonLd` export

**File:** `packages/shared/seo/json-ld.ts:59-61`, `packages/shared/components/JsonLd.astro:9`  
**Issue:** `serializeJsonLd()` is exported but `JsonLd.astro` inlines `JSON.stringify(data)`. Dead export adds API surface without use.  
**Fix:** Use `serializeJsonLd(data)` in `JsonLd.astro` or remove the export.

---

_Reviewed: 2026-06-09T07:10:00Z_  
_Reviewer: Claude (gsd-code-reviewer)_  
_Depth: standard_
