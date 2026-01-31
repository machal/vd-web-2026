---
postID: 39
postTitle: 'Bootstrap 4: SASS, flexbox a další novinky'
category:
  - css
postUrlId: bootstrap-4
postDateTime: 2015-09-30
excerpt: 'Od čtyřky nečekejte žádné bombastické novinky, ale to je dobře.'
postStatus: Published
authorID: 1
sectionID: 1
no_ads: false
include_rss: true
category_highlight: true
og_title: 'Bootstrap 4: SASS, flexbox a další novinky'
og_description: 'Od čtyřky nečekejte žádné bombastické novinky, ale to je dobře.'
og_type: article
---

# Bootstrap 4: SASS, flexbox a další novinky

Nová verze přichází v duchu konzervativní strategie tvůrců Bootstrapu. Dělat  lépe co už umí. Od čtyřky tedy nečekejte žádné bombastické novinky, ale je to dobře. 

Bručoun by řekl, že – co se nových vlastností týká – Bootstrap jen dotahuje [konkurenci](http://foundation.zurb.com/). Já říkám, že v branži není co objevovat. A na rozdíl od konkurence jde Bootstrap [do hloubky](https://www.facebook.com/VzhuruDolu/photos/pb.280644995384985.-2207520000.1443516523./513014918814657/?type=3&theater) a odladí více detailů.

Bootstrap 4 je v alfa fázi, proto [i školení](http://www.vzhurudolu.cz/kurzy/bootstrap) zatím primárně orientuji na třetí verzi s tím, že novinky ve čtyřce zmiňuji průběžně.

![Bootstrap 4](/assets/img/content/dest/bootstrap-4.webp)

## LESS → SASS

Začátečníkům jsem vždy doporučoval [CSS preprocesor](http://www.vzhurudolu.cz/blog/12-css-preprocesory-1) LESS, takže se možná budete divit, že volám: dobrá zpráva!

LESS je skvělý pro 80 % využití preprocesorů – na webech a v menších aplikacích. Je to prostě trochu lepší CSS. Drží se jeho deklarativní povahy a nezatěžuje složitostmi. Když ale děláte komplexní software typu frontend frameworku, chybí vám trochu té programátorské imperativnosti. A to je přesně důvod, proč jít do SASSu – v kódu Bootstrapu není cyklus (`@each`) nebo podmínka (`@if`/`@else`) žádnou výjimkou.

Navíc – Bootstrap teď díky [Libsass](http://sass-lang.com/libsass) kompiluje daleko rychleji.

### Imperativně/deklarativní špagety Bootstrap neservíruje

SASS v rukou programátora dokáže naprosto devastovat žádanou jednoduchost CSS kódu. Konkurenční framework Foundation se díky tomu dostal do pekla imperativnosti. Jeho kódu není pro UI vývojáře jednoduché rozumět. Imperativně-deklarativní spaghetti code, fujky. Je skvělé, že se tomuhle lákadlu podařilo týmu stojícímu za Bootstrapem odolat. Krásně oddělují [programátorské imperativní mixiny](https://github.com/twbs/bootstrap/blob/v4-dev/scss/mixins/_buttons.scss) od [CSS kódu](https://github.com/twbs/bootstrap/blob/v4-dev/scss/_buttons.scss). Srovnejte [s děsivým kódem stejné komponenty](https://github.com/zurb/foundation/blob/master/scss/foundation/components/_buttons.scss) Foundation.

## IE9+

Pokud Bootstrap nasazujete na weby dostupné širokému publiku, tohle pro vás může být nejkontroverznější novinka. Z pohledu tvůrců Bootstrapu je to ale pochopitelné, a dokonce i v českém rybníku je podíl nejstaršího Exploreru naprosto minimální – aktuálně [výrazně pod tři procenta](http://rankings.cz/en/rankings/web-browsers-details.html). 

Nepodpora IE8 a starších samozřejmě neznamená nedostupnost obsahu, jen nepřítomnost layoutu, funkčních javascriptových rozšíření a občas horší typografii.

## Nová mřížka a flexbox

Komponenta pro layout přidala jeden breakpoint pro mobilní zařízení, což bylo fakt potřeba:

```scss
$grid-breakpoints: (
  // Extra small screen / phone
  xs: 0,
  // Small screen / phone
  sm: 34em,
  // Medium screen / tablet
  md: 48em,
  // Large screen / desktop
  lg: 62em,
  // Extra large screen / wide desktop
  xl: 75em
) !default;
```

```scss
@include media-breakpoint-up(xs) { ... }
@include media-breakpoint-up(sm) { ... }
@include media-breakpoint-up(md) { ... }
@include media-breakpoint-up(lg) { ... }
@include media-breakpoint-up(xl) { ... }
```

Navíc je možné si  pro mřížku a komponenty zapnout [flexbox layout](http://www.vzhurudolu.cz/prirucka/css3-flexbox). U mřížky je flexbox výhodný například pro:

* dorovnávání výšky jednotlivých sloupců
* možnost prohazování pořadí sloupců
* jednoduché vertikální zarovnávání, včetně centrování

Raději upozorňuji, že flexbox [nebyl navržen pro celostránkové layouty](https://jakearchibald.com/2014/dont-use-flexbox-for-page-layout/) a tak  se velmi složité mřížky nemusí na pomalých zařízeních vykreslovat právě optimálně. 

Zapnout si flexbox je v Bootstrapu jednoduché:

```scss
$enable-flex: true;
```


## `rem` typografie

[Jednotka `rem`](http://www.vzhurudolu.cz/prirucka/css3-jednotky) je pravým požehnáním responzivních webů a doufám, že se brzy stane standardem. Nesmí se samozřejmě zapomínat na automaticky generovaný pixelový fallback pro staré prohlížeče:

```css
font-size: 16px;
font-size: 1rem;
```

V Bootstrapu 4 je proto lepší tvořit odsazení pomocí `rem`, nikoliv preprocesorové proměnné:

```css
margin-bottom: .5rem;
```


## Další novinky

- Zrušili komponenty Well, Thumbnail a Panel. Nahrazeny jsou [komponentou Card](http://v4-alpha.getbootstrap.com/components/card/).
- Bootstrap tým vytvořil novou resetovací komponentu pro základní nastavení CSS – [Reboot](http://v4-alpha.getbootstrap.com/content/reboot/). Celý Boostrap je opět v [`box-sizing: border-box`](http://www.vzhurudolu.cz/prirucka/css3-box-sizing).
- Nová globální nastavení – například stíny a gradienty lze vypnout globálními proměnnými. Viz proměnná `$enable-rounded` a další.
- Autorský tým produkuje a prodává oficiální [Bootstrap šablony](http://themes.getbootstrap.com/). Zatím je jich pomálu, ale v dlouhodobé perspektivě to dává smysl pro obě strany.