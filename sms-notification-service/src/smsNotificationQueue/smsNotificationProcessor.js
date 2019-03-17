const SMSSenderQueue = require('../smsSenderMessageQ/smsSenderQueue');
const { getCustomersPhoneNumbers } = require('../helpers/CustomersRepo');

/**
 * sms notification process each job in the queue coming from api
 *
 * @param {Object} job - sms notification job
 * @returns {Promise}
 */
const smsNotificationProcessor = async job => {
  const customersPhoneNumbers = await getCustomersPhoneNumbers(
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
