import type { Plugin } from 'unified';
import type { Root, Element } from 'hast';

/**
 * Rehype plugin, který přidá anchor odkazy do nadpisů s id atributem
 * Transformuje: <h2 id="uzkost">Text</h2>
 * Na: <h2 id="uzkost"><a href="#uzkost">Text</a></h2>
 */
export const rehypeHeadingAnchors: Plugin<[], Root> = () => {
  return (tree) => {
    function processNode(node: any): void {
      // Rekurzivně projít všechny děti nejdřív
      if (node.children && Array.isArray(node.children)) {
        node.children.forEach(processNode);
      }
      
      // Pak zpracovat aktuální node
      if (node.type === 'element' && 
          /^h[1-6]$/.test(node.tagName) && 
          node.properties?.id) {
        const id = node.properties.id as string;
        
        // Pokud už má anchor link jako první dítě, přeskočit
        if (node.children && 
            node.children.length > 0 && 
            node.children[0].type === 'element' && 
            node.children[0].tagName === 'a') {
          return;
        }
        
        // Vytvořit anchor link s existujícími dětmi
        const anchorLink: Element = {
          type: 'element',
          tagName: 'a',
          properties: {
            href: `#${id}`,
          },
          children: node.children ? [...node.children] : [],
        };
        
        // Nahradit děti nadpisu anchor linkem
        node.children = [anchorLink];
      }
    }
    
    processNode(tree);
  };
};
