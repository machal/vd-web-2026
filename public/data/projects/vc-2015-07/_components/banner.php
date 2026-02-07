<?php
if ( __FILE__ == $_SERVER['SCRIPT_FILENAME'] ) {
    include "../_includes/html-head.php";
}
?>

<!--
Banner na titulce:
Zobrazujeme bud mobilni nebo od 600px desktop variantu.
-->
<div class="vc-top">
  <div class="vc-container vc-container-relative">
    <p id="vc-banner" class="vc-banner">
      <a href="detail_biofinity.php">
        <img
          class="vc-banner-image"
          src="../dist/img/placeholder.png"
          data-src-desktop="../dist/content-img/banners/banner_desktop_home.jpg"
          data-src-mobile="../dist/content-img/banners/banner_mobile.jpg"
          width="1200" height="300"
          alt="Banner">
      </a>
    </p>
  </div>
</div>

<?php
if ( __FILE__ == $_SERVER['SCRIPT_FILENAME'] ) {
    include "../_includes/html-foot.php";
}
?>
