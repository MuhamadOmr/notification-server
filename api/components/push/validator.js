/**
 * Project: notification-api
 */
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

module.exports.pushGet = Joi.object().keys({
  id: Joi.objectId()
    .required()
    .example('5be1b3bf04d62bf4a55a2860')
    .description('Push Notification ID'),
});
