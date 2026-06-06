========== Manual pro stylopisy webu Prazskeho jara =========

Projekt URL:          www.festival.cz
Autor:                Martin Michalek, Studio Shortcat, michalek@shortcat.cz




===== Soubory =====

index.css             centralni stylopis
colors.css            barvy webu (TODO: zrusit)
ie.css                MSIE stylopis
print.css             tiskovy stylopis

/blueprint            soubory frameworku Blueprint CSS
blueprint-extra.css   nase predefinice vlastnosti Blueprint CSS

calendar.css          stylopis kalendare
sifr.css              stylopis pro nahradu pisem sIFR

admin.css             stylopis pro administraci Viola
admin-ie.css          MSIE stylopis administrace
admin-print.css       tiskovy stylopis administrace

scaffold.css          styl pro vygenerovana views Rails
nice_scaffold.css     styl pro vygenerovana views Rails

fb-fanbox.css         barvy a pismo pro Facebook fanbox umisteny 
                      na http://www.festival.cz/kontakt




===== Index barev ===== 

Aktivni prvky
modra - odkazy                      #0084CD
15%ni 					                    #d9edf8 (napr. pro prehravac videa)
30%ni 					                    #b2daf0 (napriklad pro mouseover nad prehravacem videa)

100% hneda - barva textu            #322a21
75% hneda                           #655f59 (napr. v Pratelich)
50% hneda - potlaceny text          #71685c
33% hneda - vice potlaceny text     #c7c4be
27% hneda - pozadi #section-head    #E4DFDB (napr. v Archivu)
25% hneda - pozadi stranky          #EDE9E6
10% hneda - mouseovery              #f6f4f3

kategorie programu:
1) orchestralni rada (magenta)      #B14289
2) komorni hudba (fialova)          #623287
3) recitaly (tyrkysova)             #046F8F
4) stara hudba (zelena)             #40925B
5) popularni rada (svetle zelena)   #8C9C00
6) divadlo/opera (oranzova)         #C56600
7) doprovodne akce (cervena)        #A41F18

kategorie programu - 15%-ni - napriklad pro prehravac videa
1) orchestralni rada (magenta)      #f3e3ed
2) komorni hudba (fialova)          #e8e0ed
3) recitaly (tyrkysova)             #daeaee
4) stara hudba (zelena)             #e3efe7
5) popularni rada (svetle zelena)   #eef0d9
6) divadlo/opera (oranzova)         #f6e8d9
7) doprovodne akce (cervena)        #f1dedd

kategorie programu - 30%-ni - napriklad pro mouseover nad prehravacem videa
1) orchestralni rada (magenta)      #e7c6db
2) komorni hudba (fialova)          #d0c1db
3) recitaly (tyrkysova)             #b3d4dd
4) stara hudba (zelena)             #c5decd
5) popularni rada (svetle zelena)   #dce1b2
6) divadlo/opera (oranzova)         #edd1b2
7) doprovodne akce (cervena)        #e4bbb9

okruhy pratel - oznaceni jmen
zakladni                            #2bc8f2
silver                              #999999
gold                                #edc559


===== Grid =====

Sirka sloupce je 128px
Viz napriklad barevna pole nad horni navigaci



===== Z-index "index" ===== 

Karusel (deprecated):
1           .jcarousel-list - vsechny prvky karuselu
2           .jcarousel-clip - viditelna cast karuselu v jCarouselu
3           .jcarousel-next, .jcarousel-prev - navigace v jCarouselu

Prvky stranek:
1-5         .highlight items - pro prvky slideshow na uvodni strance    
10          <a> a .perex v .highlight-item, prvek slideshow na uvodni strance, 
199         .page-home #partners-coloured - partneri na uvodni strance v barvach, do kterych se morfuje pri mousoveru
200         .page-home #partners - partneri na uvodni strance
210         .player - prehravac videa v novinkach

Layout:
350         #program-navigation - programova navigace         
360         #ajax-search-results - ajaxove vysledky vyhledavani (vcetne zaviraciho krizku #ajax-search-close)
370         #archive-other-years - prepinac mezi roky v archivu

FancyBox
510          #fancy_bigIframe, #fancy_freeIframe - nezname casti FancyBoxu
570          .fancy_bg - stin pod obsahem FancyBoxu (nepouzivame)
590          .fancy_overlay, .fancy_outer - prekryvaci polopruhledna vrstva a vnejsi obal obsahu FancyBoxu
592          #fancy_img - samotny obrazek otevirany FancyBoxem 
596          .fancy_content - obsah otevirany ve FancyBoxu
598          .fancy_loading, .fancy_close, .fancy_title, .fancy_left, .fancy_right - loading, zaviraci, popisovaci a navigacni prvky FancyBoxu


Kalendar:
840         #calendar-shadow -  stin pod kalendarem
851-900     #calendar .day li - rezervovano pro predstaveni v ramci kalendare
950         #app-is-staging - informace o tom, ze si prohlizime staging verzi nahore v hlavicce

