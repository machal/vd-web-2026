<?php

// Formuláře se slevami v košíku

if ( __FILE__ == $_SERVER['SCRIPT_FILENAME'] ) {
    include "../_includes/html-head.php";
}
?>

<div class="cart-discounts">

  <!-- Slevový kupón -->
  <div class="cart-coupon toggler">
    <h2 class="sr-only">Slevový kupón</h2>
    <label class="cart-discounts-head toggler-head">
      <input type="checkbox" name="" value="">
      Uplatnit slevový kupón
    </label>
    <p class="cart-coupon-form toggler-body" id="slevovy-kupon">
      <input class="form-control" type="text" name="voucherCode" value="" id="coupon-code" placeholder="Vložte kód">
      <input class="btn btn-default" id="verifyVoucher" onclick="this.value='Ověřuji…'" type="button" value="Ověřit">
    </p>
  </div>

  <!-- ISIC karta -->
  <div class="cart-isic toggler">
    <h2 class="sr-only">Karta ISIC</h2>
    <label class="cart-discounts-head toggler-head">
      <input type="checkbox" name="" value="">
      Uplatnit ISIC slevu
    </label>
    <div class="cart-isic-form toggler-body" id="isic-karta">
      <div class="cart-isic-row">
        <label for="isicName" class="control-label">
          Jméno a příjmení
        </label>
        <input class="form-control" type="text" id="isicName">
      </div>
      <div class="cart-isic-row">
        <label for="isicNr"class="control-label">
          Číslo karty
        </label>
        <input class="form-control" type="text" id="isicNr">
      </div>
      <p class="cart-isic-submit">
        <input class="btn btn-default" onclick="this.value='Ověřuji…'" type="button" value="Ověřit">
      </p>
    </div>
  </div>

</div><!-- /.cart-discounts -->


<?php
if ( __FILE__ == $_SERVER['SCRIPT_FILENAME'] ) {
    include "../_includes/html-foot.php";
}
?>
