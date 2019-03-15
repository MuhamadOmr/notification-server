const mongoose = require('mongoose');

// export this function and imported by server.js
module.exports = (() => {
  mongoose.connect(process.env.MONGODB_URL);

  mongoose.connection.on('connected', () => {
    console.log('Mongoose default connection is open to ');
  });

  mongoose.connection.on('error', err => {
    throw new Error(`Mongoose default connection has occured ${err} error`);
  });

  mongoose.connection.on('disconnected', () => {
    throw new Error('Mongoose default connection is disconnected');
  });

  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      throw new Error(
        'Mongoose default connection is disconnected due to application termination',
      );
    });
  });
})();
