---
postID: 215
postTitle: 'Jak prohlížeče směřují od konkurence ke spolupráci (frontendová keynote z WebExpo 2022)'
postUrlId: webexpo-2022-prohlizece
postDateTime: 2022-06-15
excerpt: 'Na letošním WebExpu jsem uvedl program dodávaný naší komunitou Frontendisti.cz krátkou keynote o zásadních změnách, které se aktuálně dějí ve vývoji prohlížečů.'
postStatus: Published
authorID: 1
sectionID: 1
category:
  - prohlížeče
  - webexpo
  - css
  - html
no_ads: false
include_rss: true
category_highlight: true
og_title: 'Jak prohlížeče směřují od konkurence ke spolupráci (frontendová keynote z WebExpo 2022)'
og_description: 'Na letošním WebExpu jsem uvedl program dodávaný naší komunitou Frontendisti.cz krátkou keynote o zásadních změnách, které se aktuálně dějí ve vývoji prohlížečů.'
og_type: article
---

# Jak prohlížeče směřují od konkurence ke spolupráci (frontendová keynote z WebExpo 2022)

Na [letošním WebExpu](https://www.vzhurudolu.cz/blog/214-webexpo-2022) jsem uvedl program dodávaný naší [komunitou Frontendisti.cz](https://frontendisti.cz/) krátkou keynote o zásadních změnách, které se aktuálně dějí ve vývoji prohlížečů.

Zde je její obsah v textové podobě, ale můžete se také podívat na [prezentaci](https://www.slideshare.net/machal/browsers-from-competition-to-collaboration) nebo [video](https://slideslive.com/38984448/frontend-keynote-frontendisti?ref=folder-104209).

<figure>
<img src="https://res.cloudinary.com/vzhurudolu-cz/image/upload/v1655268895/vzhurudolu-blog/webexpo-22-mm_tsm9hb.jpg" width="1600" height="900" alt="Frontendová keynote na WebExpo 2022.">
<figcaption markdown="1">
*Frontendová keynote na WebExpo 2022. Nějaký pán tam něco tlachal o prohlížečích.*
</figcaption>
</figure>

Chci dnes mluvit o našich milovaných prohlížečích. Chci mluvit o tom, co se na nich v posledním roce tolik změnilo.

Můj vztah s prohlížeči začal v roce 1996. Když jsem přišel na vysokou školu, většina uživatelů tehdejšího internetu používala Netscape Navigator. Nesnášel jsem ho, byl plný chyb.

Na trhu se ale objevil nový a progresivní prohlížeč – [Internet Explorer](https://www.vzhurudolu.cz/prirucka/msie) od společnosti Microsoft. V té době nám to ještě připadalo skvělé.

## Éra dominance jednoho prohlížeče

Vysokou školu jsem dokončil v roce 2000. V té době už s prohlížeči bylo všechno jinak. Většina trhu patřila Microsoftu jeho prohlížeči.

O čtyři roky později to bylo ještě horší. V té době se zdálo, že na světě existuje jen jeden prohlížeč. Internet Explorer.

<!-- AdSnippet -->

Vývojáři začali na své stránky umisťovat takovéto ikony jako „Optimalizováno pro Internet Explorer".

Bylo to však zvláštní, protože Microsoft se nepodílel na webových standardech, ale vytvářel své vlastní. Měli jsme tak dvě verze standardů – teoretické oficiální od W3C a pak ty od Microsoftu, které prakticky válcovaly trh.

## 2022: Co se mění?

Přejděme do letoška. Situace už je úplná jiná. Všechny velké technologické společnosti včetně Microsoftu pracují na webových standardech v rámci konsorcia W3C. 

Máme tu však jiný problém. Různé prohlížeče mají různé priority z pohledu práce na podpoře některých webových standardů. Takže na některé nové funkce čekáme dlouho.

<figure>
<img src="https://res.cloudinary.com/vzhurudolu-cz/image/upload/v1655193142/vzhurudolu-blog/prohlizece-2022_xxxa6a.jpg" width="1600" height="900" alt="Prohlížeče v roce 2022">
<figcaption markdown="1">
*Prohlížeče v roce 2022. Zdroj: [Statcounter.com](https://gs.statcounter.com/browser-market-share#quarterly-200901-202202).*
</figcaption>
</figure>

Máme dva hlavní prohlížeče – Chrome a Safari – a několik menších. Internet Explorer už prakticky neexistuje (a ve dni vydání textu mu dokonce [končí podpora](https://docs.microsoft.com/en-us/lifecycle/products/internet-explorer-11)).

Jako vývojáři si ale tím pádem nemáme na co stěžovat.

Můžeme mluvit o štěstí, že roli Exploreru převzalo Safari, jak říkají mnozí zlí jazykové na adresu prohlížeče od Apple?

<!-- AdSnippet -->

Ne, ne. Zlí jazykové se už dnes pravděpodobně mýlí. V roce 2021 se začal Apple o věc [zajímat](https://www.computerworld.com/article/3649769/apple-wants-to-know-why-you-hate-safari.html) na Safari více pracovat. Najali spoustu vývojářů a věci se začaly měnit.

## Compat 2021 a Interop 2022

Ještě před rokem bylo Safari z hlediska přidávání nových HTML a CSS vlastností nejhorším prohlížečem. Letos však začalo být plně srovnatelné s Chromem a Firefoxem.

<figure>
<img src="https://res.cloudinary.com/vzhurudolu-cz/image/upload/v1655193142/vzhurudolu-blog/compat-graph_r0hu0z.jpg" width="1600" height="900" alt="Compat 2021">
<figcaption markdown="1">
*Chrome a Firefox: „Safari, co blbneš?“ ([Compat 2021](https://wpt.fyi/compat2021?feature=summary))*
</figcaption>
</figure>

Graf mám od [iniciativy Compat 2021](https://web.dev/compat2021/). Je to skupina lidí, kteří se snaží sjednotit přidávání podpory webových standardů do prohlížečů. Určují, které funkce jsou nejdůležitější.

Díky nim máme v moderních prohlížečích řadu nových funkcí. Například odstranili chyby [ve flexboxu](https://www.vzhurudolu.cz/prirucka/css-flexbox) a [gridu](https://www.vzhurudolu.cz/prirucka/css-grid). Přidali také funkci position:sticky nebo vlastnost CSS [`aspect-ratio`](https://www.vzhurudolu.cz/prirucka/css-aspect-ratio).

Letošní iniciativa se jmenuje [Interop 2022](https://web.dev/interop-2022/). Jejím cílem je zaměřit se na nové funkce a dostat je do prohlížečů.

Díky tomu jsme mohli [na WebExpo 2022](https://www.vzhurudolu.cz/blog/214-webexpo-2022) prezentovat novinky, jako jsou [kaskádové vrstvy v CSS](https://developer.mozilla.org/en-US/docs/Web/CSS/@layer) nebo dialogové okno ([prvek `<dialog>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog)) v HTML. A těšíme se na další novinky – například CSS color functions, [subgrid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout/Subgrid) a další…

<figure>
<img src="https://res.cloudinary.com/vzhurudolu-cz/image/upload/v1652857967/vzhurudolu-blog/google-io-22-interop_omxylh.jpg" width="1600" height="900" alt="Interop 2022 dashboard">
<figcaption markdown="1">
*[Interop 2022 dashboard](https://wpt.fyi/interop-2022). Jsou na tom dobře. Všichni. Konečně!*
</figcaption>
</figure>

Toto je aktuální stav. Jak vidíte, menší prohlížeče nyní z pohledu přidávání vlastností ze standardů mohou konkurovat Chromu a vývoj nových CSS a HTML vlastností se odehrává v režimu kooperace mezi prohlížeči.

Myslím si, že to je pro nás jako webové vývojáře skvělé. Děje se to poprvé v historii, buďme za to rádi.