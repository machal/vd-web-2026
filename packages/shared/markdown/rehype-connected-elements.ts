import type { Plugin } from 'unified';
import type { Root } from 'hast';
import { visit } from 'unist-util-visit';

/**
 * Rehype plugin, který transformuje elementy s třídou "connected" pro příručku.
 * 
 * Transformace:
 * 1. Přidá třídy: w-33 pull-right f-6 pl-1 pr-1 ml-1 bl-1 mb-1
 * 2. Najde obrázky uvnitř a:
 *    - Upraví cestu z /prirucka/images/...webp na /prirucka-content/dist/images/medium/...jpg
 *    - Přidá atributy loading="lazy", width="800", height="450"
 *    - Zajistí, že obrázek je v <p class="mb-05">
 * 3. Najde elementy s třídou "web-only" uvnitř a:
 *    - Odstraní markdown atribut (pokud existuje)
 *    - Zajistí, že obsah je v <p class="mb-05">
 */
export const rehypeConnectedElements: Plugin<[], Root> = () => {
  return (tree) => {
    /**
     * Zkontroluje, zda element má třídu
     */
    function hasClass(node: any, className: string): boolean {
      if (!node.properties) {
        return false;
      }

      const classNames = node.properties.className || node.properties.class;
      
      if (!classNames) {
        return false;
      }
      
      if (Array.isArray(classNames)) {
        return classNames.includes(className);
      }
      
      if (typeof classNames === 'string') {
        const classes = classNames.split(/\s+/).filter((c: string) => c.trim());
        return classes.includes(className);
      }
      
      return false;
    }

    /**
     * Přidá třídu do elementu
     */
    function addClass(node: any, className: string): void {
      if (!node.properties) {
        node.properties = {};
      }

      const classNames = node.properties.className || node.properties.class || [];
      const classesArray = Array.isArray(classNames) ? [...classNames] : 
                          typeof classNames === 'string' ? classNames.split(/\s+/).filter((c: string) => c.trim()) : 
                          [];

      if (!classesArray.includes(className)) {
        classesArray.push(className);
      }

      node.properties.className = classesArray;
    }

    /**
     * Obalí obsah do <p class="mb-05"> pokud ještě není v <p>
     */
    function wrapInParagraph(node: any): void {
      if (!node.children || node.children.length === 0) {
        return;
      }

      // Zkontrolovat, zda všechny děti jsou už v <p> tagu
      const allInParagraphs = node.children.every((child: any) => 
        child.type === 'element' && child.tagName === 'p'
      );

      if (allInParagraphs && node.children.length > 0) {
        // Pokud všechny děti jsou už v <p>, přidat třídu mb-05 každému
        node.children.forEach((child: any) => {
          if (child.type === 'element' && child.tagName === 'p') {
            addClass(child, 'mb-05');
          }
        });
        return;
      }

      // Pokud první dítě je <p>, přidat třídu mb-05
      const firstChild = node.children[0];
      if (firstChild && firstChild.type === 'element' && firstChild.tagName === 'p') {
        addClass(firstChild, 'mb-05');
        // Pokud jsou další děti, které nejsou v <p>, obalit je také
        if (node.children.length > 1) {
          const otherChildren = node.children.slice(1);
          const pElement = {
            type: 'element',
            tagName: 'p',
            properties: {
              className: ['mb-05']
            },
            children: otherChildren
          };
          node.children = [firstChild, pElement];
        }
        return;
      }

      // Vytvořit nový <p> element pro všechny děti
      const pElement = {
        type: 'element',
        tagName: 'p',
        properties: {
          className: ['mb-05']
        },
        children: [...node.children]
      };

      node.children = [pElement];
    }

    /**
     * Rekurzivně najde všechny obrázky v elementu a jejich rodiče
     */
    function findImages(node: any, parent: any, images: Array<{ img: any; parent: any; index: number }>): void {
      if (!node.children || !Array.isArray(node.children)) {
        return;
      }

      for (let i = 0; i < node.children.length; i++) {
        const child = node.children[i];
        
        if (child.type === 'element' && child.tagName === 'img') {
          images.push({ img: child, parent: node, index: i });
        } else if (child.type === 'element') {
          findImages(child, node, images);
        }
      }
    }

    // Najít všechny elementy s třídou "connected"
    visit(tree, 'element', (node: any) => {
      if (hasClass(node, 'connected')) {
        // Přidat další třídy
        addClass(node, 'w-33');
        addClass(node, 'pull-right');
        addClass(node, 'f-6');
        addClass(node, 'pl-1');
        addClass(node, 'pr-1');
        addClass(node, 'ml-1');
        addClass(node, 'bl-1');
        addClass(node, 'mb-1');

        // Najít všechny obrázky uvnitř (rekurzivně)
        const images: Array<{ img: any; parent: any; index: number }> = [];
        findImages(node, null, images);

        // Transformovat každý obrázek
        for (const { img, parent, index } of images) {
          if (!img.properties || !img.properties.src) {
            continue;
          }

          // Cestu k obrázku NEMĚNIT - zůstává jak je (/prirucka/images/...webp)
          // Přidat atributy
          img.properties.loading = 'lazy';
          img.properties.width = '800';
          img.properties.height = '450';
          
          // Pokud rodič není <p>, obalit do <p class="mb-05">
          if (parent && parent.tagName !== 'p') {
            const pElement = {
              type: 'element',
              tagName: 'p',
              properties: {
                className: ['mb-05']
              },
              children: [img]
            };
            
            if (parent.children && Array.isArray(parent.children)) {
              parent.children[index] = pElement;
            }
          } else if (parent && parent.tagName === 'p') {
            // Pokud je už v <p>, přidat třídu mb-05
            addClass(parent, 'mb-05');
          } else {
            // Pokud není rodič (což by nemělo nastat), vytvořit <p> wrapper
            console.warn('[rehypeConnectedElements] Image has no parent, creating wrapper');
            const pElement = {
              type: 'element',
              tagName: 'p',
              properties: {
                className: ['mb-05']
              },
              children: [img]
            };
            // Najít rodiče v tree a nahradit img za pElement
            // Toto by nemělo nastat, ale pro jistotu...
          }
        }
        
        // Najít a transformovat elementy s třídou "web-only"
        if (node.children && Array.isArray(node.children)) {
          for (let i = 0; i < node.children.length; i++) {
            const child = node.children[i];
            
            if (child.type === 'element' && hasClass(child, 'web-only')) {
              // Odstranit markdown atribut (pokud existuje)
              if (child.properties && child.properties.markdown) {
                delete child.properties.markdown;
              }
              
              // Zajistit, že obsah je v <p class="mb-05">
              wrapInParagraph(child);
            }
          }
        }
      }
    });
  };
};
