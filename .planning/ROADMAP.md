# Roadmap: Martin Michálek · Web & Performance

## Overview

Brownfield Astro monorepo migration and English personal brand launch. Czech site (`vzhurudolu.cz`) moves first — workspace structure, shared packages, parity verification, Vercel cutover — before the greenfield English app (`michalek.dev`) ships with 8 adapted articles, cross-domain language pairing, and simultaneous production deploy. Sequenced milestones avoid triple big-bang; pragmatic performance (good CWV, GA allowed) over Lighthouse perfection.

## Phases

- [x] **Phase 1: Monorepo Foundation & CI** - Workspace structure, Turborepo, Czech app relocation, draft filtering (completed 2026-06-07)
- [x] **Phase 2: Shared Packages Extraction** - Parameterized markdown pipeline, Vite plugins, layouts, SEO helpers in packages *(execution complete — ready for verification)* (completed 2026-06-07)
- [x] **Phase 3: Czech Site Parity Verification** - Output parity vs production, public asset audit, link integrity (completed 2026-06-07)
- [x] **Phase 4: Vercel Migration — Czech Site** - Czech hosting cutover with `.htaccess` → `vercel.json` redirect port
- [x] **Phase 5: English App Scaffold** - michalek.dev Astro app, homepage, nav, routing, dual Vercel project config (EN Vercel dashboard: human_needed)
- [x] **Phase 6: Content Pairing & i18n SEO** - CONTENT_PAIRS manifest, language switch, hreflang, Czech mirror links (completed 2026-06-09)
- [ ] **Phase 7: Content Adaptation — Pilot 8 + `/martin`** - 8 adapted articles, native EN `/martin`, homepage "start here"
- [x] **Phase 8: Launch Polish — Legal, Feeds, Tags, Performance** - SEO metadata, RSS/sitemap, tags, legal, CWV review, GA (completed 2026-06-09)
- [ ] **Phase 9: Production Cutover — michalek.dev + DNS** - Staged DNS for both domains, FTP retirement, rollback docs *(executed — DNS blocked by v1.1)*

### Milestone v1.1 — Visual Polish (pre-launch)

- [x] **Phase 10: CZ Nav & Homepage Restructure** - Header/footer nav, podcast/FrontKec homepage layout *(executed — human_needed preview check)*
- [x] **Phase 11: Shared Author Profile Box** - Brown inverse author box on both homepages
- [x] **Phase 12: EN Homepage CS Parity** - Featured article, author, stream, green topic hub
- [x] **Phase 13: Article Detail Language UX** - Inline language switch; remove adaptation footer
- [x] **Phase 14: Pre-launch Verify & DNS Unblock** - Visual UAT; resume Phase 9 cutover

## Phase Details

### Phase 1: Monorepo Foundation & CI

**Goal**: Czech site builds reliably from monorepo structure with CI guardrails
**Mode:** mvp
**Depends on**: Nothing (first phase)
**Requirements**: MONO-01, MONO-02, MONO-04, VD-02
**Success Criteria** (what must be TRUE):

  1. Developer can run `npm install` at repo root and build Czech site from `apps/vzhurudolu` without errors
  2. Turborepo filter commands build the Czech app independently for local dev and CI
  3. Draft/unpublished blog posts do not appear in production build output or sitemap
  4. Each app declares its own `astro` and `@astrojs/*` dependencies — no root-only hoisting failures

**Plans**: 4 plans
Plans:
**Wave 1**

- [x] 01-01-PLAN.md — Workspace scaffold + big-bang Czech app move (MONO-01 walking skeleton)

**Wave 2** *(blocked on Wave 1 completion)*

- [x] 01-02-PLAN.md — Turborepo orchestration + app dependency isolation (MONO-02, MONO-04)

**Wave 3** *(blocked on Wave 2 completion)*

- [x] 01-03-PLAN.md — Draft/unpublished content exclusion fix (VD-02)

**Wave 4** *(blocked on Wave 3 completion)*

- [x] 01-04-PLAN.md — PR CI + FTP deploy path update (MONO-01, MONO-02 CI guardrails)

### Phase 2: Shared Packages Extraction

**Goal**: Shared infrastructure lives in packages — no duplicated plugin or layout code
**Mode:** mvp
**Depends on**: Phase 1
**Requirements**: MONO-03
**Success Criteria** (what must be TRUE):

  1. Markdown pipeline, Vite plugins, layouts, and SEO helpers import from `packages/*` in both apps
  2. Czech site builds with identical content rendering after package extraction (no visual or URL regressions)
  3. Shared markdown config accepts path prefixes (`/prirucka` vs `/guide`) via factory pattern — ready for EN app

**Plans**: 5 plans

Plans:
**Wave 1**

- [x] 02-01-PLAN.md — @vd/shared scaffold + workspace wiring + verify script (MONO-03 foundation)

**Wave 2** *(blocked on Wave 1 completion)*

- [x] 02-02-PLAN.md — Vite plugins extraction to @vd/shared (MONO-03)

**Wave 3** *(blocked on Wave 2 completion)*

- [x] 02-03-PLAN.md — Markdown pipeline + createMarkdownConfig factory (MONO-03, D-06/D-07)

**Wave 4** *(blocked on Wave 3 completion)*

- [x] 02-04-PLAN.md — SEO sitemap + layouts/components extraction (MONO-03)

**Wave 5** *(blocked on Wave 4 completion)*

- [x] 02-05-PLAN.md — Cleanup, dep dedupe, full verify gate (MONO-03)

### Phase 3: Czech Site Parity Verification

**Goal**: Monorepo Czech build matches current production behavior before hosting changes
**Mode:** mvp
**Depends on**: Phase 2
**Requirements**: VD-01, VD-05
**Success Criteria** (what must be TRUE):

  1. Czech site from `apps/vzhurudolu` produces output parity with current production (URLs, redirects, content)
  2. Link checker or URL diff confirms no broken internal links vs live `vzhurudolu.cz`
  3. `public/` asset strategy applied — 685 MB audit complete; builds complete without timeout

**Plans**: 4 plans

Plans:
**Wave 1**

- [x] 03-01-PLAN.md — Public asset audit + build timing (VD-05, D-09/D-10/D-12)
- [x] 03-02-PLAN.md — verify-phase3-parity.sh skeleton + sitemap URL diff (VD-01, D-01/D-02)

**Wave 2** *(blocked on Wave 1 plan 02 completion)*

- [x] 03-03-PLAN.md — linkinator internal links + production redirect samples (VD-01, D-05/D-06/D-07)

**Wave 3** *(blocked on Wave 2 completion + Plan 01 audit)*

- [x] 03-04-PLAN.md — PR CI link check + 5-page spot-check + phase gate (VD-01, VD-05, D-08/D-15/D-16)

### Phase 4: Vercel Migration — Czech Site

**Goal**: Czech site serves from Vercel with ported redirects while FTP remains rollback path
**Mode:** mvp
**Depends on**: Phase 3
**Requirements**: VD-03
**Success Criteria** (what must be TRUE):

  1. Czech site preview on Vercel matches production URL behavior including legacy redirects from `.htaccess`
  2. Reader visiting `vzhurudolu.cz` URLs on Vercel preview gets same content and redirect chains as FTP production
  3. Security headers and trailing-slash policy match production expectations

**Plans**: 4 plans

Plans:
**Wave 1**

- [x] 04-01-PLAN.md — Vercel project scaffold (build, trailingSlash, CORS headers, .vercelignore)

**Wave 2** *(blocked on Wave 1 completion)*

- [x] 04-02-PLAN.md — .htaccess → vercel.json redirect port (VD-03 core)
- [x] 04-03-PLAN.md — verify-phase4-vercel.sh preview gate

**Wave 3** *(blocked on Wave 2 completion)*

- [x] 04-04-PLAN.md — Vercel dashboard connect + FTP rollback preserved + phase verification

### Phase 5: English App Scaffold

**Goal**: michalek.dev exists as lean English Astro app with core pages and dual-project Vercel config
**Mode:** mvp
**Depends on**: Phase 4
**Requirements**: EN-01, EN-02, EN-03, EN-04, EN-05, EN-06, EN-07, EN-08, MONO-05, DEPLOY-01
**Success Criteria** (what must be TRUE):

  1. Visitor sees homepage with personal tech blog positioning, unified article stream (blog + guide), and CTA to `/martin`
  2. Site title reads **Martin Michálek · Web & Performance** — personal brand, not Vzhůru dolů
  3. Navigation shows **Articles** (→ `/`) and **Martin** (→ `/martin`); legal links in footer only
  4. Article URLs resolve at `/blog/{slug}` and `/guide/{slug}` with no separate listing pages
  5. Full `/martin` page with bio, services, client logos, LinkedIn CTA, and **pagespeed.one** promotion
  6. Custom 404 page helps visitor navigate back to homepage
  7. PR CI builds both apps on every change; two Vercel projects configured from one repo with per-app Root Directory

**Plans**: 5 plans

Plans:
**Wave 1**

- [x] 05-01-PLAN.md — Shared siteConfig parameterization for EN branding (EN-02, EN-07)

**Wave 2** *(blocked on Wave 1 completion)*

- [x] 05-02-PLAN.md — EN Astro app scaffold, collections, stub content (EN-01, EN-06)

**Wave 3** *(blocked on Wave 2 completion)*

- [x] 05-03-PLAN.md — Homepage, article routes, 404, legal stubs (EN-03, EN-04, EN-06, EN-07, EN-08)
- [x] 05-04-PLAN.md — Full `/martin` page EN-05 pulled forward (EN-05)

**Wave 4** *(blocked on Wave 3 completion)*

- [x] 05-05-PLAN.md — Dual-app CI, EN vercel.json, verify gate, Vercel dashboard checkpoint (MONO-05, DEPLOY-01) — dashboard: human_needed

**Cross-cutting constraints:**

- Site title reads **Martin Michálek · Web & Performance** — personal brand, not Vzhůru dolů
- PR CI builds both apps on every change; two Vercel projects configured from one repo with per-app Root Directory

**UI hint**: yes

### Phase 6: Content Pairing & i18n SEO

**Goal**: Cross-domain language pairing works bidirectionally on all paired content
**Mode:** mvp
**Depends on**: Phase 5
**Requirements**: I18N-01, I18N-02, I18N-03, I18N-04, I18N-05, I18N-06, I18N-07, VD-04
**Success Criteria** (what must be TRUE):

  1. Reader on any of 8 paired EN articles or `/martin` sees language switch ("English" / "Česky") linking to Czech counterpart
  2. Reader on Czech originals of 8 pilot articles sees language switch linking to English counterparts
  3. Paired pages include correct hreflang tags (`en`, `cs`, `x-default` → EN) with absolute URLs
  4. Each page has self-referencing canonical URL — never cross-language canonical
  5. Build fails if pairing manifest has orphan or non-reciprocal pairs
  6. No automatic IP/browser language redirect occurs

**Plans**: 5 plans

Plans:
**Wave 1**

- [x] 06-01-PLAN.md — CONTENT_PAIRS manifest, resolve.ts, validate core, pairId schemas (I18N-01, I18N-02)

**Wave 2** *(blocked on Wave 1 completion)*

- [x] 06-02-PLAN.md — hreflang/canonical helpers, LanguageSwitch, BaseLayout head injection (I18N-03, I18N-05, I18N-06)

**Wave 3** *(blocked on Wave 2 completion)*

- [x] 06-03-PLAN.md — EN pilot stubs + page wiring (I18N-03, I18N-05, I18N-06, I18N-07)
- [x] 06-04-PLAN.md — CS pairId front matter + page wiring (VD-04, I18N-02, I18N-03, I18N-05, I18N-06)

**Wave 4** *(blocked on Wave 3 completion)*

- [x] 06-05-PLAN.md — Build validator CLI, verify gate, PR CI (I18N-04, I18N-07)

**UI hint**: yes

### Phase 7: Content Adaptation — Pilot 8 + `/martin`

**Goal**: Eight adapted pilot articles and native English `/martin` page earn technical credibility
**Mode:** mvp
**Depends on**: Phase 6
**Requirements**: CONT-01, CONT-02, CONT-03, CONT-04, CONT-05, CONT-06, CONT-07, EN-05
**Success Criteria** (what must be TRUE):

  1. Reader can access 5 guide articles (`ai-saas`, `vibe-coding`, `email-inbox-zero`, `web-vitals`, `webp`) and 3 blog articles (`261-rok-2025`, `254-ne`, `244-usetrite-utratite`) in adapted English
  2. Each article has EN-specific title, description, slug, author byline linking to `/martin`, and attribution note (adapted from Czech original)
  3. `/martin` page presents bio, positioning, services, client logos, LinkedIn CTA, and prominent **pagespeed.one** promotion in native English
  4. Homepage includes curated "start here" links to key pilot articles

**Plans**: 6 plans

Plans:
- [x] 07-01-PLAN.md — EN content schema, AdaptationAttribution, author/attribution wiring (CONT-03, CONT-04, CONT-05)
- [x] 07-02-PLAN.md — Adapt guide pilots webp + web-vitals (CONT-01)
- [x] 07-03-PLAN.md — Adapt guide pilots ai-saas + email-inbox-zero (CONT-01)
- [x] 07-04-PLAN.md — Adapt guide pilot vibe-coding (CONT-01)
- [x] 07-05-PLAN.md — Adapt 3 blog pilots (CONT-02)
- [x] 07-06-PLAN.md — Homepage start-here, /martin EN-05 verify, phase 7 gate (CONT-06, CONT-07, EN-05)

**UI hint**: yes

### Phase 8: Launch Polish — Legal, Feeds, Tags, Performance

**Goal**: michalek.dev is launch-ready for discovery, compliance, and pragmatic performance
**Mode:** mvp
**Depends on**: Phase 7
**Requirements**: SEO-01, SEO-02, SEO-03, SEO-04, SEO-05, SEO-06, SEO-07, LEGAL-01, LEGAL-02, LEGAL-03, EN-09, EN-10, PERF-01, PERF-02, PERF-03, PERF-04
**Success Criteria** (what must be TRUE):

  1. Every public page has unique title, meta description, Open Graph, Twitter Card, and `lang="en"`
  2. XML sitemap and RSS feed (`/rss`) aggregate unified blog + guide stream; `robots.txt` references sitemap
  3. Person + Article JSON-LD includes `sameAs` (LinkedIn, pagespeed.one)
  4. Tag archive pages (`/{tag}/`) filter unified stream; tags visible on article pages for discovery
  5. Privacy policy and cookie consent cover Vercel hosting and analytics cookies; footer links to both
  6. Site maintains good mobile Core Web Vitals; GA loads async/deferred without blocking render

**Plans**: 5 plans (executed from CONTEXT)

Plans:
- [x] 08-01 — EN tag taxonomy + `/{tag}/` archive pages (EN-09, EN-10)
- [x] 08-02 — RSS `/rss` + robots.txt + sitemap (SEO-03, SEO-04, SEO-05)
- [x] 08-03 — SEO metadata, Twitter Cards, JSON-LD (SEO-01, SEO-02, SEO-06, SEO-07)
- [x] 08-04 — Privacy/cookie policies + consent banner (LEGAL-01, LEGAL-02, LEGAL-03)
- [x] 08-05 — Deferred GA + verify gate + CI (PERF-02, PERF-04)

**UI hint**: yes

### Phase 9: Production Cutover — michalek.dev + DNS

**Goal**: Both domains live on Vercel with FTP retired and documented rollback
**Mode:** mvp
**Depends on**: Phase 8
**Requirements**: DEPLOY-02, DEPLOY-03, DEPLOY-04
**Success Criteria** (what must be TRUE):

  1. `vzhurudolu.cz` and `michalek.dev` serve from Vercel via staged DNS cutover (TTL reduced before switch)
  2. FTP deploy workflow removed after successful Vercel soak period
  3. Rollback path documented — revert DNS or redeploy previous Vercel build

**Plans**: 3 plans (executed — DNS cutover human_needed)

Plans:
**Wave 1**

- [x] 09-01 — Rollback runbook + 09-VERIFICATION.md (DEPLOY-02, DEPLOY-04)
- [x] 09-02 — verify-phase9-cutover.sh production smoke tests (DEPLOY-02)

**Wave 2** *(blocked on Wave 1 plan 01)*

- [x] 09-03 — Archive FTP workflow + disable auto-deploy (DEPLOY-03)

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4 → 5 → 6 → 7 → 8 → 9

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Monorepo Foundation & CI | 4/4 | Complete    | 2026-06-07 |
| 2. Shared Packages Extraction | 5/5 | Complete    | 2026-06-07 |
| 3. Czech Site Parity Verification | 4/4 | Complete   | 2026-06-07 |
| 4. Vercel Migration — Czech Site | 4/4 | Complete   | 2026-06-07 |
| 5. English App Scaffold | 5/5 | Complete   | 2026-06-08 |
| 6. Content Pairing & i18n SEO | 5/5 | Complete   | 2026-06-09 |
| 7. Content Adaptation — Pilot 8 + `/martin` | 6/6 | Complete   | 2026-06-09 |
| 8. Launch Polish — Legal, Feeds, Tags, Performance | 5/5 | Complete   | 2026-06-09 |
| 9. Production Cutover — michalek.dev + DNS | 3/3 | Executed — verification human_needed | 2026-06-09 |

---

## Milestone v1.1: Visual Polish (pre-launch)

**Goal:** Align visual layout on CS and EN sites before production DNS cutover.
**Blocks:** Phase 9 DNS until v1.1 verify passes.
**Preview URLs:** CS https://vd-web-2026.vercel.app/ · EN https://vd-web-2026-xco9.vercel.app/

### Phases (v1.1)

- [x] **Phase 10: CZ Nav & Homepage Restructure** - Header/footer nav, homepage podcast/YouTube/FrontKec layout *(executed — human_needed)*
- [x] **Phase 11: Shared Author Profile Box** - Brown inverse author box on both homepages
- [x] **Phase 12: EN Homepage CS Parity** - Featured article, author, stream, green topic hub
- [x] **Phase 13: Article Detail Language UX** - Inline language switch row; remove adaptation footer
- [x] **Phase 14: Pre-launch Verify & DNS Unblock** - Visual UAT both previews; resume Phase 9 cutover

### Phase 10: CZ Nav & Homepage Restructure

**Goal**: Czech site navigation and homepage match v1.1 layout spec
**Mode:** mvp
**Depends on**: v1.0 complete
**Requirements**: CZNAV-01, CZNAV-02, CZHOME-01, CZHOME-02
**Success Criteria** (what must be TRUE):

  1. Header nav shows only Články, Knihy, Autor
  2. Podcast and Video links appear in footer nav only
  3. Homepage no longer shows podcast/YouTube image blocks in old positions
  4. Full-width podcast section under e-books links to FrontKec with past-tense copy

**UI hint**: yes

### Phase 11: Shared Author Profile Box

**Goal**: Both homepages show modernized author profile box replacing ebook.cz promo
**Mode:** mvp
**Depends on**: Phase 10
**Requirements**: HOME-01, HOME-02, HOME-03
**Success Criteria** (what must be TRUE):

  1. CS and EN homepages show author box with heading **Martin Michálek.**, photo, one-sentence bio
  2. Link to `/martin` present (CS: „více o autorovi“, EN: „About Martin“)
  3. Box uses inverse brown background band consistent with VD styling

**UI hint**: yes

### Phase 12: EN Homepage CS Parity

**Goal**: English homepage layout matches Czech homepage structure
**Mode:** mvp
**Depends on**: Phase 11
**Requirements**: ENHOME-01, ENHOME-02, ENHOME-03, ENHOME-04, ENHOME-05
**Success Criteria** (what must be TRUE):

  1. Featured main article highlighted at top of EN homepage
  2. Author box in CS-equivalent position
  3. Unified article stream below featured/author section
  4. Green topic hub box with same topic buttons as CS
  5. EN „Start here“ section removed or replaced with CS-equivalent layout

**UI hint**: yes

### Phase 13: Article Detail Language UX

**Goal**: Article detail pages show inline language switch and no adaptation footer line
**Mode:** mvp
**Depends on**: Phase 12
**Requirements**: ART-01, ART-02
**Success Criteria** (what must be TRUE):

  1. Author and date on left, language switch on right — same row (CS + EN paired articles)
  2. „Text adapted from the Czech article.“ footer attribution removed from article detail

**UI hint**: yes

### Phase 14: Pre-launch Verify & DNS Unblock

**Goal**: Visual polish verified on both previews; Phase 9 DNS cutover unblocked
**Mode:** mvp
**Depends on**: Phase 13
**Requirements**: LAUNCH-01, LAUNCH-02, DEPLOY-02 (resume)
**Success Criteria** (what must be TRUE):

  1. UAT passes on CS and EN Vercel previews for all v1.1 layout changes
  2. Phase 9 cutover documentation updated — DNS no longer blocked
  3. Ready for human DNS cutover to production domains

**UI hint**: no

## Progress (v1.1)

**Execution Order:** 10 → 11 → 12 → 13 → 14 → (resume Phase 9 DNS)

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 10. CZ Nav & Homepage Restructure | 0/? | Not started | — |
| 11. Shared Author Profile Box | 0/? | Not started | — |
| 12. EN Homepage CS Parity | 0/? | Not started | — |
| 13. Article Detail Language UX | 0/? | Not started | — |
| 14. Pre-launch Verify & DNS Unblock | 0/? | Not started | — |
