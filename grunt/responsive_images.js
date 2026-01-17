// responsive_images: vyroba zmensenin obrazku
// -------------------------------------------
// (Vsechny obrazky jsou v pomerech 16/9)

'use strict';

module.exports = {

  default: {
    options: {
      engine: 'im',
      sizes: [
        {
          name: "x-small",
          width: 350,
          quality: 100
        },
        {
          name: "small",
          width: 600,
          quality: 100
        },
        {
          name: "medium",
          width: 800,
          quality: 100
        },
        {
          name: "large",
          width: 1024,
          quality: 100
        }
      ]
    },
    files: [{
      expand: true,
      src: ['**/**.{jpg,gif,png}'],
      cwd: 'assets/img/content/src/',
      dest: 'assets/img/content/dest/',
      custom_dest: 'assets/img/content/dest/{%= name %}/{%= path %}/'
    }]
  },

  all: {
    options: {
      engine: 'im',
      newFilesOnly: false, // Zpracuje i upravene soubory
      sizes: [
        {
          name: "x-small",
          width: 350,
          quality: 100
        },
        {
          name: "small",
          width: 600,
          quality: 100
        },
        {
          name: "medium",
          width: 800,
          quality: 100
        },
        {
          name: "large",
          width: 1024,
          quality: 100
        }
      ]
    },
    files: [{
      expand: true,
      src: ['**/**.{jpg,gif,png}'],
      cwd: 'assets/img/content/src/',
      dest: 'assets/img/content/dest/',
      custom_dest: 'assets/img/content/dest/{%= name %}/{%= path %}/'
    }]
  }

}; // module.exports
