<?php
$servername = "localhost";
$username = "your_db_username";
$password = "your_db_password";
$dbname = "your_database";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$email = $_POST['email'];

$sql = "SELECT payment_status FROM enrollments WHERE email='$email'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    if ($row['payment_status'] == 'Paid') {
        echo '<a href="YOUR_WHATSAPP_GROUP_LINK" target="_blank"><button class="btn-success">📱 Join WhatsApp Group</button></a>';
    } else {
        echo '<p style="color:red;">❌ Payment not verified. Please complete your payment.</p>';
    }
} else {
    echo '<p style="color:red;">❌ No record found. Please ensure you used the correct email.</p>';
}

$conn->close();
?>
