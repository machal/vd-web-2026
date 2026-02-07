<?php
if ( __FILE__ == $_SERVER['SCRIPT_FILENAME'] ) {
  include "../_includes/html-head.php";
}
?>

<!--

Product Options: zobrazujeme v detailu i v košíku
=================================================

- v košíku navíc tlačítko "Upravit" a třída .product-options-cart
- v košíku se editovatelné <select> zobrazují jen pokud zmáčknu "Upravit"
- přidáváme třídu .product-options-4-items podle počtu parametrů (počítáme s 1, 4, 5, 6, 7 variantami)

-->

<div class="product-options product-options-4-items <?php echo ($page_name == "Košík")?"product-options-cart":"" ?>">

  <h2 class="h3 product-options-heading">
    Zvolte parametry
  </h2>

  <!-- První oko -->

  <div class="product-options-first-eye">

    <div class="product-options-items">

    <div class="product-options-item product-options-count form-group">
      <label for="___">
        Počet&nbsp;balení
      </label>
      <select class="form-control" name="___" id="___">
        <option value="0">0</option><option value="1" selected="selected">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option>
      </select>
    </div>

    <div class="product-options-item form-group">
      <label for="___">
        Dioptrie
      </label>
      <select class="form-control" name="___" id="___">
        <option value="null">---</option><option value="-12">-12.00</option><option value="-11.5">-11.50</option><option value="-11">-11.00</option><option value="-10.5">-10.50</option><option value="-10">-10.00</option><option value="-9.5">-9.50</option><option value="-9">-9.00</option><option value="-8.5">-8.50</option><option value="-8">-8.00</option><option value="-7.5">-7.50</option><option value="-7">-7.00</option><option value="-6.5">-6.50</option><option value="-6">-6.00</option><option value="-5.75">-5.75</option><option value="-5.5">-5.50</option><option value="-5.25">-5.25</option><option value="-5">-5.00</option><option value="-4.75">-4.75</option><option value="-4.5">-4.50</option><option value="-4.25">-4.25</option><option value="-4">-4.00</option><option value="-3.75">-3.75</option><option value="-3.5">-3.50</option><option value="-3.25">-3.25</option><option value="-3">-3.00</option><option value="-2.75">-2.75</option><option value="-2.5">-2.50</option><option value="-2.25">-2.25</option><option value="-2">-2.00</option><option value="-1.75">-1.75</option><option value="-1.5">-1.50</option><option value="-1.25">-1.25</option><option value="-1">-1.00</option><option value="-0.75">-0.75</option><option value="-0.5">-0.50</option><option value="-0.25">-0.25</option><option value="0.25">+0.25</option><option value="0.5">+0.50</option><option value="0.75">+0.75</option><option value="1">+1.00</option><option value="1.25">+1.25</option><option value="1.5">+1.50</option><option value="1.75">+1.75</option><option value="2">+2.00</option><option value="2.25">+2.25</option><option value="2.5">+2.50</option><option value="2.75">+2.75</option><option value="3">+3.00</option><option value="3.25">+3.25</option><option value="3.5">+3.50</option><option value="3.75">+3.75</option><option value="4">+4.00</option><option value="4.25">+4.25</option><option value="4.5">+4.50</option><option value="4.75">+4.75</option><option value="5">+5.00</option><option value="5.25">+5.25</option><option value="5.5">+5.50</option><option value="5.75">+5.75</option><option value="6">+6.00</option><option value="6.5">+6.50</option><option value="7">+7.00</option><option value="7.5">+7.50</option><option value="8">+8.00</option>
      </select>
    </div>

    <div class="product-options-item form-group">
      <label for="___">
        Zakřivení
      </label>
      <p class="form-control-static">
        8.60
      </p>
    </div>

    <div class="product-options-item form-group">
      <label for="___">
        Průměr
      </label>
      <p class="form-control-static">
        14.00
      </p>
    </div>

    <div class="product-options-item form-group product-options-availability">
      <label for="___">
        Dostupnost
      </label>
      <p class="form-control-static">
        <span class="in">
          <?php echo getRandomAvailability(); ?>
        </span>
      </p>
    </div>

    <?php if ($page_name == "Košík"): ?>
      <!--
        Po  zmáčknutí "Upravit" se v košíku přidají <select> a
        tlačítko "Upravit" zmizí. Všechny změny jsou pak přepočítávány v reálném čase.
      -->
    <?php endif; ?>

  </div><!-- .product-options-items -->

  </div><!-- .product-options-first-eye -->


  <!-- Druhé oko -->

  <div class="product-options-second-eye">

    <div class="product-options-items">

    <div class="product-options-item product-options-count form-group">
      <label for="___">
        Počet&nbsp;balení
      </label>
      <select class="form-control" name="___" id="___">
        <option value="0">0</option><option value="1" selected="selected">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option>
      </select>
    </div>

    <div class="product-options-item form-group">
      <label for="___">
        Dioptrie
      </label>
      <select class="form-control" name="___" id="___">
        <option value="null">---</option><option value="-12">-12.00</option><option value="-11.5">-11.50</option><option value="-11">-11.00</option><option value="-10.5">-10.50</option><option value="-10">-10.00</option><option value="-9.5">-9.50</option><option value="-9">-9.00</option><option value="-8.5">-8.50</option><option value="-8">-8.00</option><option value="-7.5">-7.50</option><option value="-7">-7.00</option><option value="-6.5">-6.50</option><option value="-6">-6.00</option><option value="-5.75">-5.75</option><option value="-5.5">-5.50</option><option value="-5.25">-5.25</option><option value="-5">-5.00</option><option value="-4.75">-4.75</option><option value="-4.5">-4.50</option><option value="-4.25">-4.25</option><option value="-4">-4.00</option><option value="-3.75">-3.75</option><option value="-3.5">-3.50</option><option value="-3.25">-3.25</option><option value="-3">-3.00</option><option value="-2.75">-2.75</option><option value="-2.5">-2.50</option><option value="-2.25">-2.25</option><option value="-2">-2.00</option><option value="-1.75">-1.75</option><option value="-1.5">-1.50</option><option value="-1.25">-1.25</option><option value="-1">-1.00</option><option value="-0.75">-0.75</option><option value="-0.5">-0.50</option><option value="-0.25">-0.25</option><option value="0.25">+0.25</option><option value="0.5">+0.50</option><option value="0.75">+0.75</option><option value="1">+1.00</option><option value="1.25">+1.25</option><option value="1.5">+1.50</option><option value="1.75">+1.75</option><option value="2">+2.00</option><option value="2.25">+2.25</option><option value="2.5">+2.50</option><option value="2.75">+2.75</option><option value="3">+3.00</option><option value="3.25">+3.25</option><option value="3.5">+3.50</option><option value="3.75">+3.75</option><option value="4">+4.00</option><option value="4.25">+4.25</option><option value="4.5">+4.50</option><option value="4.75">+4.75</option><option value="5">+5.00</option><option value="5.25">+5.25</option><option value="5.5">+5.50</option><option value="5.75">+5.75</option><option value="6">+6.00</option><option value="6.5">+6.50</option><option value="7">+7.00</option><option value="7.5">+7.50</option><option value="8">+8.00</option>
      </select>
    </div>

    <div class="product-options-item form-group">
      <label for="___">
        Zakřivení
      </label>
      <p class="form-control-static">
        8.60
      </p>
    </div>

    <div class="product-options-item form-group">
      <label for="___">
        Průměr
      </label>
      <p class="form-control-static">
        14.00
      </p>
    </div>

    <div class="product-options-item form-group product-options-availability">
      <label for="___">
        Dostupnost
      </label>
      <p class="form-control-static">
        <span class="in">
          <?php echo getRandomAvailability(); ?>
        </span>
      </p>
    </div>

    <?php if ($page_name == "Košík"): ?>
      <!--
        Po  zmáčknutí "Upravit" se v košíku přidají <select> a
        tlačítko "Upravit" zmizí. Všechny změny jsou pak přepočítávány v reálném čase.
      -->
    <?php endif; ?>

  </div><!-- .product-options-items -->

  </div><!-- .product-options-second-eye -->

  <!-- Přidání/odebrání druhého oka -->

  <p class="product-options-add-eye">
    <a href="#"
      data-remove="- zrušit parametry pro druhé oko"
      data-add="+ vybrat parametry i pro druhé oko">+ vybrat parametry i pro druhé oko</a>
  </p>


</div><!-- .product-options -->

<?php
if ( __FILE__ == $_SERVER['SCRIPT_FILENAME'] ) {
  include "../_includes/html-foot.php";
}
?>
