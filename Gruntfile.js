const webpackConfig = require('./grunt/webpack.config.js');
/* jshint node: true */

/*

Grunt tasks
===========

check grunt --help for more informations

1) CSS:                       grunt css
2) JavaScript:                grunt js
3) Images:                    grunt img
4) Performance Budget:        grunt perfbudget
5) Pre-deploy task (1/2):     grunt dist
6) browserSync & watch:       grunt

*/

module.exports = function(grunt) {

  // jit-grunt static mappings
  // https://github.com/shootaroo/jit-grunt#static-mappings
  require('jit-grunt')(grunt, {
    uglify: 'grunt-contrib-uglify',
    postcss: '@lodder/grunt-postcss'
  });

  "use strict";

  var options = {

    // načtení vlastností
    pkg: grunt.file.readJSON('package.json'),
    banner: '/**\n' +
              '* <%= pkg.name %>.js v<%= pkg.version %>\n' +
              '*/\n',

    // načtení lokálního konfiguračního souboru
    localconf: grunt.file.readJSON('grunt/config.json'),
    webpack: {
      options: {
        stats: !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
      },
      prod: webpackConfig,
      dev: Object.assign({ watch: true }, webpackConfig)
    }
  };

  // počítání rychlosti běhu tasků
  require('time-grunt')(grunt);

  // načítání tasků z jednotlivých souborů
    // použit https://github.com/firstandthird/load-grunt-config
    // tasky jsou uloženy v adresáři "grunt", název je dle tasku
    // aliasy jsou v souboru aliases.js
  require('load-grunt-config')(grunt, {
    jitGrunt: true,
    config: options
  });

  grunt.loadNpmTasks('grunt-webpack');
};
