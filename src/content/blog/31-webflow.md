---
postID: 31
postTitle: 'Vyzkoušel jsem WebFlow. Je to velká věc, ale práci kóderům jen tak nevezme'
postUrlId: webflow
postDateTime: 2015-03-12
excerpt: 'Ale u mikrosajt nebo jednodušších prezentačních webů si designéři už dneska opravdu vystačí s malým nebo vůbec žádným dohledem kódera.'
postStatus: Published
authorID: 1
sectionID: 1
category: ['nastroje']
no_ads: false
include_rss: true
category_highlight: true
og_title: 'Vyzkoušel jsem WebFlow. Je to velká věc, ale práci kóderům jen tak nevezme'
og_description: 'Ale u mikrosajt nebo jednodušších prezentačních webů si designéři už dneska opravdu vystačí s malým nebo vůbec žádným dohledem kódera.'
og_type: article
---
# Vyzkoušel jsem WebFlow. Je to velká věc, ale práci kóderům jen tak nevezme

[Dreamweavery responzivního věku](http://www.smashingmagazine.com/2014/05/23/next-generation-responsive-web-design-tools-webflow-edge-reflow-macaw/) mají ambice zkrátit cestu mezi webovým designérem a publikovaným webem. Jinak řečeno ušetřit za Photoshop a kódera. 

Vyzkoušel jsem zase po čase pořádně [WebFlow](https://webflow.com) a myslím, že u mikrosajt nebo jednodušších prezentačních webů si designéři už dneska opravdu vystačí s malým nebo vůbec žádným dohledem kódera.

WebFlow je vizuální editor webů, do kterého si vkládáte komponenty typu navigace, formulář, obrázek, text nebo třeba kontejner layoutu. Obrázek napoví.

<a href="https://webflow.com/"><img src="http://www.vzhurudolu.cz/assets/img/content/src/webflow.jpg" height="414"></a>

Pojďme si povídat o těch lepších částech WebFlow.

## Vizuální editace jde fakt hladce a líbí se mi taky dosažitelná znovupoužitelnost

Ve srovnání třeba [s Jetstrapem](https://jetstrap.com/) mě fakt ohromilo jak přesně a jednoduše lze do stránky komponenty přetahovat myší a pak upravovat. S tím souvisí i kvalita generovaného HTML kódu. V rámci kategorie „klikátka v prohlížeči" famózní, řekl bych. 

Dobré ale vědět, že do režimu úpravy kódu se během editace nepřepnete, nástroj je mířený fakt na grafiky. Vlastní kód vložíte buď [pankáčsky přes Embed komponentu](http://help.webflow.com/site-settings/custom-code#adding-embed-code) nebo si jej přidáte až po exportu do HTML a CSS. V tomhle mě připadá zajímavější [Pinegrow, který přepínání do režimu kódování slibuje](http://pinegrow.com/).

Na WebFlow se mi velmi líbí důraz na jednoduchou znovupoužitelnost a respektování webových principů. Elementům se přidávají třídy, které mají styly odpovídající 1:1 aktuálním možnostem CSSka. Včetně [CSS3 animací](http://www.vzhurudolu.cz/prirucka/css3-animations) nebo [transformací](http://www.vzhurudolu.cz/prirucka/css3-transforms). Komponenty jež opakujete napříč stránkami si uložíte jako Symboly a upravujete jen na jednom místě. Vida, i klikačská obdoba `<?php include() ?>` se sem dostala!

## Mínusy? Hlavně pojetí responzivního design a… ne, fakt to není vymyšleno pro kódery

[Na rozdíl od Edge Reflow nebo Macaw](http://www.smashingmagazine.com/2014/05/23/next-generation-responsive-web-design-tools-webflow-edge-reflow-macaw/) lpí WebFlow na definici responzivního designu, kterou nepovažuji za šťastnou. Pro každý web máte přednastavené (*uf*) 4 (*uff*) breakpointy rozdělené podle zařízení nikoliv obsahu (*uuuuf*), které nelze změnit (*uuuufff*). Lokální breakpointy pro potřeby konkrétních komponent pak vůbec nehrozí. Tohle mě sákne, ale uznávám, že pro jednorázové mikrosajty to může být relativně v pohodě.

Komponent vám WebFlow dává k ruce docela dost, ale znáte to – i na menších projektech obvykle potřebujete udělat nějakou vlastní. Pak s WebFlow moc šancí nemáte, protože vlastní kód sem psát nemůžete. Na druhou stranu je možné si v takovém případě ve WebFlow připravit polotovar, který pak dokódujete. Jenže…

Žádný teploučký obývák pro frontendistovo pohodlí od WebFlow nečekejte. Exportovaný kód je čisté CSSko, takže i kdybychom výstupy WebFlow brali jako polotovar pro další designování a kódování, musíme si vystačit [bez výhod preprocesorů](http://www.vzhurudolu.cz/blog/12-css-preprocesory-1).

## Bát se o práci? Jedině pokud se specializujete na menší prezentační weby a mikrosajty

…ale to bych vám doporučoval najít si jinou práci už před lety. Stejně tak bych se jako majitel firmy zamyslel, zda je fakt efektivní kreslení takovýchto webů v Photoshopu. WebFlow totiž považuji daleko více za konkurenci pro Photoshop-kresliče a Photoshop samotný než frontendisty.

Pokud bych dnes chtěl vyrobit jednorázovou mikrosajtu nebo malý prezentační web,  neváhám a naklikám si je ve WebFlow. Žádný Photoshop, žádný kód. A je jisté, že se tyhle nové Dreamweavery (nebo nové Photoshopy) budou dále rozvíjet a jednodušší webdesignérské úkoly prostě vyřeší.

## Další české články s tématem Webflow

Akutalizace k červnu 2020:

* [Recenze od NástrojeProWeb](https://www.nastrojeproweb.cz/clanky/webflow-recenze)
* [Návod od Lukáše Augusty](https://medium.com/@lukasaugusta/webflow-1-mocn%C3%BD-n%C3%A1stroj-web-designera-79f54015ae0c)