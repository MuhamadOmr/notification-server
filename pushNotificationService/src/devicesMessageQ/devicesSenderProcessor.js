const { sendNotification } = require('../helpers/SenderRepo');
const FCMSenderClient = require('../lib/FCMSenderClient');

/**
 * devices sender processor, injecting fcmSender client for sending notificaitons
 *
 * @param {Object} job
 * @returns {Promise}
 */
const devicesSenderProcessor = async job => {
  return sendNotification(
    FCMSenderClient,
    job.data.message,
    job.data.devicesList,
  );
};

module.exports = devicesSenderProcessor;
