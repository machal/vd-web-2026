import type { Plugin } from 'unified';
import type { Root } from 'mdast';

/**
 * Remark plugin, který zpracuje syntaxi {#id} v nadpisech
 * Transformuje: ## Nadpis {#id}
 * Na: nadpis s id atributem a odstraní {#id} z textu
 */
export const remarkHeadingIds: Plugin<[], Root> = () => {
  return (tree) => {
    function processNode(node: any): void {
      if (node.type === 'heading' && node.children) {
        // Projít všechny textové nody v nadpisu a najít {#id}
        for (let i = node.children.length - 1; i >= 0; i--) {
          const child = node.children[i];
          
          if (child.type === 'text') {
            const text = child.value;
            // Hledat pattern {#id} na konci textu
            const match = text.match(/^(.*?)\s*\{#([^}]+)\}\s*$/);
            
            if (match) {
              const [, textContent, id] = match;
              
              // Aktualizovat text - odstranit {#id}
              child.value = textContent.trim();
              
              // Pokud je text prázdný po odstranění {#id}, odstranit celý node
              if (child.value === '') {
                node.children.splice(i, 1);
              }
              
              // Přidat id jako data atribut (který se pak převede na HTML id)
              if (!node.data) {
                node.data = {};
              }
              if (!node.data.hProperties) {
                node.data.hProperties = {};
              }
              (node.data.hProperties as Record<string, string>).id = id;
              
              // Najít jen první výskyt
              break;
            }
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
