'use strict';

const Hoek = require('hoek');
const mongoose = require('mongoose');
const Doc = require(`${__dirname}/../utils/schema/Doc`)
const setting = require(`${__dirname}/../setting`)
module.exports = {
    // GET / == 대문으로 연결시킨다.
    "root": function(req, reply) {
        if(setting.needsSetup){ // 설치가 되지 않았거나 안 된 경우
            return reply('설치를 시작합니다.').redirect().location(`setup`) // 설치로 이동합니다.
        }
        reply('대문으로 가세요.').redirect().location(`w/${setting.frontPage}`) // 설치되었을시 대문으로 보냅니다.
    },
    // GET /w/{name} == 위키 페이지로 연결시킨다.
    // request.params.name == 문서명
    "view": function(request, reply) {
        
    }
}