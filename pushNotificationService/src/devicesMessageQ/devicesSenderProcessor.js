// const DevicesSenderQueue = require('../devicesMessageQ/devicesSenderQueue');
const { sendNotification } = require('../helpers/SenderRepo');
const FCMSenderClient = require('../lib/FCMSenderClient');

const devicesSenderProcessor = async job => {
  const response = await sendNotification(
    FCMSenderClient,
    job.data.message,
    job.data.devicesList,
  );
  console.log(response);
  return Promise.resolve('done');
};

module.exports = devicesSenderProcessor;
