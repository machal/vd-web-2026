# Příklady kontroly pravopisu

Tento soubor obsahuje reálné příklady z kontrol českého pravopisu v markdown souborech.

## Příklad kompletní kontroly

### Vstupní text (úryvek článku)

```markdown
Vibe coding je revoluce jako prase. Zpřístupňuje tvorbů webů nebo jiných produktů.

Slyšte mou koláž nadšení úvah varování a konkrétních tipů.

Syn chce dělat s kamarádem dělat první byznys.

Pár týdnu jsem na tom strávil a negooglíte dokumentace.
```

### Výstup kontroly

| Řádek | Chyba | Typ | Oprava | Vysvětlení |
|-------|-------|-----|--------|------------|
| 1 | "zpřístupňuje tvorbů webů" | Gramatika | "zpřístupňuje tvorbu webů" | Chybný pád - má být akuzativ "tvorbu" místo špatného genitivu "tvorbů" |
| 3 | "nadšení úvah varování" | Interpunkce | "nadšení, úvah, varování" | Chybí čárky mezi slovy ve výčtu |
| 5 | "chce dělat s kamarádem dělat" | Stylistika | "chce s kamarádem dělat" | Zbytečné opakování slovesa "dělat" |
| 7 | "Pár týdnu" | Gramatika | "Pár týdnů" | Po "pár" následuje genitiv množného čísla |
| 7 | "negooglíte dokumentace" | Gramatika | "negooglíte dokumentaci" | Sloveso vyžaduje akuzativ (koho/co) |

## Příklady podle typu chyby

### Gramatika - chybné pády

**Příklad 1:**
```
Chyba: "řešit problému"
Oprava: "řešit problém"
Vysvětlení: Sloveso "řešit" vyžaduje akuzativ
```

**Příklad 2:**
```
Chyba: "několik víkendu práce"
Oprava: "několik víkendů práce"
Vysvětlení: Po "několik" následuje genitiv množného čísla
```

**Příklad 3:**
```
Chyba: "investovat do někoho, kdo to obstará"
Správně: "investovat do někoho, kdo to obstará" ✓
Poznámka: Toto JE správně
```

### Interpunkce

**Příklad 1:**
```
Chyba: "koláž nadšení úvah varování"
Oprava: "koláž nadšení, úvah, varování"
Vysvětlení: Mezi slovy ve výčtu musí být čárky
```

**Příklad 2:**
```
Chyba: "Tohle je fajn,ale pozor"
Oprava: "Tohle je fajn, ale pozor"
Vysvětlení: Za čárkou musí být mezera
```

### Stylistika - opakování

**Příklad 1:**
```
Chyba: "chce dělat s kamarádem dělat první byznys"
Oprava: "chce s kamarádem dělat první byznys"
Vysvětlení: Zbytečné opakování slovesa
```

**Příklad 2:**
```
Chyba: "projekt je hotový, projekt běží na serveru"
Oprava: "projekt je hotový a běží na serveru"
Vysvětlení: Zbytečné opakování podmětu
```

### Pravopis

**Příklad 1:**
```
Chyba: "vibe coding je revoluce jako prase"
Poznámka: Možná nepatřičný výraz v profesionálním textu
Návrh: "vibe coding je velká revoluce"
```

**Příklad 2:**
```
Chyba: "Prdlajs"
Poznámka: Vulgarismus v odborném textu
Návrh: "Nesmysl" nebo "To není pravda"
```

## Příklad výstupu pro článek bez chyb

```markdown
## Kontrola českého pravopisu

Text byl zkontrolován a nebyly nalezeny žádné gramatické nebo pravopisné chyby.

### Drobné stylistické návrhy

- **Řádek 42**: Dlouhá věta (35+ slov) - zvažte rozdělení pro lepší čitelnost
- **Konzistence**: Termín "frontend" je psán různě (frontend/front-end/front end) - doporučuji sjednotit

### Celkové hodnocení

Text je kvalitní, bez významných chyb. Stylistické návrhy jsou volitelné.
```

## Výjimky a speciální případy

### Technické termíny v angličtině
```
✓ Správně: "používám Cursor, agent mode a vibe-coding"
✗ Neopravuj: anglické termíny jsou v pořádku
```

### Záměrné hovorové výrazy
```
Text: "Tohle je fakt šílený."
Poznámka: Hovorový výraz v citaci - záměrně, není chyba
```

### Neologismy
```
Text: "vajbení kódu", "vajbit aplikaci"
Poznámka: Novotvary z vibe-coding - pokud jsou konsistentní, v pořádku
```

## Šablona pro výstup

Pro kopírování a použití:

```markdown
## Kontrola českého pravopisu

### Nalezené chyby

| Řádek | Chyba | Typ | Oprava | Vysvětlení |
|-------|-------|-----|--------|------------|
| | | | | |

### Další návrhy na vylepšení

#### Stylistické úpravy
- **Řádek X**: 

#### Konzistence
- **Název/termín**: 

### Celkové hodnocení

```
