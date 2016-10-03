var htmlEncode = require('js-htmlencode').htmlEncode;
var htmlDecode = require('js-htmlencode').htmlDecode;

module.exports = 
    function(nmText, cb) {
        let parsed
        let TOC = []
        let result = []

        const process = {
            "preprocess": function(d) {
                var cd = htmlEncode(d) // HTML 문법 이외 HTML 적용 방지임
                cd.replace(/([\n]+)/g, "<p>$1</p>")
                cd.replace("[br]", "<br>")
                return cd
            },
            "blockmarkup": function(d) {
                var cd = d
                cd.replace(/'''([^']+)'''/g, "<strong>$1</strong>")
                return cd
            },
            "markup": function(d) {
                var cd = d
                return cd
            }
        }

        parsed = process.preprocess(nmText) // br 처리 등등
        parsed = process.blockmarkup(parsed) // 굵게 등의 간단한 문법
        parsed = process.markup(parsed) // 일부 복잡한 문법

        cb(parsed) // 콜백을 보낸다
    }