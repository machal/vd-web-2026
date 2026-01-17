// imagemin: zmensovani datoveho objemu obrazku
// --------------------------------------------

'use strict';

module.exports = {

  content: {
    files: [{
      expand: true,
      cwd: 'assets/img/content/src/',
      src: ['**/**.{jpg,gif,png,svg}'],
      dest: 'assets/img/content/dest/original/'
    }]
  },
  icons: {
    files: [{
      expand: true,
      cwd: 'assets/img/icons/src/',
      src: ['**/**.{jpg,gif,png,svg}'],
      dest: 'assets/img/icons/dest/'
    }],
    options: {
      removeHiddenElems: true,
      cleanupNumericValues: true,
      svgoPlugins: [{removeViewBox: false}],
    }
  }

}; // module.exports
