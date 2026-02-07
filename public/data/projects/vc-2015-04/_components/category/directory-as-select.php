<?php
if ( __FILE__ == $_SERVER['SCRIPT_FILENAME'] ) {
    include "../_includes/html-head.php";
}
?>

<!--
Prototyp directory
TODO
-->


<div class="directory-as-select">

  <h2 class="sr-only">
    Výběr kategoriií
  </h2>

  <div class="directory-as-select-groups">

    <div class="directory-as-select-group" id="kategorie-doba">
      <h3 class="sr-only">
        Čočky podle doby nošení
      </h3>
      <select class="form-control">
        <option>Všechny doby nošení</option>
        <option value="jednodenní">Jednodenní</option>
        <option value="2týdenní">2 týdenní</option>
        <option value="měsíční">Měsíční</option>
        <option value="Čtvrtletní">Čtvrtletní</option>
        <option value="kontinuální">Kontinuální</option>
      </select>
    </div>

    <div class="directory-as-select-group" id="kategorie-znacky">
      <h3 class="sr-only">
        Čočky podle značek
      </h3>
      <select class="form-control">
        <option>Všechny značky</option>
        <option value="acuvue">Acuvue</option>
        <option value="airoptix">Air Optix</option>
        <option value="bioclear">Bioclear</option>
        <option value="biofinity">Biofinity</option>
        <option value="clear">Clear</option>
        <option value="colourvue">ColourVUE</option>
        <option value="dailies">Dailies</option>
        <option value="focus">Focus</option>
        <option value="frequency">Frequency</option>
        <option value="freshlook">Freshlook</option>
        <option value="magiceye">Magic Eye</option>
        <option value="proclear">Proclear</option>
        <option value="purevision">PureVision</option>
        <option value="soflens">Soflens</option>
        <option value="ostatní">Ostatní</option>
      </select>
    </div>

    <div class="directory-as-select-group" id="kategorie-vyrobce">
      <h3 class="sr-only">
        Čočky podle výrobce
      </h3>
      <select class="form-control">
        <option>Všichni výrobci</option>
        <option value="alcon">Alcon</option>
        <option value="johnson&amp;johnson">Johnson &amp; Johnson</option>
        <option value="bausch&amp;lomb">Bausch &amp; Lomb</option>
        <option value="coopervision">Cooper Vision</option>
        <option value="maxvue">MaxVUE</option>
        <option value="wilens">Wilens</option>
      </select>
    </div>

    <div class="directory-as-select-group" id="kategorie-typ">
      <h3 class="sr-only">
        Čočky podle typu
      </h3>
      <select class="form-control">
        <option>Všechny typy</option>
        <option>Barevné</option>
        <option>Torické</option>
        <option>Bifokální a multifokální</option>
      </select>
    </div>

  </div>
  <!-- .directory-as-select-groups -->

</div><!-- /.directory -->

<?php
if ( __FILE__ == $_SERVER['SCRIPT_FILENAME'] ) {
    include "../_includes/html-foot.php";
}
?>
