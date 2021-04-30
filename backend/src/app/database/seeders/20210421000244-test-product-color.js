'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
  
     await queryInterface.bulkInsert('productcolor', [{
       color: 'cor padrão',
       idProductColor:1
     },
     { 
      color: 'Verde'
     },
     { 
      color: 'Vermelhor'
     },
     { 
       color:'azul'
     }
    ], {});
    
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('productcolor', null, {});
  }
};
