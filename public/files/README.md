# Soubory /files/

Tato složka obsahuje statické soubory dostupné přes URL `/files/*`.

## Zkratky v .htaccess

```apache
RedirectMatch 301 ^/f/(.*) /files/$1
RedirectMatch 301 ^/vdampd/(.*) /files/vdamp/demo/$1
```

## Struktura

- `/vdamp/demo/` - demo soubory pro AMP e-book
- `/vdlayout/` - ukázky CSS layout e-booku
- `/vdwd/` - ukázky VDWD knihy

## Poznámka

Soubory z `assets/files/` je potřeba zkopírovat sem, pokud mají být dostupné přes URL `/files/*`.
