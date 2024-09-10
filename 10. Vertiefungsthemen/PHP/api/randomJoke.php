<?php

require_once "./databaseConfig.php";
require_once "./loggingMiddleware.php";

$sql = "SELECT * FROM jokes ORDER BY id ASC";
$result = mysqli_query($link, $sql);
$rows = array();
while($r = mysqli_fetch_assoc($result)) {
    $rows[] = $r;
}
http_response_code(200);
echo json_encode($rows);

?>



