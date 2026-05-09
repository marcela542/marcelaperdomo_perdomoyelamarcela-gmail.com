<?php
  // IMPORTAR CONEXIÓN MYSQL ya que en la consola aparece un error de conexión a la base de datos, entonces con require_once importamos la conexion de la base de datos  a este archvio para usar la variable $conn
  header("Access-Control-Allow-Origin: *"); 
  header("Access-Control-Allow-Headers: *");
  header("Access-Control-Allow-Methods: *");
  header("Content-Type: application/json");

    require_once("../config/conexionBd.php"); //con require_once importamos la conexion de la base de datos  a este archvio para usar la variable $conn

    $sql = "SELECT * FROM products WHERE estado = 1"; // cosnulta que leee todos los productos que tenga la tbala products

    $result = $conn->query($sql); // enviamos la consulta SQL

    $products = []; //creamos arreglo vacio para meetr todos los datos aqui

    while($row = $result->fetch_assoc()) { //creamos este bucle para traer las filas de la tabla productos MIENTRAS EXISTAN FILAS y guardamos en el arreglo products.
        $products[] = $row;
    }

    echo json_encode($products); //Aqui convetimo PHP en JSON, es decir conevrtimo el ARRAY a JSON que e slo que entiende REAACT



/*
====================================
NOTA IMPORTNATE SOBRE APIs, PHP, MYSQL Y JSON
====================================
- React es la parte visual del sistema (frontend).
- React muestra tablas, formularios, botones y datos.
- React NO se conecta directamente a MySQL. Por eso la carpeta Backend se pasa directame al "HTDOCS de xampp" y la traemos a visual studio, es decir backend trabaja con MYSQL muy aparte del frondent que es REACT y React hace peticiones a archivos PHP llamados APIs.

- La API es TODO el proceso que ocurre en el backend:
  
  React
  ↓
  PHP recibe la petición
  ↓
  PHP ejecuta consultas SQL
  ↓
  MySQL responde con los datos
  ↓
  PHP convierte los datos a JSON
  ↓
  React recibe el JSON y muestra la información

- Cada archivo API tiene una función específica:
  
  getProducts.php → obtener productos
  createProduct.php → guardar productos
  updateProduct.php → editar productos
  deleteProduct.php → eliminar productos


- JSON es el formato que React entiende.
- Por eso PHP convierte los datos usando json_encode().
- PHP funciona como puente entre React y MySQL.

====================================================
*/

?>