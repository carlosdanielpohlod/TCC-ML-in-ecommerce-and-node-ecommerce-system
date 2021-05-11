'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   
     await queryInterface.bulkInsert('address', [{
       idAddress:1,
       cep:"85200000",
       street:'guaitacazes',
       state:'PR',
       city:'Pitanga',
       number:'170'
     }
    ], {});
    
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
