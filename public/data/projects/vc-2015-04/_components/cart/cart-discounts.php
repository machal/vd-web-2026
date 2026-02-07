<?php

// Formuláře se slevami v košíku

if ( __FILE__ == $_SERVER['SCRIPT_FILENAME'] ) {
    include "../_includes/html-head.php";
}
?>

<div class="cart-discounts list list-bordered list-complex-items">

  <!-- Pro otevírání/zavírání používáme Bootstrap Collapse http://getbootstrap.com/javascript/#collapse -->

  <!-- Slevový kupón -->
  <div class="cart-coupon list-item">
    <h2 class="sr-only">Slevový kupón</h2>
    <div class="checkbox">
      <label class="list-item-heading" data-toggle="collapse" data-target="#slevovy-kupon">
        <input type="checkbox" name="" value="">
        Uplatnit slevový kupón
      </label>
    </div>
    <p class="list-item-body list-item-body-indented collapse" id="slevovy-kupon">
      <input class="form-control" type="text" name="voucherCode" value="" id="coupon-code" placeholder="Vložte kód">
      <input class="btn btn-default" id="verifyVoucher" onclick="this.value='Ověřuji…'" type="button" value="Ověřit">
    </p>
  </div>

  <!-- ISIC karta -->
  <div class="cart-isic list-item">
    <h2 class="sr-only">Karta ISIC</h2>
    <div class="checkbox">
      <label class="list-item-heading" data-toggle="collapse" data-target="#isic-karta">
        <input type="checkbox" name="" value="">
        Uplatnit ISIC slevu
      </label>
    </div>
    <div class="list-item-body list-item-body-indented collapse form-horizontal" id="isic-karta">
      <div class="form-group">
        <label for="isicName" class="control-label">
          Jméno a příjmení
        </label>
        <p class="control-input">
          <input class="form-control" type="text" id="isicName">
        </p>
      </div>
      <div class="form-group">
        <label for="isicNr"class="control-label">
          Číslo karty
        </label>
        <p class="control-input">
          <input class="form-control form-control-l" type="text" id="isicNr">
        </p>
      </div>
      <p class="form-group-button">
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
