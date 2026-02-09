---
description: Pravidlo pro citace v příručce a blogu – blockquote se vždy píše s atribucí ve formátu cite
globs: src/content/prirucka/**/*.md,src/content/blog/**/*.md
alwaysApply: false
---

# Citace (blockquote) v textech příručky a blogu

Při psaní nebo úpravě článků v příručce (`src/content/prirucka/`) a na blogu (`src/content/blog/`) používej pro **citace s atribucí** vždy tento formát.

## Formát blockquote citace

1. **Citace** – text v uvozovkách jako blockquote (řádek začíná `>`).
2. **Prázdný řádek** v blockquote (samotné `>`).
3. **Atribuce** – pomlčka, kurzíva, tag cite, jméno a odkaz: `– *<cite>[Jméno](url)</cite>*`.

### Příklad v Markdownu

```markdown
> „Teď jsem si sedl k Windsurfu a mám za tři dny novou verzi, která toho za týden práce bude umět víc než moje dílo za 9 měsíců. Je to fakt šílený."
>
> – *<cite>[Petr Pixy Staníček](https://example.com/odkaz)</cite>*
```

### Bez odkazu (jen jméno)

```markdown
> „Krátká citace."
>
> – *<cite>Jméno autora</cite>*
```

## Reference

Stejný styl používají např. články: `cookie-lista-2022.md`, `rychlost-myty.md`, `rich-snippets.md`, `vibe-coding.md`.

## Co nepoužívat

- Nepoužívej pouze kurzívu a pomlčku na samostatném řádku bez blockquote (`*„citace"*` + `— [Autor](url)`).
- Citace vždy zapisuj jako blockquote s atribucí na dalším řádku v blockquote ve formátu `– *<cite>...</cite>*`.
