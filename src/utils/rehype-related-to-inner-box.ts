import type { Plugin } from 'unified';
import type { Root } from 'hast';
import { visit } from 'unist-util-visit';

/**
 * Rehype plugin, který transformuje elementy s třídou "related" na strukturu inner-box inner-box--side.
 * 
 * Transformace:
 * 1. Změní třídu z "related" na "inner-box inner-box--side"
 * 2. Přidá nadpis "Související" jako první dítě
 * 3. Transformuje <ul> na <ul class="list list--bordered list--block-hover mb-0">
 * 4. Transformuje všechny <li> na <li class="list__item">
 * 5. Transformuje všechny <a> uvnitř <li> na <a class="list__item-link">
 * 
 * Původní struktura:
 * <div class="related"><ul><li><a href="...">text</a></li></ul></div>
 * 
 * Cílová struktura:
 * <div class="inner-box inner-box--side">
 *   <h2 class="inner-box__heading h6 mb-05">Související</h2>
 *   <ul class="list list--bordered list--block-hover mb-0">
 *     <li class="list__item"><a class="list__item-link" href="...">text</a></li>
 *   </ul>
 * </div>
 */
export const rehypeRelatedToInnerBox: Plugin<[], Root> = () => {
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
     * Nastaví třídy elementu (nahradí existující)
     */
    function setClasses(node: any, classes: string[]): void {
      if (!node.properties) {
        node.properties = {};
      }

      node.properties.className = classes;
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
     * Transformuje <li> elementy a jejich obsah
     * - Přidá třídu list__item na každý <li>
     * - Pokud <li> obsahuje <a>, přidá třídu list__item-link na <a>
     * - Pokud <li> neobsahuje <a> (aktivní položka), přidá třídu list__item--active na <li>
     */
    function transformListItems(node: any): void {
      if (!node.children || !Array.isArray(node.children)) {
        return;
      }

      for (const child of node.children) {
        if (child.type === 'element') {
          if (child.tagName === 'li') {
            // Přidat třídu list__item na každý <li>
            addClass(child, 'list__item');
            
            // Zkontrolovat, zda <li> obsahuje <a> tag
            const hasLink = child.children && child.children.some(
              (c: any) => c.type === 'element' && c.tagName === 'a'
            );

            if (hasLink) {
              // Pokud má odkaz, přidat třídu list__item-link na <a>
              for (const liChild of child.children || []) {
                if (liChild.type === 'element' && liChild.tagName === 'a') {
                  addClass(liChild, 'list__item-link');
                }
              }
            } else {
              // Pokud nemá odkaz (aktivní položka), přidat třídu na <li>
              addClass(child, 'list__item--active');
            }
          }
          
          // Rekurzivně zpracovat děti
          transformListItems(child);
        }
      }
    }

    // Najít všechny elementy s třídou "related"
    visit(tree, 'element', (node: any) => {
      if (hasClass(node, 'related')) {
        // Změnit třídu z "related" na "inner-box inner-box--side"
        setClasses(node, ['inner-box', 'inner-box--side']);

        // Vytvořit nadpis "Související"
        const heading = {
          type: 'element',
          tagName: 'h2',
          properties: {
            className: ['inner-box__heading', 'h6', 'mb-05']
          },
          children: [
            {
              type: 'text',
              value: 'Související'
            }
          ]
        };

        // Přidat nadpis jako první dítě
        if (!node.children) {
          node.children = [];
        }
        node.children.unshift(heading);

        // Najít a transformovat <ul> na <ul class="list list--bordered list--block-hover mb-0">
        if (node.children && Array.isArray(node.children)) {
          for (const child of node.children) {
            if (child.type === 'element' && child.tagName === 'ul') {
              // Nastavit třídy pro list komponentu s block-hover pro klikatelnou plochu
              setClasses(child, ['list', 'list--bordered', 'list--block-hover', 'mb-0']);
              
              // Transformovat všechny <li> elementy a jejich obsah
              transformListItems(child);
            }
          }
        }
      }
    });
  };
};
