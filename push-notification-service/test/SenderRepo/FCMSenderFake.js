class FCMSender {
  constructor(apiKey = 'fake api key') {
    this.apiKey = apiKey;
  }

  sendMessage(message, devicesTokensList) {
    console.log(
      `using the api ${
        this.apiKey
      } sending ${message} to :${devicesTokensList}`,
    );
    return Promise.resolve(
      `using the api ${
        this.apiKey
      } sending ${message} to :${devicesTokensList}`,
    );
  }
}

module.exports = FCMSender;
