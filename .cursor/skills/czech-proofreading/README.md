# Skill: Kontrola českého pravopisu

Automatická kontrola českého pravopisu, gramatiky a stylistiky pro markdown soubory.

## Co tento skill dělá

- ✅ Kontroluje gramatiku (pády, shoda, slovesné vazby)
- ✅ Hledá pravopisné chyby a překlepy
- ✅ Kontroluje interpunkci a čárky
- ✅ Odhaluje stylistické problémy (opakování, nespisovnost)
- ✅ Vytváří přehlednou tabulku s nalezenými chybami

## Kdy se skill aktivuje

Skill se automaticky použije, když:
- Dokončíš psaní článku nebo dokumentace v češtině
- Požádáš o kontrolu pravopisu
- Uděláš změny v markdown souboru s českým textem
- Připravuješ text před commitem

## Jak ho použít manuálně

Jednoduše požádej AI:
- "Zkontroluj pravopis tohoto textu"
- "Proveď kontrolu gramatiky"
- "Najdi chyby v článku"
- "Proof read @soubor.md"

## Příklad výstupu

Skill vytvoří tabulku s nalezenými chybami:

| Řádek | Chyba | Typ | Oprava | Vysvětlení |
|-------|-------|-----|--------|------------|
| 18 | "zpřístupňuje tvorbů webů" | Gramatika | "zpřístupňuje tvorbu webů" | Chybný pád - má být akuzativ "tvorbu" |
| 76 | "negooglíte dokumentace" | Gramatika | "negooglíte dokumentaci" | Sloveso vyžaduje akuzativ (koho/co) |
| 129 | "chce dělat s kamarádem dělat" | Stylistika | "chce s kamarádem dělat" | Zbytečné opakování slovesa |

## Soubory ve skillu

- **SKILL.md** - Hlavní instrukce pro AI
- **examples.md** - Příklady z reálných kontrol
- **README.md** - Tento soubor (dokumentace)

## Jaké chyby skill najde

### Gramatické chyby
- Chybné pády po slovesech a předložkách
- Chybné množné číslo
- Shoda podmětu s přísudkem
- Chybné slovesné vazby

### Pravopisné chyby
- Překlepy
- Chybějící písmena
- Záměna písmen

### Interpunkce
- Chybějící čárky
- Chybějící mezery
- Špatné uvozovky

### Stylistika
- Opakování slov
- Nespisovné výrazy
- Nekonzistentní terminologie
- Vulgarismy v profesionálním textu

## Poznámky

- Skill respektuje technické termíny v angličtině
- Neopravuje záměrné hovorové výrazy v citacích
- Toleruje konzistentní neologismy (např. "vajbení" z "vibe-coding")

## Aktualizace skillu

Pokud najdeš nové typy častých chyb nebo chceš přidat pravidla:
1. Uprav `SKILL.md` (hlavní logika)
2. Přidej příklady do `examples.md`
3. Dokumentuj změny tady v README

---

*Vytvořeno: Únor 2026*
