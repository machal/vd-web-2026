---
postID: 18
postTitle: 'Stav trhu mobilních prohlížečů v Česku'
category:
  - prohlizece
postUrlId: mobilni-prohlizece
postDateTime: '2014-06-09 00:00:00'
excerpt: 'Jaké mobilní prohlížeče dnes lidé v ČR používají a v jakých tedy musíte své weby testovat? V prvním z řady článků se podíváme jak vypadá aktuální zdejší prohlížečový trh na tabletech a smartphonech.'
postStatus: Published
authorID: 1
sectionID: 1
og_title: 'Stav trhu mobilních prohlížečů v Česku'
og_description: 'Jaké mobilní prohlížeče dnes lidé v ČR používají a v jakých tedy musíte své weby testovat? V prvním z řady článků se podíváme jak vypadá aktuální zdejší prohlížečový trh na tabletech a smartphonech.'
og_type: article
---

# Stav trhu mobilních prohlížečů v Česku

Jaké mobilní prohlížeče dnes lidé v ČR používají a v jakých tedy musíte své weby testovat? V prvním z řady článků se podíváme jak vypadá aktuální zdejší prohlížečový trh na tabletech a smartphonech.

Jen pozor, v článku se operuje s čísly. A čísla jsou zrádná. Používám data z [Gemiusu](http://www.rankings.cz/), který měří velké české weby a pak u svých webů data z Google Analytics a analýzy logů. Čísla zde uvedená berte jako start pro uvažování, ale konkrétní kroky dělejte až podle vlastních měření. Trh je segmentovaný a tak to ve vaší cílové skupině může vypadat zcela jinak.

Mobilní prohlížeče si na konci dubna 2014 vzaly něco kolem 11% pageviews velkých českých webů měřených Gemiusem:

<img src="/assets/img/content/dest/mobilni-prohlizece-1-podil.jpg" alt="Podíl mobilních prohlížečů na celkovém počtu pageviews v ČR – duben 2014">

Pro srovnání — v listopadu 2013 to bylo jen 8,3%. Dostaneme se po letošních Vánocích nad 15%? Vypadá to, že ano.

Tak a teď k těm mobilním prohlížečům. Pro zjednodušení je nejdřív seskupíme do rodin. Ale pozor — rodina Android Browser obsahuje moderní verze 4.0 až 4.4, ale i starší 2.3. Internet Explorer na Windows Phone zase verze 7, 9, 10 i 11, v podílu Opery mícháme bratry vyloženě nevlastní — Operu Mobile i Mini. Více k jednotlivým prohlížečům hned v dalším textu.

<img src="/assets/img/content/dest/mobilni-prohlizece-2-rodiny.jpg" alt="Podíly rodin mobilních prohlížečů">

## Android Browser

V tuhle chvíli nejrozšířenější rodina mobilních prohlížečů:

<img src="/assets/img/content/dest/mobilni-prohlizece-3-android.jpg" alt="Verze Android Browseru">

### Verze mobilních prohlížečů? Google Analytics nevěřte

Verze Android Browseru nám Rankings.cz neukáže, Google Analytics se je ukázat pokoušejí, ale myslím si, že úplně špatně. Drtivě tam převládá 4.0, verzi 2.3 nebo 4.1 Analytics <s title="Viz komentář Pavla Jaška">vůbec neukazují</s> ukazují s miniaturním podílem, kterému se nechce věřit. K rozložení verzí Android Browseru se dostaneme až pokročilejší analýzou serverových logů (díky [Lukáši Kokoškovi](https://x.com/Lukoko_name)).

Zpět k verzím Android Browseru — webové vývojáře v ČR budou zajímat hlavně verze 4.0 a 4.1, do budoucna samozřejmě 4.2 a nejčerstvější 4.4. Pokud děláte prezentační weby, podpora HTML5 mezi nimi není tak různorodá, horší to bude u webových aplikací.

Tvůrce větších prezentačních webů ale potrápí zejména stále se vyskytující verze 2.3, která má nepodporuje třeba [SVG](http://www.root.cz/clanky/vektorovy-graficky-format-svg/), [matchMedia](https://github.com/paulirish/matchMedia.js/) a mnoho dalších HTML5 vlastností. Mrkněte se na [porovnání verzí 2.3, 4.0 a 4.0 ](http://caniuse.com/#compare=android+2.3,android+4,android+4.4)z pohledu podpory technologií. Android Browser 2.3 si z průměrné české návštěvnosti vezme něco mezi 0,5% a 1%.

## Safari Mobile

Výchozí prohlížeč na Apple mobilních zařízeních má přibližně 2procentní podíl na celkovém českém trhu. Vzhledem ke specifikům platformy neporoste tak rychle jako masovka Android. Prostředí iOS má ale pro vývojáře jednu výhodu — cca 3/4 uživatelů iOS mají vždy nainstalovanou poslední verzi operačního systému i prohlížeče, nyní 7. 

<img src="/assets/img/content/dest/mobilni-prohlizece-4-safari.jpg" alt="Verze Safari Mobile">

Centrálně plánovaná jednotnost s sebou ovšem přináší i nevýhody. Na iOS si sice můžete zvesela instalovat spousty alternativních prohlížečů, stránky vám bude ale mobilní Safari. Navíc trochu pomalejší, ale to rozvedu v příštím článku.

## Chrome Mobile

Pokud se zrovna na tuhle stránku koukáte v poslední verzí Chrome na Androidu, máte tu čest s nejmodernějším renderovacím enginem na mobilních zařízeních dneška. Tedy z pohledu HTML5 a pokud nebereme v potaz [prohlížeč v BlackBerry 10.2](http://html5test.com/results/mobile.html), ten se ovšem do českých statistik nevešel a určitě ani v budoucnu nevejde.

### Chrome na iOS — jen pseudobrowser

Chrome pro iOS a pro Android vypadají pro uživatele totožně — podobné uživatelské rozhraní, totožné přihlášení, práce s bookmarky, hlasové vyhledávání a další vychytávky. 

Z pohledu webaře jsou to ovšem dva diametrálně odlišné prohlížeče. 

Jak už jsem zmínil, Apple do AppStore nepustí prohlížeč s vlastním renderovacím jádrem a tak tam zbývá místo jen pro *pseudoprohlížeče*, které se sice uživatelsky tváří odlišně, ale stránky v nich stejně renderuje mobilní Safari. 

Chrome Mobile je zároveň prohlížečem s nejrychleji rostoucí uživatelskou základnou na mobilních zařízeních. Tady je vývoj podle Gemiusu:

<img src="/assets/img/content/dest/mobilni-prohlizece-6-chrome.jpg" alt="Rostoucí Chrome Mobile">

A pozor, Google se zřejmě rozhodl [zaříznout vývoj Android Browseru](https://x.com/firt/status/404135122032525312) ve prospěch mobilního Chrome. I renderovací engine WebView na Androidu 4.4 už obsahuje Chromium jádro ve verzi 30. Takže je pravděpodobné, že Chrome se do budoucna stane jedničkou i mezi mobilními prohlížeči.

## Internet Explorer na Windows Phone

Podle Gemiusu má půlprocentní podíl. Čísla z Google Analytics na mých webech jsou ještě nižší. Podíl navíc musíte ještě rozdělit mezi verzi 10 (nyní převládající WP8), 9 (WP7.5)  a do budoucna i 11 (WP8.1).  Celkově vám zatím vyjdou miniaturní čísla a velký bolehlav pokud se budete zabývat podporou moderních vlastností [u starších verzí](http://interval.cz/clanky/mobilni-internet-explorer-9-z-pohledu-vyvojare/). 

Microsoft s Explorerem celkově dohání ztracená léta kdy HTML5 ignoroval. Což o to, z pohledu webaře není od verze 10 k zahození. Horší je to s jeho tržním podílem. Zatím prakticky na úrovni mobilní Opery. Takže velmi, velmi málo.

<img src="/assets/img/content/dest/mobilni-prohlizece-5-ie.jpg" alt="Podíly verzí mobilního IE">

## Mobilní Opery

Opera přešla na renderovací jádro Chrome – Blink – a tím si uvolnila ruce pro [vytváření inovací](http://www.opera.com/cs/mobile) na trhu mobilních prohlížečů, většinou směrem k urychlení načítání stránek a šetření vaší FUP. 

Její [Opera Mobile](http://www.opera.com/cs/mobile/operabrowser) ale na žádném mém českém webu nejde přes půlprocentní podíl. Jen o fous používanější je [Opera Mini](http://www.opera.com/cs/mobile/mini). To je cloudový browser, kterému s renderováním stránky pomáhají proxy servery Opery. V prohlížeči samotném se zpracovává jakási koláž vektorů, bitmap a pár podporovaných HTML5 vlastností. Z pohledu webaře dost neradostná věc. 

Pokud vám dnes svět přijde moc růžový, otevřete si svůj poslední web v Opeře Mini. Nohama pěkně na  zem!

Ve statistikách se moc neprojevují, ale dobré vědět i o nových mobilních prohlížečích od Opery: [Opera Max](http://www.opera.com/cs/mobile/max) co FUP šetří hlavně pokud koukáte na fotky a videa a [Opera Coast](http://www.opera.com/cs/mobile/coast), prohlížeč s inovativním rozhraním navržený pro iOS, technicky ale opět jen mobilní Safari.

## HTML5test

Pojďme se teď u jednotlivých prohlížečů podívat jak jsou daleko s implementací rostoucí rodiny HTML5 technologií. V [HTML5 testu](http://html5test.com/results/desktop.html) mohou prohlížeče aktuálně získat až 515 bodů. Chrome na mém desktopovém Macu jich má nejvíc — 505. A takhle si stojí jednotlivé moblní prohlížeče:

<img src="/assets/img/content/dest/mobilni-prohlizece-8-html5.jpg" alt="Jak si mobilní prohlížeče stojí v HTML5test.com?">

Pro srovnání dobré vědět, že IE8 v HTML5test.com po neuvěřitelném výkonu dosáhl na skóre pěkných 43 bodů. Říkal snad někdo, jak jsou ty mobilní prohlížeče úděsné? 

Podporu konkrétních vlastností hledejte na [caniuse.com](http://caniuse.com/).

## Co byste měli vědět o dnešním světě mobilních prohlížečů?

* **Jedenáct procent.** To číslo připomínám, pokud byste snad měli pocit, že mobilní prohlížeče nemusíte řešit. Musíte. I když neděláte mobilní ani responzivní weby. Navíc to rychle roste.
* **Android Browser neexistuje.** Stejně tak neexistuje třeba IE na Windows Phone. Vždy se bavme o konkrétní verzi.
* **Chrome teď roste nejvíc** a za pár let zřejmě Android Browser vyžene.
* Koukejte hlavně na svoje čísla. A hlavně na **aktuální čísla, za rok, dva to bude zase hodně jinak**.
* Do statistik časem promluví i [mobilní Firefox](http://www.mozilla.org/cs/firefox/os/), chystaný [operační systém Samsungu](http://mobil.idnes.cz/samsung-z-s-os-tizen-0qv-/mob_samsung.aspx?c=A140602_151406_mob_samsung_ada) a tipuji, že Microsoft to s Windows Phone jen tak nevzdá.