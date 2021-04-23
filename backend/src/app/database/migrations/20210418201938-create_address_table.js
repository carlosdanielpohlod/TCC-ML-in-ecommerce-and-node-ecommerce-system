'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
 
    await queryInterface.createTable('address', {
      idAddress: {
        autoIncrement: true,
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
        primaryKey: true
      },
      cep: {
        type: Sequelize.STRING(20),
        allowNull: false
      },
      state: {
        type: Sequelize.STRING(30),
        allowNull: false
      },
      city: {
        type: Sequelize.STRING(30),
        allowNull: false
      },
      street: {
        type: Sequelize.STRING(30),
        allowNull: false
      },
      number: {
        type: Sequelize.STRING(8),
        allowNull: false
      }
  })
     
  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.dropTable('address');
     
  }
};
