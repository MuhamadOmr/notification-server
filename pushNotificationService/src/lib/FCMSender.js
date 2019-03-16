const gcm = require('node-gcm');

// const sender = new gcm.Sender('YOUR_API_KEY_HERE');

class FCMSender {
  constructor(apiKey) {
    if (!apiKey) {
      throw new Error('Api key required');
    }
    this.apiKey = apiKey;
    this.sender = new gcm.Sender(apiKey);
  }

  static prepareMessage(message) {
    const FCMMessage = new gcm.Message({
      notification: {
        body: message,
      },
    });

    return FCMMessage;
  }

  sendMessage(message, devicesTokensList) {
    const msg = this.prepareMessage(message);
    return this.sender.sendNoRetry(msg, devicesTokensList);
  }
}

module.exports = FCMSender;
