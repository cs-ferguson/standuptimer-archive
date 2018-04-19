const config = require('./config.js');
const mysql = require('mysql');

const pool = mysql.createPool({
	connectionLimit: 50,
	host: 'db',
	user: 'user',
	password: config.mysqluser_pw,
	database: 'sut_db'
})

module.exports = pool;
