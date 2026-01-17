// watch
// -----

// SASS / JS files watcher - watch changes in SASS/JS files and run selected tasks

'use strict';

module.exports = {

  sass: {
    files: 'assets/**/*.scss',
    tasks: ['css']
  },
  js: {
    files: 'assets/**/*.js',
    tasks: ['js']
  }

}; // module.exports
