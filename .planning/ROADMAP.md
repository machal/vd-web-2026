# Roadmap: Martin Michálek · Web & Performance

## Overview

Brownfield Astro monorepo migration and English personal brand launch. Czech site (`vzhurudolu.cz`) moves first — workspace structure, shared packages, parity verification, Vercel cutover — before the greenfield English app (`michalek.dev`) ships with 8 adapted articles, cross-domain language pairing, and simultaneous production deploy. Sequenced milestones avoid triple big-bang; pragmatic performance (good CWV, GA allowed) over Lighthouse perfection.

## Phases

- [x] **Phase 1: Monorepo Foundation & CI** - Workspace structure, Turborepo, Czech app relocation, draft filtering (completed 2026-06-07)
- [ ] **Phase 2: Shared Packages Extraction** - Parameterized markdown pipeline, Vite plugins, layouts, SEO helpers in packages *(execution complete — ready for verification)*
- [ ] **Phase 3: Czech Site Parity Verification** - Output parity vs production, public asset audit, link integrity
- [ ] **Phase 4: Vercel Migration — Czech Site** - Czech hosting cutover with `.htaccess` → `vercel.json` redirect port
- [ ] **Phase 5: English App Scaffold** - michalek.dev Astro app, homepage, nav, routing, dual Vercel project config
- [ ] **Phase 6: Content Pairing & i18n SEO** - CONTENT_PAIRS manifest, language switch, hreflang, Czech mirror links
- [ ] **Phase 7: Content Adaptation — Pilot 8 + `/martin`** - 8 adapted articles, native EN `/martin`, homepage "start here"
- [ ] **Phase 8: Launch Polish — Legal, Feeds, Tags, Performance** - SEO metadata, RSS/sitemap, tags, legal, CWV review, GA
- [ ] **Phase 9: Production Cutover — michalek.dev + DNS** - Staged DNS for both domains, FTP retirement, rollback docs

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

- [ ] 03-01-PLAN.md — Public asset audit + build timing (VD-05, D-09/D-10/D-12)
- [ ] 03-02-PLAN.md — verify-phase3-parity.sh skeleton + sitemap URL diff (VD-01, D-01/D-02)

**Wave 2** *(blocked on Wave 1 plan 02 completion)*

- [ ] 03-03-PLAN.md — linkinator internal links + production redirect samples (VD-01, D-05/D-06/D-07)

**Wave 3** *(blocked on Wave 2 completion + Plan 01 audit)*

- [ ] 03-04-PLAN.md — PR CI link check + 5-page spot-check + phase gate (VD-01, VD-05, D-08/D-15/D-16)

### Phase 4: Vercel Migration — Czech Site

**Goal**: Czech site serves from Vercel with ported redirects while FTP remains rollback path
**Mode:** mvp
**Depends on**: Phase 3
**Requirements**: VD-03
**Success Criteria** (what must be TRUE):

  1. Czech site preview on Vercel matches production URL behavior including legacy redirects from `.htaccess`
  2. Reader visiting `vzhurudolu.cz` URLs on Vercel preview gets same content and redirect chains as FTP production
  3. Security headers and trailing-slash policy match production expectations

**Plans**: TBD

### Phase 5: English App Scaffold

**Goal**: michalek.dev exists as lean English Astro app with core pages and dual-project Vercel config
**Mode:** mvp
**Depends on**: Phase 4
**Requirements**: EN-01, EN-02, EN-03, EN-04, EN-06, EN-07, EN-08, MONO-05, DEPLOY-01
**Success Criteria** (what must be TRUE):

  1. Visitor sees homepage with personal tech blog positioning, unified article stream (blog + guide), and CTA to `/martin`
  2. Site title reads **Martin Michálek · Web & Performance** — personal brand, not Vzhůru dolů
  3. Navigation shows **Articles** (→ `/`) and **Martin** (→ `/martin`); legal links in footer only
  4. Article URLs resolve at `/blog/{slug}` and `/guide/{slug}` with no separate listing pages
  5. Custom 404 page helps visitor navigate back to homepage
  6. PR CI builds both apps on every change; two Vercel projects configured from one repo with per-app Root Directory

**Plans**: TBD
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

**Plans**: TBD
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

**Plans**: TBD
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

**Plans**: TBD
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

**Plans**: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4 → 5 → 6 → 7 → 8 → 9

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Monorepo Foundation & CI | 4/4 | Complete    | 2026-06-07 |
| 2. Shared Packages Extraction | 4/5 | In Progress|  |
| 3. Czech Site Parity Verification | 0/4 | Not started | - |
| 4. Vercel Migration — Czech Site | 0/TBD | Not started | - |
| 5. English App Scaffold | 0/TBD | Not started | - |
| 6. Content Pairing & i18n SEO | 0/TBD | Not started | - |
| 7. Content Adaptation — Pilot 8 + `/martin` | 0/TBD | Not started | - |
| 8. Launch Polish — Legal, Feeds, Tags, Performance | 0/TBD | Not started | - |
| 9. Production Cutover — michalek.dev + DNS | 0/TBD | Not started | - |
