# Prototyp responzivních VašeČočky.cz – instrukce pro frontend prostředí

## Instalace

```shell
# Nainstaluj všechny Bower komponenty projektu (Bootstrap, jQuery…)
bower install

# Nainstaluj všechny Node balíčky projektu (grunt-contrib-less, grunt-browser-sync)
npm install
# (Pokud skončí chybou, zkus `sudo npm install`)
```

## Grunt workflow

```shell
# Spusť výchozí Grunt task: udělá distribuční css, js, pustí browserSync a watch - hlídání změn
grunt

# CSS task pro vývoj: LESS bez sourcemap a autoprefixer
grunt css

# CSS task pro distribuci: LESS se sourcemapami, autoprefixer, criticalcss a cssmin
grunt css:dist

# Po přidání nového SVG souboru do src/: zmenší SVG a vytvoří PNG fallback v dist/
grunt svg

# Po přidání nové bitmapy do src/: vytvoří menší verze v dist/
grunt imagemin
```

## Více o používaných nástrojích

- Bower: http://www.vzhurudolu.cz/prirucka/bower
- Grunt: http://www.vzhurudolu.cz/prirucka/grunt
- Tahák: https://github.com/fczbkk/workshop-automation

Kontakt: martin@vzhurudolu.cz
