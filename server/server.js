'use strict';

const Hapi = require('hapi');
const routes = require('./modules/routes.js');

const server = Hapi.server({ port: 8083, routes: { cors: true } });

server.route(routes);

const init = async () => {
	await server.register(require('inert'));
	await server.start();
	console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();
