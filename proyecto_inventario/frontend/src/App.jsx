import { useState } from "react";

import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";
import EditProduct from "./components/EditProduct";

import "./styles/product.css";

function App() {

    const [reload, setReload] = useState(false); // estado apra controlar la recarda de la lista de productos despues de crear, eliminar o actualizar un producto. Al cambiar el valor de reload, se desencadenará una actualización en el componente ProductList para cargar los productos actualizados desde la API.
    const [showList, setShowList] = useState(false); // estado para controlar si se muestra el formulario de registro o la lista de productos. Cuando showList es true, se muestra la lista de productos, y cuando es false, se muestra el formulario de registro. Esto nos permite alternar entre ambas vistas en función de las acciones del usuario, como crear un nuevo producto o volver a la lista después de editar un producto.
    const [productToEdit, setProductToEdit] = useState(null); // estado para almacenar el producto que se va a editar. Cuando el usuario hace clic en el botón de editar en la lista de productos, se establece el producto seleccionado en este estado, lo que permite que el componente EditProduct muestre el detalles del producto para su edición.
    return (
        <div className="app-bg">
            <>
                {productToEdit ? (
                    <EditProduct
                        product={productToEdit}
                        setProductToEdit={setProductToEdit}
                        setReload={setReload}
                        setShowList={setShowList}
                    />
                ) : showList ? (
                    <ProductList
                        reload={reload}
                        setShowList={setShowList}
                        setProductToEdit={setProductToEdit}
                    />
                ) : (
                    <ProductForm
                        setReload={setReload}
                        setShowList={setShowList}
                    />
                )}
            </>
        </div>
    );
}
export default App;