<!DOCTYPE html>

<!--[if lte IE 8]> <html class="no-js vc-old-ie" lang="cs"> <![endif]-->
<!--[if gt IE 8]><!-->
<html class="no-js" lang="cs">
<!--<![endif]-->

<head>

  <!--<link href='//fonts.googleapis.com/css?family=Roboto:300,300italic,400,500&amp;subset=latin,latin-ext' rel='stylesheet' type='text/css'>-->

  <meta charset="utf-8">

  <meta http-equiv="X-UA-Compatible" content="IE=edge">

  <meta name="viewport" content="width=device-width, initial-scale=1">

  <title>
    <?php echo $page_name ?>
  </title>

<?php if
  (
  ($env == 'production')
  and (
     (strpos( basename($_SERVER['REQUEST_URI']), 'home' ) === 0)
     or (strpos( basename($_SERVER['REQUEST_URI']), 'category' ) === 0)
     or (strpos( basename($_SERVER['REQUEST_URI']), 'detail' ) === 0)
     or (strpos( basename($_SERVER['REQUEST_URI']), 'cart' ) === 0)
    )
  ):
?>
  <style id="criticalcss">
  <?php
    /*   

    Inline CSS
    ==========

    Styly kritické pro první vykreslení podstatných stránek vkládáme inline,
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
  <noscript><link href="../dist/css/style.css?<?php echo time(); ?>" rel="stylesheet"></noscript>
<?php else: // Development ?>

  <link href="../dist/css/style.css?<?php echo time(); ?>" rel="stylesheet">

<?php endif; ?>

  <?php /* webfont loader */ ?>
  <script src="https://ajax.googleapis.com/ajax/libs/webfont/1.5.18/webfont.js"></script>

  <script>
  <?php
  /*
  Inline JS
  =========

  Inlinování skriptů nezbytných pro běh stránky:
  detekce vlastností prohlížeče, picturefill, běh stránky

  */

  echo "/* Inline JS */";
  if ($env == 'production'):
    include "../dist/js/script-head.min.js";
  else:
    include "../dist/js/script-head.js";
  endif;
  ?>
  </script>




  <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
  <![endif]-->
</head>

<body>

