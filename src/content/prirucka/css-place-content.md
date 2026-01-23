---
id: css-place-content
title: 'Vlastnost place-content: Rozdělení prostoru mezi položkami na obou osách'
heading: 'Vlastnost place-content: Rozdělení prostoru mezi položkami na obou osách'
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
# Vlastnost place-content: Rozdělení prostoru mezi položkami na obou osách

Úkolem vlastnosti `place-content` je specifikovat rozdělení prostoru mezi položkami na hlavní i příčné ose kontejneru pro layouty v CSS.

<div class="book-index" data-book-index="place-content"></div>

<div class="connected" markdown="1">

![CSS vlastnost place-content](../dist/images/medium/vdlayout/css-place-content-schema.jpg)

<div class="web-only" markdown="1">

Vlastnost `place-content` patří do specifikace pro zarovnání boxů – [CSS Box Alignment](css-box-alignment.md).

Počítá se však s použitím pro [flexbox](css-flexbox.md), [grid](css-grid.md), ale také [vícesloupcový layout](css-multicolumn.md).

</div>

<div class="ebook-only" markdown="1">

→ [vrdl.in/csspc](https://www.vzhurudolu.cz/prirucka/css-place-content)

</div>

</div>

`place-content` je zkratkou pro tyto vlastnosti:

- [`justify-content`](css-justify-content.md)
- [`align-content`](css-align-content.md)

Zapisuje se takto:

```css
place-content: 
  <hodnota align-content> 
  <hodnota justify-content>;
```

Nastavuje výchozí hodnotu obou vlastností pro všechny položky uvnitř kontejneru.

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


Pokud v deklaraci `place-content` neuvedete druhou hodnotu, použije se první hodnota pro obě vlastnosti, ale jen za předpokladu, že je pro obě vlastnosti platná. Pokud tomu tak není, máte smůlu a bude neplatná celá deklarace.

Připomínám, že ve flexboxu může být využití vlastnosti [`justify-content`](css-justify-content.md) vcelku omezené. Pokud totiž použijete nastavení šířky položky pomocí `flex` nebo `flex-grow`, položka se roztáhne do volného prostoru a `justify-content` pak nebude mít co rozdělovat.

## Jednoduchý příklad {#priklad}

V ukázce si hrajeme s dvousloupcovým kontejnerem gridu.

```html
<div class="container">
  <div class="item item--1">Item 1</div>
  <div class="item item--2">Item 2</div>
  <div class="item item--3">Item 3</div>
</div>
```

CSS pro rozvržení:

```css
.container {
  display: grid;
  grid-template-columns: repeat(2, 5em);
  height: 20em;
}
```

Všechny tři položky mají omezenou výšku i šířku:

```css
.item {  
  padding: 1em;
  height: 5em;
  width: 5em;
}
```

To aby byl hezky vidět efekt distribuce volného prostoru mezi položkami, který způsobuje vlastnost `place-content`.

<figure>
<img src="../dist/images/original/vdlayout/css-place-content-grid.jpg" width="1600" height="450" alt="place-content: space-between end v gridu - v Chrome při zapnutém layout overlay">
<figcaption markdown="1">
Nastavení place-content:space-between end v gridu.
</figcaption>
</figure>

Využíváme zde tuto hodnotu:

```css
.container {
  place-content: space-between end;
}
```

Položky tedy zarovnáváme svisle tak, aby mezi nimi vznikla rovnoměrná mezera (`space-between`), a vodorovně na konec hrany kontejneru (`end`).

CodePen: [vrdl.in/zlhko](https://codepen.io/machal/pen/PoNJVPm?editors=1100)

<div class="pbi-avoid" markdown="1">

## Možné hodnoty

Podívejte se na referenční příručku k oběma vlastnostem, pro které je `place-content` zkratkou:

- [`justify-content`](css-justify-content.md)
- [`align-content`](css-align-content.md)

## Podpora v prohlížečích

Vlastnost `place-content` funguje ve všech prohlížečích kromě MSIE 11.

Více informací hledejte na CanIUse. [caniuse.com/place-items](https://caniuse.com/#search=place-items).

<!-- AdSnippet -->

</div>
<!-- .pbi-avoid -->
