-- MySQL dump 10.13  Distrib 8.0.20, for Win64 (x86_64)
--
-- Host: localhost    Database: lbproject
-- ------------------------------------------------------
-- Server version	8.0.20

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `author`
--

DROP TABLE IF EXISTS `author`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `author` (
  `authNo` int NOT NULL AUTO_INCREMENT,
  `authName` varchar(45) NOT NULL COMMENT '작가이름',
  `authDesc` varchar(200) DEFAULT NULL COMMENT '작가 설명',
  PRIMARY KEY (`authNo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `author`
--

LOCK TABLES `author` WRITE;
/*!40000 ALTER TABLE `author` DISABLE KEYS */;
/*!40000 ALTER TABLE `author` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `book`
--

DROP TABLE IF EXISTS `book`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `book` (
  `bookNo` int NOT NULL AUTO_INCREMENT,
  `bookTitle` varchar(100) NOT NULL,
  `pubName` varchar(45) NOT NULL COMMENT '출판사명',
  `pubDate` date NOT NULL COMMENT '출판일',
  `authNo` int NOT NULL,
  `price` int NOT NULL COMMENT '가격',
  `count` int NOT NULL COMMENT '재고',
  `selling` int NOT NULL COMMENT '판매량',
  `bookDesc` varchar(1000) NOT NULL COMMENT '책 소개글',
  `bookIndex` varchar(1000) NOT NULL COMMENT '책 목차',
  `img` varchar(500) NOT NULL COMMENT '책 표지 이미지 파일 경로',
  `content` varchar(500) NOT NULL COMMENT '책 내용 이미지 파일 경로',
  `ctgNo` int NOT NULL,
  `ISBN` int DEFAULT NULL COMMENT 'ISBN 번호',
  `page` int NOT NULL COMMENT '총 쪽수',
  `size` varchar(100) DEFAULT NULL COMMENT '책 크기',
  PRIMARY KEY (`bookNo`),
  KEY `fk_book_author1_idx` (`authNo`),
  KEY `fk_book_category1_idx` (`ctgNo`),
  CONSTRAINT `fk_book_author1` FOREIGN KEY (`authNo`) REFERENCES `author` (`authNo`),
  CONSTRAINT `fk_book_category1` FOREIGN KEY (`ctgNo`) REFERENCES `category` (`ctgNo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `book`
--

LOCK TABLES `book` WRITE;
/*!40000 ALTER TABLE `book` DISABLE KEYS */;
/*!40000 ALTER TABLE `book` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `cartNo` int NOT NULL AUTO_INCREMENT,
  `cartCnt` varchar(45) NOT NULL COMMENT '장바구니에 담은 수량',
  `bookNo` int NOT NULL,
  `userNo` int NOT NULL,
  PRIMARY KEY (`cartNo`),
  KEY `fk_cart_book1_idx` (`bookNo`),
  KEY `fk_cart_user1_idx` (`userNo`),
  CONSTRAINT `fk_cart_book1` FOREIGN KEY (`bookNo`) REFERENCES `book` (`bookNo`),
  CONSTRAINT `fk_cart_user1` FOREIGN KEY (`userNo`) REFERENCES `user` (`userNo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `ctgNo` int NOT NULL COMMENT '소설 100 \n...\n...\n',
  `ctgName` varchar(100) NOT NULL COMMENT '카테고리명',
  `ctgUp` varchar(45) NOT NULL COMMENT '상위 카테고리',
  PRIMARY KEY (`ctgNo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event`
--

DROP TABLE IF EXISTS `event`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event` (
  `eventNo` int NOT NULL AUTO_INCREMENT,
  `view` int NOT NULL COMMENT '조회수',
  `evTitle` varchar(200) NOT NULL,
  `evContent` varchar(1000) NOT NULL COMMENT '이벤트 소개 글',
  `evDate` datetime NOT NULL COMMENT '이벤트 작성일',
  `evImg` varchar(1000) DEFAULT NULL COMMENT '이벤트 소개 이미지',
  PRIMARY KEY (`eventNo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event`
--

LOCK TABLES `event` WRITE;
/*!40000 ALTER TABLE `event` DISABLE KEYS */;
/*!40000 ALTER TABLE `event` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `like`
--

DROP TABLE IF EXISTS `like`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `like` (
  `likeNo` int NOT NULL AUTO_INCREMENT,
  `bookNo` int NOT NULL,
  `userNo` int NOT NULL,
  PRIMARY KEY (`likeNo`),
  KEY `fk_like_book1_idx` (`bookNo`),
  KEY `fk_like_user1_idx` (`userNo`),
  CONSTRAINT `fk_like_book1` FOREIGN KEY (`bookNo`) REFERENCES `book` (`bookNo`),
  CONSTRAINT `fk_like_user1` FOREIGN KEY (`userNo`) REFERENCES `user` (`userNo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `like`
--

LOCK TABLES `like` WRITE;
/*!40000 ALTER TABLE `like` DISABLE KEYS */;
/*!40000 ALTER TABLE `like` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notice`
--

DROP TABLE IF EXISTS `notice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notice` (
  `noticeNo` int NOT NULL AUTO_INCREMENT,
  `ntTitle` varchar(100) NOT NULL,
  `ntContent` varchar(1000) NOT NULL COMMENT '공지사항 글',
  `ntView` int NOT NULL COMMENT '공지사항 조회수',
  `ntDate` datetime NOT NULL COMMENT '공지사항 ',
  `ntImg` varchar(1000) DEFAULT NULL COMMENT '공지사항 이미지',
  PRIMARY KEY (`noticeNo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notice`
--

LOCK TABLES `notice` WRITE;
/*!40000 ALTER TABLE `notice` DISABLE KEYS */;
/*!40000 ALTER TABLE `notice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `outuser`
--

DROP TABLE IF EXISTS `outuser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `outuser` (
  `outDate` date NOT NULL COMMENT '탈퇴 신청일로부터 3개월 뒤',
  `userNo` int NOT NULL COMMENT '외래키+주키',
  PRIMARY KEY (`userNo`),
  KEY `fk_outuser_user_idx` (`userNo`),
  CONSTRAINT `fk_outuser_user` FOREIGN KEY (`userNo`) REFERENCES `user` (`userNo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `outuser`
--

LOCK TABLES `outuser` WRITE;
/*!40000 ALTER TABLE `outuser` DISABLE KEYS */;
/*!40000 ALTER TABLE `outuser` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `qna`
--

DROP TABLE IF EXISTS `qna`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `qna` (
  `qnaNo` int NOT NULL AUTO_INCREMENT,
  `qnaTitle` varchar(45) NOT NULL,
  `qnaContent` varchar(1000) NOT NULL,
  `qnaDate` datetime NOT NULL,
  `qnaAnswer` varchar(1000) DEFAULT NULL,
  `userNo` int NOT NULL,
  PRIMARY KEY (`qnaNo`),
  KEY `fk_qna_user1_idx` (`userNo`),
  CONSTRAINT `fk_qna_user1` FOREIGN KEY (`userNo`) REFERENCES `user` (`userNo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `qna`
--

LOCK TABLES `qna` WRITE;
/*!40000 ALTER TABLE `qna` DISABLE KEYS */;
/*!40000 ALTER TABLE `qna` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `review` (
  `reviewNo` int NOT NULL AUTO_INCREMENT,
  `comment` varchar(200) NOT NULL COMMENT '책 리뷰',
  `sp` float NOT NULL COMMENT '별점',
  `reDate` varchar(45) NOT NULL COMMENT '리뷰 작성 날짜',
  `userNo` int NOT NULL,
  `bookNo` int NOT NULL,
  PRIMARY KEY (`reviewNo`),
  KEY `fk_review_user1_idx` (`userNo`),
  KEY `fk_review_book1_idx` (`bookNo`),
  CONSTRAINT `fk_review_book1` FOREIGN KEY (`bookNo`) REFERENCES `book` (`bookNo`),
  CONSTRAINT `fk_review_user1` FOREIGN KEY (`userNo`) REFERENCES `user` (`userNo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review`
--

LOCK TABLES `review` WRITE;
/*!40000 ALTER TABLE `review` DISABLE KEYS */;
/*!40000 ALTER TABLE `review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `selling`
--

DROP TABLE IF EXISTS `selling`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `selling` (
  `sellNo` int NOT NULL AUTO_INCREMENT,
  `sellDate` date NOT NULL,
  `amount` int NOT NULL COMMENT '판매 수량',
  `bookNo` int NOT NULL,
  PRIMARY KEY (`sellNo`),
  KEY `fk_selling_book1_idx` (`bookNo`),
  CONSTRAINT `fk_selling_book1` FOREIGN KEY (`bookNo`) REFERENCES `book` (`bookNo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `selling`
--

LOCK TABLES `selling` WRITE;
/*!40000 ALTER TABLE `selling` DISABLE KEYS */;
/*!40000 ALTER TABLE `selling` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `userNo` int NOT NULL AUTO_INCREMENT,
  `lolginId` varchar(45) NOT NULL COMMENT '로그인아이디',
  `pwd` varchar(45) NOT NULL COMMENT '비밀번호',
  `userName` varchar(45) NOT NULL,
  `bthDate` date DEFAULT NULL COMMENT '생년월일',
  `email` varchar(45) NOT NULL,
  `postNum` int NOT NULL COMMENT '우편번호',
  `address` varchar(255) NOT NULL,
  `phoneNum` varchar(11) NOT NULL COMMENT '핸드폰번호',
  `profile` varchar(500) NOT NULL COMMENT '프로필 이미지\n사용자가 null 입력 시 기본 이미지로',
  `regDate` date NOT NULL COMMENT '등록날짜',
  `outDate` date DEFAULT NULL,
  `usercol` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`userNo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-13 16:57:16
