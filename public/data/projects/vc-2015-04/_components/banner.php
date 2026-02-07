<?php
if ( __FILE__ == $_SERVER['SCRIPT_FILENAME'] ) {
    include "../_includes/html-head.php";
}
?>

<!--
Banner na titulce:
Zobrazujeme bud mobilni nebo od 600px desktop variantu.
-->

<p id="banner" class="banner">
  <a href="detail_biofinity.php">
		<img
      class="banner-image"
      src="../dist/img/placeholder.png"
      data-src-desktop="../dist/content-img/banners/banner_desktop_home.jpg"
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
