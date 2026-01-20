import type { Plugin } from 'unified';
import type { Root } from 'hast';

/**
 * Rehype plugin, který transformuje cesty k obrázkům příručky při převodu MD do HTML.
 * 
 * Transformuje cesty z markdown souborů (které zůstávají nezměněné):
 * - <img src="../dist/images/original/typografie-16.jpg"> -> <img src="/prirucka/images/typografie-16.webp">
 * - <img src="../dist/images/original/vdlayout/flexbox.jpg"> -> <img src="/prirucka/images/vdlayout/flexbox.webp">
 * - ![alt](../dist/images/original/obrazek.jpg) -> <img src="/prirucka/images/obrazek.webp">
 * 
 * Změní cestu z ../dist/images/original/ na /prirucka/images/ a příponu na .webp
 * Markdown soubory zůstávají nezměněné - transformace probíhá pouze při renderování.
 */
export const rehypePriruckaImages: Plugin<[], Root> = () => {
  return (tree) => {
    function processNode(node: any): void {
      // Zpracovat <img> elementy (včetně těch z markdown image syntaxe)
      if (node.type === 'element' && node.tagName === 'img' && node.properties?.src) {
        const src = node.properties.src as string;
        
        // Transformovat pouze cesty začínající na ../dist/images/original/
        if (src.startsWith('../dist/images/original/')) {
          // Odstranit prefix ../dist/images/original/
          const relativePath = src.replace(/^\.\.\/dist\/images\/original\//, '');
          
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
