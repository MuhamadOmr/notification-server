const chai = require('chai');
require('dotenv').config();
const { sendNotification } = require('../../src/helpers/SenderRepo');
const FCMSender = require('./FCMSenderFake');

chai.should();
describe('send a push notification', () => {
  [
    {
      caseName:
        'should return response when sending a message with devices list',
      devicesTokens: ['11111'],
      message: 'test message',
    },
  ].forEach(testCase => {
    it(testCase.caseName, async () => {
      const FCMSenderClient = new FCMSender('fake api key');

      const response = await sendNotification(
        FCMSenderClient,
        testCase.message,
        testCase.devicesTokens,
      );

      response.should.be.equal(
        'using the api fake api key sending test message to :11111',
      );
    });
  });
});
