<?php
/*

Login
=====

Přihlašovací komponenta. (Facebook, Jméno, Heslo, Ztracené heslo…)
Používá se v hlavičce (klik na ikonu hlavy) nebo pak ve stránkách jako
např. vložení osobních údajů v objednávce.

V objednávkovém procesu by v hlavičce nemělo být její html vůbec.

*/

if ( __FILE__ == $_SERVER['SCRIPT_FILENAME'] ) {
    include "../_includes/html-head.php";
}

$login_classes = 'vc-login form form-horizontal vc-box vc-box-collapse';
$include_facebook_login = true;

// Varianta pro hlavičku webu: jiné CSS třídy

if (isset($parent_file) && ($parent_file == 'head.php'))
  $login_classes ='vc-dropdown-container vc-login vc-dropdown-container form vc-box vc-box-collapse';


// Varianta pro vyplnění osobních údajů v objednávkovém procesu:
// nezobrazujeme FB login

if (isset($parent_file) && ($parent_file == 'order-personal-details.php'))
  $include_facebook_login = false;


?>

<?php if ($include_facebook_login): ?>
<form class="<?php echo $login_classes ?> <?php /* je chyba? pak načti menu rozbalené */ if ($_SESSION['cycle'][0][3] > 1): ?>active<?php endif; ?>">
<?php endif; ?>

  <?php if ($include_facebook_login): ?>

    <p class="vc-login-facebook">
      <a class="vc-btn vc-btn-block vc-btn-facebook" href="#facebook">
        Přihlášení pomocí Facebooku
      </a>
    </p>

    <hr class="vc-login-hr-after-facebook">
  <?php endif; ?>


  <div class="vc-login-name form-group">
    <label for="login-name" class="control-label">E-mail</label>
    <p class="control-input">
      <input type="text" name="login-name" value="<?php if ($_SESSION['cycle'][0][3] == 3): ?>mail@example.com<?php endif; ?>" class="form-control">
    </p>
  </div>


  <div class="vc-login-password form-group">
    <label for="login-password"  class="control-label">Heslo nebo číslo objednávky</label>
    <p class="control-input">
      <input type="password" name="login-password" value="" class="form-control">
    </p>
  </div>


  <?php if ($_SESSION['cycle'][0][3] != 0): ?>

    <?php /* Varianta s chybou 1: */ if ($_SESSION['cycle'][0][3] == 2): ?>
      <div class="alert alert-warning" role="alert">
        <b>Prosím zadejte e-mail a heslo.</b>
      </div>
    <?php endif; ?>

    <?php /* Varianta s chybou 2: */ if ($_SESSION['cycle'][0][3] == 3): ?>
      <div class="alert alert-warning" role="alert">
        <b>Neexistující e-mail, špatné heslo nebo číslo objednávky.</b>
        <br> Zkuste to znovu prosím.
      </div>
    <?php endif; ?>

  <?php endif; ?>

  <p class="vc-dropdown-container-buttons form-group form-group-buttons">
    <a href="#" class="vc-btn vc-btn-link">
      Neznám heslo
    </a>
    <button type="submit" class="vc-btn vc-btn-primary">
      Přihlásit
    </button>
  </p>

<?php if ($include_facebook_login): ?>
</form>
<?php endif; ?>



<?php
if ( __FILE__ == $_SERVER['SCRIPT_FILENAME'] ) {
    include "../_includes/html-foot.php";
}
?>
