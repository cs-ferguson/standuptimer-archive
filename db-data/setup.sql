/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

/*GRANT ALL ON sut_db.* TO 'user'@'%';*/

USE sut_db;
DROP TABLE IF EXISTS `team`;

CREATE TABLE `team` (
  `uid` int(3) NOT NULL AUTO_INCREMENT,
  `name` varchar(128) NOT NULL,
	`audio` varchar(128) DEFAULT NULL,
	`background` varchar(512) DEFAULT NULL,
	`video` varchar(512) DEFAULT NULL,
	PRIMARY KEY (uid)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO team (name, audio, background) VALUES ('McTesterson', 'mctesterson', 'https://assets.teenvogue.com/photos/57364392a57ac7fa6b49c398/master/w_757,c_limit/seth-cohen-5.gif');
INSERT INTO team (name, audio, video) VALUES ('Person 2','person 2','https://s3-eu-west-1.amazonaws.com/cfergo/coutts.mp4');
INSERT INTO team (name, audio) VALUES ('Person 3','person 3');
INSERT INTO team (name, audio) VALUES ('Person 4','person 4');
INSERT INTO team (name, audio) VALUES ('Person 5','person 5');


/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
