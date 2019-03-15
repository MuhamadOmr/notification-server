/**
 * Project: notifiction-api
 */
const Controller = require('./handlers/main');
const { version } = require('../../package.json');

exports.plugin = {
  async register(server) {
    server.route([
      {
        method: 'GET',
        path: '/',
        options: Controller.home,
      },
    ]);
  },
  version,
  name: 'main-route',
};
