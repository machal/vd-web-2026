<?php
if ( __FILE__ == $_SERVER['SCRIPT_FILENAME'] ) {
    include "../_includes/html-head.php";
}
?>


<div id="login" class="login">

  <form class="form">

    <h2 class="sr-only">Přihlášení</h2>

    <p class="login-facebook">
      <a class="btn btn-default" href="#facebook">Přihlášení pomocí Facebooku</a>
    </p>

    <hr class="login-hr-after-facebook">

    <p class="login-name form-group">
      <label for="login-name" class="control-label">E-mail:</label>
      <input type="text" name="login-name" value="" class="form-control">
    </p>

    <p class="login-password form-group">
      <label for="login-password"  class="control-label">Heslo nebo číslo objednávky:</label>
      <input type="password" name="login-password" value="" class="form-control">
    </p>

    <p class="login-buttons form-group">
      <a href="#" class="btn btn-link login-btn-lost-pswd">
        Neznám heslo
      </a>
      <button type="submit" class="btn btn-default login-btn-login">
        Přihlásit
      </button>
    </p>

  </form>

</div>

<?php
if ( __FILE__ == $_SERVER['SCRIPT_FILENAME'] ) {
    include "../_includes/html-foot.php";
}
?>
