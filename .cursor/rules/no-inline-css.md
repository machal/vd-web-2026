# Žádný inline CSS v HTML

**PRAVIDLO:** Do HTML nesmím přidávat inline CSS (atribut `style="..."`).

### Výjimka

Pokud by inline styl byl z technických důvodů nutný (např. dynamická hodnota z dat, výjimečný edge case), musím:

1. **Upozornit** uživatele, že přidávám inline CSS
2. **Vysvětlit** konkrétní důvod (proč nestačí třída, `<style>` blok nebo externí CSS)
3. **Počkat na schválení** – bez výslovného souhlasu to nepoužít

### Preferované alternativy

- Utility třídy z projektu (např. `bg-highlight-neutral`, `pt-0`, `maxw-30em`)
- Přidání nové třídy do sdíleného CSS, pokud projektová konvence dovoluje, ale i na to upozornit uživatele
