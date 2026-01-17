#!/bin/bash
# Skript pro migraci článků příručky do Astro repo

set -e

# Barvy pro výstup
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo "=== Migrace článků příručky do Astro ==="
echo ""

# Zjistíme cesty
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
EXPORT_DIR="$SCRIPT_DIR/content/prirucka"

# Zkontrolujeme, zda existuje Astro repo
if [ -z "$1" ]; then
    echo -e "${YELLOW}⚠️  Použití: $0 <cesta-k-astro-repo>${NC}"
    echo "   Např: $0 ../vd-astro"
    exit 1
fi

ASTRO_REPO="$1"
ASTRO_CONTENT_DIR="$ASTRO_REPO/src/content/prirucka"

if [ ! -d "$ASTRO_REPO" ]; then
    echo -e "${RED}❌ Astro repo neexistuje: $ASTRO_REPO${NC}"
    exit 1
fi

if [ ! -d "$ASTRO_REPO/src/content" ]; then
    echo -e "${RED}❌ Astro content adresář neexistuje: $ASTRO_REPO/src/content${NC}"
    exit 1
fi

# Vytvoříme adresář, pokud neexistuje
mkdir -p "$ASTRO_CONTENT_DIR"

echo "📁 Kopíruji články..."
echo "   Z: $EXPORT_DIR"
echo "   Do: $ASTRO_CONTENT_DIR"

# Zkopírujeme soubory
cp -r "$EXPORT_DIR"/* "$ASTRO_CONTENT_DIR"/

FILE_COUNT=$(find "$ASTRO_CONTENT_DIR" -name "*.md" | wc -l | tr -d ' ')
echo -e "${GREEN}✅ Zkopírováno $FILE_COUNT souborů${NC}"
echo ""

# Transformujeme Front Matter
echo "🔄 Transformuji Front Matter do Astro formátu..."
cd "$SCRIPT_DIR"
python3 transform_to_astro.py "$ASTRO_CONTENT_DIR"

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Front Matter transformován${NC}"
else
    echo -e "${RED}❌ Chyba při transformaci Front Matter${NC}"
    exit 1
fi

echo ""
echo -e "${GREEN}✅ Migrace dokončena!${NC}"
echo ""
echo "Další kroky:"
echo "1. Zkontroluj, že všechny kategorie existují v $ASTRO_REPO/src/content/categories/"
echo "2. Spusť validaci: cd $ASTRO_REPO && npm run build"
echo "3. Zkontroluj, zda všechny články projdou validací"
