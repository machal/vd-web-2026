---
id: css3-box-sizing
heading: 'CSS3 Box Sizing'
date: 2013-08-01
perex: 'Změna způsobu počítání šířky a výšky elementu, jinak též řečeno box-modelu.'
published: true
category:
  - css3
  - css
og_title: 'CSS3 Box Sizing'
og_description: 'Změna způsobu počítání šířky a výšky elementu, jinak též řečeno box-modelu.'
og_type: article
---

CSS3 Box Sizing: způsob počítání velikosti boxu
===============================================

Změna způsobu počítání šířky a výšky elementu, jinak též řečeno box-modelu.

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


Dozvíte se, proč `box-sizing: border-box` milují vývojáři, kteří dělají fluidní layout, a taky nepřátelé počítání. Čtěte dále.

## Syntaxe

```css
box-sizing: content-box | border-box | padding-box;
```

Vzpomínáte na tradiční box-model, který počítal IE6 a starší v nestandardním módu? Nevzpomínáte? Gratuluji, jste šťastní lidé. [wikipedia.org/wiki/Internet_Explorer_box_model_bug](http://en.wikipedia.org/wiki/Internet_Explorer_box_model_bug)

```
Šířka nebo výška elementu =
viditelná šířka nebo výška obsahu
+ padding + border.
```

Už víte? To je **`border-box` box-model**.

![Box Sizing](../dist/images/original/box-sizing.svg)

Naproti tomu **`content-box` neboli „W3C box-model“** používají všechny moderní prohlížeče. Výpočet znáte:

```
Šířka nebo výška elementu =
viditelná šířka nebo výška obsahu.
```

A to je taky přednastavená hodnota vlastnosti `box-sizing`, kterou – naštěstí – můžeme změnit.

<!-- AdSnippet -->

Pro pořádek uveďme, jak se počítá šířka a výška elementu u `box-sizing: padding-box` – je to vlastně `border-box`, kde se do výpočtu nepřipočítá šířka vlastnosti `border`.

Dobře, ale jak to můžeme využít? Podívejme se na několik možných scénářů.

## Příklady využití

### `* { box-sizing: border-box }`

Někdo využívá vlastnosti box-sizing v situaci, kdy se mu špatně pracuje s W3C box modelem. Ten totiž významná část webových vývojářů považuje za neintuitivní. Takoví pak prohlížeče nechávají počítat v border-box všechny elementy. Podobný přístup mají i moderní frontend frameworky Bootstrap nebo Foundation.

### Fluidní layout

Mnoho využití má tato vlastnost v responzivním webdesignu, konkrétně při práci s layoutem definovaným v procentuálních jednotkách. Představte si například navigaci, jež má vždy 5 položek. Šířka jedné pak bude 20 %. Oddělovač mezi položkami je vytvořený rámečkem fixní šířky:

```css
.nav li {
  width: 20%;
  display: inline-block;
  border-left: .25em solid #fff;
}
```

Jenže takhle nám pátá  položka navigace odskočí na další řádku. Potřebujeme však jen prohlížeči oznámit, ať laskavě šířku položek navigace počítá pomocí `box-sizing: border-box`:

```css
.nav li {
  box-sizing: border-box;
  width: 20%;
  display: inline-block;
  border-left: .25em solid #fff;
}
```

Živá ukázka příkladu je na [cdpn.io/e/FeLkJ](https://cdpn.io/e/FeLkJ).


### Změna počítání rozměrů formulářových elementů

Vlastnost `box-sizing` se moc hodí na sjednocení způsobu počítání výšky nebo šířky formulářových elementů. Některé z nich totiž prohlížeče počítají jako `content-box` a některé `border-box` způsobem (např. `input type=„submit“ `nebo `select`). Pokud chcete zajistit stejnou výšku formulářových prvků ve vašem designu, než je začnete stylovat, přepněte si je nejlépe do `box-sizing: border-box`. Živá ukázka problému s formulářovými elementy je na [cdpn.io/e/iBquK](https://cdpn.io/e/iBquK).

## Podpora v prohlížečích

IE7+ a všechny moderní prohlížeče. Pokud jste vlastnost neznali, budete se divit, jak výborně je podporována. [caniuse.com/box-sizing](https://caniuse.com/box-sizing)

Je ale dobré vědět, že méně používanou hodnotu `padding-box` podporuje jen Firefox.


