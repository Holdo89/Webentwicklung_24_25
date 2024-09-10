<?php

require_once "./databaseConfig.php";
require_once "./loggingMiddleware.php";

insertActivity($link, "gets Todos", DB_USERNAME);

$sql = "SELECT * FROM todos ORDER BY ID ASC";
$result = mysqli_query($link, $sql);
$rows = array();
while($r = mysqli_fetch_assoc($result)) {
    $rows[] = $r;
}
http_response_code(200);
echo json_encode($rows);

?>



