// Detekce vlastnosti prohlizece
// =============================

// document.vc-no-js -> document.vc-js
document.documentElement.className =
   document.documentElement.className.replace("no-js","js");

// document.vc-no-svg pro prohlizece bez SVG
if (!document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1"))
  document.documentElement.className += ' vc-no-svg';

// Picture element HTML5 shiv
document.createElement( "picture" );

