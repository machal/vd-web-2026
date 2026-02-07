# Responzivní VašeČočky.cz – implementační příručka

## Obsah

* [Používané nástroje](#nastroje)
* [Instalace](#instalace)
* [Grunt workflow](#grunt)
* [Responzivní obrázky](#rwd-obrazky)
* [Kontakt](#kontakt)

<h1 id="nastroje">Používané nástroje</h1>

### Bower

Instalátor a správce frontend balíčků jako je třeba jQuery, Picturefill, FastClick…  Více na [vzhurudolu.cz/prirucka/bower](http://www.vzhurudolu.cz/prirucka/bower).


### Grunt

Automatizátor častých úloh nebo úloh co mají běžet na pozadí. Např. kompilace LESS do CSS, spojování JS souborů
nebo zmenšování a generování obrázků. Více na [vzhurudolu.cz/prirucka/grunt](http://www.vzhurudolu.cz/prirucka/grunt)
nebo viz `Gruntfile.js`.

Tahák k instalaci Gruntu a Boweru: [github.com/fczbkk/workshop-automation](http://github.com/fczbkk/workshop-automation).


<h1 id="instalace">Instalace</h1>

```shell
# Nainstaluj všechny Bower komponenty projektu (Bootstrap, jQuery…)
bower install

# Nainstaluj všechny Node balíčky projektu (grunt-contrib-less, grunt-browser-sync)
npm install
# (Pokud skončí chybou, zkus `sudo npm install`)
```

Na Windows (testováno na Windows 7 64-bit) je také potřeba nainstalovat

 * [.NET Framework 2.0 Software Development Kit (SDK) (x86)](http://www.microsoft.com/en-us/download/details.aspx?id=19988)
 * [graphicsmagick](http://www.graphicsmagick.org/download.html) ten je potřeba nainstalovat včetně volby „Install ImageMagickObject OLE Control for VBscript, Visual Basic, and WSH.“
 * může být potřeba říct tomu, že máte novější verzi Visual Studia, pustit: `npm config set msvs_version 2010 --global`

<h1 id="grunt">Grunt workflow</h1>

### Tasky pro vývoj a přípravu pro staging verzi
*Pokud s projektem začínáš, potřebuješ nejprve vytvořit /dist/ složku*

```shell
# Spusť výchozí Grunt task: udělá distribuční css, js, pustí browserSync a watch - hlídání změn
grunt

# Vytvoří CSS a JS pro produkci, pak je potřeba ručně nahrát na vc.vzhurudolu.cz
grunt dist

```

### Další tasky

```shell
# CSS task pro vývoj: LESS bez sourcemap
grunt css

# CSS task pro distribuci: LESS se sourcemapami, autoprefixer, criticalcss a cssmin
grunt css_dist

# Po přidání nového SVG souboru do src/: zmenší SVG a vytvoří PNG fallback v dist/
grunt svg

# Po přidání nové bitmapy do src/: vytvoří menší verze v dist/
grunt imagemin
```

<h1 id="rwd-obrazky">Responzivní obrázky</h1>

V šabloně detailu nebo seznamu produktů je u `img` tagu vidět atributy `srcset` a `sizes`. Slouží
k rozhodování prohlížeče, kterou variantu obrázku použít. V prohlížečích bez podpory to rozjíždí Picturefill.

Na webu VČ jsou největší obrázky v HTML ve šířce 737 pixelů. S ohledem na HD displeje ovšem odhaduji, že
potřebujeme obrázky minimálně v šířce 1300 pixelů. V době tvorby protoypu takové nemáme, ale snad budou.

V prototypu se prohlížeče rozhodují, zda použijí obrázek ve variantě small (200px), medium (400px) nebo large (600px).
Až budeme mít větší obrázky, varianty upravíme. Viz také `inc/helpers.php`.

Proč řešíme obrázky takto? Kvůli ušetření datového objemu na mobilech. V prototypu jsme se například z původních
2.2 MB obrázků na malém displeji dostali na 1.1 MB s nadějí, že to bude ještě lepší. Druhý důvod je, že nemusímě řešit
displeje s device-pixel-ratio. Prohlížeč si to pořeší sám.

Více o [srcset a sizes](http://www.vzhurudolu.cz/prirucka/srcset-sizes).

<h1 id="rwd-svg">SVG</h1>

Protože aktuální criticalcss nezachovává dvě hodnoty u vlastnosti background-size, je nutno, aby sprite byly čtvercové. Týká se: `nav-icons.svg` a `nav-icons-smaller.svg`.

`nav-icons-smaller.svg` je zmenšená kopie dle LESS proměnné `@vc-nav-icons-small-ratio` a je jen kvůli vygenerování png prohlížečům, co neumí svg a background-size.

<h1 id="kontakt">Kontakt na autora šablon</h1>

martin@vzhurudolu.cz
