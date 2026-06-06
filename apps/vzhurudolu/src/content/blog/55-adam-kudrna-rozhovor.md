---
postID: 55
postTitle: 'Rozhovor: S Adamem Kudrnou o Bootstrapu'
postUrlId: adam-kudrna-rozhovor
postDateTime: 2016-03-16
excerpt: 'Jak Bootstrap používají ve VisionApps? Vyplatí se živé HTML prototypy? Jak je spojit s grafikou? A proč Adam dává někdy přednost Material UI?'
postStatus: Published
authorID: 1
sectionID: 1
category:
  - bootstrap
no_ads: false
include_rss: true
category_highlight: true
og_title: 'Rozhovor: S Adamem Kudrnou o Bootstrapu'
og_description: 'Jak Bootstrap používají ve VisionApps? Vyplatí se živé HTML prototypy? Jak je spojit s grafikou? A proč Adam dává někdy přednost Material UI?'
og_type: article
---

# Rozhovor: S Adamem Kudrnou o Bootstrapu

Adam Kudrna je kolega z pražského štábu [Frontendisti.cz](http://www.frontendisti.cz/). Vy ho možná ale více znáte jako řečníka zabývajícího se [prototypováním](https://www.youtube.com/watch?v=A71kFP8I_qY) nebo právě [Bootstrapem](https://www.youtube.com/watch?v=dgGmHKjMzqg). Ten je našim společným tématem, a tak  jsem při hledání lektora pro [Bootstrap školení](http://www.vzhurudolu.cz/kurzy/bootstrap) moc neváhal. Adam také s kolegy kromě jiného vytváří pěknou nadstavbu nejpopulárnějšího CSS frameworku – [Synergic UI](http://ui.synergic.cz/). Osobně mám Adama uloženého ještě jako partnera pro téma, pro které se ke škodě oboru moc parťáků nenajde. Děti. Ale nebojte, tenhle rozhovor bude fakt o Bootstrapu!

---

**Martin Michálek (MM): Ahoj Adame, pojďme začít od toho, na jakých projektech pracuješ a jak Bootstrap používáš…**

Ahoj Martine. Typickým projektem, na jakém [ve VisionApps](http://www.visionapps.cz/) pracuji, je středně velká webová aplikace na míru vyvíjená v PHP nad frameworkem Symfony. 

V týmu používáme v zásadě jednoduchý, léty vybroušený výrobní proces. Po vyjasnění cílů a vize projektu vypracujeme návrh řešení, který stavíme na snadno uchopitelných *user stories* (uživatelských příběhů – jako uživatel chci, aby to či ono a proč). Ty pak pomocí prototypu rozpracujeme do *use cases* (případů užití – ty rozvíjí user stories, řeší vstupní podmínky, postupy, požadavky na výstup a veškeré relevantní eventuality, tedy ideální zadání pro vývojáře).

Návrh řešení začínáme tvořit s čistou hlavou a čistým papírem, ideálně bez jakékoli nadbytečné míry detailu, který by odváděl pozornost od jasného směru a konceptu návrhu. Use cases slouží primárně jako pokročilá technická specifikace pro vývoj a psaní funkčních testů. Vizuální maketa v podobě prototypu je pak mimořádně názorným a dobře fungujícím sdělovacím prostředkem i pro webem nedotčeného klienta.

A zde, tedy již ve fázi návrhu, se u nás ke slovu dostává [Bootstrap](http://getbootstrap.com). Prototypy totiž vytváříme živé a responzivní, nikoli obrázkové nebo generované klasickými prototypovacími nástroji. To je samozřejmě nadstandardní a, pokud vím, v českých podmínkách ojedinělá služba.

**MM: Častá výtka vůči živým prototypů zní: Jsou užitečné, ale nevyplatí se.**

Vyplatí, a to hned z několika důvodů. Za prvé, živé prototypy jsou responzivní a u responzivních webů chceme pracovat jen s jednou verzí kódu. Tou se eliminuje jakýkoli nesoulad zobrazení layoutu napříč zařízeními, který často vzniká při izolovaném návrhu pro jednotlivá zařízení. Díky prototypu prostě máte jistotu, že váš návrh je možné nakódovat.

Za druhé, [responzivní HTML prototypy](https://www.youtube.com/watch?v=A71kFP8I_qY) se dobře prezentují a testují. Klientovi (nebo testujícím uživatelům) dáte k dispozici skutečný web. Žádné obrázky s nejasným měřítkem, žádné dotazy na chování layoutu na různě velkých monitorech včetně třináctipalcového MacBooku pana ředitele. HTML prototypy tohle všechno řeší ještě než se na to kdokoli zeptá.

Za třetí, a to považuji za největší přínos responzivních prototypů, jednou napsaný kód použijete jako základ pro kódování frontendu podle grafického návrhu. Obrázkové skici po schválení zahodíte. Složitý prototyp z Axure, nad kterým váš UX designer probděl noci, zrovna tak. Pokud ale šikovně postavíte responzivní prototyp a máte pod kontrolou zbytek výrobního procesu, HTML kód znovu použijete a ušetříte tak ve výsledku práci kodérovi a peníze klientovi. A to se počítá.

[![Adamova přednáška o prototypování](/assets/img/content/dest/adam-kudrna-prototypovani.jpg)](https://www.youtube.com/watch?v=A71kFP8I_qY)

Samozřejmě, pokud bychom pro každý prototyp psali čistý, nový kód na zelené louce, náročnost výroby by byla značná a nic bychom tím nezískali. Proto své prototypy vytváříme nad Bootstrapem, který je responzivní, vede k [mobile first](/prirucka/mobile-first) návrhu i kódování a obsahuje řadu nejrůznějších komponent.

Pro to, co nám v Bootstrapu chybělo jsme vyvinuli vlastní nadstavbu [Synergic UI](http://ui.synergic.cz). Ta Bootstrap rozšiřuje o další často používané komponenty. Při prototypování tak prakticky není nutné psát žádné CSS, pouze HTML. A to je ohromná výhoda.

**MM: To zní hezky a asi se nebudeš divit, že se s tvými argumenty ztotožňuji. Ostatně – zájemce o podrobný popis podobného procesu u mě odkážu na svou [přednášku o designu webů v prohlížeči](/blog/38-design-v-prohlizeci). Pro mě tam ale zůstává minimálně jeden obtížný bod – fáze „přidávání grafiky“. V jakém momentu se to děje u vás?**

Mluvil jsem teď dlouze o návrhu a prototypování a může se zdát, že samotné kódování grafiky trochu šidím. Návrhové fázi jednoduše věnujeme velkou pozornost, protože víme, že se to dlouhodobě vyplatí. Pokud totiž postavíte solidní základ v podobě responzivního HTML prototypu, v dalších fázích jen – s trochou nadsázky – sklízíte ovoce.

Pro sladění frontendu s grafickým návrhem [Bootstrap nejprve přizpůsobíme](/prirucka/bootstrap-typografie) pomocí proměnných a poté jej rozšiřujeme na úrovni jednotlivých komponent. V administracích necháváme Bootstrap (resp. Synergic UI) s klidem ve své výchozí podobě a necháváme volnou ruku vývojářům, kteří s Bootstrapem dokáží samostatně pracovat.

A navíc – webové frontendy stavěné na Bootstrapu v souladu s jeho principy nebývá nutné tolik testovat v různých prohlížečích. Tedy nutné to v našem vlastním zájmu je, ale díky odladěnosti samotného frameworku bývá chybovost finálního produktu poměrně nízká.

**MM: Nedávno jsi zmiňoval, že v některých případech jsi Bootstrap opustil ve prospěch [Material UI](http://www.material-ui.com/). Co vás k tomu, proboha živého, vedlo?**

Tak to zatím ještě není realita, ale jen smělý plán. Uvedl jsem, že mým typickým projektem je středně velká webová aplikace na míru s frontendem postaveným na Bootstrapu. Když se ale podíváme na uživatelská rozhraní uznávaných moderních webových služeb, je zjevné, že responzivní UI webových aplikací je dnes trochu jinde.

Bootstrap je stavěný na strukturování navigace a layoutu shora dolů, zatímco pro malé i velké obrazovky se ukazuje vhodnější organizace zleva doprava, přičemž se zmenšující se velikostí obrazovky se jednotlivé oddíly layoutu zužují nebo skládají přes sebe. Tedy princip s podstatou Bootstrapu prakticky neslučitelný, chceme-li jeho možností využívat naplno.

Současně s tím zvažujeme nasazení knihovny [React.js](https://facebook.github.io/react/) pro účely administračních rozhraní. Z našich dosavadních průzkumů vyplynulo, že Bootstrap v reactím světě nemá takové zastoupení, abychom mohli Bootstrap komponenty pro React začít využívat bez větší investice do vlastního vývoje. Bootstrap zkrátka v ekosystému Reactu nenabízí hotové komplexní řešení, které by bylo možné začít ihned používat.

Volba proto padla na patrně nejucelenější projekt, [Material UI](http://www.material-ui.com) – sadu komponent pro React.js, které implementují [principy Google Material Designu](https://www.google.com/design/spec/material-design/introduction.html). Za Material Designem stojí internetový gigant Google, takže je na místě předpokládat, že definice jeho principů je podložená výsledky uživatelských testování takového UX týmu, jaký má k dispozici málokdo. Samotné Material UI také vyvíjí nezanedbatelná komunita (nejedná se totiž o [oficiální implementaci](http://www.getmdl.io)). Ze střednědobého hlediska se tedy sázka na něj jeví jako dobrá volba.

**MM: O použití Bootstrapu pro tvorbu rozhraní webových aplikací není pochyb. Co ale weby? Jsme oba fanoušci použití Bootstrapu i pro prototypování prezentačních webů. To je ale trochu jiná liga z pohledu náročnosti na tým a zákazníka. Dost by mě ale zajímalo, jak přesně to u vás děláte?**

S prezentačními weby to u nás není tak horké. Specializujeme se na špičkový vývoj webových aplikací a prezentační weby přenecháváme agenturám.

Občas se ale k nějakému prezentačnímu webu samozřejmě také dostaneme. Pak mohou nastat dvě situace: názornost návrhu je pro klienta natolik důležitá, že si responzivní HTML prototyp na Bootstrapu vyžádá. Druhá možnost: je třeba věnovat více prostoru kreativnímu grafickému návrhu, takže pro návrh postačí statický wireframe ze Sketche nebo Balsamiqu.

Zdá se tedy, že u prezentačních webů je pro volbu prototypovacího nástroje rozhodující rozpočet. Je ale fér říci, že v případě středně či více kreativní grafiky nemusí přinášet příprava kódu v podobě HTML prototypu takovou výhodu, jako je tomu u složitějších webových aplikací. Na ty se totiž Bootstrap a komponentový přístup obecně hodí mnohem více.

A samozřejmě – tak či onak musí být web pro Bootstrap navržený již od počátku. Bylo by [mylné se domnívat](/blog/11-bootstrap-pomuze), že jakoukoli grafiku je vhodné a efektivní kódovat na Bootstrapu, pokud se s tím až dosud nepočítalo.