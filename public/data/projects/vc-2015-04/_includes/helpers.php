<?php

// Vypisuje srcset varianty obrázků
// --------------------------------

// Varianty co máme a jejich šířka:
// - small (200px)
// - medium (400px)
// - large (600px)

function getSrcSet($filename) {
  echo "../dist/content-img/products/small/product_".$filename.".jpg?2 200w,
    ../dist/content-img/products/medium/product_".$filename.".jpg?2 400w,
    ../dist/content-img/products/large/product_".$filename.".jpg?2 600w";
}

// Funkce pro získání obsahu parametru sizes="" do <img>
// -----------------------------------------------------

// Viz responzivní obrázky: http://www.vzhurudolu.cz/prirucka/srcset-sizes
// šířka layoutu = celou šířka bez 2 * okrajový padding = calc(100vw - 2*15px)

// ### Detail produktu
// - do 767px: šířka layoutu --> calc(100vw - 2*15px)
// - nad 768px: 28% z šířky layoutu --> (min-width: 768px) calc(0.28 * calc(100vw - 2*15px))

function getSizesForDetail() {
  echo "(min-width: 768px) calc(0.28 * calc(100vw - 2*15px)), calc(100vw - 2*15px)";
}

// ### Kategorie
// - calc( (100vw - 4*15px) / 2 * 0.6 ) // 2 na řádku
// - (min-width: 481px) calc( (100vw - 5*15px) / 3 * 0.6 ) // 3 na řádku
// - (min-width: 1201px) calc( (1200px - 4*15px) / 4 * 0.6 ) // 4 na řádku
// - (min-width: 1601px) calc( (100vw - 2*10%) - 6*15px) / 6 * 0.6 ) // 6 na řádku

function getSizesForCategory() {
  echo "(min-width: 481px) calc( (100vw - 5*15px) / 3 * 0.6 ),
    (min-width: 1201px) calc( (1200px - 4*15px) / 4 * 0.6 ),
    (min-width: 1601px) calc( (100vw - 2*10%) - 6*15px) / 6 * 0.6 ),
    calc( (100vw - 4*15px) / 2 * 0.6 )";
}

// ### Košík

function getSizesForCart() {
  echo "(min-width: 320px) calc( (100vw - 2*15px) / 3 ),
    (min-width: 500px) calc( (100vw - 2*15px) / 4 ),
    (min-width: 768px) calc( (100vw - 2*10%) * 0.12 ),
    75px";
}

// ### Náhodná dostupnost
// Pro otestování tabulek s parametry čoček s různými délkami textu

function getRandomAvailability() {
  $availabilites = Array(
    '<strong class="label label-success">zítra&nbsp;22.&nbsp;3.u&nbsp;vás</strong>',
    '<strong class="label label-success">1&nbsp;až&nbsp;9&nbsp;dnů</strong>',
    '<strong class="label label-success">1&nbsp;až&nbsp;14&nbsp;dnů</strong>',
    '<strong class="label label-success">zítra&nbsp;22.&nbsp;3.&nbsp;u&nbsp;vás</strong> nebo <a href="#adresa_prodejny">v&nbsp;Praze</a> <strong class="label label-success">ihned&nbsp;k&nbsp;odběru</strong>',
    '<strong class="label label-success">zítra&nbsp;22.&nbsp;3.&nbsp;u&nbsp;vás</strong> nebo <a href="#adresa_prodejny">v&nbsp;Praze</a> <strong class="label label-success">3&nbsp;ks&nbsp;ihned&nbsp;k&nbsp;odběru</strong> a <strong class="label label-success">5 ks 18. 2. 2014</strong>'
  );
  return $availabilites[array_rand($availabilites)];
}

?>
