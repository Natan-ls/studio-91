<?php
// src/api/admin/get_albums.php
require '../db.php';

$user_id = $_GET['user_id'];
$stmt = $pdo->prepare("SELECT id, titulo, categoria, capa_url FROM albuns WHERE usuario_id = ? ORDER BY id DESC");
$stmt->execute([$user_id]);

echo json_encode($stmt->fetchAll());
?>