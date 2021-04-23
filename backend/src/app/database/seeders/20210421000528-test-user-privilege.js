'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkInsert('userprivilege', [{
       privilege:'Client',
       idUserPrivilege:2
    }, {
       privilege:"admin",
      idUserPrivilege:1
   }], {});
 
 },

 down: async (queryInterface, Sequelize) => {
  
    await queryInterface.bulkDelete('userprivilege', null, {});
    
 }
};
