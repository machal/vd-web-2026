# Phase 7 — UI Review

**Audited:** 2026-06-09
**Baseline:** `05-UI-SPEC.md` (EN scaffold), `06-UI-SPEC.md` (LanguageSwitch), `07-CONTEXT.md` (start-here, attribution, bylines)
**Screenshots:** not captured (no dev server on ports 3000, 4321, 5173, 8080; audit used source + built `dist/` HTML)
**Mode:** Advisory — content ships functionally; findings target polish and plan alignment

---

## Pillar Scores

| Pillar | Score | Key Finding |
|--------|-------|-------------|
| 1. Copywriting | 3/4 | Start-here link labels hardcoded and diverge from article titles |
| 2. Visuals | 2/4 | Attribution buried in prose; start-here lacks stream badges |
| 3. Color | 3/4 | VD palette via legacy CSS; badges and links follow 60/30/10 contract |
| 4. Typography | 3/4 | Four-size scale held; attribution uses body italic instead of label tier |
| 5. Spacing | 3/4 | VD 8-point utilities consistent; missing `start-here` hook class |
| 6. Experience Design | 2/4 | Attribution inline in markdown only — no `adaptedFrom` schema or component |

**Overall: 16/24**

---

## Top 3 Priority Fixes

1. **Build start-here from collection data** — Hardcoded labels (“WebP images for the modern web”, “Web Vitals in practice”) do not match rendered article titles (“WebP images: a leaner alternative…”, “Web Vitals: Google's core metrics…”), causing a trust gap when users click through — resolve slugs via `getCollection`, render `post.data.title` + `description`, and add Guide/Blog badges to mirror `ArticleListItem` (`index.astro:20-66`, `07-06-PLAN.md` Task 1)
2. **Extract attribution into a styled footer block** — Attribution renders as `<em>` inside `.article` prose immediately above the share footer, with no `f-6` / `text-color-lightest` metadata styling — implement `AdaptationAttribution.astro` (or equivalent) after article body, before `ArticleFooter`, using `adaptedFrom` front matter per `07-01-PLAN.md` (`dist/guide/webp/index.html`)
3. **Add `adaptedFrom` to content schema** — Attribution lives only as duplicated markdown italics in 8 files; no Zod field, no single render path, no build-time validation of CS URLs — add `adaptedFrom: { title, url }` to blog/guide schemas and remove inline footer copies from markdown bodies (`config.ts`, all 8 pilot `.md` files)

---

## Detailed Findings

### Pillar 1: Copywriting (3/4)

**PASS — core EN copy and attribution wording**

| Element | Expected | Actual | Location |
|---------|----------|--------|----------|
| Homepage hero | Martin Michálek / Web & Performance / About Martin | Matches `05-UI-SPEC` | `index.astro:47-52` |
| Start here heading | English curation section | “Start here” + editorial intro | `index.astro:58-59` |
| Attribution pattern | “Adapted from the Czech article [Title](url)” | Consistent on all 8 pilots | `src/content/**/*.md` (8 matches) |
| Author byline | Martin Michálek → `/martin` | Avatar + linked name on guide/blog | `ArticleHeader.astro:27-31`, `dist/guide/webp` |
| Language switch labels | English · Česky | Matches `06-UI-SPEC` | `LanguageSwitch.astro:10-13` |
| Share footer copy | EN “Share:” + `michalek.dev` URLs | Fixed since Phase 5 review | `ArticleFooter.astro:60-77`, `dist/guide/webp` |
| Document title (homepage) | `{name} · Web & Performance` | `Martin Michálek · Web & Performance` (no duplication) | `dist/index.html` `<title>` |

**WARNING — start-here label drift**

Hardcoded `startHere` array uses shortened marketing labels that differ from front-matter titles users see on arrival:

| Start-here label | Actual article title |
|------------------|----------------------|
| WebP images for the modern web | WebP images: a leaner alternative to JPEG, PNG, and GIF |
| Web Vitals in practice | Web Vitals: Google's core metrics for real-world speed |
| 2025 year in review | My 2025 in review: strategic, successful — and anxious |
| Will AI kill SaaS? | Will AI kill SaaS? Look again |

Source: `index.astro:20-25` vs front matter in respective `.md` files. `07-06-PLAN.md` specified slug lookup with description teasers — not implemented.

**WARNING — attribution link text is Czech**

Czech `postTitle` in link anchor is intentional per `07-CONTEXT.md` / CONT-05, but EN-only readers get no “on Vzhůru dolů” site cue that `07-01-PLAN.md` proposed. Acceptable for advisory; consider appending site name in component render.

---

### Pillar 2: Visuals (2/4)

**PASS — article page hierarchy and language switch placement**

- Focal point: `ArticleHeader` title → author/date meta → `LanguageSwitch` → body matches `05-UI-SPEC` + `06-UI-SPEC` placement (`guide/[slug].astro:51-66`, `blog/[slug].astro:51-66`)
- Homepage: hero remains primary focal point; start-here is secondary band above stream (`index.astro:46-79`)
- VD hammer omitted on EN article footer (`site.config.ts:9`, `ArticleFooter.astro:82-86`)
- Markdown body H1 deduplicated — built `dist/guide/webp` has single `<h1>` in `page-head`, body starts at `<h2>`

**WARNING — start-here visual parity with stream**

Unified stream items use `.badge` / `.badge--yellow` + `.h4` title + date/description (`ArticleListItem.astro:27-40`). Start-here is a plain `list-unstyled` of green links with no type badge — harder to scan guide vs blog entry points (`index.astro:60-65`).

**WARNING — attribution lacks visual separation**

Built HTML shows attribution as `<p><em>Adapted from…</em></p>` inside `.article`, directly above `.article-foot` share row. No horizontal rule, no muted metadata band, no distinction from body copy. Readers may miss provenance or confuse it with article conclusion (`dist/guide/webp/index.html`).

**WARNING — homepage information density**

Start-here + full stream means four curated articles appear twice on homepage (once in start-here, again in chronological stream). Acceptable for launch curation but adds scroll before “newest” signal.

---

### Pillar 3: Color (3/4)

**PASS — VD token usage, no inline hex in EN app source**

- Styling via legacy CSS modules (`index.astro:35-37`, article pages `article.min.css` + `article-foot.min.css`)
- Accent green on links (start-here, attribution CS link, nav active state)
- Guide badges: `.badge--yellow`; blog: `.badge` — per `05-UI-SPEC` ArticleListItem contract
- Metadata dates: `.text-color-lightest` in stream (`ArticleListItem.astro:35-37`)
- `grep` for `#[0-9a-fA-F]{3,8}` and `rgb(` in `apps/michalek-dev/src`: **0 matches**

**WARNING — attribution not using muted metadata color**

Attribution inherits body link green inside `<em>` rather than `text-color-lightest` label tier used for dates and language switch (`06-UI-SPEC` metadata pattern).

---

### Pillar 4: Typography (3/4)

**PASS — four-size scale on shell pages**

| Role | Class | Usage |
|------|-------|-------|
| Display | `.h1` | Homepage hero name (`index.astro:47`) |
| Heading | `.h4` | Start here heading, stream titles (`index.astro:58`, `ArticleListItem.astro:31`) |
| Label | `.f-6` | Start here intro, nav, language switch (`index.astro:59`, `LanguageSwitch.astro:21`) |
| Body | default | Hero positioning, article prose |

**PASS — date format aligned**

Article detail: `7 Jul 2024` (en-GB short month) in `page-subhead__date` — Phase 5 gap closed (`ArticleHeader.astro:13-16`, `dist/guide/webp`).

**WARNING — attribution typography tier**

Attribution uses default 16px body + italic. Metadata elements (dates, language switch, share footer) use `.f-6` / `.f-sm`. Attribution should match label tier for consistent metadata rhythm.

---

### Pillar 5: Spacing (3/4)

**PASS — VD 8-point utilities, no arbitrary values**

- Homepage: `pt-3-md`, `mb-05`, `mb-1`, `mb-2`, `hr--small hr--spaced` (`index.astro:46-69`)
- Stream items: `.mb-15` per `05-UI-SPEC` (`ArticleListItem.astro:27`)
- Language switch: `mb-1` before content (`LanguageSwitch.astro:8`, `06-UI-SPEC`)
- `grep` for `[.*px]` / `[.*rem]` in `apps/michalek-dev/src/**/*.astro`: **0 matches**

**WARNING — missing `start-here` section class**

`07-06-PLAN.md` requested `class="start-here"` or equivalent VD list pattern for targeted styling/QA. Implementation uses generic `list-unstyled` only (`index.astro:60`).

---

### Pillar 6: Experience Design (2/4)

**PASS — pairing and navigation flows**

- `LanguageSwitch` renders on all 8 pilot pairs when `resolveAlternate()` succeeds; hidden when unpaired (`guide/[slug].astro:58-60`)
- Author byline links to `/martin` on guide and blog templates
- Share URLs point to `https://michalek.dev/...` (not CS domain)
- Attribution outbound links to canonical CS URLs on `vzhurudolu.cz` — satisfies CONT-05
- SSG: no loading/skeleton states required

**WARNING — planned attribution infrastructure skipped**

`07-01-PLAN.md` specified:

- `adaptedFrom` Zod object on blog + guide schemas
- `AdaptationAttribution.astro` rendered before `ArticleFooter`

Actual delivery: inline markdown italics only; `grep adaptedFrom apps/michalek-dev` → **0 matches**; `AdaptationAttribution.astro` → **not found**. Functional for readers, but not machine-validatable and duplicated across 8 files.

**WARNING — start-here not data-driven**

Curated slugs are correct per `07-CONTEXT.md` (webp, web-vitals, 2025-year-in-review, ai-saas), but static array risks stale copy when titles/descriptions change.

**INFO — Phase 5 ArticleFooter share block retained**

EN share row still renders Facebook/X/LinkedIn icons below attribution. Not a regression for Phase 7 scope; consider slimming EN article chrome in Phase 8 if share usage is low.

---

## Registry Safety

Registry audit: **skipped** — no `components.json`; `05-UI-SPEC.md` lists no third-party shadcn registries.

---

## Files Audited

- `apps/michalek-dev/src/pages/index.astro`
- `apps/michalek-dev/src/pages/guide/[slug].astro`
- `apps/michalek-dev/src/pages/blog/[slug].astro`
- `apps/michalek-dev/src/content/config.ts`
- `apps/michalek-dev/src/components/ArticleListItem.astro`
- `apps/michalek-dev/src/site.config.ts`
- `apps/michalek-dev/src/content/guide/*.md` (5 pilots)
- `apps/michalek-dev/src/content/blog/*.md` (3 pilots)
- `packages/shared/components/ArticleHeader.astro`
- `packages/shared/components/ArticleFooter.astro`
- `packages/shared/components/LanguageSwitch.astro`
- `packages/shared/components/Footer.astro`
- Built: `apps/michalek-dev/dist/index.html`, `dist/guide/webp/index.html`
- Baselines: `.planning/phases/05-english-app-scaffold/05-UI-SPEC.md`, `.planning/phases/06-content-pairing-i18n-seo/06-UI-SPEC.md`, `.planning/phases/07-content-adaptation-pilot-8-martin/07-CONTEXT.md`, `07-06-PLAN.md`, `07-01-PLAN.md`

---

## Advisory Recommendation

Phase 7 meets functional content goals (8 pilots, attribution text present, start-here section live, bylines wired). **Shippable for pilot launch** with advisory polish deferred to Phase 8:

- Priority if touching homepage again: dynamic start-here with badges + descriptions
- Priority if touching article templates: `adaptedFrom` schema + `AdaptationAttribution` component
- Lower priority: attribution muted styling, `start-here` CSS hook

No BLOCKER-level UI defects that prevent reading, navigating, or finding CS originals.
