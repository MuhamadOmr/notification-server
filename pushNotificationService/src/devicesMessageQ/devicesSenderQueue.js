const Queue = require('bull');

const TEN_SECONDS = 10000;

const DevicesSenderQueue = new Queue(
  'devices push notification queue',
  process.env.REDIS_URL,
  {
    // attemps for retry the job if it fails
    defaultJobOptions: {
      attempts: 10,
      // options how to handle the retries
      backoff: {
        type: 'exponential',
        delay: TEN_SECONDS,
      },
    },
  },
);

module.exports = DevicesSenderQueue;
