'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkInsert('productsize', [{
      idProductSize:1,
      size: '23',
      idCategory:1
    
    }], {});
   
 },

 down: async (queryInterface, Sequelize) => {
   /**
    * Add commands to revert seed here.
    *
    * Example:
    * 
    */
    await queryInterface.bulkDelete('productsize', null, {});
 }
};
