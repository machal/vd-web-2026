---
phase: 02-shared-packages-extraction
verified: 2026-06-07T15:43:30Z
status: passed
score: 12/12 must-haves verified
---

# Phase 2: Shared Packages Extraction Verification Report

**Phase Goal:** Shared infrastructure lives in packages — no duplicated plugin or layout code
**Verified:** 2026-06-07T15:43:30Z
**Status:** passed

## Goal Achievement

### Observable Truths

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | @vd/shared package at packages/shared/ with exports map subpaths (D-01) | ✓ VERIFIED | `packages/shared/package.json` declares name `@vd/shared` with exports for markdown, vite-plugins, seo, layouts, components, types |
| 2 | Czech app imports markdown, Vite plugins, layouts, SEO from @vd/shared | ✓ VERIFIED | `astro.config.mjs` imports createMarkdownConfig, createCustomSitemap, 4 vite plugins; 40+ page routes import shared layouts/components |
| 3 | No duplicated plugin/markdown/SEO/layout source in app tree | ✓ VERIFIED | `verify-phase2-extraction.sh` stale-path negation passes; grep finds no stale vite-plugin-*.ts, layouts, or extracted utils in app |
| 4 | createMarkdownConfig factory accepts path prefixes (D-06/D-07) | ✓ VERIFIED | `create-markdown-config.ts` exports `MarkdownConfigOptions` with `contentPathPrefix`, `guideImagesPrefix`, `collections`; Czech app uses `contentPathPrefix: '/prirucka'` |
| 5 | Four Vite plugins import from @vd/shared/vite-plugins/* | ✓ VERIFIED | astro.config.mjs lines 8-11, 110-113 wire all four shared plugins |
| 6 | createCustomSitemap({ site }) replaces hardcoded origin | ✓ VERIFIED | `packages/shared/seo/custom-sitemap.ts` exports factory; astro.config.mjs line 98 uses `createCustomSitemap({ site: 'https://www.vzhurudolu.cz' })` |
| 7 | Shared layouts/components used across page routes | ✓ VERIFIED | BaseLayout, Header, Footer, ArticleHeader, ArticleFooter, Navigation in packages/shared; pages import from @vd/shared |
| 8 | Content stays app-local (D-13) | ✓ VERIFIED | `src/content/` in apps/vzhurudolu; is-published, get-related-articles, changed-files-integration remain app-local per verify script |
| 9 | vite.ssr.noExternal for @vd/shared (D-09) | ✓ VERIFIED | astro.config.mjs line 107: `noExternal: ['@vd/shared']` |
| 10 | verify-phase2-extraction.sh gate passes | ✓ VERIFIED | Script exit 0: scaffold, stale-path negation, app-local preservation verified |
| 11 | Czech site builds after extraction | ✓ VERIFIED | `npm run build:vzhurudolu` — 877 pages built in 22.97s; sitemap 871 URLs |
| 12 | MONO-03: shared infrastructure in packages, no duplicated plugin code | ✓ VERIFIED | All extracted modules in packages/shared; app devDependencies deduped; REQUIREMENTS MONO-03 satisfied |

**Score:** 12/12 truths verified

### Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `packages/shared/package.json` | @vd/shared workspace package | ✓ EXISTS + SUBSTANTIVE | Full exports map, markdown/vite/seo/layout deps |
| `packages/shared/markdown/create-markdown-config.ts` | Factory for defineConfig markdown | ✓ EXISTS + SUBSTANTIVE | 76 lines, parameterized options, full plugin chain |
| `packages/shared/vite-plugins/*.ts` | Four Vite plugins | ✓ EXISTS + SUBSTANTIVE | validate-frontmatter, prirucka-images, content-images, design-images |
| `packages/shared/seo/custom-sitemap.ts` | Parameterized sitemap integration | ✓ EXISTS + SUBSTANTIVE | createCustomSitemap factory |
| `packages/shared/layouts/BaseLayout.astro` | Shared page shell | ✓ EXISTS + SUBSTANTIVE | Used by all page routes |
| `packages/shared/components/*.astro` | Header, Footer, Navigation, Article* | ✓ EXISTS + SUBSTANTIVE | 6 components extracted |
| `scripts/verify-phase2-extraction.sh` | Phase 2 gate | ✓ EXISTS + SUBSTANTIVE | Extends Phase 1 dist checks + stale-path asserts |

**Artifacts:** 7/7 verified

### Key Link Verification

| From | To | Via | Status | Details |
|------|----|----|--------|---------|
| astro.config.mjs | @vd/shared/markdown | createMarkdownConfig import | ✓ WIRED | Line 7 import, lines 101-104 config |
| astro.config.mjs | @vd/shared/vite-plugins/* | vite.plugins array | ✓ WIRED | Lines 8-11 import, 110-113 register |
| astro.config.mjs | @vd/shared/seo/custom-sitemap | integrations | ✓ WIRED | Line 5 import, line 98 createCustomSitemap |
| Page routes | @vd/shared/layouts, components | import statements | ✓ WIRED | 40+ pages import BaseLayout, Header, Footer |
| verify-phase2-extraction.sh | packages/shared | stale path negation | ✓ WIRED | Script asserts absence of app-local copies |
| createMarkdownConfig | rehype-prirucka-links | collections + contentPathPrefix | ✓ WIRED | Factory passes options to createRehypeContentLinks |

**Wiring:** 6/6 connections verified

## Requirements Coverage

| Requirement | Status | Blocking Issue |
|-------------|--------|----------------|
| MONO-03: Shared markdown pipeline, Vite plugins, layouts, SEO in packages | ✓ SATISFIED | — |

**Coverage:** 1/1 requirements satisfied

## Roadmap Success Criteria

| # | Criterion | Status | Notes |
|---|-----------|--------|-------|
| 1 | Imports from packages/* in both apps | ✓ SATISFIED (scoped) | Czech app fully wired; EN app scaffold is Phase 5 — factory ready per D-06 |
| 2 | Identical content rendering, no regressions | ○ DEFERRED | Build passes (877 pages); visual/URL parity (VD-01) is Phase 3 scope per D-11 |
| 3 | Factory accepts path prefixes for EN | ✓ SATISFIED | createMarkdownConfig parameterized; defaults CS, accepts `/guide` override |

## Anti-Patterns Found

None — no stubs, placeholders, or stale duplicate paths detected.

## Human Verification Required

None — all Phase 2 verifiable items checked programmatically. Visual/URL parity against production (VD-01) is explicitly deferred to Phase 3.

## Gaps Summary

**No gaps found.** Phase goal achieved. Shared infrastructure extracted to @vd/shared; Czech app builds and imports exclusively from shared package for extracted code.

## Verification Metadata

**Verification approach:** Goal-backward (ROADMAP success criteria + PLAN must_haves from 02-01 through 02-05)
**Must-haves source:** ROADMAP.md success criteria merged with PLAN frontmatter
**Automated checks:** 3 passed (verify-phase2-extraction.sh, turbo build, stale-path grep)
**Human checks required:** 0
**Total verification time:** ~5 min

## Self-Check: PASSED

- FOUND: `.planning/phases/02-shared-packages-extraction/02-VERIFICATION.md`
- FOUND: `packages/shared/package.json`
- FOUND: `scripts/verify-phase2-extraction.sh`
- Automated: `verify-phase2-extraction.sh` exit 0
- Automated: `npm run build:vzhurudolu` exit 0 (877 pages)

---
*Verified: 2026-06-07T15:43:30Z*
*Verifier: gsd-verifier (execute-phase orchestration)*
