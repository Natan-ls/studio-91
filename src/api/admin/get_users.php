<?php
require '../db.php';
$stmt = $pdo->query("SELECT id, nome, email FROM usuarios ORDER BY nome ASC");
echo json_encode($stmt->fetchAll());
?>