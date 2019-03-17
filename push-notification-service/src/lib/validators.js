/**
 * Project: notification-api
 */
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

module.exports.filterCondition = Joi.object().keys({
  registeredlt: Joi.date()
    .iso()
    .label('Registered date less than'),
  registeredgt: Joi.date()
    .iso()
    .label('Registered date greater than'),
  lastRideDategt: Joi.date()
    .iso()
    .label('last ride date greater than'),
  lastRideDatelt: Joi.date()
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
});
