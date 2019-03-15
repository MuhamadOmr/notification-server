/**
 * Project: pushbots-api-v3
 */

const Mongoose = require('mongoose');
Mongoose.Promise = require('bluebird');
const { version } = require('../package.json');
require('../components/push/pushNotificationModel');

exports.plugin = {
  async register(server, options) {
    try {
      // When the connection is disconnected
      Mongoose.connection.on('disconnected', () => {
        server.log(['mongoose', 'info'], 'Mongo Database disconnected');
      });

      // If the node process ends, close the mongoose connection
      process.on('SIGINT', async () => {
        await Mongoose.connection.close();
        server.log(
          ['mongoose', 'info'],
          'Mongo Database disconnected through app termination',
        );
        throw new Error('Mongo Database disconnected');
      });

      Mongoose.set('useCreateIndex', true);
      // connect to mongodb
      const conn = await Mongoose.connect(options.uri, {
        useNewUrlParser: true,
        reconnectInterval: 1000,
        reconnectTries: Number.MAX_VALUE,
      });
      console.log('versions:', version);
      server.decorate('server', 'mongoose', conn);

      //   // Load models
      //   const models = Glob.sync('app/models/*.js');
      //   models.forEach(function(model) {
      //     require('../' + model);
      //   });
    } catch (e) {
      console.log(e);
      throw e;
    }
  },
  name: 'mongoose_connector',
  version,
};
