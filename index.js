'use strict';

const Hapi = require('hapi');
const Path = require('path');

const server = Hapi.server({
    address: '127.0.0.1',
    port: 8080,
    routes: {
        files: {
            relativeTo: Path.join(__dirname, 'public')
        }
    }
});

const start = async () => {

    await server.register(require('inert'));

    server.route({
        method: 'GET',
        path: '/downloads/sync/{fileName}',
        handler: function (request, h) {
            return h.file(request.params.fileName);
        }
    });

    await server.start();

    console.log('Server running at: http://127.0.0.1:8080');
};

start();