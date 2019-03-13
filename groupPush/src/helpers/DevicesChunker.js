const _ = require('lodash');

const FCM_DEVICES_CHUNK_PER_REQUEST = 1000;

module.exports.chunkify = arr => {
  return _.chunk(arr, FCM_DEVICES_CHUNK_PER_REQUEST);
};
