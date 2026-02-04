<?php
require '../db.php';

$id = $_POST['id'];

$stmt = $pdo->prepare("SELECT url_imagem FROM fotos WHERE id = ?");
$stmt->execute([$id]);
$foto = $stmt->fetch();

if ($foto) {
    $caminho_fisico = '../' . $foto['url_imagem'];
    if (file_exists($caminho_fisico)) {
        unlink($caminho_fisico);
    }

    $del = $pdo->prepare("DELETE FROM fotos WHERE id = ?");
    $del->execute([$id]);
    
    echo json_encode(["sucesso" => true]);
} else {
    http_response_code(404);
    echo json_encode(["erro" => "Foto não encontrada"]);
}
?>