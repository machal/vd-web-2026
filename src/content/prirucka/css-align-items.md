---
id: css-align-items
heading: ''
perex: ''
published: true
category:
  - css
category_highlight: false
include_rss: false
no_ads: false
og_title: ''
og_description: ''
og_type: article
---

# Vlastnost align-items: Zarovnání všech položek na příčné ose

Vlastnost `align-items` definuje na kontejneru layoutu zarovnání položek na příčné ose (jinak též blokové ose).

<div class="book-index" data-book-index="align-items"></div>

<div class="connected" markdown="1">

![Vlastnost align-items](../dist/images/medium/vdlayout/css-align-items-schema.jpg)

<div class="web-only" markdown="1">

Vlastnost `align-items` patří do specifikace pro zarovnání boxů – [CSS Box Alignment](css-box-alignment.md).

Vlastnost je možné použít v layoutech tvořených [flexboxem](css-flexbox.md) a také [gridem](css-grid.md).

Můžete také použít zkratku [`place-items`](css-place-items.md).

</div>

<div class="ebook-only" markdown="1">

→ [vrdl.in/cssai](https://www.vzhurudolu.cz/prirucka/css-align-items)

</div>

</div>

Nastavuje výchozí hodnotu `align-self` pro každou položku uvnitř kontejneru.

Tuhle vlastnost není možné aplikovat na blokové elementy nebo na buňky tabulek, ale v gridu a flexboxu ji rozhodně využijete.

## Jednoduchý příklad

V naší ukázce definujeme třísloupcový kontejner gridu:

```css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  height: 10em;  
  align-items: start;  
}
```

Všechny tři položky mají omezenou výšku i šířku, aby byl hezky vidět efekt zarovnání, který způsobuje vlastnost `align-items`.

Použitá hodnota `start` umístí položky na začátek vymezeného prostoru.

CodePen: [vrdl.in/fm9sl](https://codepen.io/machal/pen/qBZRWog?editors=1100)

## Možné hodnoty

<figure>
<img src="../dist/images/original/vdlayout/css-align-items-hodnoty.jpg" width="1600" height="900" alt="Hodnoty vlastnosti align-items">
<figcaption markdown="1">
Hodnoty vlastnosti align-items.
</figcaption>
</figure>

Vlastnosti `align-items` můžete předávat všechny hodnoty z jednotlivých obecných kategorií klíčových slov:

### Základní

- `normal` (výchozí)  
  Ve většině systémů layoutu, včetně gridu nebo flexboxu, půjde jen o jiný zápis pro hodnotu `stretch`, kterou popisujeme níže.
- `stretch`  
  Položky rozšíří své rozměry tak, aby v kontejneru nezbylo žádné volné místo. Pokud jsou položky menší než kontejner, jejich velikost se zvětší rovnoměrně (nikoliv proporcionálně), přičemž stále respektují omezení uložená vlastnostmi jako `max-width`/`max-height`.

### Poziční

- `center`  
  Centruje všechny položky doprostřed kontejneru zarovnání.
- `start`  
  Zarovnává všechny položky k hraně začátku kontejneru.
- `end`  
  Zarovnává všechny položky k hraně konce kontejneru.
- `flex-start`  
  Hodnota se chová jako `start`.
- `flex-end`  
  Hodnota se chová jako `end`.

### Podle účaří

- `first baseline`  
  Zarovnání na účaří prvního řádku. Pokud hodnotu v daném kontextu nelze použít, zarovná se jako `start`.
- `last baseline`  
  Zarovnání na účaří posledního řádku. Pokud hodnotu v daném kontextu nelze použít, zarovná se jako `end`.
- `baseline`  
  Zkratka pro `first baseline`.

### Pro přetečení

- `safe`  
  Pokud má položka v daném způsobu zarovnání přetéct z obou stran, bude zarovnání změněno takovým způsobem, aby byl vidět začátek položky, například tak, aby bylo možné přečíst začátek textu.
- `unsafe`  
  Vždy dostane přednost poziční zarovnání, bez ohledu na to, zda bude oříznutý obsah čitelný nebo ne.  

Toto v době psaní podporuje jen Firefox.

<link rel="stylesheet" href="/assets/css/modules-standalone/min/ad-snippet.min.css?1710496181" /><script> </script>
<aside role="complementary" class="ad-snippet ad-snippet--reverse" aria-labelledby="ad-snippet-ebook">
  <h2 id="ad-snippet-ebook" class="ad-snippet__heading sr-only">Reklama</h2>
<svg class="ad-snippet__scissors ad-snippet__scissors-top" viewBox="0 0 18 14" xmlns:xlink="http://www.w3.org/1999/xlink">
  <use class="ad-snippet__scissors-svg" xlink:href="#vd-icon-scissors" x="0" y="0"></use>
</svg>
  <a class="ad-snippet__container" href="/css-layout/">
    <div class="ad-snippet__image maxw-7em">
      <img src="/assets/img/content/handmade/ebooks/vdlayout/vdlayout-model-both__760.webp" alt="Kniha a e-book „CSS: moderní layout"" loading="lazy" width="1540" height="1270">
    </div>
    <div class="ad-snippet__text">
      <h3 class="ad-snippet__text-heading" style="color:#f89b1d">
        Kniha „CSS: moderní layout"
      </h3>
      <p class="ad-snippet__text-content">
        Floaty šly spát, ale takhle kniha ve vás probudí CSS kodéra.
        <span class="td-u">Více</span> →
      </p>
    </div>
  </a>
<svg class="ad-snippet__scissors ad-snippet__scissors-bottom" viewBox="0 0 18 14" xmlns:xlink="http://www.w3.org/1999/xlink">
  <use class="ad-snippet__scissors-svg" xlink:href="#vd-icon-scissors" x="0" y="0"></use>
</svg>
</aside>


## Podpora v prohlížečích

Stav k únoru 2022:

V rámci flexboxového layoutu nefungují ve většině prohlížečů s výjimkou Firefoxu hodnoty `left`, `right`, `safe`, `unsafe`, `start` a `end`.

V IE11 navíc nefungují ani dvouslovná pojmenování pro zarovnání na účaří: `first baseline` nebo `last baseline`.

V rámci rozvržení pomocí gridu tuto vlastnost nepodporuje jen MSIE 11, ale tam by měl její podporu nahrazovat [Autoprefixer](autoprefixer.md). Jinak je to v gridu zcela v pořádku.

I zde platí, že jde o drobnosti. Celkově vzato je možné tuhle vlastnost a její nejužitečnější hodnoty v moderních prohlížečích používat bez problémů.

Pro více informací se podívejte na [caniuse.com/align-items](https://caniuse.com/#search=align-items).

<!-- AdSnippet -->
