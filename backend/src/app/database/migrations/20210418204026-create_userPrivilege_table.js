'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.createTable('userprivilege', { 
      idUserPrivilege:{ 
       autoIncrement: true,
       type: Sequelize.BIGINT.UNSIGNED,
       allowNull: false,
       primaryKey: true
     },
     privilege:{
       type: Sequelize.STRING(20),
       allowNull: false
     }
      
   });
    
 },

 down: async (queryInterface, Sequelize) => {
 
   await queryInterface.dropTable('phone');
   
 }
};
