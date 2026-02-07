<?php

// Varianta kde nepotrebujeme schovavat vyhledavaci policko, takze zde neni .nav-panel-search

if ( __FILE__ == $_SERVER['SCRIPT_FILENAME'] ) {
    include "../_includes/html-head.php";
}
?>


<div class="nav-panel" role="navigation">
  <h2 class="sr-only">Navigační panel</h2>
  <ul>
    <li class="nav-panel-item nav-panel-nav">
      <a href="#nav" class="btn btn-default">
        <i class="glyphicon glyphicon-align-justify"></i>
      </a>
    </li>
    <?php
    /*
    <li class="nav-panel-item nav-panel-search">
      <a href="#search" class="btn btn-default">
        <i class="glyphicon glyphicon-search"></i>
      </a>
    </li>
    */
    ?>
    <li class="nav-panel-item nav-panel-login">
      <a href="#login" class="btn btn-default">
        <i class="glyphicon glyphicon-user"></i>
      </a>
    </li>
    <li class="nav-panel-item nav-panel-cart">
      <a href="cart.php" class="btn btn-default">
        <i class="glyphicon glyphicon-shopping-cart"></i>
        <span class="badge">2</span>
      </a>
    </li>
  </ul>
</div>

<?php
if ( __FILE__ == $_SERVER['SCRIPT_FILENAME'] ) {
    include "../_includes/html-foot.php";
}
?>
