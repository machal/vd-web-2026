import type { Plugin } from 'unified';
import type { Root, Element } from 'hast';
import { toText } from 'hast-util-to-text';

/**
 * Rehype plugin, který přidá anchor odkazy do nadpisů s id atributem
 * Transformuje: <h2 id="hodnoty-hodnoty">Hodnoty {#hodnoty}</h2>
 * Na: <h2 id="hodnoty"><a href="#hodnoty">Hodnoty</a></h2>
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
          /^h[1-6]$/.test(node.tagName)) {
        
        // Pokud už má anchor link jako první dítě, přeskočit
        if (node.children && 
            node.children.length > 0 && 
            node.children[0].type === 'element' && 
            node.children[0].tagName === 'a') {
          return;
        }
        
        // Získat text nadpisu a najít {#id} pokud existuje
        const headingText = toText(node);
        const idMatch = headingText.match(/\s*\{#([^}]+)\}\s*$/);
        
        let id: string | undefined;
        let cleanText = headingText;
        
        if (idMatch) {
          // Pokud je {#id} v textu, použít ho
          id = idMatch[1];
          cleanText = headingText.replace(/\s*\{#[^}]+\}\s*$/, '').trim();
        } else if (node.properties?.id) {
          // Pokud není {#id} v textu, použít existující id
          id = node.properties.id as string;
          
          // Odstranit duplikaci ID (např. "hodnoty-hodnoty" -> "hodnoty")
          // Pokud ID obsahuje text dvakrát oddělený pomlčkou, použít první část
          const parts = id.split('-');
          if (parts.length >= 2) {
            const firstPart = parts[0];
            const secondPart = parts.slice(1).join('-');
            // Pokud je druhá část stejná jako první, použít jen první část
            if (secondPart === firstPart || secondPart.startsWith(firstPart + '-')) {
              id = firstPart;
            }
          }
        }
        
        if (!id) {
          return;
        }
        
        // Nastavit správné ID
        node.properties.id = id;
        
        // Odstranit {#id} z textových uzlů
        function cleanTextNodes(children: any[]): any[] {
          return children.map((child: any) => {
            if (child.type === 'text') {
              const cleaned = child.value.replace(/\s*\{#[^}]+\}\s*$/, '').trim();
              return { ...child, value: cleaned };
            } else if (child.type === 'element' && child.children) {
              return { ...child, children: cleanTextNodes(child.children) };
            }
            return child;
          }).filter((child: any) => {
            // Odstranit prázdné textové uzly
            if (child.type === 'text' && !child.value.trim()) {
              return false;
            }
            return true;
          });
        }
        
        const cleanedChildren = cleanTextNodes(node.children || []);
        
        // Vytvořit anchor link s vyčištěnými dětmi
        const anchorLink: Element = {
          type: 'element',
          tagName: 'a',
          properties: {
            href: `#${id}`,
          },
          children: cleanedChildren,
        };
        
        // Nahradit děti nadpisu anchor linkem
        node.children = [anchorLink];
      }
    }
    
    processNode(tree);
  };
};
