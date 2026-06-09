# Phase 6: Content Pairing & i18n SEO - Context

**Gathered:** 2026-06-09
**Status:** Ready for planning
**Mode:** Smart discuss — recommended defaults accepted (autonomous continue)

<domain>
## Phase Boundary

Cross-domain language pairing works bidirectionally on all paired content. Delivers `CONTENT_PAIRS` manifest, `LanguageSwitch` component, hreflang/canonical SEO helpers, build-time pairing validator, and Czech-side switch wiring. Does NOT adapt article content (Phase 7) — manifest uses finalized pilot slugs from PROJECT.md with EN stubs where content not yet published.

</domain>

<decisions>
## Implementation Decisions

### Pairing Manifest & Data Model
- Central manifest at `packages/shared/content-pairing/pairs.ts` — single source of truth per ARCHITECTURE.md research
- `pairId` optional in front matter for editor discoverability; build validator cross-checks manifest ↔ front matter when both present
- All 8 pilot pairs + `/martin` page pair defined in manifest now with finalized EN slugs from PROJECT.md (EN content arrives Phase 7)
- Validator: **fail build** on orphan/non-reciprocal pairs; **warn** (not fail) if EN side content file missing until Phase 7 publishes

### Language Switch UI
- Shared `LanguageSwitch` component in `@vd/shared/components` — accepts `siteConfig`, `alternateUrl`, `currentLocale`
- Placement: article header area (below title/meta), same position on CS and EN article pages and `/martin`
- Labels: **"English"** / **"Česky"** (native script names per I18N-03) — current language shown as plain text, other as link
- Visible only on paired pages (manifest match); hidden on unpaired content

### hreflang & Canonical SEO
- hreflang on paired pages only: `en`, `cs`, `x-default` → EN URL (absolute) per I18N-05
- Self-referencing canonical on every page — never cross-language canonical per I18N-06
- SEO helpers in `packages/shared/seo/` — `buildAlternateLinks()`, injected via `BaseLayout` when alternate exists
- CS origin: `https://www.vzhurudolu.cz`; EN origin: `https://michalek.dev`

### Build Validation & Czech Integration
- Build validator in `packages/shared/content-pairing/validate.ts` — runs in both apps' build via Astro integration or verify script
- Wire `LanguageSwitch` + hreflang into CS `apps/vzhurudolu` article layouts for 8 pilot prirucka/blog pages + `/martin`
- Wire into EN `apps/michalek-dev` article layouts + `/martin` (stub articles get switch pointing to CS)
- No IP/browser language auto-redirect — explicit switcher only per I18N-07

### Claude's Discretion
- Exact validator integration point (Astro integration vs pre-build script)
- LanguageSwitch visual styling (reuse VD utility classes)
- Whether `pairId` Zod field added to both collection schemas in this phase or validator-only

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- `packages/shared/layouts/BaseLayout.astro` — inject hreflang/canonical in `<head>`
- `packages/shared/components/ArticleHeader.astro` — language switch placement candidate
- `apps/michalek-dev/` + `apps/vzhurudolu/` — both apps with site.config.ts from Phase 5
- Research: `.planning/research/ARCHITECTURE.md` — full pairing schema, URL resolver, validator spec

### Established Patterns
- `@vd/shared` source exports, per-app siteConfig injection
- Shell verify gates per phase (`verify-phase5-english-scaffold.sh` model)
- Zod content collection schemas per app

### Integration Points
- `packages/shared/content-pairing/` — new module (pairs.ts, resolve.ts, validate.ts)
- `packages/shared/seo/` — extend with hreflang helpers
- CS pages: `blog/[slug].astro`, `prirucka/[slug].astro`, `martin.astro`
- EN pages: `blog/[slug].astro`, `guide/[slug].astro`, `martin.astro`

</code_context>

<specifics>
## Specific Ideas

- Pilot pair slugs from PROJECT.md: guide (`ai-saas`, `vibe-coding`, `email-inbox-zero`, `web-vitals`, `webp`), blog (`261-rok-2025`, `254-ne`, `244-usetrite-utratite`), `/martin`
- EN blog slug for `261-rok-2025` may differ (e.g. `2025-year-in-review`) — manifest encodes actual keys per side

</specifics>

<deferred>
## Deferred Ideas

- Full EN adapted article content — Phase 7
- hreflang on unpaired CS-only content (podcast, kurzy) — out of scope
- Auto language detection / geo redirect — explicitly rejected

</deferred>
