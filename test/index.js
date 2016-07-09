const assert = require('assert');
const gmap = require('../lib');
const _constants = require('../lib/constants');

describe('gmap', function () {
  it('parses an action properly', function () {
    assert.equal(gmap('dir'), `${_constants.baseUri}/dir`);
    assert.equal(gmap('directions'), `${_constants.baseUri}/dir`);
  });
});
