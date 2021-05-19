'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
     await queryInterface.bulkInsert('paymentinfo', [{
      
	
        idPaymentInfo:1, //apro
        preference_id:'725736327-2c7a135d-746e-4b6b-8bca-68dd70185f35',
        api:"Aprovado"
     
    },
    {
      idPaymentInfo:2, //rejeitado
      preference_id:"725736327-23ebb00f-25be-42d8-af57-2c1aceb09e6e",
      api:"Rejeitado"

    },
    { 
      idPaymentInfo:3,
      preference_id:"725736327-6d06b429-5c3d-4615-aa78-0c0e3ccde14e",
      api:"Pending"
    },
    { 
      idPaymentInfo:4,
      preference_id:"Não sei onde ta",
      payment_id:"14890721633",
      api:"rejeitado"
    }
  ]

    
    
    
    );
    
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
