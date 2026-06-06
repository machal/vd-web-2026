# Martin Michálek · Web & Performance (michalek.dev)

## What This Is

International personal brand site and technical blog at **michalek.dev**, transforming selected know-how from the Czech **Vzhůru dolů** (`vzhurudolu.cz`) into adapted English content — not a 1:1 mirror. The site positions Martin Michálek as a **Technical CEO & Web Performance Strategist** for global frontend developers, tech leads, and clients seeking deep expertise in Web Performance, Core Web Vitals, and modern frontend architecture.

Both sites live in one monorepo (`apps/vzhurudolu`, `apps/michalek-dev`, `packages/shared`), deploy together to **Vercel**, and share visual language and technical infrastructure while remaining separate brands and domains.

## Core Value

Articles and the `/martin` page must earn organic trust from the global tech community — shareable and technically credible. The site should still reflect Web Performance expertise (lean Astro SSG, sensible CWV), but Lighthouse 100/100 is a secondary aspiration, not a launch blocker — pragmatic use of analytics and other third-party scripts is acceptable.

## Requirements

### Validated

- ✓ Astro 4 static site generation with content collections (blog, podcast, prirucka) — existing
- ✓ Markdown pipeline with remark/rehype plugins, Zod front matter schemas — existing
- ✓ File-based routing, layouts, shared components — existing
- ✓ Custom sitemap, RSS feed, build-time validation — existing
- ✓ Czech content at scale (blog, příručka, podcast) — existing
- ✓ GitHub Actions → FTP deploy for vzhurudolu.cz — existing (to be replaced)

### Active

- [ ] Monorepo structure: `apps/vzhurudolu`, `apps/michalek-dev`, `packages/shared`
- [ ] English site on `michalek.dev` with personal tech blog homepage
- [ ] Unified article stream on homepage (blog + guide, VD-style); article URLs at `/blog/` and `/guide/`; nav: Articles + Martin
- [ ] Tag taxonomy and tag archive pages (VD-style categories)
- [ ] `/martin` page: bio, positioning, services, client logos, LinkedIn CTA, prominent **pagespeed.one** promotion
- [ ] 8 pilot articles adapted to English (AI draft in Cursor + manual edit):
  - Guide: `ai-saas`, `vibe-coding`, `email-inbox-zero`, `web-vitals`, `webp`
  - Blog: `261-rok-2025`, `254-ne`, `244-usetrite-utratite`
- [ ] Full language switch linking EN articles to Czech originals (and vice versa where applicable)
- [ ] Site title: **Martin Michálek · Web & Performance**
- [ ] Legal/technical minimum: privacy policy, cookies (GDPR), RSS, sitemap
- [ ] Migrate **both** sites from FTP to Vercel (simultaneous)
- [ ] Strong performance posture (good CWV, lean stack); GA/analytics allowed with pragmatic tradeoffs

### Out of Scope

- Podcast on English site — Czech-only for now
- Courses (kurzy), e-books, newsletter/Mailchimp on michalek.dev — deferred; LinkedIn CTA only for MVP
- 1:1 translation of all Czech content — selective adaptation only
- `/en/` path or subdomain on vzhurudolu.cz — separate domain by design
- Existing single-page michalek.dev profile — discarded, replaced by full site
- Mirror of příručka ebook structures or category TOCs — guide articles only

## Context

**Brownfield codebase:** Astro 4 SSG monolith at repo root. Content in `src/content/`, pages in `src/pages/`, shared markdown transforms in `src/utils/`. Codebase map in `.planning/codebase/`.

**Content workflow:** AI-assisted translation/adaptation in Cursor, then human editorial pass for global audience (examples, metrics, cultural context).

**Pilot content rationale:** Mix of evergreen technical guides (CWV, WebP, productivity/AI essays) and blog posts with shareable narrative — chosen by project owner.

**Business signal:** `/martin` + pagespeed.one as primary conversion path; organic reach (X, HN, industry publications) as success metric, not paid traffic.

**Branch:** Development on `michalek-dev`.

## Constraints

- **Tech**: Stay on Astro 4 SSG; monorepo with shared packages — avoid rewrite to different framework
- **Performance**: Site should exemplify Web Perf consulting — lean Astro SSG, good CWV; third-party scripts (GA, etc.) pragmatically, not dogmatically avoided
- **Brand**: michalek.dev is personal brand (Martin Michálek), not "Vzhůru dolů in English"
- **Deploy**: No FTP for production going forward — Vercel (or equivalent recommended in research)
- **Content**: Adaptation, not literal translation — editorial quality over automation
- **Compatibility**: Czech site must keep working through monorepo migration and Vercel cutover

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Monorepo with `packages/shared` | Same visuals and infra; only content differs by locale/site | — Pending |
| Separate domain `michalek.dev` | Stronger international personal brand vs. `/en/` on Czech site | — Pending |
| Unified stream + `/blog/`/`/guide/` article URLs | VD-style listing; type visible in URL only | — Pending |
| Tags in v1 | Same discovery pattern as VD categories | — Pending |
| MVP: 8 adapted articles + homepage + `/martin` | Enough depth for credible launch without boiling the ocean | — Pending |
| Vercel for both sites simultaneously | End FTP uploads; modern CI/CD for monorepo | — Pending |
| AI + manual content adaptation | Speed of draft, quality of human editorial | — Pending |
| Full language switch on translated pairs | Readers can find Czech/EN counterpart | — Pending |
| LinkedIn CTA, no EN newsletter in MVP | Simple contact path; Mailchimp deferred | — Pending |
| Promote pagespeed.one on `/martin` | Primary business funnel for consulting | — Pending |
| Pragmatic performance over LH 100/100 | GA and useful third-party scripts OK; CWV matter more than perfect scores | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-06-06 after initialization*
