import type { CollectionEntry } from 'astro:content';
import { getCollection } from 'astro:content';
import { isPublished } from './is-published';

export type HomepageFeedEntry =
  | CollectionEntry<'blog'>
  | CollectionEntry<'podcast'>
  | CollectionEntry<'prirucka'>;

/** Number of posts on `/` (homepage). */
export const HOMEPAGE_POSTS_PER_PAGE = 5;

/** Number of posts on `/p=2`, `/p=3`, … */
export const PAGINATED_POSTS_PER_PAGE = 10;

export async function getHomepageFeed(): Promise<HomepageFeedEntry[]> {
  const blogPosts = await getCollection('blog', isPublished);
  const podcasts = await getCollection('podcast', isPublished);
  const priruckaPosts = await getCollection('prirucka', isPublished);

  return [...blogPosts, ...podcasts, ...priruckaPosts]
    .filter((post) => {
      if (post.collection === 'prirucka' && post.data.title === post.data.id) return false;
      return true;
    })
    .sort((a, b) => {
      const dateA = a.data.date || new Date(0);
      const dateB = b.data.date || new Date(0);
      return dateB.getTime() - dateA.getTime();
    });
}

export function getHomepageTotalPages(contentLength: number): number {
  if (contentLength <= HOMEPAGE_POSTS_PER_PAGE) return 1;
  return 1 + Math.ceil((contentLength - HOMEPAGE_POSTS_PER_PAGE) / PAGINATED_POSTS_PER_PAGE);
}

export function getHomepagePageSlice<T>(allContent: T[], page: number): T[] {
  if (page <= 1) {
    return allContent.slice(0, HOMEPAGE_POSTS_PER_PAGE);
  }

  const startIndex = HOMEPAGE_POSTS_PER_PAGE + (page - 2) * PAGINATED_POSTS_PER_PAGE;
  return allContent.slice(startIndex, startIndex + PAGINATED_POSTS_PER_PAGE);
}
