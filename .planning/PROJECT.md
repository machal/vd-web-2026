# Martin Michálek · Web & Performance (michalek.dev)

## What This Is

International personal brand site and technical blog at **michalek.dev**, transforming selected know-how from the Czech **Vzhůru dolů** (`vzhurudolu.cz`) into adapted English content — not a 1:1 mirror. The site positions Martin Michálek as a **Technical CEO & Web Performance Strategist** for global frontend developers, tech leads, and clients seeking deep expertise in Web Performance, Core Web Vitals, and modern frontend architecture.

Both sites live in one monorepo (`apps/vzhurudolu`, `apps/michalek-dev`, `packages/shared`), deploy together to **Vercel**, and share visual language and technical infrastructure while remaining separate brands and domains.

## Core Value

Articles and the `/martin` page must earn organic trust from the global tech community — shareable and technically credible. The site should still reflect Web Performance expertise (lean Astro SSG, sensible CWV), but Lighthouse 100/100 is a secondary aspiration, not a launch blocker — pragmatic use of analytics and other third-party scripts is acceptable.

## Current Milestone: v1.1 Visual Polish (pre-launch)

**Goal:** Align and polish visual layout on both Czech and English sites before production DNS cutover.

**Target features:**
- CZ nav restructure (Články, Knihy, Autor; Podcast+Video to footer)
- CZ homepage cleanup (podcast/YouTube images; FrontKec block under e-books)
- Shared author profile box on both homepages (inverse brown, replaces ebook.cz promo)
- EN homepage layout parity with CS (featured article, author box, stream, green topic hub)
- Article detail: language switch inline with author/date; remove adaptation footer line
- **Phase 9 DNS cutover blocked** until v1.1 passes verify

**Deferred to v1.2:** `/martin` page redesign

## Requirements

### Validated (v1.0)

- ✓ Monorepo, shared packages, CS parity, EN scaffold, content pairing, 8 pilot articles, legal/feeds/tags, cutover docs
- ✓ Both Vercel preview deploys live (CS + EN)

### Active (v1.1)

- [ ] CZ main nav: Články, Knihy, Autor only; Podcast+Video in footer
- [ ] CZ homepage: podcast/YouTube blocks repositioned; FrontKec link under e-books
- [ ] Both sites: author profile box on homepage (brown inverse band)
- [ ] EN homepage: CS-equivalent layout (featured article, author, stream, topic hub)
- [ ] Both sites: language switch row on article detail; no adaptation footer line
- [ ] Visual verify on both previews; then unblock Phase 9 DNS

### Out of Scope (v1.1)

- `/martin` page redesign — v1.2
- New color system / full rebrand — layout polish within existing VD CSS
- Phase 9 DNS until v1.1 verify passes

### Pending (v1.0 cutover)

- [ ] Production DNS cutover for both domains (Phase 9 — blocked by v1.1)

### Out of Scope (project)

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
| v1.1 blocks Phase 9 DNS | Visual polish must ship before production cutover | — Active |
| `/martin` redesign deferred v1.2 | Out of v1.1 visual scope | — Pending |

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
*Last updated: 2026-06-09 — milestone v1.1 Visual Polish (pre-launch) started*
