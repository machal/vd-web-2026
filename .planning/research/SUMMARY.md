# Project Research Summary

**Project:** Martin Michálek · Web & Performance (michalek.dev) + Vzhůru dolů monorepo  
**Domain:** Dual-brand Astro SSG monorepo — Czech consultant media site + English personal brand adaptation  
**Researched:** 2026-06-06  
**Confidence:** HIGH

## Executive Summary

This is a **brownfield migration plus greenfield English launch**: take an existing Astro 4 static site (`vzhurudolu.cz`) with hundreds of Markdown articles, split it into a monorepo, and add a lean English personal brand site (`michalek.dev`) that adapts — not mirrors — eight pilot articles plus a `/martin` conversion page. Experts build this pattern as **two independent SSG apps sharing infrastructure**, not as locale routing inside one Astro app. Astro's `i18n.domains` requires SSR and is explicitly wrong here; cross-domain language pairing belongs in a build-time manifest, not framework i18n.

The recommended approach is **npm workspaces + Turborepo 2.9.x**, **Astro 4.16.19 pinned**, shared packages for Markdown pipeline, Vite plugins, UI, and SEO helpers, and **two Vercel projects** from one Git repo (static output, no `@astrojs/vercel` adapter). Czech site moves first with byte-identical output on FTP, then Vercel preview parity, then English app on a separate Vercel project — **never a single release combining monorepo restructure, EN launch, and DNS cutover**. Defer Astro 5/6 upgrade until post-monorepo stability.

The dominant risks are **infrastructure big-bang** (outage + no rollback), **hardcoded Czech URLs** leaking into EN canonicals/sitemaps, **`.htaccess` redirects not ported** to `vercel.json`, and **broken hreflang graphs** from slug mismatches between `/prirucka/` and `/guide/`. Mitigate with sequenced milestones, per-app `site` config, redirect audit matrices, central `CONTENT_PAIRS` manifest with build-time reciprocity validation, and PR CI that builds both apps on every change.

## Key Findings

### Recommended Stack

Stay on the existing Astro 4 SSG foundation; add monorepo orchestration without changing the content model. npm workspaces preserve the existing `package-lock.json`; Turborepo adds build graph caching and Vercel-native filtered builds. Both sites deploy as static Astro output to separate Vercel projects with Root Directory per app and "Include source files outside Root Directory" enabled.

**Core technologies:**
- **Astro 4.16.19** (exact pin): SSG for both sites — avoids Content Layer migration during an already risky monorepo cutover
- **npm workspaces + Turborepo 2.9.x**: Package linking + CI build orchestration — lowest friction from brownfield npm repo
- **Node 22.x**: Build runtime on Vercel and local — upgrade from current Node 20 during migration
- **Two Vercel projects**: Independent deploy lifecycle per brand/domain — standard monorepo pattern, no adapter for static
- **`@vd/*` shared packages**: remark/rehype plugins, Vite image pipeline, layouts, SEO helpers — factory pattern for CS vs EN path prefixes
- **Zero client JS on michalek.dev**: Pure `.astro` + CSS — Lighthouse 100/100 is a product requirement, not a nice-to-have

**Explicitly defer:** Astro 5/6 upgrade, pnpm migration, Tailwind, headless CMS, analytics JS at MVP, `@astrojs/vercel` adapter.

### Expected Features

**Must have (table stakes):**
- Homepage with clear positioning + article listings (`/blog/`, `/guide/`)
- `/martin` about/services page with pagespeed.one, client logos, LinkedIn CTA
- 8 adapted pilot articles (5 guide, 3 blog) with author bylines and EN-specific SEO metadata
- Language switch on paired content only (8 articles + `/martin`) — explicit switcher, no IP auto-redirect
- Cross-domain hreflang (`en`, `cs`, `x-default` → EN) on paired pages only; self-referencing canonicals
- RSS, XML sitemap, privacy policy, per-page OG/Twitter metadata, mobile-responsive layout
- Vercel HTTPS delivery with Lighthouse 100/100 gate

**Should have (differentiators):**
- Lighthouse 100/100 across all four metrics — site as portfolio proof
- Zero/minimal client-side JavaScript on EN site
- Person + Article JSON-LD schema with `sameAs` (LinkedIn, pagespeed.one)
- Heading anchor links, "start here" curated links, adaptation attribution note
- Performance colophon (optional post-launch)

**Defer (v2+):**
- Newsletter/Mailchimp, podcast on EN, courses/e-books, tag archive pages, search, comments, cookieless analytics, full příručka mirror

### Architecture Approach

Use a **two-app, shared-package monorepo**: `apps/vzhurudolu` (CS: blog, podcast, prirucka) and `apps/michalek-dev` (EN: blog, guide, `/martin`). Content stays app-local; code, schemas, pairing metadata, and static assets live in shared packages (`@vd/markdown`, `@vd/vite-plugins`, `@vd/ui`, `@vd/astro-config`, or consolidated `@vd/shared` — implement as granular packages per STACK, with subfolder structure per ARCHITECTURE). Each app injects brand via `site.config.ts`; shared layouts never hardcode Czech strings or URLs.

**Major components:**
1. **`apps/vzhurudolu`** — Full Czech site; owns ~190 blog, ~68 podcast, ~370 prirucka pages; Apache redirect legacy
2. **`apps/michalek-dev`** — Lean EN site; `/guide/` maps příručka articles; zero legacy JS for MVP
3. **`packages/*` shared** — Markdown pipeline (parameterized `/prirucka` vs `/guide`), Vite plugins, layouts, `CONTENT_PAIRS` manifest, hreflang/canonical helpers, URL builders
4. **Content pairing registry** — Central `pairs.ts` + `pairId` in front matter; `resolveAlternate()` drives language switch and hreflang at build time
5. **Two Vercel projects** — Independent Root Directory, turbo-filtered build commands, per-app `vercel.json`

### Critical Pitfalls

1. **Triple big-bang release** — Sequence: monorepo on FTP (Czech-only) → Czech Vercel preview parity → EN Vercel project → staged DNS per domain; keep FTP rollback until 48h soak
2. **Astro deps hoisted to root only** — Declare `astro` + every `@astrojs/*` in each `apps/*/package.json`; CI must build from each app root on clean install
3. **Hardcoded `vzhurudolu.cz` URLs** — Per-app `site` in astro.config; refactor sitemap/RSS/OG to use `Astro.site`; grep CI for Czech domain in EN dist output
4. **`.htaccess` not ported to `vercel.json`** — Inventory ~300 Apache rules; map redirects, headers, trailing-slash policy before Czech DNS switch; middleware does not run on static Vercel
5. **Incomplete hreflang clusters** — Bidirectional graph required; central manifest + build validator; slugs may differ between CS/EN — never assume URL symmetry

## Implications for Roadmap

Based on research, suggested phase structure:

### Phase 1: Monorepo Foundation & CI
**Rationale:** Everything else depends on workspace wiring; Czech site must keep building throughout. Pitfalls P2, P25, P16 block all downstream work.  
**Delivers:** Root `package.json` workspaces, `turbo.json`, `apps/vzhurudolu/` with moved `src/`, PR CI matrix building Czech app, draft-content filter fix  
**Addresses:** Monorepo structure requirement; Czech compatibility constraint  
**Avoids:** Dependency hoisting failures; merging broken structure to main; draft URLs in sitemap

### Phase 2: Shared Packages Extraction
**Rationale:** EN app and Vercel cutover both need parameterized shared code; move plugins verbatim before any logic changes.  
**Delivers:** `@vd/markdown`, `@vd/vite-plugins`, `@vd/ui`, `@vd/astro-config` (or `@vd/shared` with exports map); `createMarkdownConfig({ guidePath })`; `siteConfig` injection pattern  
**Uses:** remark/rehype stack, Sharp Vite plugins, BaseLayout/Header/Footer extraction  
**Implements:** Factory markdown config, URL helpers (`getSlug`, collection paths)  
**Avoids:** Markdown pipeline regression (P9); hardcoded `/prirucka` paths (P14)

### Phase 3: Czech Site Parity Verification
**Rationale:** Prove monorepo output matches production before changing hosting; FTP remains rollback path.  
**Delivers:** Byte-identical (modulo hosting) Czech build from `apps/vzhurudolu`; URL diff or link checker vs live site; `public/` asset audit (685 MB — apply FTP exclude logic)  
**Addresses:** Czech site must keep working  
**Avoids:** Public bulk copy timeout (P12); undetected regressions before Vercel

### Phase 4: Vercel Migration — Czech Site
**Rationale:** Hosting cutover is highest outage risk; complete for Czech before EN launch or simultaneous DNS.  
**Delivers:** Vercel project 1 (`apps/vzhurudolu`), `vercel.json` with redirects from `.htaccess`, `trailingSlash: false`, security headers; preview URL matching production redirects  
**Uses:** Two-project Vercel pattern from STACK; redirect inventory from PITFALLS  
**Avoids:** `.htaccess` 404 spike (P4); static middleware false confidence (P5); trailing-slash duplicates (P6); DNS without TTL reduction (P11)

### Phase 5: English App Scaffold
**Rationale:** Shared packages must exist before EN app; slim layout required for Lighthouse goal.  
**Delivers:** `apps/michalek-dev` with `guide` + `blog` collections, `/martin`, homepage, EN `site.config.ts`, zero-jQuery layout, listing pages  
**Addresses:** URL structure `/blog/` + `/guide/`; site title; table-stakes pages  
**Implements:** Two-app architecture; brand separation (not "Vzhůru dolů in English")  
**Avoids:** `i18n.domains` SSR creep (P7); jQuery inheritance (P18); brand mixing (P24)

### Phase 6: Content Pairing & i18n SEO
**Rationale:** Language switch and hreflang depend on stable pairing schema; must be built before publishing pilot articles.  
**Delivers:** `CONTENT_PAIRS` manifest, `resolveAlternate()`, `LanguageSwitch.astro`, hreflang helpers, build-time reciprocity validator, mirrored links on Czech originals  
**Addresses:** Full language switch; hreflang on paired pages  
**Avoids:** Broken hreflang graph (P8); frontmatter-only pairing drift; cross-language canonicals

### Phase 7: Content Adaptation — Pilot 8 + `/martin`
**Rationale:** Editorial work can parallelize with Phase 5–6 scaffolding but must not block Czech deploy; human pass is non-negotiable.  
**Delivers:** 5 guide + 3 blog adapted articles with `pairId`, EN-native `/martin` copy, homepage "start here" links  
**Addresses:** 8 pilot articles; pagespeed.one promotion; adaptation-not-translation  
**Avoids:** Literal translation (P10); scope creep to podcast/newsletter/full guide mirror (P23)

### Phase 8: Launch Polish — Legal, Feeds, SEO, Lighthouse
**Rationale:** Table-stakes launch blockers that depend on published content existing.  
**Delivers:** Privacy policy, RSS (blog + guide only), per-app sitemap, OG metadata, JSON-LD Person/Article, custom 404, Lighthouse 100/100 verification gate  
**Addresses:** Legal minimum, RSS, sitemap, SEO metadata, performance core value  
**Avoids:** EN RSS including Czech podcast (P15); analytics/cookie banner JS weight

### Phase 9: Production Cutover — michalek.dev + DNS
**Rationale:** EN goes live only after Czech Vercel is stable; DNS cutover per domain, not same hour.  
**Delivers:** Vercel project 2 (`apps/michalek-dev`), domain `michalek.dev`, GSC submission, pre-cutover checklist pass, FTP workflow retired after soak  
**Uses:** Second Vercel project config; detection checklist from PITFALLS  
**Avoids:** Triple big-bang (P1); simultaneous DNS for both domains without validation

### Phase Ordering Rationale

- **Czech-first, EN-second:** Protects revenue/traffic site; EN is greenfield with no production users yet
- **Shared packages before EN app:** Parameterized markdown pipeline and layouts are prerequisites for both sites post-split
- **Pairing infrastructure before content:** Slug mismatches (`261-rok-2025` ↔ `2025-year-in-review`) require manifest before articles ship
- **Vercel Czech before EN DNS:** Redirect audit and trailing-slash policy proven on high-traffic domain first
- **Lighthouse gate last among build phases:** Validates cumulative decisions (no jQuery, no analytics, optimized assets)

### Research Flags

Phases likely needing deeper research during planning:
- **Phase 6 (Content Pairing):** Pilot pair URL finalization, hreflang implementation method (HTML vs sitemap annotations), reciprocity validator design
- **Phase 4 (Vercel Czech):** Complete `.htaccess` → `vercel.json` redirect mapping; `public/data/` legacy asset disposition
- **Phase 7 (Content Adaptation):** Editorial adaptation checklist per article type; EN slug naming conventions

Phases with standard patterns (skip research-phase):
- **Phase 1 (Monorepo Foundation):** Astro monorepo troubleshooting docs + Turborepo Vercel integration
- **Phase 5 (EN Scaffold):** Standard Astro content collections and file-based routing
- **Phase 8 (Legal/Feeds):** Existing Czech patterns (`osobni-udaje.astro`, custom sitemap, RSS) to adapt

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | **HIGH** | Verified against Astro docs, Vercel monorepo docs, npm registry versions, existing codebase |
| Features | **HIGH** | Table stakes from consultant benchmarks + PROJECT.md; GDPR nuance depends on analytics decision |
| Architecture | **HIGH** | Two-app pattern confirmed; Astro i18n.domains rejected with official SSR requirement |
| Pitfalls | **HIGH** | Grounded in codebase artifacts (`.htaccess`, `custom-sitemap.ts`, `middleware.ts`, CONCERNS.md) |

**Overall confidence:** **HIGH**

### Gaps to Address

- **Package granularity:** STACK recommends `@vd/markdown`, `@vd/ui`, etc.; ARCHITECTURE uses single `@vd/shared` — decide during Phase 1 planning (granular preferred for build graph clarity)
- **Shared static assets strategy:** `publicDir` pointing at shared package vs copy step — pick one approach and document
- **Pilot slug finalization:** EN blog slugs may differ from CS; manifest entries need owner confirmation before Phase 6
- **Legacy `public/data/` URLs:** Audit whether 128 MB archive must remain live on Vercel or can move to object storage
- **Astro upgrade timeline:** Deferred post-monorepo; no date commitment until cutover stable

## Sources

### Primary (HIGH confidence)
- [Astro monorepo troubleshooting](https://docs.astro.build/en/guides/troubleshooting/#adding-dependencies-to-astro-in-a-monorepo) — workspace deps, `vite.ssr.noExternal`
- [Astro Vercel deploy guide](https://docs.astro.build/en/guides/deploy/vercel/) — static deploy, no adapter
- [Astro i18n domains](https://docs.astro.build/en/guides/internationalization) — SSR requirement, rejected for this project
- [Vercel monorepo docs](https://vercel.com/docs/monorepos) — two projects, root directory, skip unaffected builds
- [Google Search Central — hreflang](https://developers.google.com/search/docs/specialty/international/localized-versions) — cross-domain pairing rules
- `.planning/PROJECT.md` — requirements, constraints, pilot article list
- `.planning/codebase/CONCERNS.md` — draft filtering, plugin order, public bulk, known bugs

### Secondary (MEDIUM confidence)
- [CSS Wizardry](https://csswizardry.com/), [corewebvitals.io](https://www.corewebvitals.io/) — consultant site benchmarks
- Wumty / Astro Fleet monorepo patterns — shared UI and workspace layout
- Community: trailing slash on Astro+Vercel, hreflang reciprocity patterns

### Tertiary (LOW confidence)
- Playwright E2E post-migration — optional, not MVP
- `@astrojs/sitemap` re-evaluation — known bug; defer until Astro upgrade milestone

---
*Research completed: 2026-06-06*  
*Ready for roadmap: yes*
