import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import MarkdownIt from 'markdown-it';
import sanitizeHtml from 'sanitize-html';
import { isPublished } from '../utils/is-published';

const parser = new MarkdownIt();

function getArticleUrl(entry: { collection: string; slug: string }): string {
  if (entry.collection === 'blog') {
    return `/blog/${entry.slug}`;
  }
  if (entry.collection === 'guide') {
    return `/guide/${entry.slug}`;
  }
  return '/';
}

export async function GET(context: APIContext) {
  const blogPosts = await getCollection('blog', isPublished);
  const guidePosts = await getCollection('guide', isPublished);

  const allContent = [...blogPosts, ...guidePosts]
    .sort((a, b) => {
      const dateA = a.data.date || new Date(0);
      const dateB = b.data.date || new Date(0);
      return dateB.getTime() - dateA.getTime();
    })
    .slice(0, 20);

  const items = allContent.map((entry) => {
    const url = getArticleUrl(entry);
    const pubDate = entry.data.date
      ? entry.data.date instanceof Date
        ? entry.data.date
        : new Date(entry.data.date)
      : new Date();

    let htmlContent = '';
    try {
      if (entry.body) {
        htmlContent = sanitizeHtml(parser.render(entry.body), {
          allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
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
  });

  return rss({
    title: 'Martin Michálek · Web & Performance',
    description: 'Personal tech blog and web performance consulting.',
    site: context.site,
    items,
    customData: '<language>en-us</language>',
  });
}
