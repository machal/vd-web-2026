---
description: Výzva na konci článku (e-mail, komentáře) má být malá a kurzívou
globs: src/content/prirucka/**/*.md,src/content/blog/**/*.md
alwaysApply: false
---

# Výzva na konci textu

Při psaní nebo úpravě článků v příručce a na blogu **výzvu na konci** (např. „Napište mi e-mail“, „Co vám pomáhá?“, „Komentujte na sítích“) formátuj vždy takto:

- **Malá velikost** – obalit v `<small>`
- **Kurzíva** – uvnitř použít markdown kurzívu `*...*`

## Formát v Markdownu

```markdown
<small>*Na co jsem zapomněl, co mám špatně? Co u vibe-codingu pomáhá vám? Napište mi [e-mail](mailto:…) nebo komentujte na sociálních sítích.*</small>
```

Jedna věta nebo krátký odstavec na konci článku = jeden blok `<small>*…*</small>`, odkazy uvnitř zůstávají v hranatých závorkách.

## Reference

Příklad: konec článku v `vibe-coding.md`.
