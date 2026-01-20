import type { Plugin } from 'unified';
import type { Root } from 'mdast';

/**
 * Remark plugin, který transformuje cesty k obrázkům příručky v markdown syntaxi.
 * 
 * Transformuje cesty z markdown souborů:
 * - ![alt](../dist/images/original/typografie-16.jpg) -> ![alt](/prirucka/images/typografie-16.webp)
 * - ![alt](../dist/images/medium/vdlayout/schema.jpg) -> ![alt](/prirucka/images/vdlayout/schema.webp)
 * - ![alt](../dist/images/small/vdlayout/schema.jpg) -> ![alt](/prirucka/images/vdlayout/schema.webp)
 * 
 * Změní cestu z ../dist/images/{original|medium|small}/ na /prirucka/images/ a příponu na .webp
 * Tento plugin běží v remark fázi, předtím než Astro zpracuje obrázky jako assets.
 */
export const remarkPriruckaImages: Plugin<[], Root> = () => {
  return (tree) => {
    function processNode(node: any): void {
      // Zpracovat image nody
      if (node.type === 'image' && node.url) {
        // Transformovat cesty začínající na ../dist/images/{original|medium|small}/
        const imagePathMatch = node.url.match(/^\.\.\/dist\/images\/(original|medium|small)\/(.+)$/);
        if (imagePathMatch) {
          // imagePathMatch[2] obsahuje relativní cestu k obrázku (např. "vdlayout/schema.jpg")
          const relativePath = imagePathMatch[2];
          
          // Změnit příponu na .webp (odstranit query parametry pokud existují)
          const newPath = relativePath.replace(/\.(jpg|jpeg|png)(\?.*)?$/i, '.webp');
          
          // Převést na absolutní cestu
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
