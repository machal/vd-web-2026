import type { Plugin } from 'unified';
import type { Root } from 'mdast';

export interface RemarkPriruckaImagesOptions {
  imagesPrefix?: string;
}

/**
 * Remark plugin, který transformuje cesty k obrázkům příručky v markdown syntaxi.
 *
 * Podporované formáty (všechny se přepíší na {imagesPrefix}/…webp):
 * - /prirucka/images/nazev.jpg – doporučený, jednoduchý formát
 * - ../dist/images/original/nazev.jpg – legacy
 * - ../dist/images/medium/podslozka/nazev.jpg, ../dist/images/small/… – legacy
 */
export function createRemarkPriruckaImages(
  opts: RemarkPriruckaImagesOptions = {},
): Plugin<[], Root> {
  const imagesPrefix = opts.imagesPrefix ?? '/prirucka/images';
  const prefixPattern = imagesPrefix.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  return () => {
    return (tree) => {
      function processNode(node: any): void {
        if (node.type === 'image' && node.url) {
          let newPath: string | null = null;

          const simpleMatch = node.url.match(
            new RegExp(`^${prefixPattern}/(.+\\.(jpg|jpeg|png))(?:\\?.*)?$`, 'i'),
          );
          if (simpleMatch) {
            newPath = simpleMatch[1].replace(/\.(jpg|jpeg|png)(\?.*)?$/i, '.webp');
          }

          if (!newPath) {
            const legacyMatch = node.url.match(/^\.\.\/dist\/images\/(original|medium|small)\/(.+)$/);
            if (legacyMatch) {
              newPath = legacyMatch[2].replace(/\.(jpg|jpeg|png)(\?.*)?$/i, '.webp');
            }
          }

          if (newPath) {
            node.url = `${imagesPrefix}/${newPath}`;
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

export const remarkPriruckaImages = createRemarkPriruckaImages();
