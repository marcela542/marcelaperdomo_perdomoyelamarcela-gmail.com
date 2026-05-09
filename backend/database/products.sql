-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 09-05-2026 a las 05:28:57
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `prueba_inventario`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `codigo` varchar(50) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `precio` decimal(10,2) NOT NULL,
  `stock` int(11) NOT NULL,
  `pais_origen` varchar(100) NOT NULL,
  `estado` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`id`, `codigo`, `nombre`, `precio`, `stock`, `pais_origen`, `estado`) VALUES
(1, '111', 'Computador', 2500000.00, 10, 'Italia', 1),
(4, '112', 'Celular Samsung', 4500000.00, 25, 'Mexico', 0),
(8, '113', 'MacBook ', 6000000.00, 20, 'Brasil', 0),
(9, '114', 'Table Samsung', 1500000.00, 3, 'Argentina', 0),
(10, '115', 'Celular Motorola', 1800000.00, 8, 'Colombia', 0),
(12, '116', 'Portatil ASUS Vivobook', 2600000.00, 24, 'Brasil', 0),
(14, '117', 'Celular', 16000000.00, 2, 'Colombia', 0),
(16, 'M-2335', 'Portatil ASUS', 3500000.00, 45, 'Colombia', 0),
(17, 'M-95668', 'Computador', 1800000.00, 15, 'France', 0),
(18, 'M-4566', 'Computador ASUS', 1600000.00, 26, 'Brasil', 0),
(19, '112', 'Celular Samsung ', 2600000.00, 25, 'Colombia', 1),
(20, '113', 'Portatil ASUS Vivobook', 2900000.00, 36, 'Brasil', 0),
(21, '114', 'Iphone', 6000000.00, 2, 'Usa', 0),
(22, '115', 'Cel', 1600000.00, 20, 'France', 0),
(23, '114', 'Celular Oppo', 2600000.00, 2, 'France', 0),
(24, '113', 'Computador', 2600000.00, 26, 'brasil', 0),
(25, '114', 'Celular Oppo', 1500000.00, 15, 'Usa', 0),
(26, '113', 'Portatil ASUS Vivobook', 2900000.00, 35, 'Brasil', 1),
(27, '118', 'Celular Samung', 2600000.00, 20, 'USA', 0),
(28, '118', 'Tablet Samsung', 1500000.00, 18, 'France', 1),
(29, 'M-158', 'Iphone Pro Max 15', 5600000.00, 55, 'Argentina', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
