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

        // guardar producto seleccionado
        setProductToEdit(product);

        // cambiar a vista formulario
        setShowList(false);
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

    /* =========================
    PAGINACIÓN
    ========================= */

    const [currentPage, setCurrentPage] = useState(1);

    const productsPerPage = 5;

    const indexOfLastProduct =
        currentPage * productsPerPage;

    const indexOfFirstProduct =
        indexOfLastProduct - productsPerPage;

    const currentProducts =
        filteredProducts.slice(
            indexOfFirstProduct,
            indexOfLastProduct
        );

    const totalPages = Math.ceil(
        filteredProducts.length / productsPerPage
    );

    // CONTROLAR PAGINACION DESPUES DEL FILTRO
    useEffect(() => {

        if (currentPage > totalPages && totalPages > 0) {
            setCurrentPage(totalPages);
        }

    }, [filteredProducts]);

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
            <div className="top-bar">
                <div className="top-info">
                    <h1>LISTA DE PRODUCTOS</h1>
                    <p>Administra, busca y edita los productos registrados en el sistema.</p>
                </div>

                <button
                    className="btn-add"
                    onClick={() => setShowList(false)}
                >
                    <FontAwesomeIcon icon={faPlus} />
                    Registrar Producto
                </button>
            </div>

            <div className="search-box">

                <div className="search-header">

                    <div>
                        <h3>Buscar Productos</h3>

                        <span>
                            Filtra por código o nombre
                        </span>
                    </div>

                </div>

                <div className="search-input">

                    <FontAwesomeIcon icon={faSearch}/>
                    <input
                        type="text"
                        placeholder="Buscar producto..."
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);

                            // VOLVER A PAGINA 1
                            setCurrentPage(1);
                        }}
                    />
                </div>
            </div>

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
                            currentProducts.map((product) => (
                                <tr key={product.id}>
                                    <td>{product.codigo}</td>
                                    <td>{product.nombre}</td>
                                    <td>
                                        {Number(product.precio).toLocaleString("es-CO", {
                                            style: "currency",
                                            currency: "COP",
                                            minimumFractionDigits: 0
                                        })}
                                    </td>
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
                <div className="pagination">

                    <button
                        onClick={() =>
                            setCurrentPage((prev) =>
                                Math.max(prev - 1, 1)
                            )
                        }
                        disabled={currentPage === 1}
                    >
                        ← Anterior
                    </button>

                    <span>
                        Página {currentPage} de {totalPages}
                    </span>

                    <button
                        onClick={() =>
                            setCurrentPage((prev) =>
                                Math.min(prev + 1, totalPages)
                            )
                        }
                        disabled={currentPage === totalPages}
                    >
                        Siguiente →
                    </button>

                </div>
            </div>
        </div>
    );
}
export default ProductList; // Exportamos el componente ProductList para que pueda ser importado y utilizado en otros archivos de nuestra aplicación, como en App.jsx.