const chai = require('chai');
const assert = chai.assert;
const gmap = require('../dist');
const _constants = require('../dist/constants');

describe('gmap', function () {
  it('empty object query', function () {
    const query = {};
    assert.equal(gmap(), _constants.baseUri);
    assert.equal(gmap(query), _constants.baseUri);
  });

  it('simple object query', function () {
    const query = {
      saddr: 'here'
    };
    assert.equal(gmap(query), _constants.baseUri + '?saddr=here');
  });

  it('complex object query', function () {
    const query = {
      saddr: 'here',
      daddr: 'there',
      dirflg: 'r'
    };
    assert.equal(gmap(query), _constants.baseUri + '?saddr=here&daddr=there&dirflg=r');
  });

  it('complex object query with array daddr', function () {
    const query = {
      saddr: 'here',
      daddr: [
        'dest 1',
        'dest2',
        'dest3'
      ]
    };
    assert.match(gmap(query), /daddr=dest%201\+to:dest2\+to:dest3/, 'regexp matches');
  });
});

describe('gmap.directions', function () {
  it('basic from and to', function () {
    assert.equal(gmap.directions('here', 'there'), _constants.baseUri + '?saddr=here&daddr=there');
  });

  it('basic from and to with query', function () {
    const query = {
      dirflg: 'r'
    };

    assert.match(gmap.directions('here', 'there', query), /dirflg=r/, 'regexp matches');
  });
});
