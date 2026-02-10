# Plán: Provázání odkazů kolem článku Vibe Coding

## Kontext

- **Článek:** [src/content/prirucka/vibe-coding.md](src/content/prirucka/vibe-coding.md) (datum 2026-02-10, `category_highlight: true`, zobrazen na homepage mezi nejnovějšími).
- **Homepage** ([src/pages/index.astro](src/pages/index.astro)) zobrazuje 5 nejnovějších článků ze všech kolekcí (blog + podcast + prirucka) seřazených podle `date` / `postDateTime`. „Důležité“ články = ty s `category_highlight` a/nebo tématicky klíčové.
- **Odkazy v příručce:** Relativní cesty typu `psani.md` se při buildu transformují na `/prirucka/psani` ([rehype-prirucka-links.ts](src/utils/rehype-prirucka-links.ts)). Pro blog/podcast používejte absolutní cesty `/blog/…`, `/podcast/…`.

---

## Konvence pro psaní článků: odkazování vždy takto

**Při psaní nebo výraznějších úpravách článků (příručka i blog) chci tuto formu odkazování vždy:**

1. **Externí nástroje / služby** – odkaz na oficiální stránku nebo dokumentaci **vždy u prvního výskytu** daného slova nebo spojení v textu (ne u každého opakování).
2. **Vnitřní odkazy na vlastní články** – odkazovat na důležité články (odkazované z homepage, s `category_highlight`) a na články z posledních zhruba dvou let; odkazy dávat přirozeně do textu tam, kde to dává smysl.
3. **Zpětné provázání** – v ostatních článcích z posledních let přidat odkaz na nový článek buď přímo do věty, nebo jako tip ve formátu „→ *Související: [Název článku](/cesta).*“

Tato konvence platí pro všechny nové a větší úpravy článků, nejen pro vibe-coding.

---

## 1. Externí nástroje v článku vibe-coding (první výskyt)

Přidat odkaz vždy na **první výskyt** daného slova/spojení. Nástroje a doporučené URL:

- **Windsurf** (ř. 34) – např. https://codeium.com/windsurf
- **Wix Vibe** (ř. 42) – https://www.wix.com/vibe
- **GitHub Copilot** (ř. 66) – https://github.com/features/copilot
- **Antigravity** (ř. 66) – oficiální stránka produktu Google (ověřit URL)
- **VS Code** (ř. 68, 74) – https://code.visualstudio.com/
- **Macaly** (ř. 84) – již má odkaz
- **Cursor** – již má odkaz
- **PageSpeed.ONE** – již má odkaz
- **Astro** (ř. 164) – https://astro.build/
- **Github** (ř. 154) – https://github.com/
- **Perch (CMS)** (ř. 154) – ověřit, zda ještě existuje
- **Cursor Rules / .cursorrules** (ř. 246) – docs Cursoru
- **Claude 3.5 Sonnet** (ř. 254) – Anthropic / docs Cursoru
- **Gemini** (ř. 255) – https://ai.google.dev/

---

## 2. Odkazy na vaše články uvnitř vibe-coding.md

**Priorita 1:** [258 – AI prý zvládne 80 % psaní a programování…](/blog/258-ai-programovani-psani), [Psaní](/prirucka/psani).

**Priorita 2:** dle kontextu FrontKon (250/260), WebExpo (256/245), rok 2025/2024 (261, 253), příručka css-grid, webp, typografie.

---

## 3. Odkaz na vibe-coding z ostatních článků (2024–2026)

Minimálně: **258 (AI)** a **psani**. Volitelně: 256, 261, 253, podcast-ai-vyvojari. Formát tipu: `→ *Související: [Vibe Coding: Přes 25 let dělám weby…](/prirucka/vibe-coding).*`

---

## 4. Shrnutí úkolů

1. vibe-coding.md – doplnit externí odkazy (první výskyt).
2. vibe-coding.md – doplnit vnitřní odkazy (psani, 258, volitelně další).
3. V článcích 258 a psani (a volitelně dalších) přidat odkaz na /prirucka/vibe-coding.
