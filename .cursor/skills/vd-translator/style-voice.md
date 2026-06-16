# Martin Michálek — EN writing voice

Statický referenční dokument. Při překladu **jen čti tento soubor** — neanalyzuj znovu pilotní EN články.

Destilováno z pilotů: `saying-no`, `webp`, `vibe-coding`, `bem`, `2025-year-in-review`.

---

## Core voice

- **First person** when the CS original uses „já“ — direct, experienced practitioner
- **Conversational but professional** — not corporate, not academic, not „AI slop“
- **Pragmatic** — what works in practice beats theory; show trade-offs honestly
- **Short paragraphs** — one idea per block; occasional one-line punch for rhythm
- **British/international English** — `optimise`/`organise` OK; date format in articles: `7 Jul 2024` style in body if dates appear
- **Address the reader as „you“** — inclusive, not lecturing

## What to preserve from Czech

- Argument structure and technical depth
- Martin's skepticism where present („take me with a grain of salt“, „I'm not saying…“)
- Humour and self-deprecation when natural in EN
- Named people, tools, products (keep proper nouns)

## What to adapt for global readers

- Czech institutions: explain on first mention (e.g. „Frontendisti.cz, a Czech frontend community“)
- Czech-only cultural references: brief context or replace with universal equivalent
- Metrics and examples: keep numbers; add context if tied to CZ market only
- **Vzhůru dolů** — keep name; can note „my Czech tech blog“ once if helpful

## Titles and structure

| Field | Rule |
|-------|------|
| `title` (front matter) | SEO: keywords, clear topic, can match CS `og_title` spirit |
| H1 | Can be more personal/catchy than `title` |
| `description` | RSS/OG summary — **must differ** from first body paragraph |
| H2–H6 | English `{#slug}` anchors: lowercase, hyphens, no diacritics |

## Sentence-level patterns (use naturally, don't force)

Blog / opinion:
- „I used to… I still fight it.“
- „You are good? You get more work.“ (rhetorical short questions)
- „That is the hard part, because…“
- Italics for emphasis: `_no_`, `_constructive no_`

Technical guide:
- „Here is why it earned its place:“
- „In other words: … ship it and move on.“
- „Is it worth it? It depends — but…“
- Lead with outcome, then mechanism

Long essay / AI:
- „It's deflating the cost of…“
- „Okay. Beyond the enthusiasm, let's also try to stay sober:“
- „So take me with a grain of salt — but we have to start here.“

## Citations

```markdown
> Quote text here.
>
> – *<cite>[Author Name](url)</cite>*
```

Use straight `"` quotes in English prose. Czech „uvozovky“ only if quoting Czech text.

## Tables

Wrap in `<div class="rwd-scrollable f-6" markdown="1">` with blank line before table (same as CS příručka).

## Figures

```html
<figure>
<img src="..." alt="English alt text">
<figcaption markdown="1">*Caption in italics.*</figcaption>
</figure>
```

Cloudinary URLs: keep as-is from CS source.

## Avoid

- „In today's fast-paced world…“, „In conclusion…“, „It's worth noting that…“
- Over-hedging every sentence
- Literal calques from Czech („it pulls on something in me“ → find natural EN)
- Linking untranslated vzhurudolu articles in EN body
- Adding attribution footer in markdown (handled by `adaptedFrom` + site chrome)

## USER NOTES

*(Volitelné — pokud je sekce prázdná, ignoruj. Pokud Martin doplní poznámky, mají prioritu nad pravidly výše.)*
