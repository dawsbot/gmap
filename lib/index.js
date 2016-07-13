const _constants = require('./constants');
const querystring = require('querystring');

// the primary gmap function
const gmap = query => {
  // empty query
  if (typeof query === 'undefined' || Object.keys(query).length === 0) {
    return _constants.baseUri;
  }
  const {
    daddr,
    ...rest
  } = query;

  if (Array.isArray(daddr)) {
    const newDaddr = daddr.map(elem => {
      return querystring.escape(elem);
    });
    return `${_constants.baseUri}?${querystring.stringify(rest)}&daddr=${newDaddr.join('+to:')}`;
  }

  return `${_constants.baseUri}?${querystring.stringify(query)}`;
};

// a convenience directions wrapper around the default gmap function
const directions = function (from, to, q) {
  const query = {
    saddr: from,
    daddr: to,
    ...q
  };
  return gmap(query);
};

module.exports = gmap;
module.exports.directions = directions;
