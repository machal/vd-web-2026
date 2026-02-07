<?php
if ( __FILE__ == $_SERVER['SCRIPT_FILENAME'] ) {
    include "../_includes/html-head.php";
}
?>

<!--
Order GoTo: Tlačítka pro pokračování v nákupu nebo návrat do obchodu
-->

<div class="order-goto">
  <p class="order-goto-next">
    <button type="submit" class="btn btn-primary btn-lg order-goto-btn">
      Pokračovat
      <span class="hide-320-down">v objednávce</span>
    </button>
  </p>
  <p class="order-goto-back">
    <?php
      // Podle typu stránky zde zobrazujeme návratovou adresu a text
    ?>
    <?php if (strpos( basename($_SERVER['REQUEST_URI']), 'cart' ) === 0): ?>
    <a href="category.php" class="btn order-goto-btn">
      Zpět do obchodu
    </a>
    <?php else: ?>
    <a href="cart.php" class="btn order-goto-btn">
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
