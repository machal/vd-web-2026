/*
Grunt tasky
===========

1) CSS
2) Javascript
3) Obrazky
4) browserSync & watch
5) Natazene pluginy
6) Alias tasky


*/

module.exports = function(grunt) {
  "use strict";

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
      }
    },

    // Autoprefixer
    // ------------

    // Automaticky pridava browser prefixy co vykompilovaneho CSS.

    autoprefixer: {
      options: {
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
                ".js .motivator-2-rows-6-items .motivator-item-title",
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
                ".js .motivator-2-rows-6-items .motivator-item-title",
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
                ".js .motivator-2-rows-6-items .motivator-item-title",
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
                ".js .motivator-2-rows-6-items .motivator-item-title",
              ]
          }
        },
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
              src : 'dist/css/*.css'
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
      js: {
        files: 'src/js/index.js',
        tasks: ['js']
      }
    },

  });


  // 5) Natazene pluginy
  // ===================

  // CSS
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-criticalcss');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  // JS
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // IMG
  grunt.loadNpmTasks('grunt-svg2png');
  grunt.loadNpmTasks('grunt-contrib-imagemin');

  // etc
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-contrib-watch');


  // 6) Alias tasky
  // =============

  grunt.registerTask('svg', ['imagemin:logos_svg', 'svg2png']);
  grunt.registerTask('css', ['less:default', 'autoprefixer']);
  grunt.registerTask('css:dist', ['less:sourcemaps', 'autoprefixer', 'criticalcss', 'cssmin']);
  grunt.registerTask('js', ['concat', 'uglify']);
  grunt.registerTask('default', ['css', 'js', 'browserSync', 'watch']);

};
