<?php
require '../db.php';
$album_id = $_GET['album_id'];

$stmt = $pdo->prepare("SELECT id, url_imagem FROM fotos WHERE album_id = ? ORDER BY id DESC");
$stmt->execute([$album_id]);
echo json_encode($stmt->fetchAll());
?>