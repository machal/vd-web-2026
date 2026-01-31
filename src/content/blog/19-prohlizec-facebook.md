---
postID: 19
postTitle: 'Mobilní prohlížeč kde lidé tráví nejvíc času? Nejspíš se jmenuje Facebook'
category:
  - responzivni-design
postUrlId: prohlizec-facebook
postDateTime: '2014-06-11 00:00:00'
excerpt: 'Dnes o klesajícím a ve skutečnosti neklesajícím času, který lidé na mobilech tráví v prohlížečích. O Facebooku. O pomalém mobilním Safari v něm. A o WebView, UIWebView pro ty co se zajímají o technikálie.'
postStatus: Published
authorID: 1
sectionID: 1
og_title: 'Mobilní prohlížeč kde lidé tráví nejvíc času? Nejspíš se jmenuje Facebook'
og_description: 'Dnes o klesajícím a ve skutečnosti neklesajícím času, který lidé na mobilech tráví v prohlížečích. O Facebooku. O pomalém mobilním Safari v něm. A o WebView, UIWebView pro ty co se zajímají o technikálie.'
og_type: article
---

# Mobilní prohlížeč kde lidé tráví nejvíc času? Nejspíš se jmenuje Facebook

Dnes o klesajícím a ve skutečnosti neklesajícím času, který lidé na mobilech tráví v prohlížečích. O Facebooku. O pomalém mobilním Safari v něm. A o WebView, UIWebView pro ty co se zajímají o technikálie. 

Vezměme, že podíl času, který lidé tráví v mobilních prohlížečích [meziročně klesá](http://www.flurry.com/bid/109749/Apps-Solidify-Leadership-Six-Years-into-the-Mobile-Revolution#.U5B63JSSxbx). Mezi roky 2013 a 2014 o celých 7 procentních bodů na nynějších 14%.

<img src="/assets/img/content/dest/mobilni-prohlizece-10-flurry.jpg" alt="14% podíl času stráveného v mobilích prohlížečích">

Můžete to interpretovat i [pomateně jako potenciální konec webu](http://www.lupa.cz/clanky/mobilni-web-ustupuje-aplikacim-muze-to-znamenat-jeho-konec/). Nebo se na graf podíváte pořádně a zeptáte se — které aplikace v nějaké situaci otevírají browser? 

První místo v počtu strávených hodin — hry. No, jasně. Prakticky žádný browser.

Druhé místo — nativní mobilní Facebook aplikace. To je takový ten seznam odkazů na webové stránky, které si lidé otevírají přímo v aplikaci, že ano? Další — Twitter, Social Messaging — tam si lidi občas nějaký ten odkaz pošlou taky, že ano? 

## Ano, web je dneska všude. Ne jen v konvenčních prohlížečích

Bez ohledu na to kolik času jeho uživatelé tráví brouzdáním po odkazovaných stránkách má Facebook potenciál být [nejpoužívanějším mobilním prohlížečem vůbec](http://www.lukew.com/ff/entry.asp?1801).

Tady bychom mohli skončit, ale pokud vás zajímají technické detaily, čtěte dál.

## Vkládané prohlížeče, WebView a UIWebView

Když vytváříte nativní aplikaci pro Android nebo iOS, můžete do ní vložit kompontentu se systémovým prohlížečem. Na Androidu se jí říká [WebView](http://developer.android.com/reference/android/webkit/WebView.html), na iOS [UIWebView](https://developer.apple.com/library/ios/documentation/uikit/reference/UIWebView_Class/Reference/Reference.html).

Na Androidu její vykreslovací jádro tvoří výchozí Android Browser ve verzi podle operačního systému. Na Androidu 2.3 je to Android Browser 2.3 a tak dále. Tohle jednoduché pravidlo narušuje až Android 4.4 kde se stránky v aplikacích vykreslují už pomocí Chrome verze 30.

Na iOS je to na jednu stranu jednodušší, protože ve všech verzích vykresluje stránky v UIWebView Safari ve verzi operačního systému. Na druhou stranu složitější v tom, že to není stejný prohlížeč — nemá totiž přístup k rychlejšímu javascriptovému engine Nitro, ani ke cache mobilního Safari. Otevírání a provádění javascriptů je v prohlížeči uvnitř aplikací přibližně [o 20% pomalejší](http://www.guypo.com/mobile/ios-browsers-speed-bakeoff/) než v mobilním Safari.

<img src="/assets/img/content/dest/mobilni-prohlizece-7-webview.jpg" alt="Problémy vkládaných prohlížečů">

Vývojáři nativních aplikací se navíc předhánějí v úpravách ovládacích prvků aplikace. Nepočítejte tedy s tím, že třeba výška zobrazovací plochy bude stejná jako v běžném mobilním Safari a zlom stránky bude někde jinde než váš vymazlený design vyžaduje.

Naštěstí se zdá, že od iOS bude mít i vkládaný prohlížeč (UIWebView) [plnohodnotný javascriptový engine](https://twitter.com/martindrzka/status/474095065422643200). O nesdílené cache a další nevýhodách toho současného ovšem zatím žádné informace nejsou známy.

Proto i tak…

## Testujte weby ve vkládaných prohlížečích

Pokud vaše mobilní nebo responzivní stránka využívá cokoliv nestandardního (třeba fixní hlavičku/patičku), výkonnostně náročného (složitější animace, ajax) nebo má potenciál načítat se pomalu, jděte si ji hned otestovat v pravděpodobně nejpoužívanějším mobilním prohlížeči — Facebooku.