<?php

// pro ukazovani ruznych variant je cyklovani jistejsi
// proto vygenerujeme na zaklade session
// $_SESSION['cycle'][0][1] az $_SESSION['cycle'][$max_from][$max_to]
// [0][2] cykluje 0 a 1 a 2
// [1][2] cykluje 1 a 2 atd.

$max_from = 5; // maximalni od
$max_to = 9; // maximalni do

session_start();

for ($from = 0; $from <= $max_from; $from++) {
  for ($to = 1; $to <= $max_to; $to++) {
    if ($to >= $from){
      if (!isset($_SESSION['cycle'][$from][$to])) {
        $_SESSION['cycle'][$from][$to] = $from;
      } elseif ($_SESSION['cycle'][$from][$to] == $to) {
        $_SESSION['cycle'][$from][$to] = $from;
      } else {
        $_SESSION['cycle'][$from][$to]++;
      }
    }
  }
}

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

// jazyk tam kde se to pouzije
$lang = "dk";
$lang = "it";
$lang = "longest";
$lang = "en";
$lang = "de";
$lang = "cs";

?>
