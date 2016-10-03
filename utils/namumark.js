module.exports = {
    parse: function(nmText, cb) {
        let parsed
        let TOC = []
        let result = []

        const process = {
            "preprocess": function(d) {
                var cd = d
                cd.replace(/([\n]+)/g, "<p>$1</p>")
                return cd
            },
            "blockmarkup": function(d) {
                var cd = d
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
    }
}