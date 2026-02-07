// Detekce vlastnosti prohlizece
// =============================

// document.no-js -> document.js
document.documentElement.className =
   document.documentElement.className.replace("no-js","js");

// document.no-svg pro prohlizece bez SVG
if (!document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1"))
  document.documentElement.className += ' no-svg';

// Picture element HTML5 shiv
document.createElement( "picture" );

