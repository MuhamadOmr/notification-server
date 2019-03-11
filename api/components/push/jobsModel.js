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
    message: String,
    // Sending Dates
    sendDate: Date,
    status: String,
    type: String,
    sentCount: Number,
    filterCondition: Object,
  },
  {
    collection: 'push',
    timestamps: true,
  },
);

mongoose.model('push', schema);
