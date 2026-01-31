'use strict';

module.exports = {

  // grunt css
  css: [
    'dart-sass',
    'dart-sass:standalone_modules',
    'dart-sass:all',
    'postcss',
    'cssmin',
    'cssmin:standalone_modules',
    'cssmin:all'
  ],

  // grunt amp
  amp: [
    'dart-sass:amp',
    'postcss:amp',
    'cssmin:amp',
    'string-replace:amp',
    'copy:amp',
    'file_append:amp'
  ],

  // grunt js
  js: [
    'webpack:dev',
    'concat',
    'uglify'
  ],

  // grunt deploy
  dist: [
    'copy',
    'css',
    'js',
    'amp'
  ],

  // grunt
  default: [
    'copy',
    'amp',
    'browserSync',
    'watch',
  ]

}; // module.exports
