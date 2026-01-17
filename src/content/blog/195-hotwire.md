---
postID: 195
postTitle: 'Hotwire: Ze serveru na klienta a zase zpět'
postUrlId: hotwire
postDateTime: 2021-04-21
excerpt: 'Hotwire je alternativní přístup k vytváření moderních webových aplikací bez použití velkého množství JavaScriptu zasíláním HTML namísto JSON.'
postStatus: Published
authorID: 1
sectionID: 1
category:
  - rychlost
  - js
no_ads: false
include_rss: true
category_highlight: true
og_title: 'Hotwire: Ze serveru na klienta a zase zpět'
og_description: 'Hotwire je alternativní přístup k vytváření moderních webových aplikací bez použití velkého množství JavaScriptu zasíláním HTML namísto JSON.'
og_type: article
---

# Hotwire: Ze serveru na klienta a zase zpět

[Hotwire](https://hotwire.dev/) je „krásná nová věc“ ze světa frameworku Ruby on Rails. Jde o zastřešující název pro balíček knihoven. To podstatné je řečeno hned zkraje:

<figure>
<img src="https://res.cloudinary.com/vzhurudolu-cz/image/upload/v1618979400/vzhurudolu-blog/hotwire_i3n8sn.png" width="1600" height="900" alt="…">
<figcaption markdown="1">
Hotwire je alternativní přístup k vytváření moderních webových aplikací bez použití velkého množství JavaScriptu zasíláním HTML namísto JSON, říká text na titulce.
</figcaption>
</figure>

Hotwire jde proti aktuálnímu trendu javascriptových klientských aplikací (SPA), které se naopak snaží klienta vytěžit co nejvíce.

Do architektury moderních webových aplikací, ať už jde o server nebo klienta, zase tak moc nevidím, ale velmi mě to zajímá z pohledu toho, co mě živí – [rychlosti](https://www.vzhurudolu.cz/rychlost-nacitani), nebo chcete-li performance. Ještě jsem neviděl web, kde by tuny JavaScriptu zpracovávané na klientovi, vedly k pěknému uživatelskému zážitku, minimálně ne při prvním vstupu.

Ještě dál jde Matt E. Patterson v zajímavém textu s poněkud provokativním titulkem [The Future of Web Software Is HTML-over-WebSockets](https://alistapart.com/article/the-future-of-web-software-is-html-over-websockets/). Autor se pohybuje ve světě Ruby on Rails, takže titulek (a vlastně všechno) berte s rezervou, ale určitě je zajímavé si to přečíst.

Javascriptové frameworky s příchodem Angularu a Reactu umí vyřešit problémy, které jsme dříve řešit neuměli, „reaktivita“ při interakcích s aplikací přinesla zásadní benefity z pohledu UX a na fakturách za servery viditelně šetříme:

> „Server“ byl odsunut výlučně k hostování datové služby API,
> přičemž většina business logiky a veškerého vykreslování HTML
> se děje na klientovi.

Jenže náklady dnes netvoří ani tak infrastruktura jako platy vývojářů. U složitějších aplikací potřebujeme kromě frontendistů ještě backendisty, což komplikuje komunikaci a zvyšuje náklady. A pak je tu ten [vliv JS frameworků na rychlost](https://www.vzhurudolu.cz/blog/174-js-frameworky-rychlost).

## Co nabízí Hotwire?

Programátoři backendových aplikací ze světa Ruby on Rails s pomocí balíčku knihoven z Hotwire budou prý schopni dosáhnout podobné interaktivity jakou zajišťují javascriptové SPA.

Je to založené na WebSockets, které umožňují rychlý oboustranný přenos dat. Na klientovi neparsujeme JSON, ale do stránky prostě vkládáme kousky HTML, což je samozřejmě výkonnostně pro klienta daleko méně náročné.

<!-- AdSnippet -->

Matt E. Peterson uvádí příklad s našeptávačem: Při každém stisknutí klávesy odešlete dotaz na server přes WebSockets, zpět do klienta dostáváme změněnou sadu značek `<option>`.

Silný server, tenký klient. Takže jsme tam, kde jsme byli. Tyto technologie i postupy jsou známy a používány už léta. Tak jasně, málokdo má koule, aby takové věci říkal NEW MAGIC jako David Heinemeier Hansson, že ano:

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Hotwire aka NEW MAGIC is finally here: An alternative approach to building modern web applications without using much JavaScript by sending HTML instead of JSON over the wire. This includes our brand-new Turbo framework and pairs with Stimulus 2.0 <a href="https://t.co/Pa4EG8Av5E">https://t.co/Pa4EG8Av5E</a></p>— DHH (@dhh) <a href="https://twitter.com/dhh/status/1341420143239450624?ref_src=twsrc%5Etfw">December 22, 2020</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

Ale znáte to – staré technologie se objevují v nových kontextech, aby další generaci vývojářek a vývojářů otevřely oči. Proč ne, když to něčemu pomůže:

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Progressive enhancement gets repackaged and released as "new magic" time and time again, but seriously if it gets more people doing it, it's a good thing.</p>— Jake Archibald (@jaffathecake) <a href="https://twitter.com/jaffathecake/status/1341654795413762048?ref_src=twsrc%5Etfw">December 23, 2020</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

A co ta rychlost?

## Srovnání vstupní rychlosti Gmailu a Hey.com

[Gmail](https://gmail.com/) asi znáte, ale možná nevíte, že je to klasická klientská javascriptová SPA. Klient stáhne HTML, v něm skoro nic není, jen javascriptový soubor, ten začne stahovat další JS soubory, spoustu JSONů…

No a výsledek je takový, jaký byste čekali.

<figure>
<img src="https://res.cloudinary.com/vzhurudolu-cz/image/upload/v1618979400/vzhurudolu-blog/hotwire-gmail_j6nkwi.png" width="1600" height="900" alt="…">
<figcaption markdown="1">
Lighthouse test pro Gmail.
</figcaption>
</figure>

[Hey.com](http://hey.com/) je e-mailový klient z dílny Basecamp, kde dámy a pánové implementovali právě sadu Hotwire.

Výsledek je trapně dobrý, jako z nějaké korporátní případovky o rychlosti webu.

<figure>
<img src="https://res.cloudinary.com/vzhurudolu-cz/image/upload/v1618979400/vzhurudolu-blog/hotwire-hey_ck68wf.png" width="1600" height="900" alt="…">
<figcaption markdown="1">
Lighthouse test pro Hey.com.
</figcaption>
</figure>

Vy, kteří umíte číst výsledky [Lighthouse](https://www.vzhurudolu.cz/prirucka/lighthouse), asi od boku řeknete: Ano, ty rozdíly tady dělá JavaScript. Vy ostatní se podívejte na metriku [Total Blocking Time](https://www.vzhurudolu.cz/prirucka/metrika-tbt).

Tohle srovnání je dělané opravdu z voleje. První, které mě napadlo. Pravděpodobně porovnávám z pohledu performance špatně napsanou klientskou javascriptovou aplikaci (Gmail stahuje přes 8 MB dat, z toho 2,5 MB v JS), s odladěným Hey.com, který autoři používají jako případovku pro svůj devstack. Aplikaci, která umí běžet offline (Gmail) s aplikací, která to neumí. A tak dále. Ale i tak… z pohledu rychlosti to rozhodně zajímavé je.

Jsem fakt zvědavý, jak na to budou reagovat vývojáři a další frontendové i backendové frameworky.

Pokud bychom se dívali na vývoj webů jako jednolitý proud a Hotwire jako nový „trend“, pak jde o zpátečku a přesun zpět na server. Jenže takhle to není. 

Weboví vývojáři už jsou dneska uzavření ve světech svých platforem – máme tu frontendisty (mezi nimi angularisty, vuečkaře, reactisty…), péhápkáře, vývojáře na technologiích Microsoftu a pak vývojáře ze světa Ruby on Rails.

Takže vlastně by mě nejvíc zajímalo, jestli jsou myšlenky z technologie jako je Hotwire přenositelné do jiných světů.

Dodatek: Čtenář Jan Oppolzer píše, že v ekosystému péhápkovského frameworku Laravel se objevilo podobné řešení jménem [Livewire](https://laravel-livewire.com/). 

<!-- AdSnippet -->