---
postID: 149
postTitle: 'Paul Bakaus: „AMP je docela nepochopený projekt“'
postUrlId: amp-paul-bakaus
postDateTime: 2019-09-18
excerpt: 'Interview s členem AMP týmu. Dozvíte se, zda je možné AMP považovat za následníka jQuery ekosystému. Dále pak narazíme na problémy spojené s potenciálním otevření výhod AMP pro všechny webu. A nakonec na podprojekt jménem „AMP Bento“.'
postStatus: Published
authorID: 1
sectionID: 1
category:
  - amp
no_ads: true
include_rss: true
category_highlight: true
og_title: 'Paul Bakaus: „AMP je docela nepochopený projekt“'
og_description: 'Interview s členem AMP týmu. Dozvíte se, zda je možné AMP považovat za následníka jQuery ekosystému. Dále pak narazíme na problémy spojené s potenciálním otevření výhod AMP pro všechny webu. A nakonec na podprojekt jménem „AMP Bento“.'
og_type: article
---

# Paul Bakaus: „AMP je docela nepochopený projekt“

_Za pár dní bude [na WebExpo v Praze](https://www.webexpo.net/prague2019/talk/maximizing-web-developer-productivity-with-amp) přednášet Paul Bakaus z týmu stojícím za technologií [AMP](https://www.vzhurudolu.cz/prirucka/amp), kterou v poslední době na Vzhůru dolů potkáváte často. Zeptal jsem se jej na pár otázek. Dozvíte se, zda je možné AMP považovat za následníka jQuery ekosystému. Dále pak narazíme na problémy spojené s potenciálním otevření výhod AMP pro všechny webu. A nakonec na podprojekt jménem „AMP Bento“._


## „AMP může vývojářům ušetřit spoustu času na správu a opravy chyb“ {#title-1}

**Paule, těším se, že ve své přednášce ukážete AMP jako frontendový  framework! Udělal na mě svého času dojem, ale ne každý zná jeho výhody. Mohl byste stručně vyjmenovat výhody frameworku AMP oproti současným řešením pro obsahové stránky a e-shopy, kde je jQuery stále nejběžnějším přístupem?**

To rád slyším! AMP je opravdu docela nepochopený projekt. Vždy to byl framework, ale často se porovnává s uzavřenými formáty. Většina webových vývojářů si není vědoma, že AMP lze použít právě také jako samostatný framework.


<figure>
<img src="https://res.cloudinary.com/vzhurudolu-cz/image/upload/w_1200,q_100/v1568600803/amp-paul-bakaus_sx3eyp.jpg" alt="">
<figcaption markdown="1">
*Paul Bakaus: „AMP může zpřístupnit vývoj vynikajícího UX více lidem.“*
</figcaption>
</figure>

Já jsem samozřejmě neobjektivní, ale myslím si, že když se rozhodnete dělat weby pouze s AMP, dostanete spoustu skvělých věcí. Naší hlavní filozofií je umožnit vývojářům soustředit se méně na „boilerplate“ kód a více na kód, na kterém skutečně záleží, který odlišuje od konkurence. Takže řešíme věci v mnohem vyšší abstrakční vrstvě – nejsme javascriptový, ale HTML framework.

To znamená, že téměř nikdy nemusíte psát JavaScript – což je vlastnost, ne chyba. Také to znamená, že AMP může z velké části zaručit dobrou rychlost stránky, takže již nemusíte sledovat rychlostní limity webu, což je obrovská úspora času.

Základní knihovna AMP je k dispozici na CDN, takže můžeme přenést aktualizace na miliardy stránek přes noc a vylepšit vaše weby bez jakýchkoliv nových nasazení na produkci nebo práce na vaší straně.

A s [amp-script](https://amp.dev/documentation/components/amp-script/), [amp-bind](https://www.ampproject.org/docs/reference/components/amp-bind) a [amp-list](https://amp.dev/documentation/components/amp-list/) máte po ruce silnou interaktivitu, když ji potřebujete.

Ve výsledku si myslíme, že AMP může ušetřit spoustu času na údržbu a opravy chyb. Proto činí vývoj vynikajícího UX dostupným více firmám. Ne každý má totiž peníze na zaplacení 5 frontendových vývojářů zaměřených na rychlost.


## „Měření rychlosti stránky je neuvěřitelně komplexní problém“ {#title-2}

**Různí [důležití členové komunity](https://adactio.com/journal/15726) povzbuzují společnost Google, aby výhody webů AMP poskytovala také běžným rychlým webům. Vím, že tým AMP se již [tímto problémem zabývá](https://blog.amp.dev/2019/05/21/contributing-back-lessons-learned-part-1/), ale obávám se, že ne všichni rozumějí celé škále problémů z toho vyplývajícím. Co konkrétně by musely běžné webové stránky udělat, aby získaly ty výhody?**

Jeremyho příspěvek na blogu byl zajímavý, protože procházel problémem stejným způsobem, jako to dříve udělal tým AMP. Jeremyho zásluhou ale je, že po položení správných otázek dospěl ke správnému souboru problémů, které je třeba vyřešit.

Napsal také, že „jistě chytřejší lidé než [on] tyto věci dokáží vymyslet“, ale problém je v tom, že Jeremy buď podceňuje svou inteligenci, nebo nadhodnocuje naši. 

Zjistit, jak změřit, zda je stránka rychlá nebo ne vypadá jednoduše na povrchu, ale je to neuvěřitelně složitý problém.

<figure>
<img src="https://res.cloudinary.com/vzhurudolu-cz/image/upload/w_1200,q_100/v1568600802/amp-website_pv5dqd.jpg" alt="">
<figcaption markdown="1">
*Paul Bakaus: „AMP není JS framework, jsme  HTML framework.“*
</figcaption>
</figure>

Pomalu postupujeme s metrikami, jako je [největší vykreslení obsahu (largest contentful paint)](https://web.dev/largest-contentful-paint), ale je to jen špička ledovce.

Vezměte si například oblast runtime performace (tedy rychlost stránky při běhu v prohlížeči): Aby bylo možné přesně měřit, zda je stránka při interakci rychlá, musel by s ní robot tyto interakce dělat a to pravděpodobně i na nějakou dobu.

Nejen, že procházení robotem by bylo neuvěřitelně drahé, bez mezipaměti (AMP Cache) je to ještě horší. Bez umístění na ní bychom stránce nemohli důvěřovat, že zůstává rychlá. Prostě by platformy jako Google musely stránku ověřovat vícekrát denně.

Nemluvil jsem ještě ani o [předrenderování stránky chránícím soukromí](https://developers.googleblog.com/2019/08/the-speed-benefit-of-amp-prerendering.html), což je hlavní důvod, proč jsou stránky AMP hostovány v mezipaměti (AMP Cache). Signed HTTP exchanges jsou slibným standardem pro oddělení identity a doručování dokumentů a lze je použít k přednačtení non-AMP obsahu při zachování ochrany soukromí, pokud také vyřešíme  problém s metrikami. A samozřejmě: Musely by do tohoto standardu jít všechny prohlížeče.

V mnoha ohledech doufám, že tento den přijde spíše dříve než později, protože ukáže, kolik práce AMP dělá, aby zajistil skvělý UX. Když vydavatelé uvidí, jak těžké je implementovat rychlý web od nuly, začne AMP náhle vypadat atraktivněji!

**Paule, zmínil jste se o problémech s neexistujícími metrikami a výkonem robotů procházejících stránky. Existuje však již [Chrome UX Report](https://developers.google.com/web/tools/chrome-user-experience-report/), databáze rychlostních metrik od reálných uživatelů webů. Ano, bohužel zatím poskytuje pouze malý počet metrik. Ale nemohla by právě tato databáze poskytnout informace, zda je stránka dostatečně rychlá?**

Chrome UX Report by určitě měl být jedním ze stavebních kamenů. Zatím ale neměří výkon při běhu stránky v prohlížeči, což je problém, který bychom museli řešit. Dalším problémem je pracovní postup vývojáře: Pokud stavíte nový web a chcete vědět, zda je váš obsah vhodný pro pre-rendering nebo ne, museli byste počkat několik týdnů. Validátor AMP vám tuto záruku poskytuje okamžitě.

Lighthouse je zajímavý tím, že stojí někde uprostřed, ale je mnohem méně zárukou skvělého výkonu než data od reálných uživatelů. Všechny tyto nástroje a metriky mají své klady a zápory a tak věřím, že v závěru půjde o kombinaci různých nástrojů a metrik.


## „Otáčíme AMP směrem k všestrannému frameworku pro obsahové stránky“ {#title-3}

**Gratuluji k JavaScriptu v AMP - nové komponentě [amp-script](https://amp.dev/documentation/components/amp-script/). Zaujal mě také projekt [„AMP bento“](https://blog.amp.dev/2019/05/01/amp-as-your-web-framework/), který odstraní potřebu používat runtime AMP, hlavní JS knihovnu a zlepší výkon při používání frameworku na běžných webových stránkách. Jak daleko to je a jaké jsou další větší plány s AMP?**

V poslední době jsme s Bento dosáhli slušného pokroku. Je to neuvěřitelně složitý projekt, protože ve skutečnosti vyžaduje přepsání AMP takovým způsobem, aby byl AMP ještě modulárnější než už je.

V současné době AMP očekává, že bude mít úplnou kontrolu nad stránkou a jejím stromem DOM. Hlavní knihovna AMP (naši vývojáři ji nazývají „runtime“) musí být načtena spolu s dalšími komponentami.

Takže pokud byste chtěli použít [amp-sidebar](https://amp.dev/documentation/components/amp-sidebar/) na běžícím webu, řekněme s Angularem, už byste to mohli udělat trochu dnes, ale bylo by to neefektivní a náchylné k chybám, protože byste museli načítat celou runtime pouze pro zobrazení postranního panelu, a museli byste být opatrní, aby se neměnil DOM po vykreslení amp-sidebar.

Přepsání AMP, kterému říkáme Bento, izoluje komponenty mnohem lépe od sebe. Dále zavádí nové rozhraní pro správu životního cyklu komponenty a způsobí, že se komponenty budou chovat mnohem více jako tradiční webové komponenty.

Je důležité si uvědomit, že Bento má jeden konkrétní účel: Umožnit lidem postupně upgradovat na 100 % AMP. Vývojáři totiž ani s webem vyhovujícím specifikaci AMP na 90 % nedostanou výhody ukládání do mezipaměti a předběžného vykreslení, což je škoda. Doufáme tedy, že Bento časem usnadní konverzi.

Máme spoustu plánů na zlepšení AMP, ale většina lze klasifikovat jako přeměnu AMP na všestranný framework pro obsahové webové stránky. Jsme přesvědčeni, že  na webu je dnes zbytečně těžké stavět skvělé věci, a my se chceme podílet na tom, abychom vám pomohli. Zůstaňte naladěni!

**Děkuji za rozhovor a přeji vám příjemný pobyt v Praze!**

_Anglický originál našeho rozhovoru si můžete přečíst na [CSSMine.com](https://www.cssmine.com/blog/2019-09-16-paul-bakaus-amp-is-a-pretty-misunderstood-project)._

<!-- AdSnippet -->