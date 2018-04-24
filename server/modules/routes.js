const request = require('request');
const fs = require('fs');
const config = require('./config.js');
const pool = require('./mysqlpool.js');

module.exports = [
	{
		method: 'GET',
		path: '/peeps',
		handler: (request, h) => {

			let peeps = new Promise (function (resolve, reject) {

				pool.query('SELECT * FROM test_table', function(err, results){
					if (err) throw err;

					resolve(results);
				});
			});

			return peeps;

		}
	},
	{
		method: 'GET',
		path: '/audio/{audio}',
		handler: function (req, h) {

			let phrase = encodeURIComponent(req.params.audio);

			let getFile = new Promise( function(resolve, reject) {
				let stream = request.get(config.voicerss_url + phrase)
				.on('error', function(e){
					console.log(e);
					resolve(e);
				})
				.pipe(fs.createWriteStream('tmp/'+phrase+'.mp3'));

				stream.on('finish', function() {
					let audio = h.file('tmp/'+phrase+'.mp3');
					resolve(audio);
				})
			});

			return getFile;
		}
	}
]
