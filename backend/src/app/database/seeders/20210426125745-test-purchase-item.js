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
      },
      {
        idPurchaseItem:10,
        idPurchase:7,
        idStock:7,  
        quantity:1
      },
      {
        idPurchaseItem:11,
        idPurchase:8,
        idStock:7,  
        quantity:1
      },
      {
        idPurchaseItem:12,
        idPurchase:9,
        idStock:7,  
        quantity:1
      },


      {
        idPurchaseItem:13,
        idPurchase:10,
        idStock:1,  
        quantity:1
      },
      {
        idPurchaseItem:14,
        idPurchase:10,
        idStock:2,  
        quantity:4
      },
      {
        idPurchaseItem:15,
        idPurchase:10,
        idStock:3,  
        quantity:4
      },
      {
        idPurchaseItem:16,
        idPurchase:10,
        idStock:4,  
        quantity:5
      },
      {
        idPurchaseItem:17,
        idPurchase:10,
        idStock:5,  
        quantity:5
      },
      {
        idPurchaseItem:18,
        idPurchase:10,
        idStock:6,  
        quantity:4
      }
    ], {});
   
  },

  down: async (queryInterface, Sequelize) => {
   
     
     await queryInterface.bulkDelete('purchaseitem', null, {});
    
  }
};
