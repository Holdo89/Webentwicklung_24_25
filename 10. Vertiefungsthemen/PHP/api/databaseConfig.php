<?php
//Diese Files müssen unter htdocs gespeichert werden damit sie vom apache webserver ausgelesen werden können 
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

define('DB_HOST', 'localhost');
define('DB_USERNAME', 'root');
define('DB_PASSWORD', '');
define('DB_NAME', 'myjokes');

$link = mysqli_connect(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);
mysqli_set_charset($link, "utf8");

if($link === false) {
    die("ERROR: Could not connect. " . mysqli_connect_error());
    header("location: databaseNotFound.php");
    exit;
}
?>




