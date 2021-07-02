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

    // ....................

    {
      idProduct: 2,
      key: 0,
      url:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSvtdzF52XCl-hpAL0KbkG18ZkcBLe6JTdFOv_XOzoUVPZ05KIhP5a26j-q2Vf9cuUS89FNtJU&usqp=CAc'
    },
    {
      idProduct: 3,
      key: 1,
      url:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2BK3bP9Nthds7nfDPUrfYYSwoJoEtNUxNDvRFHHW9_8po3KV3xiSbw0_1vxLrE3qUKHRDD24g&usqp=CAc'
    },
    {
      idProduct: 4,
      key: 2,
      url:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVANwGjaWnrsN761Iaoe2TlWQ23z88j6WBGQ&usqp=CAU'
    },
    {
      idProduct: 5,
      key: 3,
      url:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjYxvCZF1CS0qAB7Oq65ic5hR7dPLVpSolEQ&usqp=CAU'
    },
    {
      idProduct: 6,
      key: 4,
      url:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjYxvCZF1CS0qAB7Oq65ic5hR7dPLVpSolEQ&usqp=CAU'
    },
    {
      idProduct: 7,
      key: 5,
      url:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjYxvCZF1CS0qAB7Oq65ic5hR7dPLVpSolEQ&usqp=CAU'
    },
    {
      idProduct: 8,
      key: 6,
      url:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjYxvCZF1CS0qAB7Oq65ic5hR7dPLVpSolEQ&usqp=CAU'
    },
    {
      idProduct: 9,
      key: 7,
      url:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjYxvCZF1CS0qAB7Oq65ic5hR7dPLVpSolEQ&usqp=CAU'
    },
    {
      idProduct: 10,
      key: 885,
      url:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjYxvCZF1CS0qAB7Oq65ic5hR7dPLVpSolEQ&usqp=CAU'
    },
    {
      idProduct: 11,
      key: 1,
      url:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjYxvCZF1CS0qAB7Oq65ic5hR7dPLVpSolEQ&usqp=CAU'
    },
    
  ], {});
 
  },
  
  down: async (queryInterface, Sequelize) => {
 
     await queryInterface.bulkDelete('productimage', null, {});
     
  }
};
