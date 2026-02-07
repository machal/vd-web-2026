/*
Grunt tasky
===========

1) CSS
2) Javascript
3) Obrazky
4) browserSync & watch
5) Alias tasky


*/

module.exports = function(grunt) {
  "use strict";

  // jit-grunt pro zrychleni nacitani gruntu a behu tasku
  require('jit-grunt')(grunt);

  // Nastaveni tasku
  grunt.initConfig({

    // 1) CSS
    // ======

    // LESS kompilace
    // --------------

    less: {
      default: {
        files: {
          'dist/css/style.css': 'src/less/index.less'
        }
      },
      sourcemaps: {
        files: {
          'dist/css/style.css': 'src/less/index.less'
        },
        options: {
          sourceMap: true,
          // sourceMapFilename:
          // Pokud nastaveno, zapise se SM do
          // externiho souboru. Uvadi se zde cesta k nemu.
          sourceMapFilename: 'dist/css/style.css.map',
          // sourceMapURL:
          // Prepise vychozi url pro soubor se SM,
          // tak jak se vola na konci zkompilovaneho CSS souboru.
          // Vychozi je obsah `sourceMapFilename`, tady jde prepsat.
          sourceMapURL: 'style.css.map',
          // sourceMapRootpath:
          // Cesta k LESS souborum jek budou volany ze souboru se SM.
          sourceMapRootpath: '/',
          // Komprimovat?
          // TODO: komprimujeme timto jen proto, ze contrib-css odstranoval
          // sourcemapy
          //compress: true,
        }
      },
      styleguide: {
        files: {
          'style-guide/css/styleguide.css': 'style-guide/less/styleguide.less'
        }
      }
    },

    // Autoprefixer
    // ------------

    // Automaticky pridava browser prefixy co vykompilovaneho CSS.

    autoprefixer: {
      options: {
        browsers: ['last 3 versions', 'ios 6', 'ie 7', 'ie 8', 'ie 9'],
        map: true // Updatni SourceMap
      },
      style: {
          src: 'dist/css/style.css',
          dest: 'dist/css/style.css'
      }
    },

    // criticalcss
    // -----------

    // Automaticky vytahuje kritický CSS kód (nad zlomem), který se má vložit do hlavičky
    // stránky jako inline.

    criticalcss: {
        // Detail produktu
        detail: {
          options: {
              // Sablona, ze ktere se vezme vizual nad zlomem:
              url: "http://localhost:3000/_pages/detail_biofinity.php",
              // Vysledny CSS soubor:
              outputfile: "dist/css/critical/detail.css",
              // Zdrojovy CSS soubor:
              filename: "dist/css/style.css",
              forceInclude: [
                ".foot",
                ".container",
                // TODO: divne se tady zachazi se specificnosti:
                ".pine-horizontal .pine-level-open > .pine-level-2",
                ".pine-horizontal .pine-level-open > .pine-level-3",
                ".pine-level-open .pine-level-2 > li > a",
                ".nav-lenses.pine-level-open .pine-level-3",
                ".nav-lenses.pine-level-open .pine-level-2",
                ".nav-lenses.pine-level-open .pine-level-2 > li",
                ".fx-hover-fade .pine-level-3 > li > a",
                ".js .motivator-2-rows-6-items .motivator-item-title",
                ".box-bordered",
              ]
          }
        },
        // Kategorie
        category: {
          options: {
              url: "http://localhost:3000/_pages/category.php",
              outputfile: "dist/css/critical/category.css",
              filename: "dist/css/style.css",
              forceInclude: [
                ".foot",
                ".container",
                // TODO: divne se tady zachazi se specificnosti:
                ".pine-horizontal .pine-level-open > .pine-level-2",
                ".pine-horizontal .pine-level-open > .pine-level-3",
                ".pine-level-open .pine-level-2 > li > a",
                ".nav-lenses.pine-level-open .pine-level-3",
                ".nav-lenses.pine-level-open .pine-level-2",
                ".nav-lenses.pine-level-open .pine-level-2 > li",
                ".fx-hover-fade .pine-level-3 > li > a",
                ".js .motivator-2-rows-6-items .motivator-item-title",
                ".box-bordered",
              ]
          }
        },
        // Homepage
        home: {
          options: {
              url: "http://localhost:3000/_pages/home.php",
              outputfile: "dist/css/critical/home.css",
              filename: "dist/css/style.css",
              forceInclude: [
                ".foot",
                ".container",
                // TODO: divne se tady zachazi se specificnosti:
                ".pine-horizontal .pine-level-open > .pine-level-2",
                ".pine-horizontal .pine-level-open > .pine-level-3",
                ".pine-level-open .pine-level-2 > li > a",
                ".nav-lenses.pine-level-open .pine-level-3",
                ".nav-lenses.pine-level-open .pine-level-2",
                ".nav-lenses.pine-level-open .pine-level-2 > li",
                ".fx-hover-fade .pine-level-3 > li > a",
                ".js .motivator-2-rows-6-items .motivator-item-title",
                ".box-bordered",
              ]
          }
        },
        // Košík
        cart: {
          options: {
              url: "http://localhost:3000/_pages/cart.php",
              outputfile: "dist/css/critical/cart.css",
              filename: "dist/css/style.css",
              forceInclude: [
                ".foot",
                ".container",
                // TODO: divne se tady zachazi se specificnosti:
                ".pine-horizontal .pine-level-open > .pine-level-2",
                ".pine-horizontal .pine-level-open > .pine-level-3",
                ".pine-level-open .pine-level-2 > li > a",
                ".nav-lenses.pine-level-open .pine-level-3",
                ".nav-lenses.pine-level-open .pine-level-2",
                ".fx-hover-fade .pine-level-3 > li > a",
                ".js .motivator-2-rows-6-items .motivator-item-title",
                ".box-bordered",
              ]
          }
        }
    },

    // CSSmin
    // ------

    // Minifikujeme inlinované CSSka.
    // Nepoužíváme na style.css, protože odstraňuje SourceMapy. Ale bylo
    // by to efektivnější než minifikovat LESSem. (TODO)

    cssmin: {
      inline_css: {
          files: [{
            expand: true,
            cwd: 'dist/css/critical/',
            src: ['*.css', '!*.min.css'],
            dest: 'dist/css/critical/',
            ext: '.min.css'
          }]
        }
    },

    // 2) Javascript
    // ================

    // Concat: spojovani JS do jednoho
    // -------------------------------

    concat: {
      // Inlinovany JS do hlavicky
      head: {
        src: [
          'src/js/index-head.js', // Nase detekce atd.
          'bower_components/picturefill/dist/picturefill.js', // Picturefill + matchmedia
          'bower_components/loadcss/loadCSS.js' // Asynchronni nacitani CSS
        ],
        dest: 'dist/js/script-head.js'
      },
      // Zbytek JS do paticky
      foot: {
        src: [
          'bower_components/jquery-legacy/jquery.js',
          'bower_components/respond/src/respond.js',
          'bower_components/enquire/dist/enquire.js',
          'bower_components/fastclick/lib/fastclick.js',
          'bower_components/responsive-navigation/dist/javascripts/pine.js',
          'bower_components/bootstrap/js/tooltip.js', // Potřebuje popover.js
          'bower_components/bootstrap/js/popover.js',
          'bower_components/bootstrap/js/transition.js', // Potřebuje collapse.js
          'bower_components/bootstrap/js/collapse.js',
          'src/js/index.js',
        ],
        dest: 'dist/js/script.js'
      }
    },

    // Uglify: pokrocila minifikace JS
    // -------------------------------

    uglify: {
      head: {
          src: 'dist/js/script-head.js',
          dest: 'dist/js/script-head.min.js'
      },
      foot: {
          src: 'dist/js/script.js',
          dest: 'dist/js/script.min.js'
      },
      load_css: {
          src: 'bower_components/loadcss/loadCSS.js',
          dest: 'dist/js/lib/load-css.min.js'
      }
    },

    // 3) Obrazky
    // ==========

    // Imagemin: zmensovani datoveho objemu obrazku
    // --------------------------------------------

    imagemin: {
      // VC logotypy
      images: {
        files: [{
          expand: true,                  // Enable dynamic expansion
          cwd: 'src/img/',         // Src matches are relative to this path
          src: ['**/*.jpg','**/*.png','**/*.gif','**/*.svg'],             // Actual patterns to match
          dest: 'dist/img/'        // Destination path prefix
        }]
      },
      // Obsahove obrazky: partneri, produktove fotky…
      content_img: {
        files: [{
          expand: true,                  // Enable dynamic expansion
          cwd: 'src/content-img/',         // Src matches are relative to this path
          src: ['**/*.jpg','**/*.png','**/*.gif','**/*.svg'],             // Actual patterns to match
          dest: 'dist/content-img/'        // Destination path prefix
        }]
      }
    },

    // SVG2PNG
    // -------
    // Z SVG obrazku dela PNG kopie pro fallbacky.

    svg2png: {
      images: {
        files: [
            { cwd: 'dist/img/', src: ['**/*.svg'] }
        ]
      },
      content_img: {
        files: [
            { cwd: 'dist/content-img/', src: ['**/*.svg'] }
        ]
      },
    },

    // responsive_images: vyroba zmensenin obrazku
    // -------------------------------------------

    responsive_images: {
      options: {
        sizes: [
        {
          name: "small",
          width: 200,
          quality: 80
        },
        {
          name: "medium",
          width: 400,
          quality: 80
        },
        {
          name: "large",
          width: 600,
          quality: 80
        }
        ]
      },
      files: {
        expand: true,
        src: ['**.{jpg,gif,png}'],
        cwd: 'dist/content-img/products/original/',
        // dest: 'dist/content-img/products/',
        custom_dest: 'dist/content-img/products/{%= name %}/'
      },
    },

    // 4) browserSync & watch
    // ======================

    // browserSync
    // -----------

    // Spusti server na http://localhost:3000/, externe pak na
    // adrese, kterou zobrazi pri startu.
    // Injectuje zmeny v bsFiles bez nutnosti reloadu.
    // Synchronizuje zobrazeni napric zarizeni
    // Je potreba mit nastaveny lokalne bezi Apache na vasecocky.localhost kvuli
    // pouziti PHP v prototypu.

    browserSync: {
      dev: {
          bsFiles: {
              src : [
                'dist/css/*.css',
                'style-guide/css/*.css'
              ]
          },
          options: {
              watchTask: true,
              proxy: 'vasecocky.localhost'
          }
      }
    },

    // watch
    // -----

    // Sleduje zmeny v LESS a JS souborech a spousti souvisejici tasky.

    watch: {
      less: {
        files: 'src/less/**/*.less',
        tasks: ['css']
      },
      styleguide: {
        files: 'style-guide/less/**/*.less',
        tasks: ['less:styleguide']
      },
      js: {
        files: 'src/js/*.js',
        tasks: ['js']
      }
    },

  });


  // 5) Alias tasky
  // =============

  grunt.registerTask('svg', ['imagemin:content_img', 'svg2png']);
  grunt.registerTask('css', ['less:default', 'less:styleguide', 'autoprefixer']);
  grunt.registerTask('css:dist', ['less:sourcemaps', 'autoprefixer', 'criticalcss', 'cssmin']);
  grunt.registerTask('img', ['imagemin', 'svg2png', 'responsive_images']);
  grunt.registerTask('js', ['concat', 'uglify']);
  grunt.registerTask('default', ['css', 'js', 'browserSync', 'watch']);

};
