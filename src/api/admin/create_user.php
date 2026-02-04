<?php
require '../db.php';
$nome = $_POST['nome'];
$email = $_POST['email'];
$senha = $_POST['senha'];

$stmt = $pdo->prepare("INSERT INTO usuarios (nome, email, senha_hash) VALUES (?, ?, ?)");
if ($stmt->execute([$nome, $email, $senha])) {
    echo json_encode(["sucesso" => true]);
} else {
    http_response_code(500);
}
?>