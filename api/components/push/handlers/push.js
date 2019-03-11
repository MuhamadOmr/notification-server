/**
 * Project: notification-api
 */
const mongoose = require('mongoose');
const Push = mongoose.model('push');
const Boom = require('boom');
const validators = require('../validator');

// handlers are exported back for use in hapi routes
const Handlers = {};

// Lib contains our business specific logic
const Lib = {};

/**
 * make a push notification Handler
 *
 * @param {objec} req
 * @param {object} res
 */
Handlers.push = async (req, res) => {
  const sentPN = req.payload;
  const pushNotification = await Push.create(sentPN);

  if (!pushNotification)
    return Boom.unauthorized('push notification not found!');

  return pushNotification;
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
          //Show error with dev only
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
          payload: validators.pushNotificationGet,
        },
        payloadType: 'json',
      },
    },
    description: 'send push notification endpoint',
    handler: Handlers.push,
  },
};
