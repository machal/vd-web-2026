import type { CollectionEntry } from 'astro:content';

type PublishableEntry = CollectionEntry<'blog'> | CollectionEntry<'guide'>;

export function isPublished(entry: PublishableEntry): boolean {
  if (entry.collection === 'guide') {
    return !!entry.data.title && entry.data.published === true;
  }
  return entry.data.published === true;
}
