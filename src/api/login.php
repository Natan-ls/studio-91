<?php
// src/api/login.php
require 'db.php';

// Recebe o JSON do frontend
$data = json_decode(file_get_contents("php://input"), true);
$email = $data['email'] ?? '';
$senha = $data['password'] ?? '';

if (!$email || !$senha) {
    http_response_code(400);
    echo json_encode(["erro" => "Preencha email e senha"]);
    exit;
}

$stmt = $pdo->prepare("SELECT id, nome, senha_hash, is_admin FROM usuarios WHERE email = ?");
$stmt->execute([$email]);
$user = $stmt->fetch();

if ($user && $user['senha_hash'] === $senha) {
    
    $is_admin_bool = ($user['is_admin'] === true || $user['is_admin'] === 't' || $user['is_admin'] == 1);

    $_SESSION['user_id'] = $user['id'];
    $_SESSION['user_name'] = $user['nome'];
    $_SESSION['is_admin'] = $is_admin_bool;

    $redirect = $is_admin_bool ? 'admin.html' : 'area-cliente.html';
    
    echo json_encode([
        "sucesso" => true, 
        "redirect" => $redirect,
        "is_admin" => $is_admin_bool
    ]);

} else {
    http_response_code(401); 
    echo json_encode(["erro" => "Email ou senha incorretos"]);
}
?>