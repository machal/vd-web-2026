<?php
if ( __FILE__ == $_SERVER['SCRIPT_FILENAME'] ) {
    include "../_includes/html-head.php";
}
?>

<!--
Order GoTo: Tlačítka pro pokračování v nákupu nebo návrat do obchodu
-->

<div class="vc-order-goto">
  <p class="vc-order-goto-next">
    <button type="submit" class="vc-btn vc-btn-outlined vc-btn-lg vc-order-goto-vc-btn">
      Pokračovat
      <span class="vc-hide-320-down">v objednávce</span>
    </button>
  </p>
  <p class="vc-order-goto-back">
    <?php
      // Podle typu stránky zde zobrazujeme návratovou adresu a text
    ?>
    <?php if (strpos( basename($_SERVER['REQUEST_URI']), 'cart' ) === 0): ?>
    <a href="category.php" class="vc-btn vc-order-goto-vc-btn">
      Zpět do obchodu
    </a>
    <?php else: ?>
    <a href="cart.php" class="vc-btn vc-order-goto-vc-btn">
      Zpět do košíku
    </a>
    <?php endif; ?>
  </p>
</div>

<?php
if ( __FILE__ == $_SERVER['SCRIPT_FILENAME'] ) {
    include "../_includes/html-foot.php";
}
?>
