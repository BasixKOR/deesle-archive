var htmlEncode = require('js-htmlencode').htmlEncode;
var htmlDecode = require('js-htmlencode').htmlDecode;
const Tokenizr = require('tokenizr')

function expectWord(...words) {
    let word = words.join('|')
    return new RegExp(`^(?!.*(${word}))`)
}
module.exports = 
    function namumark(nmText, cb) {
        // cb(err, result, tokens)
        let lexer = new Tokenizr()
        
        lexer.rule(expectWord("'''"), (ctx, match) => ctx.accept("normal"))
        lexer.rule(/'''(.+)'''/, (ctx, match) => ctx.accept('bold', `<strong>${match[1]}</strong>`))

        lexer.debug = true
        lexer.input(nmText.replace(/(.+)\n\n/g, "<p>$1</p>"))
        let result = lexer.tokens()
        cb(null, result.map(n => n.value).join(''), result) // 콜백을 보낸다
    }