/**
 * Project: notification-api
 * Get Routes
 * /push/:id
 * Post Routes
 * /push
 */
const getPushNotication = require('./handlers/get').get;
const pushPushNotication = require('./handlers/push').push;
const { version } = require('../../package.json');

exports.plugin = {
  async register(server) {
    server.route([
      {
        method: 'GET',
        path: '/{id}',
        options: getPushNotication,
      },
      {
        method: 'POST',
        path: '/',
        options: pushPushNotication,
      },
    ]);
  },
  version,
  name: 'device-routes',
};
