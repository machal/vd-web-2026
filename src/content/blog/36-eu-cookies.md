---
postID: 36
postTitle: 'Vše, co ještě nevíte o „EU cookies“'
postUrlId: eu-cookies
postDateTime: 2015-08-28
excerpt: 'O co vlastně té Unii jde?'
postStatus: Published
authorID: 1
sectionID: 1
category: []
no_ads: false
include_rss: true
category_highlight: true
og_title: 'Vše, co ještě nevíte o „EU cookies“'
og_description: 'O co vlastně té Unii jde?'
og_type: article
---

# Vše, co ještě nevíte o „EU cookies“

Proč jsou „EU cookies“ spíše „Google cookies“? O co vlastně té Unii jde? Proč o souhlas s jejich ukládáním nemusíte od uživatelů žádat, pokud používáte jen standardní Google Analytics? Proč to od EU není zas taková blbost? A jak to naimplementovat lidsky? Čtěte dál.

→ *Související: [Cookie lišta od roku 2022](cookie-lista-2022.md)*

## Problém jsou neanonymní a third-party cookies

EU předpis [se zaměřuje](https://brianclifton.com/blog/2012/06/11/google-analytics-and-the-new-eu-privacy-law-3) na „na behaviorální cílení a zneužití soukromých informací. Neřeší neškodné, anonymní a souhrnné reporty“.

V překladu pro nás, webaře, jde z pohledu EU o dva problematické (nebo rovnou „zlé“) typy cookies:

1. neanonymní cookies  
(ukládající údaje, z  nichž jde poznat osobu, třeba email – takzvané [PII](https://en.wikipedia.org/wiki/Personally_identifiable_information))
2. third-party cookies   
(ukládané na jiné doméně než vidí návštěvník)

U nich je dle předpisu Unie potřeba výslovného souhlasu od každého návštěvníka. Jen pozor – v českém právu tohle zatím zavedeno není. 

Je dobré si také uvědomit, že ani jeden typ ze „zlých cookies“ neukládají běžně instalované Google Analytics, takže tam ani v budoucnu o souhlas uživatele žádat nemusíme.

Mimochodem, z mě dostupných informací vychází, že Unii jde především o právo na soukromí každého uživatele. To je dle mého skromého názoru zcela OK a historky o „další EU buzeraci“ vycházejí zejména z nešťastných požadavků na  technickou implementaci. Z buzerace lištou. Jenže ono to [moc jinak nejde](http://www.zdrojak.cz/clanky/budete-dodrzovat-susenkovy-zakon-je-vubec-mozne/), protože prohlížeče tuhle vlastnost zatím nenabízejí.

Takže – v českých zákonech to zatím zakotveno není, Google to ale od webařů využívajících některé jeho služby chce celoevropsky.

## Případy, kdy Google souhlas vyžaduje

Ověřte, zda nesplňujete některý [z těchto případů](https://support.google.com/analytics/answer/2700409?hl=cs):

1. Na vašem webu běží reklamní systém od Google jako Adsense nebo DoubleClick
2. V Google Analytics jste si nastavili některé z inzertních funkcí:
	- remarketing
	- přehledy zobrazení v obsahové síti
	- demografické přehledy
3. V Google Analytics jste si nastavili sbírání neanonymních údajů (PII). Třeba, že v Událostech ukládate emaily nebo jména uživatelů.

Splňujete? Pak byste podle Google do 30. září měli od uživatelů získat souhlas s ukládáním cookies pomocí oznámení ve stránce.

Zatím nikdo neví co Google udělá, když se na to úplně vykašlete. 

## Běžně nastavené Analytics? Souhlas nepotřebujete

Běžně nastavené Google Analytics nespadají ani do kategorie „neanonymní cookie“ ani do kategorie „cookie třetích stran“. Takže pokud nesplňujete některou z podmínek ve výšeuvedeném seznamu, myslím, že žádnou lištu zobrazovat nemusíte.

## Jak do budoucna? Lišta skoro pro všechny weby

EU podmínce third-party cookie nebo neanonymní cookie ovšem odporuje skoro každý dnešní web. Stačí nainstalovat sdílecí tlačítko Facebooku, Disqus komentáře nebo jakýkoliv reklamní systém a váš uživatel je v docela velké nejistotě co a jak se o něm a jeho chování ukládá. Takže až se EU norma projeví v českých zákonech, je možné, že budeme lištu nasazovat opravdu všichni.

A pozor, už v aktuálním českém právu nějaké webařské povinnosti vůči uživatelům a jejich soukromí [existují](http://www.lupa.cz/clanky/povinne-vyzadovani-souhlasu-s-ulozenim-cookies-dorazilo-do-ceska/):

> provozovatelé mají i podle českého zákona povinnost „předem prokazatelně informovat o rozsahu a účelu jejich zpracování“ (což se obvykle řeší podmínkami používání webu) a musí uživatelům nabídnout „možnost takové zpracování odmítnout.“ (§ 89, odst. 3). 

Rychlou rešerší jsem ovšem nenašel český web, který by tuto povinnost splňoval. Ehm.

Zákon/nezákon, EU/neEU, Google/neGoogle… ze soukromí našich uživatelů na webu se nevykecáme. Rozhodně všem webařům doporučuji téma alespoň letmo sledovat. Jsem si jistý, že poroste povědomí uživatelů o tom, že je šmírujeme my sami nebo Facebook a Google skrze nás.

## Bez souhlasu se „zlé“ cookies nesmí uložit

Google účel lišty popisuje jako „získání souhlasu uživatele“. To by ovšem v důsledku z pohledu uživatele znamenalo tento scénář:

1. Web používám bez „zlých“ cookies
2. Web mi sdělí, že chce použít „zlé“ cookies
3. Odsouhlasím to 
4. Web používám s uloženými „zlými“ cookies

Prima. Co to ale znamená z pohledu webaře? 

Vy co jste odpověděli „Docela dost práce!“ máte pravdu.

## Technická implementace

Technici mohou využít buď některý z frameworků, který Google linkuje z [CookieChoices.org](https://www.cookiechoices.org/#tools) nebo to udělat podle [Davida Grudla](https://phpfashion.com/jak-na-souhlas-s-cookie-v-eu). 

Jenže – s přihlédnutím k předchozí části nebude technická implementace snadná, protože bez souhlasu uživatele nesmíte žádnou ze „zlých“ cookies uložit. Načítání dotčené části JS kódu tak musíte odložit až na moment, kdy uživatel dá souhlas.

Mimochodem – i vzhledem ke složitosti textu v cookie liště by to ale znamenalo, že velká část uživatelů bude weby využívat s nepotvrzenou cookie lištou, tedy s neuloženými „zlými“ cookies a tedy bez části Google Analytics,  bez zobrazování jakékoliv reklamy nebo bez pluginů třetích stran jako je Disqus, Facebook sdílení nebo Youtube iframů.

## Design cookie lišty

I tak prosím – nepřenášejte svou případnou frustraci z domněle zbytečné práce na uživatele. A pokud frustrace přišla, nemyslete při nasazování lišty na EU, ale na reálného uživatele co zítra přijde na váš web. Nebo třeba na zmrzlinu. 

Docela mě děsí jak i konverzně-super-optimalizované ecommerce weby nasazují lištu tak, že…  no… pokud jim nesnižuje konverze, to fakt sním svoje ponožky.

![Před: Dobrá a zlá cookie lišta](/assets/img/content/src/cookie-lista.jpg)

[Dobrá](http://codepen.io/machal/pen/WQexja?editors=110) „cookie lišta“ má rozdíl od [špatné](http://codepen.io/machal/pen/xwKOYO?editors=110) tyhle parametry:

- je co nejstručnější
- nemá fixní pozici a nezabírá tím cenný prostor na mobilech
- má jedno call-to-action tlačítko typu „OK“, „V pořádku“ nebo „Beru na vědomí“
- druhý povinný odkaz vedoucí na podrobné informace je ve vizuální hierarchii níže než výzva k akci
- nezapomíná na standardní parametry dobrého rozhraní jako optimální šířku textového řádku atd.

Shrňme si to – kvůli Google žádnou cookie lištu vyrábět nemusíte, pokud nepoužívate Adsense, Doubleclick nebo pokud nemáte specificky nastavené Analytics. Pokud se ale EU norma projeví v českém právu, budeme cookie lištu přidávat skoro na všechny weby. A bude to znamenat významné investice na straně provozovatelů webů.