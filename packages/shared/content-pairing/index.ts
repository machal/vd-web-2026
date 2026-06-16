export { CONTENT_PAIRS } from './pairs.ts';
export {
  getSiteOrigin,
  getSiteOrigins,
  resolveAlternate,
  resolveContentUrl,
  resolveHreflangCluster,
  SITE_ORIGINS,
} from './resolve.ts';
export { validateContentPairs } from './validate.ts';
export type {
  AlternateResult,
  CollectionId,
  ContentPair,
  ContentRef,
  FrontmatterEntry,
  HreflangCluster,
  SiteId,
  ValidateOptions,
  ValidateResult,
} from './types.ts';
