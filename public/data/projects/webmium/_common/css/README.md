LESS dokumentace pro Webmium responzivní šablony
==============================================================================

Vrstvení stylů
--------------

**1) Společný kód**  
Nejspodnější vrstva a společný kód pro všechny šablony.  
Viz `/_common/css/wm-common.less`.

**2) Layout**  
Váže se na unikátní strukturu layoutu v HTML.  
Viz `/_common/css/wm-layouts/*`

**3) Varianta**  
Stejný layout, odlišný vzhled (například navigace)
Obsahuje taky většinu proměnných.  
Viz `/_common/css/wm-variants/*`

**4) Barevné schéma**  
Varianty odlišuje pomocí barvy odkazu, obrázku v header image a občas
barvy pozadí stránky.
Je tady ale možné přepisovat všechny existující proměnné.  
Viz `index.less` soubory v adresářích jednotlivých šablon v `templates/`.  
*Pozor!* Až na téhle úrovni LESS soubory kompilujeme do CSS.

Struktura adresáře CSS
----------------------

<pre>
  wm-common.less — výchozí soubor pro vrstvu společného kódu, všechny zde nezdokumentované soubory jsou importované a popsané tady
  /wm-layouts — layouty
  /wm-variants — varianty layoutů
  /wm-modules — společné UI komponenty (navigace, header image…)
  /wm-pagelets — UI komponenty, které si uživatelé mohou vkládat do obsahu stránky (text, mapa, kontaktní formulář…)
</pre>  


Generování dokumentace
----------------------

Používáme [StyleDocco](http://jacobrask.github.io/styledocco/index.html). 
Dokumentaci generujeme pro všechny layouty, moduly a pagelety. V dokumentaci je možné otestovat elementy v různých šířkách displeje.

Generování dokumentace je potřeba spouštět. V adresáři `/_common` takto:

`styledocco -n "Webmium responsive" --include ../1-1-1\ -\ Salon\ HairCut\ -\ Green/assets/css/index.css --include js/client.js  css/README.md css/wm-layouts/ css/wm-modules/ css/wm-pagelets/`

Autor
-----

Martin Michálek  
martin@vzhurudolu.cz  
http://www.vzhurudolu.cz/martin/

