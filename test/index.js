const chai = require('chai');
const assert = chai.assert;
const gmap = require('../dist');
const _constants = require('../dist/constants');
const request = require('request');

// check if a url's http code is 200
const is200 = function (url, done) {
  request(url, function (error, response) {
    if (!error && response.statusCode === 200) {
      done();
    } else {
      done(new Error(`err: ${error} - http code: ${response.statusCode}`));
    }
  });
};

describe('gmap', function () {
  it('empty object query', function (done) {
    const query = {};
    assert.equal(gmap(), _constants.baseUri);
    assert.equal(gmap(query), _constants.baseUri);
    is200(gmap.directions(query), done);
  });

  it('simple object query', function (done) {
    const query = {
      saddr: 'here'
    };
    assert.equal(gmap(query), `${_constants.baseUri}?saddr=here`);
    is200(gmap.directions(query), done);
  });

  it('complex object query', function (done) {
    const query = {
      saddr: 'here',
      daddr: 'there',
      dirflg: 'r'
    };
    assert.equal(gmap(query), `${_constants.baseUri}?saddr=here&daddr=there&dirflg=r`);
    is200(gmap(query), done);
  });

  it('complex object query with array daddr', function (done) {
    const query = {
      saddr: 'here',
      daddr: [
        'dest 1',
        'dest2',
        'dest3'
      ]
    };
    assert.match(gmap(query), /daddr=dest%201\+to:dest2\+to:dest3/, 'regexp matches');
    is200(gmap(query), done);
  });
});

describe('gmap.directions', function () {
  it('basic from and to', function (done) {
    assert.equal(gmap.directions('here', 'there'), `${_constants.baseUri}?saddr=here&daddr=there`);
    is200(gmap.directions('here', 'there'), done);
  });

  it('basic from and to with query', function (done) {
    const query = {
      dirflg: 'r'
    };

    assert.match(gmap.directions('here', 'there', query), /dirflg=r/, 'regexp matches');
    is200(gmap.directions('here', 'there'), done);
  });
});
