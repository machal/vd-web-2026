# Quick Start - Migrace článků příručky do Astro

Rychlý návod pro migraci článků příručky do Astro projektu.

## Co je připraveno

✅ **368 článků příručky** v `content/prirucka/`  
✅ **Front Matter** s daty z databáze  
✅ **Validace podle sitemap.xml** - všechny publikované články mají `published: true`  
✅ **86 článků** s kompletními daty z databáze  
✅ **282 článků** s základním front matter

## Krok 1: Zkopírovat soubory

```bash
# Zkopírovat všechny články příručky do Astro repo
cp -r _VD26/export-for-astro/content/prirucka/* vd-astro/src/content/prirucka/
```

## Krok 2: Transformovat Front Matter

Front Matter je v exportovaném formátu, ale Astro potřebuje jiný formát:

**Spustit transformační skript:**
```bash
cd _VD26/export-for-astro
python3 transform_to_astro.py
```

**Nebo transformovat přímo v Astro repo:**
```bash
cd vd-astro
python3 _VD26/export-for-astro/transform_to_astro.py src/content/prirucka
```

**Co skript dělá:**
- ✅ Přejmenuje `category` → `categories`
- ✅ Přejmenuje `og_title` → `socialTitle`
- ✅ Přejmenuje `og_description` → `socialDescription`
- ✅ Přidá `title` z `heading`
- ✅ Odstraní `slug` (není v Astro schématu)

## Krok 3: Validace v Astro

```bash
cd vd-astro
npm run build
```

Zkontrolovat, zda všechny soubory projdou validací schématu.

## Krok 4: Kontrola

### Zkontrolovat publikované články

```bash
# Najít všechny publikované články
grep -r "published: true" src/content/prirucka/ | wc -l
# Mělo by být 261 článků
```

### Zkontrolovat kategorie

Ujistit se, že všechny kategorie existují v `src/content/categories/`:

```bash
# Extrahovat všechny kategorie z článků
grep -r "categories:" src/content/prirucka/ | grep -o "  - [a-z-]*" | sort -u
```

## Co může být potřeba doplnit

### Prázdná pole u některých článků

Některé články mají prázdná pole (`heading`, `date`, `perex`), protože nejsou v databázi:
- Tyto články jsou v sitemap.xml (jsou publikované)
- Je potřeba doplnit chybějící data ručně nebo z jiného zdroje

### Kategorie

Zkontrolovat, zda všechny kategorie existují v `src/content/categories/`:
- Pokud kategorie neexistuje, vytvořit ji nebo odstranit z článku

## Struktura v Astro

```
vd-astro/
├── src/
│   └── content/
│       ├── prirucka/           # ← Zde jsou články příručky
│       │   ├── amp.md
│       │   ├── bower.md
│       │   └── ...
│       ├── blog/
│       ├── categories/
│       └── config.ts
```

## Potřebné úpravy Astro schématu

Zkontrolovat, zda `src/content/config.ts` obsahuje správné schéma pro `prirucka`:

```typescript
const prirucka = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),                    // ← z heading
    heading: z.string().optional(),       // ← zachovat
    id: z.string(),                       // ← z id
    date: z.string().optional(),          // ← z date
    perex: z.string().optional(),        // ← z perex
    categories: z.array(z.string()),      // ← z category
    published: z.boolean(),               // ← z published
    include_rss: z.boolean().nullable().optional(),
    no_ads: z.boolean().nullable().optional(),
    category_highlight: z.boolean().nullable().optional(),
    socialTitle: z.string().optional(),  // ← z og_title
    socialDescription: z.string().optional(), // ← z og_description
    og_type: z.string().optional(),
    // ...
  }),
});
```

## Troubleshooting

### Chyba: "Missing required field: title"

- Skript `transform_to_astro.py` měl přidat `title` z `heading`
- Pokud chybí, zkontrolovat, zda článek má `heading` pole
- Pokud nemá, doplnit ručně

### Chyba: "Invalid field: category"

- Skript měl přejmenovat `category` → `categories`
- Pokud chyba přetrvává, zkontrolovat transformaci

### Chyba: "Invalid field: slug"

- Skript měl odstranit `slug` pole
- Pokud chyba přetrvává, zkontrolovat transformaci

## Další kroky

Po úspěšné migraci:

1. ✅ Zkontrolovat, že všechny články mají správné kategorie
2. ✅ Doplnit chybějící data u článků bez databázových záznamů
3. ✅ Otestovat zobrazení článků na webu
4. ✅ Zkontrolovat SEO metadata (og_title, og_description)

## Podpora

Pro podrobnější informace viz `MIGRACE-PRIRUCKA.md`.
