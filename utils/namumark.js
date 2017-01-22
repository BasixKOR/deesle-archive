var htmlEncode = require('js-htmlencode').htmlEncode;
var htmlDecode = require('js-htmlencode').htmlDecode;
const Tokenizr = require('tokenizr')

module.exports = 
    function(nmText, cb) {
        // cb(err, result, tokens)
        let lexer = new Tokenizr()

        lexer.rule(/'''(.+)'''/g, (ctx, match) => ctx.accept('bold', `<strong>${match[1]}</strong>`))
        lexer.rule(/.[^']/g, (ctx, match) => ctx.accept('paragraph', `<p>${match[0]}</p>`))

        lexer.input(nmText)
        let result = lexer.tokens()
        cb(null, result.map(n => n.value).join(''), result) // 콜백을 보낸다
    }