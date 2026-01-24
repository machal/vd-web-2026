# Legacy soubory /data/

Tato složka obsahuje staré soubory z původního VD.cz, které jsou stále odkazovány z internetu.

## Struktura složek

Zkopírujte odpovídající soubory z produkčního serveru:

- `/30/` → soubory z původní složky `/30/`
- `/archiv/` → archivní soubory
- `/blank/` → prázdné šablony
- `/css-frameworks/` → CSS frameworky demo
- `/fagaras/` → Fagaras projekt
- `/historie/` → historické soubory
- `/images-till-2012/` → staré obrázky (před 2012)
- `/projects/` → projekty (původně `/public/` a `/projects/`)
- `/tumblr-till-2012/` → Tumblr embed do 2012

## Redirecty v .htaccess

Tyto složky jsou cílem pro následující redirecty:

```apache
RedirectMatch 301 ^/30/(.*) /data/30/$1
RedirectMatch 301 ^/archiv/(.*) /data/archiv/$1
RedirectMatch 301 ^/blank/(.*) /data/blank/$1
RedirectMatch 301 ^/css-frameworks/(.*) /data/css-frameworks/$1
RedirectMatch 301 ^/fagaras/(.*) /data/fagaras/$1
RedirectMatch 301 ^/historie/(.*) /data/historie/$1
RedirectMatch 301 ^/images/(.*) /data/images-till-2012/$1
RedirectMatch 301 ^/public/(.*) /data/projects/$1
RedirectMatch 301 ^/projects/(.*) /data/projects/$1
RedirectMatch 301 ^/tumblr/(.*) /data/tumblr-till-2012/$1
```
