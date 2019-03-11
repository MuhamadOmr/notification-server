const Queue = require('bull');

const JobsQueue = new Queue('jobs message queue', 'redis://127.0.0.1:6379', {
  // attemps for executing the job if it fails
  defaultJobOptions: { attempts: 10 },
  // options how to handle the retries
  backoff: {
    type: 'exponential',
    delay: 10000,
  },
});

module.exports = JobsQueue;
