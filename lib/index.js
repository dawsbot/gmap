const _constants = require('./constants');

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
