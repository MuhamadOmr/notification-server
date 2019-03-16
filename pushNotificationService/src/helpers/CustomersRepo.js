// const mongoose = require('mongoose');

// const Customer = mongoose.model('Customer');
const Customer = require('../models/customer');

/**
 * build Mongodb Query for Customers ..
 *
 *
 * @param {Object} condition condition object
 * @returns {Object} Devices Mongo Query
 */
const buildCustomersDBQuery = condition => ({
  ...(condition.registeredlt && {
    created_at: { $lt: condition.registeredlt },
  }),
  ...(condition.registeredgt && {
    created_at: { $gt: condition.registeredgt },
  }),
  ...(condition.lastRideDategt && {
    last_ride: { $gt: condition.lastRideDategt },
  }),
  ...(condition.lastRideDatelt && {
    last_ride: { $lt: condition.lastRideDatelt },
  }),
  ...(condition.numberOfRidesgt && {
    numberOfRides: { $gt: condition.numberOfRidesgt },
  }),
  ...(condition.numberOfRideslt && {
    numberOfRides: { $lt: condition.numberOfRideslt },
  }),
  ...(condition.carriers &&
    condition.carriers.length > 0 && {
      carrier: { $in: condition.carriers.map(c => new RegExp(`^${c}`, 'i')) },
    }),
  ...(condition.countries &&
    condition.countries.length > 0 && {
      country: { $in: condition.countries.map(c => new RegExp(`^${c}`, 'i')) },
    }),
  ...(condition.languages &&
    condition.languages.length > 0 && {
      language: { $in: condition.languages.map(l => new RegExp(`^${l}`, 'i')) },
    }),
  ...(condition.tags &&
    condition.tags.length > 0 && {
      tags: { $in: condition.tags },
    }),
});

/**
 * return list of devices tokens that match the condition we got from job queue
 *
 * @param {Object} condition used to build mongo query
 * @returns {Array} list of devices tokens
 */
module.exports.getListOfdevicesTokens = async condition => {
  const customerMongoQuery = buildCustomersDBQuery(condition);
  const notificationCustomers = await Customer.find(customerMongoQuery)
    .select({ deviceToken: 1 })
    .exec();

  return notificationCustomers.map(customer => customer.deviceToken);
};
