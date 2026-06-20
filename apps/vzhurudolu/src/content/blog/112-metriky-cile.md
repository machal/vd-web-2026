---
postID: 112
postTitle: 'Ideální hodnoty metrik rychlosti načítání'
postUrlId: metriky-cile
postDateTime: 2018-07-03
excerpt: 'Zkusme si je vypočíst podle interních hodnot nástroje Lighthouse.'
postStatus: Published
authorID: 1
sectionID: 1
category: ['rychlost-nacitani']
no_ads: false
include_rss: true
category_highlight: true
og_title: 'Ideální hodnoty metrik rychlosti načítání'
og_description: 'Zkusme si je vypočíst podle interních hodnot nástroje Lighthouse.'
og_type: article
---
# Ideální hodnoty metrik rychlosti načítání

Jaké jsou cílové hodnoty [metrik](/prirucka/metriky-rychlosti) jako Speed Index nebo Time To Interactive?

Ideálně co nejblíže nule a maximálně o 20 % lepší než u nejlepší konkurence.

OK, ale tohle může někomu znít vágně. Existují nějaké doporučované hodnoty, například od Google? Moc ne, nebo jsem je alespoň nenašel. 

<!-- AdSnippet -->

Můžeme ale vyjít z interních dat nástroje [Lighthouse](https://developers.google.com/web/tools/lighthouse/). Ten má vestavěné určité hranice, za které vám dá 100 % hodnocení. Viz následující tabulka:

<div class="rwd-scrollable"  markdown="1"> 

| Metrika                | Cíl ve verzi 2 | Cíl ve verzi 3 |
|------------------------|---------------:|---------------:|
| First Contentful Paint |              - |       1 300 ms |
| First Meaningful Paint |       1 600 ms |       1 300 ms |
| First CPU Idle         |              - |       1 900 ms |
| Time To Interactive    |       5 000 ms |       1 900 ms |
| Speed Index            |          1 250 |          1 900 |

</div>

Zdroje:

- Pro Lighthouse verzi 2: Článek [Score a perfect 100 in Lighthouse audits — Part 1](https://medium.com/@aswin_s/score-a-perfect-100-in-lighthouse-audits-part-1-3199163037).
- Pro verzi 3: [Tabulka](https://docs.google.com/spreadsheets/d/1lBGOHbJ3X3eYgXpvlvX6Q5Dmrod7jRfhifYqMzK3WX4/edit?usp=sharing) založená na [kalkulačce hodnot](https://docs.google.com/spreadsheets/d/1Cxzhy5ecqJCucdf1M0iOzM8mIxNc7mmx107o5nj38Eo/edit#gid=283330180) od autorů Lighthouse. Jde o zaokrouhlené hodnoty. Přesná čísla pro zisk 100 % hodnocení budou mírně jiná.

V nápovědě Lighthouse jsou [detaily k metodice](https://developers.google.com/web/tools/lighthouse/v3/scoring#perf-scoring) hodnocení:

> The scoring distribution is a log normal distribution derived from the performance metrics of real website performance data on HTTPArchive. A score of 100 typically maps to the 98th percentile for that audit. A score of 50 maps to the 75th percentile. In other words, if you get a score of 100, it means that your page performs better in that audit than 98% of pages on the web.

<!-- AdSnippet -->

Upozorňuji, že ve výchozím nastavení Lighthouse měří na rychlosti „3G Slow“. Ano, cílové metriky jsou přísné. Nebo – v kontextu většiny webů, u kterých jsem kdy rychlost testoval – *aktuálně nedostižné*. 


## Váhy metrik

V tabulce si nelze nevšimnout, že různé metriky mají různé váhy. Podle tvůrců Lighthouse je pořadí důležitosti následující:

1. Time To Interactive
2. Speed Index
3. First Contentful Paint
4. First CPU Idle
5. First Meaningful Paint

<!-- AdSnippet -->