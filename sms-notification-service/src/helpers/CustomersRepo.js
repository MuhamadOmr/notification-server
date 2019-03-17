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
  ...(condition.language && {
    language: { $regex: `^${condition.language}`, $options: 'i' },
  }),
  ...(condition.tags &&
    condition.tags.length > 0 && {
      tags: { $in: condition.tags },
    }),
});

/**
 * Build Customer Sender Jobs
 *
 * @param {Object} condition
 * @returns {Array} Phone numbers
 */
module.exports.getCustomersPhoneNumbers = async condition => {
  const customerMongoQuery = buildCustomersDBQuery(condition);
  const smsNotificationCustomers = await Customer.find(customerMongoQuery)
    .select({ phone: 1 })
    .exec();

  return smsNotificationCustomers.map(customer => customer.phone);
};
