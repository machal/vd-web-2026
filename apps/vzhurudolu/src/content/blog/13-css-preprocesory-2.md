---
postID: 13
postTitle: 'Průvodce CSS preprocesory: technické vlastnosti'
postUrlId: css-preprocesory-2
postDateTime: 2014-03-18
excerpt: 'Minule jsme si s preprocesory poprvé podali ruku a dneska je necháme, aby nás vedly a ukazovaly co umí.'
postStatus: Published
authorID: 1
sectionID: 1
category:
  - css
no_ads: false
include_rss: true
category_highlight: true
og_title: 'Průvodce CSS preprocesory: technické vlastnosti'
og_description: 'Minule jsme si s preprocesory poprvé podali ruku a dneska je necháme, aby nás vedly a ukazovaly co umí.'
og_type: article
---

# Průvodce CSS preprocesory: technické vlastnosti

Tohle je 2. část seriálu o CSS preprocesorech:

1. [Co a jak?](/blog/12-css-preprocesory-1)
2. Technické vlastnosti
3. [Jak vám vylepší pracovní postupy?](/blog/14-css-preprocesory-3)
4. [Který vybrat?](/blog/15-css-preprocesory-4)

Minule jsme si s preprocesory poprvé [podali ruku](http://www.vzhurudolu.cz/blog/12-css-preprocesory-1) a dneska je necháme, aby nás vedly a ukazovaly co umí. 

Pojďme se podívat na jejich nejdůležitější technické vlastnosti. Některé z nich preprocesory přibližují imperativním programovacím jazykům, některé odstraňují technické neduhy a jiné zase rozšiřují možnosti psaní spravovatelného kódu.

V následujících příkladech střídám všechny tři preprocesory, ale všechno co tu zmiňuji umí LESS, SASS i Stylus. Dobré ale vědět, že každý z preprocesorů má ještě docela dost speciálních vlastností. 

<h2 id="promenne">Proměnné</h2>

Znáte z imperativních programovacích jazyků a možná byste nevěřili jak moc mohou být užitečné v preprocesorech. 

Aktivní barvu ve své implementaci [Bootstrapu](http://www.vzhurudolu.cz/kurzy/bootstrap/) změním jednoduše předeklarováním na vyšší úrovni. Zápis v LESSu:

```less
@brand-primary: #428bca;
@import "bootstrap/bootstrap";
```

Konkurenční framework Foundation má zase v proměnné `$small-up` uloženou celou [Media Querie](http://www.vzhurudolu.cz/prirucka/css3-media-queries)  a nemusíte ji tedy psát pořád znova. SASS:

```scss
$medium-up: "only screen and (min-width: 40em)";
@media #{$medium-up} {
  // Kód pro viewporty od šířky 40em
}
```

<h2 id="mixiny">Mixiny</h2>

I vaše CSSko je plné opakujícího se kódu, proto se mixiny dnes ukazují už v každé kóderské školce. Jde o pojmenovaný kus kódu, který používáte na různých místech *codebase* pouhým voláním názvu.

První příklad je klasické použití **neparametrické mixiny** pro [ukončení obtékaní](http://nicolasgallagher.com/micro-clearfix-hack/). (LESS)

```less
.clearfix() {
  &:before,
  &:after {
    content: " "; 
    display: table;
  }
  &:after {
    clear: both;
  }
}

.el {
  .clearfix;
}
```


Zkompiluje do:

```css
.el {
  &:before,
  &:after {
    content: " "; 
    display: table;
  }
  &:after {
    clear: both;
  }
}
```

Moc užitečné jsou **parametrické mixiny** pro vypisování variant kódu kvůli různé podpoře [CSS3 vlastností](http://www.vzhurudolu.cz/prirucka/css3/). (SASS)

```scss
@mixin transition($par) {
  -webkit-transition: $par;  // Chrome 1-25, Safari 3.2+ 
  -moz-transition: $par;  // Firefox 4-15 
  -o-transition: $par;  // Opera 10.50–12.00
  transition: $par;  // Chrome 26, Firefox 16+, IE 10+, Opera 12.10+
}

.el {
  @include transition(all 100ms ease-out);
}
```

Zkompiluje do:

```css
.el {
  -webkit-transition: all 100ms ease-out;  
  -moz-transition: all 100ms ease-out;  
  -o-transition: all 100ms ease-out;  
  transition: all 100ms ease-out;  
}
```

<h2 id="extend">Extend</h2>

Extend na rozdíl od mixinů nekopíruje deklarace, ale vytváří kombinované selektory. 

Příklad v SASS:

```scss
.pel {
  color: white;
}

.mel {
  @extend .pel;
  background: black;
}
```

Zkompiluje do:

```css
.pel, .mel {
  color: white;
}

.mel {
  background: black;
}
```

Jako platí u mnoha vlastností preprocesorů, i `@extend` je dobrý sluha, ale zlý pán, takže buďte s používání opatrní, aby výsledné kombinace selektorů nebyly příliš košaté a špatně debugovatelné.

`@extend` dřív neuměl LESS, už dávno je tomu ale [jinak](http://lesscss.org/features/#extend-feature).

<h2 id="zanorovani">Zanořování a selektor rodiče</h2>

Pro začátečníky zcela návyková záležitost, která ale jen při správném (!) používání usnadní čtení a úpravy kódu: 

Vezměte třeba tenhle [BEM](http://www.vzhurudolu.cz/prirucka/bem) blok v LESSu:

```less
.nav {
  margin: 0;
  
  // Element
  &__item {
    display: inline-block;
  }

  // Modifier
  &--hidden {
    display: none;
  }
}
```

Zkompiluje do:

```css
.nav {
  margin: 0;
}

.nav__item {
  display: inline-block;
}

.nav--hidden {
  display: none;
}
```

Neberte to dogmaticky, ale pokud s preprocesory začínáte, nedoporučil bych vám zanořovat do více než 3 úrovní. Snažte se dostat délku kódu v rodiči zanoření do jedné obrazovky ve vašem editoru tak aby vždy bylo jasné komu patří ukončovací závorka. Více v [Idiomatic CSS](https://github.com/necolas/idiomatic-css/tree/master/translations/cs-CZ#preprocesory).

<h2 id="zanorovani-mq">Zanořování media queries</h2>
	
```less
.nav {
  // …
  
  @media only screen and (min-width: 768px) {
    width: 25%;
  }
}
```

Zkompiluje do:

```css
@media only screen and (min-width: 768px) {
  .nav {
    width: 25%;
  }
}
```

Vypadá to jako zbytečnost, ale je to jeden z důvodů, proč jsem CSS preprocesory začal používat já. V CSS se ve většině prohlížečů media queries zanořovat nedají a to trochu svádí k organizaci kódu přes media queries. Výhodnější je vždy [organizace přes komponenty](http://kratce.vzhurudolu.cz/post/46416507703/jake-breakpointy-zvolit-v-responzivnim-webdesignu). V příkladu výše tedy bude hlavní organizační jednotkou modul `nav` a media queries budou zanořené v něm. To chceme.

<h2 id="matematika">Matematika</h2>

Při psaní responzivního layoutu je potřeba furt něco počítat. Když zapíšete jen výsledek výpočtu, dozajista zapomenete odkud se to číslo vzalo. V běžném CSSku je tedy dobré pomáhat si komentáři:

```css
.side {
  width: 66.326530612%; /* 650 / 980 * 100 */
}
```

V preprocesoru to s využitím matematické funkce a proměnných může vypadat takto elegantně (LESS):

```less
@container-width: 980px;

.side {
  width: percentage(650 / @container-width);
}
```

V preprocesorech můžete provádět matematické operace jak s čísly tak s jednotkami nebo barvami. LESS má kompletní seznam matematických operací [tady](http://lesscss.org/functions/#math-functions), u ostatních musíte více [hledat](http://learnboost.github.io/stylus/docs/bifs.html) v [dokumentaci](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#number_operations).

<h2 id="barvy">Funkce pro práci s barvami</h2>

Typický triviální scénář je — chci barvu Y, která je o 20% tmavší než barva X, kterou grafik použil pro odkazy.

Příklad: Ztmavení barvy. Opět v LESSu:

```less
color: darken(red, 10%);
// → color: #cc0000;
```

Nebo vytvoření její poloprůhledné varianty:

```less
color: fadeout(red, 10%);
// → color: rgba(255, 0, 0, 0.9);
```

Anebo třeba smíchaní dvou barev:

```less
color: mix(red, blue, 50%);
// → color: #800080;
```

<h2 id="podminky">Podmínky</h2>

Ve Stylusu a SASSu máte k dispozici standardní `if/else` konstrukci. Viz SASS příklad:

```scss
$type: monster;

p {
  @if $type == ocean {
    color: blue;
  } @else if $type == monster {
    color: green;
  } @else {
    color: black;
  }
}
```

Zkompiluje do:

```css
p {
    color: green;
}
```

V deklarativním LESSu se podmínky dají dělat  pomocí [strážců mixin](http://lesscss.org/features/#mixin-guards-feature). Pro programátory to je trochu neobvyklé, ale pro neprogramátory – mezi které se počítám – bezproblémově čitelné.

<h2 id="cykly">Cykly</h2>

Ve Stylusu a SASSu jde cykly díky jejich „programátorské" povaze dělat poměrně elegantně.

Neměli jsme tady ještě příklad ve Stylusu, pojďme to napravit, protože v něm se tyhle pokročilejší věci píšou opravdu hezky:

```stylus
icons = facebook, twitter, google-plus;

for icon in icons {
  .{icon}-icon {
    background-image: url('/images/'+icon+'-icon.png');
  }
}
```

Zkompiluje do:

```css
.facebook-icon {
  background-image: url("/images/facebook-icon.png");
}

.twitter-icon {
  background-image: url("/images/twitter-icon.png");
}

.google-plus-icon {
  background-image: url("/images/google-plus-icon.png");
}
```

<h2 id="import">@import</h2>

Pokud importujete parciální komponentu napsanou v preprocesoru, nechová se `@import` tak jak jste zvyklí z CSS, kde vytváří requesty navíc. A [requesty bolí](http://phpfashion.com/kdy-pouzivat-preprocesory-a-kdy-ne), protože zpomalují načítání stránky, hlavně na mobilních zařízeních.

Importy už jsme řešili na začátku, takže si ukážeme něco mírně pokročilého. Pokud importujeme běžný CSS soubor, preprocesory ve zkompilovaném kódu zachovají direktivu `@import`. To chování můžeme změnit nastavením vlastnosti. LESS: 

```less
@import (less) "fancybox.css";
```

Teď už se i knihovny, které nemají LESS variantu rovnou vloží do zkompilovaného CSS.

To bychom měli ze základních vlastností vše. Další tři zajímavé vlastnosti už jen stručně:

<h2 id="dalsi">Další vlastnosti</h2>

* **Minifikace**  
Preprocesory umí minifikovat výsledný kód, aby se vašim uživatelům stránka natahovala rychleji. Dobrá věc, za lepší postup ale považuji nechat si pro potřeby lokálního ladění kompilovat čitelný CSS kód a minifikaci provádět pro potřeby produkčního serveru do jiného souboru.

* **Funkce**  
[Funkce](http://learnboost.github.io/stylus/docs/functions.html) ve Stylusu se používají podobně jako mixiny, ale i třeba na místě hodnoty vlastnosti: `padding: add(10px, 5);` Líbí? Mě jo.

* **Tiché komentáře**  

```less
// Tichý komentář se nezobrazí ve zkompilovaném CSS
/* Klasický CSS komentář ve zkompilovaném CSS zůstane */
```


## To by mohlo pro dnešek stačit, co říkáte?

Stále si myslíte, že nic ze zmíněného ve svém kódu nepotřebujete? Pozor, pozor, je krajně pravděpodobné, že se pletete. Věnujte používání preprocesoru hodinu a uvidíte.

Příště se podíváme na to v čem vězí ještě větší přínos preprocesorů — ve zkvalitnění a zrychlení vašich pracovních postupů.