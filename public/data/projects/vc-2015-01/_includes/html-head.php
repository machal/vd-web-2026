<!DOCTYPE html>

<!--[if lte IE 8]> <html class="no-js old-ie" lang="cs"> <![endif]-->
<!--[if gt IE 8]><!-->
<html class="no-js" lang="cs">
<!--<![endif]-->

<head>
  <meta charset="utf-8">

  <meta http-equiv="X-UA-Compatible" content="IE=edge">

  <meta name="viewport" content="width=device-width, initial-scale=1">

  <title>
    <?php echo $page_name ?>
  </title>

  <script>
  <?php
  /*
  JS
  ==

  Inlinování skriptů nezbytných pro běh stránky:
  detekce vlastností prohlížeče, picturefill, běh stránky

  */

  echo "/* Inline JS */";
  include "../dist/js/script-head.min.js";
  ?>
  </script>

<?php if ($env == 'production'): ?>
  <style>
  <?php
    /*   

    CSS
    ===

    Styly kritické pro první vykreslení vkládáme inline,
    aby nám neblokovalo vykreslování stránky.

    */

    if ( strpos( basename($_SERVER['REQUEST_URI']), 'home' ) === 0) {
      echo "/* Homepage inline CSS */";
      include "../dist/css/critical/home.min.css";
    } else if ( strpos( basename($_SERVER['REQUEST_URI']), 'category' ) === 0) {
      echo "/* Category inline CSS */";
      include "../dist/css/critical/category.min.css";
    } else if ( strpos( basename($_SERVER['REQUEST_URI']), 'detail' ) === 0){
      echo "/* Detail inline CSS */";
      include "../dist/css/critical/detail.min.css";
    } else if ( strpos( basename($_SERVER['REQUEST_URI']), 'cart' ) === 0){
      echo "/* Cart inline CSS */";
      include "../dist/css/critical/cart.min.css";
    }
  ?>
  </style>
  <script>
  loadCSS( "../dist/css/style.css?<?php echo time(); ?>" );
  </script>
  <noscript><link href="/dist/css/style.css?<?php echo time(); ?>" rel="stylesheet"></noscript>
<?php else: // Development ?>

  <link href="../dist/css/style.css?<?php echo time(); ?>" rel="stylesheet">

<?php endif; ?>


  <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
  <![endif]-->
</head>

<body>

