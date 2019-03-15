const Queue = require('bull');
const path = require('path');

const GroupPushQueue = new Queue(
  'group push notification message queue',
  process.env.REDIS_URL,
);

// add the process and run it in parallel using the cpu cores
GroupPushQueue.process(5, path.resolve(__dirname, './groupPushProcessor.js'));

module.exports = GroupPushQueue;
