import { resolveAlternate, resolveContentUrl } from './resolve.ts';
import type {
  ContentPair,
  FrontmatterEntry,
  ValidateOptions,
  ValidateResult,
} from './types.ts';

function refKey(ref: FrontmatterEntry): string {
  return `${ref.site}:${ref.collection}:${ref.key}`;
}

function pairRefMatches(ref: FrontmatterEntry, pairRef: ContentPair['cs']): boolean {
  return (
    ref.site === pairRef.site &&
    ref.collection === pairRef.collection &&
    ref.key === pairRef.key
  );
}

export function validateContentPairs(
  manifest: ContentPair[],
  options: ValidateOptions = {},
): ValidateResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  const { checkContentFiles = false, frontmatterIndex } = options;

  const pairIds = new Set<string>();
  const refKeys = new Set<string>();
  for (const pair of manifest) {
    if (pairIds.has(pair.pairId)) {
      errors.push(`Duplicate pairId in manifest: ${pair.pairId}`);
    }
    pairIds.add(pair.pairId);

    for (const ref of [pair.cs, pair.en]) {
      if (!ref) continue;
      const key = refKey(ref);
      if (refKeys.has(key)) {
        errors.push(`Duplicate content ref in manifest: ${key}`);
      }
      refKeys.add(key);
    }

    if (!pair.cs || !pair.en) {
      errors.push(`Orphan pair missing cs or en side: ${pair.pairId}`);
      continue;
    }

    const csAlt = resolveAlternate(pair.cs.site, pair.cs.collection, pair.cs.key);
    const enAlt = resolveAlternate(pair.en.site, pair.en.collection, pair.en.key);

    if (!csAlt) {
      errors.push(`CS ref not found in manifest lookup: ${pair.pairId}`);
    } else if (csAlt.href !== resolveContentUrl(pair.en)) {
      errors.push(`Broken reciprocity for ${pair.pairId}: CS→EN mismatch`);
    }

    if (!enAlt) {
      errors.push(`EN ref not found in manifest lookup: ${pair.pairId}`);
    } else if (enAlt.href !== resolveContentUrl(pair.cs)) {
      errors.push(`Broken reciprocity for ${pair.pairId}: EN→CS mismatch`);
    }

    if (csAlt && enAlt) {
      const roundTripCs = resolveAlternate(
        pair.en.site,
        pair.en.collection,
        pair.en.key,
      );
      if (roundTripCs?.href !== resolveContentUrl(pair.cs)) {
        errors.push(`Round-trip CS URL mismatch for ${pair.pairId}`);
      }
    }

    if (checkContentFiles) {
      // File existence checks are performed by validate-content-pairs.mjs CLI
    }
  }

  if (frontmatterIndex) {
    for (const [pairId, entries] of frontmatterIndex) {
      const pair = manifest.find((p) => p.pairId === pairId);
      if (!pair) {
        errors.push(`Front matter pairId not in manifest: ${pairId}`);
        continue;
      }

      for (const entry of entries) {
        const matchesCs = pairRefMatches(entry, pair.cs);
        const matchesEn = pairRefMatches(entry, pair.en);
        if (!matchesCs && !matchesEn) {
          errors.push(
            `Front matter pairId "${pairId}" mismatch for ${refKey(entry)} — expected manifest cs or en ref`,
          );
        }
      }
    }
  }

  return {
    ok: errors.length === 0,
    errors,
    warnings,
  };
}
