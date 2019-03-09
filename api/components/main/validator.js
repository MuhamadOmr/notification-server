/**
 * Project: notification-api
 */
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

module.exports.homeResponse = Joi.object().keys({
  message: Joi.string()
    .required()
    .description('welcome message'),
});
