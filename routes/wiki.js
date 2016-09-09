'use strict';

const Hoek = require('hoek');
const mongoose = require('mongoose');
const Doc = require(`${__dirname}/../utils/schema/Doc`)
const setting = require(`${__dirname}/../setting`)
module.exports = {
    // GET / == 대문으로 연결시킨다.
    "root": function(req, reply) {
        reply('대문으로 가세요.').redirect().location(`w/${setting.frontPage}`)
    }
}