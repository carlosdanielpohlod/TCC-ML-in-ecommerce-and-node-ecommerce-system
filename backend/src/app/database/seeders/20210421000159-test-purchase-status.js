'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkInsert('purchasestatus', [{
      status: 'No carrinho',
      idPurchaseStatus:1 
    },{
      status: 'Aguardando Pagamento',
      idPurchaseStatus:2
    },
    { 
      status: 'Pagamento concluido',
      idPurchaseStatus:3
    },
    { 
      status:'Cancelado',
      idPurchaseStatus:4
    }
  ], {});
   
 },

 down: async (queryInterface, Sequelize) => {
   /**
    * Add commands to revert seed here.
    *
    * Example:
    * 
    */
    await queryInterface.bulkDelete('purchasestatus', null, {});
 }
};
