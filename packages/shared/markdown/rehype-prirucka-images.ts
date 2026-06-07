import type { Plugin } from 'unified';
import type { Root } from 'hast';

/**
 * Rehype plugin, který transformuje cesty k obrázkům příručky v hotovém HTML.
 *
 * Podporované formáty (všechny se přepíší na /prirucka/images/…webp):
 * - /prirucka/images/nazev.jpg – doporučený, jednoduchý formát
 * - ../dist/images/original/nazev.jpg – legacy
 * - ../dist/images/medium|small/… – legacy
 */
export const rehypePriruckaImages: Plugin<[], Root> = () => {
  return (tree) => {
    function processNode(node: any): void {
      if (node.type === 'element' && node.tagName === 'img' && node.properties?.src) {
        const src = node.properties.src as string;
        let newPath: string | null = null;

        // Nový formát: /prirucka/images/nazev.jpg
        const simpleMatch = src.match(/^\/prirucka\/images\/(.+\.(jpg|jpeg|png))(?:\?.*)?$/i);
        if (simpleMatch) {
          newPath = simpleMatch[1].replace(/\.(jpg|jpeg|png)(\?.*)?$/i, '.webp');
        }

        // Legacy: ../dist/images/{original|medium|small}/…
        if (!newPath) {
          const legacyMatch = src.match(/^\.\.\/dist\/images\/(original|medium|small)\/(.+)$/);
          if (legacyMatch) {
            newPath = legacyMatch[2].replace(/\.(jpg|jpeg|png)(\?.*)?$/i, '.webp');
          }
        }

        if (newPath) {
          node.properties.src = `/prirucka/images/${newPath}`;
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
