const gcm = require('node-gcm');

/**
 * wrapper for the node-gcm
 *
 * @class FCMSender
 */
class FCMSender {
  constructor(apiKey) {
    if (!apiKey) {
      throw new Error('Api key required');
    }
    this.apiKey = apiKey;
    this.sender = new gcm.Sender(apiKey);
  }

  /**
   * build the gcm.Message object , this can be more advanced supporting multiple notification fields
   * for reference: https://firebase.google.com/docs/reference/fcm/rest/v1/projects.messages#Message.FIELDS.data
   *
   * @static
   * @param {String} message
   * @returns {Object} gcm Message Object
   * @memberof FCMSender
   */
  static prepareMessage(message) {
    const FCMMessage = new gcm.Message({
      notification: {
        body: message,
      },
    });

    return FCMMessage;
  }

  /**
   * send a simple message to list of devices tokens
   *
   * @param {String} message
   * @param {Array} devicesTokensList
   * @returns {Promise}
   * @memberof FCMSender
   */
  sendMessage(message, devicesTokensList) {
    const msg = FCMSender.prepareMessage(message);
    const response = new Promise((resolve, reject) => {
      this.sender.sendNoRetry(msg, devicesTokensList, (err, res) => {
        if (err) {
          return reject(Error(err));
        }
        return resolve(res);
      });
    });

    return response;
  }
}

module.exports = FCMSender;
