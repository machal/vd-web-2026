---
postID: 172
postTitle: 'Lighthouse 6: Co přinesla nová verze zásadního testovače webů?'
postUrlId: lighthouse-6
postDateTime: 2020-06-17
excerpt: 'Šestá verze populárního testovače webů přináší předělaný skóring rychlosti, řadu nových auditů a další novinky. Čtěte v článku.'
postStatus: Published
authorID: 1
sectionID: 1
category:
  - rychlost
  - nástroje
  - lighthouse
no_ads: false
include_rss: true
category_highlight: false
og_title: 'Lighthouse 6: Co přinesla nová verze zásadního testovače webů?'
og_description: 'Šestá verze populárního testovače webů přináší předělaný skóring rychlosti, řadu nových auditů a další novinky. Čtěte v článku.'
og_type: article
---

# Lighthouse 6: Co přinesla nová verze zásadního testovače webů?

Google nedávno [představil](https://web.dev/lighthouse-whats-new-6.0/) šestou verzi [nástroje Lighthouse](https://www.vzhurudolu.cz/prirucka/lighthouse), který nám webařům poslední léta velmi dobře slouží k testování rychlosti, přístupnosti, technického SEO a dalších osvědčených postupů.

<!-- AdSnippet -->

V prohlížeči Chrome bude k dispozici už od připravované verze 84. Na příkazové řádce a v online nástrojích jako je [web.dev/measure](https://web.dev/measure/), [PageSpeed Insights](https://www.vzhurudolu.cz/prirucka/pagespeed-insights) nebo v našem [PageSpeed.cz](https://pagespeed.cz/) jsou výsledky Lighthouse 6 dostupné už zhruba od prvního červnového týdne.

Jaké novinky přináší?

<!-- AdSnippet -->

Autoři aktualizovali zejména počítání skóre rychlosti. Přidali také nové audity, hlavně pro rychlost a přístupnost. Ale novinek je více. Následuje můj výběr.

## Rychlost: Web Vitals v centru pozornosti {#rychlost}

Borci a borkyně v Googlu nejvíce zamakali na testování [rychlosti stránek](https://www.vzhurudolu.cz/rychlost-nacitani), což je teď zásadní téma nejen pro ně, ale jak jste si všimli, i pro nás zde, na Vzhůru dolů.

* Nové metriky podle sady [Web Vitals](/prirucka/web-vitals): [LCP](/prirucka/metrika-lcp), [FID](/prirucka/metrika-fid) a [CLS](/prirucka/metrika-cls).
* Některé starší metriky už v Lighthouse nezobrazují: [FMP](/prirucka/metrika-fmp) (nespolehlivá, nahrazena LCP), First CPU Idle, Max Potential FID (nahrazeny FID). 
* Celkové [Lighthouse skóre (LPS)](https://www.vzhurudolu.cz/prirucka/metrika-lps) se počítá nejen s jinými metrikami, ale také s jinými váhami. Podívejte se na tabulku níže. 

Dojde tedy k celkové změně skóringu. Podle autorů výše odkazovaného článku je to spočítané tak, že zhruba pro 20 % webů uvidíte znatelně vyšší skóre, 30 % zůstane beze změn a u 50 % dojde k poklesu nejméně o pět bodů.

<figure>
<img src="https://res.cloudinary.com/vzhurudolu-cz/image/upload/v1592283002/vzhurudolu-blog/lighthouse-6-pagespeed_f7npmi.png" alt="Test rychlosti webu na PageSpeed.cz" width="1600" height="900">
<figcaption markdown="1">
*Obrázek: U některých webů si přechodu na Lighthouse šestku ničeho nevšimnete, u jiných nastal nemalý sešup ve skóringu. Zdroj: [PageSpeed.cz](https://pagespeed.cz/).*
</figcaption>
</figure>

Podívejme se teď přehledně, jak se změnily metriky a jejich váhy při přechodu mezi verzemi Lighthouse 5 a 6:

<div class="rwd-scrollable f-6"  markdown="1">

| Metrika                         | Váha ve verzi 5 | Váha ve verzi 6 |
|:--------------------------------|----------------:|----------------:|
| [First Contentful Paint (FCP)](/prirucka/metrika-fcp)    | 	23 %            | 15 % |
| [Speed Index (SI)](/prirucka/speedindex)                | 	27 %            | 15 % |
| [First Meaningful Paint (FMP)](/prirucka/metrika-fmp)    | 	7 %             | -    |
| [Largest Contentful Paint (LCP)](/prirucka/metrika-lcp)  | 	-               | 25 % |
| [Time To Interactive (TTI)](/prirucka/metrika-tti)       | 	33 %            | 15 % |
| First CPU Idle (FCI)            | 	13 %            | -    |
| Total Blocking Time (TBT)       | 	-               | 25 % |
| Max Potential FID               | 	0 %             | -    |
| [Cumulative Layout Shift (CLS)](/prirucka/metrika-cls)   | -               | 5 %  |

</div>

Šestá verze Lighthouse přidává také [podporu pro Performance Budgets](https://github.com/GoogleChrome/lighthouse/blob/master/docs/performance-budgets.md#timing-budgets) (limity rychlosti), kterými si můžete hlídat maximální hodnoty metrik u svých webů. Ta sice byla k dispozici už dříve, ale jen pomocí pluginu.

## Nové audity {#nove-audity}

Do Lighthouse přidali následující:

* Audit nepoužívaného JavaScriptu  (viz [web.dev](https://web.dev/lighthouse-whats-new-6.0/#unused-javascript))
* Rozšířené audity přístupnosti, díky knihovně `axe-core`. (viz [web.dev](https://web.dev/lighthouse-whats-new-6.0/#a11y))
* Audit [maskovatelných ikon](https://web.dev/maskable-icon/): (viz [web.dev](https://web.dev/lighthouse-whats-new-6.0/#maskable-icon))

## Další novinky {#dalsi}

Novinek je samozřejmě [více](https://web.dev/lighthouse-whats-new-6.0/), ale zde uvedu alespoň ty, které mě zaujaly:

* V Chrome DevTools se sekce Audits (kde byl přítomen vždy jen Lighthouse) přejmenuje logičtěji na „Lighthouse“.
* Lighthouse bude ve výchozím stavu vždy simulovat mobil a to konkrétně Moto G4. (viz [web.dev](https://web.dev/lighthouse-whats-new-6.0/#emulation))
* Aktualizované [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci), které umožňuje automatický běh nástroje při zpracování aplikace během continuous integration.
* Podpora source maps. Lighthouse začne podporovat propojení se zdrojovým kódem, nejprve pomocí tzv. „source links“ - odkazů na zdrojáky přímo z reportu Lighthouse. V dalších iteracích plánují analýzu JS kódu, opět na základě *map zdrojů*. Na to se moc těším!

Podívejte se na video od autorů prezentující „source links“:

<div class="rwd-media">
  <video autoplay muted controls width="2348" height="1282">
    <source src="https://res.cloudinary.com/vzhurudolu-cz/video/upload/v1592282993/vzhurudolu-blog/lighthouse-source-location_plxnh3.mp4"
      type="video/mp4">
  </video>
</div>

Testovat nový Lighthouse můžete z výše uvedených nástrojů, počkat si na nový Chrome nebo to zkusit z příkazové řádky:

```
npm install -g lighthouse
lighthouse https://www.example.com --view
```

Výsledky pro LPS (Lighthouse Performance Score) verze 6 už vrací náš [nástroj PageSpeed.cz](https://pagespeed.cz/).

<!-- AdSnippet -->