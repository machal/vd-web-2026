---
postID: 123
postTitle: 'Konzultujte vždy prosím nasazení nových komponent pro web s vývojáři (Případ FreshChat)'
postUrlId: freshchat
postDateTime: 2018-10-10
excerpt: 'Snadno se stane, že i vyladěný web zničí jedno dobře míněné přidání komponenty.'
postStatus: Published
authorID: 1
sectionID: 1
category:
  - rychlost
no_ads: false
include_rss: true
category_highlight: true
og_title: 'Konzultujte vždy prosím nasazení nových komponent pro web s vývojáři (Případ FreshChat)'
og_description: 'Snadno se stane, že i vyladěný web zničí jedno dobře míněné přidání komponenty.'
og_type: article
tags: ['rychlost-nacitani']
---
# Konzultujte vždy prosím nasazení nových komponent pro web s vývojáři (Případ FreshChat)

Řekněme, že jste marketéři, designéři nebo majitelé webů. A že chcete [rychlý web](/rychlost-nacitani). Je možné, že pro to leccos děláte.

Ale může vám unikat jedna podstatná věc – každé nasazení externí komponenty do stránky může rychlost webu pokazit.

<blockquote class="twitter-tweet" data-lang="en"><p lang="cs" dir="ltr">Marketéři, když vybíráte nějakou komponentu pro web (analytiku, a/b testing, chat…), konzultujete vždy výběr s vývojáři?<br>(RT helfne, dík moc.)</p>— Martin Michálek (@machal) <a href="https://x.com/machal/status/1046731360264695808?ref_src=twsrc%5Etfw">October 1, 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

Moje anketa na X nemá zrovna statisticky vypovídající účast, ale řekněme, že zde je minimálně 20 marketérů, kterým bych rád věnoval tento článek.

Týká se to vkládání: 

- méně obvyklých měřících skriptů
- chatovacích služeb
- A/B testovacích služeb
- remarketingových kódu
- nahrávacích služeb typu 

…no prostě obecně všech komponent třetích stran na rámec těch úplně běžných jako jsou [Google Analytics](https://www.vzhurudolu.cz/prirucka/google-analytics-vyvojari).


## Případ FreshChat

Jednomu klientovi se stalo následující. V týmu se rozhodli nasadit novou chatovací službu. Podle toho co vím vybírali poctivě, ale zapomněli do rozhodovacího procesu přizvat vývojáře nebo někoho, kdo by jim konzultoval dopad na rychlost načítání.

Inu, nasadilo se. Což se hned projevilo [v nástroji SpeedCurve](https://speedcurve.com), pomocí kterého naštěstí rychlost průběžně měříme. Projevilo se to nehezky. Pěkně ošklivě, abych byl přesnější.

<figure>
[cms:asset 44]
<figcaption markdown="1">
*Obrázek: Datový objem není zrovna nejzásadnější ukazatel rychlosti načítání stránky, ale jeho náhlý nárust nevěstí nic dobrého*
</figcaption>
</figure>

FreshChat totiž:

- Stahuje něco přes 0,8 MB, což je fakt hodně (i ve srovnání s předchozím řešením LiveChat, kterému stačilo 0,2 MB).
- Co je horší: [Výchozí podoba skripu](https://developers.freshchat.com/) zablokuje zobrazení stránky – doporučuje se načtení bez atributů `async` nebo `defer`.

A co je nejhorší – zdá se, že minimálně někteří zaměstnanci jeho podpory vykazují docela silnou dávku neznalosti o problematiky rychlosti načítání. Odpověď na precizní rozbor kolegy vývojáře zněla: *„I do not see any slowness in the page or the chat widget loading“.*

Neargumentuje se čísly, [metrikami](https://www.vzhurudolu.cz/prirucka/metriky-rychlosti), nekomentuje se zaslaná časová osa načítání. Prostě si to člověk s FreshChat „zkusil“ a žádné zpomalení tam „neviděl“.

V následné komunikaci už trochu vylepšili tón, ale to nejdůležitější – náprava problému je v jejich případě na dlouhý běh.

Vývojář je naštěstí člověk na svém místě, takže přišel s vlastním optimalizací:

- Nestahuje FreshChat blokujícím způsobem, ale v první fázi vůbec.
- Zobrazuje vlastní placeholder, vypadající jako chatovací okénko.
- Až po klinutí uživatelem se FreshChat načte. 

<div class="related" markdown="1">
- [Rychlost webu je také záležitostí designéra](/blog/86-rychlost-designeri)
- [Rychlost načítání: Úvod pro designéry, marketéry a majitele webů](rychlost-designeri.md)
- [Petr Soukup: Jak si (ne)zabít eshop měřícím kódem](https://www.souki.cz/jak-si-zabit-eshop-mericim-kodem)
</div>

Ponaučení pro majitele webů, marketéry a další profese?

1. Ujistěte se, že v týmu máte někoho (nejlépe vývojáře), kdo rozumí rychlosti načítání. Ale opravdu rozumí, protože rychlost není jen o datové velikosti stránky. (Účast na mém [školení je zcela vyhovující vzdělání](https://www.vzhurudolu.cz/kurzy/rychlost-nacitani). Mrk, mrk.)
2. Sledujte rychlost průběžně, nástrojem typu SpeedCurve nebo třeba i vlastním řešením.
3. Přizvěte vývojáře do výběru každé nové komponenty, kterou byste rádi do stránky vložili.

Moc díky!

<!-- AdSnippet -->