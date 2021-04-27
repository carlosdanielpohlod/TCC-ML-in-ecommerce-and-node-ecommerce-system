'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
  await queryInterface.bulkInsert('purchase', [{
     idUser:1,
     idPurchase:1,
     idPurchaseStatus:1
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    

    await queryInterface.bulkDelete('purchase', null, {});
    
  }
};
