<?php
    header("Content-Type: application/json");

    $mysqli = require_once "../config/database.php";

    // Collect POST data
    $data = json_decode(file_get_contents("php://input"), true);

    // Validate required fields
    $required = ['name', 'email', 'phone', 'province', 'category', 'password'];
    foreach ($required as $field) {
        if (empty($data[$field])) {
            echo json_encode(["success" => false, "message" => "Missing field: $field"]);
            exit;
        }
    }

    $email = strtolower(trim($data['email']));
    $password = $data['password'];
    $name = $data['name'];
    $phone = $data['phone'];
    $province = $data['province'];
    $category = $data['category'];

    // Check if email already exists
    $sql_check = "SELECT user_id FROM credentials WHERE email = ?";
    $stmt = $mysqli->prepare($sql_check);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        echo json_encode(["success" => false, "message" => "Email already registered."]);
        exit;
    }
    $stmt->close();

    // Hash password
    $password_hash = password_hash($password, PASSWORD_DEFAULT);

    // Insert into credentials table
    $sql_credentials = "INSERT INTO credentials (email, password_hash, user_type, date_joined) VALUES (?, ?, 'buyer', NOW())";
    $stmt = $mysqli->prepare($sql_credentials);
    $stmt->bind_param("ss", $email, $password_hash);
    if (!$stmt->execute()) {
        echo json_encode(["success" => false, "message" => "Error creating account."]);
        exit;
    }
    $user_id = $stmt->insert_id;
    $stmt->close();

    // Insert into buyers table
    $sql_buyer = "INSERT INTO buyers (buyer_id, full_name, phone_number, buyer_category, province) VALUES (?, ?, ?, ?, ?)";
    $stmt = $mysqli->prepare($sql_buyer);
    $stmt->bind_param("issss", $user_id, $name, $phone, $category, $province);
    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Registration successful."]);
    } else {
        echo json_encode(["success" => false, "message" => "Failed to complete buyer profile."]);
    }
    $stmt->close();
    $mysqli->close();
