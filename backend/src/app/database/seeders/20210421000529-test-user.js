'use strict';
const bcrypt = require('bcrypt')
const faker = require('faker');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkInsert('user', [{
      idUser:2,
      idUserPrivilege:2,
      name:faker.name.firstName(),
      surname:faker.name.lastName(),
      cpf:'99999',	
      email:'user@seed.com',
      password:bcrypt.hashSync('12345', 10),	
      profilePic:'profile.png'
       
    }, 
     {
      idUser:1,
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
      password:bcrypt.hashSync('12345', 10),
      deletedAt: (new Date ((new Date((new Date(new Date())).toISOString() )).getTime() - ((new Date()).getTimezoneOffset()*60000))).toISOString().slice(0, 19).replace('T', ' '),
       idUser:3
    },
    {
      idUserPrivilege:2,
      name:"User",
      surname:"com compra",
      cpf:"11111111111",	
      email:"comcompra@seed.com",
      password:bcrypt.hashSync('12345', 10),
      idUser:4
    },
    {
      idUserPrivilege:2,
      name:"user",
      surname:"to delete",
      cpf:"555555555",	
      email:"semcompra@seed.com",
      password:bcrypt.hashSync('12345', 10),
      
      idUser:5
    },
    {
      idUserPrivilege:2,
      name:"user with",
      surname:"paymentcanceled",
      cpf:"7777777777",	
      email:"paymentcanceled@seed.com",
      password:bcrypt.hashSync('12345', 10),
      
      idUser:6
    }
  ]);
 
 },

 down: async (queryInterface, Sequelize) => {
  
    await queryInterface.bulkDelete('user', null, {});
    
 }
};
