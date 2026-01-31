---
postID: 38
postTitle: 'Design webů v prohlížeči'
postUrlId: design-v-prohlizeci
postDateTime: '2015-09-21 00:00:00'
excerpt: 'V posledních letech jsem opustil standardní postupy s wireframy a Photoshopem. Vystačím si s papírem, tužkou a prohlížečem.'
postStatus: Published
authorID: 1
sectionID: 1
og_title: 'Design webů v prohlížeči'
og_description: 'V posledních letech jsem opustil standardní postupy s wireframy a Photoshopem. Vystačím si s papírem, tužkou a prohlížečem.'
og_type: article
tags: ['responzivni-design']
---
# Design webů v prohlížeči

*Textová verze [přednášky pro WebExpo 2015](http://www.vzhurudolu.cz/prednaska/design-webu-v-prohlizeci-149 "").*

Pojďme si ukázat proces návrhu rozhraní webu při responzivním redesignu eshopu VašeČočky.cz. V posledních letech jsem opustil standardní postupy s wireframy a Photoshopem. Vystačím si s papírem, tužkou a prohlížečem.

Nejdříve ale rychlý výlet do historie. Před 10 lety jsme to ve webdesignu měli krásně jednotné:

![grafika, nabídka, frontendista, programátor, spuštění](/assets/img/content/dest/webexpo-2015/webexpo-2015-for-blog.002.webp)

1. **Napsala se analýza.**
Tedy pardon, analýzy nikdo nepsal. Udělala se rovnou nabídka.  Když tam byla analýza, pak nějaká takováto – „cílová skupina webu jsou muži a ženy mezi 18 a 70 lety".
2. **Ve Photoshopu se navrhla grafika. **
Klient ji pak schválil nebo se s klientem iterovalo až do kompromisního výsledku. Nebo neskutečné slátaniny. 
3. **Grafika se převáděla do HTML a CSS.**
Nikdo nechápal, k čemu je frontendista dobrý. „Vždyť už to nakreslil grafik" říkali klienti.
4. **Šablony se programovaly.**
Programátor si nasadil sluchátka a 3 měsíce programoval. Sluchátka si sundal a ukázal výsledek. Všichni se zhrozili, udělal úplně něco jiného.
5. **Web se spustil.**
Oproti odhadům z analýzy – ach pardon nabídky! – trvala výroba webu třikrát déle. Ten poslední s nadějí, že to dopadne dobře, to tady vzdal.

Ano, tenhle proces je z pekla. Říkává se mu vodopád.

![vodopád](/assets/img/content/dest/webexpo-2015/webexpo-2015-for-blog.003.webp)

Jenže z vyšší úrovně na nižší tam nepadá voda, ale problémy. Proto mu – s dovolením – budu říkat průseropád.

Jenže průseropád není nejhorší varianta. I dnes se najdou i tací, kterým běžný tok průserů nestačí. Děsivý proces je možné ještě vylepšit jednou věcí – grafiku uděláte ještě před nabídkou. PSD prostě přiložíte k rozpočtu a děj se vůle Boží:

![spojení grafiky a nabídky](/assets/img/content/dest/webexpo-2015/webexpo-2015-for-blog.004.webp)

Jenže… děje se obvykle vůle Satana. Pojďme tomu říkat:

![niagarský průseropád](/assets/img/content/dest/webexpo-2015/webexpo-2015-for-blog.005.webp)

Hrůzostrašné je, že takovým způsobem vzniká mnoho webů i dnes.

A tak jsme si v branži vymysleli lepší proces:

![analýza, ux, grafika, frontendista, programátor, spuštění, vyhodnocení a návrat zpět na analýzu](/assets/img/content/dest/webexpo-2015/webexpo-2015-for-blog.006.webp)

Na začátku je analýza a uživatelský průzkum. Na to navazuje tvorba wireframů a až na ně navazuje grafika. Zbytek procesu zůstal podobný. Obohatili jsme jej ještě o vyhodnocení a po něm opět návrat na začátek další iterace. Vypadá docela dobře, že? 

Já se tady dneska budu zaměřovat na část návrhu a realizace uživatelského rozhraní:

![ux, grafika, frontendista](/assets/img/content/dest/webexpo-2015/webexpo-2015-for-blog.007.webp)

Jeho problémem je, že s prohlížečem a reálným zařízením – skutečným prostředím pro svůj běh – se návrh potká až pod rukama frontendisty. 

![ux, grafika, frontendista](/assets/img/content/dest/webexpo-2015/webexpo-2015-for-blog.008.webp)

Obvykle až v prohlížeči se vynoří řada problémů souvisejících hlavně s responzivním designem nebo třeba rychlostí načítání, které designér ani grafik vidět nemohl. Používají totiž statické nástroje, které webová prostředí maximálně napodobují. 

Špatné je, že na vyřešení těchto problémů už pak není čas. Proto je zlé, že s prohlížečem se rozhraní potká takhle pozdě. V některých případech tento proces produkuje nekvalitní výsledky, v jiných zase zbytečně žere čas a peníze.

Chci mít web v prohlížeči co nejdříve. 

Takže spojím designovací a kódovací fázi do jedné – designování v prohlížeči:

![spojení ux a frontendisty](/assets/img/content/dest/webexpo-2015/webexpo-2015-for-blog.009.webp)

Na [WebExpo přednášce](http://webexpo.cz/praha2015/prednaska/designovani-webu-v-prohlizeci/) jsem používal spojení UX+frontendista, to je ale nepřesné. UX a tedy kontakt s uživateli a práci s daty obstarával kolega, já bych si v tomto kontextu měl říkat designér uživatelského rozhraní (UI).

Jako designér nepoužívám Axure, Photoshop ani jiné wireframovací nástroje. Mým hlavním nástrojem je tužka, papír a prohlížeč. 

Můj proces návrhu rozhraní vypadá takto:

![](/assets/img/content/dest/webexpo-2015/webexpo-2015-for-blog.010.webp)

1. Tvořím **obsah a jeho strukturu**.
2. V prohlížeči pak nad strukturovaným obsahem iteruji a dělám **lineární design**, tzn. vizuální hierarchii, typografii a základy grafiky.
3. Složitější komponenty uživatelského rozhraní pak **skicuji tužkou na papíře**.
4. Nejlepší varianty skic potom **nakóduji a testuji v prohlížeči**. 

Všechny fáze procházejí vlastními iteracemi. Nejde o nenávratný průseropádový proces.

Nechci být teoretický, takže si to pojďme všechno ukázat na příkladu zatím nespuštěného redesignu [VašeČočky.cz](http://www.vasecocky.cz/) – velkého eshopu s čočkami, který má mnoho poboček po Evropě – na kterém jsem tenhle pracovní postup aplikoval.

![Vaše čočky .cz](/assets/img/content/dest/webexpo-2015/webexpo-2015-for-blog.011.webp)

Pokud jste alespoň trochu krátkozrací, tomu webu jste se asi nedokázali vyhnout.

![](/assets/img/content/dest/webexpo-2015/webexpo-2015-for-blog.012.webp)

## Revize obsahu a jeho struktury na základě průzkumu

V prvé fázi jsme na základě dat z Analytics, AB testů a klientovy vlastní analytiky přehodnocovali obsah a jeho strukturu. Brali jsme potaz potřebu jeho redukce kvůli mobilům. 

![](/assets/img/content/dest/webexpo-2015/webexpo-2015-for-blog.014.webp)

Zvažovali jsme také, do jaké míry je dobré měnit už existující design. 

Interně mám pro tohle rozhodování zavedenou „Chegeva–konzerva stupnici". Vlevo Chegevara a reprezentující radikální změny designu, vlevo konzerva zastupující pravý opak.

![](/assets/img/content/dest/webexpo-2015/webexpo-2015-for-blog.015.webp)

Během redesignu VašeČočky.cz jsme byli konzervativní. Pokud to nebylo kvůli mobilům nutné, nechtěli jsme zásadní části informační architektury webu měnit. Web už běží a je velmi úspěšný. Měnili jsme to nejnutnější.

V další fázi jsme si definovali strukturu a prioritizaci obsahu a v rámci jednotlivých komponent a stránek:

![Google Docs s diskuzí o struktuře obsahu](/assets/img/content/dest/webexpo-2015/webexpo-2015-for-blog.017.webp)

Tohle se dá a má dělat nějak jednoduše a před začátkem jakékoliv kreslení. My jsme použili strukturovaný Google dokument a pro diskuze použili komentáře v něm. Někdo tomu říká [Content Priority Guide](http://seesparkbox.com/foundry/content_priority_guide), my se bavili o „obsahové struktuře webu".

A už tady jsme aktuální stav práce převedli do prohlížeče. Stačí [Bootstrap](http://www.vzhurudolu.cz/blog/11-bootstrap-pomuze) a chvilka v HTML:

![Strukturované zobrazení v prohlížeči s reálným obsahem](/assets/img/content/dest/webexpo-2015/webexpo-2015-for-blog.019.webp)

Ták! Už v tuhle chvíli máme reálný výsledek práce, na který můžeme koukat na různých prohlížečích a zařízeních. K čemu by nám to mohlo být dobré? Jen čtěte dál.

## Lineární design


Tenhle pohled na obsah nám řekne, jestli je obsah a jeho hierarchie v pořádku. 

Často tady budu mluvit o ověřování hypotézy v prohlížeči. Prohlížeč ověřuje hypotézy, které vytváříme v ne-webovém prostředí – Photoshopu, Axure nebo v tomto případě Google dokumentech.

![Strukturované zobrazení v prohlížeči s reálným obsahem](/assets/img/content/dest/webexpo-2015/webexpo-2015-for-blog.019.webp)

Vidíme tam hned spoustu problémů. Vezměme alespoň tři z nich:

![](/assets/img/content/dest/webexpo-2015/webexpo-2015-for-blog.020.webp)

1. **Některé prvky jsou moc dlouhé.** 
Třeba hlavička webu, když ji zobrazíte strukturovaně. Že vypadá ošklivě nikoho nepřekvapí. Tyhle typy prvků jsou UI komponenty, které vyžadují speciální péči. Ještě se k nim dostaneme. 
2. **Pořadí prvků na stránce není dobře vymyšlené.**
V případě VašeČočky.cz se podívejme na text k produktu. Standardně u eshopů bývá tady. My ale z uživatelských průzkumů věděli, že tahle část zákazníky příliš nezajímá. Důležitější je třeba snadné přidání do košíku nebo motivace proč koupit zrovna na VašeČočky.cz.
3. **Celková délka stránky je neúměrná.**
Na obrázku to nevidíme, ale při testování na reálném smartphonu člověku připadá, že stránka je až moc dlouhá. S tím musíme něco udělat. 

Po několika iteracích tedy máme tuhle verzi:

![Nové lineární zobrazení v prohlížeči](/assets/img/content/dest/webexpo-2015/webexpo-2015-for-blog.022.webp)

1. **UI komponenty jsou nahrazené šedivou plochou.**
Máme je označené jako úkol na později, a díky placeholderu se můžeme soustředit na celkovou strukturu dokumentu a obsah stránky. Placeholder má odhadovanou výšku budoucí komponenty.
2. **Změnili jsme pořadí prvků na stránce.**
Text produktu se přesunul až za přidání do košíku a motivující uživatelská hodnocení. Ty jsou pro naše hlavní cílové skupiny daleko důležitější.
3. **Upravili jsme celkovou délku stránky.**
Méně důležité informace jsme schovali do rozklikávací komponenty. Týká se  parametrů zboží nebo dotazů. Prohlížet si stránku na mobilu je díky tomu daleko příjemnější.

## Mobile First

Všimněte si, že se zatím bavíme jen o mobilním pohledu na obsah. Ano, přesně takhle ale vybublají problémy obsahu a jeho hierarchie nejlépe. 

Problémy v této fázi řešíme ve prospěch mobilních zařízení. V sekci s parametry a dotazy ke zboží například nepoužíváme záložky, které jsou překážkou nejpřirozenějšího lineárního pohybu (mobilního) uživatele dokumentem zeshora dolů:

![Mobile First](/assets/img/content/dest/webexpo-2015/webexpo-2015-for-blog.023.webp)

[Mobile First](http://www.vzhurudolu.cz/prirucka/mobile-first) nám pomáhá vytvářet lepší weby.

## Prohlížeč vede za ruku i nezkušeného designéra

Z obrázků to vidět není, ale když držíte lineární prototyp v mobilu, designérské problémy na vás vyskakují samy. Učíme se designovat palcem na displeji mobilu.

Jsme odstínění od dalších vrstev problémů jako je design jednotlivých komponent, celostránkový design nebo grafika. Myslím, že tímhle postupem se i méně zkušení webaři mohou naučit rozumně navrhovat uživatelská rozhraní. 

![](/assets/img/content/dest/webexpo-2015/webexpo-2015-for-blog.024.webp)

Lineární design je hotový. Vraťme se teď k těm šedivým plochám. Ty říkají – tady máš úkol, navrhni rozhraní komponenty uživatelského rozhraní:

![](/assets/img/content/dest/webexpo-2015/webexpo-2015-for-blog.025.webp)

## Návrh UI komponent: skicování

Tady samozřejmě nezačnu rovnou v prohlížeči. To je časově náročné, takže si necháváme na pozdější dobu.

Skicuji. Mě vyhovuje rovnou ruka, tužka a bílý papír:

![](/assets/img/content/dest/webexpo-2015/webexpo-2015-for-blog.027.webp)

Skicování je super! Můžu kreslit jako šílený a vůbec u toho nemyslet. Tahle fáze skicování je od toho, aby se vygenerovalo co nejvíce variant řešení. Hlavně žádné designování, žádné přemýšlení. A nemusím umět kreslit, což sami vidíte.

Mozek zapojím až teď. Dívám se na jednotlivé skici a přemýšlím o jejich výhodách a nevýhodách. Samozřejmě si řešení představuji na všech možných zařízeních, beru v potaz zvyklosti a taky jak to vypadá na současném webu. Jak jsem říkal – chceme být konzervativní.

V tomhle případě jsem interně vybral třetí variantu hlavičky. Kolegům v týmu ji pak ještě rozkreslím do takovýchto předtištěných drátěných modelů jednotlivých zařízení:

![](/assets/img/content/dest/webexpo-2015/webexpo-2015-for-blog.028.webp)

Někdo by už tady nasadil wireframovací nástroj, mě i tady vyhovuje tužka, papír a prohlížeč.

Elektronický nebo nakreslený wireframe – na tom nezáleží. Je to ale výstup, který by v aktuálně převládajícím pracovním postupu šel rovnou ke grafikovi. To by byla chyba.

### V čem je problém statických navrhových nástrojů?

Tím se dostáváme k problému návrhu webu ve statickém prostředí: 

![Skica, PSD, wireframe - statická hypotéza pro dynamické médium.](/assets/img/content/dest/webexpo-2015/webexpo-2015-for-blog.029.webp)

Dynamičnost webu je v interakcích, animacích a v mém případě hlavně responzivitě – přizpůsobování rozhraní různým rozlišením:

![Web = multimediální hypertext + animace + interakce + responzivnost](/assets/img/content/dest/webexpo-2015/webexpo-2015-for-blog.030.webp)

Ano, můžete si udělat responzivní prototypy třeba v Axure, i s exportem do HTML. To co vznikne, ale nepoužívá plnohodnotnou HTML/CSS technologii. Responzivní web tam pouze emulujete. Fluidní layout – přizpůsobování rozhraní pixel po pixelu tam neuděláte. Je to něco mezi statickým návrhem a webem v prohlížeči.

Jedině přímo prohlížeč a testování na reálných zařízeních vám řekne, jak budou prvky ovládatelné palcem, na velikosti displeje zařízení X, v prohlížeči Y, vykreslené fontem Z. Nebo na pomalém připojení; nebo když uživatel použije zoom; nebo když havaruje Javascript; nebo když… Sami víte, že variant prostředí běhu uživatelského rozhraní je na webu neskutečné množství.

## Návrh UI komponent: ověření v prohlížeči

![](/assets/img/content/dest/webexpo-2015/webexpo-2015-for-blog.032.webp)

Axure vám neřekne, zda je návrh technicky realizovatelný bez nějakých složitostí typu změny pořadí v kódu nebo detekce na serveru.  

V prohlížeči si to rovnou můžete zkusit. 

### U složitých komponent se vždy rozhodujte v prohlížeči

Vůbec to neznamená, že musíte zahodit Axure a Photoshop a vše dělat v prohlížeči. Ne každý kodér chce být zároveň designérem a naopak. 

Ale pokud u webu navrhujete složité nebo nestandardní UI komponenty, rychlý prototyp v prohlížeči a vyzkoušení na zařízeních fakt pomůže. Designére, přizvi si v tu chvíli svého kodéra.

Designování celých webů v prohlížeči je poněkud extrém. Pojďme se bavit o přenesení důležitých rozhodnutí do prohlížeče:

![](/assets/img/content/dest/webexpo-2015/webexpo-2015-for-blog.037.webp)

Nemusíte v prohlížeči vytvářet návrh celého webu, stačí se v něm rozhodovat o netriviálních částech. Důležité je, aby to proběhlo už v rané fázi návrhu.

Zpět k hlavičce webu VašeČočky.cz. Mám připravený prototyp pro malé obrazovky v prohlížeči. Mám vyzkoušeno, že funguje i na těch nejmenších obrazovkách v různých variantách na různých platformách. 

### Pojďme na velké obrazovky

Určitě by ale takhle neměla vypadat na velkých obrazovkách. Pro tvorbu layotu na větších displejích funguje krásné pravidlo od Stephena Haye.

Začínáme vždy od nejmenších rozlišení – 240px širokých:

![](/assets/img/content/dest/webexpo-2015/webexpo-2015-for-blog.033.webp)

Okno zvětšujeme:

![](/assets/img/content/dest/webexpo-2015/webexpo-2015-for-blog.034.webp)

Dokud komponenta nevypadá… no víte jak:

![](/assets/img/content/dest/webexpo-2015/webexpo-2015-for-blog.035.webp)

V tu chvíli je čas na breakpoint a nasazení jiného vzhledu:

![](/assets/img/content/dest/webexpo-2015/webexpo-2015-for-blog.036.webp)

Prostě zvětšuji okno prohlížeče a v rozlišení kde to nefunguje, je čas změnit layout. Skicu mám připravenou, protože jsem různé varianty kresli i pro větší displeje. 

Všimněte si – znovu mě prohlížeč vede za ruku a ukazuje, když je něco špatně. 

To „looks like shit" nejčastěji znamená, že 

* řádka textu je příliš dlouhá,
* mediální obsah dostává málo prostoru, 
* layout UI komponenty vypadá špatně nebo se v prohlížeči špatně používá. 

V tu chvíli přichází čas na breakpoint, čas na změnu layoutu.

Takto iteruji přes všechny UI komponenty, až se dostanu k potřebě navrhnout layout pro celou stránku. I ten považuji jen za velkou UI komponentu, takže postup je stejný: skicuji varianty, vyberu nejlepší a zvětšováním okna zjišťuji v jakém rozlišení ji můžu nasadit. 

### Chtělo by to nové nástroje

Vím, proces, který tady ukazuji, není pro každého. Sám bych jeho významnou část přenesl do vizuálního editoru. Kdyby existoval. 

Chtěl bych Photoshop, ve kterém občas něco nakreslím a občas něco nakóduji a zároveň je plně responzivní. A nemusí mít ani tolik 3D funkcí jako Photoshop. 

Takové nástroje vznikají, ale jen pro určité segmenty a opakující se situace, ne pro unikátní weby. Příkladem budiž [WebFlow](http://www.vzhurudolu.cz/blog/31-webflow). 

Nadějně vypadá zejména [Bohemian Sketch](http://bohemiancoding.com/sketch/), chystaná [Scarlett od Macaw](http://scarlet.macaw.co/) a nespí ani Adobe. Mrkněte se na jejich [Edge Reflow](https://creative.adobe.com/cs/products/reflow).

Pro mě možná i zajímavější cestou je postupné zlepšování vývojářských nástrojů. V Google například tímto směrem hezky [posunují Chrome DevTools](https://trello.com/b/GKotpgkR/devtools-for-designers).

![](/assets/img/content/dest/webexpo-2015/webexpo-2015-for-blog.038.webp)

Teď od zbožných přání zpět k procesu.

Máme hotový design komponent, celých stránek, otestované interakce, otestovaná zařízení a kvalitní základnu kódu. Jdeme za grafikem.

![](/assets/img/content/dest/webexpo-2015/webexpo-2015-for-blog.039.webp)

## Grafika

Až teď řešíme grafický styl – barevné schéma, vzhled UI komponent, dekorace stránky… Tohle ale platí jen v případě redesignu VašeČočky.cz. Grafický styl jsme chtěli měnit jen málo, ostatně jsme ty konzervy na Chegeva-konzerva stupnici, že ano…

![](/assets/img/content/dest/webexpo-2015/webexpo-2015-for-blog.041.webp)

Pokud bychom vytvářeli nový web a jeho grafický styl zgruntu, grafiku bychom vymýšleli už od úvodní fáze lineárního designování. Třeba pomocí [Style Tiles](http://styletil.es/). Grafika a design spolu velmi souvisí, proto jejích rozpojení v případu redesignu VašeČočky.cz berte jako výjimku.

Grafika není pár drobností v CSS, které se na závěr projektu upraví.

Takže – lusknutí prstem trvající několik měsíců – a web je opatřený grafickým stylem:

![](/assets/img/content/dest/webexpo-2015/webexpo-2015-for-blog.042.webp)

Grafika je ale hotová, takže se postupně nasazuje a ověřuje. Ve chvíli psaní článku není ještě nová verze plně nasazená.

![](/assets/img/content/dest/webexpo-2015/webexpo-2015-for-blog.043.webp)

## Shrňme si náš proces

![](/assets/img/content/dest/webexpo-2015/webexpo-2015-for-blog.044.webp)

Povídali jsme si o návrhu a realizaci uživatelského rozhraní v prohlížeči. Probíhalo to takhle:

1. Vytvářeli jsme obsah a jeho hierarchii. 
2. Ze struktury jsme v prohlížeči dělali lineární design. Ověřovali a upravovali tady obsah a jeho strukturu.
3. Složité elementy jsme skicovali rukou. Z mnoha skic jsme vybírali ty nejlepší.
4. Skici jsme pak převedli do HTML/CSS/JS a validovali je v prohlížeči, na různých platformách, rozlišeních a zařízeních.
5. Nakonec jsme na hotový prototyp nasadili grafiku.
6. Aktuálně spouštíme a vyhodnocujeme.

## Co si z toho vzít?

1. Statické návrhové nástroje tvoří hypotézy. 
2. Prohlížeč je v procesu návrhu rozhraní příliš vzadu.
3. Designovat v prohlížeči celé weby je ale časově náročné.
4. Netriviální komponenty ale ověření v prohlížeči vyžadují.
5. Prohlížeč je designérský trasér.
6. Potřebujeme na lepší nástroje.

<small>Za spolupráci na projektu responzivního redesignu VašeČočky.cz autor děkuje [Jirkovi Urbanovi](https://twitter.com/urbanjiri), jeho lidem v Maternii a redesignovacímu týmu – [Honzovi Kvasničkovi](https://twitter.com/Jan_Kvasnicka) (UX), [Petru Štastnému](https://twitter.com/raist) (grafika), [Danu Srbovi](https://twitter.com/benAbraham) a [Patriku Illymu](https://twitter.com/illycz) (frontend). </small>