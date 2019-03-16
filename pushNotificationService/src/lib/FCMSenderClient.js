const FCMSender = require('./FCMSender');

const FCMSenderClient = new FCMSender(process.env.FCM_API_KEY);

module.exports = FCMSenderClient;
