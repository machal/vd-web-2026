<?php
if ( __FILE__ == $_SERVER['SCRIPT_FILENAME'] ) {
    include "../_includes/html-head.php";
}
?>

<!--
Bar: Proužek s důležitou informací nahoře.
(Např. výdejní místa v okolí.)
-->

<div id="bar" class="bar">

  <p class="container">
    Naše zboží můžete vyzvednout
    nedaleko vaší lokality ve výdejních místech
    <a href="#">Praha - Jindřišská</a> a
    <a href="#">Praha - Charkovská</a>.

    <button type="button" class="close">
      <span aria-hidden="true">&times;</span>
      <span class="sr-only">Close</span>
    </button>
  </p>

</div>


<?php
if ( __FILE__ == $_SERVER['SCRIPT_FILENAME'] ) {
    include "../_includes/html-foot.php";
}
?>
