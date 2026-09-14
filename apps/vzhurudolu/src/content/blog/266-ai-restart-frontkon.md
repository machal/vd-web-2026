---
postID: 266
postTitle: 'AI restart. Pět z otázek, které musí dořešit vývojářská komunita'
postUrlId: ai-restart-frontkon
postDateTime: 2026-09-14
excerpt: 'Softwarová vývojařina prožívá krizi: agenti zrychlili práci, ale přinesli psychickou zátěž, nové lidi v repozitářích a tlak na pracovní místa. Už není otázka, zda AI používat. Řešíme, jak je používat — a pět otázek, které musí komunita dořešit.'
postStatus: Published
authorID: 1
sectionID: 1
category:
  - ai
  - frontkon
  - netechnické
no_ads: true
include_rss: true
category_highlight: true
og_title: 'AI restart. Pět z otázek, které musí dořešit vývojářská komunita'
og_description: 'Softwarová vývojařina prožívá krizi: agenti zrychlili práci, ale přinesli psychickou zátěž, nové lidi v repozitářích a tlak na pracovní místa. Už není otázka, zda AI používat. Řešíme, jak je používat — a pět otázek, které musí komunita dořešit.'
og_type: article
---

# AI restart. Pět z otázek, které musí dořešit vývojářská komunita

Softwarová vývojařina prožívá krizi. Na jedné straně přinesl agentický vývoj ohromné zefektivnění a daleko zábavnější možnosti práce.

Na straně druhé vidíme úplně jiný přístup k vývoji, znásobení psychické zátěže, „vpád barbarů“, tedy nových, dříve vývojem nepolíbených lidí do našich repozitářů.

No a taky tlak na pracovní místa, propouštění a úvahy o tom, zda vývojářská práce dává vůbec ještě smysl.

Je to mazec, vážení.

Když jsme začali připravovat program pro letošní FrontKon, přemýšleli jsme, jak to uchopit. Už není potřeba přemýšlet, zda AI používat. Řešíme, jak je používat.

Vímže, že vývojáři budou psát stále méně kódu, jestli vůbec nějaký.

Ale za praktickými otázkami a přednáškami se táhne ještě jiné, daleko znepokojivější a filozofičtější otázky.

Je jich opravdu hodně, ale ty nejdůležitější z nich se pokouším v tomhle článku pojmenovat. Pojďme o nich diskutovat.

## 1) Když AI píše většinu kódu, co znamená být vývojářem?

V průzkumu [JetBrains Developer Ecosystem 2026](https://blog.jetbrains.com/research/2026/08/how-much-code-do-developers-really-let-agents-write) mezi více než 15 000 profesionálními vývojáři uvedla více než polovina lidí, že ručně píše méně než 20 % svého kódu. Každý pátý už nenapsal bez pomoci AI vůbec nic. To bylo v první polovině letošního roku.

JetBrains u svých dat schválně používá slovo „coders“. Měří totiž způsob vzniku kódu, nikoliv celý vývoj. Výsledek může navrhnout agent, ale někdo ještě musí vybrat problém, pochopit uživatele, rozhodnout o architektuře a dostat software bezpečně do provozu. Ať to nepadá, je to rychlý a bezpečný.

Z toho nám vyplývají následující otázky:

- Když samotné psaní postupně mizí, podle čeho vlastně poznáme vývojáře?
- Není čas přestat zaměňovat psaní kódu s tvorbou softwaru, když mluvíme o vývojářích?

*TODO Obrázek FrontKon: *[https://photos.google.com/share/AF1QipP9kMfrWfeomUieqM24tQwVykrwYL7qGQbqgQCkQ7BwnsW1GBSxgO3FXI3fXXmepQ/photo/AF1QipNj8J4GcU8N4Y97iXa3QhbNaBZLDOQUHLcsTK_D?key=VmtxYndSNWpiZ2E2NkFrRnNSWEoyYzlOWEZCTVh3](https://photos.google.com/share/AF1QipP9kMfrWfeomUieqM24tQwVykrwYL7qGQbqgQCkQ7BwnsW1GBSxgO3FXI3fXXmepQ/photo/AF1QipNj8J4GcU8N4Y97iXa3QhbNaBZLDOQUHLcsTK_D?key=VmtxYndSNWpiZ2E2NkFrRnNSWEoyYzlOWEZCTVh3)

*Obrázek: FrontKon 2025. Letos chceme v debatě o tom, jak AI mění práci vývojářů, pokračovat přímo na *[*FrontKonu 2026*](https://www.frontkon.tech/cs/events/frontkon-26/program)*.*

## 2) Musíme ještě číst veškerý kód? A co znamená, když jej číst nebudeme?

Průzkum [Sonar State of Code 2026](https://www.sonarsource.com/blog/state-of-code-developer-survey-report-the-current-reality-of-ai-coding/) došel k podobným závěrům jako ten předchozí. AI vytvořila nebo pomohla vytvořit 42 % commitovaného kódu. Zároveň ale 38 % respondentů uvedlo, že kontrola AI kódu vyžaduje více práce než kontrola kódu od kolegů.

Tak jasně, známe to všichni. AI generovaný slop v pull requestech. Nová otravná povinná četba. Jenže… je to vlastně povinné?

Podle stejného průzkumu AI kódu plně nedůvěřuje 96 % vývojářů, jenže před commitem jej ale pokaždé ověřuje jen 48 %.

Kód vzniká rychleji, jenže lidská schopnost posoudit jeho správnost se nijak zásadně nezrychlila.

Addy Osmani to označuje jako [comprehension debt](https://addyosmani.com/blog/comprehension-debt/) (takže „dluh pozorumění“). Jde o rozdíl mezi množstvím kódu v systému a tím, jaké části lidé skutečně rozumí.

V experimentu [Anthropic](https://www.anthropic.com/research/AI-assistance-coding-skills) dosáhli lidé používající AI podobné rychlosti jako kontrolní skupina, ale v testu porozumění získali 50 % místo 67 %.

Data Faros AI od 22 000 vývojářů ve 4 000 týmech podle [Addyho Osmaniho](https://addyosmani.com/blog/agentic-code-review/) ukazují, že s vysokým využitím AI vzrostla mediánová délka review o 441,5 %. Ano, čtyřikrát. Podíl PR sloučených bez kontroly přitom stoupl o 31,3 %. Ano, o třetinu. Taky vám proběhl takový lehký mrazíček po zádech?

Otázky zní:

- Musíme stále kontrolovat každý řádek v pull requestech?
- Můžeme si dovolit vznik funkčního software, kterému nikdo nerozumí?
- Co když kód neslučujeme bez review záměrně, ale prostě proto, že jej už nestíháme číst?
- Co když nám AI neodstranila úzké místo vývoje, ale jen jej přesunula o jeden krok dál?

*TODO obrázek FrontKon: *[https://photos.google.com/share/AF1QipP9kMfrWfeomUieqM24tQwVykrwYL7qGQbqgQCkQ7BwnsW1GBSxgO3FXI3fXXmepQ/photo/AF1QipPYzKKkQfYNRzur8bQGKrz5VtRCqk9gIYVEOWqJ?key=VmtxYndSNWpiZ2E2NkFrRnNSWEoyYzlOWEZCTVh3](https://photos.google.com/share/AF1QipP9kMfrWfeomUieqM24tQwVykrwYL7qGQbqgQCkQ7BwnsW1GBSxgO3FXI3fXXmepQ/photo/AF1QipPYzKKkQfYNRzur8bQGKrz5VtRCqk9gIYVEOWqJ?key=VmtxYndSNWpiZ2E2NkFrRnNSWEoyYzlOWEZCTVh3)

*Obrázek: FrontKon 2025. Tady na lidi žádný pull request nečeká. Snad.*

## 3) Stávají se z vývojářů manažeři agentů?

Addy Osmani píše, co všichni vidíme. Při práci s více LLM agenty už nejde o prompting. Jde o [řízení malého týmu](https://addyosmani.com/blog/coding-agents-manager/). Vývojář vysvětluje záměr, dodává kontext, rozděluje práci, nastavuje hranice a kontroluje výsledek.

Tvůrce Claude Code Boris Cherny spouští pět lokálních agentů a dalších pět až deset v prohlížeči. To bylo zkraje roku. Zeptejte se Borise, kolik agentů mu běží dneska.

Osmani ale zároveň doporučuje omezovat rozpracovanou práci, protože s každým agentem roste fronta výstupů, rozhodnutí a code review.

Znáte to? My vibekodéři jo. Šibe nám z toho.

Takže ty důležité z otázek zní:

- Stává se tedy z každého vývojáře manažer agentů? Co to znamená pro lidi, kteří chtěli hlavně v klidu psát kód?
- Je deset agentů desetinásobná produktivita, nebo jen deset nových míst, kam musíme přesouvat pozornost?

*TODO obrázek FrontKon: *[*https://photos.google.com/share/AF1QipP9kMfrWfeomUieqM24tQwVykrwYL7qGQbqgQCkQ7BwnsW1GBSxgO3FXI3fXXmepQ/photo/AF1QipMMjkAdB39jU0djK05azxw1afMjK2i3mQbamsPK?key=VmtxYndSNWpiZ2E2NkFrRnNSWEoyYzlOWEZCTVh3*](https://photos.google.com/share/AF1QipP9kMfrWfeomUieqM24tQwVykrwYL7qGQbqgQCkQ7BwnsW1GBSxgO3FXI3fXXmepQ/photo/AF1QipMMjkAdB39jU0djK05azxw1afMjK2i3mQbamsPK?key=VmtxYndSNWpiZ2E2NkFrRnNSWEoyYzlOWEZCTVh3)

*Obrázek: FrontKon 2025. Řídit plný sál lidí možná bude brzy jednodušší než uhlídat deset agentů.*

## 4) Co AI dělá s učením a hlubokou prací?

Addy Osmani mluví o cognitive outsourcing (takže delegování myšlení)  a [cognitive surrender](https://addyosmani.com/blog/cognitive-surrender) (takže rezignaci na myšlení).

Bláznivé, ale reálné. My všichni, kteří LLMka používáme, jsme na hraně propasti hloupnutí. Nechtějte vědět, co to dělá s dnešními teenagery. Mám je doma. Nechte si to vyprávět někde v temném koutě na FrontKonu.

Ale zpět k vývojářům. Ve třech experimentech s 1 372 účastníky lidé přijali chybnou odpověď AI. V 73 % případů přijali jako správnou odpověď, i když se model mýlil. Přítomnost AI v procesu uvažování přitom zvýšila jejich sebejistotu.

Experiment Anthropic sledoval 52 vývojářů, kteří se učili novou knihovnu. Největší propad u skupiny používající AI nastal v debuggingu, menší také v pochopení konceptů a čtení kódu. Hůře dopadli hlavně lidé, kteří AI pasivně delegovali práci. Lépe ti, kteří se ptali na principy a souvislosti. Byli šťouraví.

Otázky tedy zní:

- Jak poznáme okamžik, kdy už neposuzujeme cizí odpověď, ale jen přebíráme její sebevědomí?
- Kdy je AI učitel a kdy náhrada učení?
- Blbneme?

*TODO obrázek FrontKon: *[https://photos.google.com/share/AF1QipP9kMfrWfeomUieqM24tQwVykrwYL7qGQbqgQCkQ7BwnsW1GBSxgO3FXI3fXXmepQ/photo/AF1QipOHPyOJNW9lWidsz0fHTm3ZWKDLrW5wLb70Zdq_?key=VmtxYndSNWpiZ2E2NkFrRnNSWEoyYzlOWEZCTVh3](https://photos.google.com/share/AF1QipP9kMfrWfeomUieqM24tQwVykrwYL7qGQbqgQCkQ7BwnsW1GBSxgO3FXI3fXXmepQ/photo/AF1QipOHPyOJNW9lWidsz0fHTm3ZWKDLrW5wLb70Zdq_?key=VmtxYndSNWpiZ2E2NkFrRnNSWEoyYzlOWEZCTVh3)

*Obrázek: FrontKon 2025. Zatím není jisté, zda se publikum učí s AI, bez AI, nebo navzdory ní.*

## 5) Změní se identita lidí, kteří dělají vývojáře?

Sám jsem aktivní vývojářskou kariéru ukončil už dávno. Dávno předtím, než mnozí ze čtenářek nebo čtenářů začali.

Dnes jsem webperf expert, produktový člověk, vedu týmy, dělám byznys. Přesto díky agentům znovu zasahuju přímo do kódu PageSpeed.ONE a někdy vytvořím hotovou fíčuru rychleji, než bych připravil zadání. [Psal jsem o tom už dříve](https://www.vzhurudolu.cz/blog/264-ceo-bere-praci).

Osmani rozlišuje práci, kterou lze poslat agentům na pozadí, a práci vyžadující těsnou spolupráci člověka. Architektura, nejasné požadavky a produktové nuance podle něj stále potřebují zkušený úsudek. Zároveň ale někdo musí řídit celý proud agentní práce.

Známý vývojář, spolutvůrce frameworku Django a dlouholetý komentátor vývoje kolem AI [Simon Willison ve svém článku o vibe-codingu a agentic engineeringu](https://simonwillison.net/2026/May/6/vibe-coding-and-agentic-engineering/) píše, že potřebné dovednosti nevypadají jako kurz promptování.

Však posuďte sami: plánování, testování, dokumentace, verzování, manuální QA, výzkum, odhadování a schopnost poznat, co lze bezpečně delegovat.

Nejsou to náhodou schopnosti zkušených vývojářů, tech leadů, prostě těch, co mají manažerské dovednosti?

Willison odděluje nezávazný vibe-coding od agentic engineeringu. U produkčního softwaru podle něj nestačí, že výsledek vypadá funkčně. Vývojář pořád odpovídá za bezpečnost, provoz, výkon a dopad na cizí data. AI zrychluje realizaci, ale tuto část práce za člověka nepřebírá.

Otázky zní:

- Kdo všechno se dnes vlastně může stát vývojářem?
- Co to udělá s lidmi, kteří si vývoj vybrali právě kvůli klidu, soustředění a jasně ohraničeným úkolům?
- Budeme se ještě učit především syntax a frameworky, nebo spíš úsudek, komunikaci a práci s nejistotou?
- Vznikne jedna nová role vývojáře, nebo se profese rozdělí na široké orchestrátory a hluboké technické specialisty?
- Přijdou „vibe-barbaři“ a nahradí „vývojáře“?

*TODO obrázek FrontKon: *[https://photos.google.com/share/AF1QipP9kMfrWfeomUieqM24tQwVykrwYL7qGQbqgQCkQ7BwnsW1GBSxgO3FXI3fXXmepQ/photo/AF1QipOVmlDge7zKTGaplqweKYO3mPLoCZkgg2WTJkof?key=VmtxYndSNWpiZ2E2NkFrRnNSWEoyYzlOWEZCTVh3](https://photos.google.com/share/AF1QipP9kMfrWfeomUieqM24tQwVykrwYL7qGQbqgQCkQ7BwnsW1GBSxgO3FXI3fXXmepQ/photo/AF1QipOVmlDge7zKTGaplqweKYO3mPLoCZkgg2WTJkof?key=VmtxYndSNWpiZ2E2NkFrRnNSWEoyYzlOWEZCTVh3)

*Obrázek: FrontKon 2025. Vývojáři? Manažeři agentů? Vibe-barbaři? *

Tak.

Mohl bych pokračovat, trošku jsem se rozjel. Pardon, mám toho plnou hlavu.

Můj názor je, že vývojář jako role nezmizí. Docela jistě ale změní patro v procesu vývoje software. Zcela určitě změní dovednosti. Možná do vývoje přijdou noví lidé a někteří z těch současných, kteří se jen hrabou v kódu, prostě budou muset odejít.

Vývojáři budou méně dělníci kódu, začnou držet více zodpovědnosti. Slovo „zodpovědnost“ je klíč. AIčko vám zodpovědnost nepřebere. Za produkt, za web, za appku. Tu stále budou v lidských organizacích držet lidé.

Vývojařina nikdy takovou krizí neprocházela. Je to velké. Možná trochu děsivé, ale zároveň zajímavé a poskytující ohromné možnosti, pro ty s hlavou otevřenou.

Pojďte o tom diskutovat: LinkedIn, Facebook, X nebo přímo na FrontKon.
