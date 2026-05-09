<?php

    $host = "localhost"; //"localhost" queire decir que La bd se encuentra en mi local
    $user = "root"; //Usu por defect
    $password = ""; // sin contrasñea
    $database = "prueba_inventario"; //name BD

    $conn = new mysqli($host, $user, $password, $database); // conexion con PHP, cramso varibale $conn para futura funciones y validar si la conexion

    if ($conn->connect_error) { //esta condicion valida si conn fallo 
        die("Error de conexión: " . $conn->connect_error);
    }

    /*
        =========================================
        NOTAS
        =========================================
        - React NO se conecta directamente a MySQL.
        - PHP es el intermediario.
        - db.php crea la conexión entre PHP y MySQL.
        - La variable $conn representa la conexión activa.
        - Todas las APIs reutilizarán esta conexión.
        - MySQL es donde viven los datos.
        - PHP es quien habla con MySQL.
    */

?> 