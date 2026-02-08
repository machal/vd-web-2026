# Bezpečnost

## Odhalené secrets (GitHub alert)

Pokud GitHub nebo CI nahlásí odhalený secret (API klíč, heslo atd.):

1. **Okamžitě** klíč zrušte/rotujte v příslušné službě (Google Cloud Console, atd.).
2. Odstraňte ho z kódu a nahraďte placeholderem (např. `YOUR_GOOGLE_MAPS_API_KEY`) nebo proměnnou z prostředí.
3. Commitněte opravu – historie v gitu zůstane, proto je rotace klíče nutná.

## Prevence

- Archiv `public/data/projects/` (legacy projekty včetně webmium) byl odstraněn, aby se zmenšila plocha pro případné secrets.
- **Nikdy** necommitujte API klíče, hesla ani tokeny do repozitáře.
- Pro konfiguraci používejte `.env` (je v `.gitignore`) nebo CI secrets.
- V tomto repozitáři běží **Secret Scan** (Gitleaks) na každý push/PR – build selže, pokud bude detekován secret.

## Kontakt

Při nálezu zranitelnosti kontaktujte maintainera repozitáře.
