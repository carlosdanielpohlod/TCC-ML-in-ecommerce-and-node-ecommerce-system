'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkInsert('stock', [{
      idProduct:1,
      quantity:1,
      idProductSize:1,
      idProductColor:1
    }], {});
 
 },

 down: async (queryInterface, Sequelize) => {
  
    await queryInterface.bulkDelete('stock', null, {});
    
 }
};
