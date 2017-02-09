module.exports = class Replacer {
  /**
   * Represents a replacer.
   * @constructor
   * @param {string} str - The source that will replaced.
   */
  constructor (str) {
    this.str = str
  }
  /**
   * Replace for Regexp.
   * @param {RegExp} regex - RegExp to search for.
   * @param {(srring|funtcion)} arg - string after replace or generate that string. You can use group like $1.
   */
  regex (regex, arg) {
    if (typeof arg === 'string') {
      this.str.replace(regex, arg)
    } else if (typeof arg === 'function') {
      let matches = regex.exec(this.str)
      arg(null, matches, word => {
        this.str.replace(regex, word)
      })
    }
  }
  /**
   * Replace for Regexp.
   * @param {RegExp} regex - RegExp to search for.
   * @param {(srring|funtcion)} arg - string after replace or generate that string. You can use group like $1.
   */
  text (text, arg) {
    if (typeof arg === 'string') {
      this.str.replace(text, arg)
    } else if (typeof arg === 'function') {
      arg(null, word => {
        this.str.replace(text, word)
      })
    }
  }

  /**
   * Get replaced string.
   * @returns {string}
   */
  generate () {
    return this.str
  }
}
