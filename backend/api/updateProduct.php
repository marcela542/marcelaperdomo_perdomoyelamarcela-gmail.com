<?php
    // RECIBIR JSON DESDE REACT
    error_reporting(E_ALL);
    ini_set('display_errors', 1);

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    header("Access-Control-Allow-Methods: *");
    header("Content-Type: application/json");

    // CONEXION
    require_once("../config/conexionBd.php");

    // RECIBIR JSON
    $data = json_decode(file_get_contents("php://input"), true);

    // VARIABLES
    $id = $data["id"];
    $codigo = $data["codigo"];
    $nombre = $data["nombre"];
    $precio = $data["precio"];
    $stock = $data["stock"];
    $pais_origen = $data["pais_origen"];

    // SQL
    $sql = "UPDATE products SET

    codigo = '$codigo',
    nombre = '$nombre',
    precio = '$precio',
    stock = '$stock',
    pais_origen = '$pais_origen'

    WHERE id = '$id'";

    // EJECUTAR
    if($conn->query($sql)) {

        echo json_encode([
            "success" => true,
            "message" => "Producto actualizado"
        ]);

    } else {

        echo json_encode([
            "success" => false,
            "message" => $conn->error
        ]);
    }


    /*
    NOTA:
    - updateProduct.php sirve para editar productos.
    - React envía el ID del producto
    y los nuevos datos.

    - PHP recibe el JSON.
    - PHP ejecuta UPDATE en MySQL.
    - WHERE id indica QUÉ producto editar.

    - Luego PHP responde JSON.
    - React leerá esa respuesta.
    */
?>