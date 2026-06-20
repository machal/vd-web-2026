import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { renderMarkdownForRss, buildRssCustomData } from '@vd/shared/markdown/render-for-rss';

function getSiteOrigin(site: APIContext['site']): string {
  if (!site) return 'https://michalek.blog';
  return (typeof site === 'string' ? site : site.href).replace(/\/$/, '');
}
import { isPublished } from '../utils/is-published';

function getArticleUrl(entry: { collection: string; slug: string }): string {
  if (entry.collection === 'blog') {
    return `/blog/${entry.slug}`;
  }
  if (entry.collection === 'guide') {
    return `/guide/${entry.slug}`;
  }
  return '/';
}

function getSourcePath(entry: { collection: string; slug: string }): string {
  return `/content/${entry.collection}/${entry.slug}.md`;
}

export async function GET(context: APIContext) {
  const siteOrigin = getSiteOrigin(context.site);
  const blogPosts = await getCollection('blog', isPublished);
  const guidePosts = await getCollection('guide', isPublished);

  const allContent = [...blogPosts, ...guidePosts]
    .sort((a, b) => {
      const dateA = a.data.date || new Date(0);
      const dateB = b.data.date || new Date(0);
      return dateB.getTime() - dateA.getTime();
    })
    .slice(0, 20);

  const items = await Promise.all(
    allContent.map(async (entry) => {
      const url = getArticleUrl(entry);
      const pubDate = entry.data.date
        ? entry.data.date instanceof Date
          ? entry.data.date
          : new Date(entry.data.date)
        : new Date();

      let htmlContent = '';
      try {
        if (entry.body) {
          htmlContent = await renderMarkdownForRss(entry.body, {
            contentPathPrefix: '/guide',
            guideImagesPrefix: '/prirucka/images',
            collections: ['blog', 'guide'],
            sourcePath: getSourcePath(entry),
            siteOrigin,
          });
        }
      } catch (error) {
        console.error('Error rendering RSS content for', entry.slug, error);
      }

      return {
        title: entry.data.title || '',
        link: url,
        description: entry.data.description || '',
        pubDate,
        content: htmlContent,
      };
    }),
  );

  return rss({
    title: 'Martin Michálek · Web & Performance',
    description: 'Personal tech blog and web performance consulting.',
    site: context.site,
    items,
    customData: buildRssCustomData('en-us', siteOrigin),
  });
}
