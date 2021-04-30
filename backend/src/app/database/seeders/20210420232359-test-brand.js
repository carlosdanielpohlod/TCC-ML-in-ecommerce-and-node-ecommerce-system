'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     
  await queryInterface.bulkInsert('brand', [{
    brand: 'Viamart'
    ,idBrand:1
  },
  {
    brand: 'Coca cola'
    ,idBrand:2
  },
  {
    brand: 'Umbro'
    ,idBrand:3
  },
  {
    brand: 'Nike'
    ,idBrand:4
  }
  ], {});

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('brand', null, {});
  }
};
