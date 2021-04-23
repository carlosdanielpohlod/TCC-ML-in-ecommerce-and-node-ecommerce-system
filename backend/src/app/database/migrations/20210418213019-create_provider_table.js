'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.createTable('provider', { 
      idProvider: {
      autoIncrement: true,
      type: Sequelize.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING(20)
    },
    cnpj: {
      type: Sequelize.STRING(15),
      allowNull: true
    }});
    
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('provider');
     
  }
};
