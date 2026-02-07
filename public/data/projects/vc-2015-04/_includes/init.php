<?php

// Vypisujeme vsechny chybove hlasky
error_reporting(E_ALL);
ini_set('display_errors', '1');

// Nastaveni prostredi production/development
// TODO hack kvuli vd.cz/data/projects/
// $env = 'production';
// if (strpos($_SERVER['HTTP_HOST'], 'localhost') !== false) {
//   $env = 'development';
// }
$env = 'development';


// Pomocne funkce
require_once('helpers.php');


?>
