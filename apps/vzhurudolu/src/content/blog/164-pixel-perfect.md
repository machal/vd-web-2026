---
postID: 164
postTitle: '„Pixel perfect“ by měl být zakázaný výraz'
postUrlId: pixel-perfect
postDateTime: 2020-04-14
excerpt: 'Je to výraz zastaralý, nesmyslný a degradující dobré designéry i kodéry. Nahraďme ho čím chceme, třeba slovem „precizní“.'
postStatus: Published
authorID: 1
sectionID: 1
category:
  - responsive
no_ads: false
include_rss: true
category_highlight: true
og_title: '„Pixel perfect“ by měl být zakázaný výraz'
og_description: 'Je to výraz zastaralý, nesmyslný a degradující dobré designéry i kodéry. Nahraďme ho čím chceme, třeba slovem „precizní“.'
og_type: article
tags: ['responzivni-design']
---
# „Pixel perfect“ by měl být zakázaný výraz

Nepoužívejme prosím ve webdesignu spojení „pixel perfect“, když mluvíme o kvalitách návrhu nebo kódování webu. Je to výraz zastaralý, nesmyslný a degradující dobré designéry i kodéry.

Designér Lukáš Augusta napsal [skvělý článek](https://medium.com/@lukasaugusta/jak-na-pixel-perfect-k%C3%B3dov%C3%A1n%C3%AD-2200d1bc11dd) plný tipů na oblasti, kterým by z pohledu designéra měli [weboví kodéři](https://www.vzhurudolu.cz/blog/42-frontend-koder-vyvojar) věnovat pozornost. Dopustil se ale komunikační chyby – jeho text lze číst tak, že problémy vidí hlavně na druhé straně. 

<blockquote class="twitter-tweet"><p lang="cs" dir="ltr">Čtení pro kodéry. Buďte pixel perfect. Toto jsem napsal, abych to mohl posílat kodérům, kteří budou přebírat grafické návrhy. Jaké máte zkušenosti vy s realizací 1:1? <a href="https://t.co/dbMbyQ5UG3">https://t.co/dbMbyQ5UG3</a></p>— Lukáš Augusta (@lukasaugusta) <a href="https://x.com/lukasaugusta/status/1242031212048367625?ref_src=twsrc%5Etfw">March 23, 2020</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

Je to stejná chyba, které se z druhé strany dopustil kodér [Tomáš Krejčí](https://www.vzhurudolu.cz/lektori/tomas-krejci), když svou [neméně skvělou přednášku](https://www.youtube.com/watch?v=gL2db0IISRg) pojmenoval „Typické chyby designérů při návrhu responzivních webů“.

<div class="rwd-media">
<iframe width="560" height="315" src="https://www.youtube.com/embed/gL2db0IISRg" frameborder="0" gesture="media" allow="encrypted-media" allowfullscreen></iframe>
</div>

Když totiž naznačíme, že chyba je na druhé straně, řada lidi nás přestane poslouchat.

Pokud hledáme chyby, v obecné rovině je najdeme na obou stranách pólů:

* V skupině designérů je spousta lidí, kteří stále ještě nechápou webové médium. Namísto návrhu dobrých uživatelských zkušeností kreslí hezké obrázky a jako bonus přidávají arogantní komunikaci s vývojáři.
* V množině kodérů zase sedí celá řada těch, kteří jsou nedůslední, nelámou si hlavu s designovými principy a jako bonus přidávají zcela nedostatečnou komunikaci s okolím. 

Tady tu diskuzi ale můžeme směle ukončit, protože v obecné rovině (jako všichni designéři versus všichni vývojáři) nedává žádný smysl. 

<div class="related" markdown="1">
- [Podcast: Líbivá grafika webu nemusí fungovat](/podcast/143-podcast-jan-junek)
- [Atomický design a Pattern Lab](/prirucka/pattern-lab)
</div>

V konkrétní rovině smysl dává. Tam jde o vztahy několika konkrétních lidí. A řešením je vždy jen a jen dobrá komunikace. Je důležité si říct vzájemná očekávání nebo je sepsat do obecných pokynů, což je ostatně to, co Lukáš Augusta i Tomáš Krejčí svým příspěvkem zamýšleli. A dávat si průběžnou zpětnou vazbu.

Pojďme se ale zaměřit na spojení „pixel perfekt“.

<!-- AdSnippet -->

Rád bych o prohlásil, že jeho použití v komunikaci mezi designéry a vývojáři považuji za faul. 

## „Pixel perfect“ není perfekt 

To slovní spojení nejspíš vzniklo snahou grafiků dosáhnout perfektního antialiasingu, [přesného vykreslení po pixelech](https://www.smashingmagazine.com/2011/04/mastering-photoshop-pixel-perfection-when-rotating-pasting-and-nudging/) v grafických návrzích. Převzatě už se používá [všelijak](https://www.urbandictionary.com/define.php?term=pixel%20perfect), ale ve výsledku jde jen o nové synonymum slova „precizní“.

Návrhy mohou být *precizní*, stejně jako může být *precizní* práce kodéra nebo vývojáře. 

Precizní ano, ale „pixel-perfekt“ ne. 

<!-- AdSnippet -->

Dovolte mi ukázat tři důvody, proč si myslím, že bychom spojení „pixel perfekt“ měli z našich webařských slovníků vymazat.

### 1) Připomíná to divoké časy, dobu nevolnictví webdesignu

Do úvodu třetí kapitoly své [knížky o responzivním webdesignu](https://www.vzhurudolu.cz/kniha-responzivni-design/) jsem napsal:

> Když jsem někdy před rokem 2000 dělal své první weby za peníze, zadání bylo jednoduché: Vezmi tenhle tištěný katalog a převeď jej do HTML. Vzniklý web měl pevně dané rozměry a všelijak napodoboval vzhled katalogu, který jsem měl položený vedle monitoru s rozlišením 800 na 600 pixelů. Ano, byl to středověk. A webdesign byl v té době nevolníkem tiskařiny. 

> Responzivní design je v jistém smyslu emancipační vlna, která webdesign osvobozuje z područí starších médií. Dneska už například jasně víme, že weby nemohou mít fixní rozměry.

> Ale také jsme zjistili, že webový design není možné navrhovat a implementovat pixel po pixelu, tak jak jsem to dělal při převodu tištěných katalogů. 

Převáděli jsme pixely z tisku, z PDF nebo pak z PSD na HTML/CSS pixely. 

Jenže dneska už jsme jinde, ne? Víme, že web není tento fixní, pixelově zaměřený typ média. Že to je daleko *tekutější* formát, vyžadující všestrannou flexibilitu, nikoliv důraz na pixely jako tisk.

### 2) V praxi to u uživatelů bude vždy jen „jakžtakž perfekt“

Web je divné medium i v tom, že se zobrazuje na stovkách různých kontextů (operačních systémů, prohlížečů, zařízení, obrazovek, světelných podmínek, uživatelských nastavení… ) Co „na pixel“ sedí u devíti lidí, nebude sedět u desátého.

Stačí, když si uživatel zvětší písmo (což bychom mu [měli dovolit](https://www.vzhurudolu.cz/prirucka/jednotky)) nebo se pro vykreslení stránky dočasně použije jiný font (kvůli [zrychlení zobrazení obsahu](https://www.vzhurudolu.cz/prirucka/css-font-display)) a důsledně aplikovaný koncept „pixel perfect“ se rozpadá.

<blockquote class="twitter-tweet" data-conversation="none"><p lang="cs" dir="ltr">Chtěl bych někdy vidět responsivní 1:1 návrh</p>— Aleš Roubíček (@alesroubicek) <a href="https://x.com/alesroubicek/status/1243039654586220552?ref_src=twsrc%5Etfw">March 26, 2020</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

### 3) Degraduje to dobré designéry a dobré kodéry

Designéři a designérky přeci nenavrhují rozmístění pixelů, ale uživatelskou zkušenost. Navrhují designový systém a ideálně k němu dodávají příručku v podobě style guide, protože řadu věci z grafických editorů prostě kodér neuvidí.

Kodéři a kodérky zase nepřevádějí pixel po pixelu z grafických nástrojů do HTML a CSS. Systém designu jednak vyjadřují kódem, ale také obohacují o další rozměry uživatelské zkušenosti, kam designéři nedosáhnou – například [přístupnost](/pristupnost), [rychlost vykreslování webů](/rychlost-nacitani) nebo [dobrou organizaci kódu](/organizace-css).

<figure>
<img src="https://www.vzhurudolu.cz/prirucka-content/dist/images/medium/atomicky-design-webmium.jpg" alt="Systém designu pro Webmium">
<figcaption markdown="1">
*Obrázek: Neviděli jste někdo můj pixel? Systémy designu řeší daleko zásadnější problémy, ale neznamená to, že nemohou být precizní.*
</figcaption>
</figure>

I v [systémech designu](/prirucka/pattern-lab) můžeme být precizní, ale soustředit se na pixel? Soustředíme se na systém a uživatelskou zkušenost, to je to podstatné.

## Možná jste spíše chtěli říct „precizní“?

Spojení „pixel perfekt“ by dle mého mělo být na seznamu zakázaných slov v komunikaci mezi designéry a vývojáři. Nahraďme ho čím chceme, třeba slovem „precizní“. 

Co vy na to?

<!-- AdSnippet -->