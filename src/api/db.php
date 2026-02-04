<?php
// src/api/db.php

$host = getenv('DB_HOST');
$db   = getenv('DB_NAME');
$user = getenv('DB_USER');
$pass = getenv('DB_PASS');
$dsn  = "pgsql:host=$host;port=5432;dbname=$db;";

try {
    // Cria a conexão PDO
    $pdo = new PDO($dsn, $user, $pass, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);
    
    // Teste simples: Se chegou aqui, conectou!
    echo json_encode([
        "status" => "sucesso", 
        "mensagem" => "Conexão com PostgreSQL realizada via Docker!"
    ]);

} catch (PDOException $e) {
    // Se der erro, mostra qual foi
    http_response_code(500);
    echo json_encode([
        "status" => "erro", 
        "mensagem" => "Falha na conexão: " . $e->getMessage()
    ]);
}
?>