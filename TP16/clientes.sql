-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 11-11-2023 a las 18:10:41
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `empresa`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `Id` int(11) NOT NULL,
  `Nombre` varchar(32) NOT NULL,
  `Apellido` varchar(32) NOT NULL,
  `FechaNac` date NOT NULL,
  `Peso` float NOT NULL,
  `Altura` float NOT NULL,
  `Domicilio` varchar(32) NOT NULL,
  `CodPostal` int(11) NOT NULL,
  `Movil1` int(11) NOT NULL,
  `Movil2` int(11) NOT NULL,
  `Email` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`Id`, `Nombre`, `Apellido`, `FechaNac`, `Peso`, `Altura`, `Domicilio`, `CodPostal`, `Movil1`, `Movil2`, `Email`) VALUES
(1, 'Lucas', 'Forchino', '1979-01-24', 95.5, 1.6, 'Jujuy 1234', 7600, 2147483647, 223445545, 'lucas@gmail.com'),
(2, 'Jorge', 'Solis', '1945-10-01', 78.2, 1.8, 'Almafuerte321', 8000, 2147483647, 2147483647, 'j@hotmail.com'),
(3, 'Javier', 'Fernandez', '1975-09-02', 90, 1.8, 'Av.Paso100', 7600, 2147483647, 2147483647, 'javer@gmail.com'),
(23, 'Jorge', 'Solisa', '0000-00-00', 100, 1.8, 'Av.Colon4444', 7600, 2147483647, 2147483647, 'sol@gmail.com'),
(35, 'Juan', 'Mercado', '1972-04-04', 89.6, 1.77, 'Av.Independencia720', 7600, 2147483647, 2147483647, 'mercado@gmail.com');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`Id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `clientes`
--
ALTER TABLE `clientes`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
