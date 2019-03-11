const Queue = require('bull');

const TEN_SECONDS = 10000;

const JobsQueue = new Queue('jobs message queue', 'redis://127.0.0.1:6379', {
  // attemps for retry the job if it fails
  defaultJobOptions: { attempts: 10 },
  // options how to handle the retries
  backoff: {
    type: 'exponential',
    delay: TEN_SECONDS,
  },
});

module.exports = JobsQueue;
