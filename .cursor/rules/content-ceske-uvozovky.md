---
description: České uvozovky (99 66) jen v prozaickém textu, nikdy ve frontmatteru ani v kódu
globs: src/content/prirucka/**/*.md,src/content/blog/**/*.md
alwaysApply: false
---

# České uvozovky v textech příručky a blogu

Při copy-paste nebo úpravách často skončí v textu **anglické/rovné uvozovky** (`"` U+0022) tam, kde má být **česká uzavírací** (`"` U+201C). Pravidlo platí **pouze pro prozaický obsah** (odstavce, citace). Do frontmatteru, HTML ani jiného kódu se české uvozovky nesmí dostat.

## Kde používat české uvozovky („ a ")

- **Pouze v těle článku** – v odstavcích, v blockquote citacích, v nadpisech (pokud jsou v češtině a v uvozovkách).
- Správná dvojice: **„** (U+201E, dolní/otevírací) a **"** (U+201C, horní/zavírací) – lidově „99 66“.

Příklad: Ve „starém světě" by to znamenalo… (ne `Ve "starém světě" by`).

## Kde NIKDY nepoužívat české uvozovky

- **YAML frontmatter** – hodnoty v uvozovkách musí být vždy rovné ASCII `"` (např. `title: "Titulek"`).
- **HTML** – atributy v uvozovkách vždy rovné: `alt="..."`, `src="..."`, `markdown="1"`.
- **Jakýkoli kód** – řetězce, selektory, cesty, konfigurace vždy pouze `"` (U+0022).

Při vkládání z clipboardu se v těchto místech nesmí objevit znak `"` (U+201C). Pokud se tam dostane, oprav na rovnou uvozovku `"`.

## Shrnutí

| Kontext | Znak uvozovek |
|--------|----------------|
| Prozaický text (odstavce, citace) | „ a " (české 99 66) |
| Frontmatter, HTML, kód, cesty, atributy | " (pouze ASCII U+0022) |

Častá chyba po copy-paste: věta začíná českou „ a končí anglickou ". V proze oprav uzavírací na " (U+201C). Do YAML/HTML to nikdy neměň.
