const _constants = require('./constants');
const querystring = require('querystring');

const gmap = query => {
  return `${_constants.baseUri}?${querystring.stringify(query)}`;
};

const directions = function (from, to, q) {
  const query = {
    ...q,
    saddr: from,
    daddr: to
  };
  return gmap(query);
};

module.exports = gmap;
module.exports.directions = directions;
