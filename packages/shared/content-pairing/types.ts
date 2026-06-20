export type SiteId = 'vzhurudolu' | 'michalek-dev';

export type CollectionId = 'blog' | 'prirucka' | 'guide' | 'page';

export interface ContentRef {
  site: SiteId;
  collection: CollectionId;
  /** blog: slug; prirucka: frontmatter id; guide: slug; page: path e.g. '/martin' */
  key: string;
}

export interface ContentPair {
  pairId: string;
  cs: ContentRef;
  en: ContentRef;
}

export interface AlternateResult {
  locale: 'cs' | 'en';
  href: string;
  pairId: string;
}

export interface HreflangCluster {
  csUrl: string;
  enUrl: string;
  xDefaultUrl: string;
}

export interface FrontmatterEntry {
  site: SiteId;
  collection: CollectionId;
  key: string;
}

export interface ValidateOptions {
  checkContentFiles?: boolean;
  frontmatterIndex?: Map<string, FrontmatterEntry[]>;
}

export interface ValidateResult {
  ok: boolean;
  errors: string[];
  warnings: string[];
}
