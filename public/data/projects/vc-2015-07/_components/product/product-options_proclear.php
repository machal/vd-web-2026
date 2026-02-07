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

<div class="vc-product-options vc-product-options-7-items  <?php echo ($page_name == "Košík")?"vc-product-options-cart":"vc-box vc-box-bordered vc-product-options-detail" ?>">

  <h2 class="h3 vc-product-options-heading">
    Zvolte parametry
  </h2>

  <!-- První oko -->

  <div class="vc-product-options-first-eye">

    <div class="vc-product-options-items">
      <div class="vc-product-options-item vc-product-options-item-1 vc-product-options-quantity form-group">
        <label for="___" class="control-label">
          <?php getTrans("quantity");?>
        </label>
        <select class="form-control" name="___" id="___">
          <?php if ($page_name == "Košík"): ?><option value="0">0</option><?php endif; ?>
          <option value="1" selected="selected">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option>
        </select>
      </div>

      <div class="vc-product-options-item vc-product-options-item-2 vc-product-options-power form-group">
        <label for="___" class="control-label">
          <?php getTrans("power");?>
        </label>
        <select class="form-control" name="___" id="___">
          <option value="null">---</option><option value="-20">-20.00</option><option value="-19.5">-19.50</option><option value="-19">-19.00</option><option value="-18.5">-18.50</option><option value="-18">-18.00</option><option value="-17.5">-17.50</option><option value="-17">-17.00</option><option value="-16.5">-16.50</option><option value="-16">-16.00</option><option value="-15.5">-15.50</option><option value="-15">-15.00</option><option value="-14.5">-14.50</option><option value="-14">-14.00</option><option value="-13.5">-13.50</option><option value="-13">-13.00</option><option value="-12.5">-12.50</option><option value="-12">-12.00</option><option value="-11.5">-11.50</option><option value="-11">-11.00</option><option value="-10.5">-10.50</option><option value="-10">-10.00</option><option value="-9.5">-9.50</option><option value="-9">-9.00</option><option value="-8.5">-8.50</option><option value="-8">-8.00</option><option value="-7.5">-7.50</option><option value="-7">-7.00</option><option value="-6.5">-6.50</option><option value="-6.25">-6.25</option><option value="-6">-6.00</option><option value="-5.75">-5.75</option><option value="-5.5">-5.50</option><option value="-5.25">-5.25</option><option value="-5">-5.00</option><option value="-4.75">-4.75</option><option value="-4.5">-4.50</option><option value="-4.25">-4.25</option><option value="-4">-4.00</option><option value="-3.75">-3.75</option><option value="-3.5">-3.50</option><option value="-3.25">-3.25</option><option value="-3">-3.00</option><option value="-2.75">-2.75</option><option value="-2.5">-2.50</option><option value="-2.25">-2.25</option><option value="-2">-2.00</option><option value="-1.75">-1.75</option><option value="-1.5">-1.50</option><option value="-1.25">-1.25</option><option value="-1">-1.00</option><option value="-0.75">-0.75</option><option value="-0.5">-0.50</option><option value="-0.25">-0.25</option><option value="0" selected="selected">0.00</option><option value="0.25">+0.25</option><option value="0.5">+0.50</option><option value="0.75">+0.75</option><option value="1">+1.00</option><option value="1.25">+1.25</option><option value="1.5">+1.50</option><option value="1.75">+1.75</option><option value="2">+2.00</option><option value="2.25">+2.25</option><option value="2.5">+2.50</option><option value="2.75">+2.75</option><option value="3">+3.00</option><option value="3.25">+3.25</option><option value="3.5">+3.50</option><option value="3.75">+3.75</option><option value="4">+4.00</option><option value="4.25">+4.25</option><option value="4.5">+4.50</option><option value="4.75">+4.75</option><option value="5">+5.00</option><option value="5.25">+5.25</option><option value="5.5">+5.50</option><option value="5.75">+5.75</option><option value="6">+6.00</option><option value="6.25">+6.25</option><option value="6.5">+6.50</option><option value="7">+7.00</option><option value="7.5">+7.50</option><option value="8">+8.00</option><option value="8.5">+8.50</option><option value="9">+9.00</option><option value="9.5">+9.50</option><option value="10">+10.00</option><option value="10.5">+10.50</option><option value="11">+11.00</option><option value="11.5">+11.50</option><option value="12">+12.00</option><option value="12.5">+12.50</option><option value="13">+13.00</option><option value="13.5">+13.50</option><option value="14">+14.00</option><option value="14.5">+14.50</option><option value="15">+15.00</option><option value="15.5">+15.50</option><option value="16">+16.00</option><option value="16.5">+16.50</option><option value="17">+17.00</option><option value="17.5">+17.50</option><option value="18">+18.00</option><option value="18.5">+18.50</option><option value="19">+19.00</option><option value="19.5">+19.50</option><option value="20">+20.00</option>
        </select>
      </div>

      <div class="vc-product-options-item vc-product-options-item-3 vc-product-options-base-curve form-group">
        <label for="___" class="control-label">
          <?php getTrans("base-curve");?>
        </label>
        <select class="form-control" name="___" id="___">
          <option value="null">---</option><option value="8.8">8.80</option><option value="8.4">8.40</option>
        </select>
      </div>

      <div class="vc-product-options-item vc-product-options-item-4 vc-product-options-add form-group">
        <label for="___" class="control-label">
          <?php getTrans("add");?>
        </label>
        <select class="form-control" name="___" id="___">
          <option value="null">---</option><option value="D+1.00">D+1.00</option><option value="D+1.50">D+1.50</option><option value="D+2.00">D+2.00</option><option value="D+2.50">D+2.50</option><option value="D+3.00">D+3.00</option><option value="D+3.50">D+3.50</option><option value="D+4.00">D+4.00</option><option value="N+1.00">N+1.00</option><option value="N+1.50">N+1.50</option><option value="N+2.00">N+2.00</option><option value="N+2.50">N+2.50</option><option value="N+3.00">N+3.00</option><option value="N+3.50">N+3.50</option><option value="N+4.00">N+4.00</option>
        </select>
      </div>

      <div class="vc-product-options-item vc-product-options-item-5 vc-product-options-cylinder form-group">
        <label for="___" class="control-label">
          <?php getTrans("cylinder");?>
        </label>
        <select class="form-control" name="___" id="___">
          <option value="null">---</option><option value="-0.75">-0.75</option><option value="-1.25">-1.25</option><option value="-1.75">-1.75</option><option value="-2.25">-2.25</option><option value="-2.75">-2.75</option><option value="-3.25">-3.25</option><option value="-3.75">-3.75</option><option value="-4.25">-4.25</option><option value="-4.75">-4.75</option><option value="-5.25">-5.25</option><option value="-5.75">-5.75</option>
        </select>
      </div>

      <div class="vc-product-options-item vc-product-options-item-6 vc-product-options-axis form-group">
        <label for="___" class="control-label">
          <?php getTrans("axis");?>
        </label>
        <select class="form-control" name="___" id="___">
          <option value="null">---</option><option value="180">0°</option><option value="5">5°</option><option value="10">10°</option><option value="15">15°</option><option value="20">20°</option><option value="25">25°</option><option value="30">30°</option><option value="35">35°</option><option value="40">40°</option><option value="45">45°</option><option value="50">50°</option><option value="55">55°</option><option value="60">60°</option><option value="65">65°</option><option value="70">70°</option><option value="75">75°</option><option value="80">80°</option><option value="85">85°</option><option value="90">90°</option><option value="95">95°</option><option value="100">100°</option><option value="105">105°</option><option value="110">110°</option><option value="115">115°</option><option value="120">120°</option><option value="125">125°</option><option value="130">130°</option><option value="135">135°</option><option value="140">140°</option><option value="145">145°</option><option value="150">150°</option><option value="155">155°</option><option value="160">160°</option><option value="165">165°</option><option value="170">170°</option><option value="175">175°</option><option value="180">180°</option>
        </select>
      </div>

      <div class="vc-product-options-item vc-product-options-item-7 vc-product-options-diameter form-group">
        <label for="___" class="control-label">
          <?php getTrans("diameter");?>
        </label>
        <select class="form-control" name="___" id="___">
          <option value="null">---</option><option value="14">14.00</option><option value="14.4">14.40</option>
        </select>
        <!--<p class="form-control-static"> 14.40 </p>-->
      </div>

      <div class="vc-product-options-item vc-product-options- form-group vc-product-options-availability">
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
      <div class="vc-product-options-item vc-product-options-item-1 vc-product-options-quantity form-group">
        <label for="___" class="control-label">
          <?php getTrans("quantity");?>
        </label>
        <select class="form-control" name="___" id="___">
          <?php if ($page_name == "Košík"): ?><option value="0">0</option><?php endif; ?>
          <option value="1" selected="selected">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option>
        </select>
      </div>

      <div class="vc-product-options-item vc-product-options-item-2 vc-product-options-power form-group">
        <label for="___" class="control-label">
          <?php getTrans("power");?>
        </label>
        <select class="form-control" name="___" id="___">
          <option value="null">---</option><option value="-20">-20.00</option><option value="-19.5">-19.50</option><option value="-19">-19.00</option><option value="-18.5">-18.50</option><option value="-18">-18.00</option><option value="-17.5">-17.50</option><option value="-17">-17.00</option><option value="-16.5">-16.50</option><option value="-16">-16.00</option><option value="-15.5">-15.50</option><option value="-15">-15.00</option><option value="-14.5">-14.50</option><option value="-14">-14.00</option><option value="-13.5">-13.50</option><option value="-13">-13.00</option><option value="-12.5">-12.50</option><option value="-12">-12.00</option><option value="-11.5">-11.50</option><option value="-11">-11.00</option><option value="-10.5">-10.50</option><option value="-10">-10.00</option><option value="-9.5">-9.50</option><option value="-9">-9.00</option><option value="-8.5">-8.50</option><option value="-8">-8.00</option><option value="-7.5">-7.50</option><option value="-7">-7.00</option><option value="-6.5">-6.50</option><option value="-6.25">-6.25</option><option value="-6">-6.00</option><option value="-5.75">-5.75</option><option value="-5.5">-5.50</option><option value="-5.25">-5.25</option><option value="-5">-5.00</option><option value="-4.75">-4.75</option><option value="-4.5">-4.50</option><option value="-4.25">-4.25</option><option value="-4">-4.00</option><option value="-3.75">-3.75</option><option value="-3.5">-3.50</option><option value="-3.25">-3.25</option><option value="-3">-3.00</option><option value="-2.75">-2.75</option><option value="-2.5">-2.50</option><option value="-2.25">-2.25</option><option value="-2">-2.00</option><option value="-1.75">-1.75</option><option value="-1.5">-1.50</option><option value="-1.25">-1.25</option><option value="-1">-1.00</option><option value="-0.75">-0.75</option><option value="-0.5">-0.50</option><option value="-0.25">-0.25</option><option value="0" selected="selected">0.00</option><option value="0.25">+0.25</option><option value="0.5">+0.50</option><option value="0.75">+0.75</option><option value="1">+1.00</option><option value="1.25">+1.25</option><option value="1.5">+1.50</option><option value="1.75">+1.75</option><option value="2">+2.00</option><option value="2.25">+2.25</option><option value="2.5">+2.50</option><option value="2.75">+2.75</option><option value="3">+3.00</option><option value="3.25">+3.25</option><option value="3.5">+3.50</option><option value="3.75">+3.75</option><option value="4">+4.00</option><option value="4.25">+4.25</option><option value="4.5">+4.50</option><option value="4.75">+4.75</option><option value="5">+5.00</option><option value="5.25">+5.25</option><option value="5.5">+5.50</option><option value="5.75">+5.75</option><option value="6">+6.00</option><option value="6.25">+6.25</option><option value="6.5">+6.50</option><option value="7">+7.00</option><option value="7.5">+7.50</option><option value="8">+8.00</option><option value="8.5">+8.50</option><option value="9">+9.00</option><option value="9.5">+9.50</option><option value="10">+10.00</option><option value="10.5">+10.50</option><option value="11">+11.00</option><option value="11.5">+11.50</option><option value="12">+12.00</option><option value="12.5">+12.50</option><option value="13">+13.00</option><option value="13.5">+13.50</option><option value="14">+14.00</option><option value="14.5">+14.50</option><option value="15">+15.00</option><option value="15.5">+15.50</option><option value="16">+16.00</option><option value="16.5">+16.50</option><option value="17">+17.00</option><option value="17.5">+17.50</option><option value="18">+18.00</option><option value="18.5">+18.50</option><option value="19">+19.00</option><option value="19.5">+19.50</option><option value="20">+20.00</option>
        </select>
      </div>

      <div class="vc-product-options-item vc-product-options-item-3 vc-product-options-base-curve form-group">
        <label for="___" class="control-label">
          <?php getTrans("base-curve");?>
        </label>
        <select class="form-control" name="___" id="___">
          <option value="null">---</option><option value="8.8">8.80</option><option value="8.4">8.40</option>
        </select>
      </div>

      <div class="vc-product-options-item vc-product-options-item-4 vc-product-options-add form-group">
        <label for="___" class="control-label">
          <?php getTrans("add");?>
        </label>
        <select class="form-control" name="___" id="___">
          <option value="null">---</option><option value="D+1.00">D+1.00</option><option value="D+1.50">D+1.50</option><option value="D+2.00">D+2.00</option><option value="D+2.50">D+2.50</option><option value="D+3.00">D+3.00</option><option value="D+3.50">D+3.50</option><option value="D+4.00">D+4.00</option><option value="N+1.00">N+1.00</option><option value="N+1.50">N+1.50</option><option value="N+2.00">N+2.00</option><option value="N+2.50">N+2.50</option><option value="N+3.00">N+3.00</option><option value="N+3.50">N+3.50</option><option value="N+4.00">N+4.00</option>
        </select>
      </div>

      <div class="vc-product-options-item vc-product-options-item-5 vc-product-options-cylinder form-group">
        <label for="___" class="control-label">
          <?php getTrans("cylinder");?>
        </label>
        <select class="form-control" name="___" id="___">
          <option value="null">---</option><option value="-0.75">-0.75</option><option value="-1.25">-1.25</option><option value="-1.75">-1.75</option><option value="-2.25">-2.25</option><option value="-2.75">-2.75</option><option value="-3.25">-3.25</option><option value="-3.75">-3.75</option><option value="-4.25">-4.25</option><option value="-4.75">-4.75</option><option value="-5.25">-5.25</option><option value="-5.75">-5.75</option>
        </select>
      </div>

      <div class="vc-product-options-item vc-product-options-item-6 vc-product-options-axis form-group">
        <label for="___" class="control-label">
          <?php getTrans("axis");?>
        </label>
        <select class="form-control" name="___" id="___">
          <option value="null">---</option><option value="180">0°</option><option value="5">5°</option><option value="10">10°</option><option value="15">15°</option><option value="20">20°</option><option value="25">25°</option><option value="30">30°</option><option value="35">35°</option><option value="40">40°</option><option value="45">45°</option><option value="50">50°</option><option value="55">55°</option><option value="60">60°</option><option value="65">65°</option><option value="70">70°</option><option value="75">75°</option><option value="80">80°</option><option value="85">85°</option><option value="90">90°</option><option value="95">95°</option><option value="100">100°</option><option value="105">105°</option><option value="110">110°</option><option value="115">115°</option><option value="120">120°</option><option value="125">125°</option><option value="130">130°</option><option value="135">135°</option><option value="140">140°</option><option value="145">145°</option><option value="150">150°</option><option value="155">155°</option><option value="160">160°</option><option value="165">165°</option><option value="170">170°</option><option value="175">175°</option><option value="180">180°</option>
        </select>
      </div>

      <div class="vc-product-options-item vc-product-options-item-7 vc-product-options-diameter form-group">
        <label for="___" class="control-label">
          <?php getTrans("diameter");?>
        </label>
        <select class="form-control" name="___" id="___">
          <option value="null">---</option><option value="14">14.00</option><option value="14.4">14.40</option>
        </select>
        <!--<p class="form-control-static"> 14.40 </p>-->
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

  <!-- Přidání/odebrání druhého oka -->

  <p class="vc-product-options-add-eye">
    <a href="#"
      data-remove="- zrušit parametry pro druhé oko"
      data-add="+ vybrat parametry i pro druhé oko">+ vybrat parametry i pro druhé oko</a>
  </p>

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
