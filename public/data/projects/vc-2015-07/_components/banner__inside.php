<?php
if ( __FILE__ == $_SERVER['SCRIPT_FILENAME'] ) {
    include "../_includes/html-head.php";
}
?>

<!--
Banner na vnitrnich strankach:
Pomoci Picturefillu nebo nativniho <picture> zobrazujeme
bud mobilni nebo od 600px desktop variantu.
-->
<p id="vc-banner" class="vc-banner vc-banner-inside">
  <a href="detail_biofinity.php">
    <img
      class="vc-banner-image"
      src="../dist/img/placeholder.png"
      data-src-desktop="../dist/content-img/banners/banner_desktop_inside.jpg"
      data-src-mobile="../dist/content-img/banners/banner_mobile.jpg"
      width="1200" height="300"
      alt="Banner">
  </a>
</p>


<?php
if ( __FILE__ == $_SERVER['SCRIPT_FILENAME'] ) {
    include "../_includes/html-foot.php";
}
?>
