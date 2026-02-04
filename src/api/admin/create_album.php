<?php
require '../db.php';
$uid = $_POST['usuario_id'];
$titulo = $_POST['titulo'];
$data = $_POST['data_evento'];
$cat = $_POST['categoria'];
// Foto de capa temporária padrão
$capa = 'https://via.placeholder.com/800x600.png?text=Capa+do+Album';

$stmt = $pdo->prepare("INSERT INTO albuns (usuario_id, titulo, data_evento, categoria, capa_url) VALUES (?, ?, ?, ?, ?)");
if ($stmt->execute([$uid, $titulo, $data, $cat, $capa])) {
    echo json_encode(["sucesso" => true]);
} else {
    http_response_code(500);
    echo json_encode(["erro" => "Erro ao criar álbum"]);
}
?>