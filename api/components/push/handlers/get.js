/**
 * Project: notification-api
 */
const mongoose = require('mongoose');
const Boom = require('boom');
const validators = require('../validator');

const Push = mongoose.model('push');

// handlers are exported back for use in hapi routes
const Handlers = {};

// Lib contains our business specific logic
const Lib = {};

/**
 * get push notification Handler
 *
 * @param {objec} req
 *
 */
Handlers.get = async req => {
  const pushNotification = await Push.findOne({
    _id: req.params.id,
  }).exec();

  if (!pushNotification)
    return Boom.unauthorized('push notification not found!');

  return pushNotification;
};

module.exports = {
  handlers: Handlers,
  lib: Lib,
  // route => /push/:id
  get: {
    tags: ['api', 'push', 'notification'],
    validate: {
      params: validators.pushNotificationGet,
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
            schema: validators.pushNotificationGetResponse,
          },
        },
        consumes: ['application/json'],
        produces: ['application/json'],
        validate: {
          params: validators.pushNotificationGet,
        },
        payloadType: 'json',
      },
    },
    description: 'get push notification endpoint',
    handler: Handlers.get,
  },
};
