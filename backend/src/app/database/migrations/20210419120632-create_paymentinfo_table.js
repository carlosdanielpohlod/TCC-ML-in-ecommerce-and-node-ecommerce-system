'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

     await queryInterface.createTable('paymentinfo', { 
      idPaymentInfo:{
          type:Sequelize.BIGINT.UNSIGNED,
          autoIncrement:true,
          primaryKey:true
      },
      client_id:{
        type: Sequelize.STRING(250),
        allowNull:true
      },
      payment_id:{
        type: Sequelize.STRING(250),
        allowNull:true,
        unique:true
      },
      payment_type:{
        type: Sequelize.STRING(250),
        allowNull:true
      },
      preference_id:{
        type: Sequelize.STRING(250),
        allowNull:false,
        unique:true
      },
      merchant_order_id:{
        type: Sequelize.STRING(250),
        allowNull:true
      },
      api:{
        type: Sequelize.STRING(250),
        defaultValue:'Mercado Pago'
      }
    });
     
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commends here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
