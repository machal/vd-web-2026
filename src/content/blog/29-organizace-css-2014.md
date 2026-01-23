---
postID: 29
postTitle: 'Organizace CSS, verze 2014'
postUrlId: organizace-css-2014
postDateTime: 2014-11-24
excerpt: 'Volné pokračování mého 6 let starého článku o udržovatelném stylopise na Zdrojáku. Ten jsem psal v roce kdy Obamu inaugurovali prezidentem a zemřel Michael Jackson. 2009. Toto letí!'
postStatus: Published
authorID: 1
sectionID: 1
category:
  - css
no_ads: false
og_title: 'Organizace CSS, verze 2014'
og_description: 'Volné pokračování mého 6 let starého článku o udržovatelném stylopise na Zdrojáku. Ten jsem psal v roce kdy Obamu inaugurovali prezidentem a zemřel Michael Jackson. 2009. Toto letí!'
og_type: article
tags: ['organizace-css']
---
# Organizace CSS, verze 2014

Zčásti reakce na [diskuzi u Frontendistů](https://www.facebook.com/groups/frontendisti/permalink/1551757828369069/). Zčásti volné pokračování [článku](http://www.zdrojak.cz/clanky/udrzovatelny-stylopis-poradek-hacky-important/) o udržovatelném stylopise na Zdrojáku.

Ten jsem psal v roce kdy Obamu inaugurovali prezidentem a zemřel Michael Jackson. 2009. Toto letí! 

Obama je furt prezidentem, Jackson furt mrtvý, ale na frontendu se pár věcí změnilo.

Samozřejmě. Webdesign prochází responzivní revolucí. Do kódu se nám vplížily složitosti jako [media queries](http://www.vzhurudolu.cz/prirucka/css3-media-queries) a to nás tlačí k efektivnějšímu a přehlednějšímu psaní. CSS tohle ale samo o sobě nenabízí. Proto [CSS preprocesory](http://www.vzhurudolu.cz/blog/12-css-preprocesory-1). 

Dělat responzivní weby dobře je drahé a tak jsme nucení výrobu zefektivňovat. Proto větší důraz na znovupoužitelnost komponent, proto [modulární systémy](http://daverupert.com/2013/04/responsive-deliverables/) a [Bower](http://www.vzhurudolu.cz/prirucka/bower). 

A nakonec — konečně se do kóderského mainstreamu dostala [detekce vlastností](http://modernizr.com/). Nepíšeme tedy tolik kódu určeného jen pro staré prohlížeče. Smutní svědkové své doby — `ie6.css` a `ie7.css `— tiše přikyvují.

## Adresářová struktura CSS zdrojáků

U mě to dnes obvykle vypadá nějak takto:

```
index.less
base/
core/
components/
layout/
```

Pojďme si to v následujícím textu trochu rozpitvat. K dispozici zde máte strukturu dvou projektů. První je [příklad](https://github.com/machal/priklad-rwd-2014-10-01) ze [školení responzivního designu](http://www.vzhurudolu.cz/kurzy/responzivni-webdesign). Druhý pak [zdrojáky stylů tohoto blogu](https://github.com/machal/vzhurudolu-scss). 

## index.less

Ať už ho nazvete jakkoliv, je to centrální mozek stylů. Může vypadat [takto jednoduše](https://github.com/machal/priklad-rwd-2014-10-01/blob/master/less/index.less) nebo i [trochu složitěji](https://github.com/machal/vzhurudolu-scss/blob/master/index.scss). Musí být ovšem patřičně stručný a samovysvětlující. Je to soubor, který vy nebo váš kolega otevřete jako první, když chcete zjistit, jak je projekt organizovaný. 

[Chytří lidé](https://twitter.com/koucik) mě naučili jak moc důležité je, aby to v adresáři se styly byl vždy jediný soubor. 

## Typografická základna

```
/base/text.less
/base/fonts.less
/base/table.less 
…
```

Cože? Typografická základna? Říkejte třeba [vertikální rytmus](http://www.smashingmagazine.com/2012/12/17/css-baseline-the-good-the-bad-and-the-ugly/) nebo lineární design, když chcete. Pro mě je to základní stavební vrstva, proto `/base`.

Čistě technicky bráno — stylujete tady základní HTML elementy, nepřidáváte moc tříd.

Můžete tady mít třeba resetovací CSS našich věků, [Normalize.css](http://necolas.github.io/normalize.css/), který sjednotí výchozí vzhled dokumentu napříč prohlížeči. Doporučuji jej ale raději nainstalovat pomocí Boweru.

[text.less](https://github.com/machal/priklad-rwd-2014-10-01/blob/master/less/base/text.less) tvoří další vrstvu nad normalizací. Pro větší a související části základny je lepší mít zvláštní soubor — například [table.less](https://github.com/machal/priklad-rwd-2014-10-01/blob/master/less/base/table.less) nebo [map.less](https://github.com/machal/priklad-rwd-2014-10-01/blob/master/less/base/map.less).

Ještě jeden soubor typický pro tenhle adresář – něco jako [fonts](https://github.com/machal/vzhurudolu-scss/blob/master/base/vd-fonts.scss)[.less](https://github.com/machal/vzhurudolu-scss/blob/master/base/vd-fonts.scss) co obsahuje deklarace webových fontů.

## Programátorské jádro

```
/core/mixins.less
/core/helpers.less
/core/variables.less
…
```

V `/core` ta imperativnější (chcete-li programátorštější část kódu). Vše co mě usnadňuje psát další kód, ale samo o sobě nicmoc nedělá. Proměnné, vlastní mixiny nebo helper třídy. A taky to co se nevejde jinam. Tři tečky za „more…" jsou v adresáři `/core`. :)

Proměnné — krásné téma pro odbočku! Bacha, ať to s nimi nepřeženete. Ano, ve zdrojácích Bootstrapu jsou jich [stovky](https://github.com/twbs/bootstrap/blob/master/less/variables.less). Jenže Bootstrap má velmi pravděpodobně zcela jiný scénář použití než zdrojáky vašeho projektu. Zvažte dvakrát, jestli hodnotu používáte tak často, že musí do proměnné. Ve svém kódu mám v proměnných obvykle jen základní barvy a nejdůležitější breakpointy v media queries.

## Komponenty uživatelského rozhraní

```
/components/article-items.less
/components/buttons.less
/components/nav.less
/components/icons.less
…
```

U mě rozhodně největší kus kódu. A nejoblíbenější! Navigace, tlačítka, stránkování, seznamy článků… kostky Lega, ze kterých skládám uživatelská rozhraní webů. 

Někdy je můžu použít na jiných projektech, někdy jsou znovupoužitelné jen v rámci aktuálního webu. Vždy jsou izolovány ve zvláštním souboru.

Pokud už modulární systém tvoříte, rozhodně zvažte možnost [generování dokumentace](http://styleguides.io/). Je to skvělý komunikační nástroj mezi vývojáři, designéry i třeba produkťáky a dlouhodobě zefektivňuje vývoj. 

O modulárních systémech by se dalo psát dlouho, ale už končím. Pokud jste s nimi ještě nezačali, udělejte to [u Frontendistů](http://www.frontendisti.cz/predchozi-srazy/#organizace)!

## Další soubory a adresáře

Občas jsem někde použil nebo používám často, ale vejde se do jedné odrážky:

* `/layout` — Rozvržení stránek patří sem. Obvykle ale používám hotovou mřížku, například z Bootstrapu. Proto tenhle adresář může obsahovat jen pár malých úprav. [Tady](https://github.com/machal/vzhurudolu-scss/blob/master/layout/vd-layout.scss) je třeba layout tohoto blogu.
* `/skin`, `/sites` – Deklarace proměnných pro weby zobrazované tímto kódem.
* [Někdo doporučuje](http://csswizardry.com/2013/04/shame-css/) `shame.less`  jako odkladiště hotfixů, které se mají při nejbližší příležitosti zavést do finálního kódu. Můj přístup je komponent–centrický a tak i patřičně (`TODO`) označené hotfixy dávám do kódu komponent. Tam jednou za čas zahynout pod kopyty refaktorovacích koní. :)

Děláte to jinak? Pochlubte se jak. A hlavně proč! Zanechte komentář, zareagujte na sociálních sítích nebo napište vlastní blogpost.