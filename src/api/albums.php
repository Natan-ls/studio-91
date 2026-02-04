<?php
// src/api/albums.php
require 'db.php';

if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(["erro" => "Usuário não autenticado"]);
    exit;
}

$user_id = $_SESSION['user_id'];
$user_name = $_SESSION['user_name'];

$stmt = $pdo->prepare("SELECT id, titulo, to_char(data_evento, 'DD/MM/YYYY') as data, capa_url FROM albuns WHERE usuario_id = ?");
$stmt->execute([$user_id]);
$albuns = $stmt->fetchAll();

echo json_encode([
    "user_name" => $user_name,
    "albuns" => $albuns
]);
?>