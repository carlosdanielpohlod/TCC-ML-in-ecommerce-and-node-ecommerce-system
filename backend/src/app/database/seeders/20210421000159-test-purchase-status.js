'use strict';
const purchaseStatus = require('../../controllers/enum/purchaseStatus')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkInsert('purchasestatus', [{
      
      status: 'No carrinho',
      idPurchaseStatus:purchaseStatus["no_carrinho"].value
    },{
      status: 'Aguardando Pagamento',
      idPurchaseStatus:purchaseStatus["aguardando_pagamento"].value
    },
    { 
      status: 'Pagamento efetuado',
      idPurchaseStatus:purchaseStatus["pagamento_efetuado"].value
    },
    { 
      status: 'Produto em transito',
      idPurchaseStatus:purchaseStatus["produto_em_transito"].value
    },
    { 
      status: 'Compra concluida',
      idPurchaseStatus:purchaseStatus["compra_concluida"].value
    },
    { 
      status:'Cancelado',
      idPurchaseStatus:purchaseStatus["cancelado"].value
    },
    { 
      status:"Pagamento não efetuado",
      idPurchaseStatus:purchaseStatus["pagamento_nao_efetuado"].value
    },
    { 
      status:"Pagamento falhou",
      idPurchaseStatus:purchaseStatus["pagamento_falhou"].value
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
