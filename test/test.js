var expect = require('expect.js');
var util = require('../utils/util')

describe('util.js suite', function () {
  it('should return correct object', function () {
    expect(util.directoryRoute('test', 'test')).to.eql({
        method: 'GET',
        path: 'test',
        handler: { directory: { path: 'test' } }
    })
  });
});