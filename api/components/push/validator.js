/**
 * Project: notification-api
 */
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const PUSH_NOTIFICATION_STATUSES = ['inproccess', 'sent', 'failed'];
const PUSH_NOTIFICATION_TYPES = ['normal', 'personalized'];

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
    .single()
    .required()
    .items(notification_message)
    .label('Localized Notification message')
    .description('push notification message'),
  sendDate: Joi.string().required(),
  status: Joi.string()
    .required()
    .valid(PUSH_NOTIFICATION_STATUSES)
    .label('Status'),
  sentCount: Joi.number()
    .required()
    .label('Sent Count'),
});

module.exports.postPushNotification = Joi.object().keys({
  messages: Joi.array()
    .min(1)
    .single()
    .required()
    .items(notification_message)
    .label('Localized Notification message')
    .description('push notification message'),
  sendDate: Joi.date()
    .iso()
    .required()
    .label('Send Date'),
  type: Joi.string().valid(PUSH_NOTIFICATION_TYPES),
  filterCondition: Joi.object().keys({
    registeredlt: Joi.date()
      .iso()
      .label('Registered date less than'),
    registeredgt: Joi.date()
      .iso()
      .label('Registered date greater than'),
    lastRidegt: Joi.date()
      .iso()
      .label('last ride date greater than'),
    lastRidelt: Joi.date()
      .iso()
      .label('last ride date less than'),
    numberOfRidesgt: Joi.number().label('number of rides greater than'),
    numberOfRideslt: Joi.number().label('number of rides less than'),
    carriers: Joi.array()
      .min(1)
      .single()
      .items(
        Joi.string()
          .required()
          .label('Carrier'),
      )
      .label('Carriers Companies'),
    countries: Joi.array()
      .min(1)
      .single()
      .items(Joi.string().required())
      .label('Countries'),
    languages: Joi.array()
      .min(1)
      .single()
      .items(Joi.string().required())
      .label('Languages'),
    tags: Joi.array()
      .min(1)
      .single()
      .items(Joi.string().required())
      .label('Tags'),
  }),
});

let postPushNotificationRes = Joi.object()
  .keys({
    status: Joi.number().required(),
    message: Joi.string(),
  })
  .unknown();
