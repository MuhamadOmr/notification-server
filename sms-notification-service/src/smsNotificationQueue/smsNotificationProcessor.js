const SMSSenderQueue = require('../smsSenderMessageQ/smsSenderQueue');
const { buildCustomersSenderJobs } = require('../helpers/CustomersRepo');

/**
 * sms notification process each job in the queue coming from api
 *
 * @param {Object} job - sms notification job
 * @returns {Promise}
 */
const smsNotificationProcessor = async job => {
  const customersPhoneNumbers = await buildCustomersSenderJobs(
    job.data.condition,
  );

  customersPhoneNumbers.forEach(phoneNumber => {
    SMSSenderQueue.add({
      phoneNumber,
      message: job.data.message,
    });
  });

  return Promise.resolve('done');
};

module.exports = smsNotificationProcessor;
