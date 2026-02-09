---
description: U nadpisů H2 a menších v příručce a blogu vždy přidat anchor hash {#slug}
globs: src/content/prirucka/**/*.md,src/content/blog/**/*.md
alwaysApply: false
---

# Nadpisy H2 a menší – anchor hashe

Při psaní nebo úpravě článků v příručce (`src/content/prirucka/`) a na blogu (`src/content/blog/`) **ke každému nadpisu úrovně H2 a menší** (##, ###, ####) přidej na konec řádku anchor hash ve tvaru `{#slug}`.

## Formát

- Na konci nadpisu (za text, před koncem řádku): mezera + `{#slug}`.
- **Slug:** jen malá písmena, číslice a pomlčky. Bez diakritiky (ě→e, ř→r, š→s, ž→z, č→c, ň→n, ů/ú→u, ý/í/é/á→y/i/e/a). Uvozovky, dvojtečky a zvláštní znaky vynechat nebo nahradit pomlčkou.
- Každý anchor v rámci článku musí být **jedinečný**.

## Příklady

```markdown
## U vytržení {#u-vytrzeni}
## Vibe-coding vs. vibe-engineering {#vibe-coding-vs-vibe-engineering}
## Čím začít, když jsem nováček? {#cim-zacit-novacek}
### Příklad první: prototyp webu FrontKon {#priklad-prvni-frontkon}
### „Software is eating the world" {#software-eating-world}
```

## Proč

Anchor hashe umožňují přímé odkazy na sekce (např. `/prirucka/vibe-coding#tipy-ke-cursoru`) a konzistentní navigaci v rámci příručky a blogu.

## Reference

Příklady v článcích: `weby-watchos.md`, `picrights.md`, `package-json.md`, `vibe-coding.md`.
