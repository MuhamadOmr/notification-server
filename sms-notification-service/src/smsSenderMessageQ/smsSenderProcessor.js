const { sendSMSNotification } = require('../helpers/SenderRepo');
const SMSSenderClient = require('../lib/SMSSenderClient');

/**
 * devices sender processor, injecting fcmSender client for sending notificaitons
 *
 * @param {Object} job
 * @returns {Promise}
 */
const SMSSenderProcessor = async job => {
  return sendSMSNotification(
    SMSSenderClient,
    job.data.message,
    job.data.phoneNumber,
  );
};

module.exports = SMSSenderProcessor;
