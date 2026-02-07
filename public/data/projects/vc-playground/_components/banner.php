<?php
if ( __FILE__ == $_SERVER['SCRIPT_FILENAME'] ) {
    include "../_includes/html-head.php";
}
?>

<!-- 
Banner na titulce:
Pomoci Picturefillu nebo nativniho <picture> zobrazujeme 
bud mobilni nebo od 600px desktop variantu.
-->

<p id="banner" class="banner">
	<picture>
		<source 
			srcset="../dist/img/banner/vasecocky_1800x450_airOptixAqua_HP.jpg" 
			media="(min-width: 600px)">
		<img 
			srcset="../dist/img/banner/vasecocky_1800x450_airOptixAqua_Mobil.jpg" 
			width="1200" height="300"
	    	alt="Banner"
	    	class="img-responsive">
	</picture>
</p>


<?php
if ( __FILE__ == $_SERVER['SCRIPT_FILENAME'] ) {
    include "../_includes/html-foot.php";
}
?>
