/**
 * Project: notification-api
 * Get Routes
 * /push/:id
 * Post Routes
 * /push
 */
exports.plugin = {
  async register(server) {
    const getPushNotication = require('./handlers/get').get;
    const pushPushNotication = require('./handlers/push').push;
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
  version: require('../../package.json').version,
  name: 'device-routes',
};
