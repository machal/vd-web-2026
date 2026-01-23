---
postID: 35
postTitle: 'Critical CSS a zrychlení zobrazení stránky'
postUrlId: critical-css
postDateTime: '2015-06-04 00:00:00'
excerpt: 'Vkládání nezbytného CSS v inline podobě přímo do HTML kódu je způsob jak urychlit zobrazení stránky.'
postStatus: Published
authorID: 1
sectionID: 1
category:
  - css
og_title: 'Critical CSS a zrychlení zobrazení stránky'
og_description: 'Vkládání nezbytného CSS v inline podobě přímo do HTML kódu je způsob jak urychlit zobrazení stránky.'
og_type: article
---

# Critical CSS a zrychlení zobrazení stránky

Vkládání nezbytného CSS v inline podobě přímo do HTML kódu. 

Tato technika může významně zlepšit rychlost zobrazení stránky. Na celkovou rychlost načtení nemá skoro žádný vliv.

Tohle je přepis toho nejdůležitějšího z obsahu přednášky na [Frontendistech](http://www.frontendisti.cz/). Tady je [její videozáznam](/prednaska/frontendisticz-critical-css-144).

## Proč to dělat?

Prohlížeč totiž s renderováním stránky čeká na kompletní načtení CSS souborů. Proto  čekání na zobrazení stránky s bílou obrazovkou na pomalejších připojeních.

![Jak prohlížeč načítá stránku?](/assets/img/content/src/critical-css-schema.jpg)

Dá se to hacknout tím, že CSS načtete asynchronně pomocí javascriptu. Aby ale prohlížeč nezobrazil stránky ve svém vychozím stylování, potřebujete mu poskytnout nějaké základní CSS v inline podobě:

```html
<style>
  /* Nezbytné CSS … */
</style>

<script>
  loadCSS("style.css");
</script>
```

Na přednášce jsem ukazoval [tento příklad](https://github.com/machal/frontendisti-critical-css). 
		
## Co k tomu potřebujeme?

### Testovací nástroje

Chrome DevTools pro takové to domácí testování, pak ještě [WebPagetest.org](http://www.webpagetest.org/). Ten ukáže zajímavá čísla – SpeedIndex (obdoba PageRanku pro kodéry; čím je nižší tím lépe) a Start Render (čas kdy prohlížeč začal renderovat stránku). Viz také [výsledky pro původní stav](http://www.webpagetest.org/result/150529_3V_BV4/) naší stránky. Více v článku o [nástrojích pro analýzu rychlosti](/prirucka/rychlost-nastroje).

### Něco na vygenerování nezbytného CSS

Osvědčil se mi [grunt-criticalcss](https://github.com/filamentgroup/grunt-criticalcss). Pro Gulpaře je určen [critical](https://github.com/addyosmani/critical) Addyho Osmaniho.

U grunt-criticalcss je dobré myslet na `forceInclude` parametr pro `:hover` stavy elementů a pak dát [pozor na na zkratky CSS vlastností](https://github.com/filamentgroup/grunt-criticalcss/issues/26) jako `background`.

### Enhance.js

[Enhance](https://github.com/filamentgroup/enhance/blob/master/enhance.js) je šablona s utilitami pro postupné načítání stránky od Filament Group. Nás zajímá hlavně funkce `loadCSS()`, ale doporučuji Enhance prozkoumat celé.

## Výsledek

I u takto jednoduché stránky se nám rychlost zobrazení podařilo významně posunout:

![Před: SpeedIndex 11314; po SpeedIndex 4078](/assets/img/content/src/critical-css-pred-po.jpg)

## Co dál?

- Cookie – kritické CSS se hodí pro první návštěvu stránky. Jakmile se ale uživatel dostane na další stránku, měl [už by mít cookie](https://github.com/filamentgroup/enhance/blob/master/enhance.js#L142) a critical CSS vůbec nedostat. To ošklivé velké CSS už totiž má v cache prohlížeče.
- Webfonty: efekt schovávání textu ([FOIT](https://jonsuh.com/blog/font-loading-with-font-events/)) je vidět i na naši optimalizované stránce. Dá se vyřešit.
- JavaScripty je dobré rozdělit na kritické (např. [polyfilly](/prirucka/polyfill), které inlinujeme v `<head>`) a nekritické (všechny ostatní).
- Lazyload pro `<iframe>` třetích stran. Externí elementy sice zhorší jen rychlost načtení, ale odsunou nám načítání našich důležitých elementů jako jsou právě webfonty nebo důležité obrázky v CSS.
- Optimalizovat obrázky pomocí [`srcset/sizes`](/prirucka/srcset-sizes) a [`<picture>`](/prirucka/picture).
- O Critical CSS psal také [Petr Soukup](https://www.souki.cz/optimalizujeme-critical-asynchronni-css).

Problematiku do detailu řeším na školení [Pokročilý responzivní design](http://www.vzhurudolu.cz/kurzy/pokrocily-responzivni-design).