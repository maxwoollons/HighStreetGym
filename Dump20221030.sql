CREATE DATABASE  IF NOT EXISTS `gymweb` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `gymweb`;
-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: localhost    Database: gymweb
-- ------------------------------------------------------
-- Server version	8.0.28

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `bookings`
--

DROP TABLE IF EXISTS `bookings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookings` (
  `booking_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `session_id` int DEFAULT NULL,
  PRIMARY KEY (`booking_id`),
  KEY `fk_bookings_users_idx` (`user_id`),
  KEY `fk_bookings_sessions_idx` (`session_id`),
  CONSTRAINT `fk_bookings_sessions` FOREIGN KEY (`session_id`) REFERENCES `sessions` (`session_id`),
  CONSTRAINT `fk_bookings_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookings`
--

LOCK TABLES `bookings` WRITE;
/*!40000 ALTER TABLE `bookings` DISABLE KEYS */;
INSERT INTO `bookings` VALUES (47,3,1),(48,3,2),(49,3,7),(50,3,8),(51,3,6),(52,3,17);
/*!40000 ALTER TABLE `bookings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `post_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `title` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`post_id`),
  KEY `fk_posts_users_idx` (`user_id`),
  CONSTRAINT `fk_posts_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (1,1,'Hello this is the first blog post','1st post'),(2,1,'this is blogpost 2','2nd post'),(3,1,'Blogpost 3','3rd post'),(4,1,'Blogpost 4 i think','4th post'),(5,2,'I need some sort of helpI need some sort of helpI need some sort of help','Help required'),(6,NULL,'sadasdasdasd','asdasd'),(7,NULL,'sadasdasdasd','asdasd'),(9,3,'Hello my name is joe blow and today i will be talking about my really bad maccas addiction and how much i love to eat kfc. KFC is so damn good i love kfc i love kfc i love kfc\n\nThanks for listenting kfc is good.','Last Blog'),(10,3,'Hello my name is joe blow and today i will be talking about my really bad maccas addiction and how much i love to eat kfc. KFC is so damn good i love kfc i love kfc i love kfc\n\nThanks for listenting kfc is good.','Last Blog');
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `session_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `date` date DEFAULT NULL,
  `time` varchar(55) DEFAULT NULL,
  `session_name` varchar(45) DEFAULT NULL,
  `max_space` varchar(45) DEFAULT NULL,
  `booked` int DEFAULT '0',
  PRIMARY KEY (`session_id`),
  KEY `fk_sessions_user_idx` (`user_id`),
  CONSTRAINT `fk_sessions_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES (1,3,'2022-10-30','10:30','Cross Fit','32',1),(2,9,'2022-10-30','14:00','Running Class','20',1),(3,NULL,'2022-10-31','13:30','Running Test',NULL,0),(4,NULL,'2022-10-31','13:30','Running Test','50',0),(5,NULL,'2022-10-30','00:00','asasasasasasasas','10',0),(6,3,'2022-10-31','00:00','asasasasasasasas','10',1),(7,9,'2022-10-30','02:59','SessionName','20',1),(8,3,'2022-10-31','00:58','Stong Mucles ','30',1),(15,3,'2022-10-21','12:30','Delete Me','24',0),(17,3,'2022-11-01','01:40','Running','58',1);
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `password` varchar(500) DEFAULT NULL,
  `role` varchar(45) DEFAULT NULL,
  `created` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Max','jack@gmail.com','password1','admin','2022-10-03 13:57:29'),(2,'Joe',NULL,'$2a$06$y5Pc607L5/Yn91Lo28STIeu.E12KiSBcC2XPNjWgmwp3dwAfNe6HG','user','2022-10-03 13:57:29'),(3,'Josh','maxwoollons@outlook.com','$2a$06$8jdeyLkQ53VPpg3U5kFMduP77z8Td.FJc6HiUyJSzA2B88oSGnZHq','admin','2022-09-03 13:57:29'),(4,'Jim','a','$2a$06$fHF0iuz3e.SoJjHDPEnLDO5.A3uTtfaAAMBItuRC5LPfmt9yr5dKa','user','2022-10-03 13:57:29'),(5,'Mike','john@gmail.com','$2a$06$0ZuyrhiVH3IjTqr0YvJ1UuYlijp.cyRMikPobJrSS3hoINTK6U.Iy','user','2022-10-05 15:51:46'),(6,'Sam','john@gmail.com','$2a$06$Gd1j.q7Ca2KLMl1YFnK.RexnUZbTCVk4Lw95SZC2Q5YOv0A16Lzq2','user','2022-10-05 10:52:15'),(7,'Tam','john@gmail.com','$2a$06$aguo16RAeMIpXk0Ea6UjyulXUaOxcZThTb8VhlN4dwzJB.Zy7uoO2','user','2022-10-05 10:52:17'),(8,'Will','john@gmail.com','$2a$06$a.B3PlF79.gDlVHUQ5WCu.UszO4DYvziDrJj329hse0rrGnc/HpF2','user','2022-10-05 10:52:19'),(9,'Cassie','sdajsdajksdh@gmail.com','$2a$06$whueu7NkyItRHp0nMRApA.TV9H7hZ6iU84QpK.fkahqywaNE9Q1H2','admin','2022-10-05 13:42:40'),(10,'Elise','sdajsdjsdh@gmail.com','$2a$06$pXfVmpf3tKGBWcEtbTQxpuuNbkQNqsoJv2sz6qzw8RIDPdK12AV2S','user','2022-10-05 13:48:48'),(11,'John','maxwoollons@gmail.com','$2a$06$VKKcmQaDIlJUl2ArFE3Uduhf3VJVFXoewDU.ImOQq3q6AdmK1hN.a','user','2022-10-10 12:00:24'),(12,'Veronica','woollons@gmail.com','$2a$06$OKqd4S4uPc8RFfHDKEUne.3GAj.TlornSFu8JGYK143MP5WdDgHSS','user','2022-10-28 14:16:32');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-10-30 21:58:26
