import type { Plugin } from 'unified';
import type { Root } from 'hast';

interface FileLike {
  path?: string;
  history?: string[];
}

const CONTENT_ENTITIES = ['prirucka', 'blog', 'podcast'] as const;
type ContentEntity = (typeof CONTENT_ENTITIES)[number];

function getEntityFromFilePath(filePath: string | undefined): ContentEntity {
  if (!filePath) return 'prirucka';
  const normalized = filePath.replace(/\\/g, '/');
  if (normalized.includes('/content/blog/')) return 'blog';
  if (normalized.includes('/content/podcast/')) return 'podcast';
  if (normalized.includes('/content/prirucka/')) return 'prirucka';
  return 'prirucka';
}

/**
 * Rehype plugin převádí odkazy na .md soubory na finální URL.
 *
 * Platí pro všechny <a href="..."> v HTML (odkazy z Markdownu i z raw HTML).
 *
 * Pravidla:
 * - odkaz.md (bez cesty) → /aktuální-entita/odkaz (entita z cesty souboru: prirucka, blog, podcast)
 * - ../entita/odkaz.md → /entita/odkaz (vždy podle cesty v odkaze)
 * - /entita/odkaz.md → /entita/odkaz
 *
 * Nemění:
 * - externí odkazy (http://, https://, //)
 * - nečlánkové části webu – cesty bez .md (např. /blog, /podcast, /kurzy, /martin) zůstávají jak jsou
 */
export const rehypePriruckaLinks: Plugin<[], Root> = () => {
  return (tree, file: FileLike | undefined) => {
    const currentEntity = getEntityFromFilePath(file?.path ?? file?.history?.[0]);

    function processNode(node: any): void {
      if (node.type === 'element' && node.tagName === 'a' && node.properties?.href) {
        const href = node.properties.href as string;

        if (!href.endsWith('.md')) return;
        if (href.startsWith('http') || href.startsWith('//')) return;

        let newHref: string | null = null;

        // Už je absolutní cesta začínající / (např. /prirucka/xxx.md, /blog/xxx.md)
        if (href.startsWith('/')) {
          const match = href.match(/^\/(prirucka|blog|podcast)\/(.+?)\.md$/);
          if (match) newHref = `/${match[1]}/${match[2]}`;
        }
        // Relativní cesta: obsahuje / (např. ../blog/258-ai-programovani-psani.md)
        else if (href.includes('/')) {
          const withoutExt = href.replace(/\.md$/, '');
          const segments = withoutExt.split('/').filter((s) => s && s !== '.');
          while (segments[0] === '..') segments.shift();
          if (segments.length >= 1 && CONTENT_ENTITIES.includes(segments[0] as ContentEntity)) {
            newHref = '/' + segments.join('/');
          }
        }
        // Pouze název souboru (např. css-grid.md) → aktuální entita
        else {
          const slug = href.replace(/\.md$/, '');
          newHref = `/${currentEntity}/${slug}`;
        }

        // Plná URL vzhurudolu.cz/entita/xxx.md (fallback)
        if (!newHref && href.includes('vzhurudolu.cz/')) {
          const match = href.match(/vzhurudolu\.cz\/(prirucka|blog|podcast)\/([^/?#]+)\.md/);
          if (match) newHref = `/${match[1]}/${match[2]}`;
        }

        if (newHref) {
          node.properties.href = newHref;
        }
      }

      if (node.children && Array.isArray(node.children)) {
        node.children.forEach(processNode);
      }
    }

    processNode(tree);
  };
};
