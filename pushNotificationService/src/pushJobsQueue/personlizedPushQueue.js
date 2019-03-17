const Queue = require('bull');
const personlizedPushProcessor = require('./groupPushProcessor');
const { PERSONALIZED_PUSH_NOTIFICATION_QUEUE_NAME } = require('../lib/constants');

// this listen to the queue sent by the api

// processor is chunking a huge list of devices into 1k device per FCM Request
// it chunks are sent into a devicesSenderMessageQ

const PersonalizedPushQueue = new Queue(
  PERSONALIZED_PUSH_NOTIFICATION_QUEUE_NAME,
  process.env.REDIS_URL,
);

// add the process and run it with conccurent allowed number
PersonalizedPushQueue.process(100, personlizedPushProcessor);

module.exports = PersonalizedPushQueue;
