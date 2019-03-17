const SMSSender = require('./SMSSender');

const SMSSenderClient = new SMSSender(process.env.SMS_API_KEY);

module.exports = SMSSenderClient;
