---
name: content-internal-links-md
description: Kontroluje, že interní odkazy na články (blog, příručka, podcast) jsou v Markdownu vždy zapsané jako .md odkazy, ne jako hotové URL. Použij při kontrole nebo před commitem změn v článcích.
---

# Kontrola formátu interních odkazů

Tento skill zajišťuje, že v MD souborech (blog, příručka, podcast) jsou odkazy na vlastní články vždy zapsané na konkrétní .md soubor. Build pak tyto odkazy přepíše na finální URL.

## Kdy použít

- Před commitem úprav článků v `src/content/`
- Když uživatel požádá o kontrolu odkazů
- Po přidání nebo úpravě odkazů na jiné články

## Pravidla (co je správně)

| Kontext | Správný formát | Příklad |
|--------|----------------|--------|
| V příručce, odkaz na článek příručky | `nazev.md` nebo `cesta/nazev.md` | `[text](css-grid.md)` |
| Kdekoli, odkaz na příručku | `../prirucka/nazev.md` | `[text](../prirucka/ai-saas.md)` |
| Kdekoli, odkaz na blog | `../blog/nazev.md` | `[text](../blog/258-ai-programovani-psani.md)` |
| Kdekoli, odkaz na podcast | `../podcast/nazev.md` | `[text](../podcast/123-nazev.md)` |

## Co kontrolovat (co je špatně)

V **těle Markdownu** (ne ve front matter) nesmí být odkazy na vlastní články jako hotové URL:

- **Špatně:** `[text](/prirucka/nazev)` nebo `[text](/prirucka/nazev.html)`
- **Špatně:** `[text](/blog/258-nazev)` nebo `[text](/blog/258-nazev.html)`
- **Špatně:** `[text](/podcast/258-nazev)`

**Správně:** vždy končit na `.md` a u cross-sekčních odkazů použít `../entita/nazev.md`.

## Kontrolní proces

1. **Projdi soubor** a najdi všechny markdown odkazy `[text](url)` v těle článku (mimo front matter, mimo blockquote/citace, pokud tam odkazy vůbec nepatří).
2. **U každého odkazu** zkontroluj:
   - Odkazuje na článek příručky/blogu/podcastu na vzhurudolu.cz?
   - Pokud ano: má cílová URL v MD podobu končící na `.md` a u jiné sekce tvar `../prirucka/…`, `../blog/…`, `../podcast/…`?
3. **Nalezené chyby** vypiš v přehledu (soubor, řádek, současný tvar, navrhovaná oprava) a navrhni úpravu na .md formát.

## Výstup

- Tabulka nebo seznam: soubor, řádek, problém, doporučená oprava.
- Pokud jsou chyby, nabídni konkrétní náhrady (např. `/prirucka/nazev` → `../prirucka/nazev.md` v závislosti na tom, ze kterého souboru odkaz vede).

## Poznámky

- **Platí pro** odkazy z Markdownu `[text](url)` i z HTML `<a href="url">` – obojí se při buildu přepisuje stejně.
- **Neměň** externí odkazy (https://…) – ty zůstávají.
- **Neměň** odkazy na nečlánkové části VD: `/blog`, `/podcast`, `/kurzy`, `/martin`, `/o-webu` atd. – ty nekončí na .md a zůstávají jak jsou.
- Odkazy na úvodní stránky sekcí mohou zůstat jako absolutní cesty.
- Anchor odkazy (`#nadpis`) se nemění.
