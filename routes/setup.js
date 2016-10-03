'use strict';

const Hoek = require('hoek');
const mongoose = require('mongoose');
const Doc = require(`${__dirname}/../utils/schema/Doc`)
const setting = require(`${__dirname}/../setting`)

module.exports = {
    // GET /setup/ == 설치 시작 페이지로 이동
    "root": function(request, reply) {
        return reply.view('setup', {
            pagename: "deesle 설치"
        })
    },
    "begin": function(request, reply) {
        
    }
}