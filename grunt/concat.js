// concat: spojeni JS
// ------------------

// Pouzivame jQ 1.x a polyfilly vsude kde jde, takze by v IE6-8
// mel JS ficet.

'use strict';

module.exports = {

  main: {
    src: [
      'node_modules/jquery/dist/jquery.js',
      'node_modules/jquery.smooth-scroll/jquery.smooth-scroll.js',
      'assets/js/vendor/simple-lightbox.js',
      'assets/js/index.js'
    ],
    dest: 'assets/js/vrdl.js'
  }

}; // module.exports
