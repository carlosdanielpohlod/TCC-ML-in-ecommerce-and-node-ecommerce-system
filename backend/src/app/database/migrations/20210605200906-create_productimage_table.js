'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.createTable('productimage',
    { 
        idProductImage:{
          type:Sequelize.BIGINT.UNSIGNED,
          autoIncrement:true,
          primaryKey:true
        },
        key:{
          type: Sequelize.STRING(250),
          allowNull:true
        },
        sort:{
          type: Sequelize.INTEGER,
          allowNull: true
        },
        url:{
          type: Sequelize.STRING(250),
          allowNull:false
        },
        idProduct: {
          type: Sequelize.BIGINT.UNSIGNED,
          allowNull: false,
          references: {
            model: 'product',
            key: 'idProduct'
          }
        }
    });
     
  },

  down: async (queryInterface, Sequelize) => {
  
     await queryInterface.dropTable('productimage');
     
  }
};
