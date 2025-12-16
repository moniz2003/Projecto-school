<?php
// Configuração do cabeçalho
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Tratar pré-voo OPTIONS (necessário para CORS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Verifica se o método é POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["message" => "Método não permitido."]);
    exit();
}

// 1. Receber e Decodificar os dados JSON enviados pelo React
$data = json_decode(file_get_contents("php://input"));

// 2. Validação básica dos dados
if (!isset($data->id) || !isset($data->status)) {
    http_response_code(400);
    echo json_encode(["message" => "Dados incompletos (id e status são obrigatórios)."]);
    exit();
}

$contact_id = $data->id;
$new_status = $data->status;

// 3. Configuração e Conexão com a Base de Dados (Use suas credenciais corretas!)
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

// 4. Preparar e Executar a Consulta de Atualização (Usando prepared statements para segurança)
$stmt = $conn->prepare("UPDATE contactos SET status = ? WHERE id = ?");
$stmt->bind_param("si", $new_status, $contact_id); // 's' para string, 'i' para integer

if ($stmt->execute()) {
    // Sucesso na atualização
    http_response_code(200);
    echo json_encode([
        "message" => "Estado do contacto ID $contact_id atualizado com sucesso.",
        "new_status" => $new_status
    ]);
} else {
    // Falha na execução
    http_response_code(500);
    echo json_encode(["message" => "Erro ao atualizar o estado: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>