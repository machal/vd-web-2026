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
        if (href.endsWith('.md')) {
          let newHref: string | null = null;
          // Relativní odkaz (css-grid.md)
          if (!href.startsWith('http') && !href.startsWith('//') && !href.startsWith('/')) {
            const withoutExtension = href.replace(/\.md$/, '');
            const filename = withoutExtension.split('/').pop() || withoutExtension;
            newHref = `/prirucka/${filename}`;
          }
          // Absolutní cesta /prirucka/xxx.md
          else if (href.startsWith('/prirucka/') && href.endsWith('.md')) {
            newHref = href.replace(/\.md$/, '');
          }
          // Plná URL vzhurudolu.cz/prirucka/xxx.md
          else if (href.includes('vzhurudolu.cz/prirucka/') && href.endsWith('.md')) {
            const match = href.match(/\/prirucka\/([^/?#]+)\.md/);
            if (match) newHref = `/prirucka/${match[1]}`;
          }
          if (newHref) {
            node.properties.href = newHref;
          }
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
