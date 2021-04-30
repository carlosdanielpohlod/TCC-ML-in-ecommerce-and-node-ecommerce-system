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
      status: 'Pagamento efetuado',
      idPurchaseStatus:3
    },
    { 
      status: 'Produto em transito',
      idPurchaseStatus:4
    },
    { 
      status: 'Compra concluida',
      idPurchaseStatus:5
    },
    { 
      status:'Cancelado',
      idPurchaseStatus:6
    },
    { 
      status:"Pagamento não efetuado",
      idPurchaseStatus:7
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
