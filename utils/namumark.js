module.exports = {
    parse: function(nmText, cb) {
        let parsed
        let TOC = []
        let result = []

        const process = {
            "preprocess": function(d) {
                var cd = d
                return cd
            },
            "blockmarkup": function(d) {
                var cd = d
                return cd
            },
            "TOC": function(d) {
                var cd // Array
                return cd
            },
            "markup": function(d) {
                var cd = d
                return cd
            },
            "compare": (d, TOC) => TOC.join('') + d
        }

        parsed = process.preprocess(nmText) // br 처리 등등
        parsed = process.blockmarkup(parsed) // 굵게 등의 간단한 문법
        TOC = process.TOC(parsed) // 목차 생성
        parsed = process.markup(parsed) // 일부 복잡한 문법
        parsed = process.compare(parsed, TOC)
    }
}