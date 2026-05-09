import { useState } from "react";
import { updateProduct } from "../services/apis";
import Swal from "sweetalert2";

function EditProduct({
    product,
    setProductToEdit,
    setReload
}) {

    const [codigo, setCodigo] = useState(product.codigo);
    const [nombre, setNombre] = useState(product.nombre);
    const [precio, setPrecio] = useState(product.precio);
    const [stock, setStock] = useState(product.stock);
    const [pais, setPais] = useState(product.pais_origen);

    const regexCodigo = /^[a-zA-Z0-9-]+$/; // VALIDAR CÓDIGOS
    const regexNombre = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s-]+$/; // VALIDAR NOMBRE
    const regexPais = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/; // VALIDAR PAÍS

    const handleSubmit = async (e) => {

        e.preventDefault();

        // VALIDAR CAMPOS VACÍOS
        if (
            !codigo ||
            !nombre ||
            !precio ||
            !stock ||
            !pais
        ) {

            Swal.fire({
                icon: "warning",
                title: "Campos obligatorios",
                text: "Debes completar todos los campos",
                confirmButtonColor: "#2563eb",
            });

            return;
        }

        // VALIDAR NUMEROS
        if (precio <= 0 || stock <= 0) {

            Swal.fire({
                icon: "error",
                title: "Datos inválidos",
                text: "Precio y stock deben ser mayores a 0",
                confirmButtonColor: "#2563eb",
            });

            return;
        }

        // VALIDAR CODIGO
        if (!regexCodigo.test(codigo)) {

            Swal.fire({
                icon: "error",
                title: "Código inválido",
                text: "Solo letras, números y guiones",
                confirmButtonColor: "#2563eb",
            });

            return;
        }

        // VALIDAR NOMBRE
        if (!regexNombre.test(nombre)) {

            Swal.fire({
                icon: "error",
                title: "Nombre inválido",
                text: "No se permiten símbolos extraños",
                confirmButtonColor: "#2563eb",
            });

            return;
        }

        // VALIDAR PAIS
        if (!regexPais.test(pais)) {

            Swal.fire({
                icon: "error",
                title: "País inválido",
                text: "No se permiten símbolos extraños",
                confirmButtonColor: "#2563eb",
            });

            return;
        }

        // VALIDAR SI HUBO CAMBIOS
        if (
            codigo === product.codigo &&
            nombre === product.nombre &&
            precio == product.precio &&
            stock == product.stock &&
            pais === product.pais_origen
        ) {

            Swal.fire({
                icon: "info",
                title: "Sin cambios",
                text: "No realizaste modificaciones",
            });

            return;
        }

        // OBJETO ACTUALIZADO
        const updatedProduct = {
            id: product.id,
            codigo,
            nombre,
            precio,
            stock,
            pais_origen: pais
        };

        try {

            const response =
                await updateProduct(updatedProduct);

            Swal.fire({
                icon: "success",
                title: "Producto actualizado",
                text: response.message,
            });

            // Recargar lista
            setReload(prev => !prev);

            // Cerrar formulario
            setProductToEdit(null);

        } catch (error) {

            Swal.fire({
                icon: "error",
                title: "Error",
                text: "No se pudo actualizar el producto",
            });
        }
    };

    return (

        <form
            className="form-container"
            onSubmit={handleSubmit}
        >

            <h2>EDITAR PRODUCTO</h2>

            <div className="input-group">
                <label>
                    Código <span>*</span>
                </label>

                <input
                    type="text"
                    value={codigo}
                    disabled
                />
            </div>

            <div className="input-group">
                <label>
                    Nombre <span>*</span>
                </label>

                <input
                    type="text"
                    placeholder="Ingrese el Nombre"
                    value={nombre}
                    onChange={(e) =>
                        setNombre(e.target.value)
                    }
                />
            </div>

            <div className="input-group">
                <label>
                    Precio <span>*</span>
                </label>

                <input
                    type="number"
                    placeholder="Ingrese el Precio"
                    value={precio}
                    onChange={(e) =>
                        setPrecio(e.target.value)
                    }
                />
            </div>

            <div className="input-group">
                <label>
                    Existencias <span>*</span>
                </label>

                <input
                    type="number"
                    placeholder="Ingrese el Stock"
                    value={stock}
                    onChange={(e) =>
                        setStock(e.target.value)
                    }
                />
            </div>

            <div className="input-group">
                <label>
                    País de Origen <span>*</span>
                </label>

                <input
                    type="text"
                    placeholder="Ingrese el País"
                    value={pais}
                    onChange={(e) =>
                        setPais(e.target.value)
                    }
                />
            </div>

            <button type="submit">
                Guardar Cambios
            </button>

            <button
                type="button"
                className="btn-view"
                onClick={() =>
                    setProductToEdit(null)
                }
            >
                Cancelar
            </button>

        </form>
    );
}
export default EditProduct;