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

  <script async>
      // document.no-js -> document.js
      document.documentElement.className =
         document.documentElement.className.replace("no-js","js");

      // document.no-svg pro prohlizece bez SVG
      if (!document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1"))
        document.documentElement.className += ' no-svg';

      // Picture element HTML5 shiv
      document.createElement( "picture" );
  </script>

  <?php if (strpos($_SERVER['SERVER_NAME'], '.cz')): ?>
  <script async src="../dist/js/script-head-production.js"></script>
  <?php else: ?>
  <script async src="../dist/js/script-head.js"></script>
  <?php endif; ?>

  <?php if (strpos($_SERVER['SERVER_NAME'], '.cz')): ?>
  <link href="../dist/css/style-production.css?2" rel="stylesheet">
  <?php else: ?>
  <link href="../dist/css/style.css" rel="stylesheet">
  <?php endif; ?>

  <!-- TODO stahovat od nas -->
  <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
  <![endif]-->
</head>

<body>

  <div class="container-fluid">
