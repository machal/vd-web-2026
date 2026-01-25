#!/bin/bash
# Nastavení FTP hesla do macOS Keychain
# Heslo bude bezpečně šifrované systémem

set -e

# Načtení .env pro získání uživatelského jména
if [ -f .env ]; then
    export $(cat .env | grep -v '^#' | grep -v 'FTP_PASS' | xargs)
fi

if [ -z "$FTP_USER" ]; then
    echo "Nejprve vyplňte FTP_USER v souboru .env"
    exit 1
fi

echo "Nastavení FTP hesla pro uživatele: $FTP_USER"
echo "Heslo bude bezpečně uloženo v macOS Keychain"
echo ""

# Smazat staré heslo pokud existuje
security delete-generic-password -a "$FTP_USER" -s "vzhurudolu-ftp" 2>/dev/null || true

# Přidat nové heslo (interaktivně požádá o heslo)
security add-generic-password -a "$FTP_USER" -s "vzhurudolu-ftp" -w

echo ""
echo "Heslo bylo uloženo do Keychain."
echo "Nyní můžete spustit: npm run deploy"
