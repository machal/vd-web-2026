# Martin Michálek · Web & Performance (michalek.blog)

## What This Is

International personal brand site and technical blog at **michalek.blog**, transforming selected know-how from the Czech **Vzhůru dolů** (`vzhurudolu.cz`) into adapted English content — not a 1:1 mirror. The site positions Martin Michálek as a **Technical CEO & Web Performance Strategist** for global frontend developers, tech leads, and clients seeking deep expertise in Web Performance, Core Web Vitals, and modern frontend architecture.

Both sites live in one monorepo (`apps/vzhurudolu`, `apps/michalek-dev`, `packages/shared`), deploy together to **Vercel**, and share visual language and technical infrastructure while remaining separate brands and domains.

## Core Value

Articles and the `/martin` page must earn organic trust from the global tech community — shareable and technically credible. The site should still reflect Web Performance expertise (lean Astro SSG, sensible CWV), but Lighthouse 100/100 is a secondary aspiration, not a launch blocker — pragmatic use of analytics and other third-party scripts is acceptable.

## Current Milestone: v1.1 complete (2026-06-20)

**Shipped:** Visual polish on both sites, production DNS cutover, both domains on Vercel.

**Next:** Merge `michalek-dev` → `master`; switch Vercel production branch to `master`.

**Deferred to v1.2:** `/martin` page redesign

## Requirements

### Validated (v1.0 + v1.1)

- ✓ Monorepo, shared packages, CS parity, EN scaffold, content pairing, pilot articles, legal/feeds/tags
- ✓ Both sites live on Vercel production (`www.vzhurudolu.cz`, `michalek.blog`)
- ✓ v1.1 visual polish (nav, homepage, author box, EN parity, article language UX)
- ✓ FTP auto-deploy retired; rollback documented

### Out of Scope

- Cookie consent banner — owner decision; GA loads async without interactive gate (2026-06-20)
- `/martin` redesign — v1.2
- Podcast on English site
- Courses, e-books, newsletter on michalek.blog
- 1:1 translation of all Czech content
- Lighthouse 100/100 as launch blocker

## Context

**Brownfield codebase:** Astro 4 SSG monorepo. Content in `src/content/`, shared infra in `packages/shared`.

**Branch:** Development on `michalek-dev`; target production branch `master` after merge.

**Production URLs:**

- CS: https://www.vzhurudolu.cz/
- EN: https://michalek.blog/

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Monorepo with `packages/shared` | Same visuals and infra; only content differs by locale/site | ✓ Shipped |
| Separate domain `michalek.blog` | Stronger international personal brand | ✓ Shipped |
| Vercel for both sites | End FTP uploads; modern CI/CD | ✓ Shipped |
| Pragmatic performance over LH 100/100 | GA and useful third-party scripts OK | ✓ Active |
| No cookie consent banner | Owner preference; async GA + policy pages sufficient | ✓ 2026-06-20 |
| `/martin` redesign deferred v1.2 | Out of v1.1 visual scope | Pending v1.2 |

---
*Last updated: 2026-06-20 — milestone v1.1 closed*
