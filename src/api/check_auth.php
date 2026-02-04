<?php
// src/api/check_auth.php
require 'db.php';

// Verifica se tem sessão e se é admin
if (isset($_SESSION['user_id']) && isset($_SESSION['is_admin']) && $_SESSION['is_admin'] == true) {
    http_response_code(200); // OK
    echo json_encode(["status" => "autenticado", "user" => $_SESSION['user_name']]);
} else {
    // Se não for admin ou não estiver logado
    http_response_code(401);
    echo json_encode(["status" => "nao_autorizado"]);
}
?>