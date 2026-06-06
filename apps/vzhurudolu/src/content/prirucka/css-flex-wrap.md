---
id: css-flex-wrap
title: 'CSS vlastnost flex-wrap: zalamování položek flexboxu'
heading: 'CSS vlastnost flex-wrap: zalamování položek flexboxu'
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
# CSS vlastnost flex-wrap: zalamování položek flexboxu

Vlastnost `flex-wrap` aplikujeme na kontejner flexboxu, abychom definovali, zda se položky rozvržení mohou zalamovat na více řádků, nebo nikoliv.

<div class="connected" markdown="1">

![CSS vlastnost flex-wrap](../dist/images/medium/vdlayout/css-flex-wrap-schema.jpg)

<div class="web-only" markdown="1">

`flex-wrap` je jedna z vlastností [flexboxu](css-flexbox.md).

</div>

<div class="ebook-only" markdown="1">

<div class="book-index" data-book-index="flex-wrap"></div>

Poznámka: všechny texty příruček jsou k vidění naživo na Vzhůru dolů:

→ [vrdl.in/cssfw](https://www.vzhurudolu.cz/prirucka/css-flex-wrap)

</div>

</div>

Hodnotou `wrap-reverse` také můžeme otočit pořadí vyskládání prvků na příčné ose layoutu.

Toto jsou možné hodnoty:

- `nowrap`  
Výchozí hodnota. Flexbox bude jednořádkový.
- `wrap`  
Kontejner flexboxu umožní položkám, aby se zalomily na další řádek.
- `wrap-reverse`  
Položky se mohou zalomit do více řádků a zároveň se pořadí řádků otočí.

<figure class="figure-thirds">
<img src="../dist/images/original/vdlayout/css-flex-wrap.jpg" width="1600" height="900" alt="CSS vlastnost flex-wrap">
<figcaption markdown="1">
Může se layout zalamovat? A pokud ano, jakým směrem?
</figcaption>
</figure>

<div class="web-only" markdown="1">

## Dva příklady {#priklady}

V obou demech máme jednoduché HTML…

```html
<div class="container">
  <p>
    <strong>Item 1</strong> …
  </p>
  <p>
    <strong>Item 2</strong> …
  </p>
  <p>
    <strong>Item 3</strong> …
  </p>  
</div>
```

… a ještě jednodušší základní CSS:

```css
.container {
  display: flex;
  flex-wrap: nowrap; /* nebo wrap, wrap-reverse */
}
```

<!-- .web-only -->
</div>

V online ukázce si můžete interaktivně vyzkoušet jednotlivé hodnoty vlastnosti `flex-wrap`:

CodePen: [vrdl.in/cuqnb](https://codepen.io/machal/pen/OJRaYXJ?editors=0000)

<div class="web-only" markdown="1">

Připravil jsem ještě jedno demo, ve kterém jsou položky flexboxu obsahově velmi stručné a je jich daleko více, aby bylo vidět, že jde o _nepovinné_ zalamování.

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


I po nastavení hodnoty na `wrap` nebo `wrap-reverse` prohlížeč uvažuje, zda vůbec zalamovat potřebuje. Je to asi jako když vypisujete text do řádku.

CodePen: [vrdl.in/ngtf2](https://codepen.io/machal/pen/WNoNrbB?editors=0000)

<!-- .web-only -->
</div>

## Nezalamuje hodnota wrap-reverse naopak?

Všimněte si prosím chování hodnoty `wrap-reverse` – položky se vyskládají dle zdola, ale zleva doprava, nikoliv naopak, jak by mohl někdo očekávat.

Dává to ale smysl. Hodnota `wrap-reverse` totiž zalamuje naopak. Poslední položka řádku skočí nahoru a zařadí se nad první položku.

## Zkratka flex-flow {#flex-flow}

Možná už víte, že můžete použít [vlastnost `flex-flow`](css-flex-flow.md), zkratku pro vlastnosti [`flex-direction`](css-flex-wrap.md) a právě `flex-wrap`.

```css
.box {
  flex-flow: wrap; /* = flex-wrap: wrap */
}
```

## Podpora v prohlížečích {#podpora}

Podpora vlastnosti `flex-wrap` je velmi dobrá a o chybách nevím.  Na webu CanIUse se u Internet Exploreru 11 v době psaní uvádí částečná podpora s poznámkou, že to je kvůli velkému počtu chyb. Trošku horší je, že je tento web neuvádí – a dle mého vlastně ani neexistují.  [CanIUse.com](https://caniuse.com/mdn-css_properties_flex-wrap)

<!-- AdSnippet -->