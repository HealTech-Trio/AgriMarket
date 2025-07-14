<?php
    session_start();
    header("Content-Type: application/json");

    $mysqli = require_once "../config/database.php";

    // Get form data
    $email = strtolower(trim($_POST["email"] ?? ""));
    $password = $_POST["password"] ?? "";

    // Validate inputs
    if (!$email || !$password) {
        echo json_encode(["success" => false, "message" => "Email and password are required."]);
        exit;
    }

    // Fetch user by email
    $stmt = $mysqli->prepare("SELECT user_id, email, password_hash, user_type FROM credentials WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 0) {
        echo json_encode(["success" => false, "message" => "Account not found."]);
        exit;
    }

    $user = $result->fetch_assoc();
    $stmt->close();

    // Verify password
    if (!password_verify($password, $user["password_hash"])) {
        echo json_encode(["success" => false, "message" => "Incorrect password."]);
        exit;
    }

    // Create session
    $_SESSION["user_id"] = $user["user_id"];
    $_SESSION["email"] = $user["email"];
    $_SESSION["user_type"] = $user["user_type"];

    // Redirect URL based on type
    $redirectURL = "";
    switch ($user["user_type"]) {
        case "buyer":
            $redirectURL = "http://localhost/AgriMarket/frontend/templates/dashboard/buyer.php";
            break;
        case "farmer":
            $redirectURL = "http://localhost/AgriMarket/frontend/templates/dashboard/farmer.php";
            break;
        case "admin":
            $redirectURL = "http://localhost/AgriMarket/frontend/templates/dashboard/admin.php";
            break;
        default:
            echo json_encode(["success" => false, "message" => "Unknown user type."]);
            exit;
    }

    echo json_encode([
        "success" => true,
        "message" => "Login successful.",
        "redirect" => $redirectURL
    ]);
