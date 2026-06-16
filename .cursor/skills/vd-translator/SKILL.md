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

Obrázky: stejné URL jako CS; alt text v EN.

### 5. Zapiš EN soubor
Front matter dle [reference.md](reference.md). `adaptedFrom.url` = plná URL na `https://www.vzhurudolu.cz/...`

### 6. Párování
- `pairId` v CS zdroji (sjednotit pokud starý slug neodpovídá)
- `pairId` v EN souboru
- Nový záznam v [packages/shared/content-pairing/pairs.ts](packages/shared/content-pairing/pairs.ts)
- **Jeden řádek** do [link-map.md](link-map.md) — ne přegenerovat celý soubor

### 7. Vlaječky (automatické)
**Nepřidávej** vlaječky do Markdownu. Stačí krok 6 — šablony přidají `LanguageSwitch` + hreflang.

### 8. Zpětné odkazy (povinné)

**A) EN (priorita):** Najdi 3–5 přirozených míst v `apps/michalek-dev/src/content/{blog,guide}/` a přidej odkaz na nový článek:
`[text](../blog/slug.md)` nebo `[text](../guide/slug.md)`

**B) CS:** Najdi 3–5 míst v `apps/vzhurudolu/src/content/{blog,prirucka}/` a přidej odkaz na **český originál**:
`[text](../blog/264-ceo-bere-praci.md)` — **ne** na michalek.blog

Žádné umělé „Related:“ bloky. Odkaz musí sedět do věty (stejně jako [vd-articles-write-edit](../vd-articles-write-edit/SKILL.md)).

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
