const Queue = require('bull');
const devicesSenderProcessor = require('./devicesSenderProcessor');

const TEN_SECONDS = 10000;

const DevicesSenderQueue = new Queue(
  'devices push notification queue',
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

// add the process and run it in parallel using the cpu cores
DevicesSenderQueue.process(100, devicesSenderProcessor);

module.exports = DevicesSenderQueue;
