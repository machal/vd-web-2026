---
postID: 135
postTitle: 'Z Illustra­to­ru přímo do pro­hlí­že­če: SVG work­flow od SU­PER­KO­DERS'
postUrlId: svg-workflow-superkoders
postDateTime: 2019-02-09
excerpt: 'Dlouho optimalizujete SVG a v tom se změní zdroj v Illustratoru. Znáte ten pocit?'
postStatus: Published
authorID: 1
sectionID: 1
category:
  - svg
no_ads: false
include_rss: true
category_highlight: true
og_title: 'Z Illustra­to­ru přímo do pro­hlí­že­če: SVG work­flow od SU­PER­KO­DERS'
og_description: 'Dlouho optimalizujete SVG a v tom se změní zdroj v Illustratoru. Znáte ten pocit?'
og_type: article
---

# Z Illustra­to­ru přímo do pro­hlí­že­če: SVG work­flow od SU­PER­KO­DERS

[Michal Matuška](/lektori/michal-matuska) ukazoval na poslední brněnské minikonferenci Frontendisti.cz zajímavý postup, jak si zautomatizovat publikování složitějších SVG. 

Od grafika to jde přes magii v Gulpu přímo do prohlížeče. Je to cool, takže jsem Michala poprosil o svolení k publikování na Vzhůru dolů.

<p class="video">
Video: <a href="https://www.youtube.com/watch?v=4bUTVMxCvOA">Michal Matuška: SVG workflow a SSOT</a> ~ Sice bez vizuální dema, ale s Michalem.
</p>

V následující případové studii se zabýváme poměrně složitými [SVG](/prirucka/svg), ale vsadím se, že to může inspirovat i ty z vás, kteří pracujete s jednoduššími prvky. Úplně v pohodě je to použitelné i třeba na ikony. 

Společný problém je stejný – grafické zdroje se vám mohou měnit pod rukama. A váš původní – krásně optimalizovaný – SVG kód je v čudu. Musíte začít znova.

## Komplexní SVG, kde standardní proces publikace nestačí

V [SUPERKODERS](https://superkoders.com/) dostali za úkol rozhýbat poměrně komplexní SVG. No komplexní… 23 komplexních SVG dokumentů. Obrázek mluví za vše, však se podívejte:

<figure>
[cms:asset 79]
<figcaption markdown="1">
*Obrázek: Nákupní galerie. Každý obchod je zvláštní SVG dokument, polovina z nich je interaktivní*
</figcaption>
</figure>

Každý obchod představuje jedno komplexní SVG, které se bude vkládat přímo do HTML stránky, aby se dalo animovat a nasadit na něj interaktivní chování pomocí CSS a JavaScriptu.

Postup práce s každou grafikou vypadá asi následovně: 

<figure>
[cms:asset 77]
<figcaption markdown="1">
*Obrázek: Čtěte shora a zleva. Z výstupu grafického editoru děláte optimalizaci, manuální úpravu a až pak jde kód do prohlížeče*
</figcaption>
</figure>

Běžný postup vypadá z pohledu vývojáře asi takhle:

* *Export z grafického editoru* nestačí,
* musíme provést automatickou *optimalizaci kódu,*
* často navíc i *manuální úpravu *v textovém editoru
* a nakonec sláva, máme to *v prohlížeči.*

Jenže, co když všechny kroky obnášejí nezanedbatelné množství práce, během kterých vám klient ke všemu začne měnit grafické zdroje pod rukama?

<!-- AdSnippet -->

V takovém momentu zjistíte, že nemáte jen jeden zdroj pravdy ([SSOT](http://voho.eu/wiki/princip-ssot/)) a tedy se vám celý proces rozpadá. Musíte začít znovu. A to prostě nechcete.

Ideální postup vypadá přece jinak:

```
Grafický editor → (magie) → Prohlížeč
```

Michal si tu magii vymyslel pomocí tří nástrojů – Illustratoru, Gulpu a šablonovacího systému Nunjucks. Ale proces na nich není závislý. Můžete jej duplikovat pomocí nástrojů vašich.

## Export z Illustratoru do SVG

Export z Illustratoru je potřeba nastavit následovně:

<figure>
[cms:asset 75] 
<figcaption markdown="1">
*Obrázek: Jak nastavit export z Illustratoru*
</figcaption>
</figure>

Teď už pojďme s výstupem z SVG přímo do HTML kódu.

## SVG v Nunjucks: Jako proměnná

Zde používáme [Nunjucks](https://mozilla.github.io/nunjucks/), šablonovací systém pro JavaScript, vy si jej případně můžete nahradit nějakým Twigem nebo jiným nástrojem.

Vložení SVG grafiky obrázku se ale neděje napřímo, ale celý si soubor uložíme do proměnné:

```
{% set svg %} 
  {% include "cesta-ke-zdroji/ilustrace.svg" %}  
{% endset  %} 
```

Následně jej vypíše s filtrem safe, aby šablonovací systém nedělal escapování znaků:

```
{{ svg | safe }}
```

Více toho pro vkládání do HTML nepotřebujeme. Pojďme se podívat na tu nejzajímavější část – automatickou úpravu SVG zdrojáku.

## A teď magie. Zpracování filtry

Tam, kde jsme v předchozím kroku na SVG přidávali filtr `safe`, můžeme přidat filtry další:

```
{{
  svg
  | spaceless
  | supersvg(store.id)
  | safe
}}
```

Vlastní filtr spaceless odstraňuje přebytečné mezery, ale tu hlavní magii obstarává `supersvg()`. Podívejme se teď na jeho definici:

```javascript
environment.addFilter('supersvg', function(str, id) {
  return str
    .replace(/.*<svg/, '<svg preserveAspectRatio="xMidYMid slice"')
    .replace(/<(g|rect|path)\s+id="/g, '<$1 class="')
    .replace(/\s*(version)=".*?"/g, '')
    .replace(/id="(SVGID.*?)"/g, 'id="$1-' + id + '"' )
    .replace(/url\(#(SVGID.*?)\)/g, 'url(#$1-' + id + ')' )
    .replace(/\s*(x|y)="0px"/g, '')
    .replace(/\s*(xml|xmlns|enable)(:|-).*?".*?"/g, '')
    .replace(/id="(beer)(.*?)-.*?"/g, 'class="$1$2"');
});
```

Tady vidíte, že ve skutečnosti o žádnou velkou magii nejde. Prostě se jen nahrazují kousky zdrojáků jinými:

1. Přidává se atribut [preserveAspectRatio](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/preserveAspectRatio), abychom měli jistotu, že se dokument za žádných okolností nezdeformuje.
2. Odstraňují se identifikátory Illustratoru (`SVGID`) a přidávají se vlastní, dodané v parametru filtru, aby nedošlo ke kolizím pojmenování mezi jednotlivými zpracovanými SVG dokumenty.
3. Smažeme nepotřebné atributy typu `x`, `y` nebo `xml`, `xmls`, `enable`.
4. Nahradíme identifikátory vrstem (`id`) CSS třídami (`class`). Tady je hezké, že pokud se s grafikem či grafičkou domluvíme na vhodném pojmenování, můžeme používat [BEM](https://www.vzhurudolu.cz/prirucka/bem) nebo jinou zvolenou pojmenovávací konvenci.

## Práce s pojmenováním vrstev v Illustratoru

Pro nejčastější animace je možné si také vytvořit pomocné CSS třídy. Když je pak vložíme do názvu vrstvy v Illustratoru, převedou se nám rovnou do SVG zdrojáku. 

<figure>
[cms:asset 81] 
<figcaption markdown="1">
*Obrázek**: Pojmenování vrstev v Illustratoru, ze kterého pak uděláme DOM strukturu a CSS třídy*
</figcaption>
</figure>

To ostatně otevírá dost zajímavé možnosti ve výměně informací mezi grafiky a vývojáři. Stačí se domluvit na konvenci pojmenování vrstev v grafickém editoru. 

Pokud není možné se z jakýchkoliv důvodů dohodnout, může si tuhle i část práce obstarat frontend kodér nebo kodérka na vlastní pěst.

## Kam to dále posunout?

Tak jistě, další kreativitě se meze nekladou. Dva tipy z přednášky:

* Přidat [Cheerio](https://cheerio.js.org/) (selektory pro XML nebo HTML struktury postavené na jQuery zápisu). Přidávat pomocí něj další třídy, data atributy nebo prvky, které potřebujeme pro efektivnější psaní CSS nebo JavaScriptu nad SVG zdrojem.
* Přidat parametrizaci [SVGO](https://github.com/svg/svgo) (optimalizátor SVG kódu), která nám umožní další automatické vylepšení SVG zdrojáku, hlavně z pohledu datového přenosu.

Odkazy k přednášce: Zdrojáky pro [Gulpfile.js a template.njk](https://gist.github.com/machal/fb783689e4a79c2dcf18a074663c3305),  [slajdy](https://www.slideshare.net/SuperKoderi/svg-superworkflow) a Michalovo [školení SVG](https://www.vzhurudolu.cz/kurzy/svg).

<!-- AdSnippet -->