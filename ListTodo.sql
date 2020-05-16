-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : db
-- Généré le : sam. 16 mai 2020 à 14:20
-- Version du serveur :  5.7.30
-- Version de PHP : 7.4.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `ListTodo`
--
CREATE DATABASE IF NOT EXISTS `ListTodo` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `ListTodo`;

-- --------------------------------------------------------

--
-- Structure de la table `Listes`
--

CREATE TABLE `Listes` (
  `id` int(11) NOT NULL,
  `label` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `Todos`
--

CREATE TABLE `Todos` (
  `id` int(11) NOT NULL,
  `label` varchar(255) NOT NULL,
  `idList` int(11) NOT NULL,
  `isDone` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `Listes`
--
ALTER TABLE `Listes`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `Todos`
--
ALTER TABLE `Todos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idList` (`idList`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `Listes`
--
ALTER TABLE `Listes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT pour la table `Todos`
--
ALTER TABLE `Todos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `Todos`
--
ALTER TABLE `Todos`
  ADD CONSTRAINT `Todos_ibfk_1` FOREIGN KEY (`idList`) REFERENCES `Listes` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
