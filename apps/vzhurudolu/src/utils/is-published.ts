import type { CollectionEntry } from 'astro:content';

type PublishableEntry =
  | CollectionEntry<'blog'>
  | CollectionEntry<'podcast'>
  | CollectionEntry<'prirucka'>;

export function isPublished(entry: PublishableEntry): boolean {
  if (entry.collection === 'prirucka') {
    return !!entry.data.id && entry.data.published === true;
  }
  return entry.data.published === true;
}
