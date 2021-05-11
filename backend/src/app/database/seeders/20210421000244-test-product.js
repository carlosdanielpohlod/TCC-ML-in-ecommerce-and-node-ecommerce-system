'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
     await queryInterface.bulkInsert('product', [{
        name:'produto seed 01',
        idProduct:1,
      	price:100.00,
        idProvider:1,
      	description:'gerado atraves do seeder "test-product"  ',
        idCategory:1,
        idProductStatus:1,	
        idBrand:1
     }, 
     {
      name:'produto seed 02',
      idProduct:2,
      price:15.00,
      idProvider:1,
      description:'segundo produto gerado atraves do seeder "test-product"  ',
      idCategory:1,
      idProductStatus:1,	
      idBrand:1
     },{
      name:'produto shold be deleted',
      idProduct:3,
      price:160.00,
      idProvider:1,
      description:'gerado atraves do seeder "test-product"  ',
      idCategory:1,
      idProductStatus:1,	
      idBrand:3
     
      },
      {
        name:'produto seed 04',
        idProduct:4,
        price:1.0,
        idProvider:2,
        description:'quarto produto gerado atraves do seeder "test-product"  ',
        idCategory:1,
        idProductStatus:1,	
        idBrand:4
       }
    ], {});
  
  },

  down: async (queryInterface, Sequelize) => {
   
     await queryInterface.bulkDelete('product', null, {});
     
  }
};
