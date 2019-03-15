/**
 * * Project: push-notification-service
 */
const mongoose = require('mongoose');

const schema = mongoose.Schema(
  {
    name: String,
    email: String,
    country: String,
    deviceToken: String,
    language: String,
    numberOfRides: Number,
    carrier: String,
    last_ride: Date,
  },
  {
    collection: 'customers',
    timestamps: true,
  },
);

mongoose.model('customer', schema);
