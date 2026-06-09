# Phase 5: English App Scaffold - Context

**Gathered:** 2026-06-09
**Status:** Ready for planning

<domain>
## Phase Boundary

michalek.dev exists as a lean English Astro app with core pages, routing, and dual-project Vercel/CI config. Delivers homepage with unified article stream, full `/martin` page, article URLs at `/blog/{slug}` and `/guide/{slug}`, custom 404, and per-app `site.config.ts`. Uses `@vd/shared` from Phase 2 with `/guide` content path prefix.

**In scope (user-expanded):** Full `/martin` page with bio, positioning, services, client logos, LinkedIn CTA, and pagespeed.one promotion — pulls EN-05 forward from Phase 7.

**Out of scope:** 8 pilot adapted articles (Phase 7), language switch / hreflang (Phase 6), full legal copy (Phase 8), tags (Phase 8), DNS cutover (Phase 9).

</domain>

<decisions>
## Implementation Decisions

### Homepage Layout & Article Stream
- Short hero above stream — name, tagline ("Web & Performance"), one-line positioning, CTA button to `/martin`
- Article stream sorted newest-first by `date`, blog + guide merged chronologically (VD-style unified stream)
- 2–3 stub articles (1 blog + 1–2 guide) with minimal front matter for route/stream rendering; real pilot content in Phase 7
- Reuse `ArticleListItem` from `@vd/shared` — title, date, excerpt, type badge (Blog/Guide)

### Visual Identity & Branding
- Reuse VD legacy CSS from `@vd/shared/static` — same visual language, different branding text
- Text-based site title in header — "Martin Michálek" wordmark, no VD hammer/anvil symbol; subtitle "Web & Performance" in meta/title
- Same VD color palette (orange accent, dark text, white background) — brand separation via copy/nav, not new colors
- **Full `/martin` page in Phase 5** — bio, positioning, services, client logos, LinkedIn CTA, pagespeed.one promotion (EN-05 pulled forward)

### Navigation, Footer & 404
- Primary nav: **Articles** (→ `/`) and **Martin** (→ `/martin`) only — no Podcast, E-books, Courses
- Footer legal links as placeholder routes — `/privacy` and `/cookies` stub pages with "Coming soon"; full legal copy in Phase 8
- Custom 404 — "Page not found", link to homepage, link to `/martin`; shared layout + VD styling
- No language switch in Phase 5 — component slot reserved in article layout; wired in Phase 6

### App Scaffold & Monorepo Integration
- Clone CS app skeleton from `apps/vzhurudolu` — strip CS-only routes (podcast, prirucka, kurzy), wire `@vd/shared` with `/guide` prefix
- `blog` + `guide` content collections with Zod schemas extending shared base; no `podcast`
- Dual Vercel + CI scaffold — `apps/michalek-dev/vercel.json`, update `pr-build.yml` for both apps, `MONO-05` verify script; dashboard connect deferred (human gate)
- Per-app `site.config.ts` — `siteName`, `locale: 'en'`, nav items, `siteUrl: 'https://michalek.dev'` passed as props to shared layouts

### Claude's Discretion
- Exact stub article slugs and front matter fields
- `/martin` page layout structure and section ordering
- `exports` map additions to `@vd/shared` if EN-specific components needed
- Verify script naming and assertion set for MONO-05

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- `packages/shared/` — `BaseLayout`, `Header`, `Footer`, `ArticleHeader`, `ArticleFooter`, `Navigation`, `createMarkdownConfig`, Vite plugins, `custom-sitemap`
- `apps/vzhurudolu/` — proven Astro 4 app structure, `astro.config.mjs`, page patterns for blog/prirucka routes
- `apps/michalek-dev/package.json` — stub package `@vd/michalek-dev` already in workspace
- `apps/vzhurudolu/vercel.json` — reference for EN app Vercel config

### Established Patterns
- `@vd/shared` source exports + `vite.ssr.noExternal: ['@vd/shared']` per app
- `createMarkdownConfig({ contentPathPrefix: '/guide' })` factory from Phase 2 (D-06/D-07)
- Shell verify gates (`verify-phase1-build.sh`, `verify-phase2-extraction.sh`, etc.)
- Turbo monorepo: `npm run build:vzhurudolu` — extend to `build:michalek-dev`
- Per-app `site.config.ts` injection into shared layouts (research ARCHITECTURE.md)

### Integration Points
- Root `package.json` workspaces — add build script for michalek-dev
- `.github/workflows/pr-build.yml` — dual-app CI
- Vercel project 2 root: `apps/michalek-dev`
- EN routes: `src/pages/index.astro`, `blog/[slug].astro`, `guide/[slug].astro`, `martin.astro`, `404.astro`

</code_context>

<specifics>
## Specific Ideas

- User explicitly requested full `/martin` page in Phase 5 (not placeholder) — EN-05 scope pulled forward
- Personal brand: site title **Martin Michálek · Web & Performance**, not Vzhůru dolů
- Lean EN site — no jQuery, no comment widgets (EN-06)

</specifics>

<deferred>
## Deferred Ideas

- 8 pilot adapted articles — Phase 7 (CONT-01 through CONT-07)
- Language switch component — Phase 6 (I18N-03)
- Full privacy/cookies legal copy — Phase 8 (LEGAL-01, LEGAL-02)
- Tag taxonomy and archive pages — Phase 8 (EN-09)
- Vercel dashboard connect for michalek.dev — human gate (document in VERIFICATION.md)
- Homepage "start here" curated links to pilot articles — Phase 7

</deferred>
