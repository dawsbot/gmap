const _constants = require('./constants');
const querystring = require('querystring');

const directions = function (from, to) {
  from = querystring.escape(from);
  to = querystring.escape(to);
  return `${_constants.baseUri}/dir/${from}/${to}`;
};

const gmap = function (action) {
  // action should be place, directions, etc.
  switch (action) {
    case 'directions':
      action = 'dir';
      break;
    default:
      break;
  }

  return `${_constants.baseUri}/${action}`;
};

module.exports = gmap;
module.exports.directions = directions;
