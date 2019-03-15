// const { FCMSender } = require('../helpers/PushNotificationSender');
const DevicesSenderQueue = require('../devicesMessageQ/devicesSenderQueue');
const { chunkifyDevicesForSender } = require('../helpers/DevicesChunker');


/**
 * group push notification process on each job in the queue coming from api
 *
 * main purpose is make job queues for each sending request to handle 1k device at most
 *
 * @param {Object} job - group push notification job
 * @returns {Promise}
 */
const groupPushProcessor = job => {
  const notificationDevices = [];
  const devicesChunks = chunkifyDevicesForSender(notificationDevices);

  devicesChunks.forEach(devicesList => {
    DevicesSenderQueue.add({
      devices: devicesList,
      message: job.message,
    });
  });

  return Promise.resolve('done');
};

module.exports = groupPushProcessor;
