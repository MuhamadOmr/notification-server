// const DevicesSenderQueue = require('../devicesMessageQ/devicesSenderQueue');
// const { FCMSender } = require('../helpers/SenderRepo');


const devicesSenderProcessor = async job => {
  console.log('list of devices', job.data.devicesList);
  console.log('message to be sent', job.data.message);

  return Promise.resolve('done');
};

module.exports = devicesSenderProcessor;
