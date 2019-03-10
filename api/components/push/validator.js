/**
 * Project: notification-api
 */
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

let notification_message = Joi.object().keys({
  language: Joi.string().required(),
  body: Joi.string().required(),
});

module.exports.pushNotificationGet = Joi.object().keys({
  id: Joi.objectId()
    .required()
    .example('5be1b3bf04d62bf4a55a2860')
    .description('Push Notification ID'),
});

module.exports.pushNotificationGetResponse = Joi.object().keys({
  messages: Joi.array()
    .min(1)
    .required()
    .items(notification_message)
    .label('Localized Notification message')
    .description('push notification message'),
  sendDate: Joi.string().required(),
  status: Joi.string()
    .required()
    .valid(['inproccess', 'sent', 'failed'])
    .label('Status'),
  sentCount: Joi.number()
    .required()
    .label('Sent Count'),
});
