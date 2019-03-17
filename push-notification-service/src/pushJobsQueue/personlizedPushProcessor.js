const DevicesSenderQueue = require('../devicesMessageQ/devicesSenderQueue');
const { buildCustomersSenderJobs } = require('../helpers/CustomersRepo');

/**
 * personalized push notification process each job in the queue coming from api
 *
 * chunking the huge list of devices into 1k device per request
 *
 * @param {Object} job - personalized push notification job
 * @returns {Promise}
 */
const personalizedPushProcessor = async job => {
  const senderJobsArray = await buildCustomersSenderJobs(
    job.data.message,
    job.data.condition,
  );

  senderJobsArray.forEach(customerJob => {
    DevicesSenderQueue.add({
      devicesList: customerJob.devicesTokens,
      message: customerJob.message,
    });
  });

  return Promise.resolve('done');
};

module.exports = personalizedPushProcessor;
