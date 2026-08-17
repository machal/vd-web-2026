---
name: vd-editor
description: Dává zpětnou vazbu k článku Vzhůru dolů — pravopis, interní odkazy, formát (nadpisy, obrázky, front matter). Použij při „zkontroluj článek“, „feedback“, „proofreading“, kontrole odkazů, nebo před commitem textových změn v blogu, příručce nebo podcastu. Ne při psaní z nuly (to je vd-writer).
---

# Feedback k článku Vzhůru dolů

Review existujícího článku (nový draft i úprava). **Nejdřív report v chatu — soubory nemen, dokud uživatel neřekne „aplikuj“.**

Nový článek z nuly: **vd-writer**. Anglická adaptace: **vd-translator**.

## Workflow

1. Přečti celý soubor včetně front matter.
2. Formát a struktura (checklist níže).
3. Interní odkazy.
4. Český pravopis — detaily v [proofreading.md](proofreading.md).
5. Zpětné odkazy — jen návrhy v chatu.
6. Vypiš report podle šablony. Edituj až po souhlasu.

## 1. Formát a struktura

- [ ] Front matter kompletní; u published příručky unikátní `id`.
- [ ] `perex` / `excerpt` má 2–3 věty (cca 220–400 znaků), neopakuje první odstavec.
- [ ] Titulek (`postTitle` / `title` / `heading` / H1 / nastavený `og_title`) je autorův — **nenavrhuj přepis** bez žádosti; SEO jen jako volitelný tip v chatu.
- [ ] H2–H6 končí `{#slug}` (unikátní, bez diakritiky).
- [ ] České uvozovky jen v próze; ve front matter / HTML / kódu ASCII `"`.
- [ ] Obrázky: smysluplný alt; figure + figcaption kde je popisek.
- [ ] Citace: blockquote + `– *<cite>…</cite>*`.
- [ ] Tabulky v `<div class="rwd-scrollable f-6" markdown="1">`.
- [ ] Nový článek: vlastní OG 1200×630, `og_description` sladěný s perexem.
- [ ] PageSpeed.ONE jako `https://pagespeed.one/` (bez `www.`).
- [ ] Žádný anglický genitiv s apostrofem (~~CEO's~~).

## 2. Interní odkazy

V **těle** MD/HTML odkazy na vlastní články musí končit na `.md`. Platí i pro `<a href>`.

| Kontext | Správně | Špatně |
|--------|---------|--------|
| V příručce → příručka | `[text](nazev.md)` | `/prirucka/nazev` |
| Kdekoli → blog | `[text](../blog/nazev.md)` | `/blog/258-nazev` |
| Kdekoli → příručka | `[text](../prirucka/nazev.md)` | `/prirucka/nazev` |
| Kdekoli → podcast | `/podcast/{postID}-{slug}` | `/podcast/nazev` bez postID |

**Podcast výjimka:** finální URL piš rovnou (`/podcast/257-podcast-petr-burian-sabatikl`) — `.md` rewrite postID nepřidá.

**Neměň:** `https://…`; úvodní stránky `/blog`, `/podcast`, `/kurzy`; anchory `#nadpis`.

Odkazy nepatří do citací, perexů ani meta. Ve `figcaption` ano (zdroj).

## 3. Pravopis

Čti celý text. Hledej gramatiku, pravopis, interpunkci, stylistiku. Typy chyb, vazby a výjimky: [proofreading.md](proofreading.md). Příklady: [examples.md](examples.md).

Neoznačuj za chybu: záměrný hovor v citacích, anglické termíny (commit, deploy), konzistentní neologismy.

## 4. Zpětné odkazy (návrhy)

Jen u **nového** článku, a jen když dává smysl.

- 3–5 návrhů v chatu: soubor, důvod, citace okolí, navrhovaný text. Zápis až po výběru.
- Jen **delší** cíle (cca 1+ A4). Krátké rytmizované eseje nech být.
- Jen kde téma už v odstavci sedí. Slabý vztah = vynechat.
- Preferuj prolinkovat existující slovo, případně jednu krátkou větu uprostřed odstavce.
- **Ne** na konec, shrnutí, výzvu, závěrečný rytmický odstavec. Žádné bloky „Související:“.

## Výstup

```markdown
## VD Editor — feedback

### Formát a struktura
- [ok / problém] …

### Interní odkazy
| Řádek | Nyní | Oprava |
|-------|------|--------|

### Pravopis
| Řádek | Chyba | Typ | Oprava | Vysvětlení |
|-------|-------|-----|--------|------------|

### Další návrhy
- Stylistika / konzistence (volitelné)

### Zpětné odkazy (návrhy)
- soubor + okolí + navrhovaný text

### Celkové hodnocení
Počet kritických vs. drobných. Nic neaplikováno, dokud neřekneš.
```

Typy pravopisných chyb: `Gramatika`, `Pravopis`, `Interpunkce`, `Stylistika`.
