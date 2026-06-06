---
id: css-flex-flow
title: 'CSS vlastnost flex-flow: zkratka pro určení směru a zalamování flexboxu'
heading: 'CSS vlastnost flex-flow: zkratka pro určení směru a zalamování flexboxu'
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
# CSS vlastnost flex-flow: zkratka pro určení směru a zalamování flexboxu

Vlastnost `flex-flow` určuje směr a způsob zalamování položek flexboxu.

<div class="connected" markdown="1">

![CSS vlastnost flex-flow](../dist/images/medium/vdlayout/css-flex-flow-schema.jpg)

<div class="web-only" markdown="1">

`flex-flow` je jedna z vlastností [flexboxu](css-flexbox.md).

</div>

<div class="ebook-only" markdown="1">

<div class="book-index" data-book-index="flex-flow"></div>

→ [vrdl.in/cssff](https://www.vzhurudolu.cz/prirucka/css-flex-flow)

</div>

</div>

Jde o zkratku pro dvě vlastnosti, které jsme uváděli již dříve:

- [`flex-direction`](css-flex-direction.md) – směr vykreslování flexboxového rozvržení.
- [`flex-wrap`](css-flex-wrap.md) – zalamování položek layoutu na více řádků.

V obecné rovině je zápis následující:

```css
flex-flow: <hodnota flex-direction> <hodnota flex-wrap>;
```

Vzhledem k tomu, že obě vlastnosti používají jiná klíčová slova pro své hodnoty, je možné je uvádět v libovolném pořadí a samozřejmě úplně v klidu jednu z nich vynechat.

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


<div class="web-only" markdown="1">

Níže to v textu rozebereme více, ale obrázky napoví. Jako vždy. Nejprve k `flex-direction`.

<figure>
<img src="../dist/images/original/vdlayout/css-flex-direction.jpg" width="1600" height="900" alt="CSS vlastnost flex-direction">
<figcaption markdown="1">
*Vlastnost `flex-direction` přikáže flexboxovému rozvržení směr vykreslování.*
</figcaption>
</figure>

A co vlastnost `flex-wrap`? Tramtadadá, tady ji máme!

<figure>
<img src="../dist/images/original/vdlayout/css-flex-wrap.jpg" width="1600" height="900" alt="CSS vlastnost flex-wrap">
<figcaption markdown="1">
*Bude se to zalamovat, a pokud ano jakým směrem? Tomu velí vlastnost `flex-wrap`.*
</figcaption>
</figure>

<!-- .web-only -->
</div>

Toto jsou příklady možných hodnot:

- `column`  
Jako `flex-direction:column`. Položky flexboxu se skládají do sloupce.
- `wrap`  
Odpovídá `flex-wrap:wrap`. Kontejner flexboxu umožní položkám, aby se zalomily na další řádek.
- `column wrap`  
Ekvivalentní k `flex-direction:column;flex-wrap:wrap`.
- `row-reverse wrap`  
Ekvivalentní k `flex-direction:row-reverse;flex-wrap:wrap`.

Všechno je to dobře vidět v online ukázce na CodePenu, kde si také můžete měnit velikost písma, šířku viewportu nebo to jinak rozbíjet a při tom se to všechno naučit.

CodePen: [vrdl.in/3zji8](https://codepen.io/machal/pen/JjReqbB?editors=0000)

## Podpora v prohlížečích {#podpora}

Podpora vlastnosti `flex-flow` je přímo luxusní. Podívejte se na CanIUse a uvidíte samá zelená políčka, včetně Internet Exploreru. [CanIUse.com](https://caniuse.com/mdn-css_properties_flex-flow)

Jedinou vadou na kráse je kombinace hodnot `display:inline-flex` a `flex-flow:column wrap`, nepříliš známá a nepříliš omezující chyba, kterou jsme se zabývali už [u vlastnosti `flex-direction`](css-flex-direction.md).

<!-- AdSnippet -->