---
phase: 05-english-app-scaffold
reviewed: 2026-06-09T12:00:00Z
depth: standard
files_reviewed: 22
files_reviewed_list:
  - packages/shared/types/index.ts
  - packages/shared/layouts/BaseLayout.astro
  - packages/shared/components/Header.astro
  - packages/shared/components/Navigation.astro
  - packages/shared/components/Footer.astro
  - packages/shared/components/ArticleHeader.astro
  - apps/michalek-dev/astro.config.mjs
  - apps/michalek-dev/package.json
  - apps/michalek-dev/src/site.config.ts
  - apps/michalek-dev/src/content/config.ts
  - apps/michalek-dev/src/pages/index.astro
  - apps/michalek-dev/src/pages/blog/[slug].astro
  - apps/michalek-dev/src/pages/guide/[slug].astro
  - apps/michalek-dev/src/pages/404.astro
  - apps/michalek-dev/src/pages/privacy.astro
  - apps/michalek-dev/src/pages/cookies.astro
  - apps/michalek-dev/src/pages/martin.astro
  - apps/michalek-dev/src/components/ArticleListItem.astro
  - apps/michalek-dev/src/utils/is-published.ts
  - apps/michalek-dev/vercel.json
  - scripts/verify-phase5-english-scaffold.sh
  - .github/workflows/pr-build.yml
findings:
  critical: 2
  warning: 4
  info: 3
  total: 9
status: issues_found
---

# Phase 5: Code Review Report

**Reviewed:** 2026-06-09T12:00:00Z  
**Depth:** standard  
**Files Reviewed:** 22  
**Status:** issues_found

## Summary

Phase 5 delivers a buildable `@vd/michalek-dev` Astro app with parameterized shared chrome, core EN routes, `/martin`, dual-app CI, and a local verify gate. SiteConfig wiring, navigation, minimal footer, and lean toolchain (no jQuery/Disqus scripts on article pages) are implemented correctly.

The main defects are in reused shared `ArticleFooter`: EN article pages inherit hardcoded `vzhurudolu.cz` share URLs and CS-only UI (logo symbol, Czech copy). `BaseLayout` also still defaults Open Graph images to Czech social assets when EN pages omit `ogImage`. These are fixable without re-architecting the scaffold.

## Critical Issues

### CR-01: ArticleFooter share URLs hardcoded to vzhurudolu.cz

**File:** `packages/shared/components/ArticleFooter.astro:40-44`  
**Issue:** Share links always target `https://www.vzhurudolu.cz/...` regardless of which app renders the footer. EN blog articles share the wrong domain; EN guide articles fall through to the `prirucka` branch and produce URLs like `https://www.vzhurudolu.cz/prirucka/undefined` when `id` is absent.  
**Fix:** Accept `siteConfig` (or `origin` + collection-aware path builder) and build share URLs from the active site:

```typescript
// ArticleFooter.astro — add siteConfig?: SiteConfig prop
const origin = siteConfig?.origin ?? 'https://www.vzhurudolu.cz';

function getArticleUrl(post: ArticleEntry): string {
  if (post.collection === 'blog') return `${origin}/blog/${post.slug}`;
  if (post.collection === 'guide') return `${origin}/guide/${post.slug}`;
  if (post.collection === 'podcast') return `${origin}/podcast/${post.data.postID}-${post.slug}`;
  return `${origin}/prirucka/${post.data.id}`;
}
```

Pass `siteConfig={siteConfig}` from `apps/michalek-dev/src/pages/blog/[slug].astro` and `guide/[slug].astro`.

### CR-02: Guide collection missing from ArticleFooter URL logic

**File:** `packages/shared/components/ArticleFooter.astro:40-44`  
**Issue:** The `articleUrl` ternary only handles `blog` and `podcast`; any other collection (including EN `guide`) uses the `prirucka` template. Guide stubs without `id` generate broken share targets.  
**Fix:** Same as CR-01 — add an explicit `guide` branch. Extend the `ArticleEntry` / `Props.post` union to include `CollectionEntry<'guide'>`.

## Warnings

### WR-01: ArticleFooter renders VD logo symbol on EN pages (UI-SPEC violation)

**File:** `packages/shared/components/ArticleFooter.astro:53-55`  
**Issue:** Footer SVG references `#vd-symbol`, but EN `Header` omits the symbol block when `showLogoSymbol: false`. The article-foot logo renders empty/broken on EN pages. UI-SPEC explicitly omits the hammer/anvil logo on EN.  
**Fix:** Gate the logo block on locale or a new prop:

```astro
{(!siteConfig || siteConfig.showLogoSymbol) && (
  <svg class="vd-logo" ...><use xlink:href="#vd-symbol" /></svg>
)}
```

Or skip the block entirely when `siteConfig?.locale === 'en'`.

### WR-02: ArticleFooter Czech copy on EN article pages

**File:** `packages/shared/components/ArticleFooter.astro:62,85,104`  
**Issue:** Strings `"Podobné články"`, `"Zařazeno v tématech:"`, and `"Sdílení potěší:"` render on EN pages. UI-SPEC expects EN article chrome; share section is tertiary but still user-visible.  
**Fix:** Localize via `siteConfig.locale` or move EN article foot to an app-local component that omits Czech-only sections until shared i18n exists.

### WR-03: BaseLayout OG image defaults remain Czech-only

**File:** `packages/shared/layouts/BaseLayout.astro:36-39`  
**Issue:** When EN pages omit `ogImage`, social previews use `vzhurudolu.cz` WebP assets. Plan 05-01/UI-SPEC call for OG defaults parameterized via `siteConfig`; only `siteName` was wired.  
**Fix:** Derive defaults from `config.origin` or add `defaultOgImages` to `SiteConfig`:

```typescript
const defaultOgImages = isCs
  ? ['https://www.vzhurudolu.cz/assets/img/content/dest/socials/vd-soc-uni-1.webp', ...]
  : [`${config.origin}/assets/img/content/dest/socials/default.webp`]; // or EN-specific assets
const finalOgImage = ogImageProp ?? defaultOgImages;
```

### WR-04: Guide `published` string `"true"` treated as unpublished

**File:** `apps/michalek-dev/src/content/config.ts:45-47`  
**Issue:** The guide transform treats only boolean `true` and `'Publikováno'` as published. YAML/frontmatter string `"true"` (common in migrated CS content) evaluates to `false`, then `published !== false` still yields `false`. Content silently excluded from build.  
**Fix:** Normalize string booleans in the transform:

```typescript
const published = typeof data.published === 'boolean'
  ? data.published
  : data.published === 'Publikováno' || data.published === 'true' || data.published === true;
```

## Info

### IN-01: Duplicate `<slot name="styles" />` in BaseLayout (pre-existing)

**File:** `packages/shared/layouts/BaseLayout.astro:119,130`  
**Issue:** Styles slot appears in `<head>` and `<body>`. Pre-existing from Phase 2; not introduced by Phase 5. Low risk while pages use a single styles fragment.  
**Fix:** Remove the body duplicate when touching BaseLayout for WR-03.

### IN-02: `/humans.txt` linked but not present in EN public assets

**File:** `packages/shared/layouts/BaseLayout.astro:126`  
**Issue:** BaseLayout always links `/humans.txt`; `apps/michalek-dev/public/` has no `humans.txt`. Results in 404 on EN site.  
**Fix:** Copy or symlink from CS app, or gate the link on file existence / locale.

### IN-03: PR CI rebuilds both apps twice per run

**File:** `.github/workflows/pr-build.yml:21-26`  
**Issue:** Workflow runs `turbo build` then `verify-phase5-english-scaffold.sh`, which runs `npm run build` for both apps again. Doubles CI time; not a correctness bug.  
**Fix:** Split verify script into `--assert-only` mode for CI, or drop redundant inline `test -f` checks when the script already covers them.

---

## Fixable Items (recommended fix order)

| ID | Severity | Effort | Action |
|----|----------|--------|--------|
| CR-01 / CR-02 | BLOCKER | Small | Parameterize `ArticleFooter` URLs with `siteConfig.origin`; add `guide` branch; pass `siteConfig` from EN article pages |
| WR-01 | WARNING | Small | Hide `#vd-symbol` logo block when `showLogoSymbol === false` |
| WR-02 | WARNING | Medium | EN strings or app-local article foot component |
| WR-03 | WARNING | Small | Locale-aware OG image defaults in `BaseLayout` |
| WR-04 | WARNING | Small | Accept `'true'` string in guide published transform |
| IN-02 | INFO | Trivial | Add `humans.txt` to EN public |
| IN-03 | INFO | Small | Deduplicate CI builds |

---

_Reviewed: 2026-06-09T12:00:00Z_  
_Reviewer: Claude (gsd-code-reviewer)_  
_Depth: standard_
