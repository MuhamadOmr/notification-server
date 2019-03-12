'use strict';

// requires for testing
const Code = require('code');
const expect = Code.expect;
const Lab = require('lab');
const { before, describe, it, after } = (exports.lab = Lab.script());
const mongoose = require('mongoose');
const JobsQueue = require('../../components/push/helpers/jobsMessageQueue');

const Server = require('../../server');

// require hapi server

async function setup() {
  const Push = mongoose.model('push');

  await Push.deleteMany({});
  await JobsQueue.empty();
}

describe('test pushing notifications ', async () => {
  before(async () => {
    //Remove and recreate sample application on every run
    await Server.deployment();

    return setup();
  });

  // make API call to self to test functionality end-to-end
  [
    {
      name:
        'when sending full payload gets successful push notification response',
      setValue: {
        payload: {
          messages: [
            {
              language: 'en',
              body: 'notificaiton test message',
            },
            {
              language: 'ar',
              body: 'some arabic notification',
            },
          ],
          sendDate: '2019-03-11T05:05:34.628Z',
          filterCondition: {
            registeredlt: '2019-03-11T05:05:34.628Z',
            carriers: ['vodafone'],
            countries: ['egypt'],
            numberOfRidesgt: 50,
            lastRideDategt: '2019-03-11T05:05:34.628Z',
          },
        },
      },
      expected: {
        statusCode: 201,
        queueCount: 2,
      },
    },
    {
      name: 'when no messages send a fail response',
      setValue: {
        payload: {
          messages: [],
          sendDate: '2019-03-11T05:05:34.628Z',
          filterCondition: {
            registeredlt: '2019-03-11T05:05:34.628Z',
            carriers: ['vodafone'],
            countries: ['egypt'],
            numberOfRidesgt: 50,
            lastRideDategt: '2019-03-11T05:05:34.628Z',
          },
        },
      },
      expected: {
        statusCode: 400,
        queueCount: 2,
      },
    },
  ].forEach(ctx => {
    it(ctx.name, async () => {
      const server = await Server.deployment();
      const response = await server.inject({
        method: 'POST',
        url: `/push`,
        payload: ctx.setValue.payload,
      });
      const jobsCount = await JobsQueue.count();

      expect(response.statusCode).to.equal(ctx.expected.statusCode);
      ctx.expected.queueCount &&
        typeof ctx.expected.queueCount == 'number' &&
        expect(jobsCount).to.equal(ctx.expected.queueCount);
    });
  });

  after(async () => {
    // placeholder to do something post tests
  });
});
