const secrets = require('./secrets.js');

module.exports = {
	"mysqluser_pw": secrets.get('MYSQLUSER_PW') || process.env.MYSQLUSER_PW
}
