'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkInsert('purchasestatus', [{
      status: 'No carrinho',
      idPurchaseStatus:1
    
    }], {});
   
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
