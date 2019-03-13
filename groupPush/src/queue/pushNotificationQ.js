const Queue = require('bull');

const GroupPushQueue = new Queue(
  'group push notification message queue',
  process.env.REDIS_URL,
);

module.exports = GroupPushQueue;
