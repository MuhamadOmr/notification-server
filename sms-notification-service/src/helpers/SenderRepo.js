/**
 * send push notification to a list of devices
 *
 * @param {Object} senderClient
 * @param {String} message
 * @param {Number} phoneNumber
 * @returns {Promise} resolved or rejected promise from gcm sender
 */
module.exports.sendSMSNotification = (
  SMSSenderClient,
  message,
  phoneNumber,
) => {
  return SMSSenderClient.sendMessage(message, phoneNumber);
};
