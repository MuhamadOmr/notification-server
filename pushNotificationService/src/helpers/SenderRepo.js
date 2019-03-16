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
 * send push notification to a group of devices
 *
 * @param {Object} senderClient
 * @param {String} message
 * @param {Array} listOfDevicesTokens
 * @returns
 */
module.exports.sendNotification = async (
  senderClient,
  message,
  listOfDevicesTokens,
) => {
  const response = senderClient.sendMessage(message, listOfDevicesTokens);
  console.log(
    'sender...',
    'list of devices tokens ',
    listOfDevicesTokens,
    'message',
    message,
    'responses here from fcm',
    response,
  );
  return true;
};
