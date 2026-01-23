---
id: css-todo
title: 'Codetags: štítky pro úkoly v CSS kódu'
heading: 'Codetags: štítky pro úkoly v CSS kódu'
perex: ''
published: false
category:
  - css
category_highlight: false
include_rss: false
no_ads: false
og_title: ''
og_description: ''
og_type: article
---
# Codetags: štítky pro úkoly v CSS kódu

Občas je potřeba kód opravit rychle, jindy zase z drobné úpravy vyjde potřeba vytvoření velkého úkolu. Nežijeme prostě v ideálním světě a nemáme nekonečné množství času a pozornosti.

<link rel="stylesheet" href="/assets/css/modules-standalone/min/ad-snippet.min.css?1710496181" /><script> </script>
<aside role="complementary" class="ad-snippet ad-snippet--reverse" aria-labelledby="ad-snippet-ebook">
  <h2 id="ad-snippet-ebook" class="ad-snippet__heading sr-only">Reklama</h2>
<svg class="ad-snippet__scissors ad-snippet__scissors-top" viewBox="0 0 18 14" xmlns:xlink="http://www.w3.org/1999/xlink">
  <use class="ad-snippet__scissors-svg" xlink:href="#vd-icon-scissors" x="0" y="0"></use>
</svg>
  <a class="ad-snippet__container" href="/css-layout/">
    <div class="ad-snippet__image maxw-7em">
      <img src="/assets/img/content/handmade/ebooks/vdlayout/vdlayout-model-both__760.webp" alt="Kniha a e-book „CSS: moderní layout"" loading="lazy" width="1540" height="1270">
    </div>
    <div class="ad-snippet__text">
      <h3 class="ad-snippet__text-heading" style="color:#f89b1d">
        Kniha „CSS: moderní layout"
      </h3>
      <p class="ad-snippet__text-content">
        Floaty šly spát, ale takhle kniha ve vás probudí CSS kodéra.
        <span class="td-u">Více</span> →
      </p>
    </div>
  </a>
<svg class="ad-snippet__scissors ad-snippet__scissors-bottom" viewBox="0 0 18 14" xmlns:xlink="http://www.w3.org/1999/xlink">
  <use class="ad-snippet__scissors-svg" xlink:href="#vd-icon-scissors" x="0" y="0"></use>
</svg>
</aside>


Jak zařídit, aby se na potřebu pozdější úpravy kódu nezapomnělo?
 
Možná znáte značky pro komentáře typu `TODO`, `FIXME` nebo `HACK`. Říká se jim [Codetags](https://en.wikipedia.org/wiki/Comment_%28computer_programming%29#Tags) nebo prostě štítky v kódu. Slouží k informování čtenáře kódu o potenciálních problémech, které zde předchozí autor vědomě zanechal nebo objevil:
 
- `FIXME`: chyba, kterou je potřeba opravit
- `HACK`: nehezké, rychlé řešení problému, které je potřeba opravit
- `TODO`: ostatní úkoly vyplývající z kódu

Štítků může být [daleko více](https://www.python.org/dev/peps/pep-0350/#mnemonics), ale zdá se mi, že složitější významová struktura pak trochu přidává další míru složitosti. Proto ve svém kódu v naprosté většině případů používám jen štítek `TODO`.

## Proč to dělat?  {#proc}

V ideálním světě bychom každou objevenou chybu rovnou opravili, že ano? Proč tedy zanechávat nějaké vzkazy v kódu?

### Nedostatek času

Znáte to – plníte úkol, tím, že opravujete problém. Jenže během jeho plnění zjistíte, že se tím systém komplikuje. Přidáte třeba novou modifikaci komponenty a zjistíte, že by bylo potřeba refaktorovat celou komponentu nebo ji dokonce rozdělit na dvě nezávislé. A vyhrazený čas na to nestačí. Vyplývající úkol tedy musíte odložit.

### Nedostatek znalostí

Bylo by skvělé kdyby všichni, kteří kód upravují, měli stejné znalosti a vědomosti. Jenže tak to není, nebylo a nebude. Může se vám stát, že upravujete část, jejímuž kontextu nejlépe rozumí kolega nebo kolegyně. Vaše úprava sice může fungovat, ale zhorší čitelnost kódu. A vy to víte. Co uděláte? Poprosíte kolegy o revizi kódu a v `TODO` komentáři mu vysvětlíte svůj problém.

### Uvolnění kapacity na soustředění

Tohle znáte z každé rozumné metodiky organizace práce. Pokud plním úkol, potřebuji se soustředit a nemůžu zároveň v hlavě držet seznam dalších úkolů. Proto je vždy lepší si je někam odložit. Na papír, do aplikace nebo v našem případě přímo do kódu.

### Informace pro příležitost, kdy je k dispozici více času nebo více znalostí

Stává se to méně často, ale při úpravě kódu naopak můžete mít dostatek času a dostatek znalostí. A jen díky tomu, že problematické části evidujete v kódu, víte o nich a můžete se jim věnovat.

<!-- AdSnippet -->

Jen pozor, komentáře s úkoly by neměly nahrazovat systémy pro evidenci úkolů (Jira, Trello, Github…). To snad jen v případě drobných úkolů, u kterých nerozhoduje čas provedení. Systém štítků by měl tyhle systémy jen doplňovat.

Pokud tedy souhlasíte, že dělat štítky je rozumné, vrhněme se na jejich anatomii. 

 
## Co obsahuje dobrý komentář se štítkem? {#obsah}

Minimálně tyto čtyři informace:
 
- Proč byl vytvořen? 
- Jak problém vyřešit?
- Autora a datum vytvoření.
- Odkaz na úkol v systému, pokud jde o větší problém

Naopak by neměl obsahovat emotivný výlevy a poznámky na adresu kolegů a kolegyň. Píšeme o kódu, nikoliv o jejich autorech, protože chyby děláme úplně všichni.
 
Ukázka:
 
```css 
/*
TODO: V layout systému je nepořádek.
Je zde mnoho duplicit a nejasností. V prvním kroku je potřeba jej pročistit, v druhém zdokumentovat.
https://trello.com/c/MAt1yu75/35-layout
(Jun 15 2017, Martin Michálek)
*/
```
 
To vše ale platí pro situaci, kdy máme CSS kód jakžtakž v pořádku a pod kontrolou. Určitě jste ale někdy spravovali projekt, do jehož CSS kódu bylo nepříjemné se jen podívat, natož v něm něco opravovat. Pak doporučuji převzít koncept TODO.css.
 

## TODO.css

Malý soubor, který umístíte za váš ohromný, nehezký a zanedbaný CSS soubor, do kterého prostě z nějakých důvodů nechcete sahat. Nesahejte do něj. Vyrobte si soubor `TODO.css`, přidejte jej na konec stylopisů a dávejte do něj rychlé opravy.

S myšlenkou [v podobě Shame.css přišel Harry Roberts](https://csswizardry.com/2013/04/shame-css/). Pojmenování souboru mě ale nepřipadá tak jednoznačné a přímočaré, proto doporučuji `TODO.css`.

<!-- AdSnippet -->

Bude se vám hodit ve dvou situacích:

- Na projektu máte kolegy, kteří organizaci CSS nerozumí.
- Hlavní CSS soubor je ve velmi špatném stavu a oprava chyb je komplikovaná nebo vyžaduje konkrétního člověka.
 
Soubor `TODO.css` je pak víceméně seznamem úkolů k řešení, které odpovědný člověk jednou za čas pročistí a upraví. Opět je ale nutné správně popisovat.

## Nástroje, které podporují štítky s úkoly


- [Fixme](http://johnpostlethwait.github.io/fixme/) je Node.js komponenta pro vypsaní všech všech komentářů se štítky do příkazové řádky. 
- Balíček [TodoReview](https://packagecontrol.io/packages/TodoReview) dělá podobnou věc pro Sublime Text, jen je zdá se už nespravovaný.
- [Visual Studio](https://msdn.microsoft.com/en-us/library/txtwdysk.aspx) umí úkoly se štítky zobrazit v okně Task List.


