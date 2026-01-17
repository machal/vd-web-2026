---
postID: 206
postTitle: 'Lighthouse ve verzi 9: přepracované UI a User Flows'
postUrlId: lighthouse-9
postDateTime: 2021-11-23
excerpt: 'Nová verze nástroje pro audit webu Lighthouse přináší přepracované rozhraní testů, nové PageSpeed Insights a také User Flows, možnost testovat průchod uživatele službou, včetně jeho interakcí.'
postStatus: Published
authorID: 1
sectionID: 1
category:
  - lighthouse
  - nástroje
  - rychlost
no_ads: false
include_rss: true
category_highlight: true
og_title: 'Lighthouse ve verzi 9: přepracované UI a User Flows'
og_description: 'Nová verze nástroje pro audit webu Lighthouse přináší přepracované rozhraní testů, nové PageSpeed Insights a také User Flows, možnost testovat průchod uživatele službou, včetně jeho interakcí.'
og_type: article
---

# Lighthouse ve verzi 9: přepracované UI a User Flows

Nástroj pro [audit webu Lighthouse](https://www.vzhurudolu.cz/prirucka/lighthouse) vyšel [v deváté verzi](https://developer.chrome.com/blog/lighthouse-9-0/). Musím tomu věnovat alespoň stručnou poznámku, protože přináší minimálně dvě zajímavé novinky. 

No a taky je to už tradice. Na Vzhůru dolů se tomuhle nástroji věnuji pravidelně. Psal jsem zápisky například k [verzi 8](https://www.vzhurudolu.cz/blog/199-lighthouse-8) nebo [6](https://www.vzhurudolu.cz/blog/172-lighthouse-6).

<figure>
<img src="../dist/images/original/lighthouse-chrome.png" alt="Lighthouse 9 v Chrome">
<figcaption markdown="1">
Nový Lighthouse 9 v Chrome.
</figcaption>
</figure>

<!-- AdSnippet -->

V devátém vydání přinesli autoři nástroje z Googlu zejména razantně předělané rozhraní výsledků testu, včetně těch na PageSpeed Insights, ale hlavně User Flows.

## User Flows, průchod uživatele službou {#user-flows}

Velkou nevýhodou Lighthouse byla možnost testovat jen první načtení stránky. Ano, určité výjimky existovaly – například při testování v Chrome bylo možné nastavit, zda vytvořit audit s plnou nebo prázdnou keší prohlížeče.

[User Flows](https://web.dev/lighthouse-user-flows/) umožňují skriptované testování. Lighthouse tak můžete pouštět v rámci jednoho testu vícekrát – ať už jde o načtení různých stránek nebo spouštění na základě interakcí na stránce.

<div class="rwd-media">
<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/xL-tXZ8Z_qU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

Nově tak budete moci testovat například tyto scénáře:

1. Průchod uživatele webem – testem si nasimulujete procházení uživatele například nákupním procesem na e-shopu.
2. Interakce uživatele se stránkou – Lighthouse nemusíte pouštět jen při úvodním načtení, ale také například po kliknutí na element nebo scrollování.

Posbíráte metriky a vzniklé problémy. Fixnete to. Pustíte test znova. To se mi líbí.

Dosud bylo možné skriptovat testy rychlosti například pomocí proprietárního rozhraní [skriptů ve WebpageTestu](https://github.com/t32k/webpagetest-doc-ja/blob/master/using-webpagetest/scripting/index.md). Ale přítomnost v Lighthouse je důležitá, jde o nejpoužívanější nástroj pro testování webů. Navíc to zde udělali pomocí už poměrně standardizovaného API pro ovládání Chrome zvaného [Puppeteer](https://github.com/puppeteer/puppeteer).

Autoři Chrome nyní ve verzi Canary testují možnost si uživatelský proces naklikat pomocí nástroje [Recorder](https://developer.chrome.com/docs/devtools/recorder/). I tohle vypadá zajímavě. Hlavně pro ty, kteří raději klikají než píší javascriptový kód.

<div class="rwd-media">
  <video muted controls width="1600" height="900">
    <source src="https://res.cloudinary.com/vzhurudolu-cz/video/upload/v1637639909/chrome-recorder_atmhrx.mp4"
      type="video/mp4">
  </video>
</div>

## Nové rozhraní výsledku testu

Další velkou změnou je vylepšené rozhraní výsledků testu. Ukažme si to na příkladu testu oblasti Performance pro úvodní stránku Vzhůru dolů:

<figure>
<img src="../dist/images/original/lighthouse-user-flows.png" alt="Lighthouse User Flows">
<figcaption markdown="1">
Lighthouse User Flows.
</figcaption>
</figure>

Můžete tady vidět hned několik novinek:

1. Celkové skóre je trochu menší a vedle je nově screenshot hotové stránky. To abyste lépe viděli. Viděli, jak vypadala stránka při dokončení testu. To se hodí, protože Lighthouse často testuje web ve stavu, v jakém jej vy nevidíte -- například s cookie lištou.
2. Jednotlivé metriky, ze kterých se skládá [celkové skóre (LPS)](https://www.vzhurudolu.cz/prirucka/metrika-lps), jsou nyní větší. I to hodnotím kladně – zaměří to pozornost lidí na správné místo, tedy nikoliv LPS, ale konkrétní ukazatele, které je potřeba optimalizovat.
3. V každém testu, včetně toho na PageSpeed Insights, je nyní lépe vidět nastavení testu - na jakém zařízení a odkud proběhl. To je důležité pro pochopení rozdílů mezi Lighthouse testy, které mohou být i dost velké.

Všechny novinky se rovnou projevily také v [PageSpeed Insights](https://www.vzhurudolu.cz/prirucka/pagespeed-insights), asi nejpopulárnějším nástroji pro jednorázový test rychlosti webu.

Nově je najdete na adrese: [pagespeed.web.dev](https://pagespeed.web.dev/)

<!-- AdSnippet -->

PageSpeed Insights dávají nově také větší důraz na metriky od uživatelů z [Chrome UX Reportu](https://www.vzhurudolu.cz/prirucka/chrome-ux-report). To je bezpochyby chvályhodné, protože to je nejlepší způsob, jak se zdarma k číslům o rychlosti dostat.

Na druhou stranu – metriky posbírané od uživatelů jsou k dispozici jen pro více navštěvované weby, takže nové pojetí výsledků bude řadu lidí mást.

V oblasti „web performance", rychlosti webu, jsou laici obecně dost v pasti mezi srozumitelností podávaných informací a jejich přesností. Ale to je na jiné povídání a jiný článek.

Výsledky testů z Lighthouse 9 už také uvidíte v našem [testeru rychlosti na PageSpeed.cz](https://pagespeed.cz/).

<!-- AdSnippet -->

Všechny novinky z Lighthouse 9 si můžete přečíst [v changelogu](https://github.com/GoogleChrome/lighthouse/releases/tag/v9.0.0).