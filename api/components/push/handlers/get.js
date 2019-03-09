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
 * get push notification Handler
 *
 * @param {objec} req
 * @param {object} res
 */
Handlers.get = async (req, res) => {
  const pushNotification = await Push.findOne({
    _id: req.params.id,
  }).exec();

  if (!pushNotification) Boom.unauthorized('push notification not found!');

  return device;
};

module.exports = {
  handlers: Handlers,
  lib: Lib,
  // route => /push/:id
  get: {
    tags: ['api', 'push', 'notification'],
    validate: {
      params: validators.pushGet,
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
          },
        },
        consumes: ['application/json'],
        produces: ['application/json'],
        validate: {
          params: validators.pushGet,
        },
        payloadType: 'json',
      },
    },
    description: 'get notification endpoint',
    handler: Handlers.get,
  },
};
