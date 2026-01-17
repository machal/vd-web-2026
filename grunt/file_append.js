// file-append: Vlozeni stringu na zacatek a konec souboru
// -------------------------------------------------------

'use strict';

module.exports = {

  amp: {
    files: [
      {
        append: "</style>",
        prepend: "<style n:syntax=off amp-custom>",
        input: 'assets/css/amp/latte/amp-articles.latte',
        output: 'assets/css/amp/latte/amp-articles.latte'
      },
      {
        append: "</style>",
        prepend: "<style n:syntax=off amp-custom>",
        input: 'assets/css/amp/latte/amp-ebooks.latte',
        output: 'assets/css/amp/latte/amp-ebooks.latte'
      },
      {
        append: "</style>",
        prepend: "<style n:syntax=off amp-custom>",
        input: 'assets/css/amp/latte/amp-courses.latte',
        output: 'assets/css/amp/latte/amp-courses.latte'
      }
    ]
  }

}; // module.exports
