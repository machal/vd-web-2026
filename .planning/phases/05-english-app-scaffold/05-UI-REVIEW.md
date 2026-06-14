# Phase 5 — UI Review

**Audited:** 2026-06-09
**Baseline:** `05-UI-SPEC.md` (approved 2026-06-09)
**Screenshots:** not captured (no dev server on ports 3000, 4321, 5173, 8080; audit used source + built `dist/` HTML)

---

## Pillar Scores

| Pillar | Score | Key Finding |
|--------|-------|-------------|
| 1. Copywriting | 2/4 | Article footer renders Czech share copy and CS-domain share URLs on EN pages |
| 2. Visuals | 3/4 | Homepage/martin hierarchy matches spec; article footer shows VD hammer logo (omitted elsewhere) |
| 3. Color | 3/4 | VD palette applied via legacy CSS; OG meta still uses CS social images |
| 4. Typography | 3/4 | Four-size scale mostly respected; 404 h1 lacks Display class; article dates inconsistent |
| 5. Spacing | 3/4 | VD 8-point utilities used consistently; no arbitrary pixel spacing in markup |
| 6. Experience Design | 2/4 | Share buttons link to vzhurudolu.cz; broken `#vd-symbol` reference on article pages |

**Overall: 16/24**

---

## Top 3 Priority Fixes

1. **Localize or strip `ArticleFooter` for EN** — Czech “Sdílení potěší:”, VD hammer SVG, and share URLs pointing at `vzhurudolu.cz` break brand separation (EN-06) and send readers to the wrong site when sharing — parameterize `ArticleFooter` with `siteConfig` (hide logo, EN share copy, `michalek.dev` URLs) or omit footer on EN article pages until Phase 6+
2. **Fix homepage `<title>` duplication** — Built output is `Martin Michálek · Martin Michálek · Web & Performance` because `index.astro` passes `title="Martin Michálek"` while `titleSuffix` already includes the name — change homepage title to empty string or a distinct page label (e.g. `Articles`) per document-title pattern in UI-SPEC
3. **Align article date formatting and 404 display typography** — `ArticleHeader` renders `01/06/2026` (numeric month) vs stream’s `2 Jun 2026` (en-GB short month); 404 `<h1>` lacks `.h1` Display class specified in UI-SPEC — update `ArticleHeader` `Intl` options to `{ month: 'short' }` and add `class="h1"` to 404 heading

---

## Detailed Findings

### Pillar 1: Copywriting (2/4)

**PASS — contract copy on core routes**

| Element | Expected (UI-SPEC) | Actual | Location |
|---------|-------------------|--------|----------|
| Hero CTA | About Martin | About Martin | `index.astro:44` |
| Hero tagline | Web & Performance | Web & Performance | `index.astro:41` |
| Hero positioning | Personal tech blog… | Personal tech blog and web performance consulting. | `index.astro:42` |
| Nav labels | Articles / Martin | Articles / Martin | `site.config.ts:13-20`, dist nav |
| Badges | Blog / Guide | Blog / Guide | `ArticleListItem.astro:23-29` |
| Empty state | No articles yet / New posts… | Matches | `index.astro:55-56` |
| 404 copy | Page not found / body / CTAs / error 404 | Matches | `404.astro:27-33` |
| Legal stubs | Privacy/Cookies coming soon | Matches | `privacy.astro`, `cookies.astro` |
| Footer attribution | Built by Martin Michálek | Built by Martin Michálek | `Footer.astro:22`, dist |
| `/martin` LinkedIn / PageSpeed.ONE | LinkedIn / PageSpeed.ONE | Present | `martin.astro:63,80` |

**BLOCKER — article footer Czech copy and wrong share domain**

- `packages/shared/components/ArticleFooter.astro:104` — `<strong>Sdílení potěší:</strong>` (Czech) rendered on EN article pages
- `ArticleFooter.astro:40-44` — `articleUrl` hardcoded to `https://www.vzhurudolu.cz/blog/...` regardless of site
- Built `dist/blog/hello-blog/index.html` — Facebook/X/LinkedIn share links encode `vzhurudolu.cz` URLs and X uses `via=vzhurudolu`

**WARNING — document title duplication**

- Built `dist/index.html` — `<title>Martin Michálek · Martin Michálek · Web &amp; Performance</title>`
- `BaseLayout.astro:45` concatenates `title · titleSuffix`; homepage should not repeat site name in both props

**WARNING — date format inconsistency**

- Stream: `2 Jun 2026` (`ArticleListItem.astro:12-16`, `month: 'short'`) ✓
- Article detail: `01/06/2026` (`ArticleHeader.astro:13-16`, `month: 'numeric'`) — does not match UI-SPEC en-GB pattern

---

### Pillar 2: Visuals (3/4)

**PASS — page-level hierarchy**

- Homepage: hero focal point → CTA → stream divider matches UI-SPEC layout (`index.astro:37-58`)
- `/martin`: `lector__head` hero → performance section → accordion → client band → publications → contact (`martin.astro:33-172`)
- Header: text wordmark only, optional `.f-6` subtitle — no hammer SVG (`Header.astro:84-93`, dist)
- Nav: two items only; active states correct on `/` and `/martin` (dist)

**WARNING — VD logo on article footer**

- UI-SPEC: “no VD hammer/anvil logo on EN site”
- `ArticleFooter.astro:53-55` renders `<svg class="vd-logo">` with `xlink:href="#vd-symbol"`
- With `showLogoSymbol: false`, `#vd-symbol` is not defined in DOM (`Header.astro:17-70` skipped) — logo reference is broken and violates brand contract

**WARNING — 404 heading lacks Display styling**

- UI-SPEC: 404 focal point uses Display (`.h1`)
- `404.astro:27` — plain `<h1>Page not found</h1>` without `.h1` class

**Minor — duplicate stylesheet links in body**

- `BaseLayout.astro:130` duplicates `<slot name="styles" />` in `<body>`, causing page CSS to load twice (visible in dist `index.html`, `martin/index.html`)

---

### Pillar 3: Color (3/4)

**PASS — in-page palette**

- No inline hex/rgb in EN app markup (grep clean on `apps/michalek-dev/src`)
- Accent usage aligns with spec: `.button` CTAs, `.badge` / `.badge--yellow`, default link color via VD CSS
- `.bg-dark` client band on `/martin` uses secondary (30%) surface (`martin.astro:129`)
- Metadata dates use `.text-color-lightest` on stream items (`ArticleListItem.astro:35`)

**WARNING — CS OG social images on all EN pages**

- `BaseLayout.astro:36-39` — default `ogImage` URLs point to `vzhurudolu.cz` social assets
- All built pages (homepage, 404, articles, martin) emit CS OG images in `<head>`
- Not visible on-page but affects social preview branding for EN site

**WARNING — accent-adjacent VD logo in article footer**

- Footer hammer SVG uses VD green branding on EN article pages (see Pillar 2)

---

### Pillar 4: Typography (3/4)

**PASS — four-size scale in EN markup**

| Role | VD class | Usage |
|------|----------|-------|
| Display | `.h1`, `.lector__head-name` | Homepage hero, martin hero |
| Heading | `.h4`, `.f-4` | Stream titles, hero tagline |
| Label | `.f-6`, `.f-sm` | Nav items, metadata bands, footer |
| Body | default | Article body, hero perex |

- Weights: body/labels normal; headings via foro extra bold (CSS) ✓
- No Tailwind or ad-hoc font-size classes ✓

**WARNING — 404 h1 not Display-sized** (see Pillar 2)

**WARNING — article vs list date typography mismatch** (see Pillar 1)

**Minor — privacy/cookies h1 without explicit size class**

- `privacy.astro:25`, `cookies.astro:25` — bare `<h1>` inherits page-head styling; acceptable for stubs but inconsistent with 404/martin Display treatment

---

### Pillar 5: Spacing (3/4)

**PASS — VD utility scale**

Spacing classes found in EN source map cleanly to UI-SPEC tokens:

| Class | Token | Files |
|-------|-------|-------|
| `mb-025`, `mb-05` | xs/sm | (via shared components) |
| `mb-1`, `p-1` | md | `index.astro`, `martin.astro` |
| `mb-15`, `pt-15`, `mt-15` | lg | `ArticleListItem.astro`, `martin.astro` |
| `mb-2`, `py-2`, `pt-3-md`, `py-3-md` | xl | `index.astro`, `404.astro`, `martin.astro` |
| `py-3`, `mb-3` | 2xl | `martin.astro` |

- Article list items use `.mb-15` per contract (`ArticleListItem.astro:27`) ✓
- Hero uses `.content-full pt-3-md` per homepage layout spec ✓
- No arbitrary `[Npx]` or inline spacing in EN markup ✓

**Minor — helper width classes**

- `maxw-30em`, `maxw-40em` on martin page — VD helper classes, not spacing-scale violations

---

### Pillar 6: Experience Design (2/4)

**PASS — static-site state coverage**

- Empty article stream handled with spec copy (`index.astro:51-57`)
- 404 page with dual CTAs (`404.astro:30-33`)
- Legal stubs with “coming soon” messaging
- Language-switch reserved as HTML comment, not rendered (`blog/[slug].astro:41`, `guide/[slug].astro:41`)
- No Disqus/jQuery on EN routes (EN-06) ✓
- Skip link localized to English (`BaseLayout.astro:132`)
- Nav `aria-current="page"` on active items (`Navigation.astro:110`)
- Accordion services on `/martin` use native checkbox pattern (keyboard-accessible)

**BLOCKER — broken share experience on article pages**

- Share URLs target wrong domain (see Pillar 1) — users sharing EN articles promote CS site
- `#vd-symbol` undefined when logo SVG omitted — footer logo fails silently

**WARNING — no EN-specific ArticleFooter behavior**

- Shared footer component not parameterized for `siteConfig`; EN pages inherit full CS footer chrome (logo + share block) minus comments widget
- UI-SPEC: “strip comment widget hooks” — comments removed, but Czech share section remains

**WARNING — global CSS bloat on all pages**

- `BaseLayout.astro:113-117` loads `article.min.css`, `ad-snippet.min.css`, `topbar.min.css`, `box.min.css` on every page including homepage/404
- UI-SPEC per-page CSS table lists narrower bundles; extra modules do not break layout but add weight

**N/A — loading/error boundaries**

- SSG static site; no client-side loading or error boundaries expected in Phase 5

---

## Registry Safety

Registry audit: **skipped** — `shadcn_initialized: false` in UI-SPEC; no `components.json`; no third-party registries.

---

## Files Audited

**EN app (`apps/michalek-dev/`)**
- `src/pages/index.astro`
- `src/pages/404.astro`
- `src/pages/martin.astro`
- `src/pages/privacy.astro`
- `src/pages/cookies.astro`
- `src/pages/blog/[slug].astro`
- `src/pages/guide/[slug].astro`
- `src/components/ArticleListItem.astro`
- `src/site.config.ts`
- `src/content/blog/hello-blog.md`
- `src/content/guide/hello-guide.md`

**Shared (`packages/shared/`)**
- `layouts/BaseLayout.astro`
- `components/Header.astro`
- `components/Footer.astro`
- `components/Navigation.astro`
- `components/ArticleHeader.astro`
- `components/ArticleFooter.astro`

**Built output (grep verification)**
- `apps/michalek-dev/dist/index.html`
- `apps/michalek-dev/dist/404.html`
- `apps/michalek-dev/dist/martin/index.html`
- `apps/michalek-dev/dist/blog/hello-blog/index.html`

**Design contract**
- `.planning/phases/05-english-app-scaffold/05-UI-SPEC.md`
