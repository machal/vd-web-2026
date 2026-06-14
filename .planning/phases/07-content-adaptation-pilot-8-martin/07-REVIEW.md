---
phase: 07-content-adaptation-pilot-8-martin
reviewed: 2026-06-09T07:05:00Z
depth: standard
files_reviewed: 12
files_reviewed_list:
  - apps/michalek-dev/src/content/config.ts
  - apps/michalek-dev/src/pages/index.astro
  - apps/michalek-dev/src/pages/guide/[slug].astro
  - apps/michalek-dev/src/pages/blog/[slug].astro
  - apps/michalek-dev/src/content/guide/webp.md
  - apps/michalek-dev/src/content/guide/web-vitals.md
  - apps/michalek-dev/src/content/guide/ai-saas.md
  - apps/michalek-dev/src/content/guide/vibe-coding.md
  - apps/michalek-dev/src/content/guide/email-inbox-zero.md
  - apps/michalek-dev/src/content/blog/2025-year-in-review.md
  - apps/michalek-dev/src/content/blog/saying-no.md
  - apps/michalek-dev/src/content/blog/save-on-devs-spend-on-consultants.md
findings:
  critical: 0
  warning: 4
  info: 3
  total: 7
status: issues_found
---

# Phase 7: Code Review Report

**Reviewed:** 2026-06-09T07:05:00Z  
**Depth:** standard  
**Files Reviewed:** 12  
**Status:** issues_found

## Summary

Phase 7 successfully replaces all eight Phase 6 EN stubs with editorial adaptations, wires guide author bylines to `/martin`, and adds a homepage “Start here” section. `npm run build -w @vd/michalek-dev` passes; dist HTML confirms attribution footers, author links, internal pilot cross-links, and image rewrites (`.jpg` → `.webp`) all render correctly.

The main gaps are **plan deviations**, not runtime breakage: the 07-01 infrastructure (`AdaptationAttribution` component, `adaptedFrom` schema, template wiring) was skipped in favour of hand-authored markdown footers, and the 07-06 `verify-phase7-content-adaptation.sh` CI gate was never added. No blockers prevent shipping the EN pilot content, but attribution enforcement and regression coverage are weaker than specified.

## Warnings

### WR-01: AdaptationAttribution infrastructure not implemented

**File:** `packages/shared/components/AdaptationAttribution.astro` (missing); `apps/michalek-dev/src/content/config.ts:18-45`; `apps/michalek-dev/src/pages/guide/[slug].astro:62-68`; `apps/michalek-dev/src/pages/blog/[slug].astro:62-68`  
**Issue:** 07-01-PLAN required a shared `AdaptationAttribution` component, `adaptedFrom: { title, url }` Zod fields on both collections, and template rendering when `adaptedFrom` is set. None of this exists. Attribution is duplicated as inline markdown in all eight articles. New articles can ship without attribution; malformed attribution URLs are not validated at build time (T-07-01 unmitigated).  
**Fix:** Add schema field and component per 07-01-PLAN, then migrate footers from markdown body to front matter:

```ts
// apps/michalek-dev/src/content/config.ts
adaptedFrom: z.object({
  title: z.string(),
  url: z.string().url(),
}).optional(),
```

```astro
// apps/michalek-dev/src/pages/guide/[slug].astro (after <Content />)
{post.data.adaptedFrom && (
  <AdaptationAttribution adaptedFrom={post.data.adaptedFrom} />
)}
```

### WR-02: Phase 7 CI verify gate missing

**File:** `scripts/verify-phase7-content-adaptation.sh` (missing); `.github/workflows/pr-build.yml`  
**Issue:** 07-06-PLAN specifies a dedicated verify script (stub-text detection, attribution presence, homepage “Start here”, all eight dist paths). Only Phase 6 verify was run manually. Future regressions — stub placeholders, dropped attribution, broken start-here links — will not fail CI.  
**Fix:** Implement `scripts/verify-phase7-content-adaptation.sh` per 07-06-PLAN, add `verify:phase7` to root `package.json`, wire into `pr-build.yml` after the phase 6 gate.

### WR-03: Czech anchor IDs retained in EN headings

**File:** `apps/michalek-dev/src/content/guide/vibe-coding.md:24-170`; `apps/michalek-dev/src/content/guide/email-inbox-zero.md:25-136`; `apps/michalek-dev/src/content/guide/ai-saas.md:20`  
**Issue:** Many EN headings keep Czech `{#slug}` anchors copied from CS sources (e.g. `{#iracionalni-lide}`, `{#e-mail-vyhody}`, `{#u-vytrzeni}`). Deep links and shared URLs expose Czech slugs on an English site; heading-anchor hash stability across locales is also broken when CS and EN slugs diverge.  
**Fix:** Rename anchors to English slugs matching heading text, e.g. `{#irrational-humans}`, `{#why-email-still-matters}`, `{#riding-the-wave}`.

### WR-04: Image paths in source use `.jpg` but only `.webp` assets exist

**File:** `apps/michalek-dev/src/content/guide/email-inbox-zero.md:19-139`; `apps/michalek-dev/src/content/guide/vibe-coding.md:57-122`; `apps/michalek-dev/src/content/guide/ai-saas.md:43-78`; `apps/michalek-dev/src/content/guide/web-vitals.md:57-78`  
**Issue:** Markdown references `/prirucka/images/*.jpg`, but `public/prirucka/images/` contains only `.webp` files. The remark/rehype pipeline rewrites extensions at build time (dist is correct), but raw source does not match deployed assets. Authors editing MD directly or running without the pipeline will see 404 images.  
**Fix:** Align source paths with on-disk assets:

```html
<img src="/prirucka/images/inbox-zero-main.webp" …>
```

## Info

### IN-01: Attribution wording omits “on Vzhůru dolů”

**File:** `apps/michalek-dev/src/content/guide/webp.md:99` (same pattern in all 8 articles)  
**Issue:** 07-CONTEXT and 07-01-PLAN specify: “Adapted from the Czech article [Title](url) **on Vzhůru dolů.**” Actual footers end after the link with a period, omitting the site name. Functionally fine; editorial spec drift.  
**Fix:** Either adopt the planned wording in `AdaptationAttribution` or append “on Vzhůru dolů” to each footer.

### IN-02: Hardcoded homepage start-here list

**File:** `apps/michalek-dev/src/pages/index.astro:20-25`  
**Issue:** Four curated links are static strings with no build-time check that slugs exist or remain published. A rename or unpublish would leave a broken homepage link until manually updated.  
**Fix:** Derive from content collection filtered by a `featured: true` front-matter flag, or add an assertion to `verify-phase7`.

### IN-03: Blog pilots are short relative to CS originals

**File:** `apps/michalek-dev/src/content/blog/save-on-devs-spend-on-consultants.md`; `apps/michalek-dev/src/content/blog/saying-no.md`  
**Issue:** Two blog adaptations are heavily condensed (~35–45 lines vs longer CS sources). Not a code defect; editorial depth is thinner than guide pilots. Worth a human editorial pass before Phase 8 launch polish.  
**Fix:** Expand sections where CS originals had supporting examples, or explicitly mark as “digest” adaptations in front matter.

---

_Reviewed: 2026-06-09T07:05:00Z_  
_Reviewer: Claude (gsd-code-reviewer)_  
_Depth: standard_
