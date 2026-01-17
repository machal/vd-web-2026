---
postID: 60
postTitle: '11 tipů pro Bootstrap, které jste možná neznali'
postUrlId: bootstrap-tipy
postDateTime: 2016-05-25
excerpt: 'Bootstrap je z principu věci složitý jako ruská ponorka. Všechny její čudlíky prostě znát nemůžete.'
postStatus: Published
authorID: 1
sectionID: 1
category:
  - bootstrap
no_ads: false
include_rss: true
category_highlight: true
og_title: '11 tipů pro Bootstrap, které jste možná neznali'
og_description: 'Bootstrap je z principu věci složitý jako ruská ponorka. Všechny její čudlíky prostě znát nemůžete.'
og_type: article
---

# 11 tipů pro Bootstrap, které jste možná neznali

Bootstrap je z principu věci složitý jako ruská ponorka. Všechny její čudlíky prostě znát nemůžete. Vybral jsem ty z nich, které by zasloužily vytáhnout z hlubin oceánu. Povídat si budeme o aktuální verzi tři, protože [Bootstrap čtyřka](http://v4-alpha.getbootstrap.com/) je stále v alfa stádiu.

## 1) Bootlint validátor

Revizor  [častých chyb](https://github.com/twbs/bootlint/wiki), které lidé dělají v bootstrapím HTML. Autoři Bootstrapu si jej napsali jako robota, kontrolujícího pull requesty, ale pro vás je dostupný v podobě Grunt nebo Gulp pluginů. A taky jako [online nástroj](http://www.bootlint.com/).

## 2) Ne, nemusí být responzivní

Od-responzivnění se může hodit třeba když generujete tiskové verze nebo PDF z bootstrapího HTML.  V zásadě stačí odstranit  [meta značku pro viewport](http://www.vzhurudolu.cz/prirucka/viewport-meta) a šířku u `.container`. Podívejte se ale raději [na celý návod](http://getbootstrap.com/getting-started/#disable-responsive).

## 3) Pan Křížek a paní Stříška

Vypadá to jako blbost, ve skutečnosti jde ale o užitečný důsledek toho, že se autoři Bootstrapu snaží i části komponent vyrábět s ohledem na znovupoužitelnosti ve vašem kódu.

„Zavírací“ křížek, který můžete využít ve vašich vlastních komponentách:

```html
<button type="button" class="close" aria-label="Close">
  <span aria-hidden="true">×</span>
</button>
```

Podobně lze pro vlastní komponenty ukrást i paní Stříšku, indikátor rozklikávání:

```html
<span class="caret"></span>
```

<iframe height='300' scrolling='no' title='Bootstrap: Close Icon and Caret' src='//codepen.io/machal/embed/JXgwgV/?height=300&theme-id=502&default-tab=html,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/machal/pen/JXgwgV/'>Bootstrap: Close Icon and Caret</a> by Martin Michálek (<a href='https://codepen.io/machal'>@machal</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## 4) Všechno možné vodorovné centrování

Centrování v CSS je na seznamu děsných lidských problémů tak dlouho, že se s ním trápili snad i staří Egypťané. Autoři Bootstrapu to naštěsti vyřešili za vás. Stačí si pamatovat dvě třídy. 

Pro blokové elementy to je `.center-block`:

```less
.center-block {
  display: block;
  margin-left: auto;
  margin-right: auto;
}

// Použití jako mixin
.element {
  .center-block();
}
```

Pro inline a inline-block elementy pak třídu `.text-center`, ta dělá pouhé `text-align: center`. 

## 5) Schovávání a zobrazování obsahu

Triviální problém? Těžko. Jen si spočítejte potřebné mixiny a třídy:

- `.show` –  zobrazení elementu. ( ve zdroji `display: block !important`)
- `.hidden` –  schování elementu. (`display: none !important`)
- `.invisible` – nastavení „neviditelnosti“ elementu (`visibility: hidden`)
- `.text-hide` – schování textu, třeba proto aby byla vidět ikonka na pozadí

### …na konkrétních breakpointech

Schovávání je jednoduché – třída má formát `.hidden-(breakpoint)`. Pro tichou likvidaci elementu na největších displejích tedy použijeme `.hidden-lg`.

Třída pro zobrazení má formu `.visible-(breakpoint)-(hodnota-display)`. Pro zobrazení `inline-block` elementu jen na nejmenších displejích použijeme `.visible-xs-inline-block`. Podívejte se prosím raději na [všechny kombinace tříd](http://getbootstrap.com/css/#responsive-utilities-classes).

### …pro tisk

Podobně jako u breakpointů máme sadu tříd pro zobrazení (`.visible-print-block`, `.visible-print-inline`, `.visible-print-inline-block`) a jedinou pro schování – `.hidden-print`.

### …pro obsah určený slepeckým čtečkám

- `.sr-only` – zobrazit jen na slepeckých čtečkách („Screen Reader Only“)
- `.sr-only-focusable` – schová se, ale pokud se na něj uživatel dostane lineárním procházením (třeba klávesnicí), znovu se zobrazí – respektive, slepecký odečítač jej přečte

```html
<a class="sr-only sr-only-focusable" 
  href="#content">
    Jdi na obsah stránky
</a>
```

```less
.skip-navigation {
  .sr-only();
  .sr-only-focusable();
}
```

## 6) Mixina pro velikost

Nic jako dostavba Temelína, prostě jen drobnost co vám může zjednodušit zapisování rozměrů ve vlastním LESS kódu:

```less
.size(@width; @height) {
  width: @width;
  height: @height;
}

.square(@size) {
  .size(@size; @size);
}

// Použití
.my-icon { 
  .square(64px); 
}
```

## 7) Automatické vytečkování delšího textu

Ano, i mixina pro vytečkování jednořádkového textu pomocí [Text Overflow](http://www.vzhurudolu.cz/prirucka/css3-text-overflow) je v Bootstrapu vestavěná.

```less
.text-overflow() {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

// Použití
.nav-item {
  display: inline-block;
  .text-overflow();
}
```

## 8) Změna vizuální hierarchie nadpisů

Často se stává, že logika struktury dokumentu je jiná než vizuální  hierarchie stránky. Víte, že i tohle je v Bootstrapu vestavěné v podobě tříd `.h1` až `.h6`?

```html
<h2 class="h3">
  Nadpis druhé úrovně, který 
  bude vypadat jako třetí úrovně
</h2>  
```

##  9) * { box-sizing: border-box; }

Opakování je matka moudrosti. I tenhle, většině profesionálních kodérů dobře známý zápis, může uživatelům Bootstrapu zamotat hlavu. 

Hlavně těm, co kolem CSS chodí jako kolem horké kaše. A že jich je hodně! Vždyť jsou jednou z hlavních cílových skupin Bootstrapu.

Pokud se ve vašem CSS kódu „podivně“ počítají výšky a šířky, může za to `box-sizing`. Přepne vám veškeré styly do [border-boxu](http://www.vzhurudolu.cz/prirucka/css3-box-sizing). Podivnosti nastanou i [při vkládání komponent třetích stran](http://getbootstrap.com/getting-started/#third-box-sizing) – třeba Google Maps.

## 10) Data-atributy pro konfiguraci JS komponent

Nezapomeňte, že během jednoduchých použití Bootstrapu nemusíte komponenty konfigurovat  javascriptovým kódem. U většiny komponent si vystačíte s data-atributy.

Takový dropdown sice můžete označit a inicializovat „klasicky“ v JS kódu:

```javascript
$('.dropdown-toggle').dropdown()
```

Elegantnější je ale udělat to v data-atributu přímo v HTML:

```html
<button data-toggle="dropdown">
  Dropdown
</button>  
```

## 11) Vlastní třídy pro layout

Tohle je jedno z oblíbených témat [na Bootstrap školeních](http://www.vzhurudolu.cz/kurzy/bootstrap). Někomu prostě nevoní zápis layoutu, který si Bootstrap v klasickém užití vynucuje:

```html
<div class="row">
  <div class="col-sm-8 col-lg-9" 
    role="main">
    ...
  </div>
  <div class="col-sm-4 col-lg-3" 
    role="complementary">
    ...
  </div>
</div>
```

Nic ale nebrání hezkému zápisu tohoto typu:

```html
<div class="content-container">
  <div role="main">...</div>
  <div role="complementary">...</div>
</div>
```

Jak na to? Stačí Bootstrap používat doporučovaným způsobem – s pomocí [CSS preprocesoru](http://www.vzhurudolu.cz/blog/12-css-preprocesory-1). Mixiny pro layout jsou k dispozici, takže v LESS kódu napíšeme:

```less
.content-container {
  .make-row();
}

[role="main"] {
  .make-sm-column(8);
  .make-lg-column(9);  
}

[role="complementary"] {
  .make-sm-column(4);
  .make-lg-column(3);
}
```

Výsledný CSS kód bude totožný s předchozím. Bootstrap samozřejmě nabízí mnohem více [mixin pro  tvorbu layoutu](http://getbootstrap.com/css/#grid-less).

---

Líbilo? Ocením, když článek nasdílíte ostatním. Máte další tipy? Neváhejte je přidat do komentářů. Díky!