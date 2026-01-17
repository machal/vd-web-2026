// browserSync
// -----------

// Spusti server na http://localhost:3000/, externe pak na
// adrese, kterou zobrazi pri startu.
// Injectuje zmeny v bsFiles bez nutnosti reloadu.
// Synchronizuje zobrazeni napric zarizenimi.
// Je potreba mit nastaveny lokalne bezi Apache na vzhurudolu.localhost kvuli
// pouziti PHP.

'use strict';

module.exports = {

  dev: {
      bsFiles: {
          src : 'assets/css/*.css'
      },
      options: {
          watchTask: true,
          proxy: '<%= localconf.localurl %>'
      }
  }

}; // module.exports
