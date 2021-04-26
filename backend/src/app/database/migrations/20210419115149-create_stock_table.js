'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   
     await queryInterface.createTable('stock', { 
        idStock:{
          autoIncrement: true,
          type: Sequelize.BIGINT.UNSIGNED,
          allowNull: false,
          primaryKey: true,
          onDelete:'cascade'
        },
        idProduct: {
          type: Sequelize.BIGINT.UNSIGNED,
          allowNull: false,
          references: {
            model: 'product',
            key: 'idProduct'
          }
        },
        quantity: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0,
          validation:{
            min:0
          }
         
        },
        idProductSize:{
          type: Sequelize.BIGINT.UNSIGNED,
          allowNull: false,
          references: {
            model: 'productsize',
            key: 'idProductSize'
          }
        },
        idProductColor:{
          type: Sequelize.BIGINT.UNSIGNED,
          allowNull: false,
          references: {
            model: 'productcolor',
            key: 'idProductColor'
          }
        }
      });
      
  },

  down: async (queryInterface, Sequelize) => {
   
    await queryInterface.dropTable('stock');
    
  }
};
