'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.createTable('user', { 
        idUser: {
          autoIncrement: true,
          type: Sequelize.BIGINT.UNSIGNED,
          allowNull: false,
          primaryKey: true,
          onDelete:'cascade',
          onUpdate:'cascade'
        },
        idAddress:{
          type: Sequelize.BIGINT.UNSIGNED,
          allowNull: true,
          onDelete:'cascade',
          onUpdate:'cascade',
          references: {
            model: 'address',
            key: 'idAddress'
          }
        },
        idUserPrivilege:{
          type: Sequelize.BIGINT.UNSIGNED,
          allowNull: false,
          references: {
            model: 'userprivilege',
            key: 'idUserPrivilege'
          }
        },
        deletedAt:{
          type: 'TIMESTAMP',
          default:null,
          allowNull:true
        },
        createdAt:{
          type: 'TIMESTAMP',
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        idPhone:{
          type: Sequelize.BIGINT.UNSIGNED,
          allowNull: true,
          references: {
            model: 'phone',
            key: 'idPhone'
          }
          
        },
        name: {
          type: Sequelize.STRING(255),
          allowNull: false
        },
        cpf: {
          type: Sequelize.STRING(255),
          allowNull: false,
          unique:true
        },
        email: {
          type: Sequelize.STRING(255),
          allowNull: false,
          unique: true
        },
        birthday: {
          type: Sequelize.DATEONLY,
          allowNull: true
        },
        password: {
          type: Sequelize.STRING(255),
          allowNull: false
        },
        profilePic: {
          type: Sequelize.STRING(255),
          allowNull: false
        },
        surname: {
          type: Sequelize.STRING(255),
          allowNull: false
        }
    })
  },


  down: async (queryInterface, Sequelize) => {
     
     
     await queryInterface.dropTable('user');
  }
};
