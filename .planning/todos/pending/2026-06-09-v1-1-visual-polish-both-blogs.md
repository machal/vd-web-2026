---
created: 2026-06-09T06:58:39.407Z
title: v1.1 visual polish both blogs
area: ui
milestone: v1.1
blocks: phase-9-dns-cutover
resolves_phase: 10
files:
  - apps/vzhurudolu/src/pages/index.astro
  - apps/vzhurudolu/src/site.config.ts
  - apps/michalek-dev/src/pages/index.astro
  - apps/michalek-dev/src/site.config.ts
  - packages/shared/components/Header.astro
  - packages/shared/components/Navigation.astro
  - packages/shared/components/Footer.astro
  - packages/shared/components/LanguageSwitch.astro
  - packages/shared/components/ArticleHeader.astro
  - packages/shared/components/AdaptationAttribution.astro
---

## Problem

v1.0 MVP is functionally complete (both Vercel previews live) but visual/design direction does not match intent. Production cutover (Phase 9 DNS) must wait until v1.1 visual polish ships.

User spec captured 2026-06-09. `/martin` redesign explicitly **deferred to v1.2** — out of v1.1 scope.

## Solution

### 1) CZ web (vzhurudolu.cz)

- **Main nav:** only **Články**, **Knihy**, **Autor** (remove Podcast, Video from header)
- **Footer nav:** move **Podcast** and **Video** here
- **Homepage:** remove Podcast and YouTube channel image blocks from current positions
- **Podcast block:** place under e-books section — full width, past tense copy about the podcast, link to **FrontKec**

### 2) Both sites — author box on homepage

Replace the current ebook.cz promo area with a modernized author profile box:

- Heading: **Martin Michálek.**
- Photo below heading
- One-sentence author bio below photo
- Link “více o autorovi” / “About Martin” → `/martin`
- **Inverse brown background** (existing VD dark/brown band styling)

Applies to CS and EN homepages (EN equivalent copy/links).

### 3) EN web — align homepage layout with CS

Unify EN homepage design with CS homepage structure:

1. **Featured main article** at top (hero/highlight)
2. **Author box** beside or adjacent (same layout pattern as CS)
3. **Full article stream** below
4. **Green topic hub box** (“Rozcestník na témata článku”) — same topic buttons as CS version only; no extra content

Remove EN-specific “Start here” section layout if it conflicts with CS-parity homepage (replace with CS-equivalent structure).

### 4) Article detail — CS + EN

- **Language switch** on same row as author + date: author/date **left**, language switch **right**
- **Remove** footer line “Text adapted from the Czech article.” (`AdaptationAttribution` or equivalent) from article detail

### 5) `/martin` — NOT v1.1

Explicitly out of scope for v1.1. Track as v1.2 milestone item.

## Next GSD steps

1. `/gsd-new-milestone` — v1.1 Visual Polish (blocks Phase 9 until verified)
2. `/gsd-discuss-phase 10` — refine layout wireframes, brown/green box specs
3. `/gsd-ui-phase 10` → `/gsd-plan-phase 10` → `/gsd-execute-phase 10`
4. `/gsd-verify-work 10` then resume Phase 9 DNS cutover

## Preview URLs (for UAT)

- CS: https://vd-web-2026.vercel.app/
- EN: https://vd-web-2026-xco9.vercel.app/
