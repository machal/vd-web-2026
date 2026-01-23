---
postID: 12
postTitle: 'Průvodce CSS preprocesory: co a jak?'
postUrlId: css-preprocesory-1
postDateTime: '2014-03-10 00:00:00'
excerpt: 'Co preprocesory jsou, zda jsou pro vás,  jak s nimi začít a pozastavíme se u oblíbené výmluvy, proč je používat – debugování. První díl seriálu.'
postStatus: Published
authorID: 1
sectionID: 1
category:
  - css
og_title: 'Průvodce CSS preprocesory: co a jak?'
og_description: 'Co preprocesory jsou, zda jsou pro vás,  jak s nimi začít a pozastavíme se u oblíbené výmluvy, proč je používat – debugování. První díl seriálu.'
og_type: article
---

# Průvodce CSS preprocesory: co a jak?

Tohle je první část čtyřdílného seriálu o CSS preprocesorech podle obsahu [mé přednášky](http://www.slideshare.net/machal/css-preprocesorywordcamppdf) z WordCamp Prague. O [CSS preprocesorech](http://kratce.vzhurudolu.cz/post/56084086629/css-preprocesory) jsem se už na Vzhůru dolů zmiňoval, psal o nich [i David Grudl](http://phpfashion.com/sass-less-stylus-nebo-ciste-css-1), ale přednáška dala příležitost pojmout téma více zeširoka. 

Seriál je určený jednak těm co preprocesor zatím používat nezačali, pak těm co je používají na mírně pokročilé úrovni a chtějí vylepšit své pracovní postupy a nakonec těm co nevědí, který preprocesor vybrat. Začneme tedy úplně od začátku a postupně se propracujeme k myšlenkám, se kterými snad budete chtít polemizovat i vy pokročilejší.

Mrkněte na další díly:

1. Co a jak?
2. [Technické vlastnosti](/blog/13-css-preprocesory-2)
3. [Jak vám vylepší pracovní postupy?](/blog/14-css-preprocesory-3)
4. [Který vybrat?](/blog/15-css-preprocesory-4)

Pojďme hned na první díl. Řekneme si tady co preprocesory jsou, zda jsou pro vás,  jak s nimi začít a pozastavíme se u oblíbené výmluvy, proč je používat – debugování.

## CSS preprocesor — cože?

CSS preprocesor je jazyk, který je postavený nad CSS. Přidává do něj nové jazykové vlastnosti nebo řeší jiné jeho technické slabilny. V seriálu se zabýváme nejznámějšími z preprocesorů — [LESSem](http://lesscss.org/), [SASSem](http://sass-lang.com/) a [Stylusem](http://learnboost.github.io/stylus/).

<img src="/assets/img/content/src/css-preprocesory.jpg" width="736" alt="LESS, SASS, Stylus">

## Mám se o preprocesory vůbec zajímat?

Pokud se profesionálně zabýváte webdesignem a (klidně jen občas) saháte na CSS, určitě se o ně zajímejte. Nebo rovnou začněte používat.

[Opakuji se](http://kratce.vzhurudolu.cz/post/56084086629/css-preprocesory), ale nenašel jsem lepší přirovnání: Pokud na projektech používáte git nebo jiný verzovací systém, pravděpodobně CSS preprocesor potřebujete. Čím komplexnější projekty děláte, čím více lidí upravuje csska, čím více do projektu saháte i po spuštění, tím vděčnější za preprocesor budete. 

Zkušenější asi potvrdí, že jde o návykovou technologii. A není to jen pro velké weby. S preprocesorem začínám psát i malinké weby, není důvod dělat výjimky z ověřených pracovních postupů.

## Jak s preprocesory začít?

Kousky kódu si můžete vyzkoušet v CodePenu nebo online testerech samotných preprocesorů — šup do [LESStesteru](http://lesstester.com/), [SassMeisteru](http://sassmeister.com/) nebo [Stylus testovačky](http://learnboost.github.io/stylus/try.html).

Mluvili jsme o tom, že preprocesor se kompiluje do CSS. Obvyklý pracovní postup je dělat to lokálně během práce vývojáře hned po uložení zdrojového (`*.less`, `*.sass`, `*.styl`) souboru. Máte hned několik způsobů jak toho dosáhnout:

* **Speciální UI aplikace**  
Nejobvyklejší cesta kompilace do CSS. [Prepros](http://alphapixels.com/prepros/), [CodeKit](https://incident57.com/codekit/), [Koala](http://koala-app.com/) a další. Výhodou je jednoduchá správa. Nevýhodou zase poněkud omezený rozsah dalších funkcí.

* **Editory a IDE**  
Třeba i váš editor už umí kompilovat preprocesorový kód. Je to hračka pro Sublime, Eclipse, VisualStudio, NetBeans i další. Mrkněte na seznam editorů pro [LESS](http://lesscss.org/usage/#editors-and-plugins). U SASSu, Stylusu jsem podobný seznam nenašel, což ale neznamená, že podporu IDE nemají.

* **[Grunt](http://gruntjs.com/)**   
Automatizátor procesů během lokálního vývoje. Kompilace preprocesorů je pro něj hračka. Nevýhodou je práce s příkazovou řádkou. Výhodou obrovské množství dalších funkcí (minifikace, převod SVG do PNG, [autoprefixer](https://github.com/ai/autoprefixer)…). Dobré také je, že Gruntfile verzujete a sdílíte tak konfiguraci způsobu kompilace pro všechny členy týmu.

* **Příkazová řádka**  
Kompilovat z příkazové řádky můžete i bez Gruntu. Potřebujete jen vhodné prostředí — Stylus a LESS jsou napsané v Javascriptu, takže Node.js, SASS zase v Ruby. Hodí se i pro pracovní postupy s kompilací až na serveru.

* **Kompilace v prohlížeči**  
Tu zatím nabízí jen [LESS](http://lesscss.org/#client-side-usage). Jakkoliv je skvělá pro vyzkoušení preprocesoru nebo pro velmi specifické pracovní postupy, určitě bych vám ji nedoporučil nasazovat do produkčního prostředí.

## Jak je to s debugováním? 

Aneb *„Kde jsou moje čísla řádků?"*.

Preprocesorovým začátečníkům občas vadí, že jim DevTools nebo Firebug ukazují čísla řádku ve výsledném, zkompilovaném CSS souboru a neodpovídají tedy číslům řádků ve zdrojových souborech.

Existují cesty jak si v obou ladících nástrojích zobrazit čísla řádků — [FireLESS](https://addons.mozilla.org/cs/firefox/addon/fireless/), FireSASS, FireStylus pro FireBug nebo modernější a pokročilejší [Source Maps](http://robdodson.me/debug-less-with-chrome-developer-tools/) pro DevTools. Ty doporučuji vaši pozornosti, protože tohle je jen jedna z věcí, kterou umí.

![Source Maps](/assets/img/content/src/source-maps-.jpg) 

Nicméně! Dovolím si tvrdit, že pokud k ladění chyb nutně potřebujete znát čísla řádků, je něco shnilého ve vašem kódu. Rozdělením kódu do malých komponent (budeme se jí zabývat v dalších dílech) a organizací pomocí některé z [metodik](http://www.vzhurudolu.cz/prirucka/bem) [organizace](http://www.vzhurudolu.cz/prirucka/oocss) CSS kódu potřeba ladění přes čísla řádku téměř odpadá.

## Co a jak?

Sečteno, podtrženo: CSS preprocesory jsou pro vás. Je velké množství způsobů jak je používat, vybere si každý. A na čísla řádku se už nedá vymlouvat. :-)

Příště se podíváme na technické vlastnosti preprocesorů.