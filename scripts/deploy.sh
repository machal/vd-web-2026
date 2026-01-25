#!/bin/bash
# Deploy script pro nahrání dist/ na FTP server
# Používá lftp pro inkrementální upload (pouze změněné soubory)
# Heslo je bezpečně uložené v macOS Keychain

set -e

# Načtení .env souboru pokud existuje (pro HOST, USER, PATH - ne heslo)
if [ -f .env ]; then
    export $(cat .env | grep -v '^#' | grep -v 'FTP_PASS' | xargs)
fi

# Kontrola povinných proměnných (kromě hesla)
if [ -z "$FTP_HOST" ] || [ -z "$FTP_USER" ] || [ -z "$FTP_PATH" ]; then
    echo "Chyba: Chybí FTP konfigurace!"
    echo "Vytvořte soubor .env s FTP_HOST, FTP_USER a FTP_PATH"
    exit 1
fi

# Načtení hesla z macOS Keychain
FTP_PASS=$(security find-generic-password -a "$FTP_USER" -s "vzhurudolu-ftp" -w 2>/dev/null)

if [ -z "$FTP_PASS" ]; then
    echo "Heslo není v Keychain. Přidejte ho příkazem:"
    echo "  security add-generic-password -a \"$FTP_USER\" -s \"vzhurudolu-ftp\" -w"
    echo ""
    echo "Nebo spusťte: npm run deploy:setup"
    exit 1
fi

echo "Building Astro site..."
npm run build

echo "Deploying to $FTP_HOST$FTP_PATH..."
lftp -c "
    set ssl:verify-certificate no;
    open -u $FTP_USER,$FTP_PASS ftp://$FTP_HOST;
    mirror -R --delete --only-newer --parallel=5 --verbose \
        --exclude files/ \
        --exclude data/ \
        ./dist $FTP_PATH;
    bye
"

echo "Deploy complete!"
