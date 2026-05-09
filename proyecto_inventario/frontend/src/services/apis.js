const API_URL = "http://localhost/backend/api"; // Aquí definimos la URL base de laAPI.

// OBTENER PRODUCTOS
export const getProducts = async () => { //Esta función es asíncrona porque vamos a hacer una solicitud HTTP para obtener los productos desde la API. Usamos async/await para manejar la promesa que devuelve fetch.

    const response = await fetch(`${API_URL}/getProducts.php`); // Aquí hacemos una solicitud GET a la URL de la API para obtener los productos. Usamos template literals para construir la URL completa, que sería http://localhost/backend/api/getProducts.php.
    if (!response.ok) {
        throw new Error("Error al obtener productos");
    }

    const data = await response.json();// Aquí convertimos la respuesta de la API a formato JSON, lo que nos dará un array de productos. Usamos await para esperar a que se resuelva la promesa de response.json() antes de continuar con el código.

    return data; // Finalmente, retornamos los datos obtenidos de la API, que serán un array de productos.
};

//Crear PRODUCTO
export const createProduct = async (product) => {
    const response = await fetch(
        `${API_URL}/createProduct.php`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(product)
        }
    );

    // LEER RESPUESTA JSON
    const data = await response.json();

    // SI HAY ERROR
    if (!response.ok) {
        // ENVIAR MENSAJE REAL DEL BACKEND
        throw data;
    }
    return data;
};

// ELIMINAR PRODUCTO
export const deleteProduct = async (id) => {
    const response = await fetch(`${API_URL}/deleteProduct.php`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
    });

    if (!response.ok) {
        throw new Error("Error al eliminar producto");
    }

    return await response.json();
};

// ACTUALIZAR PRODUCTO
export const updateProduct = async (product) => {
    const response = await fetch(`${API_URL}/updateProduct.php`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
    });

    // LEER RESPUESTA JSON
    const data = await response.json();

    // SI HAY ERROR
    if (!response.ok) {

        // ENVIAR MENSAJE REAL DEL BACKEND
        throw data;
    }

    return await response.json();
};