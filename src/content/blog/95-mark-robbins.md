---
postID: 95
postTitle: 'Rozhovor před WebExpo: S Markem Robbinsem o moderním kódování e-mailů'
postUrlId: mark-robbins
postDateTime: '2017-09-07 00:00:00'
excerpt: 'Umíte si představit kódování newsletterů bez tabulek a inline stylů? Používání moderních CSS3 technologií nebo třeba SVG tamtéž? Sci-fi!?'
postStatus: Published
authorID: 0
sectionID: 1
category: []
no_ads: false
og_title: 'Rozhovor před WebExpo: S Markem Robbinsem o moderním kódování e-mailů'
og_description: 'Umíte si představit kódování newsletterů bez tabulek a inline stylů? Používání moderních CSS3 technologií nebo třeba SVG tamtéž? Sci-fi!?'
og_type: article
---

# Rozhovor před WebExpo: S Markem Robbinsem o moderním kódování e-mailů

Umíte si představit kódování newsletterů bez `<table>` a inline stylů? Používání moderních [CSS3](/prirucka/css3) technologií nebo třeba SVG tamtéž? Sci-fi!?

Přátelé, asi to jde. Ale jasně – ne úplně jednoduše a samo. Musíte pro to udělat minimálně jednu věc. Zajít [na přednášku Marka Robbinse](https://www.webexpo.cz/praha2017/prednaska/interactive-email/) na letošní WebExpo. Mark totiž tráví čas přemýšlením, jak pomocí progressive enhancement obelstít e-mailové klienty a do temné dračí sluje kódování newsletterů přinést trochu světla z moderní webové kodéřiny. Následující rozhovor berte jako pozvánku na jeho přednášku. 

*Zdravím, Marku! Moje první myšlenka, když jsem si procházel vaši práci zněla: Tomu neveřím! :) Je to už sice dlouho, co jsem naposledy kódoval e-mailovou šablonu, vím ale, že mezi lidmi je stále hodně klientů jako Outlook nebo webová verze Gmailu, které nové technologie neumí. A vy mluvíte o interaktivních e-mailech, e-shopech v newsletterech a posledních CSS3 technologiích… V čem je ten trik? Dá se to shrnout do jedné myšlenky?*

Ve skutečnosti je to všechno o cílení e-mailových klientů, ve kterých to funguje a přidání fallbacku pro klienty, kde to nefunguje. Ty věci, o kterých mluvím, nefungují v Outlooku a některé z nich nefungují ani v Gmailu, ale velká většina uživatelů je uvidí.

Z pohledu webu je to jako psaní kódu pro poslední verzi Chrome, zatímco také bereme v potaz, že 6 % našich uživatelů používá Netscape 4.

<figure>
<img src="/assets/img/content/dest/original/blog/mark_robbins.jpg" alt="Mark Robbins">
<figcaption markdown="1">    
Mark Robbins je e-mailový rebel.
</figcaption> 
</figure>

*Ve shrnutí [vaši přednášky pro WebExpo](https://www.webexpo.cz/praha2017/prednaska/interactive-email/)  jsem se dočetl, že můžeme zapomenout „že máme kódovat e-maily jako by byl rok 1999 a že vše musí být stylováno inline v HTML a layouty tvořeny tabulkami". Je vážně možné odstranit inline styly a `<table>`, když je na druhém konci Outlook?*

Od chvíle, co byl Gmail minulé září aktualizován, 95 % otevřených e-mailů teď podporuje blok `<style>` a to včetně Outlooku. Je stále nejlepší vkládat základní styly jako inline, abychom pokryli zbývajících 5 %, ale většinu z inline stylů můžeme  odstranit.

Pro `<table>` je podíl klientů, ve kterých je nepotřebujete, 94 %. Jen Outlook nás tady zdržuje. Většina vývojářů e-mailů dnes používá podmíněné komentáře, takže se tabulky používají pouze v Outlooku. Navíc právě pracuji na projektu, který odstraňuje všechny tabulky používané pro layout a přitom se stále dobře renderuje v Outlooku.

<!-- AdSnippet -->

*Líbí se mi nápad API vašeho produktu: [Rebel](https://www.rebelmail.com/). Ale není omezující aby vývojáři vybírali pouze z předpřipravených šablon? Většina klientů (a designérů), které znám, chce mít vlastní vzhled šablon.*

V rámci našeho API nabízíme hodně možností úprav na míru – až ke každému samostatnému elementu v interaktivních komponentách. Nabízíme také zákazníků možnost přidat vlastní HTML. A v rámci naší chystané aktualizace umožníme vytvoření prakticky jakéhokoliv e-mailového rozvržení jen pomocí JSONu.

*Jak Rebel zapadá do existujících pracovních postupů a nástrojů typu těch Mailchimpu?*

Naše pozice je vedle poskytovatelů e-mailových služeb. Vygenerujeme kód e-mailu a vyexportujeme jej jako HTML soubor. Ten můžete nahrát ručně nebo v některých případech automaticky do rozhraní poskytovatele. Jakmile je e-mail rozeslán, sbíráme analytiku ke všem interakcím v e-mailu. Její výsledky si pak můžete prohlížet v našem dashboardu nebo v existujícím software.

*Poslední otázka – jsem rád, že děláváte [přednášky o přístupnosti v e-mailu](https://www.slideshare.net/M_J_Robbins/accessibility-in-email-eoainsights). Souvisí to samozřejmě s mou přednáškou pro letošní WebExpo – [o návrhových vzorech pro přístupnost](https://www.webexpo.cz/praha2017/prednaska/pristupnost-v-kodu-ukazky-a-navrhove-vzory/). Budete mít čas probrat tohle téma i na vaší přednášce?*


Vlastně jsem první přednášku o přístupnosti e-mailů slyšel až loni, ale teď je to v komunitě žhavé téma. Dělám co nejlépe umím, abych téma dostal mezi lidi spolu s dalšími výbornými vývojáři e-mailů. Něco o tom ve své přednášce řeknu, ale také pracuji na samostatné přenášce o přístupnosti v e-mailech pro jindy.

*Děkuji a už vím, kde se [v sobotu 23. září ve tři odpoledne](https://www.webexpo.cz/praha2017/prednaska/interactive-email/) uvidíme.*