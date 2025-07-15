<?php
    header("Content-Type: application/json");
    $mysqli = require_once "../config/database.php";

    $uploadDir = __DIR__ . "/../../uploads/farm-ids/";    
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }

    // Sanitize POST fields
    $name         = trim($_POST["full_name"] ?? '');
    $email        = strtolower(trim($_POST["email"] ?? ''));
    $phone        = trim($_POST["phone"] ?? '');
    $province     = $_POST["province"] ?? '';
    $farm_name    = $_POST["farm_name"] ?? '';
    $farm_location = $_POST["farm_location"] ?? '';
    $id_number    = $_POST["id_number"] ?? '';
    $farm_type    = $_POST["farm_type"] ?? '';
    $years        = intval($_POST["years_in_operation"] ?? 0);
    $password     = $_POST["password"] ?? '';
    $confirm      = $_POST["confirm_password"] ?? '';

    // Basic checks
    if (!$name || !$email || !$phone || !$province || !$password || !$confirm) {
        echo json_encode(["success" => false, "message" => "Missing required fields."]);
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(["success" => false, "message" => "Invalid email format."]);
        exit;
    }

    if ($password !== $confirm) {
        echo json_encode(["success" => false, "message" => "Passwords do not match."]);
        exit;
    }

    // Check if email already exists
    $checkStmt = $mysqli->prepare("SELECT user_id FROM credentials WHERE email = ?");
    $checkStmt->bind_param("s", $email);
    $checkStmt->execute();
    $checkStmt->store_result();

    if ($checkStmt->num_rows > 0) {
        echo json_encode(["success" => false, "message" => "Email already in use."]);
        exit;
    }
    $checkStmt->close();

    // Upload file (ID Document)
    if (isset($_FILES["id_document"]) && $_FILES["id_document"]["error"] === 0) {
        $allowedTypes = ['pdf', 'jpg', 'jpeg', 'png'];
        $fileName = basename($_FILES["id_document"]["name"]);
        $fileTmp = $_FILES["id_document"]["tmp_name"];
        $ext = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));

        if (!in_array($ext, $allowedTypes)) {
            echo json_encode(["success" => false, "message" => "Invalid file type."]);
            exit;
        }

        $uniqueName = uniqid("id_") . "." . $ext;
        $targetPath = $uploadDir . $uniqueName;

        if (!move_uploaded_file($fileTmp, $targetPath)) {
            echo json_encode(["success" => false, "message" => "Failed to upload ID document."]);
            exit;
        }
    } else {
        echo json_encode(["success" => false, "message" => "ID document is required."]);
        exit;
    }

    // Insert into credentials
    $hash = password_hash($password, PASSWORD_DEFAULT);
    $insertUser = $mysqli->prepare("INSERT INTO credentials (email, password_hash, user_type, date_joined) VALUES (?, ?, 'farmer', NOW())");
    $insertUser->bind_param("ss", $email, $hash);
    if (!$insertUser->execute()) {
        echo json_encode(["success" => false, "message" => "Failed to create account."]);
        exit;
    }
    $user_id = $insertUser->insert_id;
    $insertUser->close();

    // Insert into farmers
    $insertFarmer = $mysqli->prepare("INSERT INTO farmers 
    (farmer_id, full_name, phone_number, province, farm_name, farm_location, id_number, id_document_path, farm_type, years_in_operation)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");

    $insertFarmer->bind_param("issssssssi", $user_id, $name, $phone, $province, $farm_name, $farm_location, $id_number, $uniqueName, $farm_type, $years);

    if ($insertFarmer->execute()) {
        echo json_encode(["success" => true, "message" => "Farmer registration complete."]);
    } else {
        echo json_encode(["success" => false, "message" => "Failed to store farmer profile."]);
    }

    $insertFarmer->close();
    $mysqli->close();
