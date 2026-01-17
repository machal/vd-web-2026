// string-replace: Replace uvnitr souboru
// -------------------------------------------------------

'use strict';

module.exports = {

  amp: {
    files: [
      {
        expand: true,
        cwd: 'assets/css/amp/min/',
        src: ['*.css'],
        dest: 'assets/css/amp/min/',
        ext: '.min.css'
      }
    ],
    options: {
      replacements: [{
        pattern: '@charset "UTF-8";',
        replacement: ''
      }]
    }
  }

}; // module.exports
