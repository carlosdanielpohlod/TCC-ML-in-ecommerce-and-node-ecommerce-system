'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
     await queryInterface.bulkInsert('provider', [{
      name: 'John Doe',
      idProvider:1
     
     },{
       name:'Louise SA',
       idProvider:2
     }], {});
    
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * 
     */
     await queryInterface.bulkDelete('provider', null, {});
  }
};
