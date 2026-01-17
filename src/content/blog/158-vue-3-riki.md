---
postID: 158
postTitle: 'Rozhovor S Riki Fridrichem o chystaném Vue.js 3 a Composition API'
postUrlId: vue-3-riki
postDateTime: 2020-02-03
excerpt: 'Co si Riki myslí o novince v populárním frontendovém frameworku?'
postStatus: Published
authorID: 1
sectionID: 1
category:
  - vue-js
  - js
  - javascript
  - vue
no_ads: false
include_rss: true
category_highlight: true
og_title: 'Rozhovor S Riki Fridrichem o chystaném Vue.js 3 a Composition API'
og_description: 'Co si Riki myslí o novince v populárním frontendovém frameworku?'
og_type: article
---

# Rozhovor S Riki Fridrichem o chystaném Vue.js 3 a Composition API

*Nová, třetí verze populárního frontendového frameworku tvoří v komunitě nepřehlédnutelné téma. Zeptali jsme se tedy [Rikiho Fridricha](https://www.vzhurudolu.cz/lektori/riki-fridrich), lektora našich javascriptových školení, co si o tom myslí on.*

## Novinky ve Vue 3: Hlavně Composition API a TypeScript

**Riki, v čem bude Vue 3 nové a na co se nejvíc těšíš ty?**

Teším sa na [Composition API](https://vue-composition-api-rfc.netlify.com/). Umožní to písať prehľadnejší znovupoužiteľný kód. Doteraz sa to dalo pomocou mixinov, ale tie ja osobne považujem za antipatern. Síce to funguje, ale veľmi zle sa v nich orientuje. 

![Riki Fridrich](https://www.vzhurudolu.cz/perch-content/riki.jpg)

Okrem toho Composition API umožní písať Vue kód priamo v TypeScripte. To v súčasnosti treba trochu hackovať.

**Je pravda, že je Composition API reakcí na React Hooks? V čem se případně liší?**

Vue samozrejme preberá nápady, s ktorými prišiel React. Tvorcovia Vue sa snažia poučiť z problémov, s ktorými sa potýka implementácia hooks v Reacte a robia podobnú vec po svojom, t.j. tak aby to bolo zrozumiteľnejšie a nevyžadovalo to veľa boilerplate kódu, [viď porovnanie](https://vue-composition-api-rfc.netlify.com/#comparison-with-react-hooks).

Tipol by som si, že vývojári Reactu onedlho preberú niektoré koncepty z Composition API. Táto inšpirácia medzi frameworkmi je podľa mňa skvelá a posúva to celý ekosystém vpred.

**Nedal bys nám příklad krátkého kódu, jak vypadá v Composition API a jak pomocí mixinů?**

Mixiny, hlavne vo väčšom projekte, kde sa ich v jednej komponente bežne použije viac naraz, často vedú k neprehľadnému kódu a potenciálne k pomenovacím konfliktom, viď [codesandbox.io](https://codesandbox.io/s/eager-sky-735pq?fontsize=14&hidenavigation=1&module=%2Fsrc%2FComponentWithMixins.vue&theme=dark).

<iframe src="https://codesandbox.io/embed/vue-mixin-versus-composition-735pq?fontsize=14&hidenavigation=1&theme=dark" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" title="vue-mixin-versus-composition" allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

Composition API umožňuje znovupoužiteľnosť kódu oveľa explicitnejším spôsobom. Pomenovacie konflikty sú odhalené okamžite a je jednoduché ich vyriešiť ([codesandbox.io](https://codesandbox.io/s/eager-sky-735pq?fontsize=14&hidenavigation=1&module=%2Fsrc%2FComponentWithComposition.vue&theme=dark))

<iframe src="https://codesandbox.io/embed/vue-mixin-versus-composition-735pq?fontsize=14&hidenavigation=1&theme=dark" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" title="vue-mixin-versus-composition" allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"     sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

## Kritika Vue 3

**Co říkáš na [ohlasy kritizující novou verzi](https://levelup.gitconnected.com/a-recap-of-frontend-development-in-2019-1e7d07966d6c?gi=eb48086b53c5)? Vývojáři prý kritizovali hlavně zamýšlené přepracování API. Někteří prý zvažují „přejít na Svelte, protože se bojí, že se Vue pokouší být příliš jako React“.**

Nové verzie vždy budú kritizované. Tomu sa nedá vyhnúť. Ale práve vďaka tej kritike autori Vue urobili zmeny v plánoch, podľa mňa k lepšiemu.

<!-- AdSnippet -->

[Vue 3](https://madewithvuejs.com/blog/vue-3-roundup) bude oproti Vue 2 inkrementálna zmena. Takže žiadny prúser typu Angular sa snáď konať nebude. Vďaka prakticky plnej kompatibilite s Vue 2 nebude migrácia na Vue 3 vyžadovať refactoring, bude sa dať urobiť priebežne. Už teraz si napríklad môžete do projektu pridať pripravované [Composition API ako samostatnú závislosť](https://github.com/vuejs/composition-api) a začať to používať. Keď neskôr prejdete na Vue 3, tak jednoducho tú závislosť odstránite.

A ak niektorí vývojári kvôli Vue 3 prejdú na [Svelte](https://svelte.dev/), budem len rád. Svelte je skvelý framework, ktorý si zaslúži väčšiu komunitu. [Prorokoval som](https://www.vzhurudolu.cz/podcast/150-podcast-js-frameworky) mu, že ho ostatné frameworky vykradnú, ale že ho bude používať málokto. Budem nadšený, ak sa budem mýliť. V tom, že Svelte nikto nebude používať. Nie v tom, že ho ostatné frameworky vykradnú. Myslím, že by bola škoda, keby jeho idey nevykradli.

## Co nového chystá Riki na školeních?

**Mohou se lidé těšit na nějaké novinky na tvých třech školeních?**

No jasné. Každé moje ďalšie školenie je lepšie než to predchádzajúce. Hlavne vďaka skvelej spätnej väzbe účastníkov.

<p class="video">
Video: <a href="https://www.youtube.com/watch?v=kzJxAYDUB1A">Duševné zdravie vo Vue.js</a> ~ Rikiho přednáška z pražského meetupu Frontendisti.cz.
</p>

Momentálne pripravujem pokračovanie [svojho školenia o Vue](https://www.vzhurudolu.cz/kurzy/vue-js). Bude určené pre pokročilých vývojárov, ktorí pracujú na väčších a zložitejších projektoch. Pôjdeme v ňom viac do hĺbky, ukážeme si napríklad ako pracovať s UI knižnicami, Routerom a Vuex.

**Díky za rozhovor!**