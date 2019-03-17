const Queue = require('bull');
const smsNotificationProcessor = require('./smsNotificationProcessor');
const { SMS_NOTIFICATION_QUEUE_NAME } = require('../lib/constants');

// this listen to the queue sent by the api

const SMSQueue = new Queue(
  SMS_NOTIFICATION_QUEUE_NAME,
  process.env.REDIS_URL,
);

// add the process and run it with conccurent allowed number
SMSQueue.process(100, smsNotificationProcessor);

module.exports = SMSQueue;
