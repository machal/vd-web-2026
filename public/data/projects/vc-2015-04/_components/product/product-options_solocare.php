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


Varianta .product-options-1-item, která slouží pro roztoky atd., nemá žádné
parametry a proto v košíku není potřeba tlačítko "Upravit".

-->

<div class="product-options product-options-1-item <?php echo ($page_name == "Košík")?"product-options-cart":"" ?>">

  <h2 class="h3 product-options-heading">
    Zvolte parametry
  </h2>

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


    </div><!-- .product-options-items -->


  </div><!-- .product-options-first-eye -->

</div>

<?php
if ( __FILE__ == $_SERVER['SCRIPT_FILENAME'] ) {
  include "../_includes/html-foot.php";
}
?>
