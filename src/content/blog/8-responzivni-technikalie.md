---
postID: 8
postTitle: 'State of the art responzivních technikálií'
category:
  - responzivni-design
postUrlId: responzivni-technikalie
postDateTime: '2013-11-25 00:00:00'
excerpt: 'Definice responzivního webdesignu z doby před třemi a půl lety je dnes nedostačující. Problémy jsou především v rychlosti načítání webů a efektivitě práce. Myslím si, že za oba z velké části mohou naše pracovní postupy.'
postStatus: Published
authorID: 1
sectionID: 1
og_title: 'State of the art responzivních technikálií'
og_description: 'Definice responzivního webdesignu z doby před třemi a půl lety je dnes nedostačující. Problémy jsou především v rychlosti načítání webů a efektivitě práce. Myslím si, že za oba z velké části mohou naše pracovní postupy.'
og_type: article
---

# State of the art responzivních technikálií

*Tohle je textová verze stejně (divně) pojmenované [přednášky](http://www.slideshare.net/machal/state-of-the-art-responzivnch-technikli-de) z konference [Devel.cz](http://devel.cz/konference).*

Definice responzivního webdesignu z doby [před třemi a půl lety](http://alistapart.com/article/responsive-web-design/) je dnes nedostačující. Problémy jsou především v rychlosti načítání webů a efektivitě práce. Myslím si, že za oba z velké části mohou naše pracovní postupy.

Pojďme se podívat na dva weby — jeden je podle převládající zkomolené definice responzivní, druhý naopak ne:

![kbps.cz a blackcomb.cz](/assets/img/content/src/rwddevelcz1-.jpg) 

Bez urážky autorů prvního webu prosím! Stejně je na tom téměř každý český responzivní web, který jsem za poslední dva roky viděl. Jenže je web, který se na mobilním připojení načítá přes 2 minuty opravdu responzivní? 

Responzivní neznamená [tahací harmonika](https://twitter.com/machal/status/383525191462445056)! Responzivní znamená přizpůsobující se situaci.

Za pár let se možná slovu „responzivní" budeme smát. Zcela určitě se ale budeme smát tomu, že se naše weby tak vehementně přizpůsobovaly všem možným rozlišením obrazovky. Zabralo nám to tolik energie, že jsme už žádné jiné přizpůsobení nezvládli.

## Z pomalosti načítání děláme rychlost

K nalezení je tolik případových studií jak rychlost načítání ovlivňuje úspěch webu! Třeba moje oblíbené číslo od [Kissmetrics](http://blog.kissmetrics.com/loading-time/) říká, že o 1 vteřinu pomaleji načtená stránka může znamenat až 7procentní ztrátu na konverzích. 

Pojďme si zopakovat pár stručných tipů, které z pomalosti načítání responzivních webů udělají rychlosti:

* Obligátní, ale stále platné trio rad zní: 1) Testujte na pomalých připojeních 2) Minimalizujte počet requestů 3) Minimalizujte datový objem stránky.
* Největší datový objem mívají stránky v obrázcích. A na různé verze obrázků pro různá zařízení máme [Picturefill](https://github.com/scottjehl/picturefill).
* Načítání všech datově objemných elementů odložíme až na chvíli kdy je uživatel opravdu potřebuje. Třeba když na ně nascrolluje. Pak aplikujeme [Lazy Loading](https://github.com/luis-almeida/unveil).
* [Compressive Images](http://filamentgroup.com/lab/rwd_img_compression/) je zase technika, která zmenší datový objem JPEG obrázků tak, že je uložíte ve větším rozlišení a menší kvalitě než byste to dělali běžně.
* Hlídejte si kód třetích stran. Třeba [sdílecí tlačítka](https://twitter.com/machal/status/390092744116301824) tří sociálních sítí vám do stránky přidají 200 kB a 30 dotazů na server. Na Edge připojení to pak znamená minimálně 10vteřinové prodloužení doby načítání.
* Tam kde už nevíte jak, nebojte se mobilní zařízení [detekovat na serveru](http://kratce.vzhurudolu.cz/post/44227784297/docasna-server-detekce). Takové vkládané Google mapy na displeji chytrého telefonu nedávají z pohledu uživatelského prožitku smysl a představují další velkou datovou zátěž.
* Kde můžete, použijte [History API (pushState)](https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Manipulating_the_browser_history) nebo pluginy typu [Pjax](http://pjax.heroku.com/). 

Vidíte, že na to, abyste z pomalosti načítání udělali rychlost, nepotřebujete být žádný NASA inženýr. Postupů je mnoho, jsou dobře zdokumentované a čekají až je použijete.

OK, teď je náš web rychlejší. Jenže uživatel smartphone na EDGE i tak stahuje spoustu balastu od kousků zbytečného kódu až po celé pluginy typu lightboxů nebo karuselů, použitelných až na větších displejích. A taky nás responzivní web stojí hrozně moc práce navíc. 

Mohou za to pracovní postupy.

## První problém s workflow: Architektura kódu zezhora dolů

Říká vám něco [progressive ennhancement](http://en.wikipedia.org/wiki/Progressive_enhancement)? Tenhle prastarý postup zase ožívá v podobě tzv. zezdola nahoru ([Mobile Up](http://bradfrostweb.com/blog/web/mobile-first-responsive-web-design/)) návrhu kódu:

![Desktop Down / Mobile Up](/assets/img/content/src/rwddevelczdesktopdown-.jpg) 

Jenže v existujících pracovních postupech převažuje řešení opačné (Desktop Down). To ovšem produkuje spoustu balastního a špatně spravovatelného kódu, kterým ve variantě pro malé displeje předefinováváme řešení pro ty velké.

## Druhý problém s workflow: Hodně breakpointů, hodně verzí kódů

	<link rel="stylesheet" href="smartphone.css" media="(max-width: 480px)">
	<link rel="stylesheet" href="tablet.css" media="(min-width: 481px) and (max-width: 1023px)">
	<link rel="stylesheet" href="desktop.css" media="(min-width: 1024px) and (max-width: 1280px)">
	<link rel="stylesheet" href="desktop-large.css" media="(min-width: 1281px)">

„Průšvih jak mraky!" říkám si pokaždé když něco takového vidím ve zdrojáku responzivního webu.

První část průšvihu je přehnaná tvorba breakpointů, ke které tíhnout snad všichni co s responzivnem začínají. 

A druhá? Spravovatelnost takového kódu je webařská verze Mission Impossible. Představte si, že chcete upravit kód – dejme tomu – navigace. Upravíte ji v jednom souboru. Pak v druhém. Ve třetím. A je to dobrý, už vám zbývá jen čtvrtý CSS soubor!

## Třetí problém s workflow: Navrhování webů podle stránek, nikoliv komponent

Tohle je velké téma, ale zkusím být stručný. Weby jsou tvořeny stránkami, to vás nepřekvapí. Ale stránky jsou tvořeny komponentami. Někdo jim říká [atomy](http://bradfrostweb.com/blog/post/atomic-web-design/). Podívejte se třeba na tuhle responzivní homepage jedné …ehm… nadějné softwarové firmy:

![Komponenty na Microsoft.com](/assets/img/content/src/rwddevelcz2-.jpg)  

Na Microsoft.com se můžeme buď dívat jako na jednu docela složitou stránku nebo na logický uspořádaný systém pěti komponent a jejich variant. Zkuste si teď představit, že ty komponenty můžete znovupoužívat na různých místech webu. Už tušíte, co myslím tím, že máme v efektivitě pracovních postupů velké mezery?

Kód organizovaný přes komponenty pak vypadá s pomocí preprocesoru nějak takhle:

	@import “/components/nav“
	@import “/components/article“
	@import “/components/article-list“

Srovnejte s předchozí ukázkou. Tady mám jen jednu verzi kódu a v ní jeden „centrální" breakpoint. Ostatní breakpointy se mi přestěhovaly na úroveň jednotlivých komponent — navigace, článku nebo seznamu článků. Říkám jim [mikrobreakpointy](http://kratce.vzhurudolu.cz/post/46416507703/jake-breakpointy-zvolit-v-responzivnim-webdesignu).

A teď se od nedostatků v pracovních postupech dostáváme k fastfoodu. Chvilku vydržte, hned to pochopíte.

## Problém příliš velkého hamburgeru

![Co chce uživatel a co dostane od stránky.](/assets/img/content/src/rwddevelcz3-.jpg)

„Ale já jsem chtěl hamburger, ne desetipatrový barák s řízkem na balkóně!” 

Ani na webu bychom uživateli neměli dávat co nechce. Sem patří podmíněné načítání assetů — CSS, JS souborů a obrázků. A pak techniky, které vypadají skvěle na papíře, ale nemám je odzkoušené na reálném projektu.

Podmíněné načítání je snad už docela běžná věc. Vezměme lightbox. Na velkých displejích velmi užitečný, na malých často velmi zbytečný. Pomocí Modernizru nebo jiných nástrojů můžeme zajistit načítání těchto elementů až ve chvíli kdy je uživatel opravdu potřebuje. Zjednodušeně vypadá podmíněné načítání takhle:

	Modernizr.load({
	  test: Modernizr.mq('screen and (min-width: 600px)'),
	  yep : [			
			'/fancybox/jquery.fancybox.pack.js', 
	                '/fancybox/jquery.fancybox.css',
		]
	});

[Plná verze kódu](https://bitbucket.org/machal/ubytovaniprovence.cz/src/51d40e57ba966c2071d4e4da6766450690c4a5d4/js/index.js?at=master).

A teď ty papírově skvěle vypadající techniky…

## Generování CSS/JS za letu

Skvělí Filament Group již před časem zveřejnili své responzivní workflow pod názvem [SouthStreet](https://github.com/filamentgroup/Southstreet). Součástí je:

* **Enhance.JS** — knihovna pro podmíněné načítání JS
* **eCSSential** — knihovna pro podmíněné načítání CSS
* **QuickConcat** — prototyp serverové komponenty pro spojování a minifikace CSS/JS on-the-fly

S pomocí těchto tří komponent by vám stránka poskládala balíček s JS/CSS komponenty, které potřebujete právě a jen na aktuální stránce a aktuálním zařízení. Fikané. Zatím si ale myslím, že tohle využijí hlavně správci velkých webů a aplikací. U další už bude škála využití daleko pestřejší:

## AjaxInclude — lazyloading pro obsah

Opět v hlavní roli progressive enhancement. Základní verze komponenty je ta pro malé displeje oklešťená od veškerého balastu. Ve chvíli kdy detekujeme větší displej, můžeme uživateli nabídnout lepší uživatelský prožitek a pak ajaxem donačteme rozšířený uživatelské prožitek.

Takhle to vypadá v reálu na BostonGlobe.com:

![Počasí na BostonGlobe.com](/assets/img/content/src/rwddevelcz4-.jpg) 

A takhle nějak pak v kódu (využívá plugin [AjaxInclude](https://github.com/filamentgroup/Ajax-Include-Pattern/)):

	<a href="..." 
	  data-replace="pocasi-plne.html" 
	  data-media="(min-width: 480px)">
	    Počasí
	</a>

Jako u všech progressive enhancement variant se mi líbí *křápovzdornost* řešení. Obsah dostanou všichni uživatelé, i vaše babička s pravěkým telefonním křápem, ve kterém javascript nepoběží i kdyby jste se jej vyrazili osobně přesvědčit.

A na závěr shrnutí:

* Nedostatky responzivních webů jsou v rychlosti načítání a efektivitě práce. Za oba problémy mohou naše pracovní postupy. <small>([tweetni](https://twitter.com/intent/tweet?text=Nedostatky%20responzivn%C3%ADch%20web%C5%AF%20jsou%20v%20rychlosti%20na%C4%8D%C3%ADt%C3%A1n%C3%AD%20a%20efektivit%C4%9B%20pr%C3%A1ce.%20Za%20oba%20probl%C3%A9my%20mohou%20na%C5%A1e%20pracovn%C3%AD%20postupy.&url=http://www.vzhurudolu.cz/blog/8-rwd-technikalie))</small>
* Jak zrychlit web? 1) Začít testovat 2) Minimalizovat requesty 3) Minimalizovat data 4) Picturefill 5) Lazyloading. <small>([tweetni](https://twitter.com/intent/tweet?text=&Jak%20zrychlit%20web%3F%201.%20Za%C4%8D%C3%ADt%20testovat%202.%20Minimalizovat%20requesty%203.%20Minimalizovat%20data%204.%20Picturefill%205.%20Lazyloading.url=http://www.vzhurudolu.cz/blog/8-rwd-technikalie))</small>
* Lepší responzivní workflow: 1) Mobile Up 2) Málo breakpointů, málo verzí kódu 3) Nenavrhujeme stránky, ale komponenty. <small>([tweetni](https://twitter.com/intent/tweet?text=Lep%C5%A1%C3%AD%20responzivn%C3%AD%20workflow%3A%201.%20Mobile%20Up%202.%20M%C3%A1lo%20breakpoint%C5%AF%2C%20m%C3%A1lo%20verz%C3%AD%20k%C3%B3du%203.%20Nenavrhujeme%20str%C3%A1nky%2C%20ale%20komponenty.&url=http://www.vzhurudolu.cz/blog/8-rwd-technikalie))</small>
* Nedávejte uživateli co nepotřebuje. Využijte podmíněné načítání a AjaxInclude. <small>([tweetni](https://twitter.com/intent/tweet?text=Ned%C3%A1vejte%20u%C5%BEivateli%20co%20nepot%C5%99ebuje.%20Vyu%C5%BEijte%20podm%C3%ADn%C4%9Bn%C3%A9%20na%C4%8D%C3%ADt%C3%A1n%C3%AD%20a%20AjaxInclude.&url=http://www.vzhurudolu.cz/blog/8-rwd-technikalie))</small>