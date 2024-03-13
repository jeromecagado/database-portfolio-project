-- MariaDB dump 10.19  Distrib 10.5.22-MariaDB, for Linux (x86_64)
--
-- Host: classmysql.engr.oregonstate.edu    Database: cs340_cagadoj
-- ------------------------------------------------------
-- Server version	10.6.16-MariaDB-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Customers`
--

DROP TABLE IF EXISTS `Customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Customers` (
  `customer_id` int(11) NOT NULL AUTO_INCREMENT,
  `customer_fname` varchar(45) NOT NULL,
  `customer_lname` varchar(45) NOT NULL,
  `address` varchar(45) NOT NULL,
  `city` varchar(45) NOT NULL,
  `state` varchar(45) NOT NULL,
  `zipcode` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `customer_phone` int(11) NOT NULL,
  PRIMARY KEY (`customer_id`),
  UNIQUE KEY `customer_id` (`customer_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Customers`
--

LOCK TABLES `Customers` WRITE;
/*!40000 ALTER TABLE `Customers` DISABLE KEYS */;
INSERT INTO `Customers` VALUES (1,'Sam','Romanano','123 Cool Street','Los Angeles','California','72839','SR@yahoo.com',18727826),(2,'Sophia','Rodriguez','321 Nice Avenue','Seattle','Washington','98101','sophia.rodri@gmail.com',14598547),(3,'Jonathan','Thompson','432 73rd Street','Minneapolis','Minnesota','55633','J.Teach@gmail.com',18209483);
/*!40000 ALTER TABLE `Customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Developers`
--

DROP TABLE IF EXISTS `Developers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Developers` (
  `developer_id` int(11) NOT NULL AUTO_INCREMENT,
  `developer_name` varchar(45) NOT NULL,
  `developer_country` varchar(45) NOT NULL,
  `developer_email` varchar(45) NOT NULL,
  PRIMARY KEY (`developer_id`),
  UNIQUE KEY `developer_id` (`developer_id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Developers`
--

LOCK TABLES `Developers` WRITE;
/*!40000 ALTER TABLE `Developers` DISABLE KEYS */;
INSERT INTO `Developers` VALUES (13,'adsfasd','what','jei'),(18,'Seattle Games','Mexico','seattle@yahoo.com');
/*!40000 ALTER TABLE `Developers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Employees`
--

DROP TABLE IF EXISTS `Employees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Employees` (
  `employee_id` int(11) NOT NULL AUTO_INCREMENT,
  `employee_fname` varchar(45) NOT NULL,
  `employee_lname` varchar(45) NOT NULL,
  `employee_phone` int(10) NOT NULL,
  `hire_date` date DEFAULT NULL,
  PRIMARY KEY (`employee_id`),
  UNIQUE KEY `employee_id` (`employee_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Employees`
--

LOCK TABLES `Employees` WRITE;
/*!40000 ALTER TABLE `Employees` DISABLE KEYS */;
INSERT INTO `Employees` VALUES (1,'John','Smith',14321683,'2021-04-25'),(2,'Terry','Clinton',16548327,'2023-05-16'),(3,'Jill','Cool',15928383,'2019-05-03'),(4,'Gabriel','Chang',13245634,'2017-05-23');
/*!40000 ALTER TABLE `Employees` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Sales`
--

DROP TABLE IF EXISTS `Sales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Sales` (
  `sale_id` int(11) NOT NULL AUTO_INCREMENT,
  `employee_id` int(11) DEFAULT NULL,
  `customer_id` int(11) NOT NULL,
  `sale_revenue` decimal(10,2) NOT NULL,
  `sold_date` date DEFAULT NULL,
  PRIMARY KEY (`sale_id`),
  UNIQUE KEY `sale_id` (`sale_id`),
  KEY `employee_id` (`employee_id`),
  KEY `customer_id` (`customer_id`),
  CONSTRAINT `Sales_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `Employees` (`employee_id`),
  CONSTRAINT `Sales_ibfk_2` FOREIGN KEY (`customer_id`) REFERENCES `Customers` (`customer_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Sales`
--

LOCK TABLES `Sales` WRITE;
/*!40000 ALTER TABLE `Sales` DISABLE KEYS */;
INSERT INTO `Sales` VALUES (1,1,1,50.00,'2023-07-24'),(2,2,3,75.00,'2023-07-14'),(3,3,2,100.00,'2023-10-18');
/*!40000 ALTER TABLE `Sales` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `VideoGameSales`
--

DROP TABLE IF EXISTS `VideoGameSales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `VideoGameSales` (
  `video_games_sales_id` int(11) NOT NULL AUTO_INCREMENT,
  `sale_id` int(11) NOT NULL,
  `video_game_id` int(11) NOT NULL,
  PRIMARY KEY (`video_games_sales_id`),
  UNIQUE KEY `video_games_sales_id` (`video_games_sales_id`),
  KEY `sale_id` (`sale_id`),
  KEY `video_game_id` (`video_game_id`),
  CONSTRAINT `VideoGameSales_ibfk_1` FOREIGN KEY (`sale_id`) REFERENCES `Sales` (`sale_id`) ON DELETE CASCADE,
  CONSTRAINT `VideoGameSales_ibfk_2` FOREIGN KEY (`video_game_id`) REFERENCES `VideoGames` (`video_game_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `VideoGameSales`
--

LOCK TABLES `VideoGameSales` WRITE;
/*!40000 ALTER TABLE `VideoGameSales` DISABLE KEYS */;
/*!40000 ALTER TABLE `VideoGameSales` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `VideoGames`
--

DROP TABLE IF EXISTS `VideoGames`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `VideoGames` (
  `video_game_id` int(11) NOT NULL AUTO_INCREMENT,
  `developer_id` int(11) NOT NULL,
  `video_game_name` varchar(45) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `quantity` int(11) NOT NULL,
  PRIMARY KEY (`video_game_id`),
  UNIQUE KEY `video_game_id` (`video_game_id`),
  KEY `developer_id` (`developer_id`),
  CONSTRAINT `VideoGames_ibfk_1` FOREIGN KEY (`developer_id`) REFERENCES `Developers` (`developer_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `VideoGames`
--

LOCK TABLES `VideoGames` WRITE;
/*!40000 ALTER TABLE `VideoGames` DISABLE KEYS */;
/*!40000 ALTER TABLE `VideoGames` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-04 19:39:33
