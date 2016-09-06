'use strict';
// encodeURIComponent() = 한글 버그시 사용

const Hapi = require('hapi');
const handlers = {
    wiki: require(`${___dirname}/routes/wiki`)
}

const server = new Hapi.Server();
server.register(require('vision'), (err) => {
    Hoek.assert(!err, err); // 나름대로 에러 방지

    server.views({
        engines: {
            html: require('pug')
        },
        relativeTo: __dirname,
        path: 'views'
    });

    server.connection({ port: process.env.PORT || 3000 });
    server.route({ method: 'GET', path: '/', handler: handlers.wiki.root }); // 대문으로 가게 설정
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