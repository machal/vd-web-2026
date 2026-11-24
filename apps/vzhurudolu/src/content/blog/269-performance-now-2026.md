---
postID: 269
postTitle: 'Pro rychlejší web nestačí jen umět zrychlovat. Můj report z konference performance.now() 2026'
postUrlId: performance-now-2026
pairId: performance-now-2026
postDateTime: 2026-11-24
excerpt: 'V Amsterodamu na performance.now() jsem mluvil o prodeji rychlosti webu. Tady je shrnutí přednášky, tři tipy z programu a pár poznámek k tomu, proč tahle komunita funguje jinak než běžné konference.'
postStatus: Published
authorID: 1
sectionID: 1
category:
  - rychlost-nacitani
  - netechnické
no_ads: true
include_rss: true
category_highlight: true
og_title: 'Pro rychlejší web nestačí jen umět zrychlovat. Můj report z konference performance.now() 2026'
og_description: 'V Amsterodamu na performance.now() jsem mluvil o prodeji rychlosti webu. Tady je shrnutí přednášky, tři tipy z programu a pár poznámek k tomu, proč tahle komunita funguje jinak než běžné konference.'
og_image: /assets/img/content/dest/performance-now-2026-og.webp
og_type: article
---

# Pro rychlejší web nestačí jen umět zrychlovat. Můj report z konference performance.now() 2026

Minulý týden jsem byl v Amsterodamu na konferenci [performance.now()](https://www.perfnow.nl/), kam mě pozvali nasdílet zkušenosti se zrychlováním webů ve [PageSpeed.ONE](https://pagespeed.one/).

Bylo mi ctí, bylo mi potěšením. Vyklepaný jsem z toho přednášení byl jako ratlík, vždyť jde o nejlepší konferenci našeho oboru na celičkém světě.

Po pár hodinách jsem se tady ale cítil jako doma, jako na větším meetupu v Praze, kde se tak nějak všichni známe. Komunita kolem webperformance je malá, velmi přátelská a já jsem zjistil, že to, co ve firmě děláme, je na naprosté špičce, a to jak odborně, tak byznysově. Mám z toho výletu fakt radost, úplně po všech směrech.

## Moje přednáška: Proč se rychlost tak těžko prodává? {#prednaska}

Na performance.now() jsem mluvil o tom, jak ve PageSpeed.ONE přesvědčujeme firmy, aby se věnovaly rychlosti webu. Ono to totiž je těžké. A je to základ, bez kterého my nemůžeme fungovat.

Nestačí web zrychlit. Nejdřív musíme získat podporu lidí, kteří o něm rozhodují. Místo hromady čísel někdy lépe funguje ukázat pomalý web na skutečném telefonu.

<figure>
<img src="/assets/img/content/dest/performance-now-2026-talk.webp" alt="Koláž: přednáška Why Is Fast So Hard to Sell na performance.now(), Martin na pódiu a selfie po akci">
<figcaption markdown="1">
*Přednáška Why Is Fast So Hard to Sell? na performance.now() — a večer potom s Michalem.*
</figcaption>
</figure>

[Monitoring rychlosti](https://pagespeed.one/znalosti/monitoring) pomáhá odhalit problémy dřív než zákazníci — a začít o rychlosti pravidelně mluvit. Případovky jsou užitečné, ale pozor na slabé důkazy. Korelace rychlosti a konverzí není důkaz příčiny. Ukazoval jsem i naši [studii deNatura](https://pagespeed.one/denatura).

Mluvil jsem i o tom, že prodej není tlačení nabídky. Je to hledání potřeb, obav a překážek spolupráce.

Materiály k přednášce jsou na [webu PageSpeed.ONE](https://pagespeed.one/en/perfnow), včetně [slidů](https://docs.google.com/presentation/d/1SHA0xy27RFABVPZzyLpd6LoZRmbGV6E_nvQ5vT8jc1k/edit). Později přibude i plnohodnotný článek.

<figure>
<img src="/assets/img/content/dest/performance-now-2026-funnel.webp" alt="Osm kroků funnelu: od povědomí o rychlosti po dlouhodobou spolupráci">
<figcaption markdown="1">
*Funnel, kterým ve PageSpeed.ONE vedeme klienty od „web je pomalý“ k dlouhodobé práci na rychlosti. Zdroj: [materiály k přednášce](https://pagespeed.one/en/perfnow).*
</figcaption>
</figure>

Měl jsem radost, jak lidi zaujalo, že se specializujeme jen na rychlost webů a za poslední rok jsme obsloužili kolem 90 klientů. Otevřelo to hodně diskuzí během networkingu, které byly velmi zajímavé.

## Tři nejzajímavější přednášky z performance.now() 2026 {#tri-prednasky}

Z mého pohledu byly nejlepší tyhle tři přednášky:

**[Harry Roberts](https://speakerdeck.com/csswizardry/well-thats-weird)** ukazoval, jak pátrá po příčinách změn v datech — a jak snadno nás jedno číslo oklame. V jednom příkladu vypadal web pomalejší, dokud klient neprozradil agresivní kampaň ve frankofonních zemích: změnila se skladba návštěvníků, ne stránka. Jinde zase 75. percentil skoro nehnul, ale na [CDF grafu](https://fzakaria.com/2026/07/27/the-mean-means-nothing) bylo u 90. percentilu vidět zrychlení o 1,5 s. Harryho rada: nehodnoťte úspěch jedním percentilem a při before/after srovnávejte násobky sedmi dnů (a den nasazení vynechte).

**[Tammy Everts](https://speakerdeck.com/tammyeverts/performance-is-a-journey-perfnow-2026)** připomněla dva paradoxy, které webovou rychlost drží na místě. **Jevonsův paradox:** když se výkon zlevní, spotřebujeme úsporu na další funkce a složitost. **Wirthův zákon:** software bobtná rychleji, než zrychluje hardware, takže uživatelé zrychlení často vůbec nepocítí. A zelené [Core Web Vitals](../prirucka/web-vitals.md) ještě nemusí znamenat, že je web dost rychlý — limity Googlu jsou práh, ne cíl.

**[Annie Sullivan](https://docs.google.com/presentation/d/1lU6jNl1M4rO2ZK-jSH0Obt7knzNvoZQTKqUNWJ66D-k/edit)** změřila přes 90 000 živých „vibe-coded“ webů. V Android CrUX jich mělo dobré všechny Core Web Vitals jen **18,8 %**, zatímco u srovnatelně populárních běžných webů to bylo **52,1 %**. Funkční web za pár minut ještě nemusí být rychlý web.

<figure>
<img src="/assets/img/content/dest/performance-now-2026-talks.webp" alt="Koláž tří přednášek z performance.now(): Tammy Everts, Harry Roberts a přednáška Performance is cultural">
<figcaption markdown="1">
*Z programu: Tammy Everts, Harry Roberts a další silné momenty ze stage.*
</figcaption>
</figure>

## Co dalšího mě zaujalo {#dalsi}

- **[Risko Ruus](https://nullp2ike.github.io/perf-now-slides/)** ukázal performance očima testera. I [Lighthouse](../prirucka/lighthouse.md) může být užitečný, když pomáhá týmu včas zachytit zhoršení.
- **Tim Vereecke** dlouhodobě ladí svůj web. Jeho cíl? Dobré Core Web Vitals pro 99 % uživatelů. Geekovina, ale moc zajímavá a vtipná!
- **Stéphanie Walter** přemýšlí o rychlosti jako designérka. Co uživatel uvidí během čekání? A co když se něco nepovede? Má k tomu i [praktické materiály](https://shop.stephaniewalter.design/b/tools-to-design-performance).
- **[Max Inden](https://mxinden-bot.github.io/slides/15-perfnow/)** mluvil moc hezky a názorně o síťových roundtripech. K tématu doporučuji nástroj [Save a Round Trip](https://savearoundtrip.com/?d=cloudflare.com).

A pokud se v číslech trochu ztrácíte, mám na Vzhůru dolů průvodce [metrikami rychlosti](../prirucka/metriky-rychlosti.md) a [PageSpeed Insights](../prirucka/pagespeed-insights.md). Na PageSpeed.ONE je k tomu [slovník metrik](https://pagespeed.one/metriky) a [postup měření rychlosti](https://pagespeed.one/znalosti/mereni-rychlosti).

<figure>
<img src="/assets/img/content/dest/performance-now-2026-hall.webp" alt="Sál performance.now() s publikem a prezentací o CrUX a HTTP Archive">
<figcaption markdown="1">
*Sál performance.now() v Amsterodamu — publikum, stage a lustr v historické hale.*
</figcaption>
</figure>

## Atmosféra: miluju #perfnow a #amsterdam {#atmosfera}

Tohle se těžko předává, ale je podstatné. Zde je silná a přátelská komunita. Místo rozdávání vizitek si tu lidé raději vyměňují zkušenosti a technické nápady.

A do toho ten Amsterodam!

I'll be back!

<figure>
<img src="/assets/img/content/dest/performance-now-2026-amsterdam.webp" alt="Koláž z Amsterodamu: pohled z letadla, podzimní kanál a přístav s lodí">
<figcaption markdown="1">
*Amsterodam kolem konference — přílet, kanály a přístav.*
</figcaption>
</figure>

<small>*Byli jste na performance.now(), nebo řešíte u sebe podobné věci kolem argumentace ohledně rychlosti? Napište mi [e-mail](mailto:martin@pagespeed.cz)*</small>
