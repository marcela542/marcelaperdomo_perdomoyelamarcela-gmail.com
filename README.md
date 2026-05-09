# Sistema de Inventario - Prueba Técnica

Aplicación web de inventario desarrollada con ReactJs + Vite para el frontend, PHP para el backend y MySQL como base de datos.

La aplicación permite administrar productos mediante APIs REST desarrolladas en PHP y consumir una API pública externa para mostrar la bandera del país de origen de cada producto.

---

# Tecnologías Utilizadas

## Frontend

- ReactJs
- Vite
- CSS3
- SweetAlert2
- Font Awesome

## Backend

- PHP
- APIs REST
- JSON

## Base de Datos

- MySQL

## API Externa

- REST Countries API  
  https://restcountries.com/

---

# Librerías Utilizadas en React

Durante el desarrollo del frontend se utilizaron librerías adicionales para mejorar la experiencia visual y las alertas de la aplicación.

## SweetAlert2

Se utilizó para mostrar alertas dinámicas y mensajes personalizados en acciones como:

- Crear productos
- Editar productos
- Eliminar productos
- Validaciones
- Mensajes de error
- Confirmaciones

Import utilizado:

```javascript
import Swal from "sweetalert2";
```

Instalación:

```bash
npm install sweetalert2
```

---

## Font Awesome

Se utilizó para agregar iconos visuales en botones y acciones de la interfaz.

Iconos utilizados:

- Editar
- Eliminar
- Buscar
- Agregar productos

Imports utilizados:

```javascript
import { faPen, faTrash, faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
```

Instalación:

```bash
npm install @fortawesome/fontawesome-svg-core
npm install @fortawesome/free-solid-svg-icons
npm install @fortawesome/react-fontawesome
```

---

# Funcionalidades Implementadas

La aplicación permite:

- Listar productos
- Registrar productos
- Editar productos
- Eliminar productos (eliminación lógica)
- Buscar productos por nombre o código
- Mostrar bandera del país de origen
- Validaciones de formularios
- Estados de carga
- Manejo básico de errores
- Diseño responsive
- Alertas dinámicas con SweetAlert2
- Uso de iconos interactivos con Font Awesome

---

# Información del Producto

Cada producto contiene:

- Código
- Nombre
- Precio
- Stock
- País de origen

---

# Consumo de API Externa

La aplicación consume la API pública:

https://restcountries.com/

Con el nombre del país registrado en cada producto se realiza una consulta para:

1. Buscar el país
2. Obtener la bandera
3. Mostrar la bandera junto al producto en la tabla

---


# Configuración de la Base de Datos

1. Abrir phpMyAdmin o MySQL

2. Crear una base de datos llamada:

```sql
prueba_inventario
```

3. Importar el archivo:

```txt
backend/database/products.sql
```

---

# Configuración del Backend

El archivo de conexión se encuentra en:

```txt
backend/config/conexionBd.php
```

Configurar las credenciales de MySQL según el entorno local:

```php
$server = "localhost";
$user = "root";
$pass = "";
$database = "prueba_inventario";
```

---

# Ejecutar el Backend

El backend fue desarrollado utilizando PHP, Apache y XAMPP.

Para ejecutar correctamente las APIs REST es necesario copiar la carpeta `backend` dentro de la carpeta `htdocs` de XAMPP.

Ejemplo:

```txt
C:\xampp\htdocs\backend
```

Luego iniciar desde XAMPP los servicios:

- Apache
- MySQL

Las APIs podrán ejecutarse desde rutas como:

```txt
http://localhost/backend/api/getProducts.php
```

---

# Ejecutar el Frontend

El frontend desarrollado con React + Vite se ejecuta de manera independiente al backend.

Abrir una terminal dentro de:

```txt
proyecto_inventario/frontend
```

Instalar dependencias:

```bash
npm install
```

Ejecutar el proyecto:

```bash
npm run dev
```

El frontend se ejecutará normalmente en:

```txt
http://localhost:5173
```

---

# Comunicación entre Frontend y Backend

El frontend consume las APIs PHP ejecutadas desde XAMPP utilizando rutas locales como:

```txt
http://localhost/backend/api/
```

Por esta razón el backend y el frontend se encuentran separados dentro del proyecto.

El frontend funciona con Vite y el backend con Apache/XAMPP.

---

# APIs REST Implementadas

## Obtener productos

```txt
GET /backend/api/getProducts.php
```

## Crear producto

```txt
POST /backend/api/createProduct.php
```

## Editar producto

```txt
POST /backend/api/updateProduct.php
```

## Eliminar producto

```txt
POST /backend/api/deleteProduct.php
```

---

# Notas

- La eliminación de productos se realiza de manera lógica utilizando el campo `estado`.
- Todas las respuestas del backend se manejan en formato JSON.
- El frontend consume tanto APIs internas desarrolladas en PHP como una API externa para las banderas.
- Se implementaron validaciones para evitar datos inválidos en formularios.
- Se utilizaron alertas visuales con SweetAlert2 para mejorar la experiencia del usuario.
- Se utilizaron iconos de Font Awesome para mejorar la interfaz gráfica y la interacción visual de la aplicación.
- El proyecto fue organizado utilizando frontend y backend separados debido al uso de React + Vite junto con PHP ejecutado desde XAMPP.