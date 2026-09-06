-- MySQL dump 10.13  Distrib 5.6.16, for Linux (i686)
--
-- Host: localhost    Database: mvc
-- ------------------------------------------------------
-- Server version	5.6.16

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Dumping data for table `ciudades`
--

LOCK TABLES `ciudades` WRITE;
/*!40000 ALTER TABLE `ciudades` DISABLE KEYS */;
INSERT INTO `ciudades` VALUES (6,3,'Tercera Ciudad'),(5,3,'Segunda Ciudad'),(4,3,'Primera Ciudad'),(3,2,'Segunda Ciudad'),(2,2,'Primera Ciudad'),(1,1,'Primera Ciudad');
/*!40000 ALTER TABLE `ciudades` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `comunas`
--

LOCK TABLES `comunas` WRITE;
/*!40000 ALTER TABLE `comunas` DISABLE KEYS */;
INSERT INTO `comunas` VALUES (4,3,'Primera Comuna'),(3,2,'Primera Comuna'),(2,1,'Segunda Comuna'),(1,1,'Primera Comuna');
/*!40000 ALTER TABLE `comunas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `menus`
--

LOCK TABLES `menus` WRITE;
/*!40000 ALTER TABLE `menus` DISABLE KEYS */;
INSERT INTO `menus` VALUES (1,'Inicio','Inicio de las');
/*!40000 ALTER TABLE `menus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (2,'titulo2','cuerpo2           \r\n        '),(10,'titulo10','cuerpo10'),(12,'titulo12','cuerpo12'),(15,'ddddd','ssdddd'),(16,'titulo13','wdwdd'),(17,'titulo13','efedfde'),(18,'titulo18','cuerpo18'),(19,'prueba','prueba');
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `regiones`
--

LOCK TABLES `regiones` WRITE;
/*!40000 ALTER TABLE `regiones` DISABLE KEYS */;
INSERT INTO `regiones` VALUES (1,'Primera Region'),(3,'Tercera Region'),(2,'Segunda Region');
/*!40000 ALTER TABLE `regiones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'nombre1','admin','bf6148185ebd3e2f9cb3280cf2aa161135218047','admin@localhost.com','admin',1,'0000-00-00 00:00:00'),(2,'usuario1','usuario1','bf6148185ebd3e2f9cb3280cf2aa161135218047','usuario1@localhost.com','usuario',1,'2014-07-11 23:23:09'),(3,'usuario2','usuario2','bf6148185ebd3e2f9cb3280cf2aa161135218047','usuario2@localhost.com','usuario',1,'2014-07-11 23:25:58'),(4,'usuario3','usuario3','bf6148185ebd3e2f9cb3280cf2aa161135218047','usuario3@localhost.com','usuario',1,'2014-07-12 00:13:06'),(5,'Luis','lbastidassssss','12345678','lbastidas@mail.com','usuario',1,'2014-07-12 00:13:06');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2014-07-25 10:19:21
