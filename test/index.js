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
});

describe('gmap.directions', function () {
  it('basic from and to', function (done) {
    assert.equal(gmap.directions('here', 'there'), `${_constants.baseUri}?saddr=here&daddr=there`);
    is200(gmap.directions('here', 'there'), done);
  });
  it('basic from and to', function (done) {
    const query = {
      dirflg: 'r'
    };
    //TODO: refactor so that assert.equal is actually a regex check
    assert.equal(gmap.directions('here', 'there', query), `${_constants.baseUri}?saddr=here&daddr=there?dirflg=r`);
    is200(gmap.directions('here', 'there'), done);
  });
});
