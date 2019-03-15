const config = require('config');
const Queue = require('bull');

const Config = JSON.parse(JSON.stringify(config));

const TEN_SECONDS = 10000;

const JobsQueue = new Queue(
  'group push notification message queue',
  Config.redis,
  {
    // attemps for retry the job if it fails
    defaultJobOptions: { attempts: 10 },
    // options how to handle the retries
    backoff: {
      type: 'exponential',
      delay: TEN_SECONDS,
    },
  },
);

module.exports = JobsQueue;
