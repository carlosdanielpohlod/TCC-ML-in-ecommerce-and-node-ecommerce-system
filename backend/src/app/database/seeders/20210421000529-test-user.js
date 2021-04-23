'use strict';
const bcrypt = require('bcrypt')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkInsert('user', [{
      idUserPrivilege:1,
      name:'usuario',
      surname:'seed',
      cpf:'99999',	
      email:'user@seed.com',
      password:bcrypt.hashSync('12345', 10),	
      profilePic:'profile.png'
       
    }, 
     {
      idUserPrivilege:1,
      name:'admin',
      surname:'seed',
      cpf:'0000',	
      email:'admin@seed.com',
      password:bcrypt.hashSync('12345', 10)
    },{
      idUserPrivilege:2,
      name:"deletado",
      surname:"seed",
      cpf:"9933399",	
      email:"deletado@seed.com",
      password:bcrypt.hashSync('12345', 10)
       
    }]);
 
 },

 down: async (queryInterface, Sequelize) => {
  
    await queryInterface.bulkDelete('user', null, {});
    
 }
};
