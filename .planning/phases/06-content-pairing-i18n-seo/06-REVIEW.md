---
phase: 06-content-pairing-i18n-seo
reviewed: 2026-06-09T12:00:00Z
depth: standard
files_reviewed: 19
files_reviewed_list:
  - packages/shared/content-pairing/types.ts
  - packages/shared/content-pairing/pairs.ts
  - packages/shared/content-pairing/resolve.ts
  - packages/shared/content-pairing/validate.ts
  - packages/shared/content-pairing/index.ts
  - packages/shared/seo/hreflang.ts
  - packages/shared/components/LanguageSwitch.astro
  - packages/shared/components/ArticleHeader.astro
  - packages/shared/layouts/BaseLayout.astro
  - apps/vzhurudolu/src/pages/blog/[slug].astro
  - apps/vzhurudolu/src/pages/prirucka/[slug].astro
  - apps/vzhurudolu/src/pages/martin.astro
  - apps/michalek-dev/src/pages/blog/[slug].astro
  - apps/michalek-dev/src/pages/guide/[slug].astro
  - apps/michalek-dev/src/pages/martin.astro
  - scripts/validate-content-pairs.mjs
  - scripts/verify-phase6-content-pairing-i18n-seo.sh
  - apps/vzhurudolu/src/content/config.ts
  - apps/michalek-dev/src/content/config.ts
findings:
  critical: 0
  warning: 5
  info: 3
  total: 8
status: issues_found
---

# Phase 6: Code Review Report

**Reviewed:** 2026-06-09T12:00:00Z  
**Depth:** standard  
**Files Reviewed:** 19  
**Status:** issues_found

## Summary

Phase 6 delivers a coherent content-pairing module, hreflang helpers, page wiring on both apps, and a CI verify gate that passes on the current manifest. Core reciprocity resolution and canonical/hreflang injection work as designed for the 9 pilot pairs.

The main risks are SEO signal conflicts on Czech paired pages (legacy site-wide hreflang coexisting with the new cluster), a manifest integrity gap that allows duplicate `ContentRef` keys without error, and several UI-spec / validator robustness gaps that will bite as the manifest grows in Phase 7.

## Warnings

### WR-01: Conflicting hreflang on Czech paired pages

**File:** `packages/shared/layouts/BaseLayout.astro:99-101`  
**Issue:** Every Czech page emits a legacy `<link rel="alternate" hreflang="en-us" href="https://www.cssmine.com" />`. Paired pages also receive the Phase 6 trio (`en`, `cs`, `x-default`) via `alternateLinks`. A paired CS article therefore advertises two different English alternates (cssmine.com and michalek.dev), which violates the I18N-05 intent of a single clean cluster and can cause search engines to ignore or misinterpret hreflang.  
**Fix:** Gate the cssmine link when pairing alternates are present:

```astro
{isCs && !alternateLinks && (
  <link rel="alternate" hreflang="en-us" href="https://www.cssmine.com" />
)}
```

### WR-02: Duplicate ContentRef keys pass validation silently

**File:** `packages/shared/content-pairing/validate.ts:29-70`  
**Issue:** The validator checks duplicate `pairId` values but not duplicate `(site, collection, key)` refs across pairs. Injecting a second pair with the same CS ref and identical EN target returns `ok: true`; `findPair()` in `resolve.ts` always returns the first manifest match, leaving the duplicate row dead data and masking editorial mistakes.  
**Fix:** Track all CS and EN refs in a `Set` during validation; push an error when any ref appears more than once:

```typescript
const refKeys = new Set<string>();
for (const pair of manifest) {
  for (const ref of [pair.cs, pair.en]) {
    const key = `${ref.site}:${ref.collection}:${ref.key}`;
    if (refKeys.has(key)) errors.push(`Duplicate content ref in manifest: ${key}`);
    refKeys.add(key);
  }
}
```

### WR-03: `resolveAlternate` assumes site ID equals locale side

**File:** `packages/shared/content-pairing/resolve.ts:49-52`  
**Issue:** Alternate resolution uses `currentSite === 'vzhurudolu' ? pair.en : pair.cs` instead of checking which side of the pair matched. This works for the current manifest but breaks if a future pair ever places the Czech ref on a non-`vzhurudolu` site or adds a third site ID.  
**Fix:** Derive target from the matched side:

```typescript
const onCsSide =
  pair.cs.site === currentSite &&
  pair.cs.collection === collection &&
  pair.cs.key === key;
const target = onCsSide ? pair.en : pair.cs;
return {
  locale: onCsSide ? 'en' : 'cs',
  href: resolveContentUrl(target),
  pairId: pair.pairId,
};
```

### WR-04: `LanguageSwitch` deviates from UI-SPEC contract

**File:** `packages/shared/components/LanguageSwitch.astro:18-27`  
**Issue:** Phase 6 UI-SPEC requires placement below `ArticleHeader` as a separate centered row (`ta-c mb-1`, `f-6 text-color-lightest`, `lang` on spans, `aria-hidden` on separator). Implementation nests the switch inside `ArticleHeader`’s `page-subhead` slot using `page-subhead__meta` classes instead. Functionally usable, but hierarchy, spacing, and accessibility attributes differ from the locked contract — risk of inconsistent EN/CS presentation and failed UI audit.  
**Fix:** Align markup with UI-SPEC (move switch below `ArticleHeader` on article pages; add `lang`, `aria-hidden`, and specified utility classes).

### WR-05: Duplicate frontmatter validation loops

**File:** `packages/shared/content-pairing/validate.ts:72-99`  
**Issue:** Frontmatter cross-check runs twice — once iterating `frontmatterIndex` entries (lines 72–88) and again iterating manifest pairs (lines 91–99). A mismatched entry produces two identical error strings, cluttering CI output and fix workflows.  
**Fix:** Remove the second loop (lines 91–99); the first loop already covers all indexed entries.

## Info

### IN-01: No automated unit tests for pairing core

**File:** `packages/shared/content-pairing/`  
**Issue:** Plan 05 specified TDD-style behavior checks (duplicate pairId, orphan pair, frontmatter mismatch). Only shell/CLI checks exist; no persistent unit tests guard regressions in `resolve.ts` / `validate.ts`.  
**Fix:** Add a small Node test file or extend the verify script with inline regression cases committed to CI.

### IN-02: `checkContentFiles` option is a no-op

**File:** `packages/shared/content-pairing/validate.ts:67-69`  
**Issue:** `ValidateOptions.checkContentFiles` is exported but unimplemented; file checks live only in the CLI script. Callers importing `validateContentPairs` may assume the flag works.  
**Fix:** Either implement the option, remove it from the public type, or document that only the CLI performs file checks.

### IN-03: Validator not wired into Astro build targets

**File:** `package.json:18-19`, `scripts/verify-phase6-content-pairing-i18n-seo.sh:8-9`  
**Issue:** `npm run build` for either app does not run pairing validation; enforcement depends on developers/CI calling `validate:pairs` or the Phase 6 verify gate. Intentional per plan, but easy to bypass locally.  
**Fix:** Optional prebuild hook in root `package.json` or Turbo pipeline dependency.

---

_Reviewed: 2026-06-09T12:00:00Z_  
_Reviewer: Claude (gsd-code-reviewer)_  
_Depth: standard_
