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
      },
      {
        idPurchaseItem:4,
        idPurchase:1,
        idStock:3,  
        quantity:1
      },
      {
        idPurchaseItem:5,
        idPurchase:1,
        idStock:4,  
        quantity:1
      },
      //
      {
        idPurchaseItem:6,
        idPurchase:4,
        idStock:1,  
        quantity:1
      },
      {
        idPurchaseItem:7,
        idPurchase:4,
        idStock:2,  
        quantity:1 
      },
      {
        idPurchaseItem:8,
        idPurchase:4,
        idStock:7,  
        quantity:2
      },
      {
        idPurchaseItem:9,
        idPurchase:7,
        idStock:7,  
        quantity:2
      }
    ], {});
   
  },

  down: async (queryInterface, Sequelize) => {
   
     
     await queryInterface.bulkDelete('purchaseitem', null, {});
    
  }
};
