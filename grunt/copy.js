// Copy files
// ==========

'use strict';

module.exports = {

  prirucka: {
    files: [
      {
        expand: true,
        cwd: 'node_modules/prirucka/content/',
        src: ['**'],
        dest: 'prirucka-content/content/'
      },
      {
        expand: true,
        cwd: 'node_modules/prirucka/dist/',
        src: ['**'],
        dest: 'prirucka-content/dist/'
      }
    ]
  },
  amp: {
    files: [
      {
        expand: true,
        cwd: 'assets/css/amp/min/',
        src: ['*.css'],
        dest: 'assets/css/amp/latte/',
        ext: '.latte'
      }
    ]
  },

}; // module.exports
