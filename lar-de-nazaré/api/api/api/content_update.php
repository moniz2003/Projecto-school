<?php
// Configuração do cabeçalho
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Tratar pré-voo OPTIONS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["message" => "Método não permitido."]);
    exit();
}

// 1. Receber e Decodificar os dados JSON
$data = json_decode(file_get_contents("php://input"));

// 2. Validação dos dados
if (!isset($data->key) || !isset($data->value) || !isset($data->type)) {
    http_response_code(400);
    echo json_encode(["message" => "Dados incompletos (key, value e type são obrigatórios)."]);
    exit();
}

$key = $data->key;
$value = $data->value;
$type = $data->type;

// 3. Configuração e Conexão com a Base de Dados (AJUSTE SUAS CREDENCIAIS)
$servername = "localhost";
$username = "root"; 
$password = "";     
$dbname = "lar_nazare"; 
$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["message" => "Conexão com a BD falhou."]);
    exit();
}

// 4. Utilizar 'INSERT... ON DUPLICATE KEY UPDATE' para atualizar ou inserir
// Se a 'content_key' já existir, atualiza o valor; se não, insere um novo registo.
$sql = "INSERT INTO lar_content (content_key, content_value, content_type) 
        VALUES (?, ?, ?)
        ON DUPLICATE KEY UPDATE 
        content_value = VALUES(content_value),
        content_type = VALUES(content_type)";

$stmt = $conn->prepare($sql);
$stmt->bind_param("sss", $key, $value, $type); // 's' para string

if ($stmt->execute()) {
    http_response_code(200);
    echo json_encode([
        "message" => "Conteúdo '$key' atualizado com sucesso.",
        "key" => $key,
        "value" => $value
    ]);
} else {
    http_response_code(500);
    echo json_encode(["message" => "Erro ao atualizar o conteúdo: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>