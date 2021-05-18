'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
  
    await queryInterface.createTable('purchasestatus', { 
      idPurchaseStatus:{
        type:Sequelize.BIGINT.UNSIGNED,
        autoIncrement:true,
        primaryKey:true
      },
      status:{ 
        type:Sequelize.STRING(50),
        allowNull:false
      }
    });
     
  },

  down: async (queryInterface, Sequelize) => {
    
     await queryInterface.dropTable('purchasestatus');
     
  }
};
