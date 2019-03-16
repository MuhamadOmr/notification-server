const DevicesSenderQueue = require('../devicesMessageQ/devicesSenderQueue');
const { chunkifyDevicesForSender } = require('../helpers/SenderRepo');
const { getListOfdevicesTokens } = require('../helpers/CustomersRepo');

/**
 * group push notification process each job in the queue coming from api
 *
 * chunking the huge list of devices into 1k device per request
 *
 * @param {Object} job - group push notification job
 * @returns {Promise}
 */
const groupPushProcessor = async job => {
  const devicesTokensArray = await getListOfdevicesTokens(job.data.condition);

  const devicesChunks = chunkifyDevicesForSender(devicesTokensArray);

  devicesChunks.forEach(devicesList => {
    DevicesSenderQueue.add({
      devicesList,
      message: job.data.message,
    });
  });

  return Promise.resolve('done');
};

module.exports = groupPushProcessor;
