<!DOCTYPE html>
<html>
<head>
    <title>Form Submission Result</title>
</head>
<body>
    <h1>Form Submission Result</h1>

    <?php
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $name = $_POST["Name"];
        $email = $_POST["Email"];
        $message = $_POST["Message"];
        $gender = isset($_POST["Gender"]) ? $_POST["Gender"] : "Not specified";
        //$interests = isset($_POST["Interests"]) ? implode(", ", $_POST["Interests"]) : "None selected";

        echo "<p><strong>Name:</strong> $name</p>";
        echo "<p><strong>Email:</strong> $email</p>";
        echo "<p><strong>Message:</strong> $message</p>";
        echo "<p><strong>Gender:</strong> $gender</p>";
        //echo "<p><strong>Interests:</strong> $interests</p>";
    } else {
        echo "<p>No form data submitted.</p>";
    }
    ?>

    <p><a href="./form.html">Back to Form</a></p>
</body>
</html>
