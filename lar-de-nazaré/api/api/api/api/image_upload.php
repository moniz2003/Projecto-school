<?php
// Configuração do cabeçalho
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, X-Requested-With'); // Headers necessários para formulários multipart/form-data

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

// Verifica se o ficheiro foi enviado
if (empty($_FILES['image'])) {
    http_response_code(400);
    echo json_encode(["message" => "Nenhum ficheiro enviado."]);
    exit();
}

$file = $_FILES['image'];
$target_dir = "../public/uploads/"; // Pasta para onde o ficheiro será movido (relativo à pasta 'api')

// 1. Validar e Sanear o nome do ficheiro
$file_extension = pathinfo($file['name'], PATHINFO_EXTENSION);
$safe_filename = uniqid() . '.' . $file_extension;
$target_file = $target_dir . $safe_filename;

// 2. Criar a pasta se não existir
if (!is_dir($target_dir)) {
    mkdir($target_dir, 0777, true); 
}

// 3. Mover o ficheiro temporário para o destino final
if (move_uploaded_file($file["tmp_name"], $target_file)) {
    // 4. Devolver o URL público (relativo à raiz do domínio)
    // AJUSTE 'lar-nazare' SE O NOME DA SUA PASTA RAIZ FOR DIFERENTE
    $public_url = "http://" . $_SERVER['HTTP_HOST'] . "/lar-nazare/public/uploads/" . $safe_filename;
    
    http_response_code(200);
    echo json_encode([
        "message" => "Upload de imagem concluído.",
        "url" => $public_url,
        "filename" => $safe_filename
    ]);
} else {
    http_response_code(500);
    echo json_encode(["message" => "Erro ao mover o ficheiro. Verifique as permissões da pasta."]);
}
?>