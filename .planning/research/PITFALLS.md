# Domain Pitfalls

**Domain:** Astro monorepo migration + English site launch (`michalek.dev`) + simultaneous Vercel cutover from FTP/Apache  
**Project:** Martin Michálek · Web & Performance (brownfield `vzhurudolu.cz`)  
**Researched:** 2026-06-06  
**Overall confidence:** HIGH for stack-specific pitfalls (verified against codebase + Astro/Vercel docs); MEDIUM for SEO/i18n edge cases (community + Google guidance)

---

## Critical Pitfalls

Mistakes that cause rewrites, SEO damage, production outages, or broken Czech site during migration.

### Pitfall 1: Triple Big-Bang (Monorepo + EN Site + Vercel Cutover in One Release)

**What goes wrong:** A single release combines directory restructure, shared-package extraction, new English routes, and DNS switch for both domains. Any failure mode — broken build, missing redirect, wrong `site` URL — takes down the live Czech site or launches a broken English site with no rollback path.

**Why it happens:** All three workstreams feel “infrastructure” and get batched to “do it once.” FTP deploy masks partial failures (incremental upload); Vercel does not.

**Consequences:** Extended outage on `vzhurudolu.cz`; polluted Search Console with duplicate/trailing-slash URLs; English launch with broken internal links; rollback requires DNS revert while monorepo structure is already on `main`.

**Prevention:**
- Sequence: (1) monorepo on FTP with Czech-only, (2) Vercel preview for Czech parity, (3) add `michalek.dev` as second Vercel project, (4) DNS cutover per domain after checklist passes.
- Keep FTP workflow deployable until Czech Vercel preview matches production (URL diff script or link checker).
- Feature-flag English routes behind a separate Vercel project; never block Czech deploy on EN content readiness.

**Detection (warning signs):**
- Roadmap has one phase titled “launch everything.”
- No acceptance criteria for “Czech site byte-identical (modulo hosting)” before DNS.
- Single PR touching `apps/`, `packages/`, `vercel.json`, and all DNS records.

**Phase:** Cross-cutting — enforce in **Monorepo scaffold** and **Vercel migration** planning; treat as release policy, not a single implementation task.

---

### Pitfall 2: Astro Monorepo Dependency Hoisting Breaks Integrations

**What goes wrong:** `@astrojs/*` integrations and `astro` itself live only in the workspace root `package.json`. Builds fail with “Cannot find package” or silently skip integration bundling; `astro build` works locally (hoisted `node_modules`) but fails on Vercel (clean install per app root).

**Why it happens:** Astro resolves the **closest** `package.json` to the app and uses heuristics to detect which `@astrojs/*` packages need special Vite SSR handling. Root-only deps break that contract (documented in [Astro troubleshooting — monorepo](https://docs.astro.build/en/guides/troubleshooting/#adding-dependencies-to-astro-in-a-monorepo)).

**Consequences:** Missing sitemap/RSS integrations, broken image optimization, failed CI on Vercel while `npm run dev` works from repo root.

**Prevention:**
- Declare `astro`, every `@astrojs/*` integration, and framework peers in **each** `apps/*/package.json`.
- For shared internal packages (`packages/shared`), add them to `vite.ssr.noExternal` in each app’s `astro.config.mjs` if consumed from workspace.
- CI: run `npm ci && npm run build` from **each app root directory**, not only repo root.

**Detection:**
- `apps/michalek-dev/package.json` has empty or minimal `dependencies`.
- Build only tested via root `npm run build` alias, never from `apps/vzhurudolu/`.
- Vercel Root Directory set but Install Command still runs only at monorepo root without workspace-aware filter.

**Phase:** **Monorepo scaffold** (structure) + **packages/shared extraction** (workspace wiring).

---

### Pitfall 3: Hardcoded `https://www.vzhurudolu.cz` Survives the Split

**What goes wrong:** `site` in `astro.config.mjs`, `custom-sitemap.ts`, OG URLs, RSS links, and hundreds of markdown absolute URLs continue pointing at the Czech domain. The English site emits Czech canonicals; sitemap lists wrong host; language-switch links cross-wire domains.

**Why it happens:** Today `site` is a string literal in config and `custom-sitemap.ts` (not `import.meta.env.SITE`). Content authors historically used full URLs; `rehype-prirucka-links` only rewrites `.md` links, not `https://www.vzhurudolu.cz/...` in body copy.

**Consequences:** SEO self-cannibalization; broken EN internal navigation; Search Console “alternate page with proper canonical” errors; RSS subscribers get Czech URLs from EN feed.

**Prevention:**
- Per-app `site` in `apps/vzhurudolu/astro.config.mjs` vs `apps/michalek-dev/astro.config.mjs`.
- Refactor `custom-sitemap.ts` to read `config.site` from integration context, not a constant.
- Templates: `new URL(path, Astro.site)` for canonical, OG, RSS, hreflang — never string literals.
- Pilot EN articles: zero absolute `vzhurudolu.cz` links in body (use `.md` or relative paths per content skill).
- Optional CI grep: fail build if `apps/michalek-dev/` output contains `vzhurudolu.cz` outside `hreflang` / language-switch metadata.

**Detection:**
- `grep -r "vzhurudolu.cz" apps/michalek-dev/` returns hits in layouts or generated dist.
- Sitemap XML for michalek.dev contains `www.vzhurudolu.cz` locs.
- `custom-sitemap.ts` still contains `const site = 'https://www.vzhurudolu.cz'`.

**Phase:** **packages/shared extraction** (sitemap/RSS utilities) + **michalek.dev site** + **Content adaptation**.

---

### Pitfall 4: `.htaccess` Redirects Not Ported to `vercel.json`

**What goes wrong:** ~300 lines of Apache rules in `public/.htaccess` (www/https enforcement, ebook redirects, short URLs `/p/`, `/b/`, `/k/`, legacy kurzy paths, trailing-slash policy) simply do not run on Vercel. External backlinks and bookmarks 404.

**Why it happens:** `.htaccess` is copied to `dist/` by `vitePluginCopyPublicToDist()` and worked on FTP/Apache. Vercel ignores it. Teams assume “we copied public/ so redirects are fine.”

**Consequences:** Immediate 404 spike on high-traffic legacy URLs; ebook/marketing short links break; Google re-crawls and drops ranking on formerly redirected paths.

**Prevention:**
- Inventory every `RedirectMatch` and `RewriteRule` in `public/.htaccess`; map 1:1 to `vercel.json` `redirects` (308 for permanent).
- Port `ErrorDocument 404` to `public/404.html` + Vercel `cleanUrls` / custom 404 (already static).
- Port font CORS (`Access-Control-Allow-Origin: *`) to `vercel.json` `headers` — not automatic from `.htaccess`.
- Validate with redirect test matrix before DNS (old URL → expected new URL).
- Keep redirect list in `packages/shared` or root doc so both Vercel projects stay in sync where rules overlap.

**Detection:**
- No `vercel.json` in repo, or it only has `trailingSlash`.
- Stakeholders say “redirects are in public/.htaccess.”
- `/p/css-grid` or `/kniha-rwd` returns 404 on `*.vercel.app` preview.

**Phase:** **Vercel migration & DNS cutover** (must be complete before Czech DNS switch).

---

### Pitfall 5: Static Middleware Assumed to Run on Vercel

**What goes wrong:** `src/middleware.ts` handles `/kurzy/*` → `/kurzy` redirects in dev/preview. With `output: 'static'`, Astro middleware **does not run** on Vercel static hosting. Kurzy subpaths 404 or serve unintended content.

**Why it happens:** Middleware works in `astro dev` and gives false confidence; static output docs state middleware is build-time/dev-only unless SSR adapter is used.

**Consequences:** Broken course URLs that `.htaccess` used to handle; discrepancy between local preview and production.

**Prevention:**
- Express every middleware redirect as `vercel.json` `redirects` or `rewrites`.
- Delete or gate middleware behind `import.meta.env.DEV` with comment “not for production static.”
- Add redirect tests for `/kurzy/foo` → `/kurzy`.

**Detection:**
- `middleware.ts` exists but `output: 'static'` unchanged.
- Redirect works on `astro dev` but fails on Vercel preview URL.

**Phase:** **Vercel migration & DNS cutover**.

---

### Pitfall 6: Trailing-Slash Duplicate Content on Vercel

**What goes wrong:** Astro `trailingSlash: 'never'` generates `/about/index.html` but canonical URLs omit trailing slash. Vercel serves **both** `/about` and `/about/` as 200 without redirect unless configured. Google indexes duplicates (confirmed pattern for Astro static on Vercel).

**Why it happens:** Apache `.htaccess` enforced slash policy; Vercel default `trailingSlash: undefined` serves both variants.

**Consequences:** Duplicate content in Search Console; diluted link equity; conflicts with existing Czech indexing patterns.

**Prevention:**
- Add `"trailingSlash": false` to **each** app’s `vercel.json` ([Vercel docs](https://vercel.com/docs/project-configuration/vercel-json#trailingslash)).
- Align `trailingSlash: 'never'` in both `astro.config.mjs` files.
- Canonical link generation must strip trailing slashes explicitly (`new URL` + normalize).
- Regenerate sitemap after change; resubmit in Search Console.

**Detection:**
- `curl -I https://preview.vercel.app/blog/foo/` returns 200, not 308.
- Search Console “Duplicate without user-selected canonical” after cutover.

**Phase:** **Vercel migration** + **Performance/SEO polish**.

---

### Pitfall 7: Using Astro Built-in `i18n.domains` for Separate Static Sites

**What goes wrong:** Team enables `i18n.domains` to map `cs` → vzhurudolu.cz and `en` → michalek.dev in one Astro app. Build fails or team switches to `output: 'server'` + Vercel adapter, sacrificing static 100/100 Lighthouse goal.

**Why it happens:** Astro docs position `i18n.domains` for multi-domain routing, but it requires **SSR** (`output: 'server'`) with Node/Vercel adapter — not compatible with the project’s static SSG constraint.

**Consequences:** Accidental SSR migration; edge/server cost; hydration complexity; Lighthouse regression.

**Prevention:**
- **Two separate Astro apps** in monorepo (`apps/vzhurudolu`, `apps/michalek-dev`), two Vercel projects — do not use `i18n.domains`.
- Cross-link via frontmatter (`translationKey`, `alternateUrl`) and shared hreflang component in `packages/shared`.
- Manual locale URL helpers (`getAbsoluteLocaleUrl` pattern) scoped per app `site`.

**Detection:**
- `astro.config.mjs` contains `i18n.domains` or `output: 'server'` without explicit decision record.
- Single app trying to serve both domains.

**Phase:** **Monorepo scaffold** + **michalek.dev site** (architecture decision).

---

### Pitfall 8: Incomplete Hreflang Clusters for Language-Switch Pairs

**What goes wrong:** English pilot articles link to Czech originals, but Czech pages lack reciprocal `hreflang` / language-switch back-links. Google ignores the entire hreflang set. Worse: `hreflang="en"` points to URLs that 404 because EN slug differs from CZ slug.

**Why it happens:** Hreflang is a **bidirectional graph** — every page must reference all siblings including itself. Slug mapping (`/prirucka/web-vitals` ↔ `/guide/web-vitals`) is manual for adapted content, not automatic from Astro i18n.

**Consequences:** EN pages treated as unrelated duplicates; wrong language in SERPs; language switcher sends users to 404.

**Prevention:**
- Frontmatter contract: `translationKey` (stable ID), `alternateUrl` (absolute URL to counterpart), `locale` (`cs` | `en`).
- Shared `Hreflang.astro` in `packages/shared` validates reciprocity at build time (fail build if EN has `alternateUrl` but CZ lacks reverse link).
- Use `cs` and `en` BCP 47 tags + `x-default` pointing to preferred entry (likely EN for michalek.dev, CZ for vzhurudolu.cz on respective sites).
- Only implement language switch on the 8 pilot pairs initially — do not add switch UI globally without metadata.

**Detection:**
- Language switch works EN→CZ but CZ page has no EN link in `<head>`.
- Google Search Console hreflang errors (“no return tags”).
- `alternateUrl` uses Czech slug on English path.

**Phase:** **Content adaptation** + **i18n linking & SEO**.

---

### Pitfall 9: Shared Markdown Pipeline Breaks When Extracted to `packages/shared`

**What goes wrong:** Moving remark/rehype plugins to `packages/shared` changes resolution paths, plugin order, or `allowDangerousHtml` settings. Prirucka-specific transforms (`rehype-connected-elements`, `markdown="1"`, `.ebook-only`) silently break on Czech site during “refactor.”

**Why it happens:** Ten custom plugins run in strict order across two phases (documented in CONCERNS.md). Shared package extraction tempts “cleanup” refactors alongside moves.

**Consequences:** Subtle HTML regressions across 520+ prirucka pages; ebook-only content leaks; related boxes wrong; no automated tests to catch it.

**Prevention:**
- Move plugins verbatim first; no logic changes in same PR as monorepo move.
- Export a single `createMarkdownConfig(siteOptions)` factory from `packages/shared` used by both apps — English app passes `linkPrefix: '/guide/'`, Czech keeps `/prirucka/`.
- Full `npm run build` for **both** apps after any plugin touch; spot-check known fragile articles (connected boxes, `markdown="1"`, ebook-only).
- Defer plugin deduplication until monorepo is stable.

**Detection:**
- Prirucka article loses “connected” box styling after shared extraction PR.
- `rehype-prirucka-links` still hardcodes `/prirucka/` when building EN guide.

**Phase:** **packages/shared extraction** (highest risk) + **michalek.dev site**.

---

### Pitfall 10: Literal Translation Instead of Adaptation

**What goes wrong:** AI drafts preserve Czech structure, examples (Czech companies, CZK pricing), and idioms. English site reads as thin duplicate of Czech content; fails project brand goal (“not Vzhůru dolů in English”); weak engagement signals.

**Why it happens:** Translation is faster than adaptation; editorial pass skipped under launch pressure; AI prompt lacks “rewrite for global audience” constraints.

**Consequences:** High bounce on EN articles; HN/X sharing backlash (“AI slop”); pagespeed.one funnel on `/martin` gets low-intent traffic.

**Prevention:**
- Adaptation checklist per article: replace locale-specific examples, convert metrics to international units, adjust cultural references, rewrite headline for EN SEO intent.
- Human editorial pass required before merge — not optional for pilot 8.
- `/martin` and homepage copy written natively in English, not translated from Czech index.

**Detection:**
- EN article mentions “Vzhůru dolů” as primary subject voice.
- EN and CZ articles share >80% sentence structure (manual spot check).
- No EN-specific meta description / title keywords.

**Phase:** **Content adaptation**.

---

### Pitfall 11: DNS Cutover Without TTL Reduction and Staged Verification

**What goes wrong:** DNS changed with TTL still at 86400s; SSL certs not pre-provisioned; apex domain uses CNAME instead of A record; Cloudflare orange-cloud proxy still points at old FTP host. Rollback takes hours.

**Why it happens:** Underestimating DNS propagation; Vercel SSL requires domain verification before cutover ([Vercel zero-downtime guide](https://vercel.com/kb/guide/zero-downtime-migration)).

**Consequences:** Partial traffic to dead FTP; certificate warnings; extended mixed hosting period with divergent content.

**Prevention:**
- 24–48h before cutover: lower TTL to 300s at DNS provider.
- Add domains to Vercel projects; verify SSL on preview before apex switch.
- Apex: use Vercel A record; `www`: CNAME per project settings.
- Cut over **Czech domain first**, validate 48h, then `michalek.dev` (or vice versa per business priority — but not same hour).
- Keep FTP credentials and one-click revert documented until post-cutover soak complete.

**Detection:**
- No TTL change ticket before launch date.
- `dig` shows mixed A records during cutover window.
- SSL “not secure” warnings on preview custom domain.

**Phase:** **Vercel migration & DNS cutover**.

---

### Pitfall 12: `public/` Bulk (685 MB) Copied Every Build on Vercel

**What goes wrong:** `vitePluginCopyPublicToDist()` copies entire `public/` including `public/data/` legacy archives (~128 MB) on every build. Vercel build exceeds timeout or blows artifact size limits. Czech site worked on FTP because `data/` and `files/` were **excluded from FTP deploy** but still exist on origin server.

**Why it happens:** Monorepo move copies existing Vite plugins unchanged; FTP exclude list in `.github/workflows/deploy-ftp.yml` does not translate to Vercel.

**Consequences:** Failed deploys; slow CI; serving 685 MB static tree from Vercel edge (cost/latency); unintended exposure of legacy demo archives.

**Prevention:**
- Audit what must be live: `public/files/`, `public/data/` URLs still linked from content?
- If legacy paths still needed: host on object storage or keep subset; do not blindly copy 685 MB.
- Scope `vitePluginCopyPublicToDist` to required subtrees or rely on Astro `publicDir` defaults without double-copy.
- Mirror FTP exclude list in Vercel ignore or `.vercelignore`.

**Detection:**
- Build log shows `[copy-public-to-dist] public/ zkopírováno` and build time increases sharply.
- `public/data/test/` accessible on production (unintended).

**Phase:** **Monorepo scaffold** + **Vercel migration**.

---

## Moderate Pitfalls

### Pitfall 13: Two Vercel Projects Misconfigured (Root Directory / Output)

**What goes wrong:** Single Vercel project points at repo root; build runs wrong `package.json`; output `dist/` not found because Astro builds to `apps/vzhurudolu/dist`. Or `outDir` customized outside project root (breaks Vercel artifact detection per [astro#7600](https://github.com/withastro/astro/issues/7600)).

**Prevention:** Two Vercel projects from same repo; Root Directory = `apps/vzhurudolu` and `apps/michalek-dev`; default Astro `dist/` within each app; no custom `outDir` escaping app folder.

**Detection:** Vercel build log shows “No Output Directory” or deploys empty site.

**Phase:** **Vercel migration**.

---

### Pitfall 14: `rehype-prirucka-links` and URL Helpers Assume Czech Paths

**What goes wrong:** Link transform maps `css-grid.md` → `/prirucka/css-grid`. English guide needs `/guide/css-grid`. Category helpers (`getCategoriesForPost`, `normalizeTag`) duplicated across pages — fix one app, miss the other.

**Prevention:** Parameterize link prefix per app in shared config; consolidate helpers into `packages/shared` **before** duplicating for EN.

**Detection:** EN guide internal links resolve to `/prirucka/...` 404.

**Phase:** **packages/shared** + **michalek.dev site**.

---

### Pitfall 15: RSS and Sitemap Divergence Across Sites

**What goes wrong:** Single `rss.ts` pattern aggregates all collections; EN site emits podcast/czech-only content; custom sitemap includes draft routes and `style/` paths inconsistently; RSS uses `markdown-it` not remark pipeline (existing bug) — duplicated wrong on EN.

**Prevention:** Per-app RSS scope (EN: blog + guide only); per-app sitemap filters; shared generator accepts `collections[]` and `site` params.

**Detection:** EN RSS contains Czech-only podcast entries; draft blog URLs in sitemap (existing issue — blog `[slug].astro` does not filter `published`).

**Phase:** **michalek.dev site** + **i18n SEO**.

---

### Pitfall 16: Draft / Unpublished Content Publicly Reachable (Regression During Move)

**What goes wrong:** Known bug — blog `getStaticPaths()` includes drafts. Monorepo move copies bug to both apps or introduces new routes without `published` filter.

**Prevention:** Fix filtering in Czech app **before** monorepo split; add shared `getPublishedEntries()` helper; assert pilot builds exclude `postStatus: Draft`.

**Detection:** `/blog/115-google-speed-https` returns 200 (known draft from CONCERNS.md).

**Phase:** **Monorepo scaffold** (early hygiene).

---

### Pitfall 17: Workspace TypeScript / Path Aliases Not Per-App

**What goes wrong:** No root `tsconfig.json` today; monorepo adds `packages/shared` imports that fail on Vercel because `tsconfig paths` or `exports` map missing in one app.

**Prevention:** `packages/tsconfig` base; each app extends; explicit `exports` in `packages/shared/package.json`; run `astro check` in CI per app.

**Detection:** `Cannot find module '@vd/shared'` during Vercel build only.

**Phase:** **Monorepo scaffold**.

---

### Pitfall 18: Performance Budget Broken by jQuery Legacy JS

**What goes wrong:** English site inherits `jquery` + `vrdl.min.js` from shared layout for parity. Lighthouse 100/100 goal missed on article pages.

**Prevention:** EN site uses slim layout without legacy JS for MVP; Czech keeps until audited; document explicit JS budget in EN `BaseLayout`.

**Detection:** Lighthouse performance < 100 on EN guide page with only markdown content.

**Phase:** **michalek.dev site** + **Performance polish**.

---

### Pitfall 19: Simultaneous Content URL Convention Change

**What goes wrong:** Migrating thousands of Czech markdown links to `.md` format **during** monorepo move. Mass diff obscures real regressions; link checker times out.

**Prevention:** Freeze Czech content link format until post-cutover; EN pilot content uses `.md` links from day one; batch Czech link migration as separate phase.

**Detection:** PR touches `src/content/**/*.md` with hundreds of URL replacements alongside structural moves.

**Phase:** **Content adaptation** (EN only) — defer Czech mass link rewrite.

---

### Pitfall 20: Environment Variables and Analytics Scattered

**What goes wrong:** FTP deploy needed no env vars; Vercel needs per-project env (analytics, future forms). Secrets assumed global across two projects.

**Prevention:** Document env matrix per Vercel project; use preview vs production scopes; no secrets in `astro.config.mjs`.

**Phase:** **Vercel migration**.

---

## Minor Pitfalls

### Pitfall 21: `changed-files-integration` and FTP Manifest Mental Model

**What goes wrong:** Team optimizes incremental deploy using `.astro/dist-manifest.json` — irrelevant on Vercel Git integration.

**Prevention:** Remove or disable for Vercel; rely on Vercel build cache / Turborepo if needed.

**Phase:** **Vercel migration**.

---

### Pitfall 22: Dead `@astrojs/sitemap` Dependency Confusion

**What goes wrong:** Package installed but unused (bug workaround). Monorepo adds it to shared deps twice; someone re-enables without fixing `reduce` bug.

**Prevention:** Re-test sitemap integration per Astro 4.x once in monorepo; if still broken, keep custom sitemap but **parameterize `site`**.

**Phase:** **packages/shared extraction**.

---

### Pitfall 23: Pilot Scope Creep (Podcast, Newsletter, Full Guide Mirror)

**What goes wrong:** EN site grows to mirror příručka TOC, podcast episodes, Mailchimp — MVP never ships.

**Prevention:** Enforce PROJECT.md out-of-scope list in phase gates; 8 articles + homepage + `/martin` only.

**Phase:** **Content adaptation** (scope control).

---

### Pitfall 24: Brand Mixing on michalek.dev

**What goes wrong:** EN header/footer reuse Czech “Vzhůru dolů” branding literally; weak personal brand positioning.

**Prevention:** Separate `siteConfig` per app (title, nav, footer, social); shared only at design-token level (CSS), not copy.

**Phase:** **michalek.dev site**.

---

### Pitfall 25: No PR Build Gate During Monorepo Refactor

**What goes wrong:** Only secret-scan CI on PRs; broken monorepo merges to `main`; deploy fails at Vercel or worse deploys partial site.

**Prevention:** CI matrix: `build` for `apps/vzhurudolu` and `apps/michalek-dev` on every PR (CONCERNS.md recommendation).

**Phase:** **Monorepo scaffold** (Day 1).

---

## Phase-Specific Warnings

| Phase | Likely Pitfall | Mitigation | Warning Signs |
|-------|----------------|------------|---------------|
| **Monorepo scaffold** | Dependency hoisting; no per-app builds | Each app owns deps; CI matrix builds | Empty `apps/*/package.json`; root-only `astro` |
| **Monorepo scaffold** | Triple big-bang release plan | Split milestones; Czech-first on FTP | One “launch” phase covering DNS + EN |
| **packages/shared extraction** | Markdown pipeline regression | Move-only PR; `createMarkdownConfig()` | Plugin order changed “while here” |
| **packages/shared extraction** | Hardcoded Czech URLs in utilities | Parameterize `site`, link prefix | `custom-sitemap.ts` constant unchanged |
| **michalek.dev site** | `i18n.domains` + SSR creep | Two static apps, two Vercel projects | `output: 'server'` appears |
| **michalek.dev site** | jQuery/Lighthouse failure | Slim EN layout | Perf audit deferred to “later” |
| **Content adaptation** | Translation not adaptation | Editorial checklist; native EN for `/martin` | Czech examples in EN drafts |
| **Content adaptation** | Slug mismatch for language switch | `translationKey` + verified `alternateUrl` | Manual switch URLs to 404 |
| **i18n linking & SEO** | Broken hreflang graph | Build-time reciprocity validation | GSC “no return tags” |
| **i18n linking & SEO** | EN sitemap/RSS includes CZ-only content | Per-app feed scope | Podcast in EN RSS |
| **Vercel migration** | `.htaccess` not ported | Redirect audit → `vercel.json` | Preview 404 on `/p/*` shortcuts |
| **Vercel migration** | Middleware assumed production | Port redirects to `vercel.json` | Works in dev only |
| **Vercel migration** | Trailing-slash duplicates | `trailingSlash: false` in Vercel + Astro | Both `/x` and `/x/` return 200 |
| **Vercel migration** | DNS/SSL big-bang | Lower TTL; staged domain cutover | Same-day both domains + code freeze |
| **Vercel migration** | `public/` 685 MB copy | Audit legacy assets; `.vercelignore` | Build timeout after monorepo |
| **Performance polish** | Unnecessary JS on EN | Zero JS default; audit Czech legacy separately | `jquery` in EN `package.json` |
| **Post-cutover** | FTP workflow disabled too early | Keep FTP rollback until soak complete | FTP removed before 48h stable |

---

## Pitfall Interaction Map

High-risk combinations that compound:

```
Monorepo extract (P9) + Shared sitemap (P3)
  → Czech sitemap wrong during EN work

Vercel cutover (P4,P5,P6) without redirect audit
  → SEO cliff + 404 spike on legacy URLs

Hreflang (P8) + Slug adaptation (P10)
  → Language switch 404 + ignored hreflang cluster

685 MB public/ (P12) + Vercel timeout (P13)
  → Deploy failure on launch day

Triple big-bang (P1) + No PR CI (P25)
  → Unrecoverable broken main at DNS switch
```

**Recommended risk ordering:** P25 → P2 → P16 → P9 → P3 → P14 → P7 → content (P8,P10) → P4,P5,P6,P11 → P12 → DNS.

---

## Detection Checklist (Pre-Cutover)

Run before any production DNS change:

- [ ] `npm run build` succeeds from `apps/vzhurudolu` and `apps/michalek-dev` on clean CI runner
- [ ] Vercel preview URLs: top 20 legacy redirects from `.htaccess` sample return 308/301 to correct target
- [ ] `curl -I` trailing-slash pairs return 308 to canonical (no double 200)
- [ ] Czech sitemap `loc` hosts are `www.vzhurudolu.cz` only; EN sitemap `loc` hosts are `michalek.dev` only
- [ ] 8 pilot pairs: language switch + hreflang reciprocal links verified
- [ ] No draft blog URLs return 200 in either sitemap
- [ ] EN Lighthouse ≥ 99 performance on `/guide/{pilot}`, `/blog/{pilot}`, `/martin`
- [ ] DNS TTL ≤ 300s; SSL green on both custom domains on preview
- [ ] `public/data/` exposure intentional or blocked

---

## Sources

| Source | Confidence | Used for |
|--------|------------|----------|
| [Astro troubleshooting — monorepo deps](https://docs.astro.build/en/guides/troubleshooting/#adding-dependencies-to-astro-in-a-monorepo) | HIGH | P2 |
| [Astro i18n routing / domains](https://docs.astro.build/en/guides/internationalization/) | HIGH | P7 (SSR requirement) |
| [Vercel monorepos](https://vercel.com/docs/monorepos) | HIGH | P13 |
| [Vercel vercel.json trailingSlash](https://vercel.com/docs/project-configuration/vercel-json#trailingslash) | HIGH | P6 |
| [Vercel zero-downtime migration KB](https://vercel.com/kb/guide/zero-downtime-migration) | HIGH | P11 |
| [withastro/astro#9525 monorepo integrations](https://github.com/withastro/astro/issues/9525) | HIGH | P2 |
| [withastro/astro#7600 Vercel outDir monorepo](https://github.com/withastro/astro/issues/7600) | MEDIUM | P13 |
| `.planning/codebase/CONCERNS.md` | HIGH | P3,P9,P12,P15,P16,P25 |
| `.planning/PROJECT.md` | HIGH | Scope, architecture intent |
| `public/.htaccess`, `astro.config.mjs`, `custom-sitemap.ts`, `middleware.ts` | HIGH | P4,P5,P6,P3 |
| Community: trailing slash on Astro+Vercel (njakob.com, noahflk.com) | MEDIUM | P6 |
| Community: hreflang reciprocity (better-i18n.com, DEV trilingual Astro) | MEDIUM | P8 |
| Community: localization vs translation (wskpf.com, ElevaSEO) | MEDIUM | P10 |

---

*Pitfalls research for milestone: monorepo + michalek.dev + Vercel cutover. Feeds roadmap phase ordering and verification gates.*
