<?php
require_once 'Conexion.php';

class Usuario extends Conexion
{
    public $nombreGithub;
    public $telefono;
    public $correo;

    public function __construct($args = [])
    {
        $this->nombreGithub = $args['nombreGithub'] ?? '';
        $this->telefono = $args['telefono'] ?? '';
        $this->correo = $args['correo'] ?? '';
    }

    public function guardar()
    {
        $sql = "INSERT INTO usuarios (nombreGithub, telefono, correo) VALUES (:nombreGithub, :telefono, :correo)";
        $params = [
            ':nombreGithub' => $this->nombreGithub,
            ':telefono' => $this->telefono,
            ':correo' => $this->correo
        ];
        $resultado = self::ejecutar($sql, $params);
        return $resultado;
    }

    public function buscar()
    {
        $sql = "SELECT * FROM usuarios";
        $resultado = self::servir($sql);
        return $resultado;
    }
}

// Crear una instancia y manejar los datos del POST
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $usuario = new Usuario([
        'nombreGithub' => $_POST['nombreGithub'] ?? '',
        'telefono' => $_POST['telefono'] ?? '',
        'correo' => $_POST['correo'] ?? ''
    ]);

    $resultado = $usuario->guardar();
    
    header('Content-Type: application/json');
    if ($resultado['resultado']) {
        echo json_encode([
            'nombreGithub' => $usuario->nombreGithub,
            'telefono' => $usuario->telefono,
            'correo' => $usuario->correo
        ]);
    } else {
        echo json_encode(['error' => 'Error al guardar el usuario']);
    }
}

