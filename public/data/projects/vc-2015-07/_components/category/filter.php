<?php
if ( __FILE__ == $_SERVER['SCRIPT_FILENAME'] ) {
    include "../_includes/html-head.php";
}
?>

<!--
Komponenta Filter:
Filtrovani subkategorii v kategorii a vyznaceni aktivnich filtru.

z HTML se generuje javascriptem select, ktery po kliku na polozku prejde na adresu uvedenou v puvodnim href
-->

<form class="vc-filter">

  <h2 class="vc-filter-heading">Zobrazit</h2>

  <div class="vc-filter-groups">

    <div class="vc-filter-group-long-options vc-filter-group form-group" id="kategorie-doba">
      <h3 class="sr-only">Doba nošení</h3>
      <ul>
        <li><a href="/_pages/category.php">Všechny doby nošení</a></li>
        <li><a href="/_pages/category_2nd_level.php?jednodenni" <?php if(isset($_GET['jednodenni']))  echo ' class="active"'; ?>>Jednodenní</a></li>
        <li><a href="/_pages/category_2nd_level.php?2tydenni"   <?php if(isset($_GET['2tydenni']))    echo ' class="active"'; ?>>2 týdenní</a></li>
        <li><a href="/_pages/category_2nd_level.php?mesicni"    <?php if(isset($_GET['mesicni']))     echo ' class="active"'; ?>>Měsíční</a></li>
        <li><a href="/_pages/category_2nd_level.php?ctvrtleni"  <?php if(isset($_GET['ctvrtleni']))   echo ' class="active"'; ?>>Čtvrtletní</a></li>
        <li><a href="/_pages/category_2nd_level.php?kontinualni"<?php if(isset($_GET['kontinualni'])) echo ' class="active"'; ?>>Kontinuální</a></li>
      </ul>
    </div>

    <div class="vc-filter-group form-group" id="kategorie-znacky">
      <h3 class="sr-only">Značky</h3>
      <ul>
        <li><a href="/_pages/category.php">Všechny značky</a></li>
        <li><a href="/_pages/category_2nd_level.php?acuvue"        <?php if(isset($_GET['acuvue']))     echo ' class="active"'; ?>>Acuvue</a></li>
        <li><a href="/_pages/category_2nd_level.php?air-optix"     <?php if(isset($_GET['air-optix']))  echo ' class="active"'; ?>>Air Optix</a></li>
        <li><a href="/_pages/category_2nd_level.php?bioclear"      <?php if(isset($_GET['bioclear']))   echo ' class="active"'; ?>>Bioclear</a></li>
        <li><a href="/_pages/category_2nd_level.php?biofinity"     <?php if(isset($_GET['biofinity']))  echo ' class="active"'; ?>>Biofinity</a></li>
        <li><a href="/_pages/category_2nd_level.php?clear"         <?php if(isset($_GET['clear']))      echo ' class="active"'; ?>>Clear</a></li>
        <li><a href="/_pages/category_2nd_level.php?colourvue"     <?php if(isset($_GET['colourvue']))  echo ' class="active"'; ?>>ColourVUE</a></li>
        <li><a href="/_pages/category_2nd_level.php?dailies"       <?php if(isset($_GET['dailies']))    echo ' class="active"'; ?>>Dailies</a></li>
        <li><a href="/_pages/category_2nd_level.php?focus"         <?php if(isset($_GET['focus']))      echo ' class="active"'; ?>>Focus</a></li>
        <li><a href="/_pages/category_2nd_level.php?frequency"     <?php if(isset($_GET['frequency']))  echo ' class="active"'; ?>>Frequency</a></li>
        <li><a href="/_pages/category_2nd_level.php?freshlook"     <?php if(isset($_GET['freshlook']))  echo ' class="active"'; ?>>Freshlook</a></li>
        <li><a href="/_pages/category_2nd_level.php?magic-eye"     <?php if(isset($_GET['magic-eye']))  echo ' class="active"'; ?>>Magic Eye</a></li>
        <li><a href="/_pages/category_2nd_level.php?proclear"      <?php if(isset($_GET['proclear']))   echo ' class="active"'; ?>>Proclear</a></li>
        <li><a href="/_pages/category_2nd_level.php?purevision"    <?php if(isset($_GET['purevision'])) echo ' class="active"'; ?>>PureVision</a></li>
        <li><a href="/_pages/category_2nd_level.php?soflens"       <?php if(isset($_GET['soflens']))    echo ' class="active"'; ?>>Soflens</a></li>
        <li><a href="/_pages/category_2nd_level.php?ostatni"       <?php if(isset($_GET['ostatni']))    echo ' class="active"'; ?>>Ostatní</a></li>
      </ul>
    </div>

    <div class="vc-filter-group form-group" id="kategorie-vyrobce">
      <h3 class="sr-only">Výrobce</h3>
      <ul>
        <li><a href="/_pages/category.php">Všechny výrobce</a></li>
        <li><a href="/_pages/category_2nd_level_combine.php" <?php if (strpos(basename($_SERVER['SCRIPT_FILENAME']), '2nd_level_combine')) echo ' class="active"'; ?>>Alcon</a></li>
        <li><a href="/_pages/category_2nd_level_combine.php">Johnson &amp; Johnson</a></li>
        <li><a href="/_pages/category_2nd_level_combine.php">Bausch &amp; Lomb</a></li>
        <li><a href="/_pages/category_2nd_level_combine.php">Cooper Vision</a></li>
        <li><a href="/_pages/category_2nd_level_combine.php">MaxVUE</a></li>
        <li><a href="/_pages/category_2nd_level_combine.php">Wilens</a></li>
      </ul>
    </div>

    <div class="vc-filter-group form-group" id="kategorie-typ">
      <h3 class="sr-only">Typ</h3>
      <ul>
        <li><a href="/_pages/category.php">Všechny typy</a></li>
        <li><a href="/_pages/category.php">Barevné</a></li>
        <li><a href="/_pages/category.php">Torické</a></li>
        <li><a href="/_pages/category.php">Bifokální a multifokální</a></li>
      </ul>
    </div>

  </div>
</form>

<!-- .vc-filter-groups -->


<?php
if ( __FILE__ == $_SERVER['SCRIPT_FILENAME'] ) {
    include "../_includes/html-foot.php";
}
?>
