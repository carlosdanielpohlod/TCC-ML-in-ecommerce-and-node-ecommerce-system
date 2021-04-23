'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
     await queryInterface.createTable('category', {
      idCategory: {
        autoIncrement: true,
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
        primaryKey: true
      },
      idRootCategory:{
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: true,
        references: {
          model: 'category',
          key: 'idCategory'
        }
      },
      name: {
        type: Sequelize.STRING(50),
        allowNull: false
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
