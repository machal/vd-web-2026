---
postID: 15
postTitle: 'Průvodce CSS preprocesory: který vybrat?'
postUrlId: css-preprocesory-4
postDateTime: '2014-04-01 00:00:00'
excerpt: 'Čtete poslední díl seriálu o CSS preprocesorech. Pokusím se vám poradit, zda vybrat LESS, SASS nebo Stylus.'
postStatus: Published
authorID: 1
sectionID: 1
category:
  - css
og_title: 'Průvodce CSS preprocesory: který vybrat?'
og_description: 'Čtete poslední díl seriálu o CSS preprocesorech. Pokusím se vám poradit, zda vybrat LESS, SASS nebo Stylus.'
og_type: article
---

# Průvodce CSS preprocesory: který vybrat?

Čtete poslední díl seriálu o CSS preprocesorech. Pokusím se vám poradit, zda vybrat LESS, SASS nebo Stylus.

Nezapomeňte na předchozí díly:

1. [Co a jak?](/blog/12-css-preprocesory-1)
2. [Technické vlastnosti](/blog/13-css-preprocesory-2)
3. [Jak vám vylepší pracovní postupy?](/blog/14-css-preprocesory-3)
4. Který vybrat?

Tak — který vybrat? 

V prvé řadě — nějaký vyberte. Rozdíly mezi jednotlivými preprocesory nejsou tak zásadní jako rozdíl mezi čistým CSSkem a preprocesorem.

Zadruhé – nebojte se vybrat špatně. Přechod od jednoho preprocesoru k jinému zas tak nebolí. Jsou tu automatické konvertory atd. Nic jako přechod od PHP k Ruby on Rails v půlce projektu, jestli mi rozumíte.

Pojďme si tedy porovnat LESS, SASS a Stylus. Vidím velké rozdíly ve filozofii návrhu mezi LESSem a zbylými dvěma preprocesory.

## Deklarativní LESS

Priorita LESSu je snadné učení. Maximálně tedy respektuje *deklarativní* povahu CSSka, což znamená, že se jej rychle naučíte, ale co se týká pokročilých postupů typu cykly a podmínky, není zápis tak elegantní. 

Autoři LESSu si řekli: pojďme navrhnout rozšíření CSS tak, aby maximálně respektovalo jeho původní filozofii.

## Imperativní SASS a Stylus

Naproti tomu, autoři SASS a Stylusu si řekli — CSSko je (dosaďte sprosté slovo, my slušňáci použijeme *„nedokonalé“*). Pak si řekli – pojďme ho upravit tak, aby se blížilo běžným programovacím jazykům. Oba mají více *imperativní* charakter. Tzn. syntaxe cyklu nebo podmínky odpovídá běžným programovacím jazykům typu PHP nebo Ruby. 

Na druhou stranu, když si ne-programátor čte [SASS kód takového Foundation](https://github.com/zurb/foundation/blob/master/scss/foundation/components/_buttons.scss), nebude pro něj snadné mu porozumět. To u [Bootstrapu napsaného v LESS](https://github.com/twbs/bootstrap/blob/master/less/buttons.less) pro něj nebude problém.

CSS píší vývojáři i designéři. Vývojářům bude blíž imperativní SASS a Stylus, designérům a začátečníkům deklarativní LESS.

## Nevybírejte podle syntaxe

LESS se píše podobně jako CSSko, SASS alternativně nabízí tzv. whitespace syntaxi a ve Stylusu můžete psát třeba takhle:

```stylus
.el 
  margin 1em .5em
  padding .5em
```  

Takové syntaxi velmi rychle propadnete (i já jsem s ní měl pěkný románek), ale nemyslím, že v ní jsou zakopány podstatné rozdíly mezi preprocesory. Dobře nakonfigurovaný editor (např. Sublime s [Hayaku](http://hayakubundle.com/) a [Emmet](http://emmet.io/)) vám psaní urychlí i bez ní.

S whitespace syntaxí v SASSu jsem narazil a myslím, že tady se ta cesta proti povaze CSSka nevyplácí.  Whitespace SASS vám neumožní svobodné zalamování opravdu dlouhých řádek a taky nežere blokové CSS komentáře:

![SASS whitespace syntaxe problémy – blokové komentáře a zalamování uvnitř deklarací](/assets/img/content/dest/sass-whitespace-.jpg) 

Naštěstí v SASSu můžete používat i SCSS syntaxi, která vychází z CSS. Po pořádek je dobré dodat, že Stylus s výšeuvedeným kódem nemá žádný problém. I on umožňuje výběr syntaxe.

Stylus zase nesežere jakékoliv vaše CSSko jako by to udělal LESS. Problémy mu ale dělá například [odsazování pravidel](https://gist.github.com/machal/9891340). 

Zkrácená syntaxe prostě u SASSu i Stylusu znamená ztrátu svobody formátování. Jak už jsem zmiňoval, svého času jsem se do ní docela zbláznil, následně ale pokorně vrátil k běžné „CSS syntaxi“ jak u SASSu tak u Stylusu.

Zkrácená syntaxe tedy vypadá úžasně, ale tvrdím, že vám žádný čas neušetří a že hold bere kus svobody způsobu psaní.

## Jaký preprocesor tedy vybrat?

Můžete volit podle různých pohledů na problematiku. Nemám k tomu žádná tvrdá data. Podkladem jsou mi rozhovory s ostatními frontendisty a vlastní zkušenost.

Nejprve megastručně:

![Který CSS preprocesor vybrat?](/assets/img/content/dest/preprocesory-ktery-vybrat-.jpg) 

### Designér vs. programátor

Pokud jste blíž k designu, místo javascriptu píšete jQuery kód, pak je to jasné — volte LESS. Programátoři budou zase radši za SASS nebo Stylus. 

### Komunita, ekosystém

Hlavně SASS, ale i LESS mají spoustu kvalitních aktualizovaných knihoven a silné frontend frameworky: Bootstrap a Foundation. A šíře komunity? Docela dobře to ukazují hvězdičky na Githubu: LESS téměř 10 tisíc, SASS i Stylus mezi 3–4 tisíci. Z pohledu počtu nástrojů vede SASS, z pohledu počtu frontendistů, kteří jazyk ovládají zase LESS.

### Frontend frameworky

Foundation běží na SASS, Bootstrap je psaný v LESS, ale má i oficiální „SASS export". Pokud zvolíte SASS, budete mít na výběr. Volte ale spíše podle frameworku.

### Snadnost učení

Ze statusu začátečníka se do mírně pokročilého nejrychleji dostanete u LESSu. Vždyť vaše současné CSS je LESS kód. Nebo u Stylusu pokud si moc neujedete na jeho zkrácené syntaxi. Dlouho budete moci využívat to co byste očekávali v CSS (zanořování, proměnné), aniž byste museli pochopit zcela nové koncepty a učit se nová klíčová slova a rozdíly mezi nimi (například `@extend`, `@mixin`, `@include` u SASSu). LESS má taky zcela [novou dokumentaci](http://lesscss.org/) a troufám si tvrdit, že v dokumentování má oproti zbývajícím preprocesorům navrch.

### Technické vlastnosti

Ještě před dvěmi lety bych napsal něco jako „LESS se dobře učí, ale na počet fíčur vedou SASS a Stylus." Dneska už to neplatí, autoři LESSu se po příchodu Bootstrapu docela rozjeli a teď se jim i daří nové technické vlastnosti komunikovat díky předělané dokumentaci. Tady mi nezbývá než vzdát snahu o objektivitu a konstatovat jen, že ve vlastnostech, které na svých projektech sám potřebuji, je LESS srovnatelný s ostatními preprocesory.

## Sečteno podtrženo?

* Pokud se živíte webovou vývojařinou, používání preprocesoru se vám nejspíš bohatě vrátí.
* Není až tak důležité, kterým začnete, je relativně snadné přejít na jiný. 
* Nevolte podle syntaxe.
* S LESSem vás bude nejméně bolet přechod z čistého CSSka.

Tady seriál končí. Pokud se chcete dozvědět více nebo si o preprocesorech popovídat, pořádám [půldenní preprocesorový kurz](/kurzy/css-preprocesory/64/).