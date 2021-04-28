'use strict';

module.exports = {

    up: async (queryInterface, Sequelize) => {
    
      await queryInterface.bulkInsert('category', [{
        idCategory:1,
        category: 'Rascunho'
      
      }], {});
     
   },
 
   down: async (queryInterface, Sequelize) => {
     /**
      * Add commands to revert seed here.
      *
      * Example:
      * 
      */
      await queryInterface.bulkDelete('category', null, {});
   }
};
