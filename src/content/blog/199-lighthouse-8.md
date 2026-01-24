---
postID: 199
postTitle: 'Co je nového v Lighthouse verze 8'
postUrlId: lighthouse-8
postDateTime: 2021-06-15
excerpt: 'Změna váh metrik, nové počítání CLS, Source Tree, třídění rad v auditu a tak dále. Osmá verze je zaměřená na rychlost. To samozřejmě stojí alespoň za krátký blogpost.'
postStatus: Published
authorID: 1
sectionID: 1
category:
  - rychlost
  - lighthouse
  - nástroje
  - rychlost-nacitani
no_ads: false
include_rss: true
category_highlight: true
og_title: 'Co je nového v Lighthouse verze 8'
og_description: 'Změna váh metrik, nové počítání CLS, Source Tree, třídění rad v auditu a tak dále. Osmá verze je zaměřená na rychlost. To samozřejmě stojí alespoň za krátký blogpost.'
og_type: article
---

# Co je nového v Lighthouse verze 8

Google před dvěma týdny vydal [osmou verzi](https://github.com/GoogleChrome/lighthouse/releases/tag/v8.0.0) populárního nástroje pro automatické testování rychlosti, přístupnosti a dalších aspektů webů — [Lighthouse](https://www.vzhurudolu.cz/prirucka/lighthouse). To samozřejmě stojí alespoň za krátký blogpost.

<!-- AdSnippet -->

Aktualizace se v této verzi týkají hlavně testování [rychlosti webů](https://www.vzhurudolu.cz/rychlost-nacitani). Na ty nejdůležitější se teď jdeme podívat.

## Změna váh jednotlivých metrik {#vahy}

Nové váhy, kterými se jednotlivé metriky projevují v celkovém [Lighthouse Performance Score](/prirucka/metrika-fcp) reflektují aktuální update vyhledávání Googlu zaměřený na [Page Experience](/prirucka/google-page-experience) a zohledňují tří nejdůležitější metriky [Core Web Vitals](/prirucka/web-vitals):

<div class="rwd-scrollable f-6"  markdown="1">

| Metrika                                                  | Váha v6 | Váha v8 | Rozdíl |
|:---------------------------------------------------------|--------:|--------:|-------:|
| [First Contentful Paint (FCP)](/prirucka/metrika-fcp)    | 15 % | 10 % | - 5  |
| [Speed Index (SI)](/prirucka/speedindex)                 | 15 % | 10 % | - 5  |
| [Largest Contentful Paint (LCP)](/prirucka/metrika-lcp)  | 25 % | 25 % | 0   |
| [Time To Interactive (TTI)](/prirucka/metrika-tti)       | 15 % | 10 % | - 5  |
| [Total Blocking Time (TBT)](/prirucka/metrika-tbt)       | 25 % | 30 % | + 5  |
| [Cumulative Layout Shift (CLS)](/prirucka/metrika-cls)   | 5 %  | 15 % | + 10 |

</div>

Všimněte si, že metrika Kumulativní posun layoutu (CLS) ztrojnásobila svůj vliv. Bodejď by ne, vždyť jde o jednu z Web Vitals.

Metriky Core Web Vitals teď mají 70procentní vliv na celkové skóre.

Ve stejném zdroji hledejme příčinu zvýšení vlivu Total Blocking Time. TBT sice není součástí Core Web Vitals, ale pro syntetická měření „zastupuje“ metriku [First Input Delay (FID)](/prirucka/metrika-cls). Obě měří jinak podobnou věc – javascriptový výkon.

Jaký vliv to bude mít na skóring vašich URL? Podle [FAQ od autorů Lighthouse](https://github.com/GoogleChrome/lighthouse/blob/master/docs/v8-perf-faq.md) ztratí zhruba pětina stránek o pět a více bodů a téměř třetina naopak o pět a více bodů získá navíc.

<blockquote class="twitter-tweet"><p lang="cs" dir="ltr">Přechod měření na <a href="https://twitter.com/hashtag/Lighthouse8?src=hash&amp;ref_src=twsrc%5Etfw">#Lighthouse8</a> některým webům vylepšil Lighthouse Performance Score (LPS). <br>Zde např. homepage <a href="https://twitter.com/tsbohemia?ref_src=twsrc%5Etfw">@tsbohemia</a>.<br>Podle autorů se skóring významněji zlepší u 30 % URL. <a href="https://t.co/XXGXQC7kaB">https://t.co/XXGXQC7kaB</a> <a href="https://t.co/5BnwkqH5LR">pic.twitter.com/5BnwkqH5LR</a></p>&mdash; PageSpeed.cz (@pagespeedcz) <a href="https://twitter.com/pagespeedcz/status/1404344772572164101?ref_src=twsrc%5Etfw">June 14, 2021</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

Pokud se chcete více hrabat ve vlivu jednotlivých metrik na celkové skóre, jako ideální nástroj doporučuji [kalkulačku Lighthouse skóre (LPS)](https://googlechrome.github.io/lighthouse/scorecalc/).

## Změna hodnotících křivek TBT a FCP {#tbt-fcp}

Metriky Total Blocking Time a First Contentful Paint byl zpřísněny. Nikoliv ale změnou hranic optimálních hodnot, ale změnou výpočetní křivky. Jsou to už poměrně detailní informace, které najdete na Github Issues: [TBT](https://github.com/GoogleChrome/lighthouse/pull/12576), [FCP](https://github.com/GoogleChrome/lighthouse/pull/12556).

## Aktualizace metriky CLS {#cls}

Možná víte, že [metrika CLS](/prirucka/metrika-cls) se v poslední době [nemálo změnila](https://web.dev/evolving-cls/) – počítá se během celé relace prohlížení stránky, dokud se neobjeví pětisekundové okno bez zaznamenaných posunů.

<!-- AdSnippet -->

Vliv na syntetické měření to ale mít nemá:

> … adjustment will likely not have much effect for the lab measurement, but instead will have a large effect on the field CLS for long-lived pages.

Nízký vliv CLS na dřívější skóring byl způsobený pravděpodobně tím, že šlo o novou metriku, jejíž algoritmus se navíc docela dost měnil. Lidé z Googlu vyloženě píší, že metrika už „dospěla“ a já doufám, že je to pravda a za půl roku se nebudeme muset učit další novou verzi.

## Do reportu přidali filtr metrik {#filtr-metrik}

Jelikož Lighthouse přidává stále více bodů do sekcí Příležitosti a Diagnostika, hodí se rozdělení do jednotlivých sekcí:

<div class="rwd-media">
  <video muted controls width="941" height="577">
    <source src="https://res.cloudinary.com/vzhurudolu-cz/video/upload/v1623740768/vzhurudolu-video/lighthouse-metric-filter_piyijt.mp4"
      type="video/mp4">
  </video>
</div>

Vy, kteří už jste mě někde slyšeli, možná víte, že k radám Lighthouse se pro pokročilejší optimalizaci rychlosti stavím poměrně skepticky. Nicméně pro základní práci na rychlosti je to výborné a filtr pomůže v přehlednosti.

## Lighthouse Treemap {#treemap}

Lighthouse Treemap (Stromová mapa) vezme vaše javascriptové buildy a vizualizuje jejich vnitřní dělení na menší soubory. Stromová mapa je nyní k dispozici ve všech hlavních klientech Lighthouse, například i v PageSpeed Insights.

<figure>
<img src="https://res.cloudinary.com/vzhurudolu-cz/image/upload/v1623741032/vzhurudolu-blog/lighthouse-treemap_nttduc.png" width="1600" height="900" alt="…">
<figcaption markdown="1">
*Lighthouse Treemap pro homepage Mall.cz v PageSpeed Insights.*
</figcaption>
</figure>

Podmínkou je, abyste k testovaném URL přiložili také [Source Maps](https://developer.mozilla.org/en-US/docs/Tools/Debugger/How_to/Use_a_source_map) (Mapy zdrojů). Pak je to velmi užitečné pro audit stránky. Co tam všechno uvidíte?

- Co je obsahem konkrétních souborů.
- Jaký je v těchto souborech podíl nevyužitého kódu.
- Zda nejsou některé moduly využívány duplicitně.

Přítomnost Treemap v PageSpeed Insights je skvělá zpráva.

## Další novinky {#dalsi}

Novinek mimo oblast Performance není mnoho, přibyl jen například audit best practice pro Content Security Policies a rozšířili testování přístupnosti. Tohle vydání je prostě hodně o rychlosti, což dává vzhledem ke změnám u Googlu, zohledňujícím Page Experience, velký smysl.

<!-- AdSnippet -->

Další novinky najdete přímo [v changelogu](https://github.com/GoogleChrome/lighthouse/releases/tag/v8.0.0) u vydání Lighthouse verze 8.

## Kde je Ligthouse 8 nasazený? {#kde}

Verze 8 populárního testeru je už nasazená v PageSpeed Insights, včetně API. K dispozici bude v DevTools od Chrome 93, už nyní pomocí osmičky můžete testovat v Chrome Canary.

Na osmou verzi přešla také většina nástrojů, které Lighthouse využívá interně, jako náš [tester na PageSpeed.cz](https://PageSpeed.cz):

<blockquote class="twitter-tweet"><p lang="cs" dir="ltr">Přechod měření na <a href="https://twitter.com/hashtag/Lighthouse8?src=hash&amp;ref_src=twsrc%5Etfw">#Lighthouse8</a> některým webům vylepšil Lighthouse Performance Score (LPS). <br>Zde např. homepage <a href="https://twitter.com/tsbohemia?ref_src=twsrc%5Etfw">@tsbohemia</a>.<br>Podle autorů se skóring významněji zlepší u 30 % URL. <a href="https://t.co/XXGXQC7kaB">https://t.co/XXGXQC7kaB</a> <a href="https://t.co/5BnwkqH5LR">pic.twitter.com/5BnwkqH5LR</a></p>&mdash; PageSpeed.cz (@pagespeedcz) <a href="https://twitter.com/pagespeedcz/status/1404344772572164101?ref_src=twsrc%5Etfw">June 14, 2021</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

Co na novinky v osmé verzi Lighthouse říkáte vy?