<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">

<html>
<head>
	<title>OLP GROUP logotypy</title>
	<meta http-equiv="imagetoolbar" content="no">
	<style type="text/css">
	  body {
	  text-align: center;	
	  }

	  body * {
	  margin: auto;	
	  }
	</style>
</head>

<body>



<?php 

//$pic = 10;
//phpinfo();

if ($pic=="") { ($pic=1); }
else if ($pic>=9) { ($pic=1); }

 ?>

<a href="index.php?pic=<?php echo ($pic+1); ?>"><img src="show0<?php echo $pic ?>.gif" border="0"></a>

</body>
</html>
