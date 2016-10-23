'use strict';
const _ = require('underscore')

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
                pagename: "deesle 설치",
                settings: setting
            })
        } else {
            reply('이미 설치되었습니다.').redirect().location('')
        }
    },
    "begin": function(request, reply) {
        var config = { needSetup: false }
        let data = request.params
        User.remove({}, function(err) { //리셋
            !err || console.error(err)
            Doc.remove({}, function(err) { // 리셋
                !err || console.error(err)

                var admin = new User({
                    username: data.username,
                    email: data.email,
                    password: data.password,
                    admin: true
                }); // 어드민 계정 생성
                admin.save(function (err) {
                    !err || console.error(err)

                    config.mongoUrl = data.mongoUrl
                    config.frontPage = data.frontPage
                    console.dir(request.params)

                    jsonfile.writeFile(`${__dirname}/../setting.json`, config, {spaces: 2}, function(err) {
                        !err || console.error(err) // 에러가 있는 경우 출력
                        reply('설치되었습니다. 서버를 재시작해주세요.').redirect().location('')
                    }) // config 저장
                }); // 계정 저장
            });
        });
    }
}