/**
 * * Project: notification-api
 */
const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
  language: String,
  body: String,
});

const schema = mongoose.Schema(
  {
    messages: [messageSchema],
    // Sending Dates
    sendDate: {
      type: Date,
      default: Date.now(),
    },
    // ['inproccess', 'sent', 'failed']
    status: {
      type: String,
      default: 'inproccess',
    },
    // ['group', 'personalized']
    type: String,
    sentCount: {
      type: Number,
      default: 0,
    },
    filterCondition: Object,
  },
  {
    collection: 'push',
    timestamps: true,
  },
);

mongoose.model('Push', schema);
