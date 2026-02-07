<?php

// Panel s ikonkami v hlavičce webu
// ================================

if ( __FILE__ == $_SERVER['SCRIPT_FILENAME'] ) {
    include "../_includes/html-head.php";
}
?>


<div class="nav-panel" role="navigation">
  <h2 class="sr-only">Navigační panel</h2>
  <ul>

    <?php // Ikona navigace: v objednávkovém procesu nezobrazujeme
    if ($page_type != "order"): ?>
    <li class="nav-panel-item nav-panel-nav">
      <a href="#nav" class="btn btn-default">
        <i class="glyphicon glyphicon-align-justify"></i>
      </a>
    </li>
    <?php endif; ?>
    <li class="nav-panel-item nav-panel-login">
      <a href="#login" class="btn btn-default">
        <i class="glyphicon glyphicon-user"></i>
      </a>
    </li>
    <?php  // Ikona košíku: v objednávkovém procesu nezobrazujeme
    if ($page_type != "order"): ?>
    <li class="nav-panel-item nav-panel-cart">
      <a href="cart.php" class="btn btn-default">
        <i class="glyphicon glyphicon-shopping-cart"></i>
        <span class="badge">2</span>
      </a>
    </li>
    <?php endif; ?>
  </ul>
</div>

<?php
if ( __FILE__ == $_SERVER['SCRIPT_FILENAME'] ) {
    include "../_includes/html-foot.php";
}
?>
