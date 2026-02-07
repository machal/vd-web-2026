/*
Grunt tasky
===========

1) Servis - copy, remove…
2) CSS
3) Javascript
4) Obrazky
5) Screenshotovac pro porovnani
6) browserSync & watch
7) Alias tasky


*/

module.exports = function(grunt) {
  "use strict";

  // zjistujeme cas behu tasku
  require('time-grunt')(grunt);

  // jit-grunt pro zrychleni nacitani gruntu a behu tasku
  require('jit-grunt')(grunt, {
    resemble: 'grunt-resemble-cli', // nutno nacist rucne
  });

  // cesty pro porovnani resemble
  var resemblePaths = [
    'home.php',
    'category_2nd_level.php',
    'category_2nd_level_combine.php',
    'detail_biofinity.php',
    'detail_frequency.php',
    'category.php',
    'detail_freshlook.php',
    'detail_proclear.php',
    'detail_solocare.php',
    'cart.php',
    'cart_all.php',
    'order-delivery-payment.php',
    'order-personal-details.php',
    'text.php',
  ];

  // Nastaveni tasku

  grunt.initConfig({

    // 1) Servis
    // =========

    // Odstraneni adresare s obrazky
    // -----------------------------

    remove: {
      options: {
        trace: true
      },
      dirList: ['dist/content-img/']
    },

    // Kopirovani souboru
    // ------------------

    copy: {
      glyphicons: {
        files: [
          {
            expand: true,
            cwd: 'bower_components/bootstrap/dist/fonts/',
            src: ['*.*'],
            dest: 'dist/fonts/'
          },
        ]
      },
    },

    // 2) CSS
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
          sourceMapRootpath: '/'
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
            ".vc-foot",
            ".vc-container",
            // TODO: divne se tady zachazi se specificnosti:
            ".pine-horizontal .pine-level-open > .pine-level-2",
            ".pine-horizontal .pine-level-open > .pine-level-3",
            ".pine-level-open .pine-level-2 > li > a",
            ".vc-nav-lenses.pine-level-open .pine-level-3",
            ".vc-nav-lenses.pine-level-open .pine-level-2",
            ".vc-nav-lenses.pine-level-open .pine-level-2 > li",
            ".fx-hover-fade .pine-level-3 > li > a",
            ".js .vc-motivator-2-rows-6-items .vc-motivator-item-title",
            ".vc-box-bordered"
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
            ".vc-foot",
            ".vc-container",
            // TODO: divne se tady zachazi se specificnosti:
            ".pine-horizontal .pine-level-open > .pine-level-2",
            ".pine-horizontal .pine-level-open > .pine-level-3",
            ".pine-level-open .pine-level-2 > li > a",
            ".vc-nav-lenses.pine-level-open .pine-level-3",
            ".vc-nav-lenses.pine-level-open .pine-level-2",
            ".vc-nav-lenses.pine-level-open .pine-level-2 > li",
            ".fx-hover-fade .pine-level-3 > li > a",
            ".js .vc-motivator-2-rows-6-items .vc-motivator-item-title",
            ".vc-box-bordered"
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
            ".vc-foot",
            ".vc-container",
            // TODO: divne se tady zachazi se specificnosti:
            ".pine-horizontal .pine-level-open > .pine-level-2",
            ".pine-horizontal .pine-level-open > .pine-level-3",
            ".pine-level-open .pine-level-2 > li > a",
            ".vc-nav-lenses.pine-level-open .pine-level-3",
            ".vc-nav-lenses.pine-level-open .pine-level-2",
            ".vc-nav-lenses.pine-level-open .pine-level-2 > li",
            ".fx-hover-fade .pine-level-3 > li > a",
            ".js .vc-motivator-2-rows-6-items .vc-motivator-item-title",
            ".vc-box-bordered"
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
            ".vc-foot",
            ".vc-container",
            // TODO: divne se tady zachazi se specificnosti:
            ".pine-horizontal .pine-level-open > .pine-level-2",
            ".pine-horizontal .pine-level-open > .pine-level-3",
            ".pine-level-open .pine-level-2 > li > a",
            ".vc-nav-lenses.pine-level-open .pine-level-3",
            ".vc-nav-lenses.pine-level-open .pine-level-2",
            ".fx-hover-fade .pine-level-3 > li > a",
            ".js .vc-motivator-2-rows-6-items .vc-motivator-item-title",
            ".vc-box-bordered"
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

    // 3) Javascript
    // =============

    // Concat: spojovani JS do jednoho
    // -------------------------------

    concat: {
      // Inlinovany JS do hlavicky
      head: {
        src: [
          'src/js/head-detect.js', // Nase detekce atd.
          'bower_components/picturefill/dist/picturefill.js', // Picturefill + matchmedia
          'bower_components/loadcss/loadCSS.js', // Asynchronni nacitani CSS
          'src/js/head-critical-css-hack.js', // Fix problemu v grunt-critical-css
        ],
        dest: 'dist/js/script-head.js'
      },
      // Zbytek JS do paticky
      foot: {
        src: [
          'bower_components/jquery-legacy/jquery.js',
          'bower_components/jquery-ui/ui/core.js',
          'bower_components/jquery-ui/ui/widget.js',
          'bower_components/jquery-ui/ui/position.js',
          'bower_components/jquery-ui/ui/menu.js',
          'bower_components/jquery-ui/ui/autocomplete.js',
          'bower_components/respond/src/respond.js',
          'bower_components/enquire/dist/enquire.js',
          'bower_components/fastclick/lib/fastclick.js',
          'bower_components/pine-navigation/dist/javascripts/pine.js',
          'bower_components/bootstrap/js/tooltip.js', // Potrujeme pro popover.js
          'bower_components/bootstrap/js/popover.js',
          'bower_components/bootstrap/js/transition.js', // Potrujeme pro collapse.js
          'bower_components/bootstrap/js/collapse.js',
          'src/js/index.js'
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

    // 4) Obrazky
    // ==========

    // clean
    // -----

    // Vycisti adresare s generovanymi obrazky

    clean: {
      allimg: {
        src: [['dist/content-img/*', 'dist/img/*']]
      },
      svg: {
        src: [['dist/content-img/*.svg', 'dist/img/*.svg']]
      }
    },

    // Imagemin: zmensovani datoveho objemu obrazku
    // --------------------------------------------

    imagemin: {
      // bitmapove obrazky
      bitmaps: {
        files: [
          { // Obsahove obrazky: partneri, produktove fotky…
            expand: true,
            cwd: 'src/content-img/',
            src: ['**/*.jpg', '**/*.png', '**/*.gif'],
            dest: 'dist/content-img/'
          },
          { // ostatni obrazky
            expand: true,
            cwd: 'src/img/',
            src: ['**/*.jpg', '**/*.png', '**/*.gif'],
            dest: 'dist/img/'
          }
        ]},
      // vsechna svg
      svg: {
        options: {
          // zapinani a vypinani pluginu optimalizatoru SVG
          // interaktivni k otestovani: http://jakearchibald.github.io/svgomg/
          svgoPlugins: [
            { removeRasterImages: true },       // odebirame bitmapovy obrazky
            { removeViewBox: false },           // zachovej viewbox (je vychozi, ale co kdyby)
            { cleanupEnableBackground: false }, // zachovavame enable-background
            //{ convertPathData: false },         // rozbijelo nektere svg
            //{ convertTransform: false },        // rozbijelo nektere svg
            //{ cleanupIDs: false },              // id potrebujeme
          ],
        },
        files: [
          { // Obsahove obrazky: partneri, produktove fotky…
            expand: true,
            cwd: 'src/content-img/',
            src: '**/*.svg',
            dest: 'dist/content-img/'
          },
          { // ostatni obrazky
            expand: true,
            cwd: 'src/img/',
            src: '**/*.svg',
            dest: 'dist/img/'
          }
        ]
      }
    },

    // SVG2PNG
    // -------
    // Z SVG obrazku v src renderuje PNG kopie pro fallbacky.
    // na Windows musi mit zdrojove SVG XML hlavicku (staci <?xml version="1.0"?>)

    svg2png: {
      images: {
        files: [
            { cwd: 'src/img/', src: ['**/*.svg'], dest: 'dist/img/' }
        ]
      },
      content_img: {
        files: [
            { cwd: 'src/content-img/', src: ['**/*.svg'], dest: 'dist/content-img/' }
        ]
      }
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
      }
    },

    // 5) resemble
    // ===========

    // udela screenshoty pres PhanotmJS v ruznych sirkach
    // pokud se screenshot lisi, prepise ho, proto je dobre
    // mit v tom adresari inicializovany git repozitar
    // lze rychle porovnat na http://huddle.github.io/Resemble.js/
    // je potreba pred testovanim vypnout nahodne zmeny
    // ve „statickych“ php: hledej: $random a $availabilites
    // todo: pouzit resemble.js a mit vizualni diff

    resemble: {
      options: {
        screenshotRoot: '../vc-rwd-screen-comparison',
        url: 'http://vasecocky.localhost/_pages/',
        gm: true,

      },
      desktop: {
        options: {
          width: 1200,
        },
        src: resemblePaths,
        dest: 'desktop',
      },
      tablet: {
        options: {
          width: 761,
        },
        src: resemblePaths,
        dest: 'tablet',
      },
      mobile: {
        options: {
          width: 320,
        },
        src: resemblePaths,
        dest: 'mobile',
      }
    },


    // 6) browserSync, ftp-deploy a watch
    // ==================================

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
          proxy: 'vasecocky.localhost',
          port: 3000
        }
      }
    },

    // ftp-deploy
    // ----------

    // Nahraje kompletni souboury na http://vc.vzhurudolu.cz
    // TODO zatim nenasazeno – je to hrozne pomaly a neignoruje to soubory v 'exclusions'.

    'ftp-deploy': {
      build: {
        auth: {
          host: 'machal.savana-hosting.cz',
          port: 21,
          authKey: 'vc_vzhurudolu_cz'
        },
        src: ['./'],
        dest: '/',
        exclusions: ['.git/', '.gitignore', '.ftppass',
          'src/', 'bower_components/', 'node_modules/']
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
    }
  });


  // 7) Alias tasky
  // =============

  // pripravi distribucni verzi vsech statickych souboru
  grunt.registerTask('dist', ['js', 'img', 'css_dist', 'copy:glyphicons']);

  // vytvori distribucni verzi a todo: nahraje na vc.vzhurudolu.cz
  grunt.registerTask('deploy', ['dist' /*'ftp-deploy'*/]);

  // po zmene svg
  grunt.registerTask('svg', ['clean:svg', 'svg2png', 'imagemin:svg']);

  // pust po zmene obrazku (resi i svg)
  grunt.registerTask('img', ['clean:allimg', 'svg2png', 'imagemin:bitmaps', 'responsive_images', 'imagemin']); //todo: nepoustet imagemin 2×

  // vygeneruje produkcni CSS
  grunt.registerTask('css_dist', ['less:sourcemaps', 'autoprefixer', 'criticalcss', 'cssmin']);

  // CSS pro vyvoj s autoprefixererem
  grunt.registerTask('css', ['less:default', 'autoprefixer']);

  // pripravi javascripty
  grunt.registerTask('js', ['concat', 'uglify']);


  // ### s watcherem

  // kdyz menis jen CSS, minimalni verze, negeneruje sitemap atd.
  grunt.registerTask('css_dev', ['less:default', 'browserSync', 'watch:less']);

  // kdyz menis CSS a javascript, trva dele
  grunt.registerTask('default', ['js', 'css', 'browserSync', 'watch']);

};
