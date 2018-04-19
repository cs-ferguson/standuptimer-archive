const secrets = require('./secrets.js');

module.exports = {
	"voicerss_url": secrets.get('VOICERSS_URL') || process.env.VOICERSS_URL,
	"mysqluser_pw": secrets.get('MYSQLUSER_PW') || process.env.MYSQLUSER_PW
}
