require('dotenv').config();
require('./src/lib/mongoose');
require('./src/models/customer');
require('./src/smsSenderMessageQ/smsSenderQueue');
require('./src/smsNotificationQueue/smsNotificationQueue');
