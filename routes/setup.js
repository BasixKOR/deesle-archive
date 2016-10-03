'use strict';

const Hoek = require('hoek');
const mongoose = require('mongoose');
const jsonfile = require('jsonfile');
const Doc = require(`${__dirname}/../utils/schema/Doc`)
const User = require(`${__dirname}/../utils/schema/User`)
const setting = require(`${__dirname}/../setting`)

module.exports = {
    // GET /setup/ == 설치 시작 페이지로 이동
    "root": function(request, reply) {
        if(setting.needSetup) {
            return reply.view('setup', {
                pagename: "deesle 설치"
            })
        } else {
            reply('이미 설치되었습니다.').redirect().location('')
        }
    },
    "begin": function(request, reply) {
        let config = { needSetup: false }
        let data = request.params
        User.remove({}, function(err) { 
            !err || console.error(err)
            Doc.remove({}, function(err) {
                !err || console.error(err)

                var admin = new User({
                    username: data.username,
                    email: data.email,
                    password: data.password,
                    admin: true
                });
                admin.save(function (err) {
                    !err || console.error(err)

                    config.mongoUrl = data.mongoUrl
                    config.frontPage = data.frontPage 

                    jsonfile.writeFile(`${__dirname}/../setting`, config, {spaces: 2}, function(err) {
                        !err || console.error(err) // 에러가 있는 경우 출력
                        reply('설치되었습니다.').redirect().location('')
                    })
                });
            });
        });
    }
}