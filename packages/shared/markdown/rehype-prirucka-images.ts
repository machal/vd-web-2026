import type { Plugin } from 'unified';
import type { Root } from 'hast';

export interface RehypePriruckaImagesOptions {
  imagesPrefix?: string;
}

/**
 * Rehype plugin, který transformuje cesty k obrázkům příručky v hotovém HTML.
 *
 * Podporované formáty (všechny se přepíší na {imagesPrefix}/…webp):
 * - /prirucka/images/nazev.jpg – doporučený, jednoduchý formát
 * - ../dist/images/original/nazev.jpg – legacy
 * - ../dist/images/medium|small/… – legacy
 */
export function createRehypePriruckaImages(
  opts: RehypePriruckaImagesOptions = {},
): Plugin<[], Root> {
  const imagesPrefix = opts.imagesPrefix ?? '/prirucka/images';
  const prefixPattern = imagesPrefix.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  return () => {
    return (tree) => {
      function processNode(node: any): void {
        if (node.type === 'element' && node.tagName === 'img' && node.properties?.src) {
          const src = node.properties.src as string;
          let newPath: string | null = null;

          const simpleMatch = src.match(
            new RegExp(`^${prefixPattern}/(.+\\.(jpg|jpeg|png))(?:\\?.*)?$`, 'i'),
          );
          if (simpleMatch) {
            newPath = simpleMatch[1].replace(/\.(jpg|jpeg|png)(\?.*)?$/i, '.webp');
          }

          if (!newPath) {
            const legacyMatch = src.match(/^\.\.\/dist\/images\/(original|medium|small)\/(.+)$/);
            if (legacyMatch) {
              newPath = legacyMatch[2].replace(/\.(jpg|jpeg|png)(\?.*)?$/i, '.webp');
            }
          }

          if (newPath) {
            node.properties.src = `${imagesPrefix}/${newPath}`;
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

export const rehypePriruckaImages = createRehypePriruckaImages();
