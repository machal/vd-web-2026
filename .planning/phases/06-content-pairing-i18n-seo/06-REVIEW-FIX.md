---
phase: 06-content-pairing-i18n-seo
fixed_at: 2026-06-09T14:30:00Z
review_path: .planning/phases/06-content-pairing-i18n-seo/06-REVIEW.md
iteration: 1
findings_in_scope: 5
fixed: 5
skipped: 0
status: all_fixed
---

# Phase 6: Code Review Fix Report

**Fixed at:** 2026-06-09T14:30:00Z  
**Source review:** `.planning/phases/06-content-pairing-i18n-seo/06-REVIEW.md`  
**UI review:** `.planning/phases/06-content-pairing-i18n-seo/06-UI-REVIEW.md`  
**Iteration:** 1

**Summary:**
- Findings in scope: 5 (WR-01 through WR-05)
- Fixed: 5
- Skipped: 0
- UI top-3 fixes: included in WR-04 commit scope
- Verification: `npm run verify:phase6` passed

## Fixed Issues

### WR-01: Conflicting hreflang on Czech paired pages

**Files modified:** `packages/shared/layouts/BaseLayout.astro`  
**Commit:** `69fc41f` (single atomic commit for all WR-01–WR-05 and UI top-3 fixes)  
**Applied fix:** Legacy cssmine `hreflang="en-us"` link now renders only when `alternateLinks` is absent, preventing dual English alternates on paired CS pages.

### WR-02: Duplicate ContentRef keys pass validation silently

**Files modified:** `packages/shared/content-pairing/validate.ts`  
**Commit:** `69fc41f` (single atomic commit for all WR-01–WR-05 and UI top-3 fixes)  
**Applied fix:** Added `refKeys` Set tracking `${site}:${collection}:${key}` for both CS and EN refs; duplicate refs now push validation errors.

### WR-03: `resolveAlternate` assumes site ID equals locale side

**Files modified:** `packages/shared/content-pairing/resolve.ts`  
**Commit:** `69fc41f` (single atomic commit for all WR-01–WR-05 and UI top-3 fixes)  
**Applied fix:** Target locale and URL derived from which side of the pair matched (`onCsSide`) instead of hard-coded `vzhurudolu` check.

### WR-04: `LanguageSwitch` deviates from UI-SPEC contract

**Files modified:** `packages/shared/components/LanguageSwitch.astro`, `packages/shared/components/ArticleHeader.astro`, `apps/vzhurudolu/src/pages/blog/[slug].astro`, `apps/vzhurudolu/src/pages/prirucka/[slug].astro`, `apps/michalek-dev/src/pages/blog/[slug].astro`, `apps/michalek-dev/src/pages/guide/[slug].astro`  
**Commit:** `69fc41f` (single atomic commit for all WR-01–WR-05 and UI top-3 fixes)  
**Applied fix:** Removed `languageSwitch` slot from `ArticleHeader`; article pages render `LanguageSwitch` after header and before `.content`. Component markup aligned with UI-SPEC: `language-switch__inner`, `language-switch__link`, `f-6 text-color-lightest`, `lang` attributes, `aria-hidden` separator.

### WR-05: Duplicate frontmatter validation loops

**Files modified:** `packages/shared/content-pairing/validate.ts`  
**Commit:** `69fc41f` (single atomic commit for all WR-01–WR-05 and UI top-3 fixes)  
**Applied fix:** Removed redundant second loop over manifest pairs; frontmatter cross-check runs once via `frontmatterIndex` iteration.

## UI Review Top 3 (addressed)

1. **Placement below ArticleHeader** — switch moved out of `.page-subhead` dark band on all four article templates.
2. **UI-SPEC utility classes** — `ta-c mb-1` default on `<nav>`, `f-6 text-color-lightest` on inner `<p>`, BEM classes on current/link/separator.
3. **`/martin` default classes** — default `className="ta-c mb-1"` baked into component; no prop needed on martin pages.

## Skipped Issues

None — all in-scope findings were fixed.

---

_Fixed: 2026-06-09T14:30:00Z_  
_Fixer: Claude (gsd-code-fixer)_  
_Iteration: 1_
