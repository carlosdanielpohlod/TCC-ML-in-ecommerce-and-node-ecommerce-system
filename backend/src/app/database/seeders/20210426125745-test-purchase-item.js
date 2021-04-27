'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
      await queryInterface.bulkInsert('purchaseitem', [{
        idPurchaseItem:1,
        idPurchase:1,
        idStock:1,
        
        quantity:2
      }], {});
   
  },

  down: async (queryInterface, Sequelize) => {
   
     
     await queryInterface.bulkDelete('purchaseitem', null, {});
    
  }
};
