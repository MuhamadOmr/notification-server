require('dotenv').config();
require('./src/lib/mongoose');
require('./src/models/customer');
require('./src/pushJobsQueue/groupPushQueue');

// const { chunkifyGroupNotification } = require('./helpers/DevicesChunker');

// var mongoObjectId = function() {
//   var timestamp = ((new Date().getTime() / 1000) | 0).toString(16);
//   return (
//     timestamp +
//     'xxxxxxxxxxxxxxxx'
//       .replace(/[x]/g, function() {
//         return ((Math.random() * 16) | 0).toString(16);
//       })
//       .toLowerCase()
//   );
// };

// (function() {
//   const arr = new Array(2000000).fill(null).map(e => mongoObjectId);
//   const cunkedARR = chunkifyGroupNotification(arr);
//   console.log(cunkedARR[0].length);
//   console.log(cunkedARR.length);
// })();
