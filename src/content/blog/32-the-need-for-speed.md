---
postID: 32
postTitle: 'Guillermo Rauch: návrhové vzory pro vylepšení vnímané rychlosti webových aplikací'
postUrlId: the-need-for-speed
postDateTime: '2015-05-14 00:00:00'
excerpt: 'Návrhové vzory známé z rozhraní Google, Facebooku a dalších.'
postStatus: Published
authorID: 1
sectionID: 1
og_title: 'Guillermo Rauch: návrhové vzory pro vylepšení vnímané rychlosti webových aplikací'
og_description: 'Návrhové vzory známé z rozhraní Google, Facebooku a dalších.'
og_type: article
---

# Guillermo Rauch: návrhové vzory pro vylepšení vnímané rychlosti webových aplikací

Moje poznámky z prezentace „The Need for Speed”. Hezky a na konkrétním užití v aplikaci Cloudup shrnuje návrhové vzory známé z rozhraní Google, Facebooku a dalších.

* Stránka musí okamžitě reagovat na uživatelské interakce. Dobře známý příklad je  Google stránka vyhledáváním.
* Tam kde zatím neznají obsah rozraní, zobrazí alespoň placeholder, který vypadá podobně. Obsah se zobrazí hned poté. Ve vývoji pro iOS se podobně využívá zástupný obrázek `default.png`.
* Z UI je pak možné odstranit zbytečné a frustrující kolovrátky (spinners) a používat je jen ve chvíli kdy uživatel čeká více než 1 vteřinu.
* Ve chvíli kdy se změní data na backendu, snaží se *reaktivně* změnit frontend. V Cloudup pro to používají vlastní frontend technologii [MyDB](https://cloudup.com/blog/introducing-mydb), propojenou s MongoDB. 

První dva návrhové vzory jsou hezky vidět na videu:

<video autoplay loop width="100%">
<source src="/assets/img/content/src/cloudup.mp4">
</video>


Ale rozklikněte si nejlépe [celý článek](https://cloudup.com/blog/the-need-for-speed).