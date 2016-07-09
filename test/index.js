const assert = require('assert');
const gmap = require('../lib');
const _constants = require('../lib/constants');
const request = require('request');

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
  it('parses an action properly', function () {
    assert.equal(gmap('dir'), `${_constants.baseUri}/dir`);
    assert.equal(gmap('directions'), `${_constants.baseUri}/dir`);
  });
});

describe('directions', function () {
  it('parses from and to without special characters', function (done) {
    const expectedUrl = `${_constants.baseUri}/dir/me/you`;
    assert.equal(gmap.directions('me', 'you'), expectedUrl);
    is200(gmap.directions('me', 'you'), done);
  });
  it('parses from and to with special characters', function (done) {
    const expectedUrl = `${_constants.baseUri}/dir/my%20place/your%20place`;
    assert.equal(gmap.directions('my place', 'your place'), expectedUrl);
    is200(gmap.directions('my place', 'your place'), done);
  });
});
