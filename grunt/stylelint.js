// Grunt plugin pro lintování CSS - http://stylelint.io/
// https://github.com/wikimedia/grunt-stylelint
// -------------------------------------------

'use strict';

module.exports = {

  options: {
    configFile: '.stylelintrc',
    formatter: 'string',
    ignoreDisables: false,
    failOnError: false,
    outputFile: '',
    reportNeedlessDisables: false,
    syntax: 'scss'
  },
  src: [
    'assets/scss/**/*.scss',
    '!assets/scss/lib/**/*.scss'
  ]

}; // module.exports
