---
postID: 160
postTitle: 'Podcast: S Radkem Pavlíčkem o WCAG a zákonu o přístupnosti'
postUrlId: radek-wcag
postDateTime: 2020-03-09
excerpt: 'Věnujeme se normě WCAG, loňskému zákonu o přístupnosti, javascriptovým aplikacím a nové asociaci, kterou chce Radek založit.'
postStatus: Published
authorID: 1
sectionID: 1
category:
  - přístupnost
no_ads: false
include_rss: true
category_highlight: true
og_title: 'Podcast: S Radkem Pavlíčkem o WCAG a zákonu o přístupnosti'
og_description: 'Věnujeme se normě WCAG, loňskému zákonu o přístupnosti, javascriptovým aplikacím a nové asociaci, kterou chce Radek založit.'
og_type: article
---

# Podcast: S Radkem Pavlíčkem o WCAG a zákonu o přístupnosti

Martin a Robin si do podcastu pozvali Radka Pavlíčka, odborníka na přístupnost, se kterým rozebírají normu WCAG, loňský zákon o přístupnosti, javascriptové aplikace a novou asociaci, o jejíž českou pobočku Radek usiluje.

<iframe src="https://cast.rocks/player/10893/S-Radkem-Pavlickem-o-pristupnosti.mp3?episodeTitle=S%20Radkem%20Pavl%C3%AD%C4%8Dkem%20o%20WCAG%20a%20z%C3%A1konu%20o%20p%C5%99%C3%ADstupnosti&podcastTitle=Vzh%C5%AFru%20dol%C5%AF%20%20podcast&episodeDate=March%209th%2C%202020&imageURL=https%3A%2F%2Fcast.rocks%2Fhosting%2F10893%2Ffeeds%2FBCHT7.jpg&itunesLink=https%3A%2F%2Fitunes.apple.com%2Fus%2Fpodcast%2Fvzh%C5%AFru-dol%C5%AF-podcast%2Fid1176274658" style="border: none; min-height: 265px; max-height: 320px; max-width: 558px; min-width: 270px; width: 100%; height: 100%;" scrollbars="no"></iframe>

## O čem mluvíme?


- Robinův tip: [Yarn 2](https://dev.to/arcanis/introducing-yarn-2-4eh1), [Robinova prezentace o něm (english)](https://www.youtube.com/watch?v=s-KD3isJSII).
- Martinův tip: [Notification permission data v CrUX](https://developers.google.com/web/updates/2020/02/notification-permission-data-in-crux).
- Předchozí Martinův rozhovor s Radkem [pokrývající základy přístupnosti](https://www.vzhurudolu.cz/podcast/96-podcast-radek-pavlicek). 
- Norma WCAG, doporučení pro tvorbu přístupného obsahu. [Články na Zdrojáku](https://www.zdrojak.cz/clanky/web-content-accessibility-guidelines-wcag-seznamte-se-prosim/), [checklist](http://blindfriendly.cz/wcag20checklist).
- Novinky ve WCAG 2.1: slabozrací a přístupnost na mobilech.
- Co znamenají úrovně WCAG: A, AA, AAA a proč se zákon zaměruje hlavně na AA? [Příklad s kontrastem](https://www.vzhurudolu.cz/prirucka/kontrast). 
- Nová legislativa kolem přístupnosti: [celý zákon](https://www.zakonyprolidi.cz/cs/2019-99), [komentář od Tyflokabinet](http://www.tyflokabinet.cz/clanky/novy_zakon_o_pristupnosti).
- Proč je v zákonech WCAG, ale ne HTML? Koho se norma týká a proč se netýká třeba škol nebo Českého rozhlasu a České televize?
- Co obnáší zpřístupnění podle zákona?
- [Accessibility Insights for Web](https://accessibilityinsights.io/) od Microsoftu.
- Přístupnost javascriptových SPA (Single Page Aplication): [Tak nám zpřístupnili JavaScript - Zdroják](https://www.zdrojak.cz/clanky/tak-nam-zpristupnili-javascript/) a technologie [WAI ARIA na Vzhůru dolů](https://www.vzhurudolu.cz/prirucka/wai-aria).
- [Asociace pro profesionály v přístupnosti – IAAP](https://www.accessibilityassociation.org/). Zájemci o členství v české sekci, pište prosím [Radkovi](https://poslepu.cz/o-mne/).

[MP3 ke stažení](http://cast.rocks/hosting/10893/S-Radkem-Pavlickem-o-pristupnosti.mp3)

## Podpořte nás, prosím

Děkujeme vám za každý odběr, hvězdičky nebo recenzi: [iTunes](https://itunes.apple.com/cz/podcast/vzhuru-dolu-podcast/id1176274658), [Spotify](https://open.spotify.com/show/1G2kH2YrIwD9BABg4L7xGC), [TuneIn](https://tunein.com/podcasts/Technology-News/Vzhuru-dolu-podcast-p1177693/) a [YouTube](https://www.youtube.com/watch?v=A-636hrhTBY&list=PLIdlKRR9lxIf7NmSOQoBplf65wMhUlbjy).


## Textový přepis

_Za přepis podcastu do textové podoby děkujeme Zbyňku Cincibusovi ze [Střediska Teiresiás](https://www.teiresias.muni.cz/) Masarykovy univerzity._

**Martin:** Dobrý den, posloucháte podcast Vzhurudolu.cz, ve kterém si povídáme se zajímavými lidmi kolem webdesignu a webového vývoje. Od mikrofonu zdraví Martin Michálek z Prahy-Milíčova.

**Robin:** A Robin Pokorný z Berlína. Ahoj.

**Martin:** Ahoj. Dneska máme tady vzácného hosta. A za chvíli vám o něm něco řekneme. Ale nejdřív řekneme dva naše tipy, rychle. Tak, předám slovo Robinovi, aby začal.

**Robin:** Takže začínám, jo?

**Martin:** Ano.

### Robinův tip: Yarn 2

**Robin:** Tak dobře. Můj tip je Yarn verze 2. Yarn je balíčkovací systém pro Node - pro JavaScipt. Respektive klient pro to, abyste si mohli stáhnout balíčky, pokud to neznáte. Často lidi používají NPM. A Yarn je jeho konkurence.  A brzo asi vyjde jeho druhá verze, která je revoluce. A asi se brzo dozvíme, jestli dobrá, nebo špatná. Já jsem o tom něco zjišťoval. Měl jsem o tom nedávno i krátkou prezentaci. A teď vám řeknu ty nejzajímavější novinky. A ty největší zklamání, řekněme. Nebo spíš rozčarování - to je asi lepší slovo.

Protože co je super je, že Yarn 2 je kompletně přepsaný do typescriptu. O tom jsme se bavili minule; typescript vládne, takže všichni přepisujou všechno do typescriptu. Yarn není výjimkou.

Má lepší práci s workspace. To znamená; pokud máte monorepu a máte víc balíčků, tak Yarn najednou dokáže dělat spoustu věcí, kvůli kterým jste dřív potřebovali používat třeba Learnu nebo něco podobnýho. To je super.

A pak největší, největší změna toho celýho je něco, čemu se říká plug-and-play. Což je jinej způsob, jak se ty balíčky stahujou a zpracovávají, když to tak řeknu.

Já nevím, jestli všichni pamatujete na Node Modules - což někdo připodobňuje k černý díře - prostě obrovskej adresář plnej tisíců, možná milionů souborů, kterej je obrovskej. No a Yarn 2 tohle odstraňuje, a vlastně udělá něco jinýho, což je technicky nějaký jako spousta ZIP souborů.

A proč je to zajímavý?  Mám tady nějaký projekt, který měl v Node Modules předtím 135 tisíc souborů. A pomocí Yarn 2 bude mít v - Yarn Cache se to jmenuje - dva tisíce souborů. A teď pozor, z 1,2 GB se dostaneme na 139 MB!

**Martin:** Hmm!

**Robin:** Což je super. Tak, a to jsou ty největší selling points; ty nejzajímavější věci. Ale k tomu přichází ty rozčarování.

A první rozčarování se týká těch Workspaces, jak jsme si řekli. Protože on třeba umí, jak jsem říkal, definovat omezení. Třeba aby v žádným mým balíčku se nemohlo definovat underscore. Což je super. A je to hrozně mocnej nástroj. Ale tady ty konfigurace se zapisujou pomocí jazyka Prolog. Ano, přesně tak.

**Martin:** Takže jazyk Pro… jak to bylo dále?

**Robin:** Prolog, to je logický jazyk, kterej je hrozně starej. A já bych se vsadil, že naprostá většina vývojářů, kteří pracují s JavaScriptem, buď o něm neslyšela, nebo v něm minimálně nenapsala ani řádku. Mně o něm kdysi vyprávěl taťka.

**Martin:** No právě. Proto jsem se ptal takhle okatě. Samozřejmě Prolog znám jako pojem, ale připadá mi, že to je vlastně záležitost seniorská. A to ne jenom zkušenostma, ale i věkově. Tak proč Prolog?

**Robin:** To nikdo neví. Ne, ono takhle, dobře, ono to asi dává smysl. Protože Prolog se hodí pro takovýhle druh popisování omezení. Ale je to pořád trošku zvláštní volba. Přestože teda jakoby z hlediska toho využití jazyka to jde.

Ale dobře. Tady ty omezení nemusíš definovat. Můžeš ten Yarn 2 používat bez toho. To, co je ale zajímavější, je ten plug-and-play, kterej, jak jsem říkal, jakoby de facto nahrazuje Node Modules, což je suer.

To, co je ještě trošku horší, je, že Node to neumí.

**Martin:** M-hmm.

**Robin:** To znamená; pokud já mám nějakej program napsanej v Nodu, tak on neumí … jako on hledá balíčky v Node Modules. A já potřebuju nějakým způsobem ho udělat; přepsat, nebo překonfigurovat, aby hledal jinde. A to se dělá tak, že se spouští maličko upravená verze - a teď to říkám trošku nepřesně -  ale vtip je v tom, že musím místo “node” - a název souboru, **_{05:00}_** napsat “Yarn Node (a název souboru)”, a on upraví tu Require funkci pro to, aby hledala ty věci na správným místě. Takže to trošku rozbíjí, jak to funguje. Některý věci nemusí úplně fungovat. A, což je největší průšvih, pro mě teda, je, že to naprosto nefunguje s React native. Vůbec.

**Martin:** Aha. Noo… Robine, mě teďka vystřelilo v hlavě - i když nejsem javascripťák, tak mi vystřelilo v hlavě asi tisíc otázek.

**Robin:** No?

**Martin:** Po tom, co jsi tohle řekl. Tys’ mi normálně spustil v hlavě bombu! Ale to bysme asi překročili ten limit, co máme na ty tipy. Takže nechme to třeba na nějaký zvláštní díl. To by bylo zajímavý.

**Robin:** Ještě rychle řeknu, že to není vydaný; že když si tady nainstalujete Yarn, tak si nainstalujete verzi 1. A spousta tady těch věcí zatím ještě není aktivovanejch. Uvažuje se o tom, jak budou aktivovaný. A spousta lidí říká: “pojďme to pojmenovat nějak jinak, ať se to nejmenuje Yarn 2, ale je to úplně jinej systém. A ať se neopakuje to co se stalo s Angularem.

**Martin:** Jasně. Tak to je pěkné, dobře. A jak říkám, raději se nebudu ptát, protože bysme tady mohli strávit spoustu času. Takže minimálně přiložíme odkaz na  článek, že jo, nebo na nějakou prezentaci; tvoji.

**Robin:** Něco takového.

**Martin:** Jo, super.


### Martinův tip: Notification Permission v Chrome UX Reportu

**Martin:** Dobře. Tak já navážu úplně z jiné kategorie. A to je to, že v Chrome User Experience Reportu, který už jsem tady už párkrát zmiňoval, je vlastně ohromná databáze o tom, jak uživatelé Chromu používají naše weby; která se dá používat hlavně pro těžení dat o rychlosti těch webů. Tak, je tam teď přidaná nová věc, která s tou rychlostí nesouvisí. A to jsou Notification Permission. A to znamená, že jsou to data o tom, jak uživatelé reagují na výzvu k odběru notifikací z vašich webů. Což je věc, která se nedá - nebo aspoň o tom nevím - že by se dala měřit nějak v Google Analytics, nebo v nějakých standardních analytických nástrojích. My všichni jako-uživatelé víme, že ty weby často jsou s tím otravné, a často jsou s tím otravné třeba jenom proto, že jejich majitelé, nebo markeťáci, nemají možnost si změřit, jak moc tady tohle funguje.

Tak teďka si můžu ty data o tom, kolik lidí si od nich přihlásí ty odběry, vytáhnout právě z Chrome User Experience Reportu; z té databáze.

Takže zase, nalinkujem’ článek, abysme vás inspirovali. A asi si myslím, že můžeme dál, Robine, co ty na to?

**Robin:** Já mám jenom otázku. Protože já vím, že u těch notifikací ty stránky často neukazují přímo tu systémovou hlášku, ale jakousi vlastní hlášku, kterou můžu zobrazovat i potom, co ji odmítneš opakovaně. Nevíš, z toho asi nepůjde nějak moc zohlednit to měření, co?

**Martin:** To asi ne. Myslím si, že to měření je vlastně - to měří jenom tu nativní hlášku. A myslím si, že ta vlastní hláška je přítomna i proto, že ta nativní nešla měřit. Takže v tomhle třeba je nastavený nějaký posun.

Ale odkážeme na článek. A myslím si, že můžeme jít teď k hostovi.

**Robin:** No to určitě! Rád slyším.

Ne teda fyzicky, to mám daleko. Ty taky.


### Představení Radka Pavlíčka

**Martin:** Tak dneska můžeme prozradit, že tu máme Berlín, Milíčov - teda Praha - a Brno, že jo. Protože vám rádi tady vítáme Radka Pavlíčka. Ahoj Radku!

**Radek:** Ahoj kluci, ahoj posluchači.

**Martin:** Radek je odborník na přístupnost webu. A my jsme ho v podcastu - teda já vlastně, ještě tehdy, když jsem podcast vedl sám - jsme Radka měli před dvěma a půl lety, myslím, když jsme se připravovali na naši Webexpo dvojpřednášku o přístupnosti. Tak za tu dobu se tohle téma dost posunulo, si myslím. A hlavně jsme ho tehdy vůbec nevyčerpali. Takže jsem rád, že tady Radek je. Ahoj.

**Radek:** Ahoj, děkuju za pozvání, ještě jednou.

**Martin:** Tak, Radku, my jsme vlastně v tom minulém podcastu probrali vlastně základy přístupnosti, nějaké věci ohledně motivace k tomu, proč to vlastně dělat, stránky přístupné. Dneska vlastně jsme si tady vybrali, řekněme, tři-čtyři hlavní témata. Já je možná na začátek řeknu, aby posluchači věděli, jaké zajímavé věci je čekají.

Takže chceme probrat normu WCAG. **_{10:00} _**A chceme probrat novou legislativu kolem přístupnosti - novou evropskou a českou - chceme probrat přístupnost v Single Page aplikacích, javascriptových a ještě nám pár věcí zbývá, které si necháme na konec, jako překvapení.

Tak, já možná začnu rovnou u toho WCAG. To je vlastně věc, která - řekněme… nebo takhle, Radku, proč já bych to definoval? Já se tě zeptám - co je WCAG?


### Co je WCAG?

**Radek: **WCAG je zkratka z Web Contents Accessibility Guidelines. Což přeloženo znamená vlastně doporučení pro tvorbu přístupného webového obsahu. A je to vlastně celosvětově uznávaná metodika, která se dneska dostala do nádnárodních, tak do národní legislativy. A to je, myslím, dost pádný důvod k tomu, abychom si o ní řekli trošku něco víc.

**Martin:** M-hm. WCAG je norma, která, pokud se nepletu, tak procházela nějakým verzováním? Aktuální je dva-něco WCAG, pokud se nemýlím?

**Radek:** Ano, byla verze 1.0, která tady byla poměrně dlouho. Od asi roku 99, až po rok 2008, kdy byla vydána verze 2.0. A teď máme verzi 2.1., která řeší potřeby skupin lidí, které ta dvojka úplně nepokrývala, a to jsou právě lidé slabozrací lidé s kognitivními poruchami, a uživatelé mobilních zařízení. Protože v době, kdy ten WCAG vznikal, tak mobilní zařízení ještě nebyla tak rozšířená, a nebyla tam ta potřeba to nějak řešit.

Teď se pracuje na verzi 2.2, která tu verzi bude zase nějak vylepšovat. Postupně 2.3, a už pomaličku začínají práce na verzi 3.0. Takže i ten - když to tak řeknu - trošku zrychlený vývoj, vlastně odpovídá tomu, jakým způsobem se vyvíjí web, a třeba i zařízení. A možná hlavně zařízení, z kterých dneska na web můžeme přistupovat.

**Martin:** Pokud si dobře pamatuju, tak jedna z inovací v té nové verzi je přístupnost na mobilech. A v mobilních aplikacích. Je to tak?

**Radek:** V podstatě ano. Já bych to rozdělil. Opravdu jako novou oblastí je ta přístupnost na těch mobilních zařízeních, a vůbec věci související s responzivním designem, a podobně. Protože to jsou fakt dneska věci hodně důležité. A víceméně dneska je to tak, že pokud nemáš responzivní web, tak nejsi ani schopný některé požadavky téhle normy naplnit.

A co se týká toho přesahu, nebo dopadu na mobilní aplikace, tak tam je to tak, že ta metodika je postavená dostatečně univerzálně na to, abys ji mohl aplikovat na jakýkoliv digitální obsah. To znamená; ty podle ní můžeš tvořit přístupný web; můžeš podle ní tvořit přístupnou mobilní aplikaci; můžeš podle ní tvořit přístupný dokument. Protože když to vezmeš kolem a kolem, tak v zásadě není - teď mě nechytejte úplně za slovo - ale v zásadě není úplně velký rozdíl mezi tím, když máš informace publikované ve formě třeba PDF dokumentu, anebo ve formě klasické statické webové stránky.


### Úrovně WCAG

**Martin:** V té normě WCAG se operuje s nějakými úrovněmi, které jsou označeny jedním, dvěma nebo třemi áčkami. Často se to někde vyskytuje. A myslím si, že i v tom může mít leckterý webový vývojář dost chaos. Mohl bys to vysvětlit?

**Radek:** Určitě mohl.

Jedná se vlastně o jakousi značku, která určuje vlastně míru důležitosti toho konkrétního požadavku. S tím, že áčko jsou ty opravdu nejdůležitější požadavky, a AA je potom střední úroveň, a AAA jsou potom ta úroveň nejvyšší. To znamená, pokud opravdu to chceš mít úplně “tip-ťop”, tak by ses měl snažit dosáhnout na ty tři áčka. **_{15:00}_** Nicméně sluší se říct, že ta norma současně jaksi stanovuje jakýsi ideální stav. To znamená; popisuje to, jakým způsobem by to mělo vypadat v ideálním světě. Ale protože v ideálním světě nežijeme, a dneska stále na naplnění některých těch požadavků bys musel vyvinout velké úsilí, investovat do toho spoustu peněz, spoustu zdrojů. Takže běžně i v té legislativní rovině se pracuje po tu úroveň AA. To znamená; berou se v potaz požadavky těch prvních dvou úrovní.


### WCAG jako součást české legislativy

**Martin:** Mně to zaujalo v tom, že ty jsi říkal, že zároveň ta norma, jakože WCAG je součástí nějaký legislativy. A tam se pak bavíme o tom jednom nebo dvou áčkách. Říkám to dobře?

**Radek:** O těch dvou áčkách. Ano. Ta legislativa je postavena na soulad s těmi dvěma áčky.

**Robin:** To je vlastně trošku zajímavý. Protože WCAG, pokud se nemýlím, je standard W3C. Teď tedy přeskakuji mezi anglickou a českou výslovností zkratek, ale to je asi jedno.

Ale je to součástí našeho právního řádu. Což, pokud vím, neplatí třeba pro HTML nebo nějaký další věci. Proč si zrovna stát vybral tuhle iniciativu pro základ tadytý legislativy?

**Radek:** Rozumím. Já si myslím, že důvodů tam bylo několik. A ten první bylo sjednocení té roztříštěnosti, která tady v té oblasti do té doby vládla. Že vlastně byly země, které adoptovaly WCAG už dávno předtím, než se tak stalo u nás. Ale současně byly země, které si vytvořily vlastní pravidla. Ať jsme to byli my, ať to bylo třeba Slovensko; a pak vlastně bylo strašně těžké se s kýmkoliv tady o tom tématu bavit, protože jsme si vlastně nemuseli rozumět; že jsme se každý odkazovali na jiná pravidla, jiná doporučení. Ty požadavky byly třeba jinak číslované; měly jinak stanovenou důležitost, ap odobně. Takže za mě třeba to, že se tady v té legislativě rozhodlo vzít ten WCAG tak, jak je, a za ty legislativně důležité prohlásit první dvě úrovně, a s nimi potom dál pracovat, tak mi to přijde skvělé v tom, že se vlastně všechno strašně zjednodušilo. Že dneska vlastně stejnou legislativu mají nastaveny všechny země EU. Stejnou legislativu máš třeba ve Spojených státech, a podobně. Takže je to něco jako souměřitelné. A současně je tam velká výhoda v tom, že kolem toho WCAGu díky tomu, jakou dobu už tady je, tak existuje ohromný ekosystém - teď použiju… mezitím mě napadlo české slovo “znalostní báze” - to, že tady máš spoustu různých online, offline školení, které se o ten WCAG opírají; je tady spousta tutoriálů, spousta materiálů, spousta třeba nástrojů pro testování vychází právě z WCAGu.

Takže já si myslím, že to tu situaci velkou měrou zjednodušilo. Protože už si vlastně lépe rozumíme s těmi kolegy okolo; můžeme použít nástroje, které je potřeba pro testování, které vyvinul někdo jiný. A ten nástroj, který je z Holandska, z Ameriky, nebo odkudkoliv, tak vlastně můžeš použít bez jakýchkoliv úprav pro české prostředí, a může o to fungovat.

**Robin:** To mi dává velký smysl, když to takhle slyším. Díky.

**Martin:** To znamená, abysme se vrátili k té Robinově otázce, tak WCAG je vlastně norma, která se týká přístupnosti. Nebo možná, řekněme, inkluzivního designu. A tou normou zajišťuju, že weby, aplikace, dokumenty, jsou dostupné širší skupině lidí. Což vlastně HTML nezajišťuje, automaticky. Takže proto se v té legislativě nezohledňují technické normy jako HTML CSS, ale zohledňuje se tahle norma.

Asi, že jo?

**Radek:** Jo. Tak tady vlastně ta legislativa míří přímo na  přístupnost. A myslím si, že je vlastně i tady spojený s tím – s těmi normami kolem HTML **_{20:00}_** a podobně – jako provázána. Jako celá řada věcí z hlediska přístupnosti se týká právě kódu, a právě požadavky na správné strukturování a správnou sémantiku, a podobně... jako WCAG je jimi opravdu protkán odshora až dolů. A dost často právě míří jako k elementům z HTML5, a podobně.

Takže byť ne explicitně, tak aspoň takhle zprostředkovaně, se tam vlastně do té legislativy dostaly i ty další normy, protože WCAG se na ně odkazuje. 

**Robin:** To znamená; ty jsi říkal, že ta legislativa zohledňuje... nebo, nakazuje dodržovat úroveň těch dvou áček?

**Radek:** Ano.

**Martin:** To znamená; já když to vezmu do nějakého konkrétního příkladu, tak já jsem si tady dohledal svůj text o kontrastu barev na webu. Tak musím sám sebe pochválit, protože tam mám takový pěkný obrázek, na který jsem zapomněl mezi tím. Ale ta úroveň kontrastního poměru pro AAA je 7:1, podle WCAG. A pro AA je 4,5:1. Pak je jedno áčko, což je tři ku jedné, pokud se nepletu?

**Radek:** Ne, jedno áčko není. Kontrast je až v AA, a tam se to potom liší podle velikosti fontu.

**Martin:** Tak, a typu fontu, že jo, záleží na hodně aspektech.

**Radek:** Velikosti a typu, ano.

**Martin:** To znamená; pokud bych chtěl vlastně dodržet dvě áčka, když nemám možnost dodržet tři, tak vlastně splňuju tu legislativu.

**Radek:** Přesně tak. Ano.

**Martin:** Tak. A teď se pojďme bavit o tom, koho se to týká. Určitě nás sledují teď lidi, kteří vlastně o přístupnosti toho moc neví. Budou překvapeni, že existuje nějaká legislativa – ta je vlastně zhruba rok stará, Radku, v Česku?

**Radek:** Ano, necelý rok, deset měsíců, zhruba, ten Zákon o přístupnosti máme na to už. Dřív jsme měli vyhlášku, a teď na to máme celý zákon. Ten vešel v platnost vloni v dubnu, konkrétně 9. dubna 2019.


### Kterých webů se zákon týká?

**Martin:** A znamená to teda, že když vytvořím web v Česku, tak  musí splňovat tyhle požadavky? Nebo jak to vlastně je, koho se to týká?

**Radek:** No, ne úplně. Bylo by to krásné...

**Martin:** To by bylo!

**Radek:** Ale samozřejmě tak ideální to není. Ten zákon nově definuje takzvané povinné subjekty; subjekty, které jsou v působnosti toho zákona. A tohle je zrovna to, na co se ptáš; je to jeden z takových trošku slabších míst toho zákona. Protože samozřejmě toto je definováno právnickou mluvou. A rozklíčovat to, jestli jsi nebo nejsi pod zákonem – nebo ten web, který tvoříš -  není úplně snadné. Takže je tady pokus – nebo je tady snaha – snaha i ze strany Ministerstva vnitra, které tady tu přístupnost má v gesci, a myslím si, že docela se tady o to stará – tak udělat jakýsi taxativní výčet, nebo aspoň nějaký návod, kterého se můžeš držet v případě, kdy chceš vědět, jestli spadáš nebo nespadáš pod zákon.

Takže když to jenom trošku shrnu, takový nástřel, tak sem spadají všechny organizační složky státu jako jsou ministerstva, správní úřady, soudy, státní zastupitelství, kancelář prezidenta republiky, úřad vlády, kancelář poslanecké sněmovny, senátu, Akademie věd, a tak dál.

Pak sem samozřejmě spadají taky územní správní celky, jako jsou kraje, obce, městské části, dobrovolné svazky obcí. Potom sem spadají právnické osoby zřízené zákonem, takže třeba ČTK, Česká národní banka, Státní fond dopravní infrastruktury, Státní fond rozvoje bydlení, a mnohé další veřejnoprávní právnické osoby tohoto typu.

Potom sem spadají právnické osoby založené nebo řízené nebo financované státem, územně správním celkem nebo právnickou osobou zřízenou zákonem, která byla  založena za účelem uspokojování potřeb veřejného zájmu, které nemají průmyslovou nebo obchodní povahu.

**Martin:** Aha, tak teďka jsem se ztratil.

**Radek:** Já jsem tohle udělal schválně, abyste si udělali představu o tom, jak je to napsáno. A právě z tohohle rozklíčuj, **_{25:00} _**jestli ten daný subjekt tam patří, nebo ne.

**Robin:** Teď vůbec nevím, kam patří Vzhůru dolů, hele. Popravě.

Dobře. Já budu konkrétnější. Ano, dohovoř, Radku.

**Radek:** Jestli to můžu dokončit, takže sem spadají třeba dopravní podniky měst, příspěvkové organizace státu, veřejné výzkumné instituce, a pak sem ještě spadají kvalifikovaní správci systémů elektronické identifikace, jako správa základních registrů, a podobně.

Jako tady z toho výčtu je asi jasné, že jednoduše říct „ty jsi pod zákonem a ty nejsi pod zákonem“, není úplně triviální.

A abychom to teda neměli úplně jednoduché, tak ještě se tady z působnosti toho zákona vyjmuly částečně, částečně se z toho vyjmuly školy, školská zařízení a vysoké školy, kdy vlastně ten požadavek se netýká přístupnosti toho, co školy publikují jako celku, ale školy jsou povinny zpřístupnit jenom informace související s výkonem veřejné správy.

To znamená třeba výsledky přijímacích řízení, a podobně. Tady se bohužel nepodařilo v tom připomínkovém řízení prosadit požadavek právě na plnou přístupnost. Protože dneska máš nejrůznější online žákovské, třídní knihy, a podobně. Takže u těch škol je to zúženo jenom na ty informace, které souvisí s tím výkonem...

**Martin:** Ještě z těch podkladů, cos‘ poslal, Radku, tady vlastně do stejné kategorie, jako školy, jsou zařazené Česká televize a Český rozhlas. Což mě překvapilo, stejně jako u těch škol, že vlastně tu povinnost nemají, pokud to dobře chápu.

**Radek:** Nemají. Tam se to pochopitelně potom dá hrát na jinou strunu. Třeba jako toho, že se jedná o veřejnoprávní média a neměla by diskriminovat uživatele na základě zdravotního postižení, a podobně.

**Martin:** Právě.

**Radek:** Ale zrovna konkrétně jak v případě České televize, tak Českého rozhlasu, tak moje zkušenost je, že oba ty subjekty si uvědomují význam té přístupnosti a toho, že by měly být přístupné přesto, že  jim to zákon úplně striktně nenakazuje. Takže se snaží vlastně jak rozhlas, tak televize, minimálně třeba ty služby, které vznikají teďka nově, tak už právě tvořit s ohledem na přístupnost – nevím zas, kolik toho kvůli nějakým endéáčkům můžu či nemůžu prozrazovat – ale jako děje se to. A myslím si, že to je dobře, že se to děje.


### Jak dodržet WCAG v praxi?

**Robin:** Já bych možná do toho vstoupil. Protože já jsem teď překvapenej tím množstvím těch subjektů, který spadají pod zákon, a který to musí mít podle tý normy.  A možná mě to z praktickýho hlediska zajímá: kolik práce je, oproti, dejme tomu, co dneska dělají lidi běžně, kolik práce je udělat stránky, který jsou kompatibilní s tím WCAG; dvě áčka, třeba?

**Radek:** No, na to neumím jednoduše odpovědět. Protože tam hraje roli strašná spousta faktorů. Zkusím je tak nějak nadhodit; když tak si to pak sestříhej.

V zásadě znamená ... jde třeba už o to, o jakou stránku se jedná. Jinak se ti bude zpřístupňovat nějaký jednoduchý – v uvozovkách jednoduchý prezentační web. A mnohem víc se pak  nadřeš, když budeš zpřístupňovat nějakou aplikaci. Jo, už to mi přijde, že jsou dvě úplně jiné disciplíny, kdy v případě prezentačního webu si myslím, že fakt hodně stačí – nebo je dostačující to, když dobrou  práci odvede kodér, A někdo potom pohlídá ty redaktory, kteří tam vkládají ten obsah, aby dbali a aspoň na elementární pravidla, typu, že doplňují alternativní textové popisky, a podobně.

Jiné to může být potom když děláš nějakou třeba webovou nebo mobilní aplikaci.

A tam můžeš řešit třeba programové schéma, jak zpřístupnit; zpřístupnění přehrávače; můžeš si třeba do nějaké fronty řadit skladby nebo videa, která  si třeba budeš časem chtít pouštět, a podobně. Takže tam už je to úplně jiná disciplína.

Pak samozřejmě taky záleží na tom, kdy se do toho zpřístupňování pustíš. **_{30:00}_**

Pokud  už máš aplikaci hotovou, teďka se přijde na to, že ta aplikace není přístupná;  ty bys ji chtěl mít přístupnou, tak asi se shodneme na tom, že toto  je ten nejhorší možný stav. Protože do nějakých takových úprav se většinou nikomu moc nechce, že jo.

**Martin:** Zpětně zapnout přístupnost, zpětně zapnout rychlost webu. To známe.

**Radek:** To asi znáte i z vlastní praxe, že tohle je potom strašně těžké, nákladné, většinou se s tím ani nepočítá v rozpočtu, a podobně. Naopak když už na to jako myslíš a víš, že – nevím – chceš třeba, to už  tady asi můžu hodit do placu, protože to už se řešilo dřív, a už jsme se tím všude veřejně chlubili. Když chceš třeba mít přístupný já nevím... iRozhlas.cz, webový portál Českého rozhlasu, a už na to myslíš od začátku, tak si myslím – teď doufám, že mě Superkodéři pak nebudou mi to pak vyvracet; že to nebyla úplně pravda. Ale myslím si, že už té práce s tím nemusí být až tolik. Protože už ty věci zapracováváš přímo do toho výsledku, nebo do produktu, který děláš.

A to mnohdy ani nebereš, jako že to je víc práce. Jako to, že děláš třeba nějakou rozumnou nadpisovou strukturu toho dokumentu, tak to asi slušný kodér dělá tak jako tak.

To, že používáš korektní elementy, tak to asi taky děláš, jako víceméně přirozeně.

A to jsou všechno věci, které se na té přístupnosti podepisují. Takže když jsme potom třeba ladili ten iRozhlas, tak to v podstatě obnášelo to gros práce, toho nějakého připomínkování; tak byl - nevím, zhruba šestihodinový workshop, kdy jsme si jako sedli, poladilo se na místě to, co na místě poladit šlo. Pak tam byly možná nějaké dodělávky.

A výsledek, si myslím, že je pořád na velmi slušné úrovni, a dávám ho na svých školeních i různě za vzor. Takže opravdu myslím, že i toto hraje velkou roli.

**Martin:** Supr.

Já bych to teďka posunul do takové jako praktické roviny; když nás poslouchá někdo, kdo si řekne „hele, tak já bych to třeba na příštím projektu chtěl mít podle WCAG; dvou áček, alespoň“. A teď – kde ten člověk má začít? Třeba vezměme, že někdo tu normu nezná, já teda ji taky nemám celou přečtenou, se přiznám.

Ale kde ten člověk má začít? Existuje třeba nějaký nástroj, který to jednoduše analyzuje? Nebo je potřeba používat sadu více nástrojů a je to složitější? Můžeš navést na nějaké takové zdroje?

**Radek:** Můžu. Jako určitě bych nezačínal tím, že si budu číst normu. Norma je věc technická, nezáživná, psaná složitým jazykem, a asi to není jako to, co by sis vzal a otevřel by sis večer před spaním a tak si jako zalistoval, z plezíru normou.

**Martin:** Jenom v případě, že bys chtěl rychle usnout, že jo?

**Radek:** Ano.

Nalistoval si ze tří čtyři kritéria přístupnosti, a ty si nastudoval. To se asi normálně neděje.


### Accessibility Insights for Web

Co se týká těch nástrojů, tak existuje jich celá řada. Mně se teď velmi osvědčil nástroj jménem Accessibility Insights for Web. A je to vlastně produkt Microsoftu, který funguje jako rozšíření pro Chrome. A ten umožňuje; má v sobě takové dvě klíčové funkce. Jedna se jmenuje FastPass – to je sada online testů, automatických testů, která ti projede ten web, a dá ti zpětnou vazbu, kde v tom kódu jsou přímo chyby. A je to provázáno právě na ten WCAG, nebo jsou tam informace k jednotlivým problémům. A ty si takhle poměrně snadno můžeš zjistit, co je na tvých stránkách případně špatně, **_{35:00}_** a co by stálo za opravu.

A ten druhý nástroj, nebo funkce, se jmenuje Assessment. A je to sada asi 24 oblastí nebo seznam 24 oblastí, který je pojatý lidštěji, řekněme, oproti tomu WCAGu, ale současně s tím WCAGem provázaný. A ty si můžeš – když si to potom projdeš – můžeš si ověřit, jestli máš třeba rozhraní dobře přístupné z klávesnice. Jestli ti na něm dobře funguje Focus v tom slova smyslu, že je vidět aktivní prvek, a současně třeba – když se ti otevře nějaké modální okno, tak že to okno získá Focus, a podobně.

A takhle je to vlastně seřazeno. Je to interaktivní, ty si tam přímo můžeš na tom zaškrtávat; eventuálně je to provázáno s těmi automatickými testy, takže když ti to třeba některým tím automatickým testem projde, tak se to propíše vlastně i tady do té části pro to testování. A tohle mi momentálně přijde asi jako nejpoužitelnější nástroj na to, pokud bych si chtěl otestovat přístupnost nějakého webového rozhraní.

**Martin:** Skvělý. A hnedka jsem si tady vyzkoušel, mezi tím, co jsi mluvil, pár webů.

**Robin: **Taky jsem si zkoušel.

**Martin:** A teda jako zapůsobilo to na mě. Ukazuje to interaktivně přímo ve stránce, takže  to asi jenom můžeme poslat dál, tohle doporučení.

Povídej, Robine.

**Robin:** Asi myslím, že tohle asi státní organizaci nebude stačit; že se to projede nějakým nástrojem. Existuje nějaká certifikace? Nebo může ta organizace vůbec prokázat, že tohle splňuje?

**Radek:** No, je to hodně postavené právě na tom... teďka je to hodně postavené na důvěře.

Každá ta stránka by měla mít takzvané prohlášení o přístupnosti. A v něm bys měl deklarovat míru přístupnosti té dané webové stránky.

Ale momentálně tady není žádná, řekněme autorita, nebo žádná... něco, co by tomu dávalo tu... řeknu „správnou váhu“ v tom slova smyslu, že to bude víc, než to, co si tam kdo napíše, když to řeknu trošku lidově.

Takže je tady jednak nastavený mechanismus takový, že Ministerstvo vnitra teď od začátku ledna provádí namátkové kontroly webů, které spadají pod zákon. A v případě nalezení pochybení dává provozovatelům zpětnou vazbu, a ti mají potom půl roku na to, ten nedostatek napravit.

A co se týká té certifikace, tak ona existuje. A je to vlastně jedna z věcí, kterou bych chtěl, kdyby se právě v souvislosti s tím WCAGem a s tím – řekněme znormováním požadavků, kdyby se podařilo přivést tady do České republiky.


### Přístupnost SPA aplikací

**Martin:** To je supr.

A možná pojďme se posunout k dalšímu tématu. Přišel nám parádní dotaz od Jitky Jandové, děkujeme. Na přístupnost SPA aplikací. To znamená, aplikací, které využívají k vytvoření domů – nikoliv HTML v kombinaci v JavaScriptem, ale většinou jenom JavaScript. A bez přítomnosti HTML. Tak já možná ten dotaz zkusím upřesnit. Jestli je možné, aby takové aplikace byly přístupné?

**Radek:** Já myslím, že možné to je. Pokud se samozřejmě dodrží ta pravidla, která klade třeba i ten WCAG. Protože jak už psal Martin Hassman na Zdrojáku někdy v roce 2008, jestli se nepletu – ten článek se jmenoval nějak „Tak nám zpřístupnili JavaScript“. A vlastně byl o tom, že – když zjednoduším – že to, že něco je dneska v JavaScriptu, tak přístupnosti nemusí vadit. Protože spousta věcí už se v JavaScriptu dělá; asistivní technologie, to znamená všechny ty zvětšovací technologie, čtečky obrazovek, **_{40:00}_** a podobně – už s ní umí pracovat. Takže není důvod, aby něco takového nemohlo fungovat.

V podstatě to, na co by si měli tvůrci těch single page aplikací dát asi největší pozor, tak je to, aby o těch změnách, které v aplikaci probíhají, tak aby vždycky dávaly vhodným způsobem vědět tomu klientovi tak, aby ten, když používá nějaký odečítač obrazovky, tak aby ten odečítač obrazovky věděl, že se někde zobrazilo nějaké okno; že se někde zobrazila nějaká část stránky; že někde něco přibylo nebo ubylo, a podobně.

K tomuto existuje doporučení, které se jmenuje „yARIA“ – ta Aria je právě zkratka z Accessible Rich Internet Applications. A tohle doporučení vlastně nabízí sadu nástrojů, které se dají použít přesně k tomu, co jsem říkal. To znamená že ty toho uživatele právě upozorníš na to, když někde vyskočí nějaká chybová hláška, nebo když se někde přepíše nějaký obsah, a podobně. Takže tohle je vlastně taková první kritická věc, kterou je potřeba ohlídat.

Dalším důležitým aspektem je, aby to rozhraní jako takové bylo přístupné a ovladatelné z klávesnice. To znamená, aby ty prvky toho – na všechny prvky toho obsahu se dalo dostat z klávesnice a daly se odbavit. Potom samozřejmě platí všechny ty požadavky, které platí i pro ty prezentační weby. To znamená; dostatečný kontrast, čitelné písmo, a tak dál, a tak dál. A potom samozřejmě korektní struktura; to znamená, aby tam byla korektní nadpisová osnova, definování rolí tak, aby ten uživatel věděl, že teď se pohybuje v hlavní oblasti; teďka tady má nějaké meníčko třeba; teďka je tady zápatí, a podobně. Takže v podstatě se ty požadavky nijak zásadně neliší od toho, co chceme i po třeba těch prezentačních webech. 


### International Association of Acessibility Professionals

**Martin:** Tak, myslím si, že jsme vyčerpávajícím způsobem odpověděli na tu otázku. Pojďme ještě, Radku, na úplně poslední téma, které jsi chtěl s námi otevřít ty sám. A které nás zaujalo.

Ty jsi tam chtěl říct něco o nějaké asociaci, Radku. A chtěl jsi možná pozvat naše posluchače k účasti. Tak, mohl bys to sám, o tom něco říct, o té asociaci?

**Radek:** Určitě. Děkuju za tu možnost. Souvisí to vlastně už s tím, na co jste se ptali už před chvílí; to znamená nějaká ta certifikace; ta, řekněme, sbírání “odznáčků”, když to řeknu tak - sbírání odznáčků za přístupnost.

A existuje tady už šestým rokem Mezinárodní asociace profesionálů, kteří se věnují právě tematice přístupnosti. Anglicky International Association of Acessibility Professionals; zkratka je IAAP. A je to vlastně asociace, která jednak řeší vzdělávání a následnou certifikaci lidí, kteří složí odpovídající zkoušky. A jednak se snaží tady o jakési obecné zvyšování povědomí o tématice přístupnosti; pořádání akcí, a vlastně o to, aby ti, které to téma zajímá, aby měli k sobě blíž, a aby současně třeba i nějakým způsobem dali navenek vědět, že jim tady to téma není lhostejné.

No, a já bych právě rád tady, pokud se to samozřejmě povede, a to se mi nemůže povést samotnému, tak bych chtěl právě založit, nejspíš československou pobočku tady té Asociace u nás. Protože by mi to dalo smysl - nebo dávalo smysl - jednak z hlediska právě zvyšování povědomí o přístupnosti; jednak se tam nabízí třeba i nějaké vzdělávání; nabízí se tam možnost třeba právě té certifikace, a podobně. Samozřejmě jsou s tím spojené i nějaké poplatky, které se platí, ať už v případě toho individuálního, nebo firemního členství. Takže není to jakoby úplně zadarmo. **_{45:00}_** Ale myslím si, že se to potom těm, co do toho investují, tak se to může právě vrátit. Třeba v tom, že ve chvíli, kdy se tohle dostane do obecného povědomí, tak třeba stran toho testování přístupnosti, nebo nějakého vzdělávání, a podobně, to potom může zvýšit kredibilitu toho člověka, který něco takového bude nabízet. Protože daný subjekt, který si bude chtít nechat proškolit své zaměstnance, tak spíš sáhne po člověku, který bude moct nějakým způsobem doložit, že má tady v té oblasti dostatečné kompetence; než když si to někdo řekne jenom tak “tak já teď začnu podnikat v oblasti přístupnosti”.

**Martin:** Takže to může být zajímavé pro jednotlivce, kteří se více věnují přístupnosti, a řekneme firmy střední/větší, které třeba v tomhle něco aktivně dělají. A chtějí třeba sdílet zkušenosti s ostatními. Klasický.

**Radek:** Přesně tak.

**Martin:** Klasická asociace, profesní.

**Radek:** Přesně tak. Sdílet znalosti. A vlastně i tím členstvím dát najevo, že se tady k této tématice nějakým způsobem hlásí.

**Martin:** Tak to si myslím, že je užitečná věc pro ty dotčené, kteří se toho účastní; a taky pro celý ten obor. Protože každá asociace určitě je dobrá v tom posouvání těch znalostí dopředu. Takže v případě zájmu, Radku, kontaktovat, předpokládám tebe, zatím.

**Radek:** Určitě.

**Martin:** Tak určitě všechny zveme. 

Já myslím, že jsme vyčerpali otázky, témata. Robine, co ty na to?

**Robin: **Kompletně, úplně.

**Martin:** Kompletně, ano. Takže už to jenom asi ukončíme. Takže vám děkujeme všem za pozornost. Ale úplně nejvíc děkujeme Radkovi za to, že přijal naše pozvání a že nám řekl zajímavé věci kolem přístupnosti. Tak, Radku, děkujeme.

**Robin:** Děkujeme.

**Radek:** Já děkuju vám. Děkuju posluchačům za zájem, a budu rád, když se nám bude společně dařit to téma posouvat zase trošku dál. 

**Martin:** Tak, jsme na tom stejně. Takže děkujeme všem, kteří nás poslouchali. Těšíme se na slyšenou u dalších epizod podcastu Vzhůru dolů.cz. Od mikrofonu se loučí Martin Michálek a…

**Robin:** Robin Pokorný. Ahoj.

**Martin:** Ahoj.

 