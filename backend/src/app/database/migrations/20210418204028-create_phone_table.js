'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
     await queryInterface.createTable('phone', { 
      idPhone:{ 
        autoIncrement: true,
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
        primaryKey: true
      },
      idUser:{
        
          type: Sequelize.BIGINT.UNSIGNED,
          allowNull: false,
          references: {
            model: 'user',
            key: 'idUser'
          }
        
      },
      areaCode:{
        type: Sequelize.STRING(20),
        allowNull: false
      },
      number:{
        type: Sequelize.STRING(20),
        allowNull: false
      }
       
    });
     
  },

  down: async (queryInterface, Sequelize) => {
  
    await queryInterface.dropTable('phone');
    
  }
};
