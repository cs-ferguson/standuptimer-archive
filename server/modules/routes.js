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

				pool.query('SELECT * FROM team', function(err, results){
					if (err) {
						console.log(err);
					};

					resolve(results);
				});
			});

			return peeps;

		}
	},
	{
		method: 'GET',
		path: '/member/{uid}',
		handler: (req, h) => {

			let uid = encodeURIComponent(req.params.uid);

			let member = new Promise (function (resolve, reject) {

				pool.query('SELECT * FROM team WHERE uid = ?', [uid], function(err, results){
					if (err) {
						console.log(err);
					};

					resolve(results);
				});
			});

			return member;
		}
	},
	{
		method: 'POST',
		path: '/member/{details}',
		handler: (req, h) => {

			let teammember = encodeURIComponent(req.params.details);

			console.log('test');
			console.log(teammember);
			return teammember;

		}
	},
	{
		method: 'GET',
		path: '/audio/{audio}',
		handler: function (req, h) {

			let phrase = encodeURIComponent(req.params.audio);

			let getFile = new Promise( function(resolve, reject) {
				let stream = request.get('http://api.voicerss.org/?key=' + config.voicerss_key + '&hl=en-us&src=' + phrase)
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
