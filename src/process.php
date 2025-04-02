<?php
header('Content-Type: application/json');

// Get POST data
$data = json_decode(file_get_contents('php://input'), true);

// Validate input
if (!isset($data['outlook']) || !isset($data['temp']) || 
    !isset($data['humidity']) || !isset($data['windy'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing required fields']);
    exit;
}

// Prepare command to call Python script
$command = escapeshellcmd('python3 ../src/predict.py') . 
           ' ' . escapeshellarg($data['outlook']) .
           ' ' . escapeshellarg($data['temp']) .
           ' ' . escapeshellarg($data['humidity']) .
           ' ' . escapeshellarg($data['windy']);

// Execute Python script
$output = shell_exec($command);
$result = json_decode($output, true);

if (!$result) {
    http_response_code(500);
    echo json_encode(['error' => 'Prediction failed']);
    exit;
}

echo json_encode($result);
?>