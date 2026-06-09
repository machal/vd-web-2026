# Phase 6 Verification: Content Pairing & i18n SEO

**Status:** passed  
**Verified:** 2026-06-09  
**Gate:** `bash scripts/verify-phase6-content-pairing-i18n-seo.sh`

## Automated Checks

| Check | Result |
|-------|--------|
| `node scripts/validate-content-pairs.mjs` | PASS — 9 pairs, frontmatter cross-check |
| Dual-app build (`@vd/vzhurudolu`, `@vd/michalek-dev`) | PASS |
| CS `prirucka/webp` hreflang en/cs/x-default | PASS |
| CS `prirucka/webp` self canonical + English switch | PASS |
| CS `blog/261-rok-2025` route built | PASS |
| EN `guide/webp` hreflang trio + Česky switch | PASS |
| EN `blog/2025-year-in-review` route built | PASS |
| Both `/martin` pages language switch | PASS |
| CS homepage lacks pairing hreflang cluster | PASS |
| No Accept-Language redirect in configs | PASS |
| PR CI references Phase 6 gate | PASS |

## Requirements Covered

- I18N-01: CONTENT_PAIRS manifest (9 pairs)
- I18N-02: pairId in Zod schemas + front matter
- I18N-03: LanguageSwitch with English / Česky labels
- I18N-04: Build-time validator with fail on broken pairs
- I18N-05: hreflang en, cs, x-default → EN
- I18N-06: Self-referencing canonical
- I18N-07: No auto language redirect
- VD-04: Czech originals link to English counterparts

## Manual UAT (optional)

- Visual check of language switch placement on pilot articles
- Confirm switch hidden on unpaired CS content (podcast, kurzy)

## Notes

- EN pilot articles are stubs; validator warns (not fails) on missing EN files per phase context
- Phase 7 will replace stub bodies with adapted content
