import type { Plugin } from 'unified';
import type { Root } from 'hast';

/**
 * Rehype plugin, který převádí odkazy na .md soubory na odkazy příručky v hotovém HTML.
 * 
 * Transformuje: <a href="css-grid-auto-rows-columns.md"> -> <a href="/prirucka/css-grid-auto-rows-columns">
 * Transformuje: <a href="css-grid.md"> -> <a href="/prirucka/css-grid">
 * 
 * Odstraní .md příponu a přidá /prirucka/ prefix.
 * Nezmění absolutní URL (http://, https://, //) ani odkazy, které už začínají na /.
 */
export const rehypePriruckaLinks: Plugin<[], Root> = () => {
  return (tree) => {
    function processNode(node: any): void {
      // Zpracovat odkazy
      if (node.type === 'element' && node.tagName === 'a' && node.properties?.href) {
        const href = node.properties.href as string;
        
        // Zkontrolovat, zda odkaz končí na .md a není absolutní URL
        // Ignorovat odkazy začínající na http, https, // nebo /
        if (href.endsWith('.md') && 
            !href.startsWith('http') && 
            !href.startsWith('//') && 
            !href.startsWith('/')) {
          // Odstranit .md příponu
          const withoutExtension = href.replace(/\.md$/, '');
          
          // Vzít jen název souboru (bez cesty, pokud je v cestě)
          const filename = withoutExtension.split('/').pop() || withoutExtension;
          
          // Převést na URL příručky
          node.properties.href = `/prirucka/${filename}`;
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
