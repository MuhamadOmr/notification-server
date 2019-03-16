const _ = require('lodash');

const FCM_DEVICES_CHUNK_COUNT_PER_REQUEST = 1000;

/**
 * chunking devices token list into arrays of 1k device token each
 *
 * @param {Array} arr - devices tokens list
 * @returns {Array} array of the chunked huge devices list in 1k device each
 */
module.exports.chunkifyDevicesForSender = arr => {
  return _.chunk(arr, FCM_DEVICES_CHUNK_COUNT_PER_REQUEST);
};

/**
 * simple fcm notification sender
 *
 * @param {Object} senderClient fcm sender client injected
 * @param {Array} listOfDevicesTokens - list of devices tokens that we can send to up to 1K
 * @returns
 */
module.exports.FCMSender = (senderClient, message, listOfDevicesTokens) => {
  console.log(
    'sender...',
    'list of devices tokens ',
    listOfDevicesTokens,
    'message',
    message,
  );
  return true;
};
