<?php
if ( __FILE__ == $_SERVER['SCRIPT_FILENAME'] ) {
    include "../_includes/html-head.php";
}
?>

<!--
Produkt v košíku:
-->

  <div class="cart-item">

    <div class="cart-item-text">
      <h2 class="cart-item-name">
        <a href="detail_biofinity.php">1 Day Acuvue Moist (30 čoček)</a>
      </h2>
      <div class="cart-item-params">
        <p>
          Dioptrie: -7.50,
          zakřivení: 8.50,
          průměr: 14.20.
        </p>
      </div>
      <p class="cart-item-availability">
        <strong>V pondělí 19.1.</strong> u vás.
      </p>
    </div><!-- /.cart-item-text -->

    <p class="cart-item-image">
      <a href="detail_biofinity.php">
        <img src="../dist/img/product_1981-1-330.jpg" alt="1 Day Acuvue Moist (30 čoček)">
      </a>
    </p>

    <div class="cart-item-edit-remove">
      <p class="cart-item-edit">
        <a href="detail_biofinity.php">Upravit</a>
      </p>
      <p class="cart-item-remove">
        <a href="#" title="Odstranit">
          <button type="button" class="close">
            <span aria-hidden="true">&times;</span>
            <span class="sr-only">Close</span>
          </button>
        </a>
      </p>
    </div>

    <div class="cart-item-count-price">
      <p class="cart-item-count">
        <label>
          <select class="form-control">
            <option value="0" label="0">0</option>
            <option value="1" label="1" selected="selected">1</option>
            <option value="2" label="2">2</option>
            <option value="3" label="3">3</option>
            <option value="4" label="4">4</option>
            <option value="5" label="5">5</option>
            <option value="6" label="6">6</option>
            <option value="7" label="7">7</option>
            <option value="8" label="8">8</option>
            <option value="9" label="9">9</option>
            <option value="10" label="10">10</option>
          </select>
          ks
        </label>
      </p>
      <h3 class="cart-item-price">
        469 Kč
      </h3>
    </div>

  </div><!-- .cart-item -->

<?php
if ( __FILE__ == $_SERVER['SCRIPT_FILENAME'] ) {
    include "../_includes/html-foot.php";
}
?>
