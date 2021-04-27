'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
      await queryInterface.bulkInsert('purchaseitem', [{
        idProduct: 1,
        idPurchase:1,
        idProductColor:1,
        idProductSize:1,
        quantity:2
      }], {});
   
  },

  down: async (queryInterface, Sequelize) => {
   
     
     await queryInterface.bulkDelete('purchaseitem', null, {});
    
  }
};
