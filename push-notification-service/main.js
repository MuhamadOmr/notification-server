require('dotenv').config();
require('./src/lib/mongoose');
require('./src/models/customer');
require('./src/pushJobsQueue/groupPushQueue');
require('./src/pushJobsQueue/personlizedPushQueue');
require('./src/devicesMessageQ/devicesSenderQueue');
