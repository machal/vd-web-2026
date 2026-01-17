---
postID: 77
postTitle: 'Podcast: S Robinem Pokorným o CSS v Javascriptu'
postUrlId: css-v-js
postDateTime: '2016-12-08 00:00:00'
excerpt: 'V dalším podcastu ze Vzhůru dolů jsme se s Robinem zaměřili na téma tepající mezi frontend kodéry i javascriptovými vývojáři – CSS uvnitř Javascriptu.'
postStatus: Published
authorID: 0
sectionID: 1
category: []
no_ads: false
og_title: 'Podcast: S Robinem Pokorným o CSS v Javascriptu'
og_description: 'V dalším podcastu ze Vzhůru dolů jsme se s Robinem zaměřili na téma tepající mezi frontend kodéry i javascriptovými vývojáři – CSS uvnitř Javascriptu.'
og_type: article
---

# Podcast: S Robinem Pokorným o CSS v Javascriptu

V dalším podcastu ze Vzhůru dolů jsme se s Robinem zaměřili na téma tepající mezi frontend kodéry i javascriptovými vývojáři – CSS uvnitř Javascriptu. 

Probrali jsme historii psaní stylů uvnitř javascriptového kódu a podívali se, proč s tím vlastně React přišel. Přes CSS Modules se dobrali až ke Styled Components, které Robin považuje za zdařilý kompromis mezi světy CSS a Javascriptu.

<p class="podcast">
Podcast: <a href="https://soundcloud.com/vzhurudolu/s-robinem-pokornym-o-berline-1" data-id="296642310">S Robinem Pokorným o CSS v Javascriptu</a>
</p>

## Obsah

- JSSS neboli JavaScript Style Sheets tady byly dříve než CSS ([1:00](https://soundcloud.com/vzhurudolu/s-robinem-pokornym-o-css-v-js#t=1:00), [text](#jsss))
- Styly uvnitř javascriptového kódu: CSS-kářům se ježí chlupy ([2:24](https://soundcloud.com/vzhurudolu/s-robinem-pokornym-o-css-v-js#t=2:24), [text](#chlupy))
- Hlavní nevýhoda CSS: globální platnost ([4:17](https://soundcloud.com/vzhurudolu/s-robinem-pokornym-o-css-v-js#t=4:17), [text](#globalni))
- Druhá generace: CSS Modules ([5:56](https://soundcloud.com/vzhurudolu/s-robinem-pokornym-o-css-v-js#t=5:56), [text](#css-modules))
- Třetí generace a fajn kompromis: Styled Components ([12:12](https://soundcloud.com/vzhurudolu/s-robinem-pokornym-o-css-v-js#t=12:12), [text](#styled-components))
- React Native a univerzální aplikace ([15:01](https://soundcloud.com/vzhurudolu/s-robinem-pokornym-o-css-v-js#t=15:01), [text](#react-native))
- Pohřbíváme CSS preprocesory? ([19:40](https://soundcloud.com/vzhurudolu/s-robinem-pokornym-o-css-v-js#t=19:40), [text](#preprocesory))
- Bude další Brus kódu? ([20:15](https://soundcloud.com/vzhurudolu/s-robinem-pokornym-o-css-v-js#t=20:15), [text](#dalsi-brus))

<!-- AdSnippet -->

## Odkazy

- [Robin Pokorný](https://robinpokorny.com/)
- [Robinův zaměstnavatel: Wimdu.com](http://www.wimdu.com/)
- [JavaScript Style Sheets](https://en.wikipedia.org/wiki/JavaScript_Style_Sheets)
- [Robinova přednáška o nevýhodách CSS](http://www.slideshare.net/robinpokorny/react-a-omyly-css)
- [Výhody a nevýhody psaní stylů v JS: článek na Medium.com](https://medium.com/@david.gilbertson/building-a-website-without-css-trials-and-tribulations-5aa30499f57c#.4na274mcm)  
- [CSS Modules](https://github.com/css-modules/css-modules)
- [Styled Components](https://styled-components.com/)

## Textový přepis {#text}

**Martin Michálek:** Dobrý den, posloucháte podcast na VzhůruDolů.cz, ve kterém si povídám se zajímavými lidmi kolem webdesignu. Od mikrofonu zdraví Martin Michálek. Dovolte mi tady znovu přivítat Robina Pokorného, frontend vývojáře ve [Wimdu.com](http://www.wimdu.com/), toho času v Berlíně. Ahoj Robine.

**Robin Pokorný:** Ahoj Martine, ahoj všichni.

**Martin:** Robine, my jsem si [minule povídali o Berlíně](/blog/74-podcast-robin-berlin). Tak dneska se zaměříme na vyloženě vývojářské téma, na něco, v čem je dneska velký flame. Pojďme si povídat o CSS-kách, respektive stylech v JavaScriptu. O věci, která mně osobně se skoro vůbec nelíbí, ty k tomu budeš mít asi trošku kladnější vztah. Zkusme najít situace, pro které je to dobré a pro které je to úplně na pytel.

### JSSS neboli JavaScript Style Sheets tady byly dříve než CSS {#jsss}

**Robin:** Dobře. Já bych možná začal takovou historickou vsuvkou – historickým úvodem. Já se o to téma nějakou dobu zajímám, a dokonce jsem na tomto WebExpu měl mít i přednášku, takovou tu záložní, kdyby někdo onemocněl, a ta přednáška právě měla mít název „CSS v JS“, tedy kaskádové styly JavaScriptu. 

A během toho, co jsem si zjišťoval informace, tak jsem narazil na jednu strašně zajímavou technologii, která se jmenuje [JSSS neboli JavaScript Style Sheets](https://en.wikipedia.org/wiki/JavaScript_Style_Sheets), což zní přesně tak, jak bychom čekali – totiž zápis stylu pomocí JavaScriptu. 

<!-- AdSnippet -->

Co je na tom zajímavé, že tady ta technologie –  ten způsob zápisu – vznikl dřív než kaskádové styly, tedy CSS, a ve své době to hodně tlačil Netscape. Než teda uznal, že CSS bude ta cesta, kterou jít. 

A co tím já chci říct, je, že si musíme uvědomit historické souvislosti – že JavaScript je o něco starší jazyk než kaskádové styly. A že tady ty snahy – dostat stylování do JavaScriptu nebo podobného zápisu – nejsou záležitostí posledních dvou, tří let, jak by se mohlo zdát, ale sahají de facto až k samým počátkům stylování na webu.

### Styly uvnitř javascriptového kódu: CSS-kářům se ježí chlupy {#chlupy}

**Martin:** Jasně. To je pravda, Netscape, budiž mu země lehká, měl určitě nějaké důvody, proč tady tohle udělal... 

A já chápu na jednu stranu tu snahu, mít ty CSS-ka v JavaScriptu, protože my běžní frontenďáci, běžní kódeři, používáme velice rádi preprocesory. A když si představím, že věci pokročilejší, které používám v preprocesoru – jako, já nevím, cykly, podmínky atd. – kdyby se řešily stejným jazykem, jako se řeší ostatní frontend, pak si umím představit, že tohle je fajn. 

Na druhou stranu, když píšeš ty CSS-ka tím způsobem, jako se to dělá v Reactu, tak vlastně ty CSS-ka píšeš uvnitř toho javascriptového kódu.

**Robin:** Ano. Debatu na téma kaskádových stylů v JavaScriptu [otevřel před dvěma lety asi Vjeaux](https://speakerdeck.com/vjeux/react-css-in-js) z Facebooku...

**Martin:** Ano, má o tom slavnou přednášku…

**Robin:** Přesně tak... A na této přednášce on ukazuje nějaké důvody, proč přináší velké výhody mít styly v Javascriptu – mj. třeba sdílení konstant, absence globálních proměnných nebo respektive přítomnost lokálních proměnných – a další věci. 

A tímhle tím začala ta velká sága o tom, jestli a když už, tak jak zapisovat ty styly v JavaScriptu. A ten původní přístup, který je, myslím, i v té prezentaci, skutečně ukazuje, že zapisuju do stejného souboru, jako mám tu – v tom případě reaktivní komponentu. Zapisuju i styly pomocí takového toho klasického zápisu jako objekt, akorát místo pomlček mám CamelCase.

**Martin:** Přesně tak. Takže vlastně něco, z čeho se CSS-kářům ježí chlupy…

**Robin:** Ano. To naprosto věřím.  

### Hlavní nevýhoda CSS: globální platnost  {#globalni}

**Martin:** Dejme tomu, to byla tato přednáška. Ty jsi o tom [taky přednášel](http://www.slideshare.net/robinpokorny/react-a-omyly-css). A na všech těch přednáškách se vytýkaly hlavně dvě věci: To, že jsou CSS-ka globální. To znamená, že když chceš stylovat konkrétní komponentu nebo její modifikátor nebo její subkomponentu, tak musíš použít prostě unikátní název. 

Ty unikátní názvy – tím, jak musí být unikátní, tak jsou občas relativně dlouhé – nedá se to nijak minifikovat atd. A z tohohle leze v CSS-ku spoustu problémů. Což chápu.

A teďka, když to posunu dál a koukám na nějaké další zkušenosti – nedávno třeba na Medium.com byl [docela hezký článek](https://medium.com/@david.gilbertson/building-a-website-without-css-trials-and-tribulations-5aa30499f57c#.4na274mcm) o tomhle. 

Když se dívám na další zkušenosti lidí, kteří tohle nasadili, tak tam samozřejmě potom je to CSS-ko...  Ono to není CSS-ko – ony jsou to vlastně styly v JavaScriptu. CSS-ko je vlastně jazyk, který má vlastně nějaká svá pravidla a vlastnosti – kromě jiného třeba dědičnost. Tam vlastně nemůžeš dědit – nemáš tam prostě kaskádu – nemáš tam `:hover` – po najetí myši – a nemáš tam pseudotřídy, které třeba my kódeři využíváme dost hojně... Pro responsivní design nemůžeš použít Media Queries, jo... Tohle všechno musíš nějak hackovat JavaScriptem. Samozřejmě dá se to všechno nahackovat tím JavaScriptem... Ale ty k tomu určitě chceš něco říct – tak povídej... 

### Druhá generace: CSS Modules {#css-modules}

**Robin:** Ano – rád. To, co ty tady popisuješ, je skutečně ta první generace zápisů CSS-ek navrhnutá v té prezentaci – a všechny ty věci, o kterých jsi mluvil, jsou hovery nebo další akce (např. Media Queries) simuluju tím, že v JavaScriptu odposlouchávám tyto události a nějakým způsobem na ně reaguju – což zase má své výhody – protože často chci reagovat v obou dvou, jak ve stylu, tak v nějaké logice, na tyto události – takže i tam věřím, že to má smysl. 

Ale ano, ten zápis je minimálně nehezký a s tím naprosto souhlasím – ty pseudotřídy, o kterých jsi mluvil, a tak dále, tak to byly problémy, které všichni lidi vnímali, a přesto ty výhody pro ně mohly převážit. No, a aby tady těch výhod bylo ještě víc, respektive, aby těch nevýhod bylo méně, tak vznikly nějaké další přístupy k tomu, jak tady to zapisovat. 

Jedním z těch přístupů byly [CSS Modules](https://github.com/css-modules/css-modules), kde vlastně ten soubor s těmi styly byl zapsán paralelně s tou komponentou – s tím JavaScriptem – ve zvláštním souboru, ten soubor pak byl pomocí `require()` přidán do toho JavaScriptu – vznikla tam ta explicitní závislost na tenhle ten styl... 

Ale najednou jsem měl styly, které vypadaly de facto hodně podobně jako CSS-ka – ten zápis byl hodně podobný, ale najednou tyhle ty věci nebyly globální, byly tady tyhle ty závislosti, mohl jsem s tím pracovat, mohl jsem tam přidávat nějaké pseudotřídy, mohl jsem tam přidávat další věci... A to, co ono to ve skutečnosti nakonec udělalo – že tady těm bezejmenným stylům přidal nějaký vygenerovaný název a propojil to pak s tím JavaScriptem... Takže celé to propojení bylo jenom na základě tříd. To znamená, v JavaScriptu jsem měnil třídy a ty vygenerované kaskádové třídy se mi na to aplikovaly (ale mohl jsem použít ten JavaScript, tak jak byl...). 

**Martin:** To znamená, pokud CSS Modules dobře rozumím, tak vlastně píšeš CSS-ko tak, jak jsi víceméně zvyklý (nebo já jsem zvyklý – vlastně všichni jsme zvyklí), a pomocí nějaké kompilace nebo převodu se z toho stávají „styly v Javascriptu“, které vlastně ztrácejí ty hlavní nevýhody typu globálnost…

**Robin:** Modularita...

**Martin:** Přesně tak. Potom vlastně jsou to opravdu modulární styly, pak vlastně v DevTools nebo vlastně v DOM-u se ta třída jmenuje trošku jinak, než ji používáš ty, když ji zapisuješ jako kodér... Může se jmenovat krátkým pojmenováním, může si s tím ten JavaScript dělat, co chce, a vlastně ztrácejí se ty nevýhody. To je třeba věc, která se mně děsně líbí. Má to ještě třeba nějakou další nevýhodu? Protože třeba CSS Modules je věc, která vlastně odstraňuje řadu nevýhod – a zůstává tam ještě něco? 

**Robin:** Já bych řekl, že pořád ta největší nevýhoda – ta je tam od začátku – a ta asi nepůjde nějak zvlášť jednoduše odstranit – a to je ta závislost na tom JavaScriptu... A teď nemám na mysli to, že je to zapsáno v tom JavaScriptu, ale mám na mysli to propojení. 

Když jsem třeba psal [Jobs UI](https://lmc-eu.github.io/jobs-ui/), tak jednou z těch věcí bylo oddělení technologie, která, dejme tomu, generuje ten markup, a toho zobrazení. To znamená, pro nás se ten markup stal takovým API a ve chvíli, kdy ten markup odpovídal nějaké šabloně, tak jsme garantovali, že ten vzhled bude správný – a bylo nám jedno, jestli ten markup vygeneruje JavaScript, PHP, Java nebo cokoliv jiného – nebo nějakou kombinaci těchto technologií... 

V tom světě toho CSS JavaScriptu – tady to trošku ztrácím, protože ten zápis mi neumožňuje nějak jednoduše – jak říkám, ty třídy jsou generované – takže já nemůžu nějak jednoduše vygenerovat tady ten – nějaký markup třeba – na backendu v něčem jiném než v JavaScriptu a pak to použít... To znamená, ta hlavní nevýhoda je takové to uzamknutí se do tohohle světa, který není nutně špatný – ale je to věc, na kterou je potřeba myslet. 

**Martin:** Jasně. To znamená, že vlastně Jobs UI, to je vlastně design systém...

**Robin:** Ano...

**Martin:** ...respektive knihovna návrhových vzorů pro Jobs.cz, takový malý Bootstrap, a tam se v zásadě potom ztrácí to, že ten programátor nemůže jenom kouknout do HTML nebo prostě do prohlížeče, vzít to odtamtud, prostě ztrácí se... Jak se říká, že pro Bootstrap a tyhle systémy je to HTML vlastně API – jak jsi zmiňoval – do kterého kouká ten programátor – už nemusí koukat do těch stylů – tak tohle je ta věc, zjednodušeně řečeno, která tam potom jakoby trošku začne vadit...

**Robin:** Ano. Ale zase na druhou stranu to má spoustu výhod – ještě bych tam třeba zmínil to, že generování takovýchto style guides je teď mnohem jednodušší, protože ta „style guide“ – to API – není tak, že musím vygenerovat nějaký markup, který přece jenom může být občas problematický a ty změny v něm můžou být malé, ale pro ten styl velké... 

Ale to API je najednou nějaká javascriptová komponenta, kterou dokážu dobře popsat, bude vypadat jakoby stejně, můžu velmi jednoduše vygenerovat ty styly – jak ta komponenta reálně vypadá. Není to jenom styl té komponenty, ale ta komponenta samotná. 

**Martin:** Jasně, super. To mi vlastně připadá jako takový fajn kompromis – že se vlastně zbavím toho, co třeba i mně vadí na CSS-ku – těch preprocesorů... Je tam jazyk navíc, který tam třeba vůbec nemusí být, začne se pracovat čistě s JavaScriptem, píšu dál CSS-ka – nebo mi je může psát i méně zkušený frontenďák – a následně z toho vlastně kompiluju něco, co vlastně má ty výhody těch CSS-ek v JavaScriptu. 

### Třetí generace a fajn kompromis: Styled Components {#styled-components}

**Robin Pokorný:** Ještě mám k tomu jednu věc, kterou bych rád řekl – totiž tím, že to je zapsáno takhle jakoby zvlášť, tak pořád mám možnost nějakým způsobem – nevím, jak složitým – vygenerovat ty standardní styly... Protože ty soubory tam pořád existují, mají nějaká jména, můžu vzít jméno toho souboru nebo můžu někde napsat jméno té komponenty a můžu vygenerovat to, co jsem de facto psal předtím – je to takový jiný způsob zápisu preprocesoru. To znamená, pořád tam vidím to, že přejít zpátky není tak složité, jako to bylo v té generaci první. 

No, a v dnešní době – teď asi nemůžu říct přesně kolik – ale před krátkou dobou Max Stoiber – doufám, že to jméno říkám správně – představil něco, co se jmenuje [Styled Components](https://styled-components.com/), a to je způsob, jak tady ty degenerace trošku spojit dohromady, bych řekl... Ten způsob spočívá v tom, že se využívá Template Literals, ECMAScript 6, to znamená, na jednu stranu se zase ten zápis vrací do toho javascriptového souboru, ale díky tomu, že to je jakoby string, víceřádkový – zjednodušeně řečeno – tak ten zápis vypadá de facto jako CSS-ko... 

Píšu tam ty věci... Ale najednou pokud tam napíšu dolar a složené závorky, tak můžu použít JavaScript... To znamená, získávám z mého pohledu jakoby výhodu obou dvou světů – ten vizuální styl je podobný CSS-ku, možnosti – jako mám v JavaScriptu... Asi trošku ztrácím tu věc, o které jsem mluvil před chvilkou – totiž vrátit se zpátky – tak tam si možná trošku zavírám vrátka... Ale myslím si, že to propojení je výhodné jak pro ty lidi, co dělají hlavně styly, tak pro lidi, kteří se zajímají o ten JavaScript. 

**Martin:** A co, prosím tě, potom dědičnost, hover efekt, Media Queries – moje obvyklá písnička...?

**Robin:** Dědičnost je problém. Myslím si, že většina lidí asi dneska dědičnosti nevyužívá – nebo – pardon – ne dědičnosti, ale kaskády; dědičnosti samozřejmě nějakým způsobem ano, ale zase – myslím si, že přináší spoustu problémů. Jsou vlastnosti, které se dědičností přenášejí, jsou vlastnosti, které se dědičností nepřenášejí... To, že mi někdo nastaví velikost písma, mi může potenciálně rozbít něco vevnitř... To znamená, je to nebezpečné... Neříkám, že to nemá své výhody – ale je to nebezpečné. 

S dědičností je ta situace o řád jednodušší – protože to, že nechceme využívat dědičnost, jsme se rozhodli před nějakými pěti/šesti lety, když přišlo [OOCSS](/prirucka/oocss) a Nicole Sullivan a vlastně všichni řekli, pojďme dělat ty selektory jednoduché, a všechny selektory budou de facto jenom jedna třída... To znamená, snížili jsme složitost selektorů, ergo jsme odstranili – nebo – se snažíme odstranit tu kaskádu z CSS. To znamená, nemyslím si, že tady bude problém. Ohledně hoveru a dalších věcí – přiznám se, že si nejsem jistý, jestli je tam ten hover podporován nějakým zápisem, nebo není... 

### React Native a univerzální aplikace {#react-native}

**Martin:** To už necháme když tak na posluchačích – aby si to dostudovali. Berme to jako zajímavou věc ve vývoji k nějakému rozumnému kompromisu mezi těmi dvěma přístupy, které se hodí na hrozně moc různých projektů... Protože – na tom se asi všichni shodujeme – že třeba tímhle směrem by to někde mohlo jít, s nějakými drobnějšími nevýhodami na obě strany. 

No, a teď je tam vlastně ještě jeden argument, který jsme tady opomněli pro to, dělat to v tom JavaScriptu – a to je jakási jednotnost při vývoji různých typů aplikací pro různá prostředí, viz třeba [React Native](https://facebook.github.io/react-native/), že jo... To je třeba věc, kterou hodně zmiňuje v poslední době Dan Steigerwald, samozřejmě. Pojďme mrknout ještě na tohle. Toto mi přijde jako argument, ale jenom třeba pro úzký segment jakoby aplikací, jo, nebo webů...

**Robin:** Určitě to je argument, určitě dává smysl, a já s tím souhlasím... Protože v React Native to ani nijak moc jinak dělat nejde... A ten způsob, který tam je, je pohodlný. Hodně pohodlný. Nebavíme se tady o nějakém stylování... Já teď nevím, jak to rozlišit... Ale viděl bych tam jistý rozdíl mezi takovým tím grafickým přístupem a takovým tím přístupem programátorským, kdy já chci mít trošku větší kontrolu než jenom přidávat nebo odebírat třídy – jakožto programátor, ale zároveň asi není cílem tam stylovat úplně všechno do nejmenších detailů. 

V těch nativních aplikacích je to jednodušší, protože ty aplikace často vypadají stejně nebo mají nějaký vzhled... Věřím tomu, že to jakoby je argument, a uznávám ho... Ta jednotnost toho přístupu mně přijde důležitější. Totiž ta rozdrobenost JavaScriptu samozřejmě bývává předmětem mnoha stížností – a tady to je možnost, jak to nějakým způsobem sjednotit. 

**Martin:** Jasně, rozumím. Mně to přijde třeba skvělý use case pro někoho, kdo chce zároveň dělat webovou aplikaci a třeba progresivní webovou aplikaci, které se teďka začínají dělat; pak chce udělat zároveň aplikaci vyloženě běžící v nativním prostředí a všechno vlastně chce mít v jednom kódu –  nebo ve velice podobných kódech – uložené... Pak ty javascripty, které jsou uvnitř JavaScriptu – jsou tam jakoby natvrdo, z pohledu toho kódera – tak mi tam nějaký ten smysl dávají, protože ti vlastně šetří práci... Pokud třeba distribuuješ tu aplikaci do pěti/šesti různých míst na různé platformy, pro různé prostředí a tak dál, tak pak mně to přijde jako poměrně silný argument – že to máš vlastně v tom JavaScriptu. 

Ale třeba když bych dělal běžnou webovou aplikaci, já nevím – někde nějakou kalkulačku nebo někde na webu, na e-shopu bych tenhle přístup používal – což jsou vlastně zase ty věci, které mají blíž k tomu grafickému, designerskému postoji, tak tam mně to vlastně přijde, že by to bylo dost ke škodě. 

**Robin:** S tím nemůžu, Martine, úplně souhlasit. Já si myslím, že ten směr je jakoby jasný – ten už je desítky let – to je nějaký způsob component – Web Components – nebo něco podobného – a tam samozřejmě je ta izolace důležitá. A tady ta schopnost mi to spojit do toho jednoho souboru a izolovat to – jakoby ne na nějaké úrovni namespacesu, nebo něčeho podobného, ale skutečně na úrovni kódu, mi přijde výhodná pro většinu aplikací. A samozřejmě – je to podobný tooling – je to o toolingu. To znamená, pokud jste ochotní do toho investovat, tak to dává smysl. 

<!-- AdSnippet -->

**Martin:** Stopro. Myslím jenom, že si nerozumíme... Já nemám na mysli u e-shopu používat ten standardní aktuální přístup, to znamená CSS-ku mít úplně bokem a JavaScript mít úplně bokem, ale používat třeba něco jako CSS Modules nebo Styled Components – tady tyhle vlastně kompromisní varianty – tam asi ta budoucnost půjde. A potom ta hardcore varianta – že vlastně CSS-ko se píše uvnitř javascriptového kódu – ono to není CSS-ko, že jo – oni tomu říkají JavaScript styly – tak ta se hodí zase pro tu situaci, kdy fakt dělám hardcore programátorskou aplikaci, která třeba nemá moc design – a zase se distribuuje na hrozně moc různých platforem. 

**Robin:** Tak teď už s tím souhlasím trošku víc, ale přesto si myslím, že třeba ty Styled Components jsou kompromisem, na kterém se můžou shodnout, podle mého, všichni... Neznám teď nějaký use case, komu by to mohlo vadit. 

**Martin:** To znamená, že i vlastně pro ty JavaScript styly, styly psané uvnitř JavaScriptu – takovou tu hrůzu, kterou já vždycky když někde vidím, tak mi to nedělá radost...

**Robin:** Mně taky ne...

**Martin:** ... tak i tam si dovedeš představit ty Styled Components? Přijde ti, že to jde tímhle směrem? 

**Robin:** Rozhodně. Já to vidím jako tu třetí, následující, generaci. Napjatě jsem očekával, co bude generace čtvrtá – pokud bude, ale ta generace třetí mi přijde hodně zajímavá. 

### Pohřbíváme CSS preprocesory? {#preprocesory}

**Martin:** Tak to je docela vtipné, protože my jsme první [Brus kódu spolu natáčeli o preprocesorech](http://bruskodu.cz/epizoda/6/). Není to tak, náhodou (nebo některý z těch prvních dílů)? 

**Robin:** Je to pravda. Jsou to už asi tři roky, ne? 

**Martin:** Myslím si, že jo. A teďka končíme tenhle podcast tím, že pohřbíváme preprocesory směrem k JavaScriptu, ale řekněme, že ne letos, ne úplně příští rok, ale do budoucna to tak asi dopadne. Myslím si, že to takhle můžeme tady prohlásit – a úplně se neztrapníme, historicky. 

**Robin:** Taky doufám... 

### Bude další Brus kódu? {#dalsi-brus}

**Martin:** Robine, a teďka ještě poslední otázka – bude další Brus kódu? 

**Robin:** No, to je zatím otázka, která zůstává otevřena a kterou tady nebudu –  v konkurenčním podcastu – zveřejňovat...

**Martin:** Tohle není konkurenční podcast – to je následník tvého podcastu – dokud ty nepřijdeš se svým podcastem, který v tu chvíli teprve bude konkurenční...

**Robin:** To znamená, já si myslím, že nakonec vznikne zase třetí generace – podobně jako v těch CSS-kách, v JavaScriptu... Nazveme to prostě „Brus dolů“ nebo něco takového...

**Martin:** Ano, ano, ano... Takže, přátelé, očekávejte další úroveň podcastu v České republice... Děkuju ti, Robine, za rozhovor a ať se daří! 

**Robin:** Hodně štěstí, Martine! 

**Martin:** Díky všem, kteří nás poslouchali, těšíme se na slyšenou u dalších epizod podcastu ze VzhůruDolů.cz. Od mikrofonu se loučí Martin Michálek.