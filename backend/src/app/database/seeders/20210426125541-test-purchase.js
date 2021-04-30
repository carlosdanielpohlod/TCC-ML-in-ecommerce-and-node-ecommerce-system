'use strict';
const purchaseStatus = require('../../controllers/enum/purchaseStatus')
module.exports = {
  up: async (queryInterface, Sequelize) => {
  await queryInterface.bulkInsert('purchase', [{
     idUser:1,
     idPurchase:1,
     idPurchaseStatus:purchaseStatus["no_carrinho"].value
    },
    {
      idUser:4,
      idPurchase:2,
      idPurchaseStatus:purchaseStatus["aguardando_pagamento"].value
      
    },
    { 
      idUser:6,
      idPurchase:3,
      idPurchaseStatus:purchaseStatus["cancelado"].value
    }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    

    await queryInterface.bulkDelete('purchase', null, {});
    
  }
};
