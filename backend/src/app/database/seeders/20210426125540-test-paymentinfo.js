'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
     await queryInterface.bulkInsert('paymentinfo', [{
      
	
        idPaymentInfo:1,
        preference_id:'725736327-2c7a135d-746e-4b6b-8bca-68dd70185f35',
        
     
    }], {});
    
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
