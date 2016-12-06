'use strict';
// encodeURIComponent() = 한글 버그시 사용

const Hapi = require('hapi');
const Inert = require('inert');
const Hoek = require('hoek');
const mongoose = require('mongoose');
const setting = require(`${__dirname}/setting`)
const util = require(`${__dirname}/utils/util`)

const handlers = {
    wiki: require(`${__dirname}/routes/wiki`),
    setup: require(`${__dirname}/routes/setup`)
}

const server = new Hapi.Server({
    debug: {
        request: ['error']
    }
});

var db = mongoose.connection;
db.on('error', function(err) {
    console.error(err);
    process.exit(1)
});
db.once('open', function(){
    mongoose.Promise = global.Promise;
    // CONNECTED TO MONGODB SERVER
    console.log("Connected to mongod server");
});
mongoose.connect(setting.mongoUrl);

function mainHandler(err) {
    Hoek.assert(!err, err); // 나름대로 에러 방지
    server.views({
        engines: {
            pug: require('pug')
        },
        relativeTo: __dirname,
        path: 'views'
    }); // Pug(Jade) 사용

    server.connection({ port: process.env.PORT || 3000 });

    server.route(util.directoryRoute(`${__dirname}/public`, '/public/{param*}'))
    server.route(util.directoryRoute(`${__dirname}/bower_components`))

    // 위키 기본 기능
    server.route([
        { method: 'GET', path: '/', handler: handlers.wiki.root }, // 대문으로 가게 설정 또는 설치 화면
        { method: 'GET', path: '/w/{name}', handler: handlers.wiki.view }, // 문서 보기
        { method: 'GET', path: '/edit/{name}', handler: handlers.wiki.edit }, // 문서 편집
        { method: 'POST', path: '/edit/{name}', handler: handlers.wiki.edited }, // 편집 완료 후 핸들러
        { method: 'GET', path: '/history/{name}', handler: handlers.wiki.history }, // 역사보기
        { method: 'GET', path: '/search', handler}
    ]);

    // 설치
    server.route([
        { method: 'GET', path: '/setup', handler: handlers.setup.root },
        { method: 'POST', path: '/setup', handler: handlers.setup.begin }
    ]);

    server.start((err) => {
        if (err) {
            throw err;
        }
        console.log(`Server running at: ${server.info.uri}`);
    })
}

server.register(require('vision'), (err) => {
    Hoek.assert(!err, err); // 나름대로 에러 방지   
    server.register(require('inert'), mainHandler);
});