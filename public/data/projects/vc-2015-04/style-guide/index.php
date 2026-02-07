 <?php include_once('functions.php'); ?>
 <?php $project_name = "VašeČočky"; ?>
<!DOCTYPE html>

<head>
<meta charset="utf-8">

<title><?php echo($project_name)?> Style Guide</title>

<meta name="viewport" content="width=device-width, initial-scale=1">

<!-- Replace below stylesheet with your own stylesheet -->
<link rel="stylesheet" href="../dist/css/style.css">

<!-- Style Guide Boilerplate Styles -->
<link rel="stylesheet" href="css/styleguide.css">


</head>
<body   data-spy="scroll" data-target=".navbar-default" data-offset="60" >


<div class="sg-body sg-container container">

  <div class="row">

    <div class="content content-narrower content-centered">

      <h1 class="sg-h1">
        VašeČočky.cz Style Guide
        <select class="sg-menu">
          <?php listElementsAsOptions('docs'); ?>
          <optgroup label="Základna">
            <?php listElementsAsOptions('foundation'); ?>
          </optgroup>
          <optgroup label="Komponenty">
            <?php listMarkupAsOptions('base'); ?>
            <?php listMarkupAsOptions('patterns'); ?>
          </optgroup>
        </select>
      </h1>

      <?php showDocs(); ?>

      <h2 class="sg-h2">Základna</h2>
      <?php showFoundation(); ?>

      <h2 class="sg-h2">Komponenty</h2>
      <?php showMarkup('base'); ?>
      <?php showMarkup('patterns'); ?>

    </div>

  </div>
  <!--/.row-->

</div>
<!--/.sg-body-->
<script src="http://code.jquery.com/jquery-1.11.0.min.js"></script>
<script src="js/sg-plugins.js"></script>
<script src="js/sg-scripts.js"></script>
</body>
</html>
