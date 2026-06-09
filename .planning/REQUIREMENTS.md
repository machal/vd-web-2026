# Requirements: Martin Michálek · Web & Performance

**Defined:** 2026-06-06
**Core Value:** Articles and `/martin` earn organic global trust; the site reflects Web Perf expertise with pragmatic tradeoffs (GA/analytics OK; LH 100/100 is secondary).

## v1 Requirements

### Monorepo & Infrastructure

- [x] **MONO-01**: Repository uses npm workspaces with `apps/vzhurudolu`, `apps/michalek-dev`, and `packages/*` shared packages
- [x] **MONO-02**: Turborepo orchestrates builds with per-app filter commands for CI and Vercel
- [x] **MONO-03**: Shared markdown pipeline, Vite plugins, layouts, and SEO helpers live in packages — no duplicated plugin code
- [x] **MONO-04**: Each app declares its own `astro` and `@astrojs/*` dependencies (no root-only hoisting)
- [x] **MONO-05**: PR CI builds both apps on every change to protected branch

### Czech Site (vzhurudolu.cz)

- [x] **VD-01**: Czech site builds from `apps/vzhurudolu` with output parity to current production (URLs, redirects, content)
- [x] **VD-02**: Draft/unpublished blog posts are excluded from production build output and sitemap
- [ ] **VD-03**: Czech site migrates from FTP to Vercel with `.htaccess` rules ported to `vercel.json`
- [x] **VD-04**: Czech originals of 8 pilot articles link to English counterparts via language switch
- [x] **VD-05**: `public/` asset strategy preserves production behavior without build timeouts (685 MB audit applied)

### English Site (michalek.dev)

- [x] **EN-01**: English site builds from `apps/michalek-dev` as independent Astro 4 SSG app
- [x] **EN-02**: Site title and branding: **Martin Michálek · Web & Performance** (personal brand, not Vzhůru dolů)
- [x] **EN-03**: Homepage presents personal tech blog positioning with CTA to `/martin` and unified article stream (blog + guide chronologically, VD-style)
- [x] **EN-04**: Article URLs: `/blog/{slug}` for blog posts, `/guide/{slug}` for adapted příručka — no separate `/blog/` or `/guide/` listing pages
- [x] **EN-05**: `/martin` page includes bio, positioning, services, client logos, LinkedIn CTA, and prominent **pagespeed.one** promotion
- [x] **EN-06**: English site avoids legacy bloat (no jQuery, no comment widgets); third-party scripts (e.g. GA) added pragmatically with deferred/async loading
- [x] **EN-07**: Primary navigation: **Articles** (→ `/`) and **Martin** (→ `/martin`); legal links in footer only
- [x] **EN-08**: Custom 404 page with helpful navigation back to homepage
- [x] **EN-09**: Tag taxonomy with tag archive pages (`/{tag}/`) filtering the unified article stream — same pattern as VD `categories.ts`
- [x] **EN-10**: Tags visible on article pages and usable for discovery (matching VD tag UX)

### Content Adaptation

- [x] **CONT-01**: 5 guide articles adapted from příručka: `ai-saas`, `vibe-coding`, `email-inbox-zero`, `web-vitals`, `webp`
- [x] **CONT-02**: 3 blog articles adapted: `261-rok-2025`, `254-ne`, `244-usetrite-utratite`
- [x] **CONT-03**: Each adapted article has EN-specific title, description, and slug (not machine-translated metadata)
- [x] **CONT-04**: Each adapted article includes author byline linking to `/martin`
- [x] **CONT-05**: Adapted articles include honest attribution note (adapted from Czech original on Vzhůru dolů)
- [x] **CONT-06**: `/martin` page content is written natively in English (not translated from Czech `/martin`)
- [x] **CONT-07**: Homepage includes curated "start here" links to key pilot articles

### i18n & Language Pairing

- [x] **I18N-01**: Central `CONTENT_PAIRS` manifest maps EN↔CS article pairs and `/martin` page pair
- [x] **I18N-02**: `pairId` (or equivalent) in front matter links articles across domains
- [x] **I18N-03**: Language switch component visible on all 8 paired articles and `/martin` (labels: "English" / "Česky")
- [x] **I18N-04**: Build-time validator confirms bidirectional pairing reciprocity (no orphan pairs)
- [x] **I18N-05**: hreflang tags (`en`, `cs`, `x-default` → EN) on paired pages only; absolute URLs
- [x] **I18N-06**: Each page has self-referencing canonical URL (never cross-language canonical)
- [x] **I18N-07**: No IP/browser auto-redirect by language

### SEO & Discovery

- [x] **SEO-01**: Unique `<title>` and meta description per page from front matter
- [x] **SEO-02**: Open Graph and Twitter Card metadata on all pages
- [x] **SEO-03**: XML sitemap for michalek.dev submitted-ready on launch
- [x] **SEO-04**: RSS feed at `/rss` aggregating unified blog + guide stream
- [x] **SEO-05**: `robots.txt` references sitemap; all public pages crawlable
- [x] **SEO-06**: `lang="en"` on all English pages
- [x] **SEO-07**: Person + Article JSON-LD schema with `sameAs` (LinkedIn, pagespeed.one)

### Legal & Compliance

- [x] **LEGAL-01**: English privacy policy page (GDPR-compliant; covers Vercel hosting)
- [x] **LEGAL-02**: Cookie policy and consent notice covering analytics cookies (GA) per GDPR/ePrivacy
- [x] **LEGAL-03**: Footer links to privacy and cookie pages

### Performance

- [ ] **PERF-01**: michalek.dev maintains good Core Web Vitals on mobile (healthy LCP, CLS, INP) — high Lighthouse scores are aspirational, not hard launch gates
- [x] **PERF-02**: Third-party scripts (analytics, etc.) loaded async/deferred; no unnecessary widgets; performance impact reviewed before launch
- [x] **PERF-03**: Images optimized via shared Sharp pipeline (WebP where applicable)
- [x] **PERF-04**: Google Analytics (or equivalent) integrated without blocking critical rendering path

### Deploy & Operations

- [ ] **DEPLOY-01**: Two Vercel projects from one Git repo (Root Directory per app, monorepo settings enabled) — EN config ready; dashboard connect human_needed
- [ ] **DEPLOY-02**: Both domains (`vzhurudolu.cz`, `michalek.dev`) cut over to Vercel with staged DNS (TTL reduced before switch)
- [x] **DEPLOY-03**: FTP deploy workflow deprecated/removed after successful Vercel soak period — auto-deploy disabled Phase 9; manual rollback preserved; delete secrets after soak
- [x] **DEPLOY-04**: Rollback path documented (revert DNS or redeploy previous Vercel build)

## v2 Requirements

Deferred to future release.

### Content Expansion

- **CONT-V2-01**: Expand to ~dozens of adapted/translated articles from Czech originals (beyond initial 8 pilots)
- **LINK-V2-01**: Cross-links and content integration from existing English CSS site **css-mine.com**

## Out of Scope

| Feature | Reason |
|---------|--------|
| 1:1 mirror of Czech content | Selective adaptation only; unbounded scope |
| `/en/` on vzhurudolu.cz | Separate domain decision for personal brand |
| Podcast on EN site | Czech-only; huge localization scope |
| Newsletter/Mailchimp on MVP | LinkedIn CTA sufficient; GDPR + JS weight |
| Courses, e-books, kurzy on EN | Czech commercial products; no EN storefront |
| Full příručka mirror / ebook TOCs | Hundreds of pages; guide articles only |
| Comment systems | Moderation burden; deferred for MVP |
| Lighthouse 100/100 as launch blocker | Pragmatic tradeoffs preferred; CWV matter more than perfect scores |
| Auto language redirect | Blocks Googlebot; explicit switcher only |
| Machine translation widgets | Destroys expert positioning |
| Astro 5/6 upgrade during MVP | Risk during monorepo migration |
| Headless CMS | Content stays in Markdown git workflow |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| MONO-01 | Phase 1 | Complete |
| MONO-02 | Phase 1 | Complete |
| MONO-03 | Phase 2 | Complete |
| MONO-04 | Phase 1 | Complete |
| MONO-05 | Phase 5 | Complete |
| VD-01 | Phase 3 | Complete |
| VD-02 | Phase 1 | Complete |
| VD-03 | Phase 4 | Pending |
| VD-04 | Phase 6 | Complete |
| VD-05 | Phase 3 | Complete |
| EN-01 | Phase 5 | Complete |
| EN-02 | Phase 5 | Complete |
| EN-03 | Phase 5 | Complete |
| EN-04 | Phase 5 | Complete |
| EN-05 | Phase 5 | Complete |
| EN-06 | Phase 5 | Complete |
| EN-07 | Phase 5 | Complete |
| EN-08 | Phase 5 | Complete |
| EN-09 | Phase 8 | Complete |
| EN-10 | Phase 8 | Complete |
| CONT-01 | Phase 7 | Complete |
| CONT-02 | Phase 7 | Complete |
| CONT-03 | Phase 7 | Complete |
| CONT-04 | Phase 7 | Complete |
| CONT-05 | Phase 7 | Complete |
| CONT-06 | Phase 7 | Complete |
| CONT-07 | Phase 7 | Complete |
| I18N-01 | Phase 6 | Complete |
| I18N-02 | Phase 6 | Complete |
| I18N-03 | Phase 6 | Complete |
| I18N-04 | Phase 6 | Complete |
| I18N-05 | Phase 6 | Complete |
| I18N-06 | Phase 6 | Complete |
| I18N-07 | Phase 6 | Complete |
| SEO-01 | Phase 8 | Complete |
| SEO-02 | Phase 8 | Complete |
| SEO-03 | Phase 8 | Complete |
| SEO-04 | Phase 8 | Complete |
| SEO-05 | Phase 8 | Complete |
| SEO-06 | Phase 8 | Complete |
| SEO-07 | Phase 8 | Complete |
| LEGAL-01 | Phase 8 | Complete |
| LEGAL-02 | Phase 8 | Complete |
| LEGAL-03 | Phase 8 | Complete |
| PERF-01 | Phase 8 | Pending |
| PERF-02 | Phase 8 | Complete |
| PERF-03 | Phase 8 | Complete |
| PERF-04 | Phase 8 | Complete |
| DEPLOY-01 | Phase 5 | Partial (EN dashboard human_needed) |
| DEPLOY-02 | Phase 9 | Pending (human DNS cutover — see 09-VERIFICATION.md) |
| DEPLOY-03 | Phase 9 | Complete (auto-deploy off; archived workflow) |
| DEPLOY-04 | Phase 9 | Complete |

**Coverage:**

- v1 requirements: 52 total
- Mapped to phases: 52
- Unmapped: 0

---

## v1.1 Requirements — Visual Polish (pre-launch)

**Defined:** 2026-06-09
**Blocks:** Phase 9 DNS cutover until v1.1 verify passes

### Czech Navigation

- [ ] **CZNAV-01**: Main navigation shows only **Články**, **Knihy**, and **Autor**
- [ ] **CZNAV-02**: **Podcast** and **Video** appear in footer navigation only (not header)

### Czech Homepage

- [ ] **CZHOME-01**: Podcast and YouTube channel image blocks removed from current homepage positions
- [ ] **CZHOME-02**: Full-width podcast section placed under e-books with past-tense copy and link to **FrontKec**

### Shared Homepage Author Box

- [x] **HOME-01**: Author profile box replaces ebook.cz promo area on both CS and EN homepages
- [x] **HOME-02**: Author box shows heading **Martin Michálek.**, portrait photo, one-sentence bio, and link to `/martin`
- [x] **HOME-03**: Author box uses inverse brown background band (existing VD styling)

### English Homepage Parity

- [x] **ENHOME-01**: EN homepage shows featured main article at top (CS layout pattern)
- [x] **ENHOME-02**: Author box positioned in CS-equivalent layout (beside/adjacent to featured article)
- [x] **ENHOME-03**: Full unified article stream below featured/author section
- [x] **ENHOME-04**: Green topic hub box with same topic buttons as CS homepage
- [x] **ENHOME-05**: EN-specific “Start here” section removed or replaced with CS-equivalent structure

### Article Detail UX

- [x] **ART-01**: Language switch on same row as author and date — author/date left, switch right (CS + EN)
- [x] **ART-02**: Footer line “Text adapted from the Czech article.” removed from article detail pages

### Pre-launch Gate

- [x] **LAUNCH-01**: Visual polish verified on both Vercel previews (CS + EN) via UAT
- [x] **LAUNCH-02**: Phase 9 production DNS cutover resumes only after LAUNCH-01 passes

## v1.2 Requirements

Deferred to future release.

### About Page

- **MARTIN-V2-01**: Redesign `/martin` page (CS and EN)

## Out of Scope (v1.1)

| Feature | Reason |
|---------|--------|
| `/martin` page redesign | Explicitly deferred to v1.2 |
| Full rebrand / new color system | Layout polish within existing VD CSS only |
| Phase 9 DNS cutover | Blocked until v1.1 LAUNCH-01 passes |
| New content or i18n pairs | Content scope closed in v1.0 |

## Traceability (v1.1)

| Requirement | Phase | Status |
|-------------|-------|--------|
| CZNAV-01 | Phase 10 | Pending |
| CZNAV-02 | Phase 10 | Pending |
| CZHOME-01 | Phase 10 | Pending |
| CZHOME-02 | Phase 10 | Pending |
| HOME-01 | Phase 11 | Complete |
| HOME-02 | Phase 11 | Complete |
| HOME-03 | Phase 11 | Complete |
| ENHOME-01 | Phase 12 | Complete |
| ENHOME-02 | Phase 12 | Complete |
| ENHOME-03 | Phase 12 | Complete |
| ENHOME-04 | Phase 12 | Complete |
| ENHOME-05 | Phase 12 | Complete |
| ART-01 | Phase 13 | Complete |
| ART-02 | Phase 13 | Complete |
| LAUNCH-01 | Phase 14 | Complete |
| LAUNCH-02 | Phase 14 | Complete |

**Coverage (v1.1):**

- v1.1 requirements: 16 total
- Mapped to phases: 16
- Unmapped: 0

---
*Requirements defined: 2026-06-06*
*Last updated: 2026-06-09 — milestone v1.1 Visual Polish requirements added*
