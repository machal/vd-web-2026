import type { Plugin } from 'unified';
import type { Root } from 'hast';

interface FileLike {
  path?: string;
  history?: string[];
}

const DEFAULT_COLLECTIONS = ['prirucka', 'blog', 'podcast'] as const;
const DEFAULT_CONTENT_PATH_PREFIX = '/prirucka';

export interface RehypeContentLinksOptions {
  collections?: readonly string[];
  contentPathPrefix?: string;
}

function getEntityFromFilePath(
  filePath: string | undefined,
  collections: readonly string[],
): string {
  if (!filePath) return collections[0] ?? 'prirucka';
  const normalized = filePath.replace(/\\/g, '/');
  for (const entity of collections) {
    if (normalized.includes(`/content/${entity}/`)) {
      return entity;
    }
  }
  return collections[0] ?? 'prirucka';
}

function entityToUrlPrefix(entity: string, contentPathPrefix: string): string {
  if (entity === 'prirucka') {
    return contentPathPrefix;
  }
  return `/${entity}`;
}

/**
 * Rehype plugin převádí odkazy na .md soubory na finální URL.
 *
 * Platí pro všechny <a href="..."> v HTML (odkazy z Markdownu i z raw HTML).
 */
export function createRehypeContentLinks(
  opts: RehypeContentLinksOptions = {},
): Plugin<[], Root> {
  const collections = opts.collections ?? DEFAULT_COLLECTIONS;
  const contentPathPrefix = opts.contentPathPrefix ?? DEFAULT_CONTENT_PATH_PREFIX;
  const entityPattern = collections.map((entity) =>
    entity.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
  ).join('|');

  return () => {
    return (tree, file: FileLike | undefined) => {
      const currentEntity = getEntityFromFilePath(
        file?.path ?? file?.history?.[0],
        collections,
      );

      function processNode(node: any): void {
        if (node.type === 'element' && node.tagName === 'a' && node.properties?.href) {
          const rawHref = node.properties.href as string;
          // Odkaz může nést fragment nebo query (`foo.md#anchor`) — přepisujeme jen cestu.
          const suffixIndex = rawHref.search(/[#?]/);
          const href = suffixIndex === -1 ? rawHref : rawHref.slice(0, suffixIndex);
          const suffix = suffixIndex === -1 ? '' : rawHref.slice(suffixIndex);

          if (!href.endsWith('.md')) return;
          // Test na schéma, ne na prefix „http“ — jinak vypadne `http-2.md`, `https.md` apod.
          if (/^[a-z][a-z0-9+.-]*:/i.test(href) || href.startsWith('//')) return;

          let newHref: string | null = null;

          if (href.startsWith('/')) {
            const match = href.match(new RegExp(`^/(${entityPattern})/(.+?)\\.md$`));
            if (match) {
              newHref = `${entityToUrlPrefix(match[1], contentPathPrefix)}/${match[2]}`;
            }
          } else if (href.includes('/')) {
            const withoutExt = href.replace(/\.md$/, '');
            const segments = withoutExt.split('/').filter((s) => s && s !== '.');
            while (segments[0] === '..') segments.shift();
            if (segments.length >= 1 && collections.includes(segments[0])) {
              newHref = `${entityToUrlPrefix(segments[0], contentPathPrefix)}/${segments.slice(1).join('/')}`;
            }
          } else {
            const slug = href.replace(/\.md$/, '');
            newHref = `${entityToUrlPrefix(currentEntity, contentPathPrefix)}/${slug}`;
          }

          if (!newHref && href.includes('vzhurudolu.cz/')) {
            const match = href.match(
              new RegExp(`vzhurudolu\\.cz/(${entityPattern})/([^/?#]+)\\.md`),
            );
            if (match) {
              newHref = `${entityToUrlPrefix(match[1], contentPathPrefix)}/${match[2]}`;
            }
          }

          if (newHref) {
            node.properties.href = `${newHref}${suffix}`;
          }
        }

        if (node.children && Array.isArray(node.children)) {
          node.children.forEach(processNode);
        }
      }

      processNode(tree);
    };
  };
}

export const rehypePriruckaLinks = createRehypeContentLinks();
