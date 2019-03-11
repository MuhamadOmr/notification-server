/**
 * Project: pushbots-api-v3
 */

const Mongoose = require('mongoose');
const Glob = require('glob');
require('../components/push/pushNotificationModel');
Mongoose.Promise = require('bluebird');

exports.plugin = {
  async register(server, options) {
    try {
      // When the connection is disconnected
      Mongoose.connection.on('disconnected', function() {
        server.log(['mongoose', 'info'], 'Mongo Database disconnected');
      });

      // If the node process ends, close the mongoose connection
      process.on('SIGINT', async () => {
        await Mongoose.connection.close();
        server.log(
          ['mongoose', 'info'],
          'Mongo Database disconnected through app termination',
        );
        process.exit(0);
      });

      Mongoose.set('useCreateIndex', true);
      // connect to mongodb
      const conn = await Mongoose.connect(
        options.uri,
        {
          useNewUrlParser: true,
          reconnectInterval: 1000,
          reconnectTries: Number.MAX_VALUE,
        },
      );
      console.log('versions:', require('../package.json').version);
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
  version: require('../package.json').version,
};
