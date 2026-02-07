<?php
if ( __FILE__ == $_SERVER['SCRIPT_FILENAME'] ) {
  include "../_includes/html-head.php";
}
?>

<!--

Product Options: zobrazujeme v detailu i v košíku
=================================================

- v košíku třída .vc-product-options-cart, v detailu vc-product-options-detail, vc-box a vc-box-bordered
- v košíku se editovatelné <select> zobrazují jen pokud zmáčknu "Upravit"
- přidáváme třídu .vc-product-options-4-items podle počtu parametrů (počítáme s 1, 4, 5, 6, 7 variantami)

Varianta .vc-product-options-1-item, která slouží pro roztoky atd., nemá žádné
parametry a proto v košíku není potřeba tlačítko "Upravit".

-->

<div class="vc-product-options vc-product-options-1-item <?php echo ($page_name == "Košík")?"vc-product-options-cart":"vc-box vc-box-bordered vc-product-options-detail" ?>">

  <h2 class="h3 vc-product-options-heading">
    Zvolte parametry
  </h2>

  <div class="vc-product-options-first-eye">

    <div class="vc-product-options-items">

      <div class="vc-product-options-item vc-product-options-quantity form-group">
        <label for="___" class="control-label">
          <?php getTrans("quantity");?>
        </label>
        <select class="form-control" name="___" id="___">
          <?php if ($page_name == "Košík"): ?><option value="0">0</option><?php endif; ?>
          <option value="1" selected="selected">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option>
        </select>
      </div>

      <div class="vc-product-options-item vc-product-options-availability form-group">
        <label for="___" class="control-label">
          <?php getTrans("availability");?>
        </label>
        <p class="form-control-static">
          <?php echo getRandomAvailability(); ?>
        </p>
      </div>

    </div><!-- .vc-product-options-items -->


  </div><!-- .vc-product-options-first-eye -->

  <?php if ($page_name != "Košík"): ?>

    <div class="vc-detail-add-to-cart">
      <button type="submit" class="vc-btn vc-btn-outlined vc-btn-lg">Přidat do košíku</button>

      <a href="#" class="vc-detail-transport">
        <ul>
          <li><b>Doprava zdarma nad 1600&nbsp;Kč</b></li>
          <li>Pod 1600&nbsp;Kč – Výdejní místa 24&nbsp;Kč</li>
          <li>Platba předem 69&nbsp;Kč, dobírka 99&nbsp;Kč</li>
        </ul>
      </a>
    </div>

  <?php endif; ?>

</div>

<?php
if ( __FILE__ == $_SERVER['SCRIPT_FILENAME'] ) {
  include "../_includes/html-foot.php";
}
?>
