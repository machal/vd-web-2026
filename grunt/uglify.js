// uglify: zmenseni JS
// -------------------

'use strict';

module.exports = {

  main: {
    options: {
      banner: '<%= banner %>'
    },
    files: [
      {
        src: 'assets/js/vrdl.webpack.js',
        dest: 'assets/js/vrdl.min.js'
      }
    ]
  }

}; // module.exports
