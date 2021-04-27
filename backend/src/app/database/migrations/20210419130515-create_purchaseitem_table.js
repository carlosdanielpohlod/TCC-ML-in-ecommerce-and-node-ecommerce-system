'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
     await queryInterface.createTable('purchaseitem', { 
       idPurchaseItem:{
          type:Sequelize.BIGINT.UNSIGNED,
          autoIncrement:true,
          primaryKey:true
       },
        idPurchase: {
          type: Sequelize.BIGINT.UNSIGNED,
          allowNull: false,
          references: {
            model: 'purchase',
            key: 'idPurchase'
          }
        },
        idStock: {
          type: Sequelize.BIGINT.UNSIGNED,
          allowNull: false,
          references: {
            model: 'stock',
            key: 'idStock'
          }
        }
        ,
        quantity:{
          type:Sequelize.INTEGER,
          allowNull:false,
          default:1
        }
      
     });
     
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('purchaseitem');
     
   }
};
