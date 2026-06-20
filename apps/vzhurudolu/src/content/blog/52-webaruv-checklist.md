---
postID: 52
postTitle: 'Představuji aplikaci Webařův checklist'
postUrlId: webaruv-checklist
postDateTime: '2016-03-06 00:00:00'
excerpt: 'Webařův checklist měl v podobě článku a PDF hezké ohlasy. Jenže… Obojí je trochu nepraktické. Proto tahle webová aplikace.'
postStatus: Published
authorID: 1
sectionID: 1
og_title: 'Představuji aplikaci Webařův checklist'
og_description: 'Webařův checklist měl v podobě článku a PDF hezké ohlasy. Jenže… Obojí je trochu nepraktické. Proto tahle webová aplikace.'
og_type: article
---

# Představuji aplikaci Webařův checklist

Proč dělat weby blbě, když je můžete dělat dobře? Třeba podle [kontrolního seznamu ze Vzhůru dolů](http://www.vzhurudolu.cz/checklist).

[![Checklist pro dokončení webu](/assets/img/content/dest/checklist/checklist-webapp-for-article.jpg)](http://www.vzhurudolu.cz/checklist)

Webařův checklist měl v [podobě článku a PDF](http://www.vzhurudolu.cz/prirucka/checklist) hezké ohlasy. Jenže… *Článek*  v době, kdy existují aplikace snad i na drbání za uchem!? *Pé dé ef*  ve století, ve kterém všechny potíže světa vyřešil React?!

Já vím, já vím. Obojí je trochu nepraktické. A proto vznikla tahle miniaplikace.

Funguje jak asi očekáváte:

- Pro každý projekt si vytvoříte nový seznam a případně jej nasdílíte s kolegy.
- Přidáváte, upravujte nebo mažete položky seznamů.
- Apka vám bude ukládat průběžný stav plnění úkolů na serveru, abyste to měli dostupné ze všech zařízení.

Hlavní cílovou skupinou jsou frontend kodéři. Největší využití checklist najde pro dokončovací práce na statických webech. Je v něm ale řada překryvů do backendu i dalších webařských řemesel. [Zkuste si to.](http://www.vzhurudolu.cz/checklist)

## Jak je to udělané?

Checklist je napsaný v Reactu, backendové API v Nette.

Prakticky vše co v checklistech vidíte je frontendová [React aplikace](https://github.com/icoach/vzhurudolu-checklist/). Ta žije v lese tagů uvnitř jednoho malého, serverem generovaného, divu:

```html
<div id="vd-checklist-app" data-lang="cs"></div>
…
<script src="vzhurudolu-checklist.min.js"></script>
```

Serverová část je tady velmi tenká. Slouží jen pro obsluhu databáze  Reactem [požadovaného API](http://docs.checklist5.apiary.io/).

Jak víte, webové aplikace nedělám, specializuji se na prezentační weby. Ale s kombinací Reactu a PHP se pracovalo hezky. Ještě hezčí by samozřejmě byl nějaký univerzálně javascriptový systém. Myslím ale, že v případě stávajících webů nic nebrání vkládání miniaplikací stejným způsobem.

PHP generuje statickou, roboty indexovatelnou stránku a poskytuje API. React je skvělý pro vysoce interaktivní rozhraní, tedy aplikace. 

<p class="text-center margin-top-xl margin-bottom-xl">
<a href="http://www.vzhurudolu.cz/checklist" class="button">Vyzkoušet checklist</a>
</p>

<small class="text-center">Nápady a připomínky k funkčnosti i obsahu velmi vítám: [martin@vzhurudolu.cz](mailto:martin@vzhurudolu.cz).</small>

<small class="text-center">S Reactem pomohl [Martin Staněk](http://martinstanek.cz/). S Nette částí pak [Přemek Koch](https://www.linkedin.com/in/premekkoch). Díky, pánové!</small>