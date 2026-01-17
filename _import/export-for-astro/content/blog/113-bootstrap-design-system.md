---
postID: 113
postTitle: 'Největší problém Bootstrapu: Chybějící style guide'
postUrlId: bootstrap-design-system
postDateTime: 2018-07-08
excerpt: 'Bootstrap 4 je prostě pořád nejpropracovanější UI knihovna pro web, ale jedna věc mu – ve srovnání například s Material Designem – chybí.'
postStatus: Published
authorID: 1
sectionID: 1
category: []
no_ads: false
include_rss: true
category_highlight: true
og_title: 'Největší problém Bootstrapu: Chybějící style guide'
og_description: 'Bootstrap 4 je prostě pořád nejpropracovanější UI knihovna pro web, ale jedna věc mu – ve srovnání například s Material Designem – chybí.'
og_type: article
---

# Největší problém Bootstrapu: Chybějící style guide

Podívejte se, já jsem odjakživa velký fanoušek Bootstrapu. Ale jedna věc mě na něm v poslední době štve. 

Bootstrap je skvělý frontend framework pro tvorbu UI. Ve verzi 4 dle mého potvrdil, že díky své propracovanosti a schopností zaměřit se na to podstatné v tomhle segmentu vládne oprávněně.   

Je skvělý pro implementaci rozhraní webových aplikací jako jsou intranety nebo různé redakční systémy. Když ale [dojde na weby](/blog/11-bootstrap-pomuze), je obvykle použití Bootstrapu hluboko pod jeho možnostmi. Nebo se z toho stane holý nesmysl.

<!-- AdSnippet -->

Občas se na weby využívající Bootstrap dívám. Můžete taky – je tady například [Bootstrap Expo](http://expo.getbootstrap.com/), přehlídka webů postavených na nejpopulárnějším frontend frameworku.

<figure markdown="1">
[cms:asset 22]
<figcaption markdown="1">    
*Obrázek: Bootstrap Expo, galerie webů udělaných s (malou) pomocí Bootstrapu*
</figcaption> 
</figure>

Schválně si ty weby projděte.

Je to galerie krásných a kreativních webů, které používají... layoutovou mřížku z Bootstrapu. 

Ano, nedělám si srandu, více toho většinou z Bootstrapu nemají.


## Prezentační weby: Nevyužitý potenciál Bootstrapu {#prezentacni}

Takových webů je celá řada i v Česku. Když se jejich autorů ptám, proč použili Bootstrap, když nakonec na web nasadí jen mřížku pro rozvržení (tak dobře: ještě taky tlačítka a jednu další komponentu), odpovídají: 

> On to chtěl klient.

Ano, mezi některými klienty je populární iluze, že využitím Bootstrapu ušetří za vývojáře. Jenže pokud není systému designu, ukrytému v Bootstrapu, přizpůsobený design projektu, bývá použití Bootstrapu naopak velmi neefektivní.

Vím ale, že Bootstrap má opravdu potenciál i pro využití na webech. Ale taky vím, že odpověď, kterou bych chtěl slyšet, skoro nikdy nedostanu. Zněla by takto:

> Z existujících systémů designu dával pro tento web největší smysl Bootstrap. Domluvili jsme se s designérem na úpravách a využíváme velkou část komponent frameworku.

Důvod, proč to nikdy neuslyším, je ve třech slovech téhle ideální, ale vymyšlené citace: 

* *Systém designu* je v Bootstrapu totiž neviditelný. Neexistuje jeho veřejná dokumentace. Mohou si jej všimnout jen zkušenější a designérsky zdatnější vývojáři. Je totiž zčásti [schovaný v kódu](/prirucka/bootstrap-typografie) a zčásti neexistuje.
* *Designéři* proto systém nevidí a Bootstrap je pro ně neuchopitelný. Nemají kde nastudovat grafické principy, na kterých je postavený. Nemohou navrhnout citlivý způsob jejich úprav pro konkrétní projekt. Úpravy, které udělají, se obvykle s principy Bootstrapu míjejí.

## Jaký význam má červené tlačítko? {#tlacitko}

Aby bylo jasné, co myslím spojením *systém designu* podívejme se na následující obrázek [modálního okna](https://getbootstrap.com/docs/4.1/components/modal/) postaveného na Bootstrapu.

<figure markdown="1">
[cms:asset 24] 
<figcaption markdown="1">    
*Obrázek: Ne úplně šťastná implementace modálního okna*
</figcaption> 
</figure>

A teď mě řekněte: Co je na něm špatně z pohledu návrhu uživatelského rozhraní?

Nechám vás chvílli přemýšlet.

Ještě chvíli. 

Vážně se prosím zamyslete.

Tlačítko „Close“ je ve špatné barvě, že ano?  A proč? Protože červená (vytvořená třídou `btn-danger`) je určená pro riskantní operace, které mohou například smazat uživateli data. Nikoliv pro zavření okna, což je akce s nižší prioritou než „Save changes“.

Asi.

Říkám „asi“, protože pravdu nikdo nezná. Protože Bootstrap nemá žádnou dokumentaci významu barev, stejně jako nemá dokumentaci významu čehokoliv. [Stránka o tlačítkách](http://getbootstrap.com/docs/4.1/components/buttons/) ani jiná nic podobného neobsahuje.

<figure markdown="1">
[cms:asset 26] 
<figcaption markdown="1">    
*Obrázek: Dokumentace tlačítek v Bootstrapu. Pro techniky skvělé, pro designéry k ničemu*
</figcaption> 
</figure>

Bootstrap nemá dokumentaci systému designu. Nemá [style guide](https://www.uxpin.com/studio/blog/design-systems-vs-pattern-libraries-vs-style-guides-whats-difference/). Takže pro designéry a vlastně i většinu vývojářů v něm žádný systém není.

Na mapě nástrojů pro designéry a vývojáře prostě okupuje pozici UI knihovny pro web:

<figure markdown="1">
[cms:asset 28]
<figcaption markdown="1">    
*Obrázek: Bootstrap je skvělá UI knihovna pro web, nic víc, nic míň*
</figcaption> 
</figure>

## Pojďme teď srovnat Bootstrap s Material Designem {#srovnani}

Nově do tohoto segmentu nástrojů vplul [Material Design](https://material.io/) od Google. Pokud bychom chtěli implementovat tlačítko s jeho pomocí, dozvíme se například, že existuje stupnice priorit:

<figure markdown="1">
[cms:asset 32]
<figcaption markdown="1">    
*Obrázek: Tlačítka mohou mít tři stupně zdůraznění, to už je zajímavá informace*
</figcaption> 
</figure>

Další důležitá informace je, že umístění tlačítka, jeho tvar, barva nebo umístění má vliv na pozici ve hierarchii:

<figure markdown="1">
[cms:asset 34]
<figcaption markdown="1">    
*Obrázek: První tlačítko má největší zdůraznění, druhé střední a třetí je zdůrazněno nejméně*
</figcaption> 
</figure>

Ano, Material Design je kromě UI knihovny, velmi dobře zdokumentovaným systémem designu:

<figure markdown="1">
[cms:asset 30]
<figcaption markdown="1">    
*Obrázek: Material Design má pomocí style guide zdokumentovaný systém designu a pak má UI knihovny pro všechny platformy. Jak ale brzy uvidíte, technická dokumentace té webové je slabší*
</figcaption> 
</figure>


Takže – pokud k Material Designu posadíte designéra, je schopný na jeho základech navrhout rozhraní webu, které pak vývojář snadněji naimplementuje.

Pokud k Material Designu posadíte vývojáře, který si poctivě přečte dokumentaci, udělá při návrhu rozhraní daleko méně chyb.

<!-- AdSnippet -->

Tohle je silná stránka Material Designu. A slabá Bootstrapu.

## Bootstrap je silnější v technické dokumentaci, ale chybí mu style guide {#bootstrap-silnejsi}

Nerad bych ale, abyste si z mého textu odnesli něco jako „utečte teď všichni od Bootstrapu k Material Designu“. 

I ten má své mouchy. Technická dokumentace tlačítek v Bootstrapu je naprosto vyčerpávající. Jsou tam například tyto informace:

* Všechny modifikace včetně ukázek kódu
* Možnosti použití různých HTML značek
* Detailní upozornění na aspekty přístupnosti
* Varování ohledně problémů s prohlížeči
* Dokumentace javascriptového API

…a mnoho dalšího. Technická dokumentace Material Designu je spíše základní a z mého pohledu nedostatečná.

<figure markdown="1">
[cms:asset 36]
<figcaption markdown="1">    
*Obrázek: [Dokumentace tlačítek](https://material.io/develop/web/components/buttons/) pro vývojáře je v Material Designu velmi stručná*
</figcaption> 
</figure>

Když to hodně zjednoduším, Material Design může být zajímavější pro týmy, kde na jednom produktu pracují designéři s vývojáři. Bootstrap zase může více vyhovovat solitérním vývojářům, kteří mají na starost jak návrh UI, tak jeho implementaci. Ti skutečně ocení detailní technickou dokumentaci.

Bootstrap 4 je prostě pořád nejpropracovanější UI knihovna pro web.

Ale chybí mu style guide, dokumentace designového systému.

<!-- AdSnippet -->