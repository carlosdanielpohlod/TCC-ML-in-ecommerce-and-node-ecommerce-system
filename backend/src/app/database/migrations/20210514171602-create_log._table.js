'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.createTable('log', { 
      idLog:{
        type:Sequelize.BIGINT.UNSIGNED,
        autoIncrement:true,
        primaryKey:true
      },
      log:{
        type: Sequelize.STRING(250),
        allowNull:false
      },
      origin:{
        type: Sequelize.STRING(50),
        allowNull:true
      },
      createdAt: {
        type: 'TIMESTAMP'
        ,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
          
      },
      idLogType: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
        references: {
          model: 'logtype',
          key: 'idLogType'
        }
      }
     });
    
  },

  down: async (queryInterface, Sequelize) => {
  
    await queryInterface.dropTable('log');
    
  }
};
