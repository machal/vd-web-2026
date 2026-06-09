---
phase: 13-article-detail-language-ux
requirements-completed: [ART-01, ART-02]
completed: 2026-06-09
---

# Phase 13 Summary — Article Detail Language UX

**Language switch moved into article subhead row; adaptation attribution footer removed.**

## Accomplishments

- `ArticleHeader` supports `actions` slot with `page-subhead--split` layout
- CS blog/příručka and EN blog/guide use `LanguageSwitch` in header row
- Removed `AdaptationAttribution` from EN article pages
- `LanguageSwitch` default spacing cleared; `/martin` pages keep `ta-c mb-1`

## Files

- `packages/shared/components/ArticleHeader.astro`
- `packages/shared/components/LanguageSwitch.astro`
- `apps/vzhurudolu/src/pages/blog/[slug].astro`
- `apps/vzhurudolu/src/pages/prirucka/[slug].astro`
- `apps/michalek-dev/src/pages/blog/[slug].astro`
- `apps/michalek-dev/src/pages/guide/[slug].astro`
- `apps/vzhurudolu/src/pages/martin.astro`
- `apps/michalek-dev/src/pages/martin.astro`

## Verification

- Both builds pass; built HTML shows `page-subhead--split`, no `adaptation-attribution`

## Deviations

None.

## Self-Check: PASSED
