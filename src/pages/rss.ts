import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';

const parser = new MarkdownIt();

// Získání URL pro článek podle typu kolekce
function getArticleUrl(entry: any, site: string): string {
  if (entry.collection === 'blog') {
    return `/blog/${entry.slug}`;
  } else if (entry.collection === 'podcast') {
    return `/podcast/${entry.slug}`;
  } else if (entry.collection === 'prirucka') {
    return `/prirucka/${entry.data.id}`;
  }
  return '/';
}

// Získání perexu/excerptu podle typu kolekce
function getExcerpt(entry: any): string {
  if (entry.collection === 'prirucka') {
    return entry.data.perex || entry.data.description || '';
  } else {
    return entry.data.excerpt || entry.data.description || '';
  }
}

export async function GET(context: APIContext) {
  // Načtení všech kolekcí
  const blogPosts = await getCollection('blog');
  const podcasts = await getCollection('podcast');
  // Filtrovat pouze články s front matter (mají id)
  const priruckaPosts = await getCollection('prirucka', (entry) => !!entry.data.id);

  // Filtrování a spojení všech článků
  const allContent = [...blogPosts, ...podcasts, ...priruckaPosts]
    .filter(post => {
      // Kontrola include_rss flagu
      const includeRss = post.data.include_rss;
      if (includeRss === false || includeRss === 'false') {
        return false;
      }
      
      // Filtrování podle published statusu
      if (post.collection === 'prirucka') {
        return post.data.published === true;
      } else {
        return post.data.published !== false;
      }
    })
    .sort((a, b) => {
      const dateA = a.data.date || new Date(0);
      const dateB = b.data.date || new Date(0);
      return dateB.getTime() - dateA.getTime();
    })
    .slice(0, 10); // Omezení na 10 článků

  // Generování RSS items s full content
  const items = allContent.map((entry) => {
    const url = getArticleUrl(entry, context.site?.href || '');
    const excerpt = getExcerpt(entry);
    const pubDate = entry.data.date 
      ? entry.data.date instanceof Date ? entry.data.date : new Date(entry.data.date)
      : new Date();

    // Renderování full HTML content z Markdown body
    let htmlContent = '';
    try {
      // entry.body obsahuje raw Markdown
      if (entry.body) {
        htmlContent = sanitizeHtml(parser.render(entry.body), {
          allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img'])
        });
      }
    } catch (error) {
      console.error('Error rendering content for', entry.slug || entry.data.id, error);
      htmlContent = '';
    }

    return {
      title: entry.data.title || '',
      link: url,
      description: excerpt,
      pubDate: pubDate,
      content: htmlContent,
    };
  });

  return rss({
    title: 'Vzhůru dolů',
    description: 'Současný webový frontend.',
    site: context.site,
    items: items,
    customData: '<language>cs-cz</language>',
  });
}
