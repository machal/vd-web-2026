import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { isPublished } from '../utils/is-published';
import type { APIContext } from 'astro';
import { renderMarkdownForRss, buildRssCustomData } from '@vd/shared/markdown/render-for-rss';

function getSiteOrigin(site: APIContext['site']): string {
  if (!site) return 'https://www.vzhurudolu.cz';
  return (typeof site === 'string' ? site : site.href).replace(/\/$/, '');
}

function getArticleUrl(entry: { collection: string; slug: string; data: { id?: string } }): string {
  if (entry.collection === 'blog') {
    return `/blog/${entry.slug}`;
  }
  if (entry.collection === 'podcast') {
    return `/podcast/${entry.data.postID}-${entry.slug}`;
  }
  if (entry.collection === 'prirucka') {
    return `/prirucka/${entry.data.id}`;
  }
  return '/';
}

function getExcerpt(entry: {
  collection: string;
  data: { perex?: string; description?: string; excerpt?: string };
}): string {
  if (entry.collection === 'prirucka') {
    return entry.data.perex || entry.data.description || '';
  }
  return entry.data.excerpt || entry.data.description || '';
}

function getSourcePath(entry: { collection: string; slug: string }): string {
  return `/content/${entry.collection}/${entry.slug}.md`;
}

export async function GET(context: APIContext) {
  const siteOrigin = getSiteOrigin(context.site);
  const blogPosts = await getCollection('blog', isPublished);
  const podcasts = await getCollection('podcast', isPublished);
  const priruckaPosts = await getCollection('prirucka', isPublished);

  const allContent = [...blogPosts, ...podcasts, ...priruckaPosts]
    .filter((post) => {
      const includeRss = post.data.include_rss;
      if (includeRss === false || includeRss === 'false') {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      const dateA = a.data.date || new Date(0);
      const dateB = b.data.date || new Date(0);
      return dateB.getTime() - dateA.getTime();
    })
    .slice(0, 10);

  const items = await Promise.all(
    allContent.map(async (entry) => {
      const url = getArticleUrl(entry);
      const excerpt = getExcerpt(entry);
      const pubDate = entry.data.date
        ? entry.data.date instanceof Date
          ? entry.data.date
          : new Date(entry.data.date)
        : new Date();

      let htmlContent = '';
      try {
        if (entry.body) {
          htmlContent = await renderMarkdownForRss(entry.body, {
            contentPathPrefix: '/prirucka',
            guideImagesPrefix: '/prirucka/images',
            collections: ['prirucka', 'blog', 'podcast'],
            sourcePath: getSourcePath(entry),
            siteOrigin,
          });
        }
      } catch (error) {
        console.error('Error rendering RSS content for', entry.slug || entry.data.id, error);
      }

      return {
        title: entry.data.title || '',
        link: url,
        description: excerpt,
        pubDate,
        content: htmlContent,
      };
    }),
  );

  return rss({
    title: 'Vzhůru dolů',
    description: 'Současný webový frontend.',
    site: context.site,
    items,
    customData: buildRssCustomData('cs-CZ', siteOrigin),
  });
}
