// sass: kompilace do CSS
// ----------------------

'use strict';

const sass = require('sass');

module.exports = {

  main: {
    options: {
      implementation: 'dart-sass',
      sourceMap: true
    },
    files: [
      {src: ['assets/scss/1-base.scss'], dest: 'assets/css/1-base.css'},
      {src: ['assets/scss/2-components.scss'], dest: 'assets/css/2-components.css'},
      {src: ['assets/scss/3-libraries.scss'], dest: 'assets/css/3-libraries.css'},
      {src: ['assets/scss/4-helpers.scss'], dest: 'assets/css/4-helpers.css'}
    ]
  },
  standalone_modules: {
    options: {
      implementation: 'dart-sass',
      sourceMap: true
    },
    files: [
      {
        expand: true,
        cwd: 'assets/scss/modules-standalone/',
        src: ['**/*.scss'],
        dest: 'assets/css/modules-standalone/',
        ext: '.css'
      }
    ]
  },
  amp: {
    options: {
      implementation: 'dart-sass',
      sourceMap: false
    },
    files: [
      {
        expand: true,
        cwd: 'assets/scss/amp/',
        src: ['**/*.scss'],
        dest: 'assets/css/amp/',
        ext: '.css'
      }
    ]
  },
  all: {
    options: {
      implementation: 'dart-sass',
      sourceMap: true
    },
    files: [
      {src: ['assets/scss/all.scss'], dest: 'assets/css/all.css'}
    ]
  }

}; // module.exports
