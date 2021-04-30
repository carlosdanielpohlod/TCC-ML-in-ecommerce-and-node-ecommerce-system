'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkInsert('productsize', [
    {
      idProductSize:1,
      size: '23',
      idCategory:1
    
    },
    { 
      idProductSize:2,
      size: 'M',
      idCategory:5
    },
    { 
      idProductSize:3,
      size: 'G',
      idCategory:5
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
    await queryInterface.bulkDelete('productsize', null, {});
 }
};
