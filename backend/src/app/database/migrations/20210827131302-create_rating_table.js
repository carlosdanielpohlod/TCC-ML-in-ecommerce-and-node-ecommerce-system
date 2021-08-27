'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.createTable('rating', { 
      idRating: {
        type:Sequelize.BIGINT.UNSIGNED,
        autoIncrement:true,
        primaryKey:true

      },
      rating: Sequelize.FLOAT(2,1),
      createdAt: {
        type: 'TIMESTAMP',
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
      idUser:{
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
        references: {
          model: 'user',
          key: 'idUser'
        }
      },
    });
    
  },

  down: async (queryInterface, Sequelize) => {
   
    await queryInterface.dropTable('rating');
    
  }
};
