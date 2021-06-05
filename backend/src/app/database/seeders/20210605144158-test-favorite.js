'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
  
      await queryInterface.bulkInsert('favorite', [
      {
        idProduct:1,
        idUser:7
      },
      {
        idProduct:2,
        idUser:7
      },
      {
        idProduct:4,
        idUser:7
      },
      {
        idProduct:5,
        idUser:7
      },


      {
        idProduct:6,
        idUser:7
      },
      {
        idProduct:7,
        idUser:7
      },
      {
        idProduct:8,
        idUser:7
      },
      {
        idProduct:9,
        idUser:7
      },

      {
        idProduct:10,
        idUser:7
      },

      {
        idProduct:11,
        idUser:7
      },

      {
        idProduct:12,
        idUser:7
      },

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
