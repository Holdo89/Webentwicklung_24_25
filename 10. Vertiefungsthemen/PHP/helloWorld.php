<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
<h1>Begrüßung an Codersbay Teilnehmer</h1>
<?php

$myText = "Hallo";
$myNumber = 0;
$myArray = ["Marwa", "Mario", "Wolfgang", "Matthias"];

foreach ($myArray as $element) {
    echo "<div>
            $myText $element 
          </div>";
    $myNumber++;
}

?>
</body>
</html>








