import { CONTENT_PAIRS } from './pairs.ts';
import type {
  AlternateResult,
  CollectionId,
  ContentRef,
  HreflangCluster,
  SiteId,
} from './types.ts';

export const SITE_ORIGINS: Record<SiteId, string> = {
  vzhurudolu: 'https://www.vzhurudolu.cz',
  'michalek-dev': 'https://michalek.blog',
};

export function resolveContentUrl(ref: ContentRef): string {
  const base = SITE_ORIGINS[ref.site];
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
