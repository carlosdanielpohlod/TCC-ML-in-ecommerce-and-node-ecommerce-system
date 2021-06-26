'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
     await queryInterface.bulkInsert('product', [{
        name:'produto seed 01',
        idProduct:1,
      	price:1.00,
        idProvider:1,
      	description:'gerado atraves do seeder "test-product"  ',
        idCategory:1,
        idProductStatus:1,	
        idBrand:1
     }, 
     {
      name:'produto seed 02',
      idProduct:2,
      price:1.00,
      idProvider:1,
      description:'segundo produto gerado atraves do seeder "test-product"  ',
      idCategory:1,
      idProductStatus:1,	
      idBrand:1
     },{
      name:'produto shold be deleted',
      idProduct:3,
      price:1.0,
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
       },

       {
        name:'produto seed 05',
        idProduct:5,
        price:1.0,
        idProvider:2,
        description:' seeder "test-product" para favoritar  ',
        idCategory:1,
        idProductStatus:1,	
        idBrand:4
       },

       {
        name:'produto seed 06',
        idProduct:6,
        price:1.0,
        idProvider:2,
        description:'sexto produto gerado atraves do seeder "test-product"  ',
        idCategory:1,
        idProductStatus:1,	
        idBrand:4
       },

       {
        name:'produto seed 07',
        idProduct:7,
        price:1.0,
        idProvider:2,
        description:'setimo produto gerado atraves do seeder "test-product"  ',
        idCategory:1,
        idProductStatus:1,	
        idBrand:4
       },

       {
        name:'produto seed 08',
        idProduct:8,
        price:1.0,
        idProvider:2,
        description:'oitavo produto gerado atraves do seeder "test-product"  ',
        idCategory:1,
        idProductStatus:1,	
        idBrand:4
       },

       {
        name:'produto seed 09',
        idProduct:9,
        price:1.0,
        idProvider:2,
        description:'9 produto gerado atraves do seeder "test-product"  ',
        idCategory:1,
        idProductStatus:1,	
        idBrand:4
       },

       {
        name:'produto seed 10',
        idProduct:10,
        price:1.0,
        idProvider:2,
        description:'decimo produto gerado atraves do seeder "test-product"  ',
        idCategory:1,
        idProductStatus:1,	
        idBrand:4
       },

       {
        name:'produto seed 11',
        idProduct:11,
        price:1.0,
        idProvider:2,
        description:'decimo primeiro produto gerado atraves do seeder "test-product"  ',
        idCategory:1,
        idProductStatus:1,	
        idBrand:4
       },

       {
        name:'produto seed 12',
        idProduct:12,
        price:1.0,
        idProvider:2,
        description:'decimo segundo produto gerado atraves do seeder "test-product"  ',
        idCategory:1,
        idProductStatus:1,	
        idBrand:4
       },
       {name:'Product to favorite test',
       idProduct:13,
       price:1.0,
       idProvider:2,
       description:'usado no teste de criar um favorito ',
       idCategory:1,
       idProductStatus:1,	
       idBrand:4}
    ], {});
  
  },

  down: async (queryInterface, Sequelize) => {
   
     await queryInterface.bulkDelete('product', null, {});
     
  }
};
