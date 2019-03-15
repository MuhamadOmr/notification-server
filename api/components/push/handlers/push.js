/**
 * Project: notification-api
 */
const mongoose = require('mongoose');
const Boom = require('boom');
const validators = require('../validator');
const jobsMS = require('../helpers/jobsMessageQueue');

const Push = mongoose.model('push');

// handlers are exported back for use in hapi routes
const Handlers = {};

// Lib contains our business specific logic
const Lib = {};

/**
 * create jobs in a message queue with language and delayed time
 *
 * @param {Object} jobsMSQ job message queue instance
 * @param {Object} pushNotification
 */
Lib.createNotificationJobs = (jobsMSQ, pushNotification) => {
  pushNotification.messages.forEach(messageObj => {
    jobsMSQ.add(
      {
        message: messageObj.body,
        pushNotificationId: pushNotification._id,
        condition: {
          ...pushNotification.filterCondition,
          lang: messageObj.language,
        },
        type: pushNotification.type,
      },
      {
        delay: pushNotification.sendDate.getMilliseconds(),
      },
    );
  });
  return true;
};

/**
 * create a push notification
 *
 * @param {Object} pushNotification
 * @returns {Promise} resolve to Push notification object created | rejects with a mongo creation error
 */
Lib.createPushNotification = async pushNotification => {
  const push = new Push({ ...pushNotification, status: 'inproccess' });
  await push.save();
  return Promise.resolve(push);
};

/**
 * make a push notification Handler
 *
 * @param {objec} req
 * @param {object} res
 */
Handlers.push = async (req, res) => {
  const sentPN = req.payload;
  const pushNotification = await Lib.createPushNotification(sentPN).catch(
    () => {
      throw Boom.badRequest('push notification failed to create!');
    },
  );

  Lib.createNotificationJobs(jobsMS, pushNotification);

  return res.response({ pushNotification }).code(201);
};

module.exports = {
  handlers: Handlers,
  lib: Lib,
  // route => /push
  push: {
    tags: ['api', 'push', 'notification'],
    validate: {
      payload: validators.postPushNotification,
      failAction: async (request, h, err) => {
        if (process.env.NODE_ENV === 'production') {
          console.error('ValidationError:', err.message);
          throw Boom.badRequest('Invalid request payload input');
        } else {
          // Show error with dev only
          console.error(err);
          throw err;
        }
      },
    },
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            description: 'BadRequest',
          },
          '200': {
            description: 'success',
            schema: validators.postPushNotificationRes,
          },
        },
        consumes: ['application/json'],
        produces: ['application/json'],
        validate: {
          payload: validators.postPushNotification,
        },
        payloadType: 'json',
      },
    },
    description: 'send push notification endpoint',
    handler: Handlers.push,
  },
};
