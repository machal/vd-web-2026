---
postID: 222
postTitle: 'Lighthouse 10 a změny v počítání Lighthouse Score'
postUrlId: lighthouse-10
postDateTime: 2023-02-05
excerpt: 'Přednost dostanou metriky Web Vitals. Metrika TTI (Time To Interactive) naopak ze skóre a viditelných reportů úplně mizí.'
postStatus: Published
authorID: 1
sectionID: 1
category:
  - lighthouse
  - rychlost
  - rychlost-webu
  - pagespeed
  - rychlost-nacitani
no_ads: false
include_rss: true
category_highlight: true
og_title: 'Lighthouse 10 a změny v počítání Lighthouse Score'
og_description: 'Přednost dostanou metriky Web Vitals. Metrika TTI (Time To Interactive) naopak ze skóre a viditelných reportů úplně mizí.'
og_type: article
---

# Lighthouse 10 a změny v počítání Lighthouse Score

Nová, už desátá verze, nástroje pro audit webu Lighthouse mění způsob počítání Lighthouse Score.

Přednost dostanou metriky [Web Vitals](https://www.vzhurudolu.cz/prirucka/web-vitals). Metrika [TTI (Time To Interactive)](https://www.vzhurudolu.cz/prirucka/metrika-tti) naopak ze skóre a viditelných reportů úplně mizí.

<figure>
<img src="../dist/images/original/lighthouse-calculator.jpg" alt="Lighthouse score">
<figcaption markdown="1">
*Obrázek: Zase je to trochu jinak. Jinak a lépe.*
</figcaption>
</figure>

Aktuální vliv metrik na celkové skóre je tedy následující:

* [TBT (Total Blocking Time)](https://www.vzhurudolu.cz/prirucka/metrika-tbt) = 30 %
* [LCP (Largest Contentful Paint)](https://www.vzhurudolu.cz/prirucka/metrika-lcp) = 25 %
* [CLS (Cumulative Layout Shift)](https://www.vzhurudolu.cz/prirucka/metrika-cls) = 25 %
* [FCP (First Contentful Paint)](https://www.vzhurudolu.cz/prirucka/metrika-fcp) = 10 %
* [SI (Speed Index)](https://www.vzhurudolu.cz/prirucka/speedindex) = 10 %

Z mého pohledu je to dobře, protože to skóring alespoň trochu přibližuje principu tří metrik Web Vitas. Je to dobře i proto, že TTI je sice pro odborníka zajímavou metrikou, nicméně laika může svým specifickým výpočtem velmi zmást.

TTI metrika „interaktivity po načtení", takže je nahraditelná metrikou načtení (LCP) v kombinaci s metrikou interaktivity (v Lighthouse TBT, u uživatelů FID a do budoucna nejspíš [INP, Interaction to Next Paint](https://www.vzhurudolu.cz/prirucka/metrika-inp)).

<!-- AdSnippet -->

Jen pozor, aktualizace metrik nic nemění na faktu, že [Lighthouse Score](https://www.vzhurudolu.cz/prirucka/metrika-lps) není zase tak dobrý indikátor rychlosti webu. Je totiž měřené na velmi specifických zařízení a ze specifických míst světa. Pro středoevropské prostředí bývá zbytečně přísná.

Pokud je to možné, vždy dávejte přednost Web Vitals získanými přímo od uživatelů, z Chrome UX Reportu.

## Další novinky v Lighthouse 10 {#dalsi}

Můžeme se ale těšit i na další inovace v reportech Lighthouse:

* [Audit Back/forward cache](https://developer.chrome.com/docs/lighthouse/performance/bf-cache/), velmi zajímavé [nové vlastnosti Chrome](https://web.dev/bfcache/), která dokáže weby u uživatelů vcelku slušně zrychlit.
* [Audit bránění uživatelům](https://developer.chrome.com/docs/lighthouse/best-practices/paste-preventing-inputs/) vložit heslo ze schránky.
* Lighthouse 10 také přichází s deklaracemi typů TypeScriptu. Cokoli importovaného z Lighthouse by nyní mělo být typováno.

<!-- AdSnippet -->

Kdy se na to můžeme těšit?

Už brzy se to objeví v [Chrome 112](https://chromestatus.com/roadmap), [PageSpeed Insights](https://www.vzhurudolu.cz/prirucka/pagespeed-insights), jejich API, a tedy i našem [testeru na PageSpeed.ONE](https://app.pagespeed.cz/).