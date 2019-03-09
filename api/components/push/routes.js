/**
 * Project: notification-api
 * Get Routes
 * /push/:id
 */
exports.plugin = {
  async register(server) {
    const getPushNotication = require('./handlers/get').get;
    server.route([
      {
        method: 'GET',
        path: '/{id}',
        options: getPushNotication,
      },
    ]);
  },
  version: require('../../package.json').version,
  name: 'device-routes',
};
