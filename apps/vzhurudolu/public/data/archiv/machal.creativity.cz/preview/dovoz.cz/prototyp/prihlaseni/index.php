<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

<html>
<head>
	<title>Dovoz.cz : Pøihlášení</title>
<?php
  if (!defined('_PREF')) define('_PREF', '../');
  require_once (_PREF.'inc/header.inc.php');
?>
</head>

<body>
<?php
  require_once (_PREF.'inc/header-menu.inc.php');
?>

<div id="bodyContainer"><div id="bodyContainerInside">


<div id="contentContainer"><div class="containerInside">
  <h1>Pøihlášení</h1>
  
  <table class="form">

  <tr>
    <th><label for="username">Uživatelské jméno<span class="formRequired">*</span>:</label></th>
    <td><input type="text" class="l" name="username" value=""></td>
  </tr>  

  <tr>
    <th><label for="password">Heslo<span class="formRequired">*</span>:</label></th>
    <td><input type="password" class="l" name="password" value=""></td>
  </tr> 
    
</table>

<p class="alignCenter">
  <input type="submit" value="Pøihlásit" />
</p>

<p>
  <a href="<?php echo _PREF ?>">Zapomìl jsem heslo.</a> <br />
  Chci se <a href="<?php echo _PREF ?>">zaregistrovat.</a>
</p>

  </form>
  

   




</div></div>


<div id="sideOneContainer"><div class="containerInside">


</div></div>

<div id="sideTwoContainer"><div class="containerInside">

  
</div></div>


</div></div><!-- bodyContainer -->


<?php
  require_once (_PREF.'inc/footer-info.inc.php');
  require_once (_PREF.'inc/footer.inc.php');  
?>


</body>

</html>
