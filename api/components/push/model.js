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
    message: [messageSchema],
    // Sending Date
    sendDate: Date,
    status: String,
    sentCount: Number,
    filterCondition: Object,
  },
  {
    collection: 'push',
  },
);

mongoose.model('push', schema);
