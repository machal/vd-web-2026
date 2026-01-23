---
postID: 91
postTitle: 'Konec Boweru: Na nové projekty už jej nepoužívejte'
postUrlId: bower-mrtvy
postDateTime: '2017-06-16 00:00:00'
excerpt: 'Vyhrál to tedy package.json a je asi jedno, jestli ho budete ovládat NPM nebo Yarnem.'
postStatus: Published
authorID: 0
sectionID: 1
category: ['nastroje']
no_ads: false
og_title: 'Konec Boweru: Na nové projekty už jej nepoužívejte'
og_description: 'Vyhrál to tedy package.json a je asi jedno, jestli ho budete ovládat NPM nebo Yarnem.'
og_type: article
---
# Konec Boweru: Na nové projekty už jej nepoužívejte

Přátelé, takže poté, co někteří členové javascriptové komunity zaživa pohřbili jQuery, Grunt, Gulp, NPM a další, dočkali jsme se první skutečné mrtvoly: je to [Bower](http://www.vzhurudolu.cz/prirucka/bower).

[Na webu](https://bower.io/) tohodle oblíbeného správce frontendových balíčků už nějakou dobu visí upozornění:

> ...psst! While Bower is maintained, we recommend [yarn](https://yarnpkg.com/) and [webpack](https://webpack.js.org/) for new front-end projects!

Takže ne, není zatím potřeba stresovat se stávajícími projekty, ale na nových už s Bowerem nepočítejte.

## Proč už Bower nepotřebujeme?

Budu se zaměřovat na Bower jako správce balíčků, jeho další funkce vynechávám. Bower je totiž duplicitní [k NPM](http://www.vzhurudolu.cz/prirucka/node-instalace), dnes už daleko rozšířenějšímu správci.

<!-- AdSnippet -->

Bower byl vždy určený čistě pro frontendové balíčky. NPM pro javascriptové balíčky na frontend i backend. Proto NPM instalovalo závislosti balíčků do vnořeného stromu. V adresáři projektu jste tedy spoustu balíčků měli v duplicitních vydáních. To nehezky zvětšovalo datový objem, ale působilo i další problémy. 

[Od verze tři](https://docs.npmjs.com/how-npm-works/npm3) se ale NPM snaží duplicity redukovat. Nemluvě o alternativě k NPM, Yarnu, který umí [pracovat v režimu „plochého stromu“](https://yarnpkg.com/lang/en/docs/cli/install/#toc-yarn-install-flat) velmi podobném Boweru. Jak říká jeden [z účastníků diskuze](https://github.com/bower/bower/issues/2298#issuecomment-224836739) na Githubu Boweru:

> `yarn install --flat` does exactly what I need, so I don't have a reason to user Bower any more.

Dalším důvod vyšel ze strany autorů frontendových balíčků. Spravovat zároveň `package.json` pro NPM a `bower.json` pro Bower je trošku pruda. A jak jste si možná také všimli, balíčků co na Bower kašlou, začalo přibývat.

Vyhrál to tedy `package.json` a je asi jedno, jestli ho budete ovládat NPM nebo Yarnem.