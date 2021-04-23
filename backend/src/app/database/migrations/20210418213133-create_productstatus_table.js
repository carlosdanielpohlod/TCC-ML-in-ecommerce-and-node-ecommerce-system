'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.createTable('productstatus', { 
      idProductStatus: {
        autoIncrement: true,
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
        primaryKey: true
      },
      status: {
        type: Sequelize.STRING(30),
        allowNull: false
      } 
    });
     
  },

  down: async (queryInterface, Sequelize) => {
   await queryInterface.dropTable('productstatus');
     
  }
};
