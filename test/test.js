var expect = require('expect.js')
var util = require('../utils/util')
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
describe('authVaildate.js suite', function () {
  it('should callback with null, true', function () {

  })
})
