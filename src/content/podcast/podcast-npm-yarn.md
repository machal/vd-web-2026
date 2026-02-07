---
postID: 84
postTitle: 'Podcast: S Riki Fridrichem o NPM, Yarnu a dalších nástrojích JS světa'
category:
  - javascript
postUrlId: podcast-npm-yarn
postDateTime: '2017-02-13 00:00:00'
excerpt: 'Z Rikiho jsem tahal moudra o automatizačních, ale i jiných nástrojích dnešního komplikovaného javascriptového světa.'
postStatus: Published
authorID: 0
sectionID: 1
no_ads: false
og_title: 'Podcast: S Riki Fridrichem o NPM, Yarnu a dalších nástrojích JS světa'
og_description: 'Z Rikiho jsem tahal moudra o automatizačních, ale i jiných nástrojích dnešního komplikovaného javascriptového světa.'
og_type: article
---

# Podcast: S Riki Fridrichem o NPM, Yarnu a dalších nástrojích JS světa

Riki Fridrich je vývojář a [lektor Javascriptu](http://www.vzhurudolu.cz/kurzy/javascript). Říká, že je lenivý a že je na to hrdý, protože ti nejlenivější vývojáři jsou nejproduktivnější. Myslím, že není lepšího člověka, ze kterého tahat moudra o automatizačních, ale i jiných nástrojích dnešního komplikovaného javascriptového světa.

<!-- AdSnippet -->

[Grunt](/prirucka/grunt), Gulp a [Bower](/prirucka/bower) už pro své pracovní postupy považuje za přežité, ale taky říká:

> Nemusíte používat každý nový nástroj, který vznikne. Stále se zamýšlejte nad tím, jaký problém ten nový nástroj řeší a jestli i vy máte ten problém. Jestli ano, šup do toho, naučte se to, použijte to. Ale jestli to řeší problém, který vy nemáte? Tak není důvod přeskakovat a zbytečně zkoušet něco jiného.

Rikiho hlavní nástroj je [NPM](https://www.npmjs.com/). A hlavně o něm jsme mluvili. Riki ho používá jednak tradičně jako správce závislostí, ale také pro skriptování. Prostě jako náhradu Gruntu a Gulpu. 

<!-- AdSnippet -->

Bavili jsme se také o příchodu [Yarnu](https://yarnpkg.com/lang/en/), konkurenci NPM od Facebooku a snažili se vymyslet, co bude dál.  Poslechtěte si podcast nebo si přečtěte kompletní přepis na stránce dole.

<p class="podcast">
Podcast: <a href="https://soundcloud.com/vzhurudolu/5-s-riki-fridrichem-o-npm-yarnu-a-dalsich-nastrojich-js-sveta" data-id="307483613">S Riki Fridrichem o NPM, Yarnu a dalších nástrojích JS světa</a>
</p>


## Riki Fridrich

* Rikiho firma: [Inline Manual](https://inlinemanual.com/)
* [Rikiho školení „Principy Javascriptu“](http://www.vzhurudolu.cz/kurzy/javascript) a [lektorský web](http://www.vzhurudolu.cz/lektori/riki-fridrich)
* Rikiho [přednáška „NPM pro lenivé kodéry“](https://www.youtube.com/watch?v=USC3o2FLts0) 
* Rikiho [článek o Yarnu](https://medium.com/@fczbkk/yarn-prv%C3%A9-dojmy-a-predpove%C4%8F-bud%C3%BAcnosti-83598caf5914)
* [Web](http://fczbkk.com/), [X](https://x.com/fczbkk), [Facebook](https://www.facebook.com/fczbkk)

## Obsah

* Grunt, Gulp a Bower jsou pro JS vývojáře už přežité ([text](#grunt), [3:08](https://soundcloud.com/vzhurudolu/5-s-riki-fridrichem-o-npm-yarnu-a-dalsich-nastrojich-js-sveta#t=3:08))
* Webpack jako reakce na Browserify a jak se poučil z Rollupu ([text](#webpack), [6:10](https://soundcloud.com/vzhurudolu/5-s-riki-fridrichem-o-npm-yarnu-a-dalsich-nastrojich-js-sveta#t=6:10))
* NPM a příchod Yarnu ([text](#npm), [8:16](https://soundcloud.com/vzhurudolu/5-s-riki-fridrichem-o-npm-yarnu-a-dalsich-nastrojich-js-sveta#t=8:16))
* Grunt, Gulp a Bower platné ve světě statických webů ([text](#staticke), [19:58](https://soundcloud.com/vzhurudolu/5-s-riki-fridrichem-o-npm-yarnu-a-dalsich-nastrojich-js-sveta#t=19:58))
* Rikiho workflow s NPM skoro ke všemu  ([text](#workflow), [24:15](https://soundcloud.com/vzhurudolu/5-s-riki-fridrichem-o-npm-yarnu-a-dalsich-nastrojich-js-sveta#t=24:15))
* Yarn a shrinkwrapping  ([text](#yarn), [30:38](https://soundcloud.com/vzhurudolu/5-s-riki-fridrichem-o-npm-yarnu-a-dalsich-nastrojich-js-sveta#t=30:38))

<!-- AdSnippet -->


## Textový přepis

**Martin Michálek**: Dobrý den, posloucháte podcast ze VzhůruDolů.cz, ve kterém si povídám se zajímavými lidmi kolem webdesignu. Od mikrofonu zdraví Martin Michálek. Dnes se opět podíváme do světa JavaScriptu. Budeme si povídat hlavně o nástrojích zvyšujících produktivitu vývojářů. Dovolte mi tady uvítat Rikiho Fridricha, který sám o sobě říká, že je lenivý vývojář. Ahoj Riki! 

**Riki Fridrich**: Nazdar! 

**Martin Michálek**: Riki, prosím tě, mohl by ses nám nejdřív představit a říct, co teď aktuálně děláš?

**Riki Fridrich**: No, já teď trošku zkouším startupový život, a i když jsem antistartupista, tak jsem do toho trošku spadl. S kamarády děláme produkt, který se jmenuje [Inline Manual](https://inlinemanual.com/). Já tam píšu JavaScript – jsem javascriptový kodér. Osobně nemám nějak extra rád takové ty MVC frameworky a podobné věci. Takže nepíšu Angular, nepíšu React. Píšu klasický poctivý JavaScript v browserech.

**Martin Michálek**: A to ještě jde, jo – dneska?

**Riki Fridrich**: Dá se to. A pro ten náš produkt je to nutné, takže já z principu musím psát framework agnostický JavaScript.

**Martin Michálek**: Takže píšeš čistý JavaScript, máš na to školení tady pod Vzhůru dolů. A kromě jiného jak jsem říkal, jsi lenivý vývojář (to teda všude o sobě říkáš).

### Leniví vývojáři jsou ti nejproduktivnější vývojáři

**Riki Fridrich**: Jsem – a jsem na to velmi pyšný, protože leniví vývojáři jsou ti nejproduktivnější vývojáři – a to je důvod, proč se věnuji automatizaci a skriptování všeho, co se jen dá.

**Martin Michálek**: Posluchači asi znají některé z tvých přednášek, které jsi měl o automatizaci. Už jich byla docela řada, naposledy jsem viděl z Barcampu v Hradci pěknou přednášku: [NPM pro lenivé vývojáře](https://www.youtube.com/watch?v=USC3o2FLts0). A zrovna dneska se kolem těchto nástrojů budeme pohybovat, takže můžeme úplně vynechat React (o tom už bylo napsáno a řečeno spousta věcí) a budeme se bavit o nástrojích na produktivitu a automatizaci.

**Riki Fridrich**: Výborně, to je moje parketa.

**Martin Michálek**: A já se teď budu zčásti tvářit jako úplné poleno – jako člověk, který je úplně mimo – a zčásti je to tak opravdu.

**Riki Fridrich**: A já se zčásti budu tvářit, že tomu rozumím.

### Grunt: životnost má za sebou{#grunt}

**Martin Michálek**: Budeme se snažit posluchačům přiblížit takovou nějakou myšlenkovou mapu všech těch nástrojů, které dneska na javascriptovém poli jsou. A na začátek, Riki, jsem si pro tebe připravil takovou hru. Řeknu název nástroje a ty mi zkus ve větě říct, co si o to myslíš a zároveň k čemu to je. Schválně – jestli nám to půjde, a když ne, tak to zkusíme jinak. – Grunt...

**Riki Fridrich**: Grunt už má svoji životnost za sebou a už je nahrazený v současnosti jinými nástroji, je to nástroj na automatizaci nějakých činností okolo vývoje a byl nahrazen v současnosti v podstatě už dvakrát – nejprve Gulpem a potom samotným NPM.

### Gulp: přežitý a už začíná být nahrazen NPM-kem

**Martin Michálek**: OK – já zatím bez komentáře... Gulp?

**Riki Fridrich**: Gulp je nástupce Gruntu, jeho výhoda byla v tom, že byl rychlejší a že jste si v něm ty procesy psali přímo – namísto nějaké konfigurace, ale podle mě už je taky přežitý a už začíná být nahrazen NPM-kem. 

**Martin Michálek**: Jasně, tím se dostáváme (NPM si necháme až nakonec) k Boweru…

### Bower: kopie NPM, kterou přestává být nutné používat

**Riki Fridrich**: Bower vznikl z velmi specifických důvodů – v podstatě je to kopie NPM-ka, akorát vznikl pro client side knihovny, kde je třeba různé konflikty verzí řešit trošku jinak. Takže Bower je vlastně jednoúčelový nástroj, který dělá prakticky to samé, co NPM, akorát má nějaké drobné výjimky, a pokud vím, tak v současné době už i ty client side knihovny jsou všechny na NPM-ku, takže přestává být reálný důvod používat Bower...

**Martin Michálek**: Je to vlastně jako 1:1 balíčkovací systém jako NPM. Já bych tady k tomu možná ještě chtěl něco dodat, ale zatím to nechám úplně bez komentáře – necháme si ty témata k diskuzi na posléze... 

### Opakovač častých úkolů Yeoman: ten přežitý není

**Martin Michálek**: Teď se dostáváme k Yeomanu. Co je to vlastně Yeoman?

**Riki Fridrich**: Yeoman je nástroj, která umožňuje vytvořit jakoby kostry, scaffoldy projektů, dají se pěkně naskriptovat, různě parametrizovat, takže jakoby na jeden příkaz nebo po vyplnění několika jednoduchých odpovědí v nějakém dialogu to dokáže vygenerovat kostru hotového projektu.

**Martin Michálek**: A je přežitý? 

**Riki Fridrich**: Nejsem si úplně jistý. Yeoman byl vždy trošičku na periferii, protože jednak dělá velmi specifickou věc, jeho největší konkurent je prostě nějaký adresář s připravenou strukturou, která se copypastne a něco se tam ručně upraví... Takže věnovat se Yeomanovi se, podle mě, vyplatí pouze v momentě, kdy děláte velmi podobné projekty jako přes kopírák – když je sekáte jako Baťa cvičky, tak tam se vyplatí mít nějaké věci předpřipravené. 

### Webpack jako reakce na Browserify {#webpack}

**Martin Michálek**: Jasně, takže to byl Yeoman... Teď pojďme na Webpack. Co je to?

**Riki Fridrich**: Webpack původně vznikl jako reakce na Browserify. To ale přeskakujeme…

**Martin Michálek**: Ale řekni klidně [Browserify](http://browserify.org/).

**Riki Fridrich**: Původně vznikl Browserify, který vznikl z potřeby transpilovat JavaScript napsaný pomocí requirů a importů do nějakého jednoho javascriptového balíčku, který je možné spustit v browserech. A ono v tom javascriptovém ekosystému platí, že stále, když vznikne nějaký nový nástroj, tak všichni si řeknou – *jo, to je super, to budu používat* – a najde se minimálně jeden člověk, který řekne – *jo, to je super, ale já bych to udělal lépe* – a udělá to lépe... 

Takže v reakci na Browserify vznikl Webpack, který je v podstatě „Browserify na steroidech“ a který tak trošku přerostl do nástroje, který se v podstatě stará o většinu toho jakoby buildovacího procesu a všech těch transpilací; kromě jednoduchých requirů nebo importů v JavaScriptu má loadery pro všechno možné, pro stylesheety, které dokonce umí transpilovat z LESSu, Sassu, umí naimportovat obrázky a podobné věci... Takže Webpack je takové trošku monstrum, které se snaží postarat o celý build toho balíčku nebo té aplikace.

**Martin Michálek**: Takže takový Grunt s NPM-kem trošku dohromady (když to přeženu)?

**Riki Fridrich**: No, NPM-ko se velmi dobře umí už v současné době postarat o to naskriptování, o tu automatizaci a Webpack se spíše stará o propojení všech transpilerů a loaderů a podobných věcí, ze kterých se ten výsledný javascriptový kód anebo ta aplikace potom skládá. 

### NPM  a příchod Yarnu {#npm}

**Martin Michálek**: A tím se samozřejmě dostáváme k NPM-ku. Co NPM-ko, je přežité? Psal jsi nedávno o Yarnu... 

**Riki Fridrich**: NPM-ko podle mě není přežité, ale chválabohu, že vznikl Yarn, protože Yarn ho trošičku začne kopat jednak dopředu a jednak trošku rychleji. NPM-ko je vlastně správce závislostí pro javascriptový ekosystém. Jeho vývoj začal trošičku zaspávat a někteří vývojáři, hlavně z nějakých větších projektů, začali být netrpěliví. A ti první, kterým ruply nervy, byli chlapci z Facebooku, kteří vytvořili Yarn. Oni se sice snažili – dělali nějaké pull requesty do NPM-ka, snažili se tam sami přispět featurami, které chtěli a které očekávali, ale zase – chlapci z NPM-ka jim to nějak blokovali a hrozně zdržovali. 

Takže se naštvali a napsali Yarn.  A jak se říká – nové koště dobře mete – i když byl Yarn postavený na zelené louce, tak je velmi rychlý a má nějaké featury navíc, které bylo trošku těžší vytvořit pro NPM-ko. A myslím si, že je celkem vidět, že Yarn vytvořili lidé z nějaké větší korporace, z Facebooku, protože tam řeší třeba věci, které normální vývojáři neřeší. Např. moje oblíbená featura v Yarnu: automaticky to kompiluje multilicenci ze všech závislostí, které v projektu máte. Běžný vývojář to nepotřebuje, ale ve Facebooku to musí řešit.

**Martin Michálek**: To znamená, když to teď shrnu, bavili jsme se o Gruntu, Gulpu, Boweru, které ty poměrně jednoznačně považuješ za překonané (v té své „škatuli“ javascriptového vývojáře) ... 

**Riki Fridrich**: V podstatě ano, jen bych chtěl upřesnit – neříkám, že jsou to zlé nástroje a že by je nikdo neměl používat. Jen si myslím, že historicky už splnily svou funkci a že v mnoha projektech bych už raději použil něco aktuálnějšího, jednoduššího. 

### Webpack, příchod Rollupu a dopad na ekosystém

**Martin Michálek**: Dostáváme se přes [Webpack](https://webpack.github.io/), který je vlastně dneska použitelný. Je to prostě robustní nástroj, který toho umí hodně. 

**Riki Fridrich**: No, jasně. Webpack je momentálně king. Jak jsem mluvil o tom procesu, že někdo si řekne, *to je fajn – ale já bych to udělal lépe *– tak ještě na Webpack byla reakce, že někdo říkal, že *Webpack je sice fajn, ale já bych to udělal lépe* – a udělal [Rollup](http://rollupjs.org/), což zase byl nástroj, který měl demonstrovat tzv. tree shaking. V podstatě to znamená, že to zanalyzuje výsledný javascriptový kód, zjistí, které jeho části nejsou používané a vyhodí je, což v některých případech může celkem radikálně zmenšit velikost toho výsledného balíčku. Podle mě tato technika bude mít celkem výrazný vliv na to, jaké knihovny pro JavaScript budou vznikat. Ten dopad na ekosystém podle mě bude dost velký. 

**Martin Michálek**: A v jakém směru? 

**Riki Fridrich**: Protože v těch úplných začátcích, když začaly vznikat ty základní moduly v NPM-ku (ty javascriptové moduly), tak se všichni hrozně báli nějakého overhaulu: aby tam ty výsledné balíčky nebyly zbytečně velké. Takže dělali velmi jednoúčelové, velmi maličké moduly, ze kterých se to všechno dohromady skládalo, jen aby tam nebyl ani jeden znak navíc. Takže výsledkem je deset tisíc modulů, které obsahují pět řádků skutečného kódu a v konečném důsledku tím, že se ty moduly musí hrozně řetězit a je třeba jich použít hrozně moc, tak ve výsledku ten wrappovací kód kolem každého z těch modulů také neúměrně nafukuje výsledný balíček. 

Finta je v tom, že díky tree shakingu, díky tomu odstraňování mrtvého kódu, podle mě, velmi rychle začnou vznikat už ne tak monolitické javascriptové knihovny jako kdysi – typu jQuery, Underscore apod., které se snažily dělat úplně všechno, ale začnou vznikat středně velké knihovny, které zapouzdří několik funkcí, metod, které budou mít příbuznou funkčnost (které spolu budou nějak souviset), něco ve stylu easing.js, a pomocí toho tree shakingu se zbavíme částí, které v projektu nepoužíváme. Takže se vývojáři nebudou bát nějakého overhaulu v kódu. 

Rollup v podstatě splnil svou historickou funkci. Akorát teda vzniká verze Webpack 2, která má nějaký UglifyJs plugin, který se umí celkem dobře postarat o tree shaking – o nějakou optimalizaci těchto věcí. 

**Martin Michálek**: Ten Rollup splnil historickou roli v tom, že nastavil tento směr – to znamená ty nové knihovny.

**Riki Fridrich**: Ukázal, že to jde: že to funguje, že to má smysl... A všechna čest chlapcům, kteří se starají o Webpack, že se toho chytli a zaintegrovali to.

### NPM versus Yarn

**Martin Michálek**: Teď k NPM, Yarn: oba dva jsou to balíčkovací systémy, které jsou dneska hlavními nástroji javascriptového vývojáře, by se dalo říct. Ty jsi to už docela [porovnával v článku](https://medium.com/@fczbkk/yarn-prv%C3%A9-dojmy-a-predpove%C4%8F-bud%C3%BAcnosti-83598caf5914). Už se leccos určitě změnilo od doby, co jsi psal článek, kde jsi byl z Yarnu poměrně nadšený, ale na konci toho článku jsi zmiňoval jednu věc. Yarn může splnit opět tu historickou roli,  že přijde s inovací, a vlastně NPM zůstane na své původní pozici toho dominátora protože převezme featury, které Yarn přinesl. Tak jak to je dneska? 

**Riki Fridrich**: No, to by bylo úplně skvělé. Myslím si, že komunita nepotřebuje spoustu různých nástrojů, které dělají to samé, akorát v jiném odstínu šedi. Takže pokud Yarn splní jen to, že nakopne NPM-ko, aby trošičku urychlilo vývoj ve směrech, které ta vývojářská komunita potřebuje, tak potom klidně může chcípnout a bude to považované za velký úspěch. 

Každopádně já osobně si myslím, že Yarn jen tak snadno nechcípne a že to půjde tím směrem, že NPM a Yarn budou považovány za alternativní klienty k jednomu a tomu samému. Ještě stále jak Yarn, tak NPM-ko dělají prakticky to samé, akorát trošku jiným způsobem, ale víceméně jsou plně kompatibilní – až na pár celkem nepodstatných drobností.

**Martin Michálek**: A co brání tomu, aby NPM vlastně vymazalo Yarn? Nějaký architektonický problém ve smyslu, že tam nejdou některé věci, které v Yarnu jdou? 

**Riki Fridrich**: Všechny ty věci v NPM-ku se dají udělat, ale otázkou je, jak jednoduše a jak velké změny by to znamenalo pro jeho codebase. To znamená, že vývojáři NPM-ka musejí brát ohled na to, co už v tom kódu mají, a pokud chtějí udělat nějaké velké změny, tak to bude znamenat velký refactor, pravděpodobně breaking changes apod. Zatímco Yarn, tím, že byl postavený na zelené louce a už jeho vývojáři znali NPM-ko, věděli, čeho se mají vyvarovat, tak to rovnou udělali pořádně, tak, jak to má být. 

Podle mě je tam hlavním problémem rozdíl mezi paralelním a sériovým stahováním těch modulů. Zatímco NPM-ko je stahuje sériově: to znamená, stáhne jeden, stáhne druhý, stáhne třetí… Yarn to okamžitě začne táhnout po všech vláknech, která má k dispozici.  A to je vlastně místo, kde získávají tu šílenou rychlost, kterou oproti NPM-ku mají. A přesně tohle by se dalo udělat i v NPM-ku, ale znamenalo by to sahat na core od NPM-ka, dělat velké refactory oproti současnému stavu. 

**Martin Michálek**: To znamená, abych to shrnul, NPM i Yarn vlastně mohou koexistovat, minimálně nějakou dobu, s tím, že NPM s sebou nese nějakou zátěž historie s nutností jakési zpětné kompatibility a není tak jednoduché vzít všechno, co ten Yarn nabídl, a dát to hned do NPM bez nějakých jiných problémů. Takže minimálně nějakou dobu, dlouhou, ty předpokládáš, že to spolu bude koexistovat a že NPM-ko pojede díky tomu, že je to standard, a Yarn zase pro ty vývojáře, kteří tam uvidí ty zajímavé featury?

### Yarn: může se opakovat historie s Node.js a IO.js?

**Riki Fridrich**: Jestli si mám zahrát na proroka, tak bych si tipl, že to dopadne podobně jako s [io.js](https://iojs.org/en/), což vlastně byla větev, která se odtrhla od [Node.js](https://nodejs.org/en/), protože správcové node.js** **nereagovali dostatečně rychle a neimplementovali nějaké featury, které komunita chtěla – tak se ta komunita urvala a udělala si to po svém. A potom ti pohodlní správcové node.js se vzpamatovali a znova mergli io.js do node.js. Takže io.js svou historickou funkci splnilo a potom bylo zase absorbované – a já bych si tipl, že podobně to skončí i s Yarnem – že NPM-ko do sebe nasaje to, s čím přišel Yarn, udělá ty nutné změny..

**Martin Michálek**: Probrali jsme Grunt, Gulp, Bower a teďka je aktuální nástroj Webpack, NPM a Yarn. Zapomněl jsem, Riki, na něco? 

**Riki Fridrich**: Určitě jsme zapomněli na stovky různých modulů, které se vynořují každý den. Momentálně v JavaScriptu lidé hovoří o tzv. JS Fatigue jako o únavě JavaScriptu, protože toho vzniká strašně moc. Podle mě není v lidských silách udržet si přehled o úplně všem, co teď v tom ekosystému vzniká.

**Martin Michálek**: JS Fatigue mě zaujalo. My, kteří nejsme javascriptoví vývojáři a kteří vlastně ty nástroje toho javascriptového světa využíváme z nějakých pragmatických důvodů na tom frontendu: 

### Grunt a Bower ve světě statických webů {#staticke}

**Martin Michálek**: Mimochodem já pořád ještě používám Grunt a jsem s tím spokojený, protože na věci, které potřebuju, což je typicky kompilace CSS-ek, je to úplně super.

**Riki Fridrich**: O to právě jde: když ti to funguje a vyhovuje ti to, tak není důvod to měnit. 

**Martin Michálek**: Já si taky myslím. Mimochodem s Gruntem to v jednu chvíli vypadalo špatně, protože se nevyvíjel a začaly se tam objevovat nějaké chyby, které nebyly opravované. Nicméně dneska – byl bych rád, aby zaznělo – že je to vlastně součástí jQuery Foundation,  součástí velké nadace, která se stará o software. A přesně do toho světa jQuery a prezentačních webů mi to úplně dokonale sedí. Pro nás lidi, kteří děláme prezentační weby, e-shopy a tady tyhle typy produktů, tak je to úplně v pohodě nástroj, který samozřejmě od nějaké velikosti začne být pomalý. Ale já jsem se třeba u svých projektů do té velikosti nedostal. Takže pro specifické věci je to vynikající nástroj, podobně Bower, ten je vlastně taky použitelný třeba pro to, když si chceš z toho jQuery světa nalinkovat jQuery, Bootstrap, což nejsou javascriptové knihovny, ale jsou to vlastně frontend knihovny, které mají v sobě spoustu různých souborů, tak Bower je v pohodě... 

**Riki Fridrich**: Ty jsi řekl jednu velmi důležitou věc, a to, že Gruntu spousta lidí vyčítá, že je pomalejší než Gulp anebo nějaké jiné nástroje, ale finta je v tom, že většina lidí tu rychlost jakoby nevnímá. Pokud nemáš projekt nad určitou velikost a nad určitou komplexitu, tak ta rychlost tě nezajímá. To znamená, že ty rychlejší nástroje řeší problém, který ty nemáš. To je právě velmi zásadní věc. 

### JS fatigue: únava z JavaScriptového ekosystému

**Riki Fridrich**: Jestli můžu někomu poradit, jak bojovat s tou [únavou javascriptové komunity](https://medium.com/@ericclemmons/javascript-fatigue-48d4011b6fc4): nemusíte používat každý nový nástroj, který vznikne. Stále se zamýšlejte nad tím, jaký problém ten nový nástroj řeší a jestli i vy máte ten problém. Jestli ano, šup do toho, naučte se to, použijte to. Ale jestli to řeší problém, který vy nemáte? Tak není důvod přeskakovat a zbytečně zkoušet něco jiného.  

**Martin Michálek**: Jo, naprostý souhlas. Já tenhle trend vidím hodně u vývojářů, kteří mají hodně zájem o JavaScript, hodně sledují ty nové věci. Třeba budeš se mnou souhlasit, já to sleduju hodně zvenku, ale vidím to tak, že JavaScript je v nějaké fázi vývoje. Ekosystém JavaScriptu je v nějaké fázi vývoje. Je to vlastně unikátní historická situace, kdy vzniká nějaký programovací ekosystém v situaci, kdy máme úplně neuvěřitelnou možnost komunikace přes internet různými kanály. To znamená, že ve chvíli, kdy vyjde jeden nástroj, tak ty vlastně v tu danou minutu prakticky můžeš reagovat svým dalším nástrojem, a proto je to tak rychlé. A proto se to vlastně nedá stíhat sledovat.

**Riki Fridrich**: To je právě ten princip, že – *to je sice pěkné, ale já bych to udělal lépe* – a udělá to...

**Martin Michálek**: Přesně tak... 

**Riki Fridrich**: Já bych to popsal tak, že JavaScript byl velmi dlouho jako dítě a teď se z něho stal teenager. Že se dostává do světa a v podstatě se hledá, učí, zkouší různé věci, zjišťuje, co funguje a co nefunguje. Takže právě proto je ten vývoj takový překotný, divoký a zmatený. A já bych tomu dal nějakou dobu. Ono se to ustálí a ten JavaScript dospěje: najde si svůj styl, svoje nástroje a už se to uklidní.

**Martin Michálek**: Jasně, takže když to srovnávám s PHP-ovským ekosystémem, kde je prostě Composer jako balíčkovací systém (předtím dlouho nebyl), tak v zásadě ten vývoj se může takhle stabilizovat a být tam jeden balíčkovací systém, který vyřeší spoustu věcí. 

### Rikiho workflow s NPM skoro ke všemu {#workflow}

**Martin Michálek**: A tím se dostáváme k další věci, která mě zajímá... – Koukal jsem se na přednášku z toho Barcampu, hradeckého, o NPM-ku, a já jsem měl z toho pocit, že tobě to NPM-ko stačí dneska úplně ke všemu. Je to tak?

**Riki Fridrich**: Je. Pro mě je momentálně NPM-ko v podstatě hlavní automatizační nástroj. Nahradilo to Grunt, Gulp a všechny věci kolem toho. NPM-ko udělalo pár kroků vpřed: podstatně vylepšili možnosti skriptování, a stalo se dobrým zvykem, že prakticky každý modul, každý nástroj, který se v JavaScriptu používá, má svůj command line interface, své CLI. To znamená, Webpack má CLI-čko, Babel má CLI-čko, Karma má CLI-čko – prostě všecko se to dá pouštět přes command line.

Takže pro mě osobně je nejjednodušší si všechny ty věci naskriptovat jednoduše tak, že si píšu command-lineové příkazy, řetězím je kdejak je na sebe navazuju nahoru – dolů a víceméně si to píšu ručně. Je to asi trošku složitější než psát nějaký konfigurák v Gruntu, kde ty konfiguráky víceméně mají stejnou podobu nebo je tam nějaký standard, podle kterého se to píše. Když používám command line interfacy k jednotlivým modulům, tak se musím podívat, jaké jsou properties u každého modulu zvlášť. Musím se podívat do dokumentace. Ale aspoň pro mě osobně to není o tolik práce navíc. 

**Martin Michálek**: To mě zaujalo. Já se musím přiznat, že dneska používám NPM standardně jako balíčkovací systém, na některých projektech občas ještě ten Bower a Grunt. Jsou to tři nástroje. V poslední době jsem přestal mít potřebu používat Bower ve prospěch NPM-ka, protože vlastně skoro všechny knihovny jsou v NPM. Teďka uvažuju nad tím Gruntem. Včera jsi mě tou přednáškou docela inspiroval, protože já si to vlastně umím představit jako náhražku toho Gruntu. Protože ty jsi říkal, že tam je nutné něco konfigurovat, hledat něco v dokumentaci. Ale v Gruntu jsi na tom podobně, protože minimálně si musíš najít ten snippet toho kódu, který něco konfiguruje. Tak ho tam vlastně taky musíš nějak doplnit.

**Riki Fridrich**: Je to to samé, akorát v trošku jiné formě. V Gruntu konfiguruješ nějaký JSON, prostě nějaký javascriptový objekt, zatímco v těch command line interfacích to konfiguruješ opět buď nějakým samostatným config-em nebo přes nějaké parametry té command liny. Ale pořád je to jen nějaká konfigurace. Stále je třeba se podívat do dokumentace a něco z ní copypastnout. 

**Martin Michálek**: Když se snažím Grunt vysvětlovat lidem, kteří třeba nemají s JavaScriptem takovou zkušenost, vlastně vůbec s příkazovou řádkou, tak ono i to je dost bolestné. Jsou tam nějaké závorky, dvojtečky, čárky, středníky, a když nejsi native v JavaScriptu, tak je to pro tebe často takové nepochopitelné. A v zásadě třeba pro mě osobně je možná pochopitelnější příkaz na příkazové řádce s nějakými parametry než ten konfigurák Gruntu. Takže já si to beru jako věc, kterou chci zkusit, a určitě na to nějak navážu, časem. 

**Riki Fridrich**: Ještě jedna taková drobnost – Grunt možná může mít nějakou trošku výhodu v tom, že prakticky všechny ty konfiguráky jsou pohromadě v jednom souboru – je tam nějaký Gruntfile.js – a tam jsou všechny ty konfiguráky a všechny ty skripty anebo ty commandy: ty tasky, které se spouštějí. Zatímco v tom NPM-kovém ekosystému se ti velmi snadno může stát, že v nějakém root adresáři projektu budeš mít deset různých konfiguráků. Každý má nějakou jinou konvenci pojmenování... Máš tam .babelrc, který nemá žádnou příponu, ale je to JSON..., pak tam máš karma.conf.js, ESLint a EditorConfig a podobné věci. Každý z těch configů může mít jiný formát, jinou příponu, jinou nějakou pojmenovací konvenci toho názvu. Takže to může být trošku matoucí a chaotické, ale ono čistě teoreticky i v tom se dá udělat pořádek, protože každý z těch konfiguráků se dá odkázat do command linu přes nějaký parametr, nemusí to být přesně podle té pojmenovací konvence. Takže je lze nazvat nějak jednotně: eslint.config.js a babel.config.js apod. a potom je jen linkovat. Ale je tam ta hrozba, že to jakoby zabordelí ten root adresář projektu – a některým lidem se to nelíbí. Mně osobně to nevadí, protože aspoň mám oddělené configy pro každý z těch nástrojů zvlášť. Mně osobně se v tom orientuje dobře.  

**Martin Michálek**: Když teď zůstaneme u toho NPM-ka, tak NPM-ko je konvenčně pojato jako nějaký balíčkovací systém, teďka jsme to rozšířili o možnost běhu nějakých tasků – takže třeba jako potenciální náhradu Gruntu, Gulpu... A je tam třeba ještě něco dalšího – na té mapě toho NPM-ka, co třeba ty používáš často, a přitom to není běžná věc? 

**Riki Fridrich**: Nic zásadního mě nenapadá... Tyhle dvě věci jsou takové podstatné... 

### Yarn a shrinkwrapping {#yarn}

**Riki Fridrich**: Momentálně se dost řeší shrinkwrapping – a to je i jeden z hlavních důvodů, proč vznikl Yarn – protože Yarn to řeší podstatně elegantněji. V podstatě to znamená, že jako vývojář chci mít větší kontrolu nad konkrétními verzemi balíčkových závislostí, které v tom projektu mám. Víceméně jde o to, že chci mít build zreplikovatelný přesně tak, jako byl udělán kdysi. Protože ty závislosti se většinou nastavují cestou vlnovky a stříšky apod. To znamená, neuvádím tam konkrétní verzi, ale chci verzi 1.4 a vyšší, ale menší než 2.0. To může být problém, pokud se pokoušíš zreplikovat stejný build, já nevím, o měsíc později, protože už tam budeš mít novější verze, které zase můžou něco vygenerovat trošičku jinak. A právě kvůli tomu vznikl Shrinkwrap, což je něco jako zámek, který řekne – v tomto momentu jsou všechny moduly přesně v těchto verzích – a dokáže je vytáhnout zpět. V tom NPM-ku je to tak jakoby našroubované trošku na sílu – je třeba tam dělat nějaké kroky okolo toho, aby ten shrinkwrapping fungoval správně a aby byl stále aktuální, zatímco Yarn je na shrinkwrappingu postavený celý. – Lockfile je přímou součástí Yarnu a je to tam od začátku. Toto je právě oblast, která je momentálně taková nejpalčivější... 

**Martin Michálek**: Je to zase věc, která zase posouvá ty nástroje trošku někam jinam a v zásadě nemá to NPM-ko šanci se v dohledné době k tomu shrinkwrappingu dostat. 

**Riki Fridrich**: NPM-ko shrinkwrapping má, ale je tam jakoby přidaný a jeho používání je na vícero kroků... – Pokud chci použít shrinkwrapping, tak musím zaktualizovat moduly, ověřit si, že jsou ve správných verzích, potom vytvořit ten shrinkwrap, ten lockfile, a pak, když to chci vytáhnout, tak musím explicitně zvolit – *chci to vytáhnout – *podle toho, co je v tom lockfile apod., zatímco Yarn s tím pracuje nativně. Takže oba ty nástroje dělají to samé, akorát trošku jinak, a podle mě je jen otázkou času, kdy NPM-ko přebere ten nativnější přístup který je teda lepší. Akorát – jak už jsem řekl – bude to vyžadovat nějaké změny v jeho jádru. 

### Pojďme to shrnout

**Martin Michálek**: Riki, děkuju. Já bych to ještě shrnul (pro někoho, kdo si poslechne jen konec podcastu): Prošli jsme všechny možné nástroje: od Gruntu, Gulpu, Boweru, dotkli jsme se Webpacku, který Riki považuje za stále živý a zajímavý projekt, ale vlastně gró Rikiho práce (resp. skoro všech dnešních javascriptových vývojářů) je v NPM-ku a možná v Yarnu, který je vlastně náhradou toho NPM. 

**Riki Fridrich**: Spíš alternativa.

<!-- AdSnippet -->

**Martin Michálek**: Dobře, alternativa. To znamená, když bychom to měli shrnout do nějakých dvou nástrojů, tak bys asi doporučil lidem, kteří třeba nestíhají sledovat JavaScript a chtějí použít třeba jen jeden nástroj, tak bys jim doporučil asi NPM a alternativně Yarn. Je to tak? 

**Riki Fridrich**: No, bez toho se v podstatě nepohneš, protože musíš mít ten package.json, ve kterém je uvedeno, které moduly používáš. Ale ono to hodně záleží na tom, co vlastně chceš dělat. V momentě, kdy chceš, já nevím, transpilovat ES6 kód, tak se bez Babelu – anebo nějakého podobného transpileru – nepohneš. V momentě, kdy chceš něco testovat, tak se bez Karmy anebo Avii anebo jakéhokoliv dalšího testovacího frameworku nepohneš. Takže to NPM-ko je jenom takové přirozené centrální místo, kde se to všechno sbíhá, ale jinak musí každý používat ty nástroje, které vyhovují jeho potřebám a požadavkům. 

**Martin Michálek**: Super! Riki, děkuju za rozhovor, jsem rád, že jsi přijal pozvání, a já, než se rozloučíme, musím poděkovat firmě Maternia, u které dneska sedíme a která provozuje e-shop [VašeČočky](https://www.vasecocky.cz/), a díky všem, kteří nás poslouchali a těším se na slyšenou u dalších epizod podcastu ze Vzhůru dolů! 

**Riki Fridrich**: Těšilo mě!