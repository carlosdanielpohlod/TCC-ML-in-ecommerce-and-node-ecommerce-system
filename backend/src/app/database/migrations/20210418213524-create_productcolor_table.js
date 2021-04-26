'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
 
    await queryInterface.createTable('productcolor', { 
      idProductColor:{ 
        autoIncrement: true,
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
        primaryKey: true
      },
      color:{
        type:Sequelize.STRING(10),
        allowNull: false
      }
    });
    
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('productcolor');
    /**
     * Add reverting commands here.
     *
     * Example:
    //
     */
  }
};
