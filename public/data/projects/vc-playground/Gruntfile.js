module.exports = function(grunt) {
  "use strict";

  // Nastaveni tasku
  grunt.initConfig({

    less: {
      main: {
        options: {
          sourceMap: false, // TODO lepe nastavit, pak nastavit na true
          sourceMapFilename: 'dist/css/style.css.map', // where file is generated and located
          sourceMapURL: '/css/style.css.map', // the complete url and filename put in the compiled css file
          sourceMapBasepath: 'dist/public', // Sets sourcemap base path, defaults to current working directory.
          sourceMapRootpath: '/vasecocky.cz/prototyp/', // adds this path onto the sourcemap filename and less file paths
        },
        files: {
          'dist/css/style.css': 'src/less/index.less'
        },
      }
    },

    concat: {
      head: {
        src: [
          'bower_components/picturefill/dist/picturefill.js' // Picturefill + matchmedia
        ],
        dest: 'dist/js/script-head.js'
      },
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

    uglify: {
      head: {
          src: 'dist/js/script-head.js',
          dest: 'dist/js/script-head-production.js'
      },
      foot: {
          src: 'dist/js/script.js',
          dest: 'dist/js/script-production.js'
      }
    },

    autoprefixer: {
      options: {
        browsers: ['last 3 versions', 'ios 6', 'ie 7', 'ie 8', 'ie 9']
      },
      files: {
        src: 'dist/css/style.css',
        dest: 'dist/css/style.css'
      },
    },

    cssmin: {
      options: {
        banner: '<%= banner %>'
      },
      files: {
        src: 'dist/css/style.css',
        dest: 'dist/css/style-production.css'
      }
    },

    imagemin: {
      logos_svg: {
        files: [{
          expand: true,                  // Enable dynamic expansion
          cwd: 'src/img/logos/',         // Src matches are relative to this path
          src: ['**/*.svg'],             // Actual patterns to match
          dest: 'dist/img/logos/'        // Destination path prefix
        }]
      },
      // Nefunguje;  zrejme protoze zdrojove a cilove soubory jsou totozne
      // logos_png: {
      //   files: [
      //       { cwd: 'dist/img/logos/', src: ['**/*.png'] }
      //   ]
      // }
    },

    svg2png: {
      logos: {
        files: [
            { cwd: 'dist/img/logos/', src: ['**/*.svg'] }
        ]
      }
    },

    browserSync: {
      dev: {
          bsFiles: {
              src : 'src/css/style.css'
          },
          options: {
              watchTask: true,
              proxy: 'vasecocky.localhost'
          }
      }
    },

    watch: {
      less: {
        files: 'src/less/**/*.less',
        tasks: ['css']
      },
      js: {
        files: 'src/js/index.js',
        tasks: ['js']
      }
    }

  });


  // Pluginy
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-svg2png');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-browser-sync');


  // Hlavni tasky
  grunt.registerTask('svg', ['imagemin:logos_svg', 'svg2png']);
  grunt.registerTask('css', ['less', 'autoprefixer', 'cssmin']);
  grunt.registerTask('js', ['concat', 'uglify']);
  grunt.registerTask('default', ['css', 'js', 'browserSync', 'watch']);

};
