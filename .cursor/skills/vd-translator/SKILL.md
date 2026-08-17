---
name: vd-translator
description: Adaptuje český článek z vzhurudolu.cz do angličtiny pro michalek.blog — párování, en_only odkazy, zpětné prolinkování, vlaječky. Použij při „přelož článek“, „VD Translator“, nebo při odkazu na CS .md v apps/vzhurudolu/src/content/.
---

# VD Translator

Adaptuje jeden český článek (blog nebo příručka) do angličtiny pro **michalek.blog**. Výstup je plná EN verze + párování + zpětné odkazy + validace.

**Příklad příkazu:** Přelož `apps/vzhurudolu/src/content/blog/264-ceo-bere-praci.md` pomocí VD Translator

## Model requirement

**Spouštěj jen s Claude Opus (thinking)** nebo ekvivalentem nejvyšší kvality v Cursoru.

Pokud nejsi na Opus, **zastav se** a požádej uživatele o přepnutí modelu. Nepokračuj v překladu na slabším modelu.

## Statické assety (přečíst, negenerovat znovu)

Před překladem vždy přečti (nikdy znovu neanalyzuj EN piloty kvůli hlasu):

| Soubor | Účel |
|--------|------|
| [style-voice.md](style-voice.md) | Martinův EN hlas — jediný zdroj pro tón |
| [link-map.md](link-map.md) | CS→EN lookup pro interní odkazy |
| [reference.md](reference.md) | Front matter, slugy, tagy, cesty |
| [examples.md](examples.md) | Krátké ukázky adaptace (volitelně) |

## Workflow (jeden příkaz = všechny kroky)

### 0. Ověř model
Opus required — viz výše.

### 1. Vstup
Uživatel dodá cestu k CS `.md`. Volitelně: EN slug, `pairId`.

Mapování cíle:
- `apps/vzhurudolu/src/content/blog/{file}.md` → `apps/michalek-dev/src/content/blog/{en-slug}.md`
- `apps/vzhurudolu/src/content/prirucka/{file}.md` → `apps/michalek-dev/src/content/guide/{en-slug}.md`

### 2. Přečti CS zdroj
Celý článek včetně front matter. Poznamenej `date`, `category`/`tags`, existující `pairId`, `id` (příručka).

### 3. Navrhni EN metadata
- **slug:** krátký, 2–4 anglická slova (`ceo-bere-praci` → `ceo-takes-your-job`)
- **pairId:** stejný string jako EN slug (kde to jde)
- **title:** SEO titulek
- **H1:** může být článkovější než `title`
- **description:** perex pro RSS/OG — **jiný** než první odstavec
- **tags:** z [apps/michalek-dev/src/data/tags.ts](apps/michalek-dev/src/data/tags.ts)

### 4. Adaptuj tělo článku
Podle [style-voice.md](style-voice.md). **Adaptace, ne doslovný překlad.**

Pravidla odkazů (**en_only**):
- CS `.md` odkaz na **přeložený** článek → EN cesta z [link-map.md](link-map.md), např. `[text](../guide/webp.md)`
- CS `.md` odkaz na **nepřeložený** VD článek → **žádný odkaz**, jen text
- **Nepřidávat** inline odkazy z EN těla na vzhurudolu.cz (kromě `adaptedFrom` ve front matter)
- Externí https:// → ponechat
- České video / meetup / podcast → URL OK + kontext v závorce, např. `(Czech developer meetup talk)`

Vynechat z CS: `<!-- AdSnippet -->`, `.related` bloky s odkazy na nepřeložené články.

Obrázky: stejné URL jako CS; alt text v EN. Po adaptaci spusť synchronizaci assetů do michalek-dev (krok 5b).

### 5. Zapiš EN soubor
Front matter dle [reference.md](reference.md). `adaptedFrom.url` = plná URL na `https://www.vzhurudolu.cz/...`

### 5b. Synchronizuj obrázky do michalek-dev (povinné)

Každá appka má vlastní `public/`. Obrázky z CS článku **nesdílí** automaticky — zkopíruj je:

```bash
node scripts/sync-translator-images.mjs apps/vzhurudolu/src/content/blog/{cs-file}.md
```

Skript z CS (nebo EN) markdownu najde cesty `/assets/img/content/dest/...` a `/prirucka/images/...`, zkopíruje zdrojové JPG do `apps/michalek-dev/src/assets/img/content/` a hotové WebP do `apps/michalek-dev/public/`. V dev módu **build nepotřebuješ** — stačí refresh na `http://localhost:4322`.

Pokud skript selže (chybějící zdroj na vzhurudolu), doplň obrázek na CS straně a spusť znovu.

### 6. Párování
- `pairId` v CS zdroji (sjednotit pokud starý slug neodpovídá)
- `pairId` v EN souboru
- Nový záznam v [packages/shared/content-pairing/pairs.ts](packages/shared/content-pairing/pairs.ts)
- **Jeden řádek** do [link-map.md](link-map.md) — ne přegenerovat celý soubor

### 7. Vlaječky (automatické)
**Nepřidávej** vlaječky do Markdownu. Stačí krok 6 — šablony přidají `LanguageSwitch` + hreflang.

### 8. Zpětné odkazy (draft → schválení)

Stejná pravidla jako [vd-editor](../vd-editor/SKILL.md) (zpětné odkazy):

- **Nejdřív drafty do chatu** (3–5 návrhů: soubor, okolí, navrhovaný text). Zapisuj až po výběru uživatele.
- Jen **delší** cílové články (cca 1+ A4). Krátké pečlivě rytmizované eseje nech být.
- Jen místa, kde jsi si jistý; jinak návrh s poznámkou „nejisté“ nebo vynech.
- Žádné umělé „Related:“ / „Související:“ bloky.

**A) EN (priorita):** kandidáti v `apps/michalek-dev/src/content/{blog,guide}/` → odkaz na nový EN článek  
`[text](../blog/slug.md)` nebo `[text](../guide/slug.md)`

**B) CS:** kandidáti v `apps/vzhurudolu/src/content/{blog,prirucka,podcast}/` → odkaz na **český originál**  
`[text](../prirucka/….md)` atd. — **ne** na michalek.blog

V checklistu uveď, které drafty uživatel schválil a zapsal.

### 9. Validace

```bash
node scripts/validate-content-pairs.mjs
npm run build -w @vd/vzhurudolu
npm run build -w @vd/michalek-dev
```

Ověř vlaječky v dist (grep na nový pár):
- CS: `hreflang="en"` + `michalek.blog`
- EN: `aria-label="Also available in Czech."` + `vzhurudolu.cz`

### 10. Výstupní checklist (vypiš uživateli)

```
VD Translator — hotovo

- [ ] Opus model
- [ ] EN soubor: apps/michalek-dev/src/content/...
- [ ] pairId shodný CS + EN
- [ ] pairs.ts + link-map.md aktualizovány
- [ ] Žádné inline vzhurudolu.cz v EN těle (kromě adaptedFrom)
- [ ] Obrázky: sync-translator-images.mjs PASS
- [ ] České kontexty u video/komunitních odkazů
- [ ] Zpětné odkazy: N× EN + N× CS (uveď soubory)
- [ ] validate-content-pairs.mjs PASS
- [ ] build vzhurudolu + michalek-dev PASS
- [ ] Vlaječky v dist OK

Navrhovaný commit message: ...
```

**Necommituj** automaticky — jen na explicitní žádost.

## Mimo scope

- Bulk překlad všech CS článků
- Podcast, kurzy, e-booky
- Cookie consent / GA
