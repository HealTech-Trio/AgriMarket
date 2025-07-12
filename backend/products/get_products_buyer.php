<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

ini_set('display_errors', 1);
error_reporting(E_ALL);

// Get the connection object returned by database.php
$mysqli = require_once "../config/database.php";

// Query the products
$sql = "SELECT * FROM products";
$result = $mysqli->query($sql);

$products = [];

if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $products[] = $row;
    }
}

// Output the products as JSON
echo json_encode($products);

// Close connection (optional)
$mysqli->close();
