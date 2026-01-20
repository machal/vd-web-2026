import type { Plugin } from 'unified';
import type { Root } from 'hast';

/**
 * Rehype plugin, který transformuje cesty k obrázkům příručky v hotovém HTML.
 * 
 * Transformuje cesty z markdown souborů (které byly převedeny na HTML):
 * - <img src="../dist/images/original/typografie-16.jpg"> -> <img src="/prirucka/images/typografie-16.webp">
 * - <img src="../dist/images/medium/vdlayout/schema.jpg"> -> <img src="/prirucka/images/vdlayout/schema.webp">
 * - <img src="../dist/images/small/vdlayout/schema.jpg"> -> <img src="/prirucka/images/vdlayout/schema.webp">
 * - Obrázky z markdown syntaxe ![alt](../dist/images/original/obrazek.jpg) jsou už převedeny na <img>
 * 
 * Změní cestu z ../dist/images/{original|medium|small}/ na /prirucka/images/ a příponu na .webp
 * Tento plugin běží v rehype fázi na hotovém HTML.
 */
export const rehypePriruckaImages: Plugin<[], Root> = () => {
  return (tree) => {
    function processNode(node: any): void {
      // Zpracovat <img> elementy (včetně těch z markdown image syntaxe, které už byly převedeny na HTML)
      if (node.type === 'element' && node.tagName === 'img' && node.properties?.src) {
        const src = node.properties.src as string;
        
        // Transformovat cesty začínající na ../dist/images/{original|medium|small}/
        const imagePathMatch = src.match(/^\.\.\/dist\/images\/(original|medium|small)\/(.+)$/);
        if (imagePathMatch) {
          // imagePathMatch[2] obsahuje relativní cestu k obrázku (např. "vdlayout/schema.jpg")
          const relativePath = imagePathMatch[2];
          
          // Změnit příponu na .webp (odstranit query parametry pokud existují)
          const newPath = relativePath.replace(/\.(jpg|jpeg|png)(\?.*)?$/i, '.webp');
          
          // Převést na absolutní cestu
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
