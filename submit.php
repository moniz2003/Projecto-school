<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "lar_nazare";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["message" => "Erro na conexão"]);
    exit;
}

$name = $_POST['name'] ?? null;
$email = $_POST['email'] ?? null;
$subject = $_POST['subject'] ?? null;
$message = $_POST['message'] ?? null;

if (!$name || !$email || !$subject || !$message) {
    http_response_code(400);
    echo json_encode(["message" => "Campos obrigatórios em falta"]);
    exit;
}

$sql = "INSERT INTO contatos (nome, email, assunto, mensagem) VALUES ('$name', '$email', '$subject', '$message')";

if ($conn->query($sql) === TRUE) {
    http_response_code(201);
    echo json_encode(["message" => "Dados inseridos com sucesso"]);
} else {
    http_response_code(500);
    echo json_encode(["message" => "Erro ao inserir: " . $conn->error]);
}

$conn->close();
?>