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

-->

<div class="vc-product-options vc-product-options-6-items <?php echo ($page_name == "Košík")?"vc-product-options-cart":"vc-box vc-box-bordered vc-product-options-detail" ?>">

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

      <div class="vc-product-options-item vc-product-options-power form-group">
        <label for="___" class="control-label">
          <?php getTrans("power");?>

        </label>
        <?php if ($page_name == "Košík"): ?>
          <p class="form-control-static">
            -7.50
          </p>
        <?php else: ?>
          <select class="form-control" name="__" id="__">
            <option value="-8">-8.00</option><option value="-7.75">-7.75</option><option value="-7.5">-7.50</option><option value="-7.25">-7.25</option><option value="-7">-7.00</option><option value="-6.75">-6.75</option><option value="-6.5">-6.50</option><option value="-6.25">-6.25</option><option value="-6">-6.00</option><option value="-5.75">-5.75</option><option value="-5.5">-5.50</option><option value="-5.25">-5.25</option><option value="-5">-5.00</option><option value="-4.75">-4.75</option><option value="-4.5">-4.50</option><option value="-4.25">-4.25</option><option value="-4">-4.00</option><option value="-3.75">-3.75</option><option value="-3.5">-3.50</option><option value="-3.25">-3.25</option><option value="-3">-3.00</option><option value="-2.75">-2.75</option><option value="-2.5">-2.50</option><option value="-2.25">-2.25</option><option value="-2">-2.00</option><option value="-1.75">-1.75</option><option value="-1.5">-1.50</option><option value="-1.25">-1.25</option><option value="-1">-1.00</option><option value="-0.75">-0.75</option><option value="-0.5">-0.50</option><option value="-0.25">-0.25</option><option value="0" selected="selected">0.00</option><option value="0.25">+0.25</option><option value="0.5">+0.50</option><option value="0.75">+0.75</option><option value="1">+1.00</option><option value="1.25">+1.25</option><option value="1.5">+1.50</option><option value="1.75">+1.75</option><option value="2">+2.00</option><option value="2.25">+2.25</option><option value="2.5">+2.50</option><option value="2.75">+2.75</option><option value="3">+3.00</option><option value="3.25">+3.25</option><option value="3.5">+3.50</option><option value="3.75">+3.75</option><option value="4">+4.00</option><option value="4.25">+4.25</option><option value="4.5">+4.50</option><option value="4.75">+4.75</option><option value="5">+5.00</option><option value="5.25">+5.25</option><option value="5.5">+5.50</option><option value="5.75">+5.75</option><option value="6">+6.00</option>
          </select>
        <?php endif; ?>
      </div>

      <div class="vc-product-options-item vc-product-options-base-curve form-group">
        <label for="___" class="control-label">
          <?php getTrans("base-curve");?>
        </label>
        <p class="form-control-static">
          8.70
        </p>
      </div>

      <div class="vc-product-options-item vc-product-options-cylinder form-group">
        <label for="___" class="control-label">
          <?php getTrans("cylinder");?>
        </label>
        <?php if ($page_name == "Košík"): ?>
          <p class="form-control-static">
            -1.75
          </p>
        <?php else: ?>
          <select class="form-control" name="productParam-right-2113-4" id="productParam-right-2113-4">
            <option value="null">---</option><option value="-0.75">-0.75</option><option value="-1.25">-1.25</option><option value="-1.75">-1.75</option><option value="-2.25">-2.25</option>
          </select>
        <?php endif; ?>
      </div>

      <div class="vc-product-options-item vc-product-options-axis form-group">
        <label for="___" class="control-label">
          <?php getTrans("axis");?>
        </label>
        <?php if ($page_name == "Košík"): ?>
          <p class="form-control-static">
            100°
          </p>
        <?php else: ?>
          <select class="form-control" name="productParam-right-2113-5" id="productParam-right-2113-5">
            <option value="null">---</option><option value="180">0°</option><option value="10">10°</option><option value="20">20°</option><option value="30">30°</option><option value="40">40°</option><option value="50">50°</option><option value="60">60°</option><option value="70">70°</option><option value="80">80°</option><option value="90">90°</option><option value="100">100°</option><option value="110">110°</option><option value="120">120°</option><option value="130">130°</option><option value="140">140°</option><option value="150">150°</option><option value="160">160°</option><option value="170">170°</option><option value="180">180°</option>
          </select>
        <?php endif; ?>
      </div>

      <div class="vc-product-options-item vc-product-options-diameter form-group">
        <label for="___" class="control-label">
          <?php getTrans("diameter");?>
        </label>
        <p class="form-control-static">
          14.40
        </p>
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

  <!-- Druhé oko -->

  <div class="vc-product-options-second-eye">

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

      <div class="vc-product-options-item vc-product-options-power form-group">
        <label for="___" class="control-label">
          <?php getTrans("power");?>

        </label>
        <?php if ($page_name == "Košík"): ?>
          <p class="form-control-static">
            -7.50
          </p>
        <?php else: ?>
          <select class="form-control" name="__" id="__">
            <option value="-8">-8.00</option><option value="-7.75">-7.75</option><option value="-7.5">-7.50</option><option value="-7.25">-7.25</option><option value="-7">-7.00</option><option value="-6.75">-6.75</option><option value="-6.5">-6.50</option><option value="-6.25">-6.25</option><option value="-6">-6.00</option><option value="-5.75">-5.75</option><option value="-5.5">-5.50</option><option value="-5.25">-5.25</option><option value="-5">-5.00</option><option value="-4.75">-4.75</option><option value="-4.5">-4.50</option><option value="-4.25">-4.25</option><option value="-4">-4.00</option><option value="-3.75">-3.75</option><option value="-3.5">-3.50</option><option value="-3.25">-3.25</option><option value="-3">-3.00</option><option value="-2.75">-2.75</option><option value="-2.5">-2.50</option><option value="-2.25">-2.25</option><option value="-2">-2.00</option><option value="-1.75">-1.75</option><option value="-1.5">-1.50</option><option value="-1.25">-1.25</option><option value="-1">-1.00</option><option value="-0.75">-0.75</option><option value="-0.5">-0.50</option><option value="-0.25">-0.25</option><option value="0" selected="selected">0.00</option><option value="0.25">+0.25</option><option value="0.5">+0.50</option><option value="0.75">+0.75</option><option value="1">+1.00</option><option value="1.25">+1.25</option><option value="1.5">+1.50</option><option value="1.75">+1.75</option><option value="2">+2.00</option><option value="2.25">+2.25</option><option value="2.5">+2.50</option><option value="2.75">+2.75</option><option value="3">+3.00</option><option value="3.25">+3.25</option><option value="3.5">+3.50</option><option value="3.75">+3.75</option><option value="4">+4.00</option><option value="4.25">+4.25</option><option value="4.5">+4.50</option><option value="4.75">+4.75</option><option value="5">+5.00</option><option value="5.25">+5.25</option><option value="5.5">+5.50</option><option value="5.75">+5.75</option><option value="6">+6.00</option>
          </select>
        <?php endif; ?>
      </div>

      <div class="vc-product-options-item vc-product-options-base-curve form-group">
        <label for="___" class="control-label">
          <?php getTrans("base-curve");?>
        </label>
        <p class="form-control-static">
          8.70
        </p>
      </div>

      <div class="vc-product-options-item vc-product-options-cylinder form-group">
        <label for="___" class="control-label">
          <?php getTrans("cylinder");?>
        </label>
        <?php if ($page_name == "Košík"): ?>
          <p class="form-control-static">
            -1.75
          </p>
        <?php else: ?>
          <select class="form-control" name="productParam-right-2113-4" id="productParam-right-2113-4">
            <option value="null">---</option><option value="-0.75">-0.75</option><option value="-1.25">-1.25</option><option value="-1.75">-1.75</option><option value="-2.25">-2.25</option>
          </select>
        <?php endif; ?>
      </div>

      <div class="vc-product-options-item vc-product-options-axis form-group">
        <label for="___" class="control-label">
          <?php getTrans("axis");?>
        </label>
        <?php if ($page_name == "Košík"): ?>
          <p class="form-control-static">
            100°
          </p>
        <?php else: ?>
          <select class="form-control" name="productParam-right-2113-5" id="productParam-right-2113-5">
            <option value="null">---</option><option value="180">0°</option><option value="10">10°</option><option value="20">20°</option><option value="30">30°</option><option value="40">40°</option><option value="50">50°</option><option value="60">60°</option><option value="70">70°</option><option value="80">80°</option><option value="90">90°</option><option value="100">100°</option><option value="110">110°</option><option value="120">120°</option><option value="130">130°</option><option value="140">140°</option><option value="150">150°</option><option value="160">160°</option><option value="170">170°</option><option value="180">180°</option>
          </select>
        <?php endif; ?>
      </div>

      <div class="vc-product-options-item vc-product-options-diameter form-group">
        <label for="___" class="control-label">
          <?php getTrans("diameter");?>
        </label>
        <p class="form-control-static">
          14.40
        </p>
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

  </div><!-- .vc-product-options-second-eye -->

  <?php if ($page_name != "Košík"): ?>

    <!-- Přidání/odebrání druhého oka jen mimo košík -->

    <p class="vc-product-options-add-eye">
      <a href="#"
        data-remove="- zrušit parametry pro druhé oko"
        data-add="+ vybrat parametry i pro druhé oko">+ vybrat parametry i pro druhé oko</a>
    </p>

  <?php endif; ?>

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

</div><!-- .vc-product-options -->


<?php
if ( __FILE__ == $_SERVER['SCRIPT_FILENAME'] ) {
  include "../_includes/html-foot.php";
}
?>
