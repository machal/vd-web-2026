<?php
if ( __FILE__ == $_SERVER['SCRIPT_FILENAME'] ) {
    include "../_includes/html-head.php";
}
?>

<!--
Bar: Proužek s důležitou informací nahoře.
(Např. výdejní místa v okolí.)
-->

<div id="vc-bar" class="vc-bar vc-bar-location">
  <p class="vc-container">
    Naše zboží můžete vyzvednout
    nedaleko vaší lokality ve výdejních místech
    <a href="text.php">Praha - Jindřišská</a> a
    <a href="text.php">Praha - Charkovská</a>.

    <button type="button" class="close">
      <span aria-hidden="true">&#10005;</span>
      <span class="sr-only">Close</span>
    </button>
  </p>
</div>


<?php
if ( __FILE__ == $_SERVER['SCRIPT_FILENAME'] ) {
    include "../_includes/html-foot.php";
}
?>
