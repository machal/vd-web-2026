---
postID: 243
postTitle: 'Prakticky o GraphQL s Michalem Sangerem'
postUrlId: podcast-graphql
postDateTime: 2024-04-24
excerpt: 'V tomto díle se ponoříme do světa GraphQL s Michalem Sängerem z Trezoru. Probíráme, v jakých situacích nemusí být GraphQL ideální a naopak, kde najde své místo.'
postStatus: Published
authorID: 1
sectionID: 1
category:
  - graphql
  - javascript
  - react
no_ads: true
include_rss: true
category_highlight: true
og_title: 'Prakticky o GraphQL s Michalem Sangerem'
og_description: 'V tomto díle se ponoříme do světa GraphQL s Michalem Sängerem z Trezoru. Probíráme, v jakých situacích nemusí být GraphQL ideální a naopak, kde najde své místo.'
og_type: article
---

# Prakticky o GraphQL s Michalem Sangerem

V tomto díle se ponoříme do světa GraphQL s Michalem Sängerem z Trezoru. Probíráme v jakých situacích nemusí být „grafko“ ideální a naopak, kde jednoznačně našlo své místo.

Prozkoumáme nástroje jako Relay a Apollo, podíváme se na složitosti kolem federace a Michal nabízí řadu zkušeností a zajímavých názorů na ekosystém kolem téhle technologie.

Prostě GraphQL projdeme tak nějak sakum prdum. Doufáme, že se vám 52. díl podcastu bude líbit!

## Podcast {#podcast}

<div class="rwd-media">
<iframe style="border-radius:12px" src="https://open.spotify.com/embed/episode/33Yz0I8s5faL2PK0m7yDtt?utm_source=generator" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
</div>

## Celá epizoda na videu {#video}

<div class="rwd-media">
<iframe width="560" height="315" src="https://www.youtube.com/embed/MgyVcB0jhtY?si=Moboa-JZ2G5ANshB" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>

## Host: Michal Sanger {#host}

<div class="row f-6 mt-0 mb-1-5">
<div class="col w-25-xs" markdown="1">

![Michal Sänger](https://res.cloudinary.com/vzhurudolu-cz/image/upload/v1713934850/vzhurudolu-podcast/michal-sanger_vttfzt.jpg)

</div>
<div class="col w-75-xs" markdown="1">

Michal je milovník dobrého jídla a zkušený javascriptový vývojář, který sbíral ostruhy mimojiné v Kiwi.com a Pipedrive. S nadhledem říká, že se o GraphQL zajímá zhruba od roku 1990. Prostě dlouho. Nyní GraphQL a jiné technologie krotí [Trezoru](https://trezor.io/).

[LinkedIn](https://www.linkedin.com/in/michalsanger/) – [X](https://x.com/sangernatripu) – [SangerNaTripu.cz](https://sangernatripu.cz/)

</div>
</div>


## K čemu jsme došli? {#dosli}

* GraphQL se výborně hodí pro mezivrstvu client/server, jakožto typované API. React ekosystém je pro to dělaný. Dále je skvělé pro sdílení API například pro mobilní web, nativní appku atd.
* Komunita, zdá se, naopak dochází k tomu, že GraphQL se nehodí pro potřeby veřejných API. Ani největší hráči do využití pro veřejná API nešli a například Github od toho ustupuje. Je to náročné na údržbu, ale důvodů je více. Další příkladem, kde se GraphQL neujalo je komunikace server/server. Backendisti ke GraphQL nemají zase tak blízko, a celkově je tato technologie pro tyto potřeby zbytečně komplikovaná.
* Podle Michala je nejlepší pojetí takové, že frontendisti si řeší jak frontend kód, tak  GraphQL vrstvu, tedy nějakou formu přemapování dat z backendu. Frontend v tomto směru Michal bere jako „interního zákazníka“.
* Z klientských knihoven Michal upřednosťnuje [Relay](https://relay.dev/). Jak říká, „Relay je trochu své“, a nevýhodou je určitá komplexita zavádění. Vyplatí se prý ale do Relay zainvestovat čas a úsilí.
* Co se týká [federace](https://medium.com/@luishrsoares/what-is-graphql-federation-26545a64cbb), podle Michala je to extra složitost, které nefandí. Říká, že ani Facebook nemá federaci. Určité alternativy nabídl Michal ve své nedávné [přednášce na WebExpo](https://www.webexpo.net/prague2022/talk/graphql-at-scale.html).  

Michal ještě bonusově doporučuje podzimní [konferenci GraphQLConf](https://graphql.org/conf/2024/) a newsletter [GraphQL Weekly](https://www.graphqlweekly.com/).

## O čem všem se bavíme? {#obsah}

* Martinův tip pro vynervované přednášející ([Lenny Rachitsky](https://www.lennysnewsletter.com/p/how-to-speak-more-confidently-and)) **(0:50)**
* Robinův tip: [Comic Agile](https://www.comicagile.net/) (a dodatečný tip na [Marketoonist](https://marketoonist.com/)) **(3:20)**
* Pozvánka na LIVE natáčení podcastu na WebExpo **(5:40)**
* Představení Michala Sängera  **(7:20)**
* Co se dělo v GraphQL za posledních 5 let? Konsolidace **(9:20)**
* Jaký způsoby využití jsou pro GraphQL vhodné a jaké méně **(14:30)**
* Diskuze i „edge computingu“ pro data fetching **(24:20)**
* Klientské knihovny: proč [Relay](https://relay.dev/) a proč ne [Apollo](https://www.apollographql.com/) **(27:00)**
* Proč Michal nemá rád [federaci](https://medium.com/@luishrsoares/what-is-graphql-federation-26545a64cbb) **(35:00)**
* Facebook nemá federaciMichalova [přednáška na WebExpu](https://www.webexpo.net/prague2022/talk/graphql-at-scale.html) **(41:30)**
* [Defer](https://www.apollographql.com/tutorials/getting-started-with-graphos/08-using-defer), prioritizace a performance **(44:30)**
* [Subscriptions](https://graphql.org/blog/2015-10-16-subscriptions/) a proč jsou těžké **(49:40)**
* Dotazy: [tRPC](https://trpc.io/) vs GraphQL **(52:30)**
* Dotazy: Dokumentace **(55:45)**  

Děkujeme za spolupráci: Honza Michálek (Milíčovská postprodukce).

## Odebírejte podcast ze Vzhůru dolů {#odber}

[Spotify](https://open.spotify.com/show/1G2kH2YrIwD9BABg4L7xGC) – [Apple Podcasts](https://itunes.apple.com/cz/podcast/vzhuru-dolu-podcast/id1176274658) – [Google Podcasty](https://podcasts.google.com/feed/aHR0cHM6Ly9hbmNob3IuZm0vcy84MjMxMmViNC9wb2RjYXN0L3Jzcw?hl=cs) – [TuneIn](https://tunein.com/podcasts/Technology-News/Vzhuru-dolu-podcast-p1177693/) – [RSS podcastů](https://anchor.fm/s/82312eb4/podcast/rss)  

Nápad? Chyba? Připomínka? Pochvala? Pište nám na e-mail [podcast@vzhurudolu.cz](mailto:podcast@vzhurudolu.cz) nebo kamkoliv jinam. Hlavně, aby se to k nám dostalo.  

Přejeme vám příjemný poslech!