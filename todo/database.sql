-- MySQL dump 10.13  Distrib 5.7.30, for Win64 (x86_64)
--
-- Host: localhost    Database: book
-- ------------------------------------------------------
-- Server version	5.7.30-log

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
-- Table structure for table `book_info`
--

DROP TABLE IF EXISTS `book_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `book_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` char(30) NOT NULL,
  `author` char(30) NOT NULL,
  `press` char(20) NOT NULL,
  `press_time` char(10) NOT NULL,
  `price` char(10) NOT NULL,
  `rate` char(6) NOT NULL,
  `desc` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `book_info`
--

LOCK TABLES `book_info` WRITE;
/*!40000 ALTER TABLE `book_info` DISABLE KEYS */;
INSERT INTO `book_info` VALUES (1,'红楼梦','[清] 曹雪芹 著',' 人民文学出版社',' 1996-12',' 59.70','9.8','都云作者痴，谁解其中味？'),(2,'活着','余华',' 作家出版社',' 2012-8-1',' 20.00','9.4','生的苦难与伟大'),(3,'1984','[英] 乔治·奥威尔',' 北京十月文艺出版社',' 2010-4-1',' 28.00','9.4','栗树荫下，我出卖你，你出卖我'),(4,'哈利·波特','J.K.罗琳 (J.K.Rowling)',' 人民文学出版社',' 2008-12-1',' 498.00','9.7','从9¾站台开始的旅程'),(5,'三体全集','刘慈欣',' 重庆出版社',' 2012-1',' 168.00','9.5','地球往事三部曲'),(6,'百年孤独','[哥伦比亚] 加西亚·马尔克斯',' 南海出版公司',' 2011-6',' 39.50','9.3','魔幻现实主义文学代表作'),(7,'飘','[美国] 玛格丽特·米切尔',' 译林出版社',' 2000-9',' 40.00','9.3','革命时期的爱情，随风而逝'),(8,'房思琪的初恋乐园','林奕含',' 北京联合出版公司',' 2018-2',' 45.00','9.2','向死而生的文学绝唱'),(9,'动物农场','[英] 乔治·奥威尔',' 上海译文出版社',' 2007-3',' 10.00','9.3','太阳底下并无新事'),(10,'三国演义（全二册）','[明] 罗贯中',' 人民文学出版社',' 1998-05',' 39.50','9.3','是非成败转头空'),(11,'福尔摩斯探案全集（上中下）','[英] 阿·柯南道尔',' 1981-8',' 53.00','68.00','9.3','名侦探的代名词'),(12,'白夜行','[日] 东野圭吾',' 南海出版公司',' 2013-1-1',' 39.50','9.2','一宗离奇命案牵出跨度近20年步步惊心的故事'),(13,'小王子','[法] 圣埃克苏佩里',' 人民文学出版社',' 2003-8',' 22.00','9.1','献给长成了大人的孩子们'),(14,'安徒生童话故事集','（丹麦）安徒生',' 人民文学出版社',' 1997-08',' 25.00','9.2','为了争取未来的一代'),(15,'天龙八部','金庸',' 生活·读书·新知三联书店',' 1994-5',' 96.00','9.2','有情皆孽，无人不冤'),(16,'撒哈拉的故事','三毛',' 哈尔滨出版社',' 2003-8',' 15.80','9.2','游荡的自由灵魂'),(17,'呐喊','鲁迅',' 人民文学出版社',' 1973-3',' 0.36元','9.2','新文学的第一声呐喊'),(18,'杀死一只知更鸟','[美] 哈珀·李',' 译林出版社',' 2012-9',' 32.00','9.2','有一种东西不能遵循从众原则，那就是——人的良心'),(19,'悉达多','[德] 赫尔曼·黑塞',' 天津人民出版社',' 2017-1',' 32.00','9.3','空'),(20,'明朝那些事儿（1-9）','当年明月',' 中国海关出版社',' 2009-4',' 358.20','9.2','不拘一格的历史书写'),(21,'邓小平时代','【美】傅高义 (Ezra.F.Vogel)',' 生活·读书·新知三联书店',' 2013-1-18',' 88.00','9.3','个人命运背后的历史变局'),(22,'失踪的孩子','[意] 埃莱娜·费兰特',' 人民文学出版社',' 2018-7',' 62.00','9.2','我的整个生命，只是一场为了提升社会地位的低俗斗争。'),(23,'新名字的故事','[意] 埃莱娜·费兰特',' 人民文学出版社',' 2017-4',' 59.00','9.2','探索青年时代的激情、困惑、挣扎、背叛和失去'),(24,'沉默的大多数','王小波',' 中国青年出版社',' 1997-10',' 27.00','9.1','沉默是沉默者的通行证'),(25,'中国历代政治得失','钱穆',' 生活·读书·新知三联书店',' 2001',' 12.00','9.2','一部简明的“中国政治制度史”'),(26,'无纸化的书','无纸化','无纸化出版社','2222-2-222','222','22','撒阿飞撒啊啊啊啊啊');
/*!40000 ALTER TABLE `book_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `borrow_list`
--

DROP TABLE IF EXISTS `borrow_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `borrow_list` (
  `book_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `borrow_date` date NOT NULL,
  `back_date` date NOT NULL,
  PRIMARY KEY (`book_id`,`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `borrow_list`
--

LOCK TABLES `borrow_list` WRITE;
/*!40000 ALTER TABLE `borrow_list` DISABLE KEYS */;
INSERT INTO `borrow_list` VALUES (1,666666,'2023-12-18','2024-01-18'),(4,1234567,'2023-12-18','2024-01-18'),(5,1234567,'2023-12-18','2024-01-18'),(8,666666,'2023-12-15','2024-01-15');
/*!40000 ALTER TABLE `borrow_list` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `pwd` char(128) NOT NULL,
  `name` char(15) DEFAULT NULL,
  `class` char(15) DEFAULT NULL,
  `status` tinyint(3) unsigned NOT NULL DEFAULT '1' COMMENT '0为挂失,1为正常',
  `admin` tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '0为普通用户,1为管理员',
  `last_login_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (123456,'21232f297a57a5a743894a0e4a801fc3',NULL,NULL,1,1,'2023-12-18 22:39:44'),(222222,'e3ceb5881a0a1fdaad01296d7554868d','王五','网工1班',0,0,'2023-11-20 12:32:26'),(333333,'1a100d2c0dab19c4430e7d73762b3423','张三','软工1班',1,0,'2023-11-20 12:33:03'),(666666,'f379eaf3c831b04de153469d1bec345e','许思涵','计科1班',1,0,'2023-12-18 22:49:32'),(1234567,'fcea920f7412b5da7be0cf42b8c93759','小A','计科三班',1,0,'2023-12-13 15:59:32');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_suggestions`
--

DROP TABLE IF EXISTS `user_suggestions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_suggestions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `suggestion_text` text NOT NULL,
  `submission_date` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `user_suggestions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_suggestions`
--

LOCK TABLES `user_suggestions` WRITE;
/*!40000 ALTER TABLE `user_suggestions` DISABLE KEYS */;
INSERT INTO `user_suggestions` VALUES (1,222222,'我建议增加更多的计算机科学课程。','2023-12-18 14:10:00'),(2,333333,'希望能够提供更多的图书种类。','2023-12-18 14:15:00'),(3,666666,'请加强图书馆的安全措施。','2023-12-18 14:20:00'),(4,1234567,'希望能够延长图书馆的开放时间。','2023-12-18 14:25:00');
/*!40000 ALTER TABLE `user_suggestions` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-18 23:53:15
