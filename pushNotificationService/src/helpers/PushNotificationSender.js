/**
 * simple fcm notification sender
 *
 * @param {Object} senderClient fcm sender client injected
 * @param {Array} listOfDevicesTokens - list of devices tokens that we can send to up to 1K
 * @returns
 */
module.exports.FCMSender = (senderClient, listOfDevicesTokens) => {
  console.log('sender...', senderClient, listOfDevicesTokens);
  return true;
};
