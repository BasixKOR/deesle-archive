var expect = require('expect.js');
var util = require('../utils/util')
const namumark = require(`../utils/namumark`)

describe('util.js suite', function () {
  describe('#directoryRoute(dirname, path)', function() {
    it('should return correct route object', function () {
      expect(util.directoryRoute('test', 'test')).to.eql({
        method: 'GET',
        path: 'test',
        handler: { directory: { path: 'test' } }
      })
    })
    it('path should equal /{param*}', function () {
      expect(util.directoryRoute('test')).to.eql({
        method: 'GET',
        path: '/{param*}',
        handler: { directory: { path: 'test' } }
      })
    })
  })

  describe('#auth(mode)', function() {
    it('should return correct auth object', function() {
      expect(util.auth('test')).to.eql({
        mode: 'test', strategy: 'jwt-auth'
      })
    })
    it('mode should equals "required"', function () {
      expect(util.auth()).to.eql({mode: 'required', strategy: 'jwt-auth'})
    })
  })
})
describe('namumark suite', function() {
  it('result should be like <p><strong></strong></p>', function() {
    namumark("tokenizr '''test'''\n\n", (err, value) => {
      expect(value).to.equal('tokenizr <strong>test</strong>')
    })
  })
})