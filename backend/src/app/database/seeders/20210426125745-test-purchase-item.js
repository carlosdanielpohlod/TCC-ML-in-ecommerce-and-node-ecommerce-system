'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
      await queryInterface.bulkInsert('purchaseitem', [{
        idPurchaseItem:1,
        idPurchase:1,
        idStock:1,
        
        quantity:2
      },
      {
        idPurchaseItem:2,
        idPurchase:2,
        idStock:2,  
        quantity:1
      },
      {
        idPurchaseItem:3,
        idPurchase:2,
        idStock:2,  
        quantity:2
      }
    ], {});
   
  },

  down: async (queryInterface, Sequelize) => {
   
     
     await queryInterface.bulkDelete('purchaseitem', null, {});
    
  }
};
