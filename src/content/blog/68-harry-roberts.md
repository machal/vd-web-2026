---
postID: 68
postTitle: '3 otázky na Harryho Robertse před letošním WebExpo: k refaktorování CSS a metodice ITCSS'
postUrlId: harry-roberts
postDateTime: '2016-09-06 00:00:00'
excerpt: 'Harry Roberts (@csswizardry) je z pohledu frontend designéra jedním z nejzajímavějších přednášejících na letošním WebExpu.'
postStatus: Published
authorID: 0
sectionID: 1
category:
  - css
og_title: '3 otázky na Harryho Robertse před letošním WebExpo: k refaktorování CSS a metodice ITCSS'
og_description: 'Harry Roberts (@csswizardry) je z pohledu frontend designéra jedním z nejzajímavějších přednášejících na letošním WebExpu.'
og_type: article
---

# 3 otázky na Harryho Robertse před letošním WebExpo: k refaktorování CSS a metodice ITCSS

[Harry Roberts](http://csswizardry.com/about/) ([@csswizardry](https://twitter.com/csswizardry)) je z pohledu frontend designéra jedním z nejzajímavějších přednášejících na letošním WebExpu. 

Vzal jsem příležitost za pačesy a přes organizátory se jej zeptal na refaktorování CSS – téma [jeho přednášky](https://webexpo.cz/praha2016/prednaska/refactoring-css-without-losing-your-mind/) – a taky [ITCSS](https://speakerdeck.com/dafed/managing-css-projects-with-itcss), metodiku pro organizaci velkých CSS projektů.

Harry neváhal věci rozepsat, takže je z toho pěkný článek. Můžete mu na konci poděkovat třeba doporučením dobrých pražských hospod. 

![Harry Roberts](/assets/img/content/dest/harry-roberts-talking.webp)

### Harry, moc se těším na vaši přednášku! Na jednom z projektů mám část CSS děsně starou. Prostě území, kam se bojím jít po setmění. Dají se stručně říct první tři věci, které bych tam měl udělat?

S refaktorování starého CSS pomáhám klientům hodně. Klíčové kroky jsou ale obvykle ty samé: Tři písmena „I“.

Identifikujte

Když víte, že ve vašem CSS je nepořádek, je to jedině dobře. Ale ve kterých zákoutích přesně? Které části zdrojáků vám už teď způsobují problémy? Které z nich bude možné refaktorovat nejsnáze? Které části vám přinesou nejvíce prospěchu, když je předěláte? Rozpoznání hlavních kandidátů pro refaktoring je důležité.

Například vaše CSS pro navigaci může být těžkopádné a práce s ním složitá, ale když navigace pracuje správně, je přístupná a vy ji musíte upravovat jen zřídka, přepracování pro vás takovou hodnotu nemá. 

Na druhé straně – možná například váš systém pro layout je velmi rozkouskovaný a nedůsledně napsaný. Může dělat problémy při zobrazování napříč prohlížeči a  jeho responzivnost mohla být přidána až dodatečně. Zároveň jej určitě používáte často. Když se do něj pustíte nejdřív, hodnotu to pro vás může mít značnou.

Izolujte

Poté, co jsme identifikovali kandidáty pro refaktorování, musíme je během práci na nich izolovat. Předpokládám, že jsme se rozhodli k refaktorování našeho systému pro layout. Musíme jej přepsat v odloučení, mimo náš projekt.

Za tím účelem si otevřete nový jsFiddle, Codepen atd. a začnete pracovat tady. Nedělejte přepracování vlastností uvnitř starých zdrojáků, riskujete totiž použití jiného zastaralého CSS. To může totiž refaktorovat někdy v budoucnu. Je například možné, že používáte tradiční CSS reset, který snad časem nahradíte Normalize.css. A nechcete váš nový systém pro layout budovat nad resetem, který odstraníte dejme tomu za šest měsíců.

Budujte refaktorovanou verzi vaší komponenty v naprosté izolaci, tak abyste věděli, že je výborně zapouzdřená a nebude využívat žádný jiný zastaralý kód.

Implemenujte

Závěrečným krokem je zavedení refaktorované komponenty zpět. Zkopírujte CSS z jsFiddle zpět do příslušné části kódu a sledujte co se stane. V 90 % případů zjistíte, že vznikly nějaké problémy: konflikty s existujícím CSS, střety v pojmenování, vkrádání stávajících stylů do nového kódu atd.

Do těchto detailů se pustíme právě v implementační fázi, ale musíme opatrně zvažovat kam umístíme jejich opravy. Pokud oprava řeší problém s layoutovým systémem, je obvykle nejlepší ji umístit do souboru s komponentou. Pokud oprava cílí na problémy vycházející z konfliktů se zastaralým kódem, je nejlepší ji umístit do souboru shame.css. Takto udržíme opravu zastaralé části mimo kód nově budovaný na zelené louce. To v prvé řadě znamená, že bude daleko snazší zastaralý kód odstranit, jakmile začne dělat potíže.

*Poznámka autora: Jak jste si možná všimli, Harry po zodpovězení mé otázky sepsal myšlenku podrobně [do blogpostu na CSSWizardry.](http://csswizardry.com/2016/08/refactoring-css-the-three-i-s/)*

### Zběžně sleduji vaše ITCSS. Dá se nějak stručně popsat v čem se liší třeba od SMACSS?

Ze všech dostupných CSS metodik je ITCSS nejpodobnější SMACSS. Zabývá se typy nebo vrstvami pravidel a nabízí rovnováhu mezi dědičností a zapouzdřením. 

[![ITCSS](/assets/img/content/dest/itcss.webp)](https://speakerdeck.com/dafed/managing-css-projects-with-itcss)

Klíčová myšlenka ITCSS je ve využití dědičnosti z CSS v náš prospěch. Děláme to seřazením pravidel velmi charakteristickým a přesně daným způsobem, který je založený na třech klíčových metrikách. Tento model umožňuje snadné rozšiřování a růst projektu. Nabízí také možnost většímu množství lidí velmi bezpečně přispívat do zdrojáků. Je také slučitelný s jakýmikoliv frontend knihovnami, Web Components nebo technologickými stacky, které používáte.

ITCSS si bere vzory z mnoha rozdílných oblastí, ale skoro všechno je v něm volitelné. Já například ITCSS používám s BEM pojmenováním tříd a strukturou CSS založenou na OOCSS. Ani jedno však není pro někoho, kdo by chtěl ITCSS používat, povinné.

ITCSS má také detailnější přístup, protože (S)CSS pravidla rozděluje do sedmi výchozích kategorií, které můžete rozšířit podle vašich potřeb. Jen *nikdy *nesmíte změnit jejich pořadí.

### A na závěr – byl jste někdy v Praze? Těšíte se na něco konkrétního?

Nebyl! Nic konkrétního, ale těším se na české pivo a objevování města! Budu rád za všechna doporučení co mi můžete dát…

*Doporučíte? Harry Roberts je na [@csswizardry](https://twitter.com/csswizardry).*

*Já děkuji za rozhovor a těším se na přednášku!*

<div class="text-small" markdown="1">
Kredity k fotografii Harryho Robertse – autor: [Andreas Dantz](https://www.flickr.com/photos/szene/8899494021/in/photolist-eytp5o-eyqew6-eytpF7/),
      publikováno pod [CC-BY-2 licencí](https://creativecommons.org/licenses/by/2.0/deed.cs)).
</div>