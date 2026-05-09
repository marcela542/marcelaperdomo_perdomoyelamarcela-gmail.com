import { useEffect, useState } from "react"; // Importamos useEffect y useState desde React para manejar el estado y los efectos secundarios en nuestro componente. useState nos permite crear un estado local para almacenar la lista de productos.
import { getProducts, deleteProduct, updateProduct} from "../services/apis"; // Importamos la función deleteProduct desde nuestro archivo de servicios API. Esta función es responsable de hacer una solicitud a nuestra API para eliminar un producto específico de la base de datos.
import Swal from "sweetalert2"; 
import {faPen,faTrash,faPlus,faSearch} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon }from "@fortawesome/react-fontawesome";

function ProductList({ reload, setShowList, setProductToEdit}) {

    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(products.length === 0); // estado para controlar la carga del producto.

    useEffect(() => {
        if (products.length === 0) {
            setLoading(true);
            loadProducts(true);
        } else {
            loadProducts(false);
        }
    }, [reload]); // El segundo argumento de useEffectarray de dependencia. estamos pasando el estado reload como dependencia. Esto significa que cada vez que el valor de reload cambie, la función loadProducts se ejecutará nuevamente para cargar los productos actualizados desde la API

    // CARGAR PRODUCTOS
    const loadProducts = async (showLoader = false) => {

        if (showLoader) {
            setLoading(true);
        }

        try {
            const data = await getProducts();
            const productsWithFlags = await Promise.all(
                data.map(async (product) => {

                    try {
                        const response = await fetch(
                            `https://restcountries.com/v3.1/name/${product.pais_origen}`
                        );
                        const countryData = await response.json();
                        return {...product, flag: countryData[0]?.flags?.png,};
                    } catch (error) {
                        return {...product, flag: "",};
                    }
                })
            );

            setProducts(productsWithFlags);

            if (showLoader) {
                setTimeout(() => {
                    setLoading(false);
                }, 500);
            }

        } catch (error) {
            setLoading(false);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "No se pudieron cargar los productos"
            });
        }
    };

    // ELIMINAR PRODUCTO
    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "¿Eliminar producto?",
            text: "No podrás revertir esto",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
        });
        if (!result.isConfirmed) return;
        
        try {

        await deleteProduct(id);
            Swal.fire({
                icon: "success",
                title: "Eliminado",
                text: "Producto eliminado correctamente",
            });
            loadProducts();
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "No se pudo eliminar el producto",
            });
        }
    };

    // EDITAR PRODUCTO
    const handleEdit = (product) => {
        setProductToEdit(product);
    };

    // FILTRAR PRODUCTOS
    const filteredProducts = products.filter((product) =>
        product.nombre
            .toLowerCase()
            .includes(search.toLowerCase()) ||

        product.codigo
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    // RENDERIZAR PRODUCTOS
    if (loading) {
        return (
            <div className="loading-container">
                <div className="spinner"></div>
                <h2>Cargando productos...</h2>
            </div>
        );
    }

    return (
        <div className="container">
            <div className="search-box">
                <h1>LISTA DE PRODUCTOS</h1>
                <h3>Filtrar por código o nombre</h3>
                <div className="search-input"><FontAwesomeIcon icon={faSearch}/>
                    <input type="text" placeholder="Buscar producto..." value={search} onChange={(e) => setSearch(e.target.value)}/>
                </div>
            </div> 
                
            <button className="btn-add" onClick={() => setShowList(false)}><FontAwesomeIcon icon={faPlus} />Registrar Producto</button>

            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Stock</th>
                            <th>País</th>
                            <th>Bandera</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>

                        {filteredProducts.length === 0 ? (
                            <tr>
                                <td colSpan="7">
                                    No se encontraron productos
                                </td>
                            </tr>

                        ) : (
                            filteredProducts.map((product) => (
                                <tr key={product.id}>
                                    <td>{product.codigo}</td>
                                    <td>{product.nombre}</td>
                                    <td>${product.precio}</td>
                                    <td>{product.stock}</td>
                                    <td>{product.pais_origen}</td>

                                    <td>
                                        {product.flag ? (
                                            <img src={product.flag} width="40" />
                                        ) : (
                                            <span>Sin bandera</span>
                                        )}
                                    </td>

                                    <td className="actions">
                                        <button className="btn-edit" onClick={() => handleEdit(product)}><FontAwesomeIcon icon={faPen} /> Editar</button>

                                        <button className="btn-delete" onClick={() => handleDelete(product.id)}><FontAwesomeIcon icon={faTrash} />Eliminar</button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
export default ProductList; // Exportamos el componente ProductList para que pueda ser importado y utilizado en otros archivos de nuestra aplicación, como en App.jsx.