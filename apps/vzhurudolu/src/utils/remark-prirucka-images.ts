import type { Plugin } from 'unified';
import type { Root } from 'mdast';

/**
 * Remark plugin, který transformuje cesty k obrázkům příručky v markdown syntaxi.
 *
 * Podporované formáty (všechny se přepíší na /prirucka/images/…webp):
 * - /prirucka/images/nazev.jpg – doporučený, jednoduchý formát
 * - ../dist/images/original/nazev.jpg – legacy
 * - ../dist/images/medium/podslozka/nazev.jpg, ../dist/images/small/… – legacy
 */
export const remarkPriruckaImages: Plugin<[], Root> = () => {
  return (tree) => {
    function processNode(node: any): void {
      if (node.type === 'image' && node.url) {
        let newPath: string | null = null;

        // Nový formát: /prirucka/images/nazev.jpg nebo /prirucka/images/podslozka/nazev.jpg
        const simpleMatch = node.url.match(/^\/prirucka\/images\/(.+\.(jpg|jpeg|png))(?:\?.*)?$/i);
        if (simpleMatch) {
          newPath = simpleMatch[1].replace(/\.(jpg|jpeg|png)(\?.*)?$/i, '.webp');
        }

        // Legacy: ../dist/images/{original|medium|small}/…
        if (!newPath) {
          const legacyMatch = node.url.match(/^\.\.\/dist\/images\/(original|medium|small)\/(.+)$/);
          if (legacyMatch) {
            newPath = legacyMatch[2].replace(/\.(jpg|jpeg|png)(\?.*)?$/i, '.webp');
          }
        }

        if (newPath) {
          node.url = `/prirucka/images/${newPath}`;
        }
      }
      
      // Rekurzivně projít všechny děti
      if (node.children && Array.isArray(node.children)) {
        node.children.forEach(processNode);
      }
    }
    
    processNode(tree);
  };
};
