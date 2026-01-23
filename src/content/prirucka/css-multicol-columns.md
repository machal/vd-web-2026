---
id: css-multicol-columns
tags: ['css']
title: 'Vlastnosti column-width, column-count a columns: počet sloupců a jejich šířka ve vícesloupcovém rozložení'
heading: 'Vlastnosti column-width, column-count a columns: počet sloupců a jejich šířka ve vícesloupcovém rozložení'
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
---# Vlastnosti column-width, column-count a columns: počet sloupců a jejich šířka ve vícesloupcovém rozložení

Pokud chcete pro rozvržení použít CSS Multi-column Layout, pak je nutné začít alespoň jednou z těchto vlastností.

<div class="book-index" data-book-index="column-width"></div>
<div class="book-index" data-book-index="column-count"></div>
<div class="book-index" data-book-index="columns"></div>

<div class="connected" markdown="1">

![column-width, column-count a columns](../dist/images/small/vdlayout/css-multicol-columns-scheme.jpg)

<div class="web-only" markdown="1">

Vlastnosti `column-width`, `column-count` a `columns` patří do specifikace vícesloupcového layoutu – [CSS Multi-column Layout](css-multicolumn.md).

</div>

<div class="ebook-only" markdown="1">

→ [vrdl.in/colc](https://www.vzhurudolu.cz/prirucka/css-multicol-columns)

</div>

</div>

- `column-width` – nastavíte doporučenou šířku sloupce, jejich počet se pak přizpůsobí šířce rodiče.
- `column-count` – rozvržení definujete přes počet sloupců, zde se naopak přizpůsobí jejich šířka.
- `columns` – zkratka pro obě vlastnosti.

<div class="web-only" markdown="1">

Zejména vlastnost `column-width` je u vícesloupcového rozvržení v CSS kouzelná.

Umožňuje totiž dělat něco jako automatický responzivní layout. Tedy určit počet sloupečků automaticky podle dostupného prostoru.

</div>

<figure class="figure-thirds">
<img src="../dist/images/original/vdlayout/css-multicol-columns.jpg" width="1600" height="900" alt="CSS vlastnosti column-width, column-count a columns">
<figcaption markdown="1">
Tady je máme. Vlastnost columns je zkratkou pro dvě jiné, column-width a column-count. V tomto případě jsme vyrobili rozvržení, které obsahuje maximálně tři sloupce o šířce 20em.
</figcaption>
</figure>

## Vlastnost column-width: doporučená šířka sloupce {#column-width}

Vlastnost nastaví doporučenou šířku všem sloupcům v kontejneru.

Možné hodnoty:

- `auto` (výchozí) – šířka se nebere v potaz, pravděpodobně se tedy použije hodnota `column-count`.
- `<délka>` – jakýkoliv rozměr v délkových jednotkách. Použité hodnoty se vždy upraví na minimum `1px`.

<div class="web-only" markdown="1">

→ *Související: [Jednotky pro tvorbu webu](jednotky.md)*

</div>

Skutečná šířka sloupce může být širší, aby vyplnila dostupný prostor, nebo užší, ale to pouze pokud je dostupný prostor menší než zadaná šířka sloupce.

## Vlastnost column-count: počet sloupců {#column-count}

Vlastnost nastaví počet sloupců v kontejneru.

Možné hodnoty:

- `auto` (výchozí) – počet sloupců se nebere v potaz, pravděpodobně se tedy použije hodnota z `column-width`.
- `<počet>` – jakékoliv celé číslo větší než 0.

Teď přichází trik. Pokud nastavíte vlastnosti `column-width` i `column-count`, z logiky už napsaného by měly jít proti sobě, že?

Jenže nikoliv. Prohlížeče by měly vzít v potaz obojí a celočíselná hodnota v `column-count` pak popisuje _maximální_, nikoliv jasně daný počet sloupců.

## Zkratka columns (column-width a column-count) {#columns}

Vlastnost `columns` je zkratkou pro obě výše uvedené:

```css
columns: <column-width> <column-count>
```

Na pořadí v deklaraci tentokrát nezáleží, prohlížeč pozná definovanou vlastnost podle hodnoty – buď jde o celé číslo nebo o délkovou jednotku.

Ukázky možných hodnot:

```css
/* column-width: 20em; column-count: auto: */
columns: 20em;

/* column-width: 20em; column-count: auto: */
columns: auto 20em;

/* column-width: auto; column-count: 3: */
columns: 3;

/* column-width: auto; column-count: 3: */
columns: 3 auto;

/* column-width: auto; column-count: auto: */
columns: auto;

/* column-width: auto; column-count: auto: */
columns: auto auto;
```

## Příklad {#priklad}

U připraveného dema pro vlastnost `columns` už víte, že obstarává obě možnosti – definici počtu sloupců anebo definici jejich šířky.

CodePen: [vrdl.in/mlvu3](https://codepen.io/machal/pen/mdrMYBE?editors=1100)

Pokud si příklad vyzkoušíte naživo, uvidíte, že můžete přepínat mezi několika možnostmi zobrazení. Pro případ, že nezkoušíte a jen čtete, zde uvádím všechny:

- `columns:auto` – vícesloupcový layout se vůbec nepoužije.
- `columns:20em` – doporučená šířka sloupce je `20em`. Je to stejné, jako byste napsali `column-width:20em`. Při testování v různě širokých oknech prohlížeče uvidíte jeden až pět sloupců. Měly by být široké kolem 400 pixelů, protože velikost písma je zde kolem `20px`. Tady jde ovšem o doporučení, takže v prohlížeči uvidíte šířky od 400 až po 650 pixelů.
- `columns:3` – na každé šířce okna se vykreslí tři sloupce. Prohlížeč zde nepoužije jinou variantu ani na nejmenších rozlišeních.
- `columns:3 20em` – zde deklarujeme jak počet sloupců (`column-count:3`), tak doporučenou šířku (`column-width:20em`). Prohlížeče se zde chovají konzistentně – drží se doporučené šířky, ale nikdy nevykreslí více než tři sloupce.

## Podpora v prohlížečích {#podpora}

V případě `column-width`, `column-count` i `columns` není důvod se s podporou v prohlížečích stresovat.

Tabulky na CanIUse jsou u těchto tří vlastností zelené jako pečlivě udržovaný fotbalový trávník. Dobře je zvládaly dokonce Explorery verze 11 i 10 (!). [caniuse.com/column](https://caniuse.com/?search=column)

Narazil jsem jen na menší vykreslovací bugy v Safari, takže vícesloupcový layout raději otestujte i v prohlížeči od Applu. Jsou to ale jen opravdu malé nedostatky, rozhodně se nebojte tyto vlastnosti použít.

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

