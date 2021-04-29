'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     
  await queryInterface.bulkInsert('brand', [{
    brand: 'Viamart'
    ,idBrand:1
  }], {});

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('brand', null, {});
  }
};
