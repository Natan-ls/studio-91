<?php
// src/api/photos.php
require 'db.php';

if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    exit;
}

$album_id = $_GET['album_id'] ?? 0;

$stmt = $pdo->prepare("
    SELECT f.url_imagem, f.descricao 
    FROM fotos f
    JOIN albuns a ON f.album_id = a.id
    WHERE f.album_id = ? AND a.usuario_id = ?
");
$stmt->execute([$album_id, $_SESSION['user_id']]);
$fotos = $stmt->fetchAll();

echo json_encode($fotos);
?>