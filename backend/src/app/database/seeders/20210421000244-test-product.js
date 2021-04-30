'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
     await queryInterface.bulkInsert('product', [{
        name:'produto seed',
        idProduct:1,
      	price:100.00,
        idProvider:1,
      	description:'gerado atraves do seeder "test-product"  ',
        idCategory:1,
        idProductStatus:1,	
        idBrand:1
     }, 
     {
      name:'produto seed',
      idProduct:2,
      price:100.00,
      idProvider:1,
      description:'gerado atraves do seeder "test-product"  ',
      idCategory:1,
      idProductStatus:1,	
      idBrand:1
     },{
      name:'produto shold be deleted',
      idProduct:3,
      price:100.00,
      idProvider:1,
      description:'gerado atraves do seeder "test-product"  ',
      idCategory:1,
      idProductStatus:1,	
      idBrand:1
     
      }
    ], {});
  
  },

  down: async (queryInterface, Sequelize) => {
   
     await queryInterface.bulkDelete('product', null, {});
     
  }
};
