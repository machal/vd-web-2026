---
postID: 50
postTitle: 'Jednodušší vkládání webfontů pomocí WOFF a WOFF2'
postUrlId: woff2
postDateTime: '2016-01-28 00:00:00'
excerpt: 'Formát WOFF2 už má slušnou podporu – Firefox, Chrome, Opera mohou tvořit něco kolem třetiny až poloviny vaší návštěvnosti.'
postStatus: Published
authorID: 1
sectionID: 1
category:
  - css
  - css3
og_title: 'Jednodušší vkládání webfontů pomocí WOFF a WOFF2'
og_description: 'Formát WOFF2 už má slušnou podporu – Firefox, Chrome, Opera mohou tvořit něco kolem třetiny až poloviny vaší návštěvnosti.'
og_type: article
---

# Jednodušší vkládání webfontů pomocí WOFF a WOFF2

Formát WOFF2 už má slušnou podporu – Firefox, Chrome, Opera mohou tvořit něco kolem třetiny až poloviny vaší návštěvnosti.

Je také výrazně datově úspornější, než jeho starší brácha – formát WOFF. Třeba na Vzhůru dolů teď díky jeho nasazení u většiny uživatelů šetřím třetinu dat potřebných pro stažení webfontů.

Řez písma  | WOFF | WOFF2  
----- | -------- |  --------  
Foro Light |  33 kB | 22kB
Foro Bold |  33 kB | 22kB 
Foro Light Italic |  37 kB | 26kB 
Foro Extra Bold |  33 kB |  22kB
Celkem  |  **136 kB** | **92kB** | 

[Ještě lepší podporu](http://caniuse.com/#search=woff) má formát WOFF. Na Vzhůru dolů je to 98 procent. Na dalším projektu se „seznamáckou“ cílovkou je podíl přes čtyři pětiny, i to je krásné.

Pokud máte dobře vymyšlené zobrazování s fallbackovými systémovými písmy, nemusíte už dnes řešit starší formáty – TTF (TrueType), EOT nebo SVG.

Zápis pro [@font-face](/prirucka/css3-font-face) je bez starších formátů stručný:

```css
@font-face {
    font-family: WebFont;
    src:
        url('webfont.woff2') format('woff2'),
        url('webfont.woff') format('woff');
}
```

Dobré zmínit, že WOFF i WOFF2 jsou už komprimované a není potřeba na serveru nastavovat jejich gzipování.

K vygenerování WOFF2 jsem použil veverčí generátor webfontů: [fontsquirrel.com/tools/webfont-generator](http://www.fontsquirrel.com/tools/webfont-generator).

Sice nevím, k čemu je to dnes dobré, ale i jen kvůli principu je dobré [servírovat WOFF2](http://stackoverflow.com/questions/28235550/proper-mime-type-for-woff2-fonts) se správnými MIME typem. Já jsem si do `.htaccess` přidal tohle:

```
AddType  application/font-woff2  .woff2
```

## Co když ale chci webfonty i ve starších prohlížečích?

Liší se webfonty od systémových písem tolik, že jejich nepřítomnost bude ve starších prohlížečích znamenat úhyn uživatele nebo klienta? Být vámi, rozmyslím si, zda se taková práce obecně vyplatí. Můžete nicméně:

- přidat [podporu EOT](http://caniuse.com/#search=eot) (IE8 a starší; dnes 2 - 4 % uživatelů)
- nasadit [i podporu pro TTF](http://caniuse.com/#search=ttf) (Android Browser 4.3 a starší; taky kolem 2 - 4 %)

Zápis `@font-face` v CSS maximalizující kompatibilitu najdete [v příručce vlastnosti Font Face](http://www.vzhurudolu.cz/prirucka/css3-font-face).