'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
  
    await queryInterface.bulkInsert('productimage', [
    {
      idProduct: 1,
      key: 0,
      url:'https://static.shoptimao.com.br/produtos/camisa-corinthians-iii-invasoes-1920-torcedor-sn-nike-masculina/26/HZM-2023-026/HZM-2023-026_zoom1.jpg?ts=1567789004'
    },
    {
      idProduct: 1,
      key: 1,
      url:'https://static.shoptimao.com.br/produtos/camisa-corinthians-iii-invasoes-1920-torcedor-sn-nike-masculina/26/HZM-2023-026/HZM-2023-026_zoom1.jpg?ts=1567789004'
    },
    {
      idProduct: 1,
      key: 2,
      url:'https://static.shoptimao.com.br/produtos/camisa-corinthians-iii-invasoes-1920-torcedor-sn-nike-masculina/26/HZM-2023-026/HZM-2023-026_zoom1.jpg?ts=1567789004'
    },
    {
      idProduct: 1,
      key: 3,
      url:'https://static.shoptimao.com.br/produtos/camisa-corinthians-iii-invasoes-1920-torcedor-sn-nike-masculina/26/HZM-2023-026/HZM-2023-026_zoom1.jpg?ts=1567789004'
    },
  ], {});
 
  },
  
  down: async (queryInterface, Sequelize) => {
 
     await queryInterface.bulkDelete('productimage', null, {});
     
  }
};
