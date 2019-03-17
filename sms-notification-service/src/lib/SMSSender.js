/**
 * wrapper for sms sender
 *
 * @class SMSSender
 */
class SMSSender {
  constructor(apiKey) {
    this.apiKey = apiKey;
  }

  /**
   * send a simple message to list of devices tokens
   *
   * @param {String} message
   * @param {Number} phoneNumber
   * @returns {Promise}
   * @memberof SMSSender
   */
  sendMessage(message, phoneNumber) {
    return Promise.resolve(
      `using the api ${this.apiKey} sending ${message} to :${phoneNumber}`,
    );
  }
}

module.exports = SMSSender;
