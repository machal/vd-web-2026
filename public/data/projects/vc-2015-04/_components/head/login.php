<?php
/*

Login
=====

Přihlašovací komponenta. (Facebook, Jméno, Heslo, Ztracené heslo…)
Používá se v hlavičce (klik na ikonu hlavy) nebo pak ve stránkách jako
např. vložení osobních údajů v objednávce.

*/

if ( __FILE__ == $_SERVER['SCRIPT_FILENAME'] ) {
    include "../_includes/html-head.php";
}

$login_classes = 'login form form-horizontal box box-collapse';
$include_facebook_login = true;

// Varianta pro hlavičku webu: jiné CSS třídy

if (isset($parent_file) && ($parent_file == 'head.php'))
  $login_classes ='login login-in-head form box box-collapse';


// Varianta pro vyplnění osobních údajů v objednávkovém procesu:
// nezobrazujeme FB login

if (isset($parent_file) && ($parent_file == 'order-personal-details.php'))
  $include_facebook_login = false;

?>

<form id="login" class="<?php echo $login_classes ?>">

<?php if ($include_facebook_login): ?>

  <p class="login-facebook">
    <a class="btn btn-block btn-facebook" href="#facebook">
      Přihlášení pomocí Facebooku
    </a>
  </p>

  <hr class="login-hr-after-facebook">

<?php endif; ?>

  <div class="login-name form-group">
    <label for="login-name" class="control-label">E-mail&nbsp;*</label>
    <p class="control-input">
      <input type="text" name="login-name" value="" class="form-control">
    </p>
  </div>

  <div class="login-password form-group">
    <label for="login-password"  class="control-label">Heslo nebo číslo objednávky&nbsp;*</label>
    <p class="control-input">
      <input type="password" name="login-password" value="" class="form-control">
    </p>
  </div>

  <p class="login-buttons form-group form-group-buttons">
    <a href="#" class="btn btn-link login-btn-lost-pswd">
      Neznám heslo
    </a>
    <button type="submit" class="btn btn-default login-btn-login">
      Přihlásit
    </button>
  </p>

</form>


<?php
if ( __FILE__ == $_SERVER['SCRIPT_FILENAME'] ) {
    include "../_includes/html-foot.php";
}
?>
