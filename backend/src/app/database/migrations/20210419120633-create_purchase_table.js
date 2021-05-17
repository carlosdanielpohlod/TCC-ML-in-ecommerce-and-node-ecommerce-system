'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('purchase', { 
      idPurchase:{
        type:Sequelize.BIGINT.UNSIGNED,
        autoIncrement:true,
        primaryKey:true
      },
      idUser:{
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
        references: {
          model: 'user',
          key: 'idUser'
        }
      },
      idPurchaseStatus:{
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
        references: {
          model: 'purchasestatus',
          key: 'idPurchaseStatus'
        }
      },
      idPaymentInfo:{
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: true,
        references: {
          model: 'paymentinfo',
          key: 'idPaymentInfo'
        }
      },
      createdAt:{
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      }

    });
     
  },

  down: async (queryInterface, Sequelize) => {
   await queryInterface.dropTable('purchase');
    
  }
};
