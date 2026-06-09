# Phase 8: Launch Polish — Legal, Feeds, Tags, Performance - Context

**Gathered:** 2026-06-09
**Status:** Ready for planning
**Mode:** Smart discuss — recommended defaults (autonomous continue)

<domain>
## Phase Boundary

michalek.dev launch-ready: SEO metadata on all pages, RSS + sitemap, JSON-LD, tag taxonomy + archive pages, privacy/cookie legal pages, pragmatic CWV + deferred GA. Polish pass — no new pilot content.

</domain>

<decisions>
## Implementation Decisions

### SEO & Metadata
- Unique title, meta description, OG, Twitter Card on every public page via BaseLayout props
- `lang="en"` on `<html>` (already set; verify all templates)
- Person + Article JSON-LD with `sameAs` for LinkedIn and pagespeed.one
- Canonical + hreflang from Phase 6 — extend only for tag pages

### Feeds & Discovery
- RSS at `/rss` aggregating blog + guide unified stream (newest first)
- XML sitemap via `createCustomSitemap` factory from @vd/shared — blog + guide + tags + static pages
- `robots.txt` references sitemap URL

### Tags
- Reuse VD `categories.ts` pattern adapted for EN — tag slugs as `/{tag}/` archive pages filtering unified stream
- Tags in front matter on pilot articles; visible on article detail pages
- EN tag labels in English (not Czech category names)

### Legal & Compliance
- Full privacy policy page (GDPR, Vercel hosting, analytics) — replace Phase 5 stub
- Cookie consent banner (lightweight, no jQuery) — covers GA when enabled
- Footer links to `/privacy` and `/cookies` with real content

### Performance & Analytics
- GA4 async/deferred load — pragmatic per PROJECT.md (not blocking render)
- CWV review: ensure no render-blocking scripts; lazy images where applicable
- Lighthouse aspirational not gate — good mobile LCP/CLS/INP target

### Claude's Discretion
- Cookie banner implementation (minimal custom vs lightweight lib)
- Tag list derivation (manual EN tags file vs from front matter aggregation)
- GA measurement ID via env var

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- `packages/shared/seo/custom-sitemap.ts` — CS uses this; extend for EN
- CS `apps/vzhurudolu/src/pages/rss.ts`, `robots.txt`, `[category].astro` — patterns to adapt
- CS legal pages `osobni-udaje.astro`, cookie handling — structure reference only (EN native copy)
- Phase 5 legal stubs at `/privacy`, `/cookies` — replace content

### Established Patterns
- site.config.ts per app
- BaseLayout meta injection
- verify scripts per phase

### Integration Points
- `apps/michalek-dev/src/pages/rss.ts`, `sitemap` integration
- Tag archive route `[tag].astro` or equivalent
- EN content front matter `tags` field

</code_context>

<specifics>
## Specific Ideas

- Pragmatic GA OK per core value — defer/async loading required
- Tags in v1 per PROJECT.md key decision

</specifics>

<deferred>
## Deferred Ideas

- Newsletter/Mailchimp
- Podcast RSS
- css-mine cross-links

</deferred>
