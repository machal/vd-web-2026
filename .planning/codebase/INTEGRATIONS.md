# External Integrations

**Analysis Date:** 2026-06-06

## APIs & External Services

**CDN / Media hosting:**
- **Cloudinary** — Hosts blog, podcast, and prirucka images and videos referenced by URL in Markdown content
  - SDK/Client: None — static URLs only (e.g. `https://res.cloudinary.com/vzhurudolu-cz/image/upload/...`)
  - Auth: Not applicable (public CDN URLs embedded in content)
  - Usage documented in `README.md`; no build-time Cloudinary API calls

**Newsletter:**
- **Mailchimp (Intuit)** — Email subscription form on `/email`
  - SDK/Client: Native HTML form POST (no Mailchimp SDK)
  - Endpoint: `https://vzhurudolu.us2.list-manage.com/subscribe/post` with list ID in form action (`src/pages/email.astro`)
  - Auth: Public list ID in form markup; no API keys in repository

**RSS / Syndication:**
- **Native RSS** — Astro endpoint `src/pages/rss.ts` using `@astrojs/rss`; served at `/rss`, linked in `src/layouts/BaseLayout.astro`
- **FeedBurner** — Legacy RSS link in footer (`src/components/Footer.astro`: `https://feeds.feedburner.com/vzhurudolu`); separate from native `/rss` feed

**Podcast platforms (outbound links only, no API):**
- Spotify, Apple Podcasts, TuneIn, Anchor.fm — Linked from `src/pages/podcast/index.astro` and `src/pages/podcast/[...page].astro`
- Audio embeds in content use platform iframes (YouTube, Spotify, SoundCloud) in Markdown, not application code

**Social / Open Graph:**
- **Facebook** — `fb:pages` and `fb:app_id` meta tags in `src/layouts/BaseLayout.astro`; footer link to Facebook page
- **X (Twitter)** — `twitter:site` meta and footer link (`@vzhurudolu`)
- **Instagram** — Footer link only (`src/components/Footer.astro`)

**PWA / Offline:**
- **AMP Service Worker** — Loaded from `https://cdn.ampproject.org/sw/amp-sw.js` in `public/sw.js`; caches static assets and serves `/offline.html`

**Third-party embeds in content (not integrated at app level):**
- YouTube, Twitter/X widgets, SoundCloud, Spotify iframes appear in individual Markdown articles under `src/content/`; loaded by end-user browsers, not by build pipeline

## Data Storage

**Databases:**
- None — Fully static site; all content is Markdown files in `src/content/` built to HTML at compile time

**File Storage:**
- **Local filesystem** — Source assets in `src/assets/`, `src/content/prirucka/assets/`; build output in `dist/`
- **Production server filesystem** — FTP-deployed `dist/` contents; large legacy trees in `public/data/` and `public/files/` (excluded from automated deploy)

**Caching:**
- **Browser / Service Worker** — Asset caching via AMP SW (`public/sw.js`, `CACHE_FIRST` for png/jpg/woff/css/js)
- **No server-side cache** (Redis, Memcached, etc.) — Not applicable for static Apache hosting

## Authentication & Identity

**Auth Provider:**
- None — No user accounts, login, or session management in the Astro application
- Legacy reference to `PHPSESSID` cookie in `src/pages/cookies.astro` (from previous PHP stack; current static site does not set it)

## Monitoring & Observability

**Error Tracking:**
- None — No Sentry, Datadog, or similar SDK in `src/` or `public/assets/js/`

**Analytics:**
- None in application code — No Google Analytics, GTM, Matomo, or Plausible scripts in layouts or committed JS bundles
- Historical analytics references exist only in article content and cookie policy text

**Logs:**
- Build-time logging via Astro/Vite plugins and custom integrations (`src/utils/changed-files-integration.ts`, `src/utils/custom-sitemap.ts`)
- CI logs in GitHub Actions workflows

## CI/CD & Deployment

**Hosting:**
- **Shared Apache hosting** — Static files served from FTP target `www/project/` on production server
- Site URL: `https://www.vzhurudolu.cz`

**CI Pipeline:**
- **GitHub Actions** (`.github/workflows/deploy-ftp.yml`)
  - Trigger: push to `master` or `main`
  - Steps: `npm ci` → `npm run build` → FTP deploy via `SamKirkland/FTP-Deploy-Action@v4.3.6`
  - Incremental sync: FTP action maintains state file on server; `changed-files-integration` logs changed dist files locally
- **Secret scanning** (`.github/workflows/secret-scan.yml`) — Gitleaks on push/PR to `master`/`main`

**Deploy exclusions (FTP):**
- `data/**`, `files/**`, `.git*`, `node_modules/**` — per workflow config; these paths must be managed separately on the server

## Environment Configuration

**Required env vars:**
- None for local build or runtime
- **GitHub Actions secrets** (production deploy only):
  - `FTP_SERVER`
  - `FTP_USERNAME`
  - `FTP_PASSWORD`
- **CI token:** `GITHUB_TOKEN` (automatic) for Gitleaks action

**Secrets location:**
- GitHub repository Settings → Secrets and variables → Actions
- Documented in `README.md`; no secrets committed to repository

## Webhooks & Callbacks

**Incoming:**
- None — Static site with no server-side endpoints except build-time RSS route (`src/pages/rss.ts` generates XML at build; served as static file in `dist/`)

**Outgoing:**
- **Mailchimp subscribe POST** — Browser form submission from `src/pages/email.astro` to `vzhurudolu.us2.list-manage.com`
- **Cloudinary CDN** — Browser fetches images/videos from `res.cloudinary.com` URLs in rendered HTML
- **AMP CDN** — Service worker script fetch from `cdn.ampproject.org` (`public/sw.js`)
- **Social / podcast / video platforms** — Standard outbound links and embeds from article content (YouTube, Spotify, etc.)

---

*Integration audit: 2026-06-06*
