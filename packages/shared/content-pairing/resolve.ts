import { CONTENT_PAIRS } from './pairs.ts';
import type {
  AlternateResult,
  CollectionId,
  ContentRef,
  HreflangCluster,
  SiteId,
} from './types.ts';

/** Production origins — used in builds and as fallback outside Astro dev. */
export const SITE_ORIGINS: Record<SiteId, string> = {
  vzhurudolu: 'https://www.vzhurudolu.cz',
  'michalek-dev': 'https://michalek.blog',
};

/** Fixed local dev ports (see astro.config server.port in each app). */
const DEV_SITE_ORIGINS: Record<SiteId, string> = {
  vzhurudolu: 'http://localhost:4321',
  'michalek-dev': 'http://localhost:4322',
};

function isAstroDev(): boolean {
  return (
    typeof import.meta !== 'undefined' &&
    (import.meta as ImportMeta & { env?: { DEV?: boolean } }).env?.DEV === true
  );
}

function originFromEnv(site: SiteId): string | undefined {
  const raw =
    site === 'vzhurudolu'
      ? process.env.VZHURUDOLU_URL
      : process.env.MICHALEK_DEV_URL;
  return raw?.replace(/\/$/, '');
}

/** Origins for cross-site links (language switch, hreflang, sister site). */
export function getSiteOrigins(): Record<SiteId, string> {
  const vzhFromEnv = originFromEnv('vzhurudolu');
  const enFromEnv = originFromEnv('michalek-dev');

  if (vzhFromEnv || enFromEnv) {
    return {
      vzhurudolu: vzhFromEnv ?? SITE_ORIGINS.vzhurudolu,
      'michalek-dev': enFromEnv ?? SITE_ORIGINS['michalek-dev'],
    };
  }

  if (isAstroDev()) {
    return DEV_SITE_ORIGINS;
  }

  return SITE_ORIGINS;
}

export function getSiteOrigin(site: SiteId): string {
  return getSiteOrigins()[site];
}

export function resolveContentUrl(ref: ContentRef): string {
  const base = getSiteOrigin(ref.site);
  switch (ref.collection) {
    case 'blog':
      return `${base}/blog/${ref.key}`;
    case 'prirucka':
      return `${base}/prirucka/${ref.key}`;
    case 'guide':
      return `${base}/guide/${ref.key}`;
    case 'page':
      return `${base}${ref.key}`;
  }
}

function findPair(
  currentSite: SiteId,
  collection: CollectionId,
  key: string,
) {
  return CONTENT_PAIRS.find(
    (p) =>
      (p.cs.site === currentSite && p.cs.collection === collection && p.cs.key === key) ||
      (p.en.site === currentSite && p.en.collection === collection && p.en.key === key),
  );
}

export function resolveAlternate(
  currentSite: SiteId,
  collection: CollectionId,
  key: string,
): AlternateResult | undefined {
  const pair = findPair(currentSite, collection, key);
  if (!pair) return undefined;

  const onCsSide =
    pair.cs.site === currentSite &&
    pair.cs.collection === collection &&
    pair.cs.key === key;
  const target = onCsSide ? pair.en : pair.cs;
  return {
    locale: onCsSide ? 'en' : 'cs',
    href: resolveContentUrl(target),
    pairId: pair.pairId,
  };
}

export function resolveHreflangCluster(
  currentSite: SiteId,
  collection: CollectionId,
  key: string,
): HreflangCluster | undefined {
  const pair = findPair(currentSite, collection, key);
  if (!pair) return undefined;

  const csUrl = resolveContentUrl(pair.cs);
  const enUrl = resolveContentUrl(pair.en);
  return {
    csUrl,
    enUrl,
    xDefaultUrl: enUrl,
  };
}
