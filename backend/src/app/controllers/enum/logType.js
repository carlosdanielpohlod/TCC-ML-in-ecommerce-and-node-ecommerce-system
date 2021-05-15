const Enum = require('enum')
logType = new Enum ({ 
    "notification_activity":1,
    "user_register":2,
    "user_update":3,
    "system_error_500":4,
    "payment_error_500":5,
    "notification_error_500":6
})
module.exports = logType