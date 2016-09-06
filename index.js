'use strict';
// encodeURIComponent() = 한글 버그시 사용

const Hapi = require('hapi');
const handlers = {
    wiki: require(`${___dirname}/routes/wiki`)
}

const server = new Hapi.Server();
server.register(require('vision'), (err) => {
    Hoek.assert(!err, err);

    server.views({
        engines: {
            html: require('handlebars')
        },
        relativeTo: __dirname,
        path: 'templates'
    });
    server.connection({ port: process.env.PORT || 3000 });
    server.route({ 
        method: 'GET',
        path: '/',
        handler: function (request, reply) {
            reply('Hello, world!');
        }
    });
    server.route({
        method: 'GET',
        path: '/{name}',
        handler: function (request, reply) {
            reply('Hello, ' + request.params.name + '!');
        }
    });
    server.start((err) => {
        if (err) {
            throw err;
        }
        console.log(`Server running at: ${server.info.uri}`);
    });
});