# Odkazování v článcích (příručka, blog, podcast)

globs: src/content/prirucka/**/*.md, src/content/blog/**/*.md, src/content/podcast/**/*.md

Při psaní nebo větších úpravách článků v příručce, blogu a podcastu používej **vždy** tuto formu odkazování:

1. **Externí nástroje a služby**  
   Na oficiální stránku nebo dokumentaci odkazuj **vždy u prvního výskytu** daného slova nebo spojení v textu (ne u každého opakování).

2. **Vnitřní odkazy na vlastní články**  
   Odkazuj na důležité články (zobrazené na homepage, s `category_highlight`) a na články z posledních zhruba dvou let. Odkazy vkládej přirozeně do textu tam, kde to dává smysl.

3. **Zpětné provázání**  
   Při novém článku **nejdřív drafty do chatu** (3–5 návrhů: soubor, okolí citace, navrhovaný text). Zapisuj až po výběru uživatele — **nikdy** neplň kvótu „3–5 odkazů“ zápisem naslepo.  
   Cílové články: jen **delší** texty (cca 1+ A4). Krátké pečlivě rytmizované eseje neupravuj.  
   Jen místa, kde téma **už v textu sedí** (stejný problém, stejná situace). Slabý nebo natažený vztah = odkaz **nepřidávej**.  
   Preferuj prolinkování existujícího slova, případně **jednu** krátkou větu uprostřed souvisejícího odstavce.  
   **Ne** umělé „→ Související:“ bloky.  
   **Ne** na konec článku, shrnutí, výzvu („Zkuste…“, „Napište mi…“) ani závěrečný rytmický odstavec — ty nech čisté.

## Formát interních odkazů (povinně .md)

**Interní odkazy na články (blog, příručka, podcast) piš vždy na konkrétní .md soubor.** V Markdownu nikdy nepoužívej hotové URL typu `/blog/258-…` ani `/prirucka/nazev` – build je přepisuje z .md cest.

- **V příručce:** `[text](nazev-clanku.md)` → build přepíše na `/prirucka/nazev-clanku`.
- **Mezi sekcemi:** `[text](../blog/258-nazev.md)` nebo `[text](../prirucka/nazev.md)` nebo `[text](../podcast/258-nazev.md)` → build přepíše na `/blog/…`, `/prirucka/…`, `/podcast/…`.
- **Špatně:** `[text](/blog/258-nazev)`, `[text](/prirucka/nazev)` – v MD souborech takové odkazy nepoužívat.

Pravidlo platí pro odkazy z Markdownu i z HTML (`<a href="…">`). Externí odkazy (https://…) a odkazy na nečlánkové části webu (`/blog`, `/podcast`, `/kurzy`, `/martin` atd.) používej dál normálně – ty se nepřepisují.

Kontrola: před commitem nebo na vyžádání použij skill **content-internal-links-md** (ověří, že interní odkazy na články jsou jen v .md formátu).

Příručka: relativní cesty s příponou `.md`, např. `[text](psani.md)`. Blog a podcast: na články příručky `[text](../prirucka/nazev.md)`, na blog `[text](../blog/nazev.md)`, na podcast `[text](../podcast/nazev.md)`. Na vlastní sekce (úvodní stránky) lze použít absolutní cesty `/blog`, `/podcast`.

**Omezení a výjimky:**

- Odkazy **nedávat** na jasné / všeobecně známé věci: Github, Google, Vzhůru dolů, Facebook, LinkedIn a podobně. Odkazovat jen na méně známé nástroje, služby nebo konkrétní dokumentaci.
- Odkazy **nedávat** do citací (blockquote), do perexů ani do jiných meta/opisných částí článku. Jen do běžného těla textu.
- V **popiscích obrázků (figcaption)** jsou odkazy **povolené** – typicky pro uvedení zdroje obrázku, grafu nebo nástroje (např. `Zdroj grafu: appka [SkillShaper](https://…)`).
- U **aktuálně rozpracovaného** článku neměnit text – pouze přidávat odkazy. Žádné přeformulování vět ani úpravy stylu.
- U **starších článků** je při provazování odkazů přípustná mírná úprava textu (např. doplnění jedné věty s odkazem), ne rozsáhlé změny.
