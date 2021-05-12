'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkInsert('stock', [
    {
      idProduct:1,
      quantity:8,
      idProductSize:1,
      idProductColor:1,
      idStock:1
    },
    { 
      idProduct:1,
      quantity:8,
      idProductSize:2,
      idProductColor:1,
      idStock:2
    },
    { 
      idProduct:1,
      quantity:8,
      idProductSize:2,
      idProductColor:2,
      idStock:3
    },
    { 
      idProduct:2,
      quantity:8,
      idProductSize:1,
      idProductColor:1,
      idStock:4
    },
    { 
      idProduct:2,
      quantity:8,
      idProductSize:1,
      idProductColor:2,
      idStock:5
    },
    { 
      idProduct:2,
      quantity:8,
      idProductSize:2,
      idProductColor:2,
      idStock:6
    },
    { 
      idProduct:2,
      quantity:8,
      idProductSize:1,
      idProductColor:3,
      idStock:7
    }
    
    
  ], {});
 
 },

 down: async (queryInterface, Sequelize) => {
  
    await queryInterface.bulkDelete('stock', null, {});
    
 }
};
