---
postID: 148
postTitle: 'MiniLazyload: Minimalistická knihovna pro líné načtení obrázků a IFRAME (aktualizováno pro verzi 2.3.0)'
postUrlId: minilazyload
postDateTime: 2019-11-04
excerpt: 'Šimon z Pilulka.cz vám v dnešním textu představí svou miniaturní, ale chytře navrženou knihovnu pro líné načtení obrázků a iframe.'
postStatus: Published
authorID: 1
sectionID: 1
category:
  - rychlost
  - js
no_ads: true
include_rss: true
category_highlight: true
og_title: 'MiniLazyload: Minimalistická knihovna pro líné načtení obrázků a IFRAME (aktualizováno pro verzi 2.3.0)'
og_description: 'Šimon z Pilulka.cz vám v dnešním textu představí svou miniaturní, ale chytře navrženou knihovnu pro líné načtení obrázků a iframe.'
og_type: article
tags: ['nastroje', 'rychlost-nacitani']
---# MiniLazyload: Minimalistická knihovna pro líné načtení obrázků a IFRAME (aktualizováno pro verzi 2.3.0)

_[Šimon Raichl](http://rs.9e.cz/) z [Pilulka.cz](https://www.pracevpilulce.cz) vám v dnešním textu představí svou miniaturní, ale chytře navrženou knihovnu pro líné načtení obrázků a iframe._

[Lazy loading](https://www.vzhurudolu.cz/prirucka/lazy-loading-obrazku) jako takový představovat nemusím. Co ovšem představit chci, je moje knihovna zvaná [MiniLazyload](https://github.com/VelociraptorCZE/MiniLazyload). 


## Motivace: Vytvořit opravdu hodně malou knihovnu s podporou nativního lazy loadingu {#motivace}

Proč další knihovna, když můžu použít již existující? Měl jsem pár požadavků, které žádná knihovna, kterou jsem našel, nesplňovala:

*   Datově co nejmenší (ideálně kolem 1 kB po gzipu).
*   Načtení placeholder obrázků, jestliže selže načtení původního obrázku.
*   Podpora responzivních obrázků (`srcset` a `source` ve značce `<picture>`).
*   Rozumná práce s nativním lazyloadem.
*   Aby neměla závislost na jQuery.

Ve výsledku se mi podařilo splnit všechny cíle, které jsem si vytyčil. Velikost je pod 1 kB po gzipu a 1,8 kB bez něj. Placeholdery a responzivní obrázky také podporuje.

<div class="related" markdown="1">
- [Co je to lazyloading](/prirucka/lazy-loading)
- [Lazy loading obrázků a iframe](/prirucka/lazy-loading-obrazku)
</div>

Knihovna interně používá [Intersection Observer](https://www.vzhurudolu.cz/prirucka/intersection-observer), který je důležitý pro výkon lazy loadingu v prohlížečích bez podpory líného načtení. Pokud v daném prostředí není nalezen, stáhnout se obrázky okamžitě. Toto se bude týkat především Internet Exploreru.

Co knihovně naopak chybí? Líné načtení částí DOMu. Pokud to potřebujete podívejte se [po knihovnách](https://www.vzhurudolu.cz/prirucka/lazy-loading-obrazku#knihovny), které jsou doporučovány zde na Vzhůru dolů.


## Implementace do webu {#implementace}

Jestliže pro  bundlování používáte Webpack, pak můžete nainstalovat knihovnu pomocí [NPM](https://www.vzhurudolu.cz/prirucka/npm):


```
npm i minilazyload
```


My to pro potřeby ukázky uděláme „na prasáka“, přímým načtením v HTML: 


```html
<script src="https://cdn.jsdelivr.net/npm/minilazyload@2.1.0/dist/minilazyload.min.js"></script>
```


V JavaScriptu vytvoříme instanci MiniLazyloadu:


```js
new MiniLazyload();
```


Pro nejběžnější využití by to mělo stačit. Knihovna bere informace o tom, které prvky načíst líně z HTML atributů pro [nativní lazyloading](https://www.vzhurudolu.cz/prirucka/lazy-loading-obrazku#nativni) (`loading="lazy"`).

Můžeme ale nastavit tři parametry: 

*   v prvním předáváme objekt s nastavením, 
*   ve druhém CSS selektor pro líně načítané prvky,
*   ve třetím informaci, jestli se má ignorovat nativní lazyload a jestli se má vždy použít MiniLazyload.

V objektu s nastavením můžete nastavit vlastnosti pro Intersection Observer (`rootMargin`, `threshold`) a dále placeholdery, které se načtou, pokud selže načtení původního obrázku. Například následovně:


```js
new MiniLazyload({
    rootMargin: "500px",
    threshold: .5,
    placeholder: "placeholder.png"
});
```

Nyní si můžete nastavit vlastní selektor. Ve výchozím nastavením se vybírají elementy, které mají atribut `loading="lazy"`, tedy je u nich nastaveno nativní líné načtení. Pojďme toto změnit, například abychom vybírali elementy podle třídy `.lazyload`.


```js
new MiniLazyload({
    rootMargin: "500px",
    threshold: .5,
    placeholder: "placeholder.png"
}, ".lazyload");
```

### Co v prohlížečích s nativním lazy loadingem?

Pamatujete, když jsem zmiňoval, že jeden z mých požadavků bylo, aby knihovna uměla rozumně pracovat s nativním lazyloadem? 

Pokud prohlížeč podporuje nativní líné načtení, MiniLazyload se nespustí. 

Do třetího parametru ale lze použít flag `IGNORE_NATIVE_LAZYLOAD` a MiniLazyload se spustí bez ohledu na to, jestli prohlížeč podporuje nativní lazyload. 

CodePen: [https://codepen.io/VelociraptorCZE/pen/WNNOdxy](https://codepen.io/VelociraptorCZE/pen/WNNOdxy)

Další CodePeny, kde můžete vidět MiniLazyload v akci:

*   [Využití flagu `IGNORE_NATIVE_LAZYLOAD` a placeholderu](https://codepen.io/VelociraptorCZE/pen/wvwdmRK).
*   [Práce s `<iframe>`](https://codepen.io/VelociraptorCZE/pen/mdbwGKe).

Můžete příklady vyzkoušet v prohlížečích, které mají nativní lazyload a které ne a porovnat rozdíly mezi nimi.

Kompletní dokumentaci najdete na [githubu](https://github.com/VelociraptorCZE/MiniLazyload/blob/master/README.md) této knihovny.

<!-- AdSnippet -->