/**
 * Project: notification-api
 */
const validators = require('../validator');

// handlers are exported back for use in hapi routes
const Handlers = {};

// Lib contains our business specific logic
const Lib = {};

Handlers.home = async (req, res) => {
  return {
    message: 'welcome to notification api',
  };
};

module.exports = {
  handlers: Handlers,
  lib: Lib,

  // Main route
  // => /
  home: {
    description: 'API Home',
    tags: ['api'],
    handler: Handlers.home,
    plugins: {
      'hapi-swagger': {
        responses: {
          '200': {
            description: 'Success',
            schema: validators.homeResponse,
          },
        },
        consumes: ['application/json'],
        produces: ['application/json'],
        payloadType: 'json',
      },
    },
  },
};
