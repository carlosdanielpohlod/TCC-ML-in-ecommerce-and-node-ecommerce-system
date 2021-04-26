'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('product', { 
      idProduct: {
        autoIncrement: true,
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        onDelete:'cascade'
      },
      name: {
        type: Sequelize.STRING(25),
        allowNull: false
      },
      price: {
        type: Sequelize.DOUBLE(8,2),
        allowNull: false
      },
      idProvider: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: true,
        references: {
          model: 'provider',
          key: 'idProvider'
        }
      },
      description:{
        type: Sequelize.STRING(60),
        allowNull:false
      },
      idCategory: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
        references: {
          model: 'category',
          key: 'idCategory'
        }
      },
      idProductStatus: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
        
        references: {
          model: 'productStatus',
          key: 'idProductStatus'
        }
      },
      idBrand: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
        references: {
          model: 'brand',
          key: 'idBrand'
        }
      }
    })

     
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
