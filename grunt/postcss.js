// PostCSS: pridani prefixu
// ------------------------

'use strict';

module.exports = {

  options: {
    map: true,
    processors: [
      require('autoprefixer')()
    ]
  },
  dist: {
    src: [
      'assets/css/1-base.css',
      'assets/css/2-components.css',
      'assets/css/3-libraries.css',
      'assets/css/4-helpers.css',
     ]
  },
  amp: {
    src: [
      'assets/css/amp/amp-ebooks.css',
      'assets/css/amp/amp-courses.css',
      'assets/css/amp/amp-articles.css'
     ]
  },
  all: {
    src: [
      'assets/css/all.css'
     ]
  }

}; // module.exports
