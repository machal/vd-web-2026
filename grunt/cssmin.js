// cssmin: zmenseni CSS pro produkcni verzi
// ----------------------------------------

'use strict';

module.exports = {

  main: {
    options: {
      banner: '<%= banner %>',
      sourceMap: false
    },
    files: {
      'assets/css/1-base.min.css':
        'assets/css/1-base.css',
      'assets/css/2-components.min.css':
        'assets/css/2-components.css',
      'assets/css/3-libraries.min.css':
        'assets/css/3-libraries.css',
      'assets/css/4-helpers.min.css':
        'assets/css/4-helpers.css'
    }
  },

  standalone_modules: {
    options: {
      sourceMap: false
    },
    files: [
      {
        expand: true,
        cwd: 'assets/css/modules-standalone/',
        src: ['*.css', 'pages/*.css'],
        dest: 'assets/css/modules-standalone/min/',
        ext: '.min.css'
      }
    ]
  },

  amp: {
    options: {
      sourceMap: false
    },
    files: [
      {
        expand: true,
        cwd: 'assets/css/amp/',
        src: ['*.css'],
        dest: 'assets/css/amp/min/',
        ext: '.min.css'
      }
    ]
  },

  all: {
    options: {
      banner: '<%= banner %>',
      sourceMap: false
    },
    files: {
      'assets/css/all.min.css':
        'assets/css/all.css'
    }
  }

}; // module.exports
