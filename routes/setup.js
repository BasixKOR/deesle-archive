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
        let data = request.payload
        let saveFile = function (config) {
            return new Promise(function(resolve, reject){
                jsonfile.writeFile(`${__dirname}/../setting.json`, config, {spaces: 2}, function(err) {
                    if (err) { reject(err) }
                    else { resolve() }
                })
            })
        } // jsonfile Promise 겍체. 파일을 저장한다

        User.remove({}).exec()
            .then(() => Doc.remove({}).exec())
            .catch((err) => {
                console.log("error while reset DB")
                console.error(err)
            })
            .then(() => {
                let admin = new User({
                    username: data.username,
                    email: data.email,
                    password: data.password,
                    admin: true
                });
                return admin.save()
            })
            .then(() => {
                let front = new Doc({
                    name: data.frontPage,
                    doc: ["기본 대문입니다."]
                })
                return front.save()
            })
            .catch((err) => {
                console.log("유저 또는 대문 업데이트 중 오류")
                console.error(err)
            })
            .then(() => saveFile({
                name: data.wikiname,
                needSetup: false,
                mongoUrl: data.mongoUrl,
                frontPage: data.frontPage,
            }))
            .catch((err) => {
                console.log("JSON 저장 중 오류")
                console.error(err)
            })
            .then(() => {
                reply('설치되었습니다. 서버를 재시작해주세요.')
            })
    }
}