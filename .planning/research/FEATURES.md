# Feature Landscape

**Domain:** International personal brand / technical consultant blog (Web Performance positioning)  
**Project:** michalek.dev — English adaptation of selected Vzhůru dolů content  
**Researched:** 2026-06-06  
**Overall confidence:** HIGH for table stakes and MVP scope; MEDIUM for differentiators (benchmarked from consultant sites, not A/B tested)

---

## How English Adaptation Sites Typically Work

Adaptation sites for existing Czech content blogs follow a **selective, separate-brand** pattern — not a mirror translation. This matches PROJECT.md decisions and industry practice for cross-domain localization.

| Pattern | What it means | michalek.dev fit |
|---------|---------------|------------------|
| **Separate domain** | `michalek.dev` ≠ `vzhurudolu.cz/en/` | Stronger personal brand; each site has own identity, nav, and conversion path |
| **Adaptation, not translation** | Editorial rewrite for global audience; different examples, metrics, cultural context | 8 pilot articles chosen for evergreen + shareability, not catalog completeness |
| **Paired content only** | Language switch exists only where an EN↔CS counterpart exists | 8 articles + `/martin` get switches; Czech-only content (podcast, kurzy, most příručka) has no EN link |
| **Cross-domain hreflang** | Google allows alternate URLs on different domains; each page self-canonicalizes | `en` ↔ `cs` bidirectional tags on paired pages; `x-default` → English (global audience) |
| **Explicit language switch** | Visible switcher; no IP/browser auto-redirect | Googlebot must crawl both sites; auto-redirect blocks indexing (Google Search Central, HIGH confidence) |
| **Content-type URL split** | `/blog/` + `/guide/` preserves Czech site's type clarity | Slugs may differ from Czech originals (adaptation); pairing stored in front matter, not URL symmetry |
| **Shared infra, separate content** | Monorepo + shared components; locale-specific collections | Visual parity without being a clone |

**MVP launch expectation (8 articles + `/martin` + language switch + legal):** Enough to be **credible and indexable**, not comprehensive. Comparable consultant blogs (Harry Roberts/CSS Wizardry: 240+ articles) launched with far less; MVP goal is proof of expertise + business funnel, not content parity with the Czech site.

---

## Table Stakes

Features users expect. Missing = site feels unfinished, untrustworthy, or invisible to search/social.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| **Homepage with clear positioning** | First impression: who Martin is, what he writes about, why trust him | Low | Value prop + recent/featured articles + primary CTA (→ `/martin` or LinkedIn). Not a link dump. |
| **Article pages (`/blog/`, `/guide/`)** | Core product is readable long-form technical content | Low | Inherited from Astro content collections; must work on EN site with adapted front matter. |
| **Article listing pages** | Readers browse by type; HN/X links often land on index | Low | `/blog/`, `/guide/` with reverse-chronological list. Pagination optional at 8 articles (single page OK). |
| **`/martin` about/services page** | Personal brand sites without About = incomplete; primary conversion surface | Medium | Bio, positioning (Technical CEO & Web Performance Strategist), services summary, client logos, LinkedIn CTA, **pagespeed.one** promotion. Adapted from Czech `/martin`, not copied. |
| **Author identity on every article** | Entity SEO: Google and readers connect content → person → expertise | Low | Visible byline, link to `/martin`, consistent name spelling. Person schema recommended. |
| **Syntax-highlighted code blocks** | Developer audience; unstyled code = unfinished technical blog | Low | Already in Astro pipeline (Shiki). Table stakes for this audience. |
| **Mobile-responsive layout** | >50% tech content consumed on mobile; Lighthouse mobile matters for positioning | Low | Shared CSS from monorepo; verify EN pages don't regress. |
| **HTTPS + fast static delivery** | Baseline trust; broken cert or slow TTFB = immediate bounce | Low | Vercel edge; no server round-trips for content. |
| **Unique title + meta description per page** | Search snippets and social previews | Low | Per-page front matter; EN-specific, not machine-translated Czech. |
| **Open Graph + Twitter Card metadata** | X, LinkedIn, HN, Slack unfurl quality drives click-through | Low | `og:title`, `og:description`, `og:image`, `twitter:card`. Article-specific images where available. |
| **Canonical URLs** | Prevents duplicate indexing; required for hreflang clusters | Low | Self-referencing canonical on every page. Never cross-language canonical. |
| **XML sitemap** | Search engine discovery; launch checklist standard | Low | Custom sitemap (existing pattern). Submit to GSC on launch. |
| **RSS feed** | Tech audience subscribes via Feedly/minifeed; listed in engineering blog directories | Low | `/rss` aggregating blog + guide. Required per PROJECT.md. |
| **`robots.txt` + crawlability** | Site must be indexable on launch | Low | Allow all; reference sitemap URL. |
| **Custom 404 page** | Broken links from old profile site, HN typos | Low | Helpful redirect hints to homepage/blog. |
| **Privacy policy** | GDPR legal minimum for EU-operated site | Medium | English version; covers hosting (Vercel), any contact forms, email if collected. Can adapt structure from `osobni-udaje.astro`. |
| **Cookie policy / notice** | ePrivacy if any non-essential cookies or tracking | Low–Med | **If no analytics or cookieless privacy-first analytics:** minimal or no banner. **If GA/Meta pixels:** consent banner required. MVP recommendation: defer analytics or use cookieless → simpler legal surface. |
| **Footer legal links** | Users and regulators expect Privacy (+ Cookies if applicable) in footer | Low | Link cluster: Privacy, Cookies (if needed), RSS, maybe Sitemap. |
| **Primary contact CTA** | Consultant blog without contact path = dead end for leads | Low | LinkedIn CTA on `/martin` + header/footer (MVP scope per PROJECT.md). No contact form required for MVP. |
| **Favicon + basic PWA meta** | Browser tab recognition; minor trust signal | Low | Reuse or adapt from shared package. |
| **`lang="en"` on HTML** | Correct language signal for browsers and assistive tech | Low | `<html lang="en">` on all EN pages. |
| **Language switch (paired content)** | Bilingual readers must find Czech original (and vice versa) | Medium | Visible switch on 8 article pairs + `/martin`. Links to exact counterpart URL on other domain. Label: "Česky" / "English" (native script names). |
| **hreflang on paired pages** | Cross-domain SEO; prevents wrong-language SERP | Medium | `en`, `cs`, `x-default` (→ EN) on all paired pages. Bidirectional. Absolute URLs. Implement via HTML `<link>` or sitemap annotations — pick one method sitewide. |
| **Internal navigation** | Home, Blog, Guide, Martin (+ legal in footer) | Low | Simple 4–5 item nav. No mega-menu. |
| **Accessible heading hierarchy** | WCAG baseline; technical audience includes a11y-conscious readers | Low | One H1 per page; logical H2/H3 in articles. |

---

## Differentiators

Features that set the site apart. Not universally expected, but high value for **Web Performance consultant positioning** — the site itself is the portfolio piece.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| **Lighthouse 100/100 across metrics** | "Practice what you preach" — site proves consulting credibility | Medium | Core Value in PROJECT.md. Requires zero unnecessary JS, optimized images, font strategy, minimal third parties. Harder to maintain than a generic blog theme. |
| **Zero/minimal client-side JavaScript** | Demonstrates performance discipline; faster than 95% of consultant sites | Medium | Astro SSG default. Avoid analytics widgets, comment systems, cookie banners with heavy JS. |
| **Documented performance stack on `/martin` or footer** | Transparency builds trust (Harry Roberts discloses Jekyll/Cloudflare/inuitcss) | Low | "Built with Astro, deployed on Vercel, no tracking cookies" — optional short colophon. |
| **Person + Article JSON-LD schema** | Entity-first SEO; AI search citation; Knowledge Panel eligibility | Medium | `Person` with `sameAs` (LinkedIn, X, pagespeed.one); `Article` on posts. Differentiator vs. most personal blogs that skip structured data. |
| **`rel="me"` on social profile links** | Identity verification signal (IndieWeb / entity SEO pattern) | Low | On `/martin` outbound links to owned profiles. |
| **pagespeed.one as primary business funnel** | Converts organic readers to consulting pipeline | Low | Prominent on `/martin`; not buried. Czech site buries less — EN site should lead with global consulting brand. |
| **Client logos + named testimonials** | Social proof for B2B consulting buyers | Low | Already on Czech `/martin`; adapt for international clients (Adblock, Footshop, etc.). |
| **Curated "start here" content path** | Reduces bounce for newcomers; topic authority signal | Low | Homepage section: "New here? Start with Web Vitals guide" — 3–4 links to best pilot articles. |
| **Evergreen guide content (`/guide/`)** | Guides rank longer than opinion blog posts; CWV/WebP/AI guides are link magnets | Medium | 5 pilot guides chosen for SEO longevity. Separate URL type signals reference content. |
| **Cross-link to Czech counterpart** | Unique to adaptation model; builds trust with bilingual community | Medium | "Originally published in Czech on Vzhůru dolů" note on adapted articles. Honest about adaptation. |
| **Reading-optimized article layout** | Comfortable line length, typography, code block styling | Low | Inherited from VD design system. Verify EN typography (quotes, dashes) feels native. |
| **Share-friendly article metadata** | HN/X/LinkedIn distribution is success metric per PROJECT.md | Low | Good `og:image`, compelling `og:description`, clean URL slugs. No share button JS required — metadata is enough. |
| **Anchor links on headings** | Deep-linking to sections (common on CSS Wizardry, web.dev) | Low | `rehype` heading anchors if not already present. Helps Twitter/X citations. |
| **Performance colophon / badge** | Meta-differentiator: optional link to Lighthouse report or public metrics | Low | e.g. "This page: 100 Performance, 100 Accessibility" — rare, memorable. Risk: metric regression embarrassment. |
| **Topic tags on articles** | Enables future category pages and topical clustering | Low | Tags in front matter; display on article. Full category system deferred. |
| **Engineering blog RSS discoverability** | Inclusion in kilimchoi/engineering-blogs and similar lists | Low | Submit after launch; RSS URL in `<head>`. |

### Web Performance Positioning — What Separates Table Stakes from Differentiators Here

For a generic tech blog, fast loading is table stakes. For a **Web Performance consultant**, it escalates:

| Generic table stakes | Performance-positioned differentiator |
|---------------------|--------------------------------------|
| "Site loads reasonably fast" | Documented 100/100 Lighthouse; reproducible stack |
| "Has HTTPS" | Zero third-party scripts; no render-blocking widgets |
| "Mobile responsive" | Sub-2.5s LCP on mid-tier mobile (CrUX-grade ambition) |
| "Has a blog" | Blog posts demonstrate measurement methodology, real metrics, field data awareness |
| "Has About page" | About page routes to pagespeed.one consulting with client proof |

---

## Anti-Features

Features to explicitly **NOT** build — scope traps, brand conflicts, or performance contradictions.

| Anti-Feature | Why Avoid | What to Do Instead |
|--------------|-----------|-------------------|
| **1:1 mirror of Czech site** | Wrong brand; translation ≠ adaptation; unbounded scope | Selective 8 articles; editorial adaptation in Cursor + human pass |
| **`/en/` path on vzhurudolu.cz** | Weakens personal brand; conflicts with separate-domain decision | Keep `michalek.dev` as canonical EN presence |
| **Podcast on EN site** | Czech-only content; transcription/localization is huge scope | Link to Czech podcast from `/martin` if ever needed; no EN podcast pages in MVP |
| **Newsletter / Mailchimp signup** | Deferred per PROJECT.md; GDPR complexity; another JS dependency | LinkedIn CTA only for MVP |
| **Courses, e-books, kurzy** | Czech commercial products; not EN MVP | Mention in `/martin` bio if relevant; no EN storefront |
| **Full příručka mirror / ebook TOCs** | Hundreds of pages; category TOC structures out of scope | `/guide/` for standalone adapted articles only |
| **Comment system (Disqus, giscus, etc.)** | Third-party JS destroys Lighthouse score; moderation burden | LinkedIn/X engagement; "Discuss on X" link optional |
| **Google Analytics (standard)** | Cookies → consent banner → JS weight → GDPR processor list | Cookieless analytics (Plausible/Fairlytics) post-MVP, or none at launch |
| **Cookie consent mega-banner** | UX friction; often 50–200KB JS | Avoid non-essential cookies at MVP |
| **Auto language redirect by IP/browser** | Blocks Googlebot; wrong-language UX (Google Search Central) | Explicit language switcher only |
| **Machine translation widget (GTranslate, etc.)** | Quality destroys expert positioning; adds JS | Human-adapted content only |
| **Heavy hero animations / video backgrounds** | Contradicts performance brand | Static images; system fonts or minimal web fonts |
| **Intercom / Drift / live chat** | Performance killer; premature for personal blog | LinkedIn DM path |
| **WordPress-style plugin ecosystem** | Monorepo is Astro SSG; rewrite rejected | Stay in Astro 4 + shared packages |
| **Paid paywall / membership** | No EN content business model in MVP | Open access all articles |
| **AI chatbot on site** | Trendy but heavy; off-brand for performance purist | — |
| **Tag archive pages at launch** | Empty/thin pages with 8 articles | Tags visible on articles; archive pages when >20 posts |
| **Search functionality** | 8 articles don't need search; adds JS or build complexity | Browser find; Google `site:michalek.dev` |
| **Related posts carousel with ML** | Over-engineered for 8 articles | Manual "related reading" links in article footer |
| **Multi-author CMS** | Single-author personal brand | Martin as sole author |
| **Hreflang on non-paired pages** | Broken reciprocity if Czech page has no EN pair | hreflang only on 8 pairs + `/martin`; omit elsewhere |

---

## Feature Dependencies

```
Performance budget (100/100 Lighthouse)
  → constrains: analytics choice, cookie banner, comments, chat, fonts, third-party embeds
  → enables: performance colophon as credible differentiator

Monorepo (apps/michalek-dev + packages/shared)
  → requires: shared layouts, components, markdown pipeline
  → enables: visual parity with vzhurudolu.cz without content coupling

Content adaptation workflow (AI draft + human edit)
  → requires: EN front matter schema, editorial guidelines
  → blocks: language switch, hreflang (need stable EN URLs + czechSource URL in front matter)

Language switch
  → requires: czechSource (or equivalent) in EN front matter; mirrored link on Czech original
  → requires: hreflang implementation
  → depends on: 8 articles published on both sites

hreflang (cross-domain)
  → requires: absolute URLs on both domains live
  → requires: bidirectional links (EN ↔ CS for each pair)
  → conflicts with: cross-language canonicals (never do)

/martin page
  → requires: client logos, services copy, pagespeed.one link
  → supports: author bylines, Person schema, primary CTA
  → pairs with: Czech /martin for language switch

Legal pages (Privacy, Cookies)
  → requires: decision on analytics (cookies page complexity depends on this)
  → should precede: any analytics deployment

RSS + Sitemap
  → requires: published content in collections
  → supports: GSC submission, feed readers

Vercel deploy (both sites)
  → blocks: production launch
  → enables: HTTPS, edge CDN, preview deploys for EN content review

JSON-LD Person schema
  → requires: /martin content stable; sameAs URLs verified
  → enhances: author bylines, entity SEO

Homepage
  → requires: ≥1 published article (ideally 8)
  → depends on: article listing components
```

### Critical Path for MVP Launch

```
1. Monorepo structure + shared package
2. EN content collections + front matter (incl. czechSource)
3. Core pages: homepage, /blog/, /guide/, article template
4. 8 adapted articles published
5. /martin page
6. Language switch + hreflang on pairs
7. Legal: Privacy (+ Cookies if needed)
8. RSS + sitemap
9. Vercel deploy + GSC submission
10. Lighthouse verification gate
```

---

## MVP Recommendation

### Prioritize (launch blockers)

1. Homepage with positioning + article list
2. 8 adapted articles (5 guide, 3 blog) with author byline
3. `/martin` with pagespeed.one, services, logos, LinkedIn CTA
4. Language switch on all paired content (EN ↔ CS)
5. hreflang on paired pages
6. Privacy policy (+ cookie policy only if cookies used)
7. RSS + XML sitemap
8. Per-page SEO metadata (title, description, OG)
9. Lighthouse 100/100 gate
10. Vercel production deploy

### Include if low effort (high signal)

- Person + Article JSON-LD
- Heading anchor links
- "Start here" curated links on homepage
- Custom 404
- `rel="me"` on social links
- Adaptation attribution note ("Adapted from Czech original")

### Defer (post-MVP)

| Feature | Reason to defer |
|---------|-----------------|
| Newsletter | PROJECT.md explicit deferral |
| Cookieless analytics | Useful but not launch blocker; avoid cookie banner at MVP |
| Tag archive / category pages | Thin with 8 articles |
| Search | No content volume |
| Pagination | Single page holds 8 posts |
| `/press` or `/speaking` pages | Content exists but not MVP-critical |
| Performance colophon badge | Nice; risk if metrics slip |
| Additional article batches | Validate adaptation workflow first |
| Giscus/comments | Performance cost |
| Contact form | LinkedIn sufficient for MVP |

---

## Benchmark: What Leading Performance Consultants Ship

| Site | Notable features | What michalek.dev should borrow |
|------|------------------|-------------------------------|
| [CSS Wizardry](https://csswizardry.com/) (Harry Roberts) | 240+ articles, consultancy page, testimonials, newsletter, tools list, performance-transparent stack disclosure | Services page structure, testimonial logos, "learn" resource links, colophon honesty |
| [corewebvitals.io](https://www.corewebvitals.io/) (Arjen Karel) | RUM tooling, case studies with metrics, client logos (eBay, Nestlé), free call CTA | Case study metrics in articles, client logo strip on `/martin` |
| [Addy Osmani](https://addyosmani.com/) | Minimal blog, cross-platform writing links, RSS | Simplicity; don't over-build nav |

**Key insight:** Top performance consultants lead with **proof** (client names, measurable outcomes, site speed) and **depth content** (technical articles). They do not lead with feature-rich portals. michalek.dev MVP should feel closer to CSS Wizardry's clarity than to a marketing-site builder template.

---

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Table stakes (technical blog) | HIGH | Multiple sources + existing VD codebase patterns |
| Table stakes (legal GDPR) | MEDIUM | Depends on analytics decision at launch |
| Language switch + hreflang | HIGH | Google Search Central official docs |
| Web Performance differentiators | HIGH | PROJECT.md constraint + consultant benchmark sites |
| Anti-features | HIGH | PROJECT.md Out of Scope + performance positioning logic |
| Adaptation site patterns | MEDIUM | Limited public case studies of CS→EN consultant adaptation; pattern inferred from i18n best practices + project decisions |

---

## Sources

- [Google Search Central: Localized versions / hreflang](https://developers.google.com/search/docs/specialty/international/localized-versions) — HIGH
- [casinokrisa.com: Entity-first SEO for personal brands](https://casinokrisa.com/blog/entity-first-seo-personal-brand-checklist) — MEDIUM
- [reputationrhino.com: Personal Website SEO](https://www.reputationrhino.com/personal-website-seo/) — MEDIUM
- [CSS Wizardry](https://csswizardry.com/) — HIGH (live benchmark)
- [corewebvitals.io](https://www.corewebvitals.io/) — HIGH (live benchmark)
- [Blixamo: Technical blog production features](https://blixamo.com/blog/nextjs-mdx-blog-syntax-highlighting-rss-sitemap-seo) — MEDIUM
- [DEV Community: Hugo blog compliance](https://dev.to/steph60220/how-to-build-a-technical-blog-with-cursor-and-hugo-2026-356o) — MEDIUM
- `.planning/PROJECT.md` — HIGH (project-specific requirements)
- `.planning/codebase/ARCHITECTURE.md` — HIGH (existing feature inventory)
- `src/pages/martin.astro`, `src/layouts/BaseLayout.astro` — HIGH (brownfield baseline)
