'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
     await queryInterface.createTable('productsize', { 
       idProductSize:{ 
        autoIncrement: true,
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
        primaryKey: true
      },
        size:{
          type:Sequelize.STRING(10),
          allowNull: false
        },
        idCategory:{
          type: Sequelize.BIGINT.UNSIGNED,
          allowNull: false,
          references: {
            model: 'category',
            key: 'idCategory'
          }
        }
        
    });
     
  },

  down: async (queryInterface, Sequelize) => {
    
      
    await queryInterface.dropTable('productsize');
     
  }
};
