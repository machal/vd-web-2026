1:45 16.4.2003
1:31 23.4.2003

= DICOTA-OEM MACHAL =
=====================

= TECHNICKE RESENI =

== Reseni tabulek uvnitr ==

- hlavni tabulky (id="header" a  id="main") jsou deleny do dvou dilu o 10px odsazeni po krajich a 10 dilu
- tabulky v samotnem obsahu (contentside) - konkretne tabulky s tridou "formlayout" se deli do 16 rovnomernych dilu
- kazda formatovaci tabulka ma nakonci <tr class="zerorow">, coz je prazdny radek, ktery formatuje tabulky na stejnou sirku bunek (vsechno je pak zarovnane podle jednoho gridu)

== Velikost fontu ==

- meni se v nastaveni uzivatele - options_system.html
- pri "Browser default" nacita do hlavicky akorat screen.css
- pri "Small text" nacita do hlavicky font_small.css
- pri "Large text" nacita do hlavicky font_large.css - viz index_large.html
 
== Chovani stromu ==

- defaultne je zavreny ve vsech vetvich 
- vetev All je otevrena vzdycky
- po kliknuti na "plus" obrazek se javascriptem otevre vetev, opacne pak u "minus"
- po kliknuti na obrazek slozky nebo nadpis slozky se otevre stranka catalogue.html s vypisem produktu v pravo a trvale otevrenou slozkou ve strome
- po kliknuti na samotny produkt nebo ikonu se ve stromu trvale otevre slozka a vlevo nacte produkt samotny
- po kliknuti na Folder se zobrazi seznam vsech slozek v catalogue_folders.html

== Logika formularu ==

- formulare by vsechny mely splnovat stejnou logiku - navrhuju podobnou, jako je v users.html
- screen se seznamem (users.html) obsahuje sloupec s jednoznacnym identifikatorem, ktery je proklikavaci na upravu detailu zaznamu - jine sloupce proklikavaci nejsou, pokud nevedou na jinou logickou funkci - v souboru se seznamem je vpravo nahore polozka "New..", ktera vede na formular pro novy zaznam
- screen s pridanim nove polozky (users_new.html) obsahuje formular, ktery ma 75% sirku, je centrovany a ma tucne vyznacene povinne polozky, vpravo nahore ma odkaz "Back to ..." vedouci na seznam a dole tlacitka "Save" (ulozi a vycisti formular a ohlasi to) a "Cancel" (skoci bez ulozeni zpet na seznam) - nahore jsou ukazane hlaseni pro potvrzeni ulozeni dat z formulare a chybove hlaseni, pokud data nejsou vyplnena dobre
- screen s upravou polozky (users_edit.html) je stejny s tim, ze ma navic tlacitko Delete pro smazani polozky... je to treba potvrdit v hlaseni podobnem tem chybovym nahore

== Navigace na strankach ==

- nejlepsi by bylo delit sekce do adresaru, at je to prehledne i v URL
- stejne tak by se mel menit <title> v kazdem souboru
- stejne tak cesta (youarehere v kodu)

== Evidence casu a datumu ==

- mel by se zobrazovat nejaky systemovy cas, nejspis podle centraly (Nemecko)
- casy by se mely ukladat i v case mista zadani pro moznost alternativniho zobrazeni
- (update 23.4.2003) casy se zobrazuji jen v centralnim serverovem casy, ktery jde taky videt v horni liste

== Dalsi, ale taky dulezite ==

- kdo vi, na jakych prohlizecich to pobezi, takze bych s nicim moc nepocital
- hlavni vec, co me napada, je, ze tam nemusi vubec fungovat javascript, takze jsem se snazil v sablonach delat i alternativu k JS


= POZNAMKY K FUNCKNOSTI =

== Supervisor vs. uzivatel ==

- normalni uzivatel nevidi polozky pro supervisora zacinajici *
- supervisor mu je muze povolit
- (update 23.4.2003) v budoucnu muze byt supervisorem pro uzivatele zakazano zobrazovani jakekoliv polozky, napriklad muze mit zakazano zobrazovani nakupni ceny, prodejnich cen, zobrazovani souboru jinych nez obrazku... proste temer vsechno

== Generovani logu o pohybu uzivatelu ==

- zatim nevim presne ..? meli bysme evidovat stahovani souboru, jinak nevim
- (update 23.4.2003) evidovat se bude stahovani souboru, v automatickych novinkach se pak eviduje upload souboru, novy produkt


== Evidence cen == (update 23.4.2003)
- v soucasne dobe probiha veskera evidence, v budoucnosti bude mozna evidence v ruznych uzivatelskych menach, ktere se budou prepocitavat kurzy, ktere supervisor zada jednou mesice
- do produktovych cen pribyvaji nove polozky (viz databaze)
- uzivatelske (pobockove) ceny se budou automaticky prebirat z posledni transakce




