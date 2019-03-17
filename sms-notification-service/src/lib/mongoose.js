const mongoose = require('mongoose');

// export this function and imported by server.js

mongoose.connection.on('connected', () => {
  console.log('Mongoose default connection is open');
});

mongoose.connection.on('error', err => {
  console.log(`Mongoose default connection has occured ${err} error`);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose default connection is disconnected');
});


module.exports = mongoose.createConnection(process.env.MONGODB_URL, {
  useNewUrlParser: true,
});
