---
phase: 07-content-adaptation-pilot-8-martin
fixed_at: 2026-06-09T07:05:00Z
review_path: .planning/phases/07-content-adaptation-pilot-8-martin/07-REVIEW.md
iteration: 1
findings_in_scope: 6
fixed: 6
skipped: 0
status: all_fixed
applied_in_repo: true
---

# Phase 7: Code Review Fix Report

**Fixed at:** 2026-06-09T07:05:00Z
**Source review:** `.planning/phases/07-content-adaptation-pilot-8-martin/07-REVIEW.md`
**Iteration:** 1

**Summary:**
- Findings in scope: 6 (WR-01 through WR-04, IN-02; IN-01 addressed via component wording, IN-03 editorial — out of scope)
- Fixed: 6
- Skipped: 0

## Fixed Issues

### WR-01: AdaptationAttribution infrastructure not implemented

**Files modified:** `packages/shared/components/AdaptationAttribution.astro`, `apps/michalek-dev/src/content/config.ts`, `apps/michalek-dev/src/pages/guide/[slug].astro`, `apps/michalek-dev/src/pages/blog/[slug].astro`, all 8 pilot `.md` files
**Commit:** 38c8c31
**Applied fix:** Added `adaptedFrom` Zod schema to blog/guide collections, created `AdaptationAttribution.astro` with “on Vzhůru dolů” wording and muted `f-6 text-color-lightest` styling, wired both article templates after `<Content />`, migrated inline attribution markdown to front matter in all 8 pilots.

### WR-02: Phase 7 CI verify gate missing

**Files modified:** `scripts/verify-phase7-content-adaptation.sh`, `package.json`, `.github/workflows/pr-build.yml`
**Commit:** 15a0e97
**Applied fix:** Created phase 7 verify script (pairs validation, EN build, 8 pilot dist paths, stub detection, start-here and attribution assertions, /martin spot check), added `verify:phase7` npm script, wired into PR CI after phase 6 gate.

### WR-03: Czech anchor IDs retained in EN headings

**Files modified:** `apps/michalek-dev/src/content/guide/vibe-coding.md`, `apps/michalek-dev/src/content/guide/email-inbox-zero.md`, `apps/michalek-dev/src/content/guide/ai-saas.md`
**Commit:** 38c8c31
**Applied fix:** Renamed Czech `{#slug}` anchors to English slugs matching heading text across all three guide pilots (e.g. `{#u-vytrzeni}` → `{#riding-the-wave}`, `{#e-mail-vyhody}` → `{#why-email-still-matters}`, `{#iracionalni-lide}` → `{#irrational-humans}`).

### WR-04: Image paths in source use `.jpg` but only `.webp` assets exist

**Files modified:** `apps/michalek-dev/src/content/guide/email-inbox-zero.md`, `apps/michalek-dev/src/content/guide/vibe-coding.md`, `apps/michalek-dev/src/content/guide/ai-saas.md`, `apps/michalek-dev/src/content/guide/web-vitals.md`
**Commit:** 38c8c31
**Applied fix:** Updated `/prirucka/images/*.jpg` references to `.webp` to match on-disk assets in `public/prirucka/images/`.

### IN-01: Attribution wording omits “on Vzhůru dolů”

**Files modified:** `packages/shared/components/AdaptationAttribution.astro`
**Commit:** 38c8c31
**Applied fix:** Component renders full planned wording including “on Vzhůru dolů” after the CS article link.

### IN-02: Hardcoded homepage start-here list

**Files modified:** `apps/michalek-dev/src/pages/index.astro`
**Commit:** dfbfa80
**Applied fix:** Start-here section resolves four curated slugs via `getCollection` at build time, renders `post.data.title` and `description`, adds Guide/Blog badges, and uses `class="start-here"` on the list.

## Verification

- `npm run build -w @vd/michalek-dev` — PASS
- `npm run verify:phase6` — PASS
- `npm run verify:phase7` — PASS

---

_Fixed: 2026-06-09T07:05:00Z_
_Fixer: Claude (gsd-code-fixer)_
_Iteration: 1_
