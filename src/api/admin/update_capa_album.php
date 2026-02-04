<?php
require '../db.php';

$album_id = $_POST['album_id'];
$capa_url = $_POST['capa_url'];

$stmt = $pdo->prepare("UPDATE albuns SET capa_url = ? WHERE id = ?");

if ($stmt->execute([$capa_url, $album_id])) {
    echo json_encode(["sucesso" => true]);
} else {
    http_response_code(500);
    echo json_encode(["erro" => "Erro ao atualizar capa"]);
}
?>