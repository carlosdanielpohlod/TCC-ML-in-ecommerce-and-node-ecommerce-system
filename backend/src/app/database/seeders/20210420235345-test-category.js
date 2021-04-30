'use strict';

module.exports = {

    up: async (queryInterface, Sequelize) => {
    
      await queryInterface.bulkInsert('category', [
      {
        idCategory:1,
        category: 'Calçado'
      
      },
      {
        idCategory:2,
        idRootCategory:1,
        category: 'Tênis'
      },
      {
        idCategory:3,
        idRootCategory:2,
        category: 'Sport'
      },
      {
        idCategory:4,
        idRootCategory:2,
        category: 'Confort'
      },
      {
        idCategory:5,
        category: 'Roupa'
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
      await queryInterface.bulkDelete('category', null, {});
   }
};
