<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">

<html>
<head>
	<title>Pro»ek Team logotypy</title>
</head>

<body>



<?php 

//$pic = 10;
//phpinfo();

if ($pic=="") { ($pic=1); }
else if ($pic>=5) { ($pic=1); }

 ?>

<a href="index.php?pic=<?php echo ($pic+1); ?>"><img src="show0<?php echo $pic ?>.gif" border="0"></a>

</body>
</html>
