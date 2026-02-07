// Odstranění CriticalCSS po načtení plnohodnotného stylopisu
// ==========================================================

// Dočasný hack kvůli této a dalším chybám v grunt-critical-css
// https://github.com/filamentgroup/grunt-criticalcss/issues/26
// Měl by vyřešit update po vydání PhantomJS 2.x


function onloadCSS( ss, callback ) {
  ss.onload = function() {
    ss.onload = null;
    if( callback ) {
      callback.call( ss );
    }
  };

  // This code is for browsers that don’t support onload, any browser that
  // supports onload should use that instead.
  // No support for onload:
  //  * Android 4.3 (Samsung Galaxy S4, Browserstack)
  //  * Android 4.2 Browser (Samsung Galaxy SIII Mini GT-I8200L)
  //  * Android 2.3 (Pantech Burst P9070)

  // Weak inference targets Android < 4.4
  if( "isApplicationInstalled" in navigator && "onloadcssdefined" in ss ) {
    ss.onloadcssdefined( callback );
  }
}

// Odstraní inline CSS
onloadCSS( loadCSS( "/dist/css/style.css" ), function() {
  var el = document.getElementById("criticalcss");
  if(el){ el.parentNode.removeChild(el); }
});
