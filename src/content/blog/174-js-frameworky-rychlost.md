---
postID: 174
postTitle: 'JS frameworky a rychlost webu: Jaké předpoklady má React, Angular nebo Vue.js?'
postUrlId: js-frameworky-rychlost
postDateTime: 2020-07-08
excerpt: 'Angular a React přímo nezpůsobují pomalost, ale mohou pro ni ve svém ekosystému vytvářet předpoklady. Alespoň podle na studie Tima Kadlece.'
postStatus: Published
authorID: 1
sectionID: 1
category:
  - js
  - rychlost
  - javascript
no_ads: false
include_rss: true
category_highlight: true
og_title: 'JS frameworky a rychlost webu: Jaké předpoklady má React, Angular nebo Vue.js?'
og_description: 'Angular a React přímo nezpůsobují pomalost, ale mohou pro ni ve svém ekosystému vytvářet předpoklady. Alespoň podle na studie Tima Kadlece.'
og_type: article
---

# JS frameworky a rychlost webu: Jaké předpoklady má React, Angular nebo Vue.js?

Tim Kadlec před časem publikovat [skvělou studii](https://timkadlec.com/remembers/2020-04-21-the-cost-of-javascript-frameworks/) výkonu javascriptových frameworků na datech z reálných webů.

Můj [tweet](https://twitter.com/machal/status/1277856908486074368) přinesl ohlasy, ale zároveň mě ujistil, že tohle se prostě na Twitteru poctivě vysvětlit nedá.

<blockquote class="twitter-tweet"><p lang="cs" dir="ltr">Které JS frameworky mají *tendenci* zpomalovat weby? <br>V grafech jsou percentily: 10, 25, 50, 75, 90.<br>Vysvětlení je složitější, čtěte raději celý článek:<a href="https://t.co/64630Yd7Nh">https://t.co/64630Yd7Nh</a> <a href="https://t.co/8EcDvSVjBD">pic.twitter.com/8EcDvSVjBD</a></p>&mdash; Martin Michálek (@machal) <a href="https://twitter.com/machal/status/1277856908486074368?ref_src=twsrc%5Etfw">June 30, 2020</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> 

Pojďme to upřesnit v článku. Pokusím se původní myšlenky zestručnit a přidat k nim pár vlastních.

## JavaScript je výkonnostní problém {#js-problem}

Byl je a vždycky bude. Autor píše, že „není rychlejší cesty jak zabít [rychlost webu](https://www.vzhurudolu.cz/rychlost-nacitani) než přidat pár JS souborů“. JavaScript totiž zpomaluje hned čtyřikrát: stahováním po síti, parsováním (a kompilováním), spouštěním a vytěžováním paměti zařízení.

S příchodem moderních JS frameworků jako je Angular, React a Vue.js se jistě zrychlil vývoj webů, ale přineslo to často i jejich výrazné zpomalení.

<!-- AdSnippet -->

Vezměme v potaz, že „javascriptové“ metriky jako [First Input Delay (FID)](https://www.vzhurudolu.cz/prirucka/metrika-fid) jsou dnes součástí posuzování webu Googlem, např. v podobě sady [Web Vitals](https://www.vzhurudolu.cz/prirucka/web-vitals).

## Dobře navržený framework má sloužit vývojáři, ale také uživatelům {#ux}

Framework má určitě zpříjemnit práci vývojářům a zvýšit jejich efektivitu, to je bez debat. Stačí to ale?

Tim Kadlec vyslovuje další klíčový předpoklad – framework by měl přidávat hodnotu také uživatelům. Na úrovni výkonu, ale i přístupnosti nebo třeba bezpečnosti.

V ideálním světě tedy framework zlepšuje DX (vývojářský zážitek), ale vývojáře omezuje a popostrkuje tak, aby výsledná aplikace poskytla také lepší UX (uživatelský zážitek).

## Jak proběhl výzkum? {#jak}

Autor provedl datovou analýzu na databázi [HTTP Archive](https://httparchive.org/), která skladuje informace o tom, jak jsou vyvíjeny weby. 

V době provádění průzkumu – v březnu 2020 – šlo konkrétně o 4,3 milionu desktopových a 5,5 milionu mobilních URL.

Výzkum se nesoustředil jen na jeden typ výsledku, který by mohl představovat [medián](https://cs.wikipedia.org/wiki/Medi%C3%A1n). Autora zajímalo, jak budou vypadat nejlepší a nejhorší stránky postavené na konkrétních frameworcích. K tomu slouží 10., 25., 75. a 90. percentil. 

Na [Wikipedii](https://cs.wikipedia.org/wiki/Kvantil) se o těchto statistických pojmech dozvíte více, ale v zásadě jsou nejdůležitější tyto:

- Desátý percentil ukazuje nejlepších 10 % webů (jak moc dobré dokáží weby používající framework být)
- Devadesátý percentil obsahuje nejhorší desetinu webu (jak to může být špatné)

Mimochodem, proč doporučuje [nezaměřovat na medián](https://timkadlec.com/remembers/2018-06-07-prioritizing-the-long-tail-of-performance/), vysvětloval Tim také [na WebExpu 2018](https://www.vzhurudolu.cz/blog/122-webexpo-2018#kadlec).

## Výsledky {#vysledky}

V původním článku je řada grafů, ale já jsem vybral dva. První ukazuje počet stažených bajtů, druhý zatížení procesoru zařízení. Oba jsou pro mobily, protože ty jsou kritičtější a grafy pro desktop se příliš neliší.

V [krabicových grafech](https://office.lasakovi.com/excel/grafy/krabicovy-graf-boxplot-excel/) jsou zakresleny hodnoty 10., 25., 50. (medián), 75. a 90. percentilu.

### Datová velikost JS {#data}

<img src="https://res.cloudinary.com/vzhurudolu-cz/image/upload/v1594099795/vzhurudolu-blog/kadlec-js-frameworky-mobile-bytes_uqbqhg.png" alt="Datová velikost JS souborů na mobilech podle frameworku" width="711" height="448">

V tomhle grafu dopadly špatně weby postavené na Angularu. Ty nejlepší na 10. percentilu stahují něco kolem 400 kB dat, podobně jako medián u webů používajících jQuery.

Mimochodem, to špatné vysvědčení Angularu je nutné brát s rezervou a v kontextu dalších frameworků. Medián stahovaných dat je u něj kolem 1,1 MB. U Reactu a Vue.js je kolem 700 kB. 

Nevím, jak vám, ale mě všechna ta čísla připadají dost šílená.

### Vytížení CPU {#cpu}

Datový objem je důležitý, ještě důležitější je ale vliv JS na vykreslování a metriky jako [First Input Delay (FID)](https://www.vzhurudolu.cz/prirucka/metrika-fid) nebo [Time To Interactive (TTI)](https://www.vzhurudolu.cz/prirucka/metrika-tti).

Tim Kadlec tady zkoumal statistiky metriky „V8 main thread time“.

<img src="https://res.cloudinary.com/vzhurudolu-cz/image/upload/v1594099793/vzhurudolu-blog/kadlec-js-frameworky-mobile-cpu_s8tc5l.png" alt="Vytížení CPU na mobilech podle frameworku" width="745" height="450">

Jak vidíte, v grafu zde do ošklivých čísel padají weby s Reactem. Ty nejlepší na 10. percentilu potřebují na mobilech ke zpracování zhruba 2,5 vteřiny, což je více než medián webů všech webů.

Ty nejhorší weby stavěné na frameworcích dosahují ovšem nepěkných čísel vždycky – zhruba 13 vteřin času CPU (a pravděpodobně tedy zaseknuté interaktivity) u Angularu a Vue a přes 20 vteřin u 90. percentilu webů na Reactu. Uff!

## Závěry {#zavery}

Znamenají uvedené grafy, že každý web postavený na Angularu bude stahovat nehezké množství dat a každý web s Reactem bude zpomalovat web zatěžováním CPU? 

<div class="related" markdown="1">
- [Podcast o JS frameworcích](https://www.vzhurudolu.cz/podcast/150-podcast-js-frameworky)
- [JS jako async, defer a module](https://www.vzhurudolu.cz/prirucka/js-async-defer-module)
- [Podcast o Next.js](https://www.vzhurudolu.cz/podcast/169-podcast-next-js)
</div>

Nikoliv, musíme se ještě totiž podívat na možné interpretace. Jak píše například [Jarda Šnajdr](https://twitter.com/jsnajdr/status/1277912842734370822):

> Zdaleka nemusí platit, že konkrétní framework _způsobuje_ pomalost, a že kdyby ti samí lidé napsali tu samou aplikaci např v jQuery místo Reactu, že by byla rychlejší.

Je to skoro přesně tak. V porovnání frameworků od Tima Kadlece jde také o porovnání vývojářů, projektů a firem, které tyto frameworky používají. [Jarda Šnajdr](https://twitter.com/jsnajdr/status/1277914687284412422) dodává:

> 1. Pomalé jsou především velké (rozsahem funkcí) a složité aplikace, a ty se většinou píší v Reactu.
> 2. Pomalé jsou aplikace méně zkušených autorů. Ti většinou používají React, protože je to mainstream. Jiný framework použijí spíše ti, kteří víc přemýšlí o alternativách.

Jarda uvádí jednu z možných interpretací, ale bez dat je v tomto možné argumentovat oběma směry. 

Podobně [jako u WordPressu](https://www.vzhurudolu.cz/blog/125-wordpress-richman) ovšem platí, že za pomalost webů na něm postavených nemůže jen nástroj samotný, ale způsob, jakým se používá.

<!-- AdSnippet -->

Jenže tady se dostáváme zpět k původní myšlence Tima Kadlece – framework a jeho ekosystém (dokumentace, nástroje či rozšíření) má vývojáře také omezovat při páchání různých zvěrstev. A tady musím konstatovat, že z výzkumu se zdá, že React a Angular mají v omezování páchání zpomalování webů *jisté* mezery. Jemně řečeno. Napadá vás jaké? Budu rád za komentář.

Frameworky tedy *nezpůsobují* pomalost, ale mohou pro ni ve svém ekosystému vytvářet *předpoklady*.

### Co s tím? {#co-s-tim}

Autor při hledání řešení vybízí hlavně ke zvažování alternativ, ale jeho návrhy jsou obecně zajímavé:

* Opravdu potřebujete framework? [Čistý (vanilla) JS](https://learnvanillajs.com/) toho zvládne hodně.
* Zvažte lehčí varianty jako [Preact](https://preactjs.com/), [Svelte](https://svelte.dev/) atd.
* Pokud nemáte tolik zkušeností, zvažte varianty, které nabízejí rozumné přednastavené výchozí hodnoty a renderování na serveru (např. Nuxt.js místo Vue.js, [Next.js](https://www.vzhurudolu.cz/podcast/169-podcast-next-js) místo Reactu).
* Nastavte si a průběžně měřte [rychlostní limity (performance budgets)](https://timkadlec.com/remembers/2019-03-07-performance-budgets-that-stick/) pro JavaScript i celou aplikaci.

Na úplný závěr přidávám jeden odkaz na původní článek: [The Cost of Javascript Frameworks](https://timkadlec.com/remembers/2020-04-21-the-cost-of-javascript-frameworks/).


<!-- AdSnippet -->