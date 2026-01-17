---
postID: 34
postTitle: 'Směřuje CSS od preprocesingu k postprocesingu?'
postUrlId: css-postprocessing
postDateTime: '2015-05-31 00:00:00'
excerpt: 'Myslím, že ano. Některé důvody pro preprocesory se totiž vytratily.'
postStatus: Published
authorID: 1
sectionID: 1
og_title: 'Směřuje CSS od preprocesingu k postprocesingu?'
og_description: 'Myslím, že ano. Některé důvody pro preprocesory se totiž vytratily.'
og_type: article
---

# Směřuje CSS od preprocesingu k postprocesingu?

Myslím, že ano. Preprocesory přišly s řadou užitečných vlastností a vyplňují potřeby, které samotné CSS nezvládalo uspokojit. Přišel ale [Grunt](/prirucka/grunt) a Gulp, změnily se naše pracovní postupy a některé důvody pro preprocesory se tím vytratily.

Sám dnes [CSS preprocesory](/blog/12-css-preprocesory-1) používám prakticky pro všechny projekty. Souběžně s neutuchajícím nadšením pro LESS a jeho partu u mě ovšem probíhá postupný ústup od všech jejich pokročilých vlastností. 

Vyvrcholením trendu bylo zamyšlení zda preprocesory vůbec potřebuji. [Tenhle skvělý článek](https://blog.colepeters.com/on-writing-real-css-again/) od Cole Peterse mě pak přinutil sepsat nynější stav mysli. 

[![Mark Otto, autor Bootstrap](/assets/img/content/src/bootstrap-postprocessing.jpg)](https://twitter.com/mdo/status/591364406816079873)

## Potřebuji preprocesory? Zatím ano, hlavně kvůli proměnným

Vezměme to po jednotlivých [základních vlastnostech](http://www.vzhurudolu.cz/blog/13-css-preprocesory-2):

### `@import` a slučování do jednoho souboru

Skvělá věc, protože krátí dobu načítání stánek. Umíme ale vyřešit i bez preprocesorů. Nějakým [css-concat](https://www.npmjs.com/package/grunt-concat-css) podobně jako u Javascriptů.

### Mixiny pro CSS3 vlastnosti

[Prefixované](/prirucka/prefix) vlastnosti nám jednu dobu docela zatápěly, že jo? Dneska už to takový problém není. Navíc máme [Autoprefixer](https://github.com/postcss/autoprefixer). Postprocessing jako vyšitý.

### Zanořování deklarací

„Dobrý sluha, ale zlý pán” tady platí úplně nejvíc. Pro nezkušené kodéry by bylo lepší kdyby tahle vlastnost nikdy nevznikla. A s metodikou [OOCSS](/prirucka/oocss) to preprocesorové zanořování zas tak nepotřebují ani ti zkušení.

### Matematika

V LESSu jsem si dost oblíbil třeba `percentage(2/3)`. Bez preprocesorové matematiky bych ale přežít dokázal. Nativní funkce `calc()` má [hezkou podporu](http://caniuse.com/#feat=calc).

### Cykly, podmínky, extend a další vlastnosti

Počkejte, vy je vážně používáte? :-) Ale jo, uznávám, že nastavení týmu a projektu může být takové, že jsou pro vás nepostradatelné. Chápu, pokud děláte [CSS animace](/prirucka/css3-animations) nebo [grid systémy](https://github.com/machal/freestyle-grid). Tvrdím ale, že pro většinu užití preprocesorů jde o zbytný syntaktický cukr. 

### Proměnné

Tady se nechávám podat. Těžko je něčím nahradíte. Aktuálně používám preprocesory hlavně kvůli nim. Ale blýská se na lepší časy, ještě chvíli čtěte.


## Nevýhody CSS preprocesorů

1. Až moc silný nástroj – odklon od tuposti CSS a příliš mnoho abstrakce sice vede k propracovanému, někdy až imperativnímu kódu. Zároveň často ale špatně čitelnému a spravovatelnému.
2. Proprietární kód – pokud preprocesory využíváte „tupě“, je zaučení nového člověka nebo přechod na jiný preprocesor relativně jednoduché; horší je to ovšem v kombinaci v prvním bodem.

## Postprocessing s cssnext

Všimněte si, že téměř všechny uvedené základní vlastnosti preprocesorů — s čestnou výjimkou proměnných — dnes umíme nahradit s pomocí Gruntu.

Hlavní výhoda následného zpracování je v tom, že CSS píšeme v dnešní syntaxi. Případně v syntaxi standardizované, ale prohlížeči zatím neimplementované. 

Podívejte se hlavně na projekt [cssnext](https://cssnext.github.io/). Ano, W3C.org připravuje standard pro CSS proměnné, matematiku, vlastní media queries a další. A díky CSSnext je budete moci vužívat už dneska. Třeba proměnné:

```css
.box {
  --text-color: black;
  color: var(--text-color);
}
```

Vracíme se tedy k deklarativní a (v dobrém smyslu) tupé povaze jazyka. Vyhýbáme se přílišné abstrakci preprocesorů. Náš kód bude snáze naučitelný a přenosný, protože jsme se zbavili jeho proprietární, nepřenosné syntaxe. A s vysokou pravděpodobností je dopředně kompatibilní.

Postprocessing přitom to není nic nového. Sám pomocí Gruntu do CSS už pěkných pár měsíců přidávám [pixelový fallback](https://github.com/robwierzbowski/grunt-pixrem) pro `rem` jednotku, [prefixované verze vlastností](https://github.com/nDmitry/grunt-autoprefixer) nebo generuji [CSS pro prohlížeče](https://github.com/robinpokorny/grunt-legacssy) co neumí [Media Queries](/prirucka/css3-media-queries).

Pro postprocessing mluví i možnost výběru sady vlastností. Sami můžete říct zda CSSko obohatíte jen o proměnné nebo i něco dalšího. A kromě jiného si tím také [brutálně zrychlit kompilaci](http://ai.github.io/about-postcss/en/?full#40).

Tohle všechno ještě před pár lety nebylo možné. Nebyl Grunt, Gulp a nekonečné množství jejich pluginů. CSS se pod taktovkou W3C skoro nevyvíjelo. Postupy jako OOCSS nebo [BEM](/prirucka/bem) používala jen hrstka zasvěcených. Do tehdejšího světa preprocesory zapadaly zcela dokonale.

## Pojďme to vyzkoušet

Na papíře vypadá postprocessing skvěle. Musí se ale ověřit praxí. Nevím jak vy, ale já  to jdu zkusit hned na příštím projektu.