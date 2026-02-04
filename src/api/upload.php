<?php
// src/api/upload.php
require 'db.php'; 

ini_set('display_errors', 1);
error_reporting(E_ALL);

if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(["erro" => "Usuário não autenticado"]);
    exit;
}

$is_admin = isset($_SESSION['is_admin']) && ($_SESSION['is_admin'] === true || $_SESSION['is_admin'] === 't' || $_SESSION['is_admin'] == 1);

if (!$is_admin) {
    http_response_code(403);
    echo json_encode(["erro" => "Acesso negado. Apenas administradores podem fazer upload."]);
    exit;
}

if (!isset($_FILES['foto']) || !isset($_POST['album_id'])) {
    http_response_code(400);
    echo json_encode(["erro" => "Dados incompletos"]);
    exit;
}

$album_id = (int)$_POST['album_id'];
$arquivo = $_FILES['foto'];

$stmt = $pdo->prepare("SELECT id FROM albuns WHERE id = ?");
$stmt->execute([$album_id]);

if (!$stmt->fetch()) {
    http_response_code(404);
    echo json_encode(["erro" => "Álbum não encontrado."]);
    exit;
}

$extensoes = ['jpg', 'jpeg', 'png', 'webp'];
$extensao = strtolower(pathinfo($arquivo['name'], PATHINFO_EXTENSION));

if (!in_array($extensao, $extensoes)) {
    http_response_code(400);
    echo json_encode(["erro" => "Formato inválido. Use JPG, PNG ou WEBP."]);
    exit;
}

$pasta_uploads = '../uploads/';
$pasta_album = $pasta_uploads . $album_id . '/';

if (!is_dir($pasta_album)) {
    if (!mkdir($pasta_album, 0777, true)) {
        http_response_code(500);
        echo json_encode(["erro" => "Erro de permissão ao criar pasta."]);
        exit;
    }
}

$novo_nome = uniqid() . '.' . $extensao;
$caminho_fisico = $pasta_album . $novo_nome;
$url_banco = 'uploads/' . $album_id . '/' . $novo_nome;

if (move_uploaded_file($arquivo['tmp_name'], $caminho_fisico)) {
    try {
        $stmt = $pdo->prepare("INSERT INTO fotos (album_id, url_imagem, descricao) VALUES (?, ?, ?)");
        $stmt->execute([$album_id, $url_banco, "Upload do Estúdio"]);

        echo json_encode(["sucesso" => true, "url" => $url_banco]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["erro" => "Erro no banco: " . $e->getMessage()]);
    }
} else {
    http_response_code(500);
    echo json_encode(["erro" => "Falha ao mover arquivo."]);
}
?>