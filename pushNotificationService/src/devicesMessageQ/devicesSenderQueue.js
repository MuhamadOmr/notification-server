const Queue = require('bull');
const devicesSenderProcessor = require('./devicesSenderProcessor');
const { DEVICES_PUSH_NOTIFICATION_QUEUE_NAME } = require('../lib/constants');

const TEN_SECONDS = 10000;

const DevicesSenderQueue = new Queue(
  DEVICES_PUSH_NOTIFICATION_QUEUE_NAME,
  process.env.REDIS_URL,
  {
    // attemps for retry the job if it fails
    defaultJobOptions: {
      attempts: 3,
      // options how to handle the retries
      backoff: {
        type: 'exponential',
        delay: TEN_SECONDS,
      },
    },
  },
);

// add the process and run it with conccurent allowed number
DevicesSenderQueue.process(100, devicesSenderProcessor);

module.exports = DevicesSenderQueue;
