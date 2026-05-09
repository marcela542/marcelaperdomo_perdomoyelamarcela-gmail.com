<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    header("Access-Control-Allow-Methods: *");
    header("Content-Type: application/json");

    // CONEXION BD
    require_once("../config/conexionBd.php");

    // RECIBIR JSON
    $data = json_decode(file_get_contents("php://input"), true);

    // VALIDAR DATOS
    if(
        !isset($data["codigo"]) ||
        !isset($data["nombre"]) ||
        !isset($data["precio"]) ||
        !isset($data["stock"]) ||
        !isset($data["pais"])
    ){
        echo json_encode([
            "success" => false,
            "message" => "Faltan datos"
        ]);
        exit;
    }

    // GUARDAR VARIABLES
    $codigo = $data["codigo"];
    $nombre = $data["nombre"];
    $precio = $data["precio"];
    $stock = $data["stock"];
    $pais = $data["pais"];

    // INSERT SQL
    $sql = "INSERT INTO products
    (codigo, nombre, precio, stock, pais_origen)
    VALUES
    ('$codigo', '$nombre', '$precio', '$stock', '$pais')";

    // EJECUTAR
    if($conn->query($sql)){

        echo json_encode([
            "success" => true,
            "message" => "Producto creado correctamente"
        ]);

    }else{

        echo json_encode([
            "success" => false,
            "message" => "Error al crear producto"
        ]);
    }
    /*
    - createProduct.php es una API para guardar producto: React enviará datos usando método POST, PHP recibe esos datos y PHP ejecuta INSERT INTO en MySQL. MySQL guarda el producto. PHP responde JSON y React leerá esa respuesta.

    */

?>