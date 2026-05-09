import { useState } from "react";
import { createProduct } from "../services/apis";
import Swal from "sweetalert2";

function ProductForm({ setReload, setShowList }) {

    // ESTADOS DEL FORMULARIO
    const [codigo, setCodigo] = useState("");
    const [nombre, setNombre] = useState("");
    const [precio, setPrecio] = useState("");
    const [stock, setStock] = useState("");
    const [pais, setPais] = useState("");

    // VALIDACIONES
    const regexCodigo = /^[a-zA-Z0-9-]+$/;

    // Permite letras, números, espacios y guiones
    const regexNombre = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s-]+$/;

    // Solo letras y espacios
    const regexPais = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

    // ENVIAR FORMULARIO
    const handleSubmit = async (e) => {

        e.preventDefault();

        // CAMPOS OBLIGATORIOS
        if (!codigo || !nombre || !precio || !stock || !pais) {

            Swal.fire({
                icon: "warning",
                title: "Campos obligatorios",
                text: "Debes completar todos los campos",
                confirmButtonColor: "#2563eb",
            });

            return;
        }

        // VALIDAR NÚMEROS
        if (precio <= 0 || stock <= 0) {

            Swal.fire({
                icon: "error",
                title: "Datos inválidos",
                text: "Precio y stock deben ser mayores a 0",
                confirmButtonColor: "#2563eb",
            });

            return;
        }

        // VALIDAR CÓDIGO
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

        // VALIDAR PAÍS
        if (!regexPais.test(pais)) {

            Swal.fire({
                icon: "error",
                title: "País inválido",
                text: "No se permiten símbolos extraños",
                confirmButtonColor: "#2563eb",
            });

            return;
        }

        // OBJETO PRODUCTO
        const product = {
            codigo,
            nombre,
            precio,
            stock,
            pais
        };

        try {

            // GUARDAR PRODUCTO
            const response = await createProduct(product);

            Swal.fire({
                icon: "success",
                title: "Producto Registrado",
                text: response.message,
                confirmButtonColor: "#2563eb",
            }).then(() => {
                setShowList(true);
            });

            // LIMPIAR FORMULARIO
            setCodigo("");
            setNombre("");
            setPrecio("");
            setStock("");
            setPais("");

            // RECARGAR LISTA
            setReload(prev => !prev);

        } catch (error) {

            Swal.fire({
                icon: "error",
                title: "Error",
                text: "No se pudo registrar el producto",
                confirmButtonColor: "#2563eb",
            });
        }
    };

    return (

        <form className="form-container" onSubmit={handleSubmit}>

            <h2>REGISTRAR PRODUCTOS</h2>

            {/* CÓDIGO */}
            <div className="input-group">
                <label>
                    Código <span>*</span>
                </label>

                <input
                    type="text"
                    placeholder="Ingrese el Código"
                    value={codigo}
                    onChange={(e) => setCodigo(e.target.value)}
                />
            </div>

            {/* NOMBRE */}
            <div className="input-group">
                <label>
                    Nombre <span>*</span>
                </label>

                <input
                    type="text"
                    placeholder="Ingrese el Nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />
            </div>

            {/* PRECIO */}
            <div className="input-group">
                <label>
                    Precio <span>*</span>
                </label>

                <input
                    type="number"
                    placeholder="Ingrese el Precio"
                    value={precio}
                    onChange={(e) => setPrecio(e.target.value)}
                />
            </div>

            {/* STOCK */}
            <div className="input-group">
                <label>
                    Stock <span>*</span>
                </label>

                <input
                    type="number"
                    placeholder="Ingrese el Stock"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                />
            </div>

            {/* PAÍS */}
            <div className="input-group">
                <label>
                    País de Origen <span>*</span>
                </label>

                <input
                    type="text"
                    placeholder="Ingrese el País de origen"
                    value={pais}
                    onChange={(e) => setPais(e.target.value)}
                />
            </div>

            <button type="submit">
                Guardar Producto
            </button>

            <button
                type="button"
                className="btn-view"
                onClick={() => setShowList(true)}
            >
                Ver Listado
            </button>

        </form>
    );
}

export default ProductForm;