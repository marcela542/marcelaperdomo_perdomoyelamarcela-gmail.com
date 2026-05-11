import { useState } from "react";
import { createProduct } from "../services/apis";
import Swal from "sweetalert2";
import {
    faFloppyDisk,
    faTableList
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


function ProductForm({ setReload, setShowList }) {

    // ESTADOS DEL FORMULARIO
    const [codigo, setCodigo] = useState("");
    const [nombre, setNombre] = useState("");
    const [precio, setPrecio] = useState("");
    const [stock, setStock] = useState("");
    const [pais, setPais] = useState("");

    // ESTADO DE ERRORES
    const [errors, setErrors] = useState({});

    // ESTADO DE CARGA
    const [loading, setLoading] = useState(false);

    // VALIDACIONES
    const regexCodigo = /^[a-zA-Z0-9-]+$/;
    const regexNombre = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s-]+$/;
    const regexPais = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

    // ENVIAR FORMULARIO
    const handleSubmit = async (e) => {

        e.preventDefault();

        // LIMPIAR ERRORES
        setErrors({});

        // CAMPOS OBLIGATORIOS
        const newErrors = {};

        if (!codigo.trim()) {
            newErrors.codigo = "El código es obligatorio";
        }

        if (!nombre.trim()) {
            newErrors.nombre = "El nombre es obligatorio";
        }

        if (!precio) {
            newErrors.precio = "El precio es obligatorio";
        }

        if (!stock) {
            newErrors.stock = "El stock es obligatorio";
        }

        if (!pais.trim()) {
            newErrors.pais = "El país es obligatorio";
        }

        // MOSTRAR ERRORES
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
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
                text: "Solo se permiten letras",
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

            // ACTIVAR LOADING
            setLoading(true);

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

            // RECARGAR LISTA
            setReload(prev => !prev);

            // LIMPIAR FORMULARIO
            setCodigo("");
            setNombre("");
            setPrecio("");
            setStock("");
            setPais("");

            // LIMPIAR ERRORES
            setErrors({});

        } catch (error) {

            console.log(error);

            // VALIDAR CÓDIGO DUPLICADO
            if (error.message === "Código duplicado") {

                Swal.fire({
                    icon: "error",
                    title: "Código duplicado",
                    text: "No se puede registrar un código repetido",
                    confirmButtonColor: "#2563eb",
                });

                return;
            }

            Swal.fire({
                icon: "error",
                title: "Error",
                text: "No se pudo registrar el producto",
                confirmButtonColor: "#2563eb",
            });

        } finally {

            // DESACTIVAR LOADING
            setLoading(false);
        }
    };

    return (

        <form
            className="form-container"
            onSubmit={handleSubmit}
            autoComplete="off"
        >

            <div className="form-header">

                <h2>
                    Registrar Productos
                </h2>

                <p className="form-description">
                    Complete la información para registrar un nuevo producto en el sistema.
                </p>

            </div>

            {/* CÓDIGO */}
            <div className="input-group">

                <label>
                    Código <span>*</span>
                </label>

                <input
                    type="text"
                    placeholder="Ej: PROD-001"
                    value={codigo}
                    maxLength={20}
                    onChange={(e) => {
                        setCodigo(e.target.value.toUpperCase());
                        setErrors({ ...errors, codigo: "" });
                    }}
                />

                {
                    errors.codigo &&
                    <p className="error-text">
                        {errors.codigo}
                    </p>
                }

            </div>

            {/* NOMBRE */}
            <div className="input-group">

                <label>
                    Nombre <span>*</span>
                </label>

                <input
                    type="text"
                    placeholder="Ingrese el nombre del producto"
                    value={nombre}
                    maxLength={80}
                    onChange={(e) => {
                        setNombre(e.target.value.toUpperCase());
                        setErrors({ ...errors, nombre: "" });
                    }}
                />

                {
                    errors.nombre &&
                    <p className="error-text">
                        {errors.nombre}
                    </p>
                }

            </div>

            {/* PRECIO */}
            <div className="input-group">

                <label>
                    Precio <span>*</span>
                </label>

                <input
                    type="number"
                    placeholder="Ingrese el precio"
                    value={precio}
                    min="1"
                    onChange={(e) => {
                        setPrecio(e.target.value);
                        setErrors({ ...errors, precio: "" });
                    }}
                />

                {
                    errors.precio &&
                    <p className="error-text">
                        {errors.precio}
                    </p>
                }

            </div>

            {/* STOCK */}
            <div className="input-group">

                <label>
                    Existencias <span>*</span>
                </label>

                <input
                    type="number"
                    placeholder="Ingrese la cantidad"
                    value={stock}
                    min="1"
                    onChange={(e) => {
                        setStock(e.target.value);
                        setErrors({ ...errors, stock: "" });
                    }}
                />

                {
                    errors.stock &&
                    <p className="error-text">
                        {errors.stock}
                    </p>
                }

            </div>

            {/* PAÍS */}
            <div className="input-group">

                <label>
                    País de Origen <span>*</span>
                </label>

                <input
                    type="text"
                    placeholder="Ingrese el país de origen"
                    value={pais}
                    maxLength={40}
                    onChange={(e) => {
                        setPais(e.target.value.toUpperCase());
                        setErrors({ ...errors, pais: "" });
                    }}
                />

                {
                    errors.pais &&
                    <p className="error-text">
                        {errors.pais}
                    </p>
                }

            </div>

            {/* BOTÓN GUARDAR */}
            <div className="button-group">

                <button
                    type="submit"
                    className="btn-save"
                    disabled={loading}
                >

                    <FontAwesomeIcon icon={faFloppyDisk} />

                    {
                        loading
                            ? "Guardando..."
                            : "Guardar Registro"
                    }

                </button>

                <button
                    type="button"
                    className="btn-view"
                    onClick={() => setShowList(true)}
                >

                    <FontAwesomeIcon icon={faTableList} />

                    Ver Listado

                </button>

            </div>
        </form>
    );
}
export default ProductForm;