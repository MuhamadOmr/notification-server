const Queue = require('bull');
const groupPushProcessor = require('./groupPushProcessor');
const { GROUP_PUSH_NOTIFICATION_QUEUE_NAME } = require('../lib/constants');

// this listen to the queue sent by the api

// processor is chunking a huge list of devices into 1k device per FCM Request
// it chunks are sent into a devicesSenderMessageQ

const GroupPushQueue = new Queue(
  GROUP_PUSH_NOTIFICATION_QUEUE_NAME,
  process.env.REDIS_URL,
);

// add the process and run it with conccurent allowed number
GroupPushQueue.process(100, groupPushProcessor);

module.exports = GroupPushQueue;
