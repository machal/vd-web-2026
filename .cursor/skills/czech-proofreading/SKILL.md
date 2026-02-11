---
name: czech-proofreading
description: Kontroluje český pravopis, gramatiku a stylistiku v markdown souborech. Použij na konci psaní článků, dokumentace nebo před commitem textových změn. Vytváří tabulku s nalezenými chybami.
---

# Kontrola českého pravopisu

Tento skill slouží k systematické kontrole českého pravopisu, gramatiky a stylistiky v markdown souborech.

## Kdy použít

- Po dokončení psaní článku nebo dokumentace
- Před commitem textových změn
- Když uživatel požádá o kontrolu pravopisu
- Automaticky na konci editace českých textů

## Kontrolní proces

### 1. Přečti celý dokument

Přečti celý soubor od začátku do konce a aktivně hledej chyby.

### 2. Hledej tyto typy chyb

**Gramatické chyby:**
- [ ] Shoda podmětu s přísudkem
- [ ] Správné pády po předložkách
- [ ] Správné pády jako předměty sloves (akuzativ vs. genitiv)
- [ ] Množné číslo podstatných jmen (např. "víkendu" → "víkendů")
- [ ] Slovesné vazby a jejich správné použití

**Pravopisné chyby:**
- [ ] Překlepy a chybějící písmena
- [ ] Záměna písmen (i/y, s/z, bě/bje, vě/vje)
- [ ] Správné psaní předpon a předložek (z-/s-, v-/f-)
- [ ] Velká písmena u vlastních jmen a na začátku vět

**Interpunkce:**
- [ ] Čárky v souvětích (mezi větami hlavními a vedlejšími)
- [ ] Čárky ve výčtech
- [ ] Chybějící nebo přebytečné mezery kolem interpunkce
- [ ] Uvozovky (použití českých uvozovek „" místo "")

**Stylistika:**
- [ ] Zbytečná opakování slov ve větě nebo odstavci
- [ ] Nespisovné výrazy v odborném textu
- [ ] Nekonzistentní terminologie
- [ ] Příliš dlouhé věty (lze rozdělit)
- [ ] Vulgarismy v profesionálním textu

**Markdown specifika:**
- [ ] Nezalomený text v code blocích
- [ ] Správné odkazy a reference
- [ ] Konzistence nadpisů

### 3. Vytvoř tabulku s chybami

Pro každou nalezenou chybu vytvoř řádek v tabulce s těmito sloupci:

| Řádek | Chyba | Typ | Oprava | Vysvětlení |
|-------|-------|-----|--------|------------|
| [číslo] | [chybný text] | [typ chyby] | [správný text] | [stručné vysvětlení] |

**Typy chyb:**
- `Gramatika` - gramatické chyby (pády, shoda, slovesné vazby)
- `Pravopis` - překlepy, chybné písmeno
- `Interpunkce` - čárky, tečky, uvozovky
- `Stylistika` - opakování, nespisovnost, konzistence

### 4. Struktura výstupu

```markdown
## Kontrola českého pravopisu

### Nalezené chyby

[Tabulka s chybami dle vzoru výše]

### Další návrhy na vylepšení

[Volitelná sekce s doporučeními, která nejsou přímé chyby]

#### Stylistické úpravy
- **Řádek X**: [konkrétní doporučení]

#### Konzistence
- **Název/termín**: [poznámka o konzistenci napříč textem]

### Celkové hodnocení

[Stručné shrnutí: počet kritických vs. drobných chyb, celkový dojem]
```

## Checklist běžných chyb v češtině

### Pády po slovesech
- "řešit **problém**" (akuzativ), ne "řešit problému"
- "googlíte **dokumentaci**" (akuzativ), ne "googlíte dokumentace"
- "obejdete se **bez**" (genitiv), vyžaduje předložku

### Množné číslo
- "několik **víkendů**" (genitiv množného), ne "víkendu"
- "několik **měsíců**", ne "měsícu"
- "pár **týdnů**", ne "týdnu"

### Slovesné vazby
- "chce **dělat**" (infinitiv), ne opakování "chce dělat ... dělat"
- "začal **psát**", ne "začal psaní"

### Předložky a pády
- "zpřístupňuje **tvorbu**" (akuzativ), ne "tvorbů"
- "podle **pravidel**" (genitiv)
- "k **napsání**" (dativ)

### Častá opakování
- Kontroluj opakování stejných slov ve větě
- Hledej synonyma nebo přeformuluj

### Interpunkce ve výčtech
- Mezi slovy ve výčtu musí být čárky
- "nadšení, úvah, varování" ne "nadšení úvah varování"

## Příklady z reálné kontroly

### Příklad 1: Chybný pád
**Chyba**: "negooglíte dokumentace"
**Oprava**: "negooglíte dokumentaci"
**Vysvětlení**: Sloveso "googlíte" vyžaduje akuzativ (koho/co)

### Příklad 2: Opakování slovesa
**Chyba**: "chce dělat s kamarádem dělat"
**Oprava**: "chce s kamarádem dělat"
**Vysvětlení**: Zbytečné opakování slovesa "dělat"

### Příklad 3: Chybný genitiv množného
**Chyba**: "několik víkendu"
**Oprava**: "několik víkendů"
**Vysvětlení**: Po "několik" následuje genitiv množného čísla

### Příklad 4: Chybějící předložka
**Chyba**: "neobejdete guláš"
**Oprava**: "neobejdete se bez"
**Vysvětlení**: Vazba "obejít se bez" vyžaduje předložku a pokračování

## Dodatečné tipy

- Čti text nahlas (mentálně) - pomůže odhalit nezvyklé formulace
- Kontroluj konzistenci názvů a termínů napříč celým dokumentem
- Buď obzvlášť pozorný na začátky a konce odstavců
- V odborných textech rozlišuj záměrné použití slangových výrazů

## Postup při nejistotě

Pokud si nejsi jistý, zda je něco chyba:
1. Ověř si pravidlo (slovesa a jejich vazby, pády po předložkách)
2. V případě stylistiky zvol tolerantnější přístup
3. Označ to jako "návrh na vylepšení" místo "chyby"

## Výjimky

**Nepovažuj za chyby:**
- Záměrné použití hovorových výrazů pro stylový efekt
- Odborné termíny v angličtině (code, commit, deploy atd.)
- Slangové výrazy v citacích
- Neologismy v kontextu nových technologií (pokud jsou konsistentní)
