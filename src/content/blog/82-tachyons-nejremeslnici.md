---
postID: 82
postTitle: 'Jak v NejŘemeslníci.cz používají Tachyons'
postUrlId: tachyons-nejremeslnici
postDateTime: '2017-02-07 00:00:00'
excerpt: 'Matouš Borák z NejŘemeslníci.cz popisuje zkušenosti svého týmu s Tachyons, knihovnou atomických stylů.'
postStatus: Published
authorID: 0
sectionID: 1
category: ['organizace-css']
no_ads: true
og_title: 'Jak v NejŘemeslníci.cz používají Tachyons'
og_description: 'Matouš Borák z NejŘemeslníci.cz popisuje zkušenosti svého týmu s Tachyons, knihovnou atomických stylů.'
og_type: article
---
# Jak v NejŘemeslníci.cz používají Tachyons

*Nedávno jsem se zúčastnil [facebookové](https://www.facebook.com/groups/frontendisti/permalink/1824455287765987/) a následně i e-mailové diskuze o „atomickém CSS“. O co jde? CSS třídy v něm představují konkrétní vlastnosti stylů. Nepleťte prosím [s atomickým designem](http://www.vzhurudolu.cz/prirucka/pattern-lab))* 

*Matouš Borák z NejŘemeslníci.cz v e-mailu moc hezky popsal zkušenosti svého týmu s [Tachyons](http://tachyons.io/), knihovnou atomických stylů. Tímto mu předávám slovo a děkuji za svolení k publikaci.*

Tachyons používáme na našich nových a redesignovaných stránkách v [NejŘemeslníci.cz](http://nejremeslnici.cz/) a zatím myslím, že jsme velmi spokojení!

![Homepage NejŘemeslníci s Tachyons třídami](/assets/img/content/dest/original/blog/tachyons-nejremeslnici.jpg)

Framework jsme začali nasazovat asi před třemi měsíci při začátku prací na redesignu homepage a dalších hlavních stránek webu. Kromě těchto nových částí, kde stylování už děláme výlučně v Tachyons, máme samozřejmě ještě spoustu stránek ve starém designu a s původním monolitickým CSS souborem.

## V čem se nám Tachyons líbí: rychlá práce, malinké CSS, netřeba řešit kontext

**Píše se v něm opravdu rychle**, zvlášť nové stránky se kódují snadno. Člověk při stylování zůstává v HTML kontextu a nemusí se přepínat do mentálního režimu psaní CSS. Nemusí otevírat jiné soubory a přepínat mezi nimi a HTML atd.

Je příjemné vidět, jak je **CSS soubor malý**. Nezipovaný má kolem 100 kB , kdežto naše staré CSS pětinásobek. S Tachyons se plánujeme dostat ještě níž, na nějakých 50 kB. Zatím tam máme „zátěž“ v podobě klasických stylů sdílených mezi starými i novými stránkami, které jsme do balíčku s Tachyons museli přidat.

Praktické je, že když zkopírujeme kus HTML kódu někam jinam, máme celkem dobrou pravděpodobnost, že výsledek bude vypadat stejně jako předtím. Jinými slovy jsou **styly téměř vždy nezávislé na kontextu**, ve kterém se nacházejí.

**Nemusíme přemýšlet, jak nazvat novou třídu** pro nějaký prvek, protože nové třídy potřebujeme do Tachyons přidat jen velmi vzácně.

Je super, že Tachyons je celý udělaný v jednotkách `rem`, jeden speciální případ Media Query jsme pak snadno vyřešili zmenšením hlavního fontu na stránce a tím i zmenšením celého layoutu stránky.

Co se nám taky moc líbí je to, že nás to vede k **volnějšímu vnímání grafických návrhů**. Už neřešíme, jestli mezera mezi prvky má být 14, 15 nebo 16 pixelů. V návrzích se to v těchto detailech často různí. Nyní prostě použijeme nejbližší velikost v naší škále. Škály nám pak pomáhají udržovat základní jednotný vzhled stránek i bez grafického manuálu.

Zpočátku jsme se museli Tachyons třídy naučit, ale už jsme si zvykli a jejich jména si pamatujeme. Třídy jsou pojmenované konzistentně, takže učení není nijak těžké.

## V čem jsme si Tachyons upravili: podrobnější stupně velikosti, sjednocení přípon a Media Queries jinak

Velikostní stupně v Tachyons se nám zdály **příliš řídké**. V Tachyons je další prvek na škále vždy dvakrát větší než předchozí prvek a [velikosti tudíž poměrně rychle rostou](http://www.modularscale.com/?1&rem&2&web&table) a nebyly pro nás dostatečně jemné. Protože používáme Sass, zavedli jsme si makra (mixins) pro generování dvojité škály, stále jde o škály založené na dvojnásobcích, ale jsou to vlastně [dvě prolínající se škály](http://alistapart.com/article/more-meaningful-typography#section1). Nakonec je tedy naše velikostní [škála](http://www.modularscale.com/?1,1.5&rem&2&web&table) dvakrát podrobnější než ta originální v Tachyons.

Také jsme **sjednotili číselné přípony** u jednotlivých tříd škály, aby např. `pt7` a `bw7` vždy znamenalo stejnou velikost, např. `1rem`. Původní škály Tachyons mají totiž u různých tříd různé počáteční hodnoty (`foox1` může být jiná velikost v remech než `fooy1`), což nám přišlo zbytečně matoucí.

Nelíbilo se nám moc, jakým způsobem jsou v Tachyons **udělané Media Queries**. Všechny základní třídy jsou tam v podstatě vždy zkopírované, jen mají v názvu příponu dané Media Query. My jsme v podstatě Media Queries promazali a přidáváme třídy s příponami jen v tom případě, že je reálně v HTML kódu použijeme.

Protože jsme nedělali redesign kompletního webu, museli jsme vyřešit **koexistenci klasických a nových stylů** využívajících Tachyons. Na různých místech starých stránek jsme navíc chtěli použít prvky stylované v Tachyons. Nakonec jsme pomocí importů zdrojáků v Sassu vyrobili de facto dvě verze Tachyons, jednu základní pro nové stránky a druhou celou vnořenou do třídy `.tachyons-ready`, která v HTML odděluje prvky stylované postaru a nově.

## V čem se nám Tachyons líbí méně: nejsou pseudotřídy, hotové knihovny s tím nepočítají a ukecané HTML

Nejde v něm napsat všechno. Takže například **pseudotřídy, pseudoelementy**, či aplikaci pravidel pro vnořené prvky a podobné musíme dále psát pomocí klasického CSS. Takové styly většinou přidáváme přímo do `<style>` sekcí v HTML kódu stránky, protože jsou většinou unikátní pro danou stránku a není jich tak mnoho.

Bývá trochu **těžší použít nějakou hotovou knihovnu**, která atomické styly nepodporuje. Obvykle podporují jen nastavení vlastní třídy nějakému hlavnímu divu a u vnořených prvků se předpokládá stylování pomocí vnořených  CSS selektorů. To pak vede k tomu, že musíme zůstat u klasického CSS stylování takových prvků.

**HTML je méně přehledné**, je „ukecané“. Hůře se v něm orientuje, pokud pracujeme s obsahem stránky (a ne s jejím stylem). U nás toto do velké míry řeší použití [Slimu](http://slim-lang.com/), ale stejně se někdy obsah ztrácí v záplavě Tachyons tříd.

**Kodér si musí pamatovat**, jak se co styluje, místní projektové zvyklosti stylů. Na tuhle potřebu se snažíme reagovat tak, že opakující se logické části stránek dáváme do partial šablon, takže jsou styly napsané jen jednou. Není to ale vždy jednoduché. 

Někdy není snadné předem odhadnout, co se bude v budoucnu opakovat a pro co by tedy bylo vhodné zavést partial šablonu, takže se nám stává, že různé stránky mají stejné nebo vizuálně příbuzné grafické prvky nastylované malinko jinak. 

Částečně by nám v tomto taky samozřejmě pomohl grafický manuál, na tom jsme ale začali pracovat teprve nedávno. Manuál by taky pomohl navést nové členy týmu, aby se rychleji chytili a mohli zapojit do procesu, aniž by vymýšleli už hotová, mnohokrát nakódovaná řešení. V tomto asi spatřujeme největší nedostatek frameworku, Tachyons moc **nenapomáhá tomu, abychom znovupoužitelnost řešili včas**.

Podobná, i když trochu menší potíž je v tom, že v Tachyons není doporučeno nějaké **ustálené pořadí atomických tříd u prvku**. Z hlediska prohlížeče je jedno, jestli je nějaký prvek nejprve ostylován například třídou `flex` (zapne pozicování pomocí flexbox modelu) a potom až třeba `b-white-30` (nastaví šedý okraj) nebo naopak. Ovšem pro kodéra, který prochází kód HTML stránky a snaží se v něm z hlediska rozložení prvků rychle zorientovat, je důležité naopak vidět ty nejpodstatnější třídy co nejdříve, kdežto drobné grafické detaily tohoto konkrétního prvku mohou být ukryté klidně až na konci řádku. 

Tenhle problém jsme zatím vyřešili procesně, tj. zavedli jsme interní doporučené pořadí atomických tříd podle skupin (box model, velikost a pozice prvku vůči okolí… až po minoritní třídy typu změna kurzoru myši). Do budoucna uvažujeme, že si napíšeme nějaký nástroj, který na pořadí tříd bude dohlížet za nás.

Trochu nepříjemné je nakonec na Tachyons také to, že vás tak trochu nutí své základní nastavení navrhnout hned na začátku, že **znesnadňuje změnu svého nastavení v průběhu projektu**. My jsme například začali stránky psát ve standardních Tachyons škálách a teprve v průběhu programování jsme si uvědomili, že nám jejich rozvržení nevyhovuje a že je potřebujeme změnit. Napsali jsme si skripty pro převod škál ze starých na nové v už hotových HTML stránkách, ale je pochopitelné, že změny se občas neobešly bez potenciálně nebezpečných konfliktů v repozitáři. Nešlo o nic hrozného, ale bylo potřeba při těchto „všeobjímajících" změnách být obzvlášť opatrní.

Celkově vzato ale využití Tachyons vidíme jako krok velmi dobrým směrem, jsme s ním spokojení a zde uvedené nedostatky jsou pro nás zatím plně vyvážené přednostmi frameworku.

*Autor: [Matouš Borák](http://www.platanus.cz/), [NejŘemeslníci.cz](http://nejremeslnici.cz/). Editace, obrázek: Martin Michálek.*