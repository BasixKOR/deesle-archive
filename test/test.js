var chai = require('chai')
chai.use(require('chai-as-promised'))

var expect = chai.expect
var util = require('../utils/util')
const namumark = require(`../utils/namumark`)
const authVaildate = require(`../utils/authVaildate`) // eslint-disable-line no-unused-vars

describe('util.js suite', function () {
  describe('#directoryRoute(dirname, path)', function () {
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

  describe('#auth(mode)', function () {
    it('should return correct auth object', function () {
      expect(util.auth('test')).to.eql({
        mode: 'test', strategy: 'jwt-auth'
      })
    })
    it('mode should equals "required"', function () {
      expect(util.auth()).to.eql({mode: 'required', strategy: 'jwt-auth'})
    })
  })
})
describe('namumark suite', function () {
  it('result should be like <p><strong></strong></p>', function () {
    expect(namumark("tokenizr '''test'''\n\n")).to.eventually.equal('tokenizr <strong>test</strong>')
  })
})
describe('authVaildate.js suite', function () {
  it('should callback with null, true', function () {
  })
})
