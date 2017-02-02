'use strict';
// encodeURIComponent() = 한글 버그시 사용

const Hapi = require('hapi');
const Inert = require('inert');
const Hoek = require('hoek');
const mongoose = require('mongoose');
const setting = require(`${__dirname}/setting`)
const util = require(`${__dirname}/utils/util`)
const auth_vaildate = require(`${__dirname}/utils/authVaildate`)

const handlers = {
    wiki: require(`${__dirname}/routes/wiki`),
    setup: require(`${__dirname}/routes/setup`),
    auth: require(`${__dirname}/routes/auth`)
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

    server.register(require('vision'), (err) => {
        Hoek.assert(!err, err); // 나름대로 에러 방지   
        server.register(require('hapi-auth-jwt2'), (err) => {
            Hoek.assert(!err, err)
            server.register(require('inert'), mainHandler)
        });
    });
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

    server.auth.strategy('jwt-auth', 'jwt', { 
        key: setting.key,          // Never Share your secret key 
        validateFunc: auth_validate,            // validate function defined above 
        verifyOptions: { algorithms: [ 'HS256' ] } // pick a strong algorithm 
    });

    server.route(util.directoryRoute(`${__dirname}/public`, '/public/{param*}'))
    server.route(util.directoryRoute(`${__dirname}/bower_components`))

    // 위키 기본 기능
    server.route([
        { method: 'GET', path: '/', handler: handlers.wiki.root }, // 대문으로 가게 설정 또는 설치 화면
        { method: 'GET', path: '/w/{name}', handler: handlers.wiki.view }, // 문서 보기
        { method: 'GET', path: '/edit/{name}', handler: handlers.wiki.edit }, // 문서 편집
        { method: 'POST', path: '/edit/{name}', handler: handlers.wiki.edited, auth: util.auth('try') }, // 편집 완료 후 핸들러
        { method: 'GET', path: '/history/{name}', handler: handlers.wiki.history }, // 역사보기
//        { method: 'GET', path: '/search', handler}
    ]);

    // 설치
    server.route([
        { method: 'GET', path: '/setup', handler: handlers.setup.root },
        { method: 'POST', path: '/setup', handler: handlers.setup.begin }
    ]);

    server.route([
        { method: 'GET', path: '/signin', handler: handlers.auth.signin, auth: util.auth('try') },
        { method: 'GET', path: '/signout', handler: handlers.auth.signout, auth: util.auth() },
        { method: 'GET', path: '/register', handler: handlers.auth.register, auth: util.auth('try') }
    ])

    server.start((err) => {
        if (err) {
            throw err;
        }
        console.log(`Server running at: ${server.info.uri}`);
    })
}
