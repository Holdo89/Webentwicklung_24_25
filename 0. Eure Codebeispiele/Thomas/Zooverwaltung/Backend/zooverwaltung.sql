-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 15. Apr 2025 um 17:15
-- Server-Version: 10.4.32-MariaDB
-- PHP-Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `zooverwaltung`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `tiere`
--

CREATE TABLE `tiere` (
  `ID` int(11) NOT NULL,
  `Tiername` varchar(20) NOT NULL,
  `Tierart` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `tiere`
--

INSERT INTO `tiere` (`ID`, `Tiername`, `Tierart`) VALUES
(1, 'Pepo', 'Tiger'),
(2, 'Klaus', 'Vogel'),
(5, 'hannes ', 'undefined'),
(6, 'hannes ', 'undefined'),
(7, 'thomas', 'undefined'),
(8, 'thomas', 'schrank'),
(9, 'thomas', 'eule'),
(10, 'Ricko', 'Hund'),
(11, 'ayham', 'gorilla'),
(12, 'thomas', 'schrank'),
(13, 'adler', 'vogel');

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `tiere`
--
ALTER TABLE `tiere`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `tiere`
--
ALTER TABLE `tiere`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
