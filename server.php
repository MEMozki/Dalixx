<?php
header('Content-Type: application/json');

$filename = 'messages.json';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_GET['like'])) {
        $index = intval($_GET['like']);
        $messages = json_decode(file_get_contents($filename), true);
        if (isset($messages[$index])) {
            $messages[$index]['likes']++;
            file_put_contents($filename, json_encode($messages));
        }
        echo json_encode($messages);
    } else {
        $input = json_decode(file_get_contents('php://input'), true);
        if ($input && isset($input['content'])) {
            $messages = json_decode(file_get_contents($filename), true);
            $input['likes'] = 0;
            $messages[] = $input;
            file_put_contents($filename, json_encode($messages));
            echo json_encode($messages);
        } else {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid input']);
        }
    }
} else {
    if (file_exists($filename)) {
        echo file_get_contents($filename);
    } else {
        echo json_encode([]);
    }
}
?>
