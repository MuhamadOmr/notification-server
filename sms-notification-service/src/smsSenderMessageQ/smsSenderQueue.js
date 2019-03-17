const Queue = require('bull');
const SMSSenderProcessor = require('./smsSenderProcessor');
const { SMS_SENDER_NOTIFICATION_QUEUE_NAME } = require('../lib/constants');

const TEN_SECONDS = 10000;

const SMSSenderQueue = new Queue(
  SMS_SENDER_NOTIFICATION_QUEUE_NAME,
  process.env.REDIS_URL,
  {
    // rate limitter for the sms sender
    limiter: {
      max: 60,
      duration: 60,
    },
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
SMSSenderQueue.process(100, SMSSenderProcessor);

module.exports = SMSSenderQueue;
