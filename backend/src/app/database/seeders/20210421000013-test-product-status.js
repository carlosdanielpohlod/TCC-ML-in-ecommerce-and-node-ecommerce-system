'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkInsert('productstatus', [{
      status: 'Rascunho',
      idProductStatus:1
    
    },{
      status:'disponivel',
      idProductStatus:2
    }], {});
   
 },

 down: async (queryInterface, Sequelize) => {
   /**
    * Add commands to revert seed here.
    *
    * Example:
    * 
    */
    await queryInterface.bulkDelete('productstatus', null, {});
 }
};
