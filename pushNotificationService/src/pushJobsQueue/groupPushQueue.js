const Queue = require('bull');
const groupPushProcessor = require('./groupPushProcessor');
// this listen to the queue sent by the api

// processor is chunking a huge list of devices into 1k device per FCM Request
// it chunks are sent into a devicesSenderMessageQ

const GroupPushQueue = new Queue(
  'group push notification message queue',
  process.env.REDIS_URL,
);

// add the process and run it in parallel using the cpu cores
GroupPushQueue.process(100, groupPushProcessor);

module.exports = GroupPushQueue;
