'use strict';

/**
 * * Project: notification-api
 */
const Glue = require('glue');
const Forwarded = require('forwarded');
const path = require('path');

exports.deployment = async start => {
  const serverConfig = require('./config/manifest');
  const options = {
    ...serverConfig.options,
    relativeTo: path.resolve(__dirname),
  };
  const server = await Glue.compose(
    serverConfig.manifest,
    options,
  );

  server.ext({
    type: 'onRequest',
    method: (request, h) => {
      let remoteAddress = Forwarded(request.raw.req)
        .pop()
        .trim();
      if (remoteAddress) {
        request.info.remoteAddress = remoteAddress;
      }
      return h.continue;
    },
  });

  await server.initialize();

  if (!start) {
    return server;
  }

  await server.start();
  console.log(`Server started at ${server.info.uri}`);
  return server;
};

if (!module.parent) {
  exports.deployment(true);
  process.on('unhandledRejection', err => {
    throw err;
  });
}
