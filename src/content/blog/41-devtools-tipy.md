---
postID: 41
postTitle: 'Tipy a triky pro Chrome DevTools'
postUrlId: devtools-tipy
postDateTime: '2015-10-19 00:00:00'
excerpt: 'Vsadím se, že minimálně některé z nich neznáte.'
postStatus: Published
authorID: 1
sectionID: 1
og_title: 'Tipy a triky pro Chrome DevTools'
og_description: 'Vsadím se, že minimálně některé z nich neznáte.'
og_type: article
tags: ['nastroje']
---
# Tipy a triky pro Chrome DevTools

DevTools přidávají novinky tak rychle, že už dávno přestalo být možné do svého pracovního procesu všechny zařazovat. Vsadím se, že minimálně některé z následujících tipů a triků neznáte. V Chrome si  otevřete DevTools a pojďme hned moje tvrzení ověřit. 

Klávesová zkratka <kbd>F12</kbd> neb <kbd>Ctrl+Shift+I</kbd> na Windows. <kbd>Cmd+Opt+I</kbd> pak na Macu.

## Snadnější ladění CSS

Vše v záložce „Elements“ a panelu „Styles“:

1. **Vyhledávání v DOMu pomocí CSS selektoru**  
V DOMu <kbd>Ctrl/Cmd+F</kbd> a do vyhledávacího políčka vložit CSS selektor.
2. **Vizualizace průběhu animace**  
Fialová ikonka u průběhu funkce [animace](/prirucka/css3-animations) nebo [transition](/prirucka/css3-transitions). [Video](http://devtoolstips.com/post/122033029028/preview-and-edit-cubic-bezier-functions-using).
3. **Vizuální výběr barvy**  
Klik na náhled barvy. V otevřené vrstvě klik na ikonu sběrače a můžete vybírat odkudkoliv z uživatelského rozhraní.
4. **Source Maps - mapování LESS/SASS zdrojáků**  
V DevTools netřeba zapínat, stačí na to [myslet při kompilaci](http://webdesign.tutsplus.com/tutorials/how-to-use-source-maps-for-better-preprocessor-debugging--cms-22735) preprocesorů.
5. **Vynutit :hover nebo jiný stav elementu**  
V DOMu z kontetového menu nad elementem vybrat „Force element state” nebo v záložce „Styles“ klikem na ikonu špendlíku nahoře.
6. **Undo změn ve Styles záložce**  
Jak jinak než <kbd>Ctrl/Cmd+Z</kbd>? Mrkněte na [video](http://devtoolstips.com/post/117168191446/with-devtools-opened-click-and-hold-the-reload).
7. **Filtrování CSS deklarací**  
Políčko „Filter“ hned nahoře ve Styles panelu.
8. **Změna formátu barvy (RGB/HEX/HSL)**  
Použijte <kbd>Shift+klik</kbd> na ikonu barvy. [Video](http://devtoolstips.com/post/100111762771/use-shift-click-to-change-color-format). 
9. **Skok ze Styles na CSS zdroják**  
Použijte <kbd>Ctrl/Cmd+klik</kbd> na CSS deklaraci. Lze doplnit o přepnutí na čitelný výpis. [Video](http://devtoolstips.com/post/99439992616/command-click-on-css-to-find-it-in-the-source).

## Konzole

Vše v panelu Console. Dostanete se přes <kbd>Esc</kbd> v otevřených DevTools.

1. **Vložení víceřádkového kódu**   
  V kódu odsazovat pomocí <kbd>Shift+Enter</kbd>.
2. **Zachovat historii konzole i při reloadu**  
  Zatržítko „Preserve Log“ nahoře v konzoli.
3. **Dolarové zkratky v konzoli**
  - `$_` – výsledek posledního výrazu.
  - `$0`-`$4` – poslední čtyři elementy vybrané v DOM panelu.
  - `$(selector)` – alias pro `document.querySelector()`; vrátí první vyhovující element.
  - `$$(selector)` – alias pro `document.querySelectorAll()`; vrátí pole všech elementů, které to splňují.
4. **`monitorEvents()` – zjednodušené hlídání událostí:**  
  Např. `monitorEvents(window, "click")`. [Video](http://devtoolstips.com/post/99440147706/quickly-watch-for-events).

## Emulace zařízení s Device Mode

Moje oblíbená část. DevTools obsahují výborný emulátor pro potřeby ladění responzivního designu. Najdete ho pod nenápadnou ikonkou mobilu nalevo od hlavního menu. Nebo pod zkratkou <kbd>Ctrl/Cmd+Shift+M</kbd> když máte DevTools otevřené.

![DevTools Device Mode](/assets/img/content/dest/original/devtools-nrs.jpg)

Sledujte čísla na obrázku:

1. **Přednastavené profily zařízení**   
Vidíte pak jejich CSS rozlišení nebo [device-pixel-ratio, přepočet na CSS pixely](/prirucka/css-pixel).
2. **Emulace mobilní rychlosti načítání**  
V českém prostředí volte „Regular 2G“, optimisté pak „Good 2G“.
3. **Vizualizace použitých [Media Query](/prirucka/css3-media-queries)**  
Skok na patřičný úsek v kódu pak pomocí kliku pravým tlačítkem myši.
4. **Emulace uživatelského zoomování**
5. **V nastavení lze prohlížeči podstrčit další parametry**  
Třeba testovací geolokaci nebo třeba pozici zařízení v rámci akcelerometru.

Samozřejmě, tohle není rovnoprávné s testováním na reálných zařízeních, ale pro první fázi [responzivního testování](/prirucka/jak-testovat-responzivni-weby) jsou DevTools úplně super!

## Vývojářský editor v záložce Source

V záložce „Source“ si můžete z DevTools udělat takřka plnohodnotný vývojářský editor. Stačí k projektu namapovat lokální soubory. Klik pravým tlačítkem na seznam „Sources“ vpravo, vybrat „Add Folder to Workspace“, potvrďte dotaz v liště a je to. 

[Google už tohle využití oficiálně propaguje](https://developer.chrome.com/devtools/docs/authoring-development-workflow) a je dobré, že přebírá ověřené zkratky a postupy právě ze [SublimeText](http://www.sublimetext.com/). Alespoň pár tipů:

1. **Rychlé přepínání mezi soubory:**   
  <kbd>Ctrl/Cmd+P</kbd> – známe právě ze Sublime nebo Atomu.
2. **Zformátovaný výpis zdrojáku:**  
  Pokud si tam třeba otevřene minifikovaný soubor, pomůže ikonka špičatých závorek vlevo dole – `{}`. 
3. **Vyhledávání ve všech zdrojácích:**  
  Chrome dokáže indexovat lokální soubory podobně jako váš editor. <kbd>Ctrl+Shift+F (Cmd+Opt+F)</kbd>.

A možnost „tvrdého reloadu” stránky a reloadu s vymazáním cache znáte? Když máte DevTools otevřené, klikněte pravým tlačítkem na ikonu pro obnovení stránky. [Video](http://devtoolstips.com/post/117168191446/with-devtools-opened-click-and-hold-the-reload).

[Mohl bych pokračovat](https://developer.chrome.com/devtools), ale pro dnešek stačí. Máte vlastní oblíbené DevTools triky? Ani chvilku neváhejte a šup s nimi do komentářů!