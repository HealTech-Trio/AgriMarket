<?php
header('Content-Type: application/json');
error_reporting(E_ALL);
ini_set('display_errors', 1);

$conn = require_once "../config/database.php";
if ($conn->connect_error) {
    echo json_encode(["success" => false, "error" => "Database connection failed."]);
    exit;
}

// Handle image uploads
$uploadedImages = [];
if (isset($_FILES['images'])) {
    $uploadDir = "../../uploads/";
    foreach ($_FILES['images']['tmp_name'] as $key => $tmp_name) {
        $fileName = basename($_FILES['images']['name'][$key]);
        $targetPath = $uploadDir . $fileName;
        if (move_uploaded_file($tmp_name, $targetPath)) {
            $uploadedImages[] = $fileName;
        }
    }
}

// Get images (fill with nulls if less than 4)
for ($i = 0; $i < 4; $i++) {
    $images[$i] = $uploadedImages[$i] ?? null;
}

// Collect POST data
$product_name       = $_POST['productName'] ?? null;
$category           = $_POST['category'] ?? null;
$quantity           = $_POST['quantity'] ?? 0;
$quantity_unit      = $_POST['quantityUnit'] ?? null;
$price              = $_POST['price'] ?? 0;
$price_unit         = $_POST['priceUnit'] ?? null;
$description        = $_POST['description'] ?? null;
$availability       = $_POST['availability'] ?? 0;
$availability_start = $_POST['availabilityStart'] ?? null;
$farmer_id          = $_POST['farmer_id'] ?? 0;

$promotion_enabled  = $_POST['promotionEnabled'] ?? 0;
$promotion_name     = $_POST['promotionName'] ?? null;
$promotion_code     = $_POST['promotionCode'] ?? null;
$promotion_type     = $_POST['promotionType'] ?? null;
$promotion_value    = $_POST['promotionValue'] ?? 0;
$promotion_start    = $_POST['promotionStart'] ?? null;
$promotion_end      = $_POST['promotionEnd'] ?? null;

// SQL with 21 fields
$sql = "INSERT INTO products (
    product_name, category, quantity, quantity_unit, price, price_unit,
    description, availability, availability_start, farmer_id,
    promotion_enabled, promotion_name, promotion_code, promotion_type,
    promotion_value, promotion_start, promotion_end,
    image1, image2, image3, image4
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);
if (!$stmt) {
    echo json_encode(["success" => false, "error" => "Prepare failed: " . $conn->error]);
    exit;
}

// 21 types: s = string, i = int, d = double
$stmt->bind_param(
    "ssisdssiiisssdsdsssss",
    $product_name,
    $category,
    $quantity,
    $quantity_unit,
    $price,
    $price_unit,
    $description,
    $availability,
    $availability_start,
    $farmer_id,
    $promotion_enabled,
    $promotion_name,
    $promotion_code,
    $promotion_type,
    $promotion_value,
    $promotion_start,
    $promotion_end,
    $images[0],
    $images[1],
    $images[2],
    $images[3]
);

if ($stmt->execute()) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "error" => $stmt->error]);
}

$stmt->close();
$conn->close();
