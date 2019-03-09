/**
 * Project: pushbots-api-v3
 */
exports.plugin = {
  async register(server) {
    const Controller = require('./handlers/main');
    server.route([
      {
        method: 'GET',
        path: '/',
        options: Controller.home,
      },
    ]);
  },
  version: require('../../package.json').version,
  name: 'main-route',
};
