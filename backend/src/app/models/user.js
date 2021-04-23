const Sequelize = require('sequelize');
const msg = require('../controllers/enum/validationMessages')
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    idUser: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      primaryKey: true
    },
    idAddress: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      references: {
        model: 'address',
        key: 'idAddress'
      }
    },
    idUserPrivilege: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      defaultValue: 2,
      references: {
        model: 'userprivilege',
        key: 'idUserPrivilege'
      }
    },
    idPhone: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      references: {
        model: 'phone',
        key: 'idPhone'
      }
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,

      validate:{
        isAlpha:{
          msg:msg['isAlpha'].value
        },
        min(value){
          value = String(value)
          if(value.length < 3){
            throw new Error(msg['min'].value);
          }
        },
        max(value){
          value = String(value)
          if(value.length > 20){
            throw new Error(msg['max'].value);
          }
        }
      },
    },
    cpf: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate:{
        isNumeric:{
          msg:msg['isNumeric'].value
        },
        min(value){
          value = String(value)
          if(value.length != 11){
            throw new Error('Deve conter 11 digitos numericos');
          }
        }
      }
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "email",
      validate:{
        isEmail:{
          msg:msg['isEmail'].value
        },
        max(value){
          value = String(value)
          if(value.length > 20){
            throw new Error(msg['max'].value);
          }
        }
      }
    },
    birthday: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    profilePic: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    surname: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    deletedAt:{
      type:'TIMESTAMP',
      allowNull:true
    }
  }, {
    sequelize,
    tableName: 'user',
    timestamps: false,
    paranoid: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idUser" },
        ]
      },
      {
        name: "email",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "email" },
        ]
      },
      {
        name: "idAddress",
        using: "BTREE",
        fields: [
          { name: "idAddress" },
        ]
      },
      {
        name: "idUserPrivilege",
        using: "BTREE",
        fields: [
          { name: "idUserPrivilege" },
        ]
      },
      {
        name: "idPhone",
        using: "BTREE",
        fields: [
          { name: "idPhone" },
        ]
      },
    ]
  });
};
