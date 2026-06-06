# Requirements: Martin Michálek · Web & Performance

**Defined:** 2026-06-06
**Core Value:** Articles and `/martin` earn organic global trust; the site reflects Web Perf expertise with pragmatic tradeoffs (GA/analytics OK; LH 100/100 is secondary).

## v1 Requirements

### Monorepo & Infrastructure

- [ ] **MONO-01**: Repository uses npm workspaces with `apps/vzhurudolu`, `apps/michalek-dev`, and `packages/*` shared packages
- [ ] **MONO-02**: Turborepo orchestrates builds with per-app filter commands for CI and Vercel
- [ ] **MONO-03**: Shared markdown pipeline, Vite plugins, layouts, and SEO helpers live in packages — no duplicated plugin code
- [ ] **MONO-04**: Each app declares its own `astro` and `@astrojs/*` dependencies (no root-only hoisting)
- [ ] **MONO-05**: PR CI builds both apps on every change to protected branch

### Czech Site (vzhurudolu.cz)

- [ ] **VD-01**: Czech site builds from `apps/vzhurudolu` with output parity to current production (URLs, redirects, content)
- [ ] **VD-02**: Draft/unpublished blog posts are excluded from production build output and sitemap
- [ ] **VD-03**: Czech site migrates from FTP to Vercel with `.htaccess` rules ported to `vercel.json`
- [ ] **VD-04**: Czech originals of 8 pilot articles link to English counterparts via language switch
- [ ] **VD-05**: `public/` asset strategy preserves production behavior without build timeouts (685 MB audit applied)

### English Site (michalek.dev)

- [ ] **EN-01**: English site builds from `apps/michalek-dev` as independent Astro 4 SSG app
- [ ] **EN-02**: Site title and branding: **Martin Michálek · Web & Performance** (personal brand, not Vzhůru dolů)
- [ ] **EN-03**: Homepage presents personal tech blog positioning with CTA to `/martin` and unified article stream (blog + guide chronologically, VD-style)
- [ ] **EN-04**: Article URLs: `/blog/{slug}` for blog posts, `/guide/{slug}` for adapted příručka — no separate `/blog/` or `/guide/` listing pages
- [ ] **EN-05**: `/martin` page includes bio, positioning, services, client logos, LinkedIn CTA, and prominent **pagespeed.one** promotion
- [ ] **EN-06**: English site avoids legacy bloat (no jQuery, no comment widgets); third-party scripts (e.g. GA) added pragmatically with deferred/async loading
- [ ] **EN-07**: Primary navigation: **Articles** (→ `/`) and **Martin** (→ `/martin`); legal links in footer only
- [ ] **EN-08**: Custom 404 page with helpful navigation back to homepage
- [ ] **EN-09**: Tag taxonomy with tag archive pages (`/{tag}/`) filtering the unified article stream — same pattern as VD `categories.ts`
- [ ] **EN-10**: Tags visible on article pages and usable for discovery (matching VD tag UX)

### Content Adaptation

- [ ] **CONT-01**: 5 guide articles adapted from příručka: `ai-saas`, `vibe-coding`, `email-inbox-zero`, `web-vitals`, `webp`
- [ ] **CONT-02**: 3 blog articles adapted: `261-rok-2025`, `254-ne`, `244-usetrite-utratite`
- [ ] **CONT-03**: Each adapted article has EN-specific title, description, and slug (not machine-translated metadata)
- [ ] **CONT-04**: Each adapted article includes author byline linking to `/martin`
- [ ] **CONT-05**: Adapted articles include honest attribution note (adapted from Czech original on Vzhůru dolů)
- [ ] **CONT-06**: `/martin` page content is written natively in English (not translated from Czech `/martin`)
- [ ] **CONT-07**: Homepage includes curated "start here" links to key pilot articles

### i18n & Language Pairing

- [ ] **I18N-01**: Central `CONTENT_PAIRS` manifest maps EN↔CS article pairs and `/martin` page pair
- [ ] **I18N-02**: `pairId` (or equivalent) in front matter links articles across domains
- [ ] **I18N-03**: Language switch component visible on all 8 paired articles and `/martin` (labels: "English" / "Česky")
- [ ] **I18N-04**: Build-time validator confirms bidirectional pairing reciprocity (no orphan pairs)
- [ ] **I18N-05**: hreflang tags (`en`, `cs`, `x-default` → EN) on paired pages only; absolute URLs
- [ ] **I18N-06**: Each page has self-referencing canonical URL (never cross-language canonical)
- [ ] **I18N-07**: No IP/browser auto-redirect by language

### SEO & Discovery

- [ ] **SEO-01**: Unique `<title>` and meta description per page from front matter
- [ ] **SEO-02**: Open Graph and Twitter Card metadata on all pages
- [ ] **SEO-03**: XML sitemap for michalek.dev submitted-ready on launch
- [ ] **SEO-04**: RSS feed at `/rss` aggregating unified blog + guide stream
- [ ] **SEO-05**: `robots.txt` references sitemap; all public pages crawlable
- [ ] **SEO-06**: `lang="en"` on all English pages
- [ ] **SEO-07**: Person + Article JSON-LD schema with `sameAs` (LinkedIn, pagespeed.one)

### Legal & Compliance

- [ ] **LEGAL-01**: English privacy policy page (GDPR-compliant; covers Vercel hosting)
- [ ] **LEGAL-02**: Cookie policy and consent notice covering analytics cookies (GA) per GDPR/ePrivacy
- [ ] **LEGAL-03**: Footer links to privacy and cookie pages

### Performance

- [ ] **PERF-01**: michalek.dev maintains good Core Web Vitals on mobile (healthy LCP, CLS, INP) — high Lighthouse scores are aspirational, not hard launch gates
- [ ] **PERF-02**: Third-party scripts (analytics, etc.) loaded async/deferred; no unnecessary widgets; performance impact reviewed before launch
- [ ] **PERF-03**: Images optimized via shared Sharp pipeline (WebP where applicable)
- [ ] **PERF-04**: Google Analytics (or equivalent) integrated without blocking critical rendering path

### Deploy & Operations

- [ ] **DEPLOY-01**: Two Vercel projects from one Git repo (Root Directory per app, monorepo settings enabled)
- [ ] **DEPLOY-02**: Both domains (`vzhurudolu.cz`, `michalek.dev`) cut over to Vercel with staged DNS (TTL reduced before switch)
- [ ] **DEPLOY-03**: FTP deploy workflow deprecated/removed after successful Vercel soak period
- [ ] **DEPLOY-04**: Rollback path documented (revert DNS or redeploy previous Vercel build)

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
| MONO-01 | Phase 1 | Pending |
| MONO-02 | Phase 1 | Pending |
| MONO-03 | Phase 2 | Pending |
| MONO-04 | Phase 1 | Pending |
| MONO-05 | Phase 5 | Pending |
| VD-01 | Phase 3 | Pending |
| VD-02 | Phase 1 | Pending |
| VD-03 | Phase 4 | Pending |
| VD-04 | Phase 6 | Pending |
| VD-05 | Phase 3 | Pending |
| EN-01 | Phase 5 | Pending |
| EN-02 | Phase 5 | Pending |
| EN-03 | Phase 5 | Pending |
| EN-04 | Phase 5 | Pending |
| EN-05 | Phase 7 | Pending |
| EN-06 | Phase 5 | Pending |
| EN-07 | Phase 5 | Pending |
| EN-08 | Phase 5 | Pending |
| EN-09 | Phase 8 | Pending |
| EN-10 | Phase 8 | Pending |
| CONT-01 | Phase 7 | Pending |
| CONT-02 | Phase 7 | Pending |
| CONT-03 | Phase 7 | Pending |
| CONT-04 | Phase 7 | Pending |
| CONT-05 | Phase 7 | Pending |
| CONT-06 | Phase 7 | Pending |
| CONT-07 | Phase 7 | Pending |
| I18N-01 | Phase 6 | Pending |
| I18N-02 | Phase 6 | Pending |
| I18N-03 | Phase 6 | Pending |
| I18N-04 | Phase 6 | Pending |
| I18N-05 | Phase 6 | Pending |
| I18N-06 | Phase 6 | Pending |
| I18N-07 | Phase 6 | Pending |
| SEO-01 | Phase 8 | Pending |
| SEO-02 | Phase 8 | Pending |
| SEO-03 | Phase 8 | Pending |
| SEO-04 | Phase 8 | Pending |
| SEO-05 | Phase 8 | Pending |
| SEO-06 | Phase 8 | Pending |
| SEO-07 | Phase 8 | Pending |
| LEGAL-01 | Phase 8 | Pending |
| LEGAL-02 | Phase 8 | Pending |
| LEGAL-03 | Phase 8 | Pending |
| PERF-01 | Phase 8 | Pending |
| PERF-02 | Phase 8 | Pending |
| PERF-03 | Phase 8 | Pending |
| PERF-04 | Phase 8 | Pending |
| DEPLOY-01 | Phase 5 | Pending |
| DEPLOY-02 | Phase 9 | Pending |
| DEPLOY-03 | Phase 9 | Pending |
| DEPLOY-04 | Phase 9 | Pending |

**Coverage:**
- v1 requirements: 52 total
- Mapped to phases: 52
- Unmapped: 0

---
*Requirements defined: 2026-06-06*
*Last updated: 2026-06-06 after nav/tags/v2 scope adjustment*
