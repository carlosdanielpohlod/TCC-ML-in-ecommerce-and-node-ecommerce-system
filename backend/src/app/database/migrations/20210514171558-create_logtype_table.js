'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

     await queryInterface.createTable('logtype', { 
       idLogType:
       {
        type:Sequelize.BIGINT.UNSIGNED,
        autoIncrement:true,
        primaryKey:true
      },
      type:{
        type: Sequelize.STRING(50),
        allowNull:false
      }
    });
    
  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.dropTable('logtype');
    
  }
};
