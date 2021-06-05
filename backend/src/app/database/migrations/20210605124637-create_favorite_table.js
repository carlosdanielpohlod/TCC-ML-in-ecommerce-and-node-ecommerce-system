'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.createTable('favorite', {
      idFavorite:{
        type:Sequelize.BIGINT.UNSIGNED,
        autoIncrement:true,
        primaryKey:true
      },
      createdAt: {
        type: 'TIMESTAMP'
        ,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
          
      },
      idProduct: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
        references: {
          model: 'product',
          key: 'idProduct'
        }
      },
      idUser: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: true,
        references: {
          model: 'user',
          key: 'idUser'
        }
      }
    });
    
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
