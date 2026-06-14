---
phase: 05-english-app-scaffold
fixed_at: 2026-06-09T12:45:00Z
review_path: .planning/phases/05-english-app-scaffold/05-REVIEW.md
iteration: 1
findings_in_scope: 8
fixed: 8
skipped: 0
status: all_fixed
---

# Phase 5: Code Review Fix Report

**Fixed at:** 2026-06-09T12:45:00Z
**Source review:** `.planning/phases/05-english-app-scaffold/05-REVIEW.md`
**Iteration:** 1

**Summary:**
- Findings in scope: 8 (CR-01, CR-02, WR-01–WR-04, plus 3 UI review items)
- Fixed: 8
- Skipped: 0
- Verification: `scripts/verify-phase5-english-scaffold.sh` PASS

## Fixed Issues

### CR-01 / CR-02: ArticleFooter share URLs hardcoded to vzhurudolu.cz / guide branch missing

**Files modified:** `packages/shared/components/ArticleFooter.astro`, `apps/michalek-dev/src/pages/blog/[slug].astro`, `apps/michalek-dev/src/pages/guide/[slug].astro`
**Commit:** `86eda6d`
**Applied fix:** Added optional `siteConfig` prop; share URLs built from `siteConfig.origin`; explicit `guide` collection branch in URL builder; `siteConfig` passed from EN article pages.

### WR-01: ArticleFooter renders VD logo symbol on EN pages

**Files modified:** `packages/shared/components/ArticleFooter.astro`
**Commit:** `86eda6d`
**Applied fix:** Logo SVG gated on `showLogoSymbol` (defaults true for CS backward compatibility).

### WR-02: ArticleFooter Czech copy on EN article pages

**Files modified:** `packages/shared/components/ArticleFooter.astro`
**Commit:** `86eda6d`
**Applied fix:** Footer strings localized via `siteConfig.locale` (`Share:`, `Related articles`, `Tagged in:`); X share omits `via=vzhurudolu` on EN.

### WR-03: BaseLayout OG image defaults remain Czech-only

**Files modified:** `packages/shared/layouts/BaseLayout.astro`
**Commit:** `abe0bc8`
**Applied fix:** Default `og:image` derived from locale — CS uses vzhurudolu social assets; EN uses `${config.origin}/assets/img/content/dest/socials/default.webp`.

### WR-04: Guide `published` string `"true"` treated as unpublished

**Files modified:** `apps/michalek-dev/src/content/config.ts`
**Commit:** `0afba65`
**Applied fix:** Guide transform accepts `'true'` string as published alongside `'Publikováno'`.

### UI review: Duplicate homepage `<title>`

**Files modified:** `apps/michalek-dev/src/pages/index.astro`, `packages/shared/layouts/BaseLayout.astro`
**Commit:** `abe0bc8`, `5608cf1`
**Applied fix:** Homepage passes empty `title`; `BaseLayout` uses `titleSuffix` alone when title is empty. Built output: `Martin Michálek · Web & Performance`.

### UI review: Article date locale mismatch

**Files modified:** `packages/shared/components/ArticleHeader.astro`
**Commit:** `5608cf1`
**Applied fix:** EN article headers use `month: 'short'` (en-GB) matching stream list format (`1 Jun 2026`).

### UI review: 404 h1 lacks Display class

**Files modified:** `apps/michalek-dev/src/pages/404.astro`
**Commit:** `5608cf1`
**Applied fix:** Added `class="h1"` to 404 heading per UI-SPEC.

### IN-01: Duplicate styles slot in BaseLayout (bonus while touching WR-03)

**Files modified:** `packages/shared/layouts/BaseLayout.astro`
**Commit:** `abe0bc8`
**Applied fix:** Removed duplicate `<slot name="styles" />` from `<body>`.

## Skipped Issues

None — all in-scope findings were fixed.

---

_Fixed: 2026-06-09T12:45:00Z_
_Fixer: Claude (gsd-code-fixer)_
_Iteration: 1_
