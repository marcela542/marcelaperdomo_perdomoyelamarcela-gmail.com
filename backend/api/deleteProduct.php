<?php

    header("Access-Control-Allow-Origin: *"); 
    header("Access-Control-Allow-Headers: *");
    header("Access-Control-Allow-Methods: *");
    header("Content-Type: application/json");

    require_once("../config/conexionBd.php");//con require_once importamos la conexion de la base de datos  a este archvio para usar la variable $conn

    $data = json_decode(file_get_contents("php://input"), true); //file_get_contents("php://input") es una función que lee los datos enviados en el cuerpo de la solicitud HTTP, en este caso, los datos JSON enviados desde React. Luego, json_decode() convierte esa cadena JSON en un array asociativo de PHP, lo que nos permite acceder a los datos de manera más fácil.

    // OBTENER ID
    $id = $data["id"];

    // CONSULTA SQL para eliminar el producto de la base de datos cambia su estado a 0.
    $sql = "UPDATE products SET estado = 0 WHERE id = '$id'";

    // EJECUTAR DELETE
    if($conn->query($sql)) {

        echo json_encode([
            "success" => true,
            "message" => "Producto eliminado"
        ]);

    } else {

        echo json_encode([
            "success" => false,
            "message" => "Error al eliminar"
        ]);
    }

    /*
    - deleteProduct.php elimina productos de la base de datos.
    - React envía el ID del producto a eliminar.
    - PHP recibe el JSON.
    - PHP ejecuta DELETE en MySQL.
    - WHERE id indica QUÉ producto eliminar.
    - Luego PHP responde JSON.
    */

?>