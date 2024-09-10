<?php
function insertActivity($link, $activity, $username){
    $activitysql="INSERT INTO activities SET Activity = '$activity', Username = '$username'";
    mysqli_query($link, $activitysql);
}
?>



