<?php
if ( __FILE__ == $_SERVER['SCRIPT_FILENAME'] ) {
    include "../_includes/html-head.php";
}
?>

<div class="vc-person vc-person-for-top">
  <div class="vc-matrjoska">

    <p class="vc-person-photo">
      <span class="vc-person-img"><img alt="Kateřina Miklíková" src="http://satyr.io/140/paleblue?delay=3g"></span>
      <!--šířka obrázku není nastavena úmyslně, je v CSS + používáme jednoduchou metodu pro lepší vzhed na displejích s vyšším rozlišením (retina apod.) -->
      <?php /* online */ if ($_SESSION['cycle'][0][1]): ?>
        <span class="vc-person-status vc-person-status-online"><span>je online</span>&nbsp;</span>
      <?php /* offline */else: ?>
        <span class="vc-person-status vc-person-status-offline"><span>je offline</span>&nbsp;</span>
      <?php endif; ?>
    </p>

    <p class="vc-person-name">
      Kateřina
      <?php /* krátké jméno */ if ($_SESSION['cycle'][0][1]): ?>Nová<?php /* dlouhé jméno */else: ?>Gutenschlefrová<?php endif; ?>
      <br> <small>zákaznický servis</small>
    </p>
  </div>
</div>

<?php
if ( __FILE__ == $_SERVER['SCRIPT_FILENAME'] ) {
    include "../_includes/html-foot.php";
}
?>
