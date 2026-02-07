<?php
if ( __FILE__ == $_SERVER['SCRIPT_FILENAME'] ) {
    include "../_includes/html-head.php";
}
?>

<p class="logo">
  <a href="home.php">
    <picture>
      <source
        srcset="../dist/img/logos/vasecocky-logo-de_simple.svg"
        media="(max-width: 410px)"
        type="image/svg+xml">
      <source
        srcset="../dist/img/logos/vasecocky-logo-de.svg"
        media="(min-width: 411px)"
        type="image/svg+xml">
      <img
        srcset="../dist/img/logos/vasecocky-logo-de.png"
        width="178" height="60"
          alt="321 Linsen">
    </picture>
  </a>
</p>

<?php
if ( __FILE__ == $_SERVER['SCRIPT_FILENAME'] ) {
    include "../_includes/html-foot.php";
}
?>
