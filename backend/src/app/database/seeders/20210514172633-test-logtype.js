'use strict';
const logtype = require('../../controllers/enum/logType')
module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('logtype', [
    {
      idLogType:logtype["notification_activity"].value,
      type: 'Notification activity'
    },
    {
      idLogType:logtype["user_register"].value,
      type: 'user register'
    },
    {
      idLogType:logtype["user_update"].value,
      type: 'user update'
    },
    {
      idLogType:logtype["system_error_500"].value,
      type: 'System error 500'
    },
    {
      idLogType:logtype["payment_error_500"].value,
      type: 'payment_error_500'
    },
    {
      idLogType:logtype["notification_error_500"].value,
      type: 'notification_error_500'
    }
  
  ], {});
    
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('logtype', null, {});
    
  }
};
