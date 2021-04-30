
const msg = require('../controllers/enum/validationMessages');
const bcrypt = require('bcrypt')

module.exports = function(sequelize, DataTypes) {
  const user = sequelize.define('user', {
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
        is:{
          args:[/\b[A-Za-zÀ-ú][A-Za-zÀ-ú]+,?\s[A-Za-zÀ-ú][A-Za-zÀ-ú]{2,19}\b/gi],
          msg:msg["letterAndSpace"].value
        },
        len:{
          args:[3,30],
          msg:msg['invalidLength'].value
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
        len:{
          args:[5,30],
          msg:msg['invalidLength'].value
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
      allowNull: false,
      validate:{
        isAlpha:{
          msg:msg['isAlpha'].value
        },
        len:{
          args:[1,40],
          msg:msg['invalidLength'].value
        }
      }
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

  user.basicInfosTemplate = ['name','surname','email','birthday','createdAt','deletedAt','profilePic','cpf']

  user.usedVerify = async function(query, res, errMsg){
    const data = await user.findOne({where:query})
    
    data != null ? res.status(400).send({status:false, msg:'Email ou senha já utilizados'}) : false
    
  }
  

  user.passwordHash = function(value){
    return bcrypt.hashSync(value, 10)
  }
  return user
};
