---
id: css-flex-shrink
title: 'CSS vlastnost flex-shrink: faktor smršťování položky flexboxu'
heading: 'CSS vlastnost flex-shrink: faktor smršťování položky flexboxu'
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
# CSS vlastnost flex-shrink: faktor smršťování položky flexboxu

Jakým podílem se může položka flexboxu zmenšovat, pokud v rodičovském kontejneru místo ubylo? Od toho máme vlastnost `flex-shrink`.

<div class="connected" markdown="1">

![CSS vlastnost flex-shrink](../dist/images/medium/vdlayout/css-flex-shrink-schema.jpg)

<div class="web-only" markdown="1">

`flex-shrink` je jedna z vlastností [flexboxu](css-flexbox.md).

</div>

<div class="ebook-only" markdown="1">

<div class="book-index" data-book-index="flex-shrink"></div>

→ [vrdl.in/cssfs](https://www.vzhurudolu.cz/prirucka/css-flex-shrink)

</div>

</div>

Také v jejím případě platí, že je obecně lepší místo ní používat [zkratku `flex`](css-flex.md). Problematikou smršťování položek flexboxu se tady ale zabývat budeme, to si pište, že ano.

Možné hodnoty:

- `1` (výchozí)  
Položka si z vlastní šířky ubere část odpovídající celé velikosti smrštění.
- Kladná čísla (např. `0.5`, `1`, `2`…)  
Položka si ze své šířky vezme podíl z ubrané části kontejneru odpovídající tomuto číslu.
- `0`  
Položka je tvrdohlavá a smršťovat se nebude. A nebude!

Možná to celé zní trošku zašmodrchaně a bude lepší ukázat si to na obrázku a interaktivním demu.

## Demo {#demo}

Pevně doufám, že když se podíváte na obrázek, problematiku smršťování a vlastnosti `flex-shrink` pochopíte snáze.

<figure>
<img src="../dist/images/original/vdlayout/css-flex-shrink.jpg" width="1600" height="900" alt="CSS vlastnost flex-shrink">
<figcaption markdown="1">
Různé hodnoty vlastnosti flex-shrink na první položce způsobují různé smršťování.
</figcaption>
</figure>

Na rodiči (`.container` s nastavením `display:flex`) zde leží tíha udržet na uzdě tři potomky (`.box`):

```html
<div class="container">
  <p class="box box--one"><strong>Item 1<br>(styled)</strong></p>
  <p class="box box--two"><strong>Item 2</strong></p>
  <p class="box box--three"><strong>Item 3</strong></p>  
</div>
```

Demo jsme obohatili ještě o nastavení každého potomka tak, aby se pokoušel urvat co nejvíce prostoru z rodiče:

```css
.box {
  width: 100%;
}
```

Ta paralela se skutečným rodičovstvím je zde až mrazivá. Mámy a tátové mezi čtenáři vědí, že takhle rozpínavé děti, bojující o každičký kousíček naší pozornosti, nechceme, ale nakonec jsou takové nějakou chvíli všechny. Raději se vraťme k CSS…

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


Podívejme se na různé možnosti nastavení `flex-shrink`, které dostává první dítě  (nebo raději _potomek_) jménem `.box`:

- `0` – nesmršťuje se. Nebude se za žádnou cenu omezovat. Jednou jsme ale řekli `width:100%`, tak co bychom také chtěli?… Podřídí se tomuto pravidlu a oba ostatní sourozence vytlačí ven. Vzhledem k tomu, že výchozí hodnota `flex-shrink` je `1`, sourozenci si poctivě ze své šířky ubrali.
- `0.5` – ubere si polovinu oproti sourozencům, takže při zmenšování rodičovského prvku zabírá stále více místa.
- `1` – v tomto případě se všichni potomci spravedlivě smršťují stejným podílem. (Z pohledu rodiče ideální stav.)
- `2` – první položka si ubírá dvojnásobek oproti zbylým dvěma.

Je to trochu jasnější? Snad ano. Živou ukázku hledejte v následujícím odkazu.

CodePen: [vrdl.in/uqz1m](https://codepen.io/machal/pen/GRNJNVg?editors=0000)

## Podpora v prohlížečích {#podpora}

Podpora vlastnosti `flex-shrink` je plná. Internet Explorer 10 používá jako výchozí hodnotu chybně 0, ale tuto informaci už v 21. století potřebovat nebudete. Vše o podpoře najdete na webu [CanIUse.com](https://caniuse.com/mdn-css_properties_flex-shrink).

<!-- AdSnippet -->