-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: management_booking
-- ------------------------------------------------------
-- Server version	8.4.0

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
-- Table structure for table `account`
--

DROP TABLE IF EXISTS `account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `account` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userName` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `score` int DEFAULT '0',
  `password` varchar(255) NOT NULL,
  `role` tinyint NOT NULL,
  `phoneNumber` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account`
--

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
INSERT INTO `account` VALUES (2,'admin','admin@gmail.com',1000,'$2b$10$5lDLnOF0ZXAhBo8pr3ySnOqnndvdH8v4lQm7UWJcByeeSoQWbIMuW',0,'123456'),(5,'ádsadsad','ádasdsad',123123,'$2b$10$NXz3TtiGv/3/72nQz80UnuUd8PFOwG/ZbWxcqkg58t9DSZD5d2H96',1,'1234562'),(6,'Nhatdeptrai','Nhatdeptrai@gmail.com',0,'$2b$10$cvf7QAxVfFoSdfRSb8b.2OKuKsbjS5ZKM2AeVNlP3oL5xaoHwJAr6',2,'123456'),(8,'áddasdasdasd','hehebo2i@gmail.com',1000,'$2b$10$eeVYuvHeY0sXMKyFbf14k./zcnZYVeQtVsVbDZauB3A1wrDg.GDMG',1,'123456'),(9,'DOI-NO-NHAT','225688966nhat@gmail.com',123123123,'$2b$10$o3ryFgyk1SBm/lAtrQ9jrex4c7QrNaCNnZTc1fLpPvY3UAW8WNkFO',1,'123456'),(10,'taikhoanmoitao','new@gmail.com',0,'$2b$10$NOUqlZyxcWtVKhqDasPnle6584lvcxVJJBwq0kxDTH7vXknXz8J6m',2,'123456');
/*!40000 ALTER TABLE `account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `booking`
--

DROP TABLE IF EXISTS `booking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `booking` (
  `id` int NOT NULL AUTO_INCREMENT,
  `bookingName` varchar(100) NOT NULL,
  `userIdBooking` int NOT NULL,
  `bookingPhone` varchar(20) NOT NULL,
  `checkInDate` date NOT NULL,
  `checkOutDate` date NOT NULL,
  `bookingRoomId` int DEFAULT NULL,
  `bookingStatus` tinyint DEFAULT '0',
  `paymentStatus` int DEFAULT '0',
  `paymentMethod` int DEFAULT '0',
  `surcharge` decimal(10,2) DEFAULT '0.00',
  `totalFee` decimal(20,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `bookingRoomId` (`bookingRoomId`),
  KEY `userIdBooking` (`userIdBooking`),
  CONSTRAINT `booking_ibfk_1` FOREIGN KEY (`bookingRoomId`) REFERENCES `rooms` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `booking_ibfk_2` FOREIGN KEY (`userIdBooking`) REFERENCES `account` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `booking`
--

LOCK TABLES `booking` WRITE;
/*!40000 ALTER TABLE `booking` DISABLE KEYS */;
/*!40000 ALTER TABLE `booking` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hotel`
--

DROP TABLE IF EXISTS `hotel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hotel` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `rating` decimal(2,1) DEFAULT '0.0',
  `description` text,
  `totalRooms` int DEFAULT '0',
  `reviewScore` decimal(2,1) DEFAULT '0.0',
  `image` text,
  `createdDate` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedDate` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hotel`
--

LOCK TABLES `hotel` WRITE;
/*!40000 ALTER TABLE `hotel` DISABLE KEYS */;
INSERT INTO `hotel` VALUES (1,'khách sạn 2 3','Quận 1',5.0,'ádasdasdasdasd',100,5.0,'4508135a-0465-4612-b6b5-042f61de964b.webp','2024-10-17 10:02:03','2024-10-26 16:39:30'),(2,'Tsadasdasd','Quận 1',5.0,NULL,500000,5.0,'d121024c-0c59-4d92-8890-38cf71f7876f.jfif','2024-10-17 10:03:58','2024-10-24 14:32:17'),(5,'khach san 1','sádasd',1.0,NULL,123,2.0,'1c5ef060-89d9-44b2-855c-6d344c7ddd97.jpg','2024-10-17 17:38:27','2024-10-24 14:32:25'),(6,'khách sạn 1','hcm',5.0,'sadasdasd',100,5.0,'ef623fac-6f1c-44d7-9bed-2cfc0332f9d5.jfif','2024-10-24 15:06:52','2024-10-24 15:06:52');
/*!40000 ALTER TABLE `hotel` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `news`
--

DROP TABLE IF EXISTS `news`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `news` (
  `id` int NOT NULL AUTO_INCREMENT,
  `topic` varchar(100) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `newsImage` text,
  `description` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `news`
--

LOCK TABLES `news` WRITE;
/*!40000 ALTER TABLE `news` DISABLE KEYS */;
/*!40000 ALTER TABLE `news` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `promotions`
--

DROP TABLE IF EXISTS `promotions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `promotions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `discount` decimal(5,2) NOT NULL,
  `description` text,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `createdDate` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedDate` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `promotions`
--

LOCK TABLES `promotions` WRITE;
/*!40000 ALTER TABLE `promotions` DISABLE KEYS */;
INSERT INTO `promotions` VALUES (1,'ádasdas',20.00,'ádasdasd','2024-10-03','2024-10-26','2024-10-19 16:41:46','2024-10-19 16:43:16');
/*!40000 ALTER TABLE `promotions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `room_promotions`
--

DROP TABLE IF EXISTS `room_promotions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `room_promotions` (
  `roomId` int NOT NULL,
  `promotionId` int NOT NULL,
  PRIMARY KEY (`roomId`,`promotionId`),
  KEY `fk_room_promotion_promotion` (`promotionId`),
  CONSTRAINT `fk_room_promotion_promotion` FOREIGN KEY (`promotionId`) REFERENCES `promotions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_room_promotion_room` FOREIGN KEY (`roomId`) REFERENCES `rooms` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room_promotions`
--

LOCK TABLES `room_promotions` WRITE;
/*!40000 ALTER TABLE `room_promotions` DISABLE KEYS */;
INSERT INTO `room_promotions` VALUES (13,1),(14,1);
/*!40000 ALTER TABLE `room_promotions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `room_services`
--

DROP TABLE IF EXISTS `room_services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `room_services` (
  `roomId` int NOT NULL,
  `serviceId` int NOT NULL,
  PRIMARY KEY (`roomId`,`serviceId`),
  KEY `fk_room_service_service` (`serviceId`),
  CONSTRAINT `fk_room_service_room` FOREIGN KEY (`roomId`) REFERENCES `rooms` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_room_service_service` FOREIGN KEY (`serviceId`) REFERENCES `services` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room_services`
--

LOCK TABLES `room_services` WRITE;
/*!40000 ALTER TABLE `room_services` DISABLE KEYS */;
INSERT INTO `room_services` VALUES (13,1),(14,1),(13,2),(14,2);
/*!40000 ALTER TABLE `room_services` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rooms`
--

DROP TABLE IF EXISTS `rooms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rooms` (
  `id` int NOT NULL AUTO_INCREMENT,
  `image` text,
  `price` bigint DEFAULT NULL,
  `description` text,
  `location` varchar(100) DEFAULT NULL,
  `roomtypeId` int DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `hotelId` int DEFAULT NULL,
  `createdDate` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedDate` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `roomtypeId` (`roomtypeId`),
  KEY `hotelId` (`hotelId`),
  CONSTRAINT `rooms_ibfk_1` FOREIGN KEY (`roomtypeId`) REFERENCES `roomtypes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `rooms_ibfk_2` FOREIGN KEY (`hotelId`) REFERENCES `hotel` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rooms`
--

LOCK TABLES `rooms` WRITE;
/*!40000 ALTER TABLE `rooms` DISABLE KEYS */;
INSERT INTO `rooms` VALUES (13,'75bb1c4f-5721-4230-a058-20438bbe4afd.jpg',123213,'ádasd','Quận 1',5,'Phòng 1',2,'2024-10-19 17:20:54','2024-10-25 09:23:32'),(14,'b1fab667-9646-430a-9fd7-9ca15524fafc.jpg',100000,'ádasdasd','Quận 1',5,'Phòng 2',1,'2024-10-22 10:59:15','2024-10-25 09:23:53');
/*!40000 ALTER TABLE `rooms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roomtypes`
--

DROP TABLE IF EXISTS `roomtypes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roomtypes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` varchar(100) DEFAULT NULL,
  `createdDate` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedDate` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roomtypes`
--

LOCK TABLES `roomtypes` WRITE;
/*!40000 ALTER TABLE `roomtypes` DISABLE KEYS */;
INSERT INTO `roomtypes` VALUES (5,'ádsadas','dsadasd','2024-10-19 15:34:12','2024-10-19 15:34:12'),(6,'ádasdasd','ádasd','2024-10-26 16:39:40','2024-10-26 16:39:40');
/*!40000 ALTER TABLE `roomtypes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `services`
--

DROP TABLE IF EXISTS `services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `services` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text,
  `icon` varchar(255) DEFAULT NULL,
  `createdDate` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedDate` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `services`
--

LOCK TABLES `services` WRITE;
/*!40000 ALTER TABLE `services` DISABLE KEYS */;
INSERT INTO `services` VALUES (1,'vòi sen','đá','đá','2024-10-19 16:23:10','2024-10-19 16:24:18'),(2,'Bãi đỗ xe','ádsad','ádsad','2024-10-22 10:52:20','2024-10-22 10:52:20');
/*!40000 ALTER TABLE `services` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-30 14:05:54
