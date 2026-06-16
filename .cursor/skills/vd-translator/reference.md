# VD Translator — technical reference

## Paths

| CS source | EN target |
|-----------|-----------|
| `apps/vzhurudolu/src/content/blog/{filename}.md` | `apps/michalek-dev/src/content/blog/{en-slug}.md` |
| `apps/vzhurudolu/src/content/prirucka/{filename}.md` | `apps/michalek-dev/src/content/guide/{en-slug}.md` |

CS blog key in `pairs.ts` = filename without `.md` (e.g. `264-ceo-bere-praci`).
CS příručka key = front matter `id` (e.g. `vibe-coding`), not always filename.

## EN front matter template

```yaml
---
title: "SEO title in English"
description: "One paragraph for RSS and OG — not a copy of the first paragraph."
date: 2026-06-15
published: true
pairId: ceo-takes-your-job
author: Martin Michálek
adaptedFrom:
  title: "Czech original title from CS postTitle/title"
  url: "https://www.vzhurudolu.cz/blog/264-ceo-bere-praci"
tags:
  - ai
  - development
---
```

### Field rules

| Field | Source |
|-------|--------|
| `date` | Same as CS `postDateTime` / `date` |
| `pairId` | Same as EN slug when possible |
| `adaptedFrom.url` | `https://www.vzhurudolu.cz/blog/{postUrlId or slug}` or `/prirucka/{id}` |
| `tags` | EN tags from `apps/michalek-dev/src/data/tags.ts` |

### CS → EN tag mapping (heuristic)

| CS category/tag | EN tag |
|-----------------|--------|
| `ai` | `ai` |
| `netechnické` | `soft-skills` or `personal` |
| `rychlost`, `rychlost-nacitani` | `performance` |
| `webp`, `obrázky` | `webp` / `images` |
| `css`, `css3` | `development` or topic-specific |
| `produktivita` | `productivity` |
| year-in-review posts | `year-in-review`, `personal` |

Use 2–4 tags per article. Tags must exist in `tags.ts` or tag archive pages won't resolve.

## Slug rules

- **Short:** 2–4 English words
- **kebab-case:** `ceo-takes-your-job`, not `why-your-ceo-is-taking-your-coding-job`
- **pairId** = slug string for new pairs
- Blog EN slug need not mirror CS filename (`254-ne` → `saying-no` is OK for legacy pilots)

## pairs.ts entry template

```typescript
{
  pairId: 'ceo-takes-your-job',
  cs: { site: 'vzhurudolu', collection: 'blog', key: '264-ceo-bere-praci' },
  en: { site: 'michalek-dev', collection: 'blog', key: 'ceo-takes-your-job' },
},
```

```typescript
{
  pairId: 'writing',
  cs: { site: 'vzhurudolu', collection: 'prirucka', key: 'psani' },
  en: { site: 'michalek-dev', collection: 'guide', key: 'writing' },
},
```

Add before closing `];` in [packages/shared/content-pairing/pairs.ts](packages/shared/content-pairing/pairs.ts).

## EN internal link format

| From | To blog | To guide |
|------|---------|----------|
| `blog/foo.md` | `[text](bar.md)` same dir | `[text](../guide/bar.md)` |
| `guide/foo.md` | `[text](../blog/bar.md)` | `[text](bar.md)` same dir |

Always `.md` paths — never `/blog/...` URLs in markdown.

## CS internal link format (backlinks)

| From | To |
|------|-----|
| `blog/foo.md` | `[text](../blog/264-ceo-bere-praci.md)` |
| `prirucka/foo.md` | `[text](vibe-coding.md)` or `[text](../blog/...md)` |

See [content-internal-links-md](../content-internal-links-md/SKILL.md).

## CS front matter: pairId

Blog example:
```yaml
pairId: ceo-takes-your-job
```

Příručka — `pairId` optional but recommended; `id` must match `pairs.ts` cs.key.

## Strip from CS when adapting

- `<!-- AdSnippet -->`
- `<div class="related" markdown="1">` blocks linking only to untranslated articles (rebuild with EN links if pairs exist)
- Czech-only footer CTAs to social discussion (unless user asks)

## Validation commands

```bash
node scripts/validate-content-pairs.mjs
npm run build -w @vd/vzhurudolu
npm run build -w @vd/michalek-dev
```

Flag check after build:
```bash
grep -l 'michalek.blog.*ceo-takes-your-job\|ceo-takes-your-job.*michalek.blog' apps/vzhurudolu/dist/blog/264-ceo-bere-praci/index.html
grep 'Also available in Czech' apps/michalek-dev/dist/blog/ceo-takes-your-job/index.html
```
