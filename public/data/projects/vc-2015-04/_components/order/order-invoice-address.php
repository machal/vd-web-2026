<?php

/*

Formulář pro zadání fakturační adresy
-------------------------------------

Využíváme v objednávkovém procesu.

*/

if ( __FILE__ == $_SERVER['SCRIPT_FILENAME'] ) {
    include "../_includes/html-head.php";
}
?>

<div class="box box-collapse collapse" id="personals-invoice-address">

  <p>
    <small class="help-block">
      Údaje označené * jsou povinné.
    </small>
  </p>

  <div class="form-group">
    <label for="name" class="control-label">
      Jméno a příjmení
      <span class="form-mandatory">*</span>
    </label>
    <p class="control-input">
      <input class="form-control" type="text" id="name">
    </p>
  </div>

  <div class="form-group">
    <label for="company" class="control-label">
      Firma
    </label>
    <p class="control-input">
      <input class="form-control" type="text" id="company">
    </p>
  </div>

  <div class="form-group">
    <label for="street" class="control-label">
      Ulice  a číslo
      <span class="form-mandatory">*</span>
    </label>
    <p class="control-input">
      <input class="form-control" type="text" id="street">
    </p>
  </div>

  <div class="form-group">
    <label for="city" class="control-label">
      Město
      <span class="form-mandatory">*</span>
    </label>
    <p class="control-input">
      <input class="form-control form-control-m" type="text" id="city">
    </p>
  </div>

  <!-- Ukázka úspěšně validovaného řádku formuláře  -->

  <div class="form-group has-feedback has-success">
    <label for="psc" class="control-label">
      PSČ
      <span class="form-mandatory">*</span>
    </label>
    <p class="control-input">
      <input class="form-control form-control-s" type="text" id="psc">
      <span class="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span>
      <span class="sr-only">(v pořádku)</span>
    </p>
  </div>

  <!-- Ukázka formátování řádku formuláře s průchozí chybou  -->

  <div class="form-group has-feedback has-warning">
    <label for="id" class="control-label">
      IČ
    </label>
    <p class="control-input">
      <input class="form-control form-control-m" type="text" id="id">
      <span class="glyphicon glyphicon-warning-sign form-control-feedback" aria-hidden="true"></span>
      <span class="sr-only">(varování)</span>
    </p>
  </div>

  <!-- Ukázka formátování řádku formuláře s neprůchozí chybou  -->

  <div class="form-group has-feedback has-error">
    <label for="vat" class="control-label">
      DIČ
    </label>
    <p class="control-input">
      <input class="form-control form-control-m" type="text" id="vat">
      <span class="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true"></span>
      <span class="sr-only">(chyba)</span>
      <small class="help-block">
        Vyplňte prosím DIČ ve správném&nbsp;formátu.
      </small>
    </p>
  </div>

</div><!-- .box -->
