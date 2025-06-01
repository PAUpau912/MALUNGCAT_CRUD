<?php
require 'database.php';

// Set CORS headers
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Get the ID of the row to delete from the request parameters
$id = isset($_GET['id']) ? (int)$_GET['id'] : false;

if (!$id || $id <= 0) {
    http_response_code(400);
    echo json_encode(["message" => "Invalid ID"]);
    exit();
}

// Prepare the DELETE statement
$stmt = $db->prepare("DELETE FROM products WHERE id = ?");
$stmt->bind_param("i", $id);

// Execute the statement
if ($stmt->execute()) {
    // Reset the auto-increment counter
    $db->query("ALTER TABLE products AUTO_INCREMENT = 1");
    http_response_code(204); // No Content
} else {
    http_response_code(422); // Unprocessable Entity
    echo json_encode(["message" => "Failed to delete product"]);
}

// Close the statement
$stmt->close();
?>
